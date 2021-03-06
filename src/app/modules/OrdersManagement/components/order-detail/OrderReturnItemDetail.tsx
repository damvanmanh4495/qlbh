import { formatCash } from "../../../../components/ultis";

export interface OrderReturnItemDetailProps {
    data: any,
}

const OrderReturnItemDetail: React.FC<OrderReturnItemDetailProps> = (props) => {
    let { id, order_item_id, product_code, product_name, quantity, unit_price } = props.data

    return (
        <tr>
            <td width="15%">{product_code}</td>
            <td width="25%">{product_name}</td>
            <td width="20%" className="text-center">{quantity}</td>
            <td className="text-right" width="20%" >{unit_price}</td>
            <td className="text-right" width="20%" >{formatCash(quantity * unit_price || 0)}</td>
        </tr>
    );
}

export default OrderReturnItemDetail;