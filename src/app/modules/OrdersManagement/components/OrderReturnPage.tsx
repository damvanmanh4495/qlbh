import { ChangeEvent, useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { useHistory, useParams } from "react-router-dom";
import { URL_ORDER, URL_ORDER_RETURN } from "../../../../services/API";
import BaseService from "../../../../services/base/BaseService";
import HeadPage from "../../../components/HeadPage/HeadPage";
import Paper from "../../../components/Paper/Paper";
import Popup from "../../../components/Popup/Popup";
import { formatCash, printBill } from "../../../components/ultis";
import AppContext from "../../../contexts/AppContext";
import Bill from "../../Sale/components/bill/Bill";
import { OrderDetail, defaultOrder } from "../OrderDetail";
import CustomerInfo from "./order-detail/CustomerInfo";
import ListOrderItem, { reducerReturnMoney } from "./order-detail/ListOrderItem";
import OrderInfo from "./order-detail/OrderInfo";


const baseURL = "orders/returns"
export interface OrderReturnPageProps {
    type?: "detail" | "create"
}
type ParamType = {
    id: string
}

type ReturnItemType = {
    order_item_id?: number,
    quantity?: number,
    unit_price?: number
}

const OrderReturnPage: React.FC<OrderReturnPageProps> = (props) => {

    const { openNotifier, levels } = useContext(AppContext);
    const [order, setOrder] = useState<OrderDetail>(defaultOrder)
    const [status,setStatus] = useState({
        payment: 0,
        receipt: 0
    })
    let { type } = props
    let { id } = useParams<ParamType>();
    let history = useHistory();

    const orderService = new BaseService(URL_ORDER)
    const orderReturnService = new BaseService(URL_ORDER_RETURN)

    const [showPopup, setShow] = useState({
        delete: false
    })
    const closePopup = (name: string) => {
        setShow({ ...showPopup, [name]: false })
    }

    const getOrderDetail = async () => {
        let res = await orderService.getOne(parseInt(id));
        if (res) {
            let order = res.data
            for (let i = 0; i < order.items.length; i++) {
                let item = order.items[i]
                order.items[i] = {
                    ...item, amountReturn: 0,
                    returnPrice: Math.floor((item.price - item.discount) * (1 + item.tax / 100))
                }
            }
            setOrder({ ...order, payment_status: 0, receipt_status: 0});
        }
    }

    const getOrderReturnDetail = async () => {
        let res = await orderReturnService.getOne(parseInt(id));
        if (res) {
            setStatus({payment: res.data.payment_status, receipt: res.data.receipt_status})
            setOrder(res.data)
        }
        
    }

    useEffect(() => {
        switch (type) {
            case "create":
                getOrderDetail();
                break;
            case "detail":
                getOrderReturnDetail();
                break;
        }
    }, [])

    let orderInfoTitle="";
    switch (type) {
        case "create":
            orderInfoTitle = "????n h??ng"
            break;
        case "detail":
            orderInfoTitle = "????n tr??? h??ng"
            break;
    }

    const handleChange = (id: number, name: string, value: any) => {
        let newOrder = order
        for (let i = 0; i < newOrder.items.length; i++) {
            if (newOrder.items[i].id === id) {
                newOrder.items[i] = { ...newOrder.items[i], [name]: value }
                break;
            }
        }
        setOrder({ ...newOrder })
    }

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, checked } = e.target
        let value;
        if (checked) value = 1
        else value = 0
        setOrder({ ...order, [name]: value })
    }

    const validateOrderReturn = () => {
        for (let i = 0; i < order.items.length; i++) {
            if (order.items[i].amountReturn! > 0)
                return "";
        }
        return "????n tr??? h??ng c???n c?? ??t nh???t 1 s???n ph???m!";
    }
    const saveOrderReturn = async () => {
        let message = validateOrderReturn();
        if (message !== "")
            openNotifier(true, message, levels.warn);
        else {
            let { payment_status, receipt_status } = order
            let totalReturnMoney = order.items.reduce(reducerReturnMoney, 0)
            let return_items: ReturnItemType[] = []
            order.items.map(item => {
                if (item.amountReturn && item.amountReturn > 0)
                    return_items.push({
                        order_item_id: item.id,
                        quantity: item.amountReturn,
                        unit_price: item.returnPrice
                    })
            })
            let orderReturn = {
                code: "ORD" + Math.floor(Math.random() * 1000000),
                note: "",
                order_id: order.id,
                payment_status,
                receipt_status,
                status: 1,
                total_money: totalReturnMoney,
                return_items
            }
            let res = await orderReturnService.save(orderReturn)
            if (res && res.status === 201) {
                openNotifier(true, "L??u ????n tr??? h??ng th??nh c??ng", levels.success);
                history.push("/orders/returns")
            }

            else
                openNotifier(true, "L??u ????n tr??? h??ng th???t b???i", levels.error);
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

    const handleDelete = async () => {
        let res = await orderReturnService.delete(order.id)
        if (res && res.status === 204) {
            history.push(`/${baseURL}`);
            openNotifier(true, `???? x??a ????n tr??? h??ng ${order.code}`, levels.success);
        } else {
            openNotifier(true, `X??a ????n tr??? h??ng ${order.code} th???t b???i`, levels.error);
        }
    }

    const handleUpdateOrderReturn = async () => {
        if (status.payment=== order.payment_status && status.receipt === order.receipt_status)
            openNotifier(true, `Ch??a thay ?????i b???t k?? tr???ng th??i n??o c???a ????n ${order.code}`, levels.warning);
        else {
            let body_req = {
                id: order.id,
                payment_status: order.payment_status,
                receipt_status: order.receipt_status
            }
            let res = await orderReturnService.save(body_req);
            if (res && res.status === 200){
                setOrder(res.data)
                setStatus({payment: res.data.payment_status, receipt: res.data.receipt_status})
                openNotifier(true, `C???p nh???t ????n tr??? h??ng th??nh c??ng`, levels.success);
            } else {
                openNotifier(true, `C???p nh???t ????n tr??? h??ng th???t b???i`, levels.error);
            }              
        }
    }

    let bill = {
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        code: order.code,
        total_money: order.total_money,
        note: order.note,
        status: order.status,
        products: order.items,
        created_on: order.created_on,

    }

    const handlePrintBill = () => {
        printBill();
    }

    return (
        <div className="page-order-detail">
            <div className="container">
                <HeadPage
                    title={type === "create" ? "T???o ????n tr??? h??ng" : order.code}
                    subTitle={type === "create" ? order.code : <Moment date={order.created_on} format="DD/MM/YYYY HH:mm" />}
                    backBtn={{ label: "????n tr??? h??ng", link: `/${baseURL}` }}
                />

                {type === "detail" && (
                    <div className="bottom-head-page">
                        <button onClick={handlePrintBill} className="bt-print"><i className="fas fa-print" ></i>&nbsp;In ????n tr??? h??ng</button>
                        <Bill data={bill} title={"H??a ????n tr??? h??ng"}
                            footer={[{ label: "T???ng ti???n ho??n tr???", value: formatCash(bill.total_money) }]} />
                        <select placeholder="abc" aria-label="Default select example" value="" onChange={handleChangeSelect}>
                            <option value="" disabled selected hidden>Th??m thao t??c</option>
                            <option value="1">H???y</option>
                        </select>
                        <Popup
                            buttonSubmit={{ label: "X??a", onClick: handleDelete, classname: "btn-primary" }}
                            title={"X??a ????n tr??? h??ng " + order.code}
                            show={showPopup.delete}
                            onClose={() => closePopup("delete")}
                            body={<div style={{ padding: "1rem" }}>B???n c?? ch???c ch???n mu???n x??a ????n tr??? h??ng n??y?</div>}
                        />
                    </div>
                )}


                <div className="form-data row">
                    <div className="col-md-8">
                        <CustomerInfo name={order.customer_name} phone={order.customer_phone} />
                        <ListOrderItem order={order} type="return" itemType={props.type} onChange={handleChange} />

                        <Paper>
                            <div className="form-content">
                                <div className="d-flex align-items-center">
                                    <div className="w-50">
                                        <h4>Ho??n ti???n</h4>
                                    </div>
                                    <div className="w-50 text-right">
                                        <input className="custom-control-input" type="checkbox" name="payment_status" id="payment-status-cb"
                                            checked={order.payment_status === 1 ? true : false} onChange={handleChangeCheckbox} />
                                        <label className="custom-control-label" htmlFor="payment-status-cb">???? ho??n ti???n</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="w-50">
                                        <h4>Nh???n h??ng</h4>
                                    </div>
                                    <div className="w-50 text-right">
                                        <input className="custom-control-input" type="checkbox" name="receipt_status" id="receipt-status-cb"
                                            checked={order.receipt_status === 1 ? true : false} onChange={handleChangeCheckbox} />
                                        <label className="custom-control-label" htmlFor="receipt-status-cb">???? nh???p h??ng v??o kho</label>
                                    </div>
                                </div>
                                <hr />
                                <div className="or-dt-return d-flex align-items-center">
                                    <div className="w-50">
                                    </div>
                                    <div className="w-50 text-right">
                                        {type === "create" && <button type="button" className="btn btn-outline-secondary" onClick={saveOrderReturn}>L??u ????n tr??? h??ng</button>}
                                        {type === "detail" && <button type="button" className="btn btn-outline-secondary" onClick={handleUpdateOrderReturn}>L??u</button>}
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div className="col-md-4">
                        <OrderInfo order={order} title={orderInfoTitle} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderReturnPage;