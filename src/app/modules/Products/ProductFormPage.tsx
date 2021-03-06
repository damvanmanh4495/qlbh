import React, { useState, useCallback, useEffect, useContext } from "react";
import { RouteComponentProps } from 'react-router';
import AppContext from "../../contexts/AppContext";
import HeadPage from "../../components/HeadPage/HeadPage";
import ProductForm from "./components/ProductForm";
import ProductType from "./type/ProductType";
import ProductService from "../../../services/ProductService";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import ImageService from "../../../services/ImageService";
import ImageType from "./type/ImageType";

const baseURL = "products";
const productService = new ProductService();
const categoryService = new CategoryService();
const brandService = new BrandService();
const imageService = new ImageService();

interface MatchParams {
  query: string;
  id?: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const titlePageCreate = "Thêm mới sản phẩm"

const ProductFormPage: React.FC<Props> = (props) => {
  const appCtx = useContext(AppContext);
  const { openNotifier, levels } = appCtx;
  const {
    match: { params },
  } = props;

  const [titlePage, setTitlePage] = useState<string>();
  const [product, setProduct] = useState<ProductType>();
  const [categories, setCategories] = useState<any>();
  const [brands, setBrands] = useState<any>();
  const [errors, setErrors] = useState<ProductType>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [readySave, setReadySave] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const loadCategories = useCallback(async () => {
    let categoryRes = await categoryService.suggest();
    if (!categoryRes || categoryRes.status !== 200 || !categoryRes.data) {
      return;
    }
    const categoryResData = categoryRes.data;
    setCategories(categoryResData);
  }, []);

  const loadBrands = useCallback(async () => {
    let brandRes = await brandService.getList();
    if (!brandRes || brandRes.status !== 200 || !brandRes.data) {
      return;
    }
    const brandResData = brandRes.data;
    setBrands(brandResData);
  }, []);

  const loadProduct = useCallback(async () => {
    if (!params.id) {
      setTitlePage(titlePageCreate);
      return;
    }

    if (isNaN(+params.id)) {
      setNotFound(true);
      return;
    }

    const productRes = await productService.getOne(+params.id);
    if (!productRes || productRes.status !== 200 || !productRes.data) {
      setNotFound(true);
      return;
    }
    const propductResData = productRes.data;
    setProduct(propductResData);
    setTitlePage(`${propductResData.name}`);

    const images: ImageType[] = propductResData.images;
    if (!images) return;
    const imagesUrl = images.map(e => {
      return e.url
    })
    setImages(imagesUrl);
  }, [params]);

  const validate = (product?: ProductType) => {
    return true;
  };

  const handleNewBrand = async (brand: { name: string }) => {
    const response = await brandService.save({ name: brand.name })
    if (!response || response.status !== 201 || !response.data) {
      setProduct({ ...product, brand: null })
      return;
    }
    setProduct({ ...product, brand: response.data })
    await loadBrands();
  }

  const handleNewCategory = async (category: { name: string }) => {
    const response = await categoryService.save({ name: category.name })
    if (!response || response.status !== 201 || !response.data) {
      setProduct({ ...product, category: null })
      return;
    }
    setProduct({ ...product, category: response.data })
    await loadCategories();
  }

  const save = useCallback(async () => {
    if (!validate(product)) {
      return;
    }
    if (!product) {
      return;
    }

    const { id } = product;
    const response = await productService.save(product);

    let level = levels.success;
    let message = "Thêm mới sản phẩm thành công";
    let isCreate = true;
    if (id) {
      isCreate = false;
      message = "Cập nhật sản phẩm thành công";
    }

    if (!response || !response.data) {
      message = "Lỗi hệ thống";
      level = levels.warn;
    }

    if (
      response &&
      response.status !== 200 &&
      response.status !== 201 &&
      response.data
    ) {
      message = response.data.message;
      level = levels.warn;
    }

    openNotifier(true, message, level);
    if (level === levels.success && response.data) {
      if (isCreate) {
        props.history.push(`/${baseURL}/${response.data.id}`);
      } else {
        loadProduct();
      }
    }
  }, [product, openNotifier, levels, props.history, loadProduct]);

  const handleSetImage = async (files: FileList) => {
    const file: File = files[0];
    if (file.size > 1000000) {
      openNotifier(true, "Giới hạn kích thước ảnh không vượt quá 1MB", levels.info);
      return;
    }
    const path = URL.createObjectURL(file);
    const response = await imageService.save(file, product?.id || 0);
    if (!response) {
      openNotifier(true, "Lỗi hệ thống", levels.warn);
      return;
    }
    if (response.status !== 201) {
      openNotifier(true, response.message, levels.warn);
      return;
    }
    if (!response.data || !response.data || !response.data.url) {
      return;
    }

    setImages([...images, response.data.url]);

    let productImages: ImageType[] = [];
    if (product && product.images) {
      productImages = product.images;
    }
    productImages.push(response.data);
    setProduct({...product, images: productImages})
  }

  const handleRemoveImage = (image: string) => {
    setImages(images.filter(item => item !== image))
  }

  useEffect(() => {
    loadCategories();
    loadBrands();
    loadProduct();
  }, [loadProduct, loadCategories, loadBrands]);

  useEffect(() => {
    if (!readySave) {
      return;
    }
    setReadySave(false);
    save();
  }, [readySave, save]);

  if (notFound) {
    return (
      <div className="text-center mt-5">
        <h1>Sản phẩm không tồn tại!</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <HeadPage
        title={titlePage}
        backBtn={{ label: "Quay lại trang danh sách", link: `/${baseURL}` }}
      />
      <ProductForm
        product={product}
        categories={categories}
        brands={brands}
        setProduct={setProduct}
        errors={errors}
        cancelLink={`/${baseURL}`}
        onSubmit={() => {
          setReadySave(true);
        }}
        onCreateBrand={handleNewBrand}
        onCreateCategory={handleNewCategory}
        images={images}
        onSetImage={handleSetImage}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
}

export default ProductFormPage;