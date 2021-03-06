import React from 'react'
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import "./style/style.css";
import qlnv from "../../../svg/qlnv.svg";
import pqvt from "../../../svg/pqvt.svg";
import Paper from '../../components/Paper/Paper';
import HeadPage from '../../components/HeadPage/HeadPage';

const Settings: React.FC<RouteComponentProps<any>> = (props) => {

    return (
        <div className="setting">
            <HeadPage
                title={"Cấu hình"}
            />

            <Paper className="list-setting py-3">
                <div className="item-conntent-title">
                    <h6>Thông tin về cửa hàng</h6>
                </div>
                <div className="element-list">
                    <div className="row">
                        <div className="col-lg-4 d-flex">
                            <div className="left-item">
                                <img src={qlnv} alt="" />
                            </div>
                            <div className="right-item">
                                <p><Link to="/employees">Quản lý nhân viên</Link></p>
                                <p>Tạo và quản lý tất cả tài khoản nhân viên</p>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex">
                            <div className="left-item">
                                <img src={pqvt} alt="" />
                            </div>
                            <div className="right-item">
                                <p><Link to="/permission">Phân quyền vai trò</Link></p>
                                <p>Tạo, phân quyền và quản lý các vai trò của cửa hàng</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default Settings;