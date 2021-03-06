import { Input } from "@material-ui/core";
import { ChangeEvent, useContext, useState } from "react";
import Popup from "../../../../components/Popup/Popup";
import AppContext from "../../../../contexts/AppContext";

export interface PopupPriceProps {
    show: boolean,
    close: Function,
    code: string,
    priceForm: PriceForm,
    update: Function,
    total: number
}

export type PriceForm = {
    price: number,
    discount: number,
    tax: number,
}

const PopupPrice: React.SFC<PopupPriceProps> = (props) => {
    const { show, close, code, priceForm, update , total} = props
    const { openNotifier, levels } = useContext(AppContext);

    const [form, setForm] = useState({
        price: priceForm.price,
        discount: priceForm.discount,
        tax: priceForm.tax
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value)
        let { name } = e.target
        if (value < 0) value = 0
        if (name == "tax")
            if (value > 10) value = 10
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = () => {
        
        if (form.discount > form.price || total < 0) {
            openNotifier(
                true,
                "Chiết khấu lớn hơn đơn giá sản phẩm",
                levels.error
            );
        }
        else
            update(form)
    }

    let body = (
        <table className="tb-2-col-w-50">
            <tbody>
                <tr>
                    <td className="col-text">Đon giá</td>
                    <td className="col-num" >
                        <Input
                            autoFocus={true}
                            type="number"
                            name="price"
                            value={form.price}
                            // inputProps={{ min: 0, max: maxDiscount, style: { textAlign: 'right' } }}
                            style={{ width: "100%", textAlign: "right" }}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="col-text">Chiết khấu thường</td>
                    <td className="col-num" >
                        <Input
                            type="number"
                            name="discount"
                            style={{ width: "100%", textAlign: "right" }}
                            value={form.discount}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="col-text">Thuế</td>
                    <td className="col-num1" >
                        <Input
                            type="number"
                            name="tax"
                            style={{ width: "100%", textAlign: "right" }}
                            value={form.tax}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
    return (
        <>
            <Popup
                buttonSubmit={{ label: "Áp dụng", onClick: handleSubmit, classname: "btn-primary" }}
                title={"Thông tin sản phẩm: " + code}
                show={show}
                onClose={close}
                body={body}
            />
        </>
    );
}

export default PopupPrice;