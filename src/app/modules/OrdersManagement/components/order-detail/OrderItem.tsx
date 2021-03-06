import { formatCash } from "../../../../components/ultis";

export interface Props {
    data: OrderItemType
}

export type OrderItemType = {
    id?: number,
    quantity: number,
    discount: number,
    tax: number,
    note?: string,
    product_id?: number,
    product_name?: string,
    product_code?: string,
    price: number,
    return_quantity: number,
    amountReturn?: number,
    returnPrice?: number
}

const OrderItem: React.FC<Props> = (props) => {
    let { id, quantity, discount, tax, note, product_id, product_name, product_code, price } = props.data
    return (
        <tr>
            <td width="15%">{product_code}</td>
            <td width="25%">{product_name}</td>
            <td width="10%" className="text-center">{quantity}</td>
            <td className="text-right" width="13%" >{formatCash(price)}</td>
            <td className="text-right" width="13%" >{formatCash(discount)}</td>
            <td className="text-right" width="10%" >{tax}</td>
            <td className="text-right" width="14%" >{formatCash(quantity * (price - discount))}</td>
        </tr>
    );
}

export default OrderItem;