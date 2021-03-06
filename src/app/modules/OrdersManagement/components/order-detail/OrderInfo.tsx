import { title } from "process";
import { useState } from "react";
import Moment from "react-moment";
import Paper from "../../../../components/Paper/Paper";
import { OrderDetail } from "../../OrderDetail";
import PopupOrderHistory from "../order-history/PopupOrderHistory";

export interface OrderInfoProps {
    order: OrderDetail,
    title: string
}

const OrderInfo: React.SFC<OrderInfoProps> = (props) => {

    let { order, title } = props
    const [showPopup, setShowPopup] = useState({
        history: false
    })

    const handleShowPopup = (name: string) => {
        setShowPopup({ ...showPopup, [name]: true })
    }

    const closePopup = (name: string) => {
        setShowPopup({ ...showPopup, [name]: false })
    }


    let lineItems = [
        { label: "Bảng giá", value: "Giá bán lẻ" },
        { label: "Ngày hẹn giao", value: "---" },
        { label: "Ngày tạo", value: <Moment date={order.created_on} format="DD/MM/YYYY HH:mm" /> },
        { label: "Tham chiếu", value: "---" },
        { label: "Kênh bán hàng", value: "SAMPLE_ORDER" },
        { label: "Nhân viên", value: order.created_by },
        { label: "Ghi chú", value: order.note },
    ]

    return (
        <Paper>
            <div className="form-content">
                <div className="form-info-title">
                    <h4>{`Thông tin ${title}`}</h4>
                    {/* <span className="right-badge">Hoàn thành</span> */}
                </div>
                <hr />
                <div className="page-info-body">
                    {lineItems.map(item => (
                        <div className="line-info">
                            <label>{item.label}<span className="right">:</span></label>
                            <div className="content" title="Giá bán lẻ">{item.value}</div>
                        </div>
                    ))}
                </div>
                <hr />
                <a onClick={() => handleShowPopup("history")} type="button" className="bt-order-his">Lịch sử thao tác đơn hàng</a>
                <PopupOrderHistory id={order.id} show={showPopup.history} close={() => closePopup("history")} orderId={order.order_id} title={title}/>
            </div>
        </Paper>
    );
}

export default OrderInfo;