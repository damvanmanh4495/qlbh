import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./components/order-detail/style/style.css"
import HeadPage from "../../components/HeadPage/HeadPage";
import Paper from "../../components/Paper/Paper";
import { OrderItemType } from "./components/order-detail/OrderItem";
import { formatCash, printBill } from "../../components/ultis";
import BaseService from "../../../services/base/BaseService";
import { URL_ORDER } from "../../../services/API";
import { Link, useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import Bill from "../Sale/components/bill/Bill";
import CustomerInfo from "./components/order-detail/CustomerInfo";
import ListOrderItem from "./components/order-detail/ListOrderItem";
import OrderInfo from "./components/order-detail/OrderInfo";
import Popup from "../../components/Popup/Popup";
import AppContext from "../../contexts/AppContext";

const baseURL = "orders";

export interface OrderDetailPageProps {

}

export type OrderDetail = {
    id: number,
    code: string,
    deposit: number,
    tax: number,
    discount: number,
    note: string,
    status: number,
    customer_name: string,
    customer_phone: string,
    total_money: number,
    payment_method?: number,
    created_on: string,
    created_by?: string,
    items: OrderItemType[],
    payment_status?: number,
    receipt_status?: number,
    total_return_money?: number,
    order_returns?: OrderReturnCommonInfo[],
    order_id?: number
}

type OrderReturnCommonInfo = {
    id: number,
    code: string,
}

type ParamType = {
    id: string
}

export const defaultOrder = {
    id: 0,
    code: "",
    deposit: 0,
    tax: 0,
    discount: 0,
    note: "",
    status: 0,
    customer_name: "",
    customer_phone: "",
    total_money: 0,
    payment_method: 0,
    created_on: "",
    items: []
}

const OrderDetailPage: React.FC<OrderDetailPageProps> = () => {

    const [order, setOrder] = useState<OrderDetail>(defaultOrder)
    const { id } = useParams<ParamType>()
    const service = new BaseService(URL_ORDER)
    const history = useHistory()
    const { openNotifier, levels } = useContext(AppContext);

    const [showPopup, setShow] = useState({
        delete: false
    })
    const closePopup = (name: string) => {
        setShow({ ...showPopup, [name]: false })
    }

    const getOrderDetail = async () => {
        let res = await service.getOne(parseInt(id));
        if (res)
            setOrder(res.data);
    }

    useEffect(() => {
        getOrderDetail()
    }, [])

    let items_req = order.items ? order.items.map(product => {
        let { quantity, discount, price, tax, note } = product
        return {
            product_id: product.id,
            amount: quantity,
            discount,
            price,
            tax,
            note,
            name: product.product_name,
        }
    }) : []

    let bill = {
        customer_name: order.customer_name,
        code: order.code,
        deposit: order.deposit,
        total_money: order.total_money,
        tax: order.tax,
        payment_method: order.payment_method,
        discount: order.discount,
        note: order.note,
        status: order.status,
        money: order.total_money + order.discount - order.tax,
        return_money: order.deposit - order.total_money,
        products: items_req,
        created_on: order.created_on,
        customer_phone: order.customer_phone
    }

    const handlePrintBill = () => {
        printBill();
    }

    const handleDelete = async () => {
        let res = await service.delete(order.id)
        if (res && res.status === 204) {
            history.push(`/${baseURL}`);
            openNotifier(true, `???? x??a ????n h??ng ${order.code}`, levels.success);
        } else {
            openNotifier(true, `X??a ????n h??ng ${order.code} th???t b???i`, levels.error);
        }
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = parseInt(e.target.value)
        switch (value) {
            case 1:
                setShow({ ...showPopup, delete: true })
                break;

            case 2:
                break;
        }
    }

    return (
        <div className="page-order-detail">
            <div className="container">
                <HeadPage
                    title={order.code}
                    subTitle={<Moment date={order.created_on} format="DD/MM/YYYY HH:mm" />}
                    backBtn={{ label: "????n h??ng", link: `/${baseURL}` }}
                />
                <div className="bottom-head-page">
                    <button className="bt-print" onClick={handlePrintBill}><i className="fas fa-print"></i>&nbsp;In ????n h??ng</button>
                    <Bill data={bill} title={"H??a ????n b??n h??ng"}
                        footer={[{ label: "C???ng ti???n h??ng", value: formatCash(bill.money) },
                        { label: "Thu???", value: formatCash(bill.tax) },
                        { label: "Chi???t kh???u", value: formatCash(bill.discount) },
                        { label: "Kh??ch ph???i tr???", value: formatCash(bill.total_money) },
                        { label: "Ti???n kh??ch ????a", value: formatCash(bill.deposit) },
                        { label: "Tr??? l???i", value: formatCash(bill.return_money) },
                        ]} />
                    {(!order.order_returns || order.order_returns.length === 0) && (
                        <>
                            <select placeholder="abc" aria-label="Default select example" value="" onChange={handleChangeSelect}>
                                <option value="" disabled selected hidden>Th??m thao t??c</option>
                                <option value="1">H???y</option>
                                <option value="2">S???a</option>
                            </select>
                            <Popup
                                buttonSubmit={{ label: "X??a", onClick: handleDelete, classname: "btn-primary" }}
                                title={"X??a ????n h??ng " + order.code}
                                show={showPopup.delete}
                                onClose={() => closePopup("delete")}
                                body={<div style={{ padding: "1rem" }}>B???n c?? ch???c ch???n mu???n x??a ????n h??ng n??y?</div>}
                            />
                        </>
                    )}
                </div>
                <div className="form-data row">

                    <div className="col-md-8">
                        <CustomerInfo name={order.customer_name} phone={order.customer_phone} />
                        <ListOrderItem order={order} onChange={() => (console.log("a"))} />

                        <Paper>
                            <div className="form-content">
                                <div className="or-dt-return d-flex align-items-center">
                                    <div className="w-50">
                                        <h4>Ho??n tr??? h??ng </h4>
                                    </div>
                                    <div className="w-50 text-right">
                                        <Link to={`/orders/${order.id}/returns/create`}><button type="button" className="btn btn-outline-secondary">?????i tr??? h??ng</button></Link>
                                    </div>
                                </div>
                                {order.order_returns?.map(x => (
                                    <div style={{ paddingBottom: "15px" }}>
                                        <Link to={`/orders/returns/${x.id}`}>{x.code}</Link>
                                    </div>))}
                            </div>
                        </Paper>

                    </div>

                    <div className="col-md-4">
                        <OrderInfo order={order} title="????n h??ng" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailPage;