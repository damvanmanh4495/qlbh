import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import Select from "react-dropdown-select";
import Paper from "../../../components/Paper/Paper";
import ProductType from "../type/ProductType";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";

interface Props {
  cancelLink: string,
  onSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,
  setProduct: React.Dispatch<React.SetStateAction<ProductType | undefined>>,
  product?: ProductType,
  brands?: { id: number, name: string }[]
  categories?: { id: number, name: string }[]
  errors?: ProductType
  onCreateBrand: (brand: { name: string }) => Promise<void>
  onCreateCategory: (category: { name: string }) => Promise<void>
  onSetImage: (files: FileList) => void
  onRemoveImage: (image: string) => void
  images: string[]
}

const ProductForm: React.FC<Props> = (props) => {
  const {
    product, setProduct, errors,
    onSubmit, cancelLink, categories,
    brands, onCreateBrand, onCreateCategory,
    onSetImage, onRemoveImage, images
  } = props;
  const [category, setCategory] = useState<{ id: number; name: string; }[]>([]);
  const [brand, setBrand] = useState<{ id: number; name: string; }[]>([]);

  useEffect(() => {
    if (product && product.category) {
      let categorySelected = [];
      categorySelected.push(product.category);
      setCategory(categorySelected)
    }
    if (product && product.brand) {
      let brandSelected = [];
      brandSelected.push(product.brand);
      setBrand(brandSelected)
    }
  }, [product])

  return (
    <form className={"form-data row" + (errors ? " was-validated" : "")} noValidate encType="multipart/form-data">
      <div className="col-md-8">
        <Paper>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label className="input-required">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={(product && product.name) || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Mã sản phẩm / SKU</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={(product && product.code) || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    code: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Mã vạch / Barcode</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={(product && product.barcode) || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    barcode: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Khối lượng</label>
              <input
                type="number"
                min={0}
                className="form-control"
                placeholder=""
                value={(product && product.net_weight) || 0}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    net_weight: +e.target.value
                  })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Tồn kho ban đầu</label>
              <input
                type="number"
                min={0}
                className="form-control"
                placeholder=""
                value={(product && product.quantity) || 0}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    quantity: +e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Giá sản phẩm</label>
              <input
                type="number"
                min={0}
                className="form-control"
                placeholder=""
                value={(product && product.price) || 0}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: +e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-12 mb-3">
              <div
                className="custom-control custom-checkbox"
                onClick={(e) =>
                  setProduct({
                    ...product,
                    allow_sell: product ? !product.allow_sell: false,
                  })
                }
              >
                <input type="checkbox" className="custom-control-input" checked={product ? product.allow_sell : false} readOnly />
                <label className="custom-control-label">Cho phép bán</label>
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div className="col-md-4">
        <Paper>
          <div className="row">
            <div className="col-md-12 mb-2">
              <h3>Phân loại</h3>
            </div>
            <div className="col-md-12 mb-3 svg">
              <label>Loại sản phẩm</label>
              <Select
                values={category}
                options={categories || []}
                onCreateNew={onCreateCategory}
                onChange={(val: any[]) => {
                  setProduct({
                    ...product,
                    category: val[0]
                  })
                }}
                valueField="id"
                labelField="name"
                searchBy="name"
                sortBy="name"
                keepSelectedInList={true}
                createNewLabel="Thêm {search}"
                placeholder="Nhập loại sản phẩm"
                create
                separator
              />
            </div>
            <div className="col-md-12 mb-3 svg">
              <label>Nhãn hiệu</label>
              <Select
                values={brand}
                options={brands || []}
                onCreateNew={onCreateBrand}
                onChange={(val: any[]) => {
                  setProduct({
                    ...product,
                    brand: val[0]
                  })
                }}
                valueField="id"
                labelField="name"
                searchBy="name"
                sortBy="name"
                keepSelectedInList={true}
                createNewLabel="Thêm {search}"
                placeholder="Nhập nhãn hiệu sản phẩm"
                create
                separator
              />
            </div>
          </div>
        </Paper>

        <Paper>
          <div className="row">
            <div className="col-md-12">
              <ImageUploader title="Ảnh sản phẩm" images={images} onChange={onSetImage} onRemove={onRemoveImage} />
            </div>
            <div className="col-md-12 mb-3"></div>
          </div>
        </Paper>
      </div>
      <div className="col-md-12 mb-4">
        <hr />
        <div className="d-flex mt-4">
          <button type="button" className="btn btn-danger">Xóa sản phẩm</button>
          <div className="mx-auto"></div>
          <div>
            <Link to={cancelLink}>
              <button type="button" className="btn btn-light mr-3">Hủy</button>
            </Link>
            <ButtonLoading type="button" className="btn btn-primary" onClick={onSubmit}>Lưu</ButtonLoading>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;