import React from 'react'
import InputForm from '../../components/Input/InputForm'
import "./style/style.css"

export default function AddCustomer() {
    return (
        <div className="form-customer">
            <div className="header-customer text-right">
                <button className="btn btn-secondary mr-2">
                    Huỷ
                </button>
                <button className="btn btn-primary">
                    Lưu
                </button>
            </div>
            <div className="element-form-customer">
                <div className="title-form">
                    <a href="/"> &lt; Danh sách khách hàng </a>
                    <h3>Thêm mới khách hàng</h3>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="element-form-inner">
                            <div className="row info-body">
                                <div className="col-lg-12">
                                    <InputForm
                                        textLabel="Tên khách hàng"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputForm
                                            textLabel="Mã khách hàng"
                                        />
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="">Nhóm khách hàng</label> <br/>
                                    <select style={{width:"100%"}}>
                                        <option value="">Chọn nhóm khách hàng</option>
                                        <option value="">Vip</option>
                                        <option value="">Bán buôn</option>
                                        <option value="">Bán lẻ</option>
                                    </select>
                                </div>
                                <div className="col-lg-6">
                                    <InputForm
                                            textLabel="Số điện thoại"
                                        />
                                </div>
                                <div className="col-lg-6">
                                    <InputForm
                                            textLabel="Email"
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="element-form-inner mt-3">
                             <h5>Thông tin địa chỉ</h5>
                            <div className="row info-body">
                                <div className="col-lg-6">
                                    <InputForm
                                        textLabel="Nhãn"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <InputForm
                                            textLabel="Khu vực"
                                        />
                                </div>
                                <div className="col-lg-6">
                                    <InputForm
                                            textLabel="Địa chỉ"
                                        />
                                </div>
                                <div className="col-lg-6">
                                    <InputForm
                                            textLabel="Địa chỉ 2"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
