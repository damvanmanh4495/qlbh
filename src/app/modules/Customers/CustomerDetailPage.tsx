import { ChangeEvent, useContext, useEffect, useState, useCallback } from "react";
import Moment from "react-moment";
import { RouteComponentProps } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import { URL_CUSTOMERS } from "../../../services/API";
import BaseService from "../../../services/base/BaseService";
import HeadPage from "../../components/HeadPage/HeadPage";
import Paper from "../../components/Paper/Paper";
import Popup from "../../components/Popup/Popup";
import AppContext from "../../contexts/AppContext";
import ListOrderOfCustomer from "./ListOrderOfCustomer";
import "./style/style.css"

const baseURL = "customers"

export interface CustomerDetailPageProps extends RouteComponentProps<any> {

}

export type Customer = {
    address?: string
    birthdate?: string
    code?: string
    description?: string
    email?: string
    gender?: boolean
    id: number
    name?: string
    phone_no?: string
    status?: 1
}

type ParamType = {
    id: string
}

const service = new BaseService(URL_CUSTOMERS);

const CustomerDetailPage: React.FC<CustomerDetailPageProps> = (props) => {

    const [customer, setCustomer] = useState<Customer>()
    const { openNotifier, levels } = useContext(AppContext);
    const history = useHistory();
    const { id } = useParams<ParamType>()

    const [showPopup, setShowPopup] = useState({
        delete: false
    })

    const closePopup = (name: string) => {
        setShowPopup({ ...showPopup, [name]: false })
    }

    const getCustomerInfo = useCallback(async () => {
        let res = await service.getOne(parseInt(id))
        if (res && res.status === 200) {
            setCustomer(res.data)
        } else {
            openNotifier(true, "Tải thông tin khách hàng thất bại", levels.error);
        }
    }, [id, levels, openNotifier])

    useEffect(() => {
        getCustomerInfo()
    }, [getCustomerInfo])


    const handelDeleteCustomer = async () => {
        let res = await service.delete(parseInt(id))
        if (res && res.status === 204) {
            openNotifier(true, "Xóa khách hàng thành công", levels.success);
            history.push(`/${baseURL}`)
        } else {
            openNotifier(true, "Xóa khách hàng thất bại", levels.error);
        }
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = parseInt(e.target.value)
        if (!customer) {
            return;
        }

        switch (value) {
            case 1:
                history.push(`/customers/edit/${customer.id}`)
                break;
            case 2:
                setShowPopup({ ...showPopup, delete: true })
                break;
        }
    }

    let lineInfo = [
        { label: "Mã", value: customer?.code || "---" },
        { label: "Số điện thoại", value: customer?.phone_no || "---" },
        { label: "Giới tính", value: customer?.gender || "---" },
        { label: "Email", value: customer?.email || "---" },
        { label: "Ngày sinh", value: <Moment date={customer?.birthdate} format="DD/MM/YYYY" /> || "---" },
        { label: "Mô tả", value: customer?.description || "---" },
    ]

    return (
        <div >
            <div className="container">
                <HeadPage
                    title={customer?.name}
                    backBtn={{ label: "Danh sách khách hàng", link: `/${baseURL}` }}
                />
                <Paper>
                    <Popup
                        buttonSubmit={{ label: "Xóa", onClick: handelDeleteCustomer, classname: "btn-primary" }}
                        title={`Xóa khách hàng`}
                        show={showPopup.delete}
                        onClose={() => closePopup('delete')}
                        body={<div>Bạn có chắc chắn muốn xóa khách hàng <b>{customer?.name}</b> ? Thao tác này không thể khôi phục.</div>}
                    />
                    <div className="page-info">
                        <div className="page-info-title">
                            <div><b>Thông tin cá nhân</b></div>
                            <div>
                                <select className="form-control" value="0" onChange={handleChangeSelect}>
                                    <option value="0" disabled selected hidden>Thêm thao tác</option>
                                    <option value="1">Cập nhật thông tin</option>
                                    <option value="2">Xóa khách hàng</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div className="page-info-body">
                            <div className="row">
                                {lineInfo.map((item, idx) => (
                                    <div className="col-lg-4" key={idx}>
                                        <div className="line-info">
                                            <label>{item.label}<span className="right">:</span></label>
                                            <div className="content" >{item.value}</div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </Paper>
                {customer?.id &&
                    <ListOrderOfCustomer customerId={customer?.id} {...props} />
                }
            </div>
        </div>
    );
}

export default CustomerDetailPage;