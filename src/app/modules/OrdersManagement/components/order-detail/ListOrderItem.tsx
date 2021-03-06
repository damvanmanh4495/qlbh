import { useState } from "react";
import Paper from "../../../../components/Paper/Paper";
import { formatCash } from "../../../../components/ultis";
import { OrderDetail } from "../../OrderDetail";
import OrderItem, { OrderItemType } from "./OrderItem";
import OrderReturnItem from "./OrderReturnItem";
import OrderReturnItemDetail from "./OrderReturnItemDetail";


export interface ListOrderItemProps {
    order: OrderDetail,
    type?: "return" | "default",
    itemType?: "create" | "detail",
    onChange: Function
}

const ListOrderItem: React.FC<ListOrderItemProps> = (props) => {
    let { order, type, itemType, onChange } = props

    const handleChange = (id: number, name: string, value: any) => {
        onChange(id, name, value)
    }

    let totalReturnMoney = order.items.reduce(reducerReturnMoney, 0)

    return (
        <Paper>
            <div className="form-content">

                <div className="or-dt-list-line-item">
                    <h4>Thông tin sản phẩm</h4>
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th className="w-15">Mã SKU</th>
                                <th>Tên sản phẩm</th>
                                <th className="text-center">Số lượng</th>
                                {type === "return"
                                    ? (<><th className="text-right">Giá hàng trả</th></>)
                                    : (<>
                                        <th className="text-right">Đơn giá</th>
                                        <th className="text-right">Chiết khấu</th>
                                        <th className="text-right">Thuế(%)</th>
                                    </>
                                    )}
                                <th className="text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => {
                                switch (itemType) {
                                    case "create":
                                        return <OrderReturnItem key={item.id} data={item} onChange={handleChange} />
                                    case "detail":
                                        return <OrderReturnItemDetail key={item.id} data={item}/>
                                    default:
                                        return <OrderItem data={item} key={item.id} />;
                                }
                            })}
                        </tbody>
                    </table>

                </div>
                <div className="or-dt-footer-bill">
                    <div className="row flex-row-reverse">
                        {type === "return" && (
                            <div className="col-md-6">
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td><b>Tổng tiền trả hàng </b></td>
                                            <td className="text-right"><b>{formatCash(order.total_money || totalReturnMoney)}</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {itemType != "detail" && 
                        (
                            <div className="col-md-6">
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td>Tổng tiền</td>
                                            <td className="text-right">{formatCash(order.total_money + order.discount - order.tax)}</td>
                                        </tr>
                                        <tr>
                                            <td>VAT</td>
                                            <td className="text-right">{formatCash(order.tax)}</td>
                                        </tr>
                                        <tr>
                                            <td>Chiết khấu</td>
                                            <td className="text-right">{formatCash(order.discount)}</td>
                                        </tr>
                                        <tr>
                                            <td>Phí giao hàng</td>
                                            <td className="text-right">0</td>
                                        </tr>
                                        <tr>
                                            <td><b>Khách phải trả</b></td>
                                            <td className="text-right">{formatCash(order.total_money)}</td>
                                        </tr>
                                        <tr>
                                            <td>Tiền khách đưa</td>
                                            <td className="text-right">{formatCash(order.deposit)}</td>
                                        </tr>
                                        <tr>
                                            <td>Tiền thừa</td>
                                            <td className="text-right">{formatCash(order.deposit - order.total_money)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </Paper >
    );
}

export default ListOrderItem;

export const reducerReturnMoney = (sum: number, currentItem: OrderItemType) => sum + currentItem.returnPrice! * currentItem.amountReturn!;