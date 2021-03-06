import { Tooltip } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { formatCash } from "../../../../components/ultis";
import { OrderItemType } from "./OrderItem";

export interface OrderReturnItemProps {
    data: OrderItemType,
    onChange: Function
}

const OrderReturnItem: React.FC<OrderReturnItemProps> = (props) => {

    let { id, quantity, discount, tax, note, product_id, product_name, product_code, price, return_quantity, returnPrice, amountReturn } = props.data

    let tooltipSuggestReturnMoney = (
        <div>
            <div>{`Giá gốc : ${price}`}</div>
            <div>{`Chiết khấu : ${discount}`}</div>
            <div>{`VAT : ${tax}%`}</div>
        </div>
    )

    let maxAmountReturn = quantity - return_quantity

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name } = e.target
        let value = parseInt(e.target.value)
        if (name === "amountReturn")
            value = validateAmountReturn(value);
        if (value < 0) value = 0
        props.onChange(id,name,value)
    }

    const validateAmountReturn = (amountReturn: number) => {
        if (amountReturn > maxAmountReturn)
            return maxAmountReturn;
        return amountReturn;
    }

    return (
        <tr>
            <td width="15%">{product_code}</td>
            <td width="25%">{product_name}</td>
            <td width="20%" className="text-center"><input name="amountReturn" style={{ width: "30%" }} type="number" value={amountReturn} onChange={handleChange} /> /  {maxAmountReturn} </td>
            <td className="text-right" width="20%" >
                <Tooltip title={tooltipSuggestReturnMoney} placement="bottom"  >
                    <input style={{ width: "80%" }} name="returnPrice" value={returnPrice} onChange={handleChange} type="number" />
                </Tooltip>
            </td>
            <td className="text-right" width="20%" >{formatCash(returnPrice! * amountReturn! || 0)}</td>
        </tr>
    );
}

export default OrderReturnItem;