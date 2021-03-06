import React, { useState, useCallback, useEffect, useContext } from "react";
import { RouteComponentProps } from 'react-router';
import HeadPage from "../../../components/HeadPage/HeadPage";
import FakeService from "../../../../services/FakeService";
import AppContext from "../../../contexts/AppContext";
import ProductVariantForm from "../components/variants/ProductVariantForm";
import ProductType from "../type/ProductType";

const baseURL = "products";
const service = new FakeService();

interface MatchParams {
  query: string;
  id: string;
  variantId: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const titlePageCreate = "Thêm mới"

const ProductVariantFormPage: React.FC<Props> = (props) => {
  const appCtx = useContext(AppContext);
  const { openNotifier, levels } = appCtx;
  const {
    match: { params },
  } = props;

  const [titlePage, setTitlePage] = useState<string>();
  const [product, setProduct] = useState<ProductType>();
  const [productVariant, setProductVariant] = useState<ProductType>();
  const [errors, setErrors] = useState<ProductType>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [readySave, setReadySave] = useState<boolean>(false);

  const loadDomain = useCallback(async () => {
    if (!params.id) {
      setNotFound(true);
      return;
    }

    if (params.id && !params.variantId) {
      setTitlePage(titlePageCreate);
    }

    if (params.id && isNaN(+params.id)) {
      setNotFound(true);
      return;
    }

    let productRes = await service.getOne(+params.id);
    if (!productRes || productRes.status !== 200 || !productRes.data) {
      setNotFound(true);
      return;
    }
    const productData = productRes.data;
    setProduct(productData);

    let productVariantRes = await service.getOne(+params.id);
    if (!productVariantRes || productVariantRes.status !== 200 || !productVariantRes.data) {
      setNotFound(true);
      return;
    }
    const productVariantData = productVariantRes.data;
    setProductVariant(productVariantData);

    if (params.id && !params.variantId) {
      setTitlePage(titlePageCreate);
      return;
    }
    setTitlePage(`${productVariantData.name} - 41 - vàng -giấy`);
  }, [params]);

  const validate = (product?: ProductType) => {
    return true;
  };

  const save = useCallback(async () => {
    if (validate(productVariant)) {
      return;
    }
  }, [productVariant]);

  useEffect(() => {
    loadDomain();
  }, [loadDomain]);

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
        backBtn={{ label: product && product.name, link: `/${baseURL}` }}
      />
      <ProductVariantForm
        product={product}
        setProduct={setProduct}
        productVariant={productVariant}
        setProductVariant={setProductVariant}
        errors={errors}
        cancelLink={`/${baseURL}`}
        onSubmit={() => {
          setReadySave(true);
        }}
      />
    </div>
  );
}

export default ProductVariantFormPage;