import { useCallback, useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { URL_ORDER_HISTORY, URL_ORDER_RETURN_HISTORY } from "../../../../../services/API";
import BaseService from "../../../../../services/base/BaseService";
import Popup from "../../../../components/Popup/Popup";
import AppContext from "../../../../contexts/AppContext";

export interface Props {
    title: string,
    show: boolean;
    close: Function;
    id: number,
    orderId?: number
}

type OrderHistory = {
    action_group: string,
    created_by: string,
    created_on: string,
    id: number,
    name: string,
}

const PopupOrderHistory: React.SFC<Props> = (props: Props) => {

    const { title, show, close, id , orderId } = props
    const { openNotifier, levels } = useContext(AppContext)
    const service = orderId ? new BaseService(URL_ORDER_RETURN_HISTORY(id)) : new BaseService(URL_ORDER_HISTORY(id));
    const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([])

    const getOrderHistory = useCallback(async () => {
        let res = await service.getList(1, 200);
        if (res && res.status === 200)
            setOrderHistory(res.data)
        else
            openNotifier(true, "Tải lịch sử đơn hàng thất bại", levels.error);

    }, [id])


    useEffect(() => {
        getOrderHistory()
    }, [id])

    const mapToActionName = (name: string) => {
        let value = parseInt(name)
        switch (value) {
            case 1:
                return "Thêm mới đơn hàng"
            case 2:
                return "Thêm mới đơn trả hàng"
            case 3:
                return "Cập nhật trạng thái nhập kho"
            case 4:
                return "Cập nhật trạng thái hoàn tiền"
            case 5:
                return "Xóa đơn trả hàng"
        }
    }

    let body = (
        <div className="body-order-his">
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Người thao tác</th>
                        <th style={{ width: '20%' }}>Chức năng</th>
                        <th style={{ width: '40%' }}>Thao tác</th>
                        <th style={{ width: '20%' }}>Thời gian</th>
                    </tr>
                </thead>
                <tbody className="tbody-scoler" style={{ overflow: 'hidden' }}>
                    {orderHistory.map(item => (
                        <tr>
                            <td id="log_352038630" className="left-td" >
                                {item.created_by}
                            </td>
                            <td className="left-td">
                                {item.action_group}
                            </td>
                            <td className="left-td">
                                {mapToActionName(item.name)}
                            </td>
                            <td className="left-td">
                                <span>{<Moment date={item.created_on} format="DD/MM/YYYY HH:mm" />}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    return (
        <>
            <Popup
                title={`Lịch sử thao tác ${title}`}
                show={show}
                onClose={close}
                body={body}
                size="extra_large"
            />
        </>
    );
}

export default PopupOrderHistory;