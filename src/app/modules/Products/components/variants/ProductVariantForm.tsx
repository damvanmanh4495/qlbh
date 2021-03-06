import React from 'react';
import { Link } from "react-router-dom";
import ButtonLoading from "../../../../components/Button/ButtonLoading";
import Paper from "../../../../components/Paper/Paper";
import ProductType from "../../type/ProductType";

interface Props {
    cancelLink: string,
    onSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,
    product?: ProductType,
    setProduct: React.Dispatch<React.SetStateAction<ProductType | undefined>>,
    productVariant?: ProductType,
    setProductVariant: React.Dispatch<React.SetStateAction<ProductType | undefined>>,
    errors?: ProductType
}

const ProductVariantForm: React.FC<Props> = (props) => {

    const { errors, product, setProduct, onSubmit, cancelLink, productVariant, setProductVariant } = props;

    const productDemo = {
        variants: [
            {
                id: 22,
                color: "Vàng",
                marterial: "Giấy",
                size: "S",
                image: "https://sapo.dktcdn.net/100/402/739/variants/e5a4b731-119b-44ad-8ec3-fecc58d99e6a.jpg"
            },
            {
                id: 23,
                color: "Vàng",
                marterial: "Vải lụa",
                size: "L"
            },
            {
                id: 24,
                color: "Vàng",
                marterial: "Giấy",
                size: "XL"
            }
        ]
    }

    return (
        <form className={"form-data row" + (errors ? " was-validated" : "")} noValidate>
            <div className="col-md-4">
                <Paper color="second" className="pb-0">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h3>Phiên bản</h3>
                        </div>
                    </div>
                    {
                        product && productVariant && product.variants &&
                        product.variants.map((item: any, index: number) => {
                            const activeClass = item.id === productVariant.id ? " active" : "";
                            return (
                                <Link
                                    className={"row info-variant" + activeClass}
                                    to={`/products/${product.id}/variants/${item.id}`}
                                    key={"info-variant-" + index}
                                >
                                    <div className="img-variant">
                                        {
                                            item.image
                                                ? <img src={item.image} alt=""/>
                                                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d3dbe2" >
                                                    <path
                                                        d="M6.5 8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m0-1c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm15.5-4h-20c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-20 2h20v9.6l-4.1-4.1c-1.3-1.3-3.5-1.3-4.9 0l-4 4c-1-.4-2.2-.2-3 .6l-3.9 3.9h-.1v-14zm5.4 11.5c.1-.1.1-.1.2-.1.3-.2.7-.1 1 .1l.6.6 1.9 1.9h-6.2l2.5-2.5zm6.6 2.5l-3.3-3.3 3.8-3.8c.6-.6 1.5-.6 2.1 0l5.5 5.5v1.6h-8.1z">
                                                    </path>
                                                </svg>
                                        }

                                    </div>
                                    <div className="name-variant">
                                        <span>42</span><span> • </span>
                                        <span>Vàng</span><span> • </span>
                                        <span>Giấy</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </Paper>
                <Paper color="second"></Paper>
            </div>
            <div className="col-md-8">
                <Paper>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className="input-required">Tên phiên bản</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={(productVariant && productVariant.name) || ""}
                                        onChange={(e) =>
                                            setProductVariant({
                                                ...productVariant,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="input-required">Kích thước</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={(productVariant && productVariant.size) || ""}
                                        onChange={(e) =>
                                            setProductVariant({
                                                ...productVariant,
                                                size: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="input-required">Màu sắc</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={(productVariant && productVariant.color) || ""}
                                        onChange={(e) =>
                                            setProductVariant({
                                                ...productVariant,
                                                color: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="input-required">Chất liệu</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={(productVariant && productVariant.material) || ""}
                                        onChange={(e) =>
                                            setProductVariant({
                                                ...productVariant,
                                                material: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">

                        </div>
                    </div>
                </Paper>
                <Paper>
                    <div className="row">
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
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Mã vạch / Barcode</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={(productVariant && productVariant.barcode) || ""}
                                onChange={(e) =>
                                    setProduct({
                                        ...productVariant,
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
                                value={(productVariant && productVariant.net_weight) || ""}
                                onChange={(e) =>
                                    setProduct({
                                        ...productVariant,
                                        net_weight: +e.target.value,
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
                                value={(productVariant && productVariant.quantity) || 0}
                                onChange={(e) =>
                                    setProduct({
                                        ...productVariant,
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
                                value={(productVariant && productVariant.price) || 0}
                                onChange={(e) =>
                                    setProductVariant({
                                        ...productVariant,
                                        price: +e.target.value,
                                    })
                                }
                            />
                        </div>
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
    )
}

export default ProductVariantForm;