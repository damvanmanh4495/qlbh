import { FormControlLabel, Input, Radio, RadioGroup } from "@material-ui/core";
import { useState } from "react";

const FormDiscount = (props) => {

    let { onChangeDiscount, maxDiscount } = props
    const [discount, setDiscount] = useState({
        type: '%',
        value: 0
    });

    const handleChange = (e) => {
        let { name, value } = e.target
        if (value < 0) value = 0
        if (value > maxDiscount) value = maxDiscount
        if (discount.type ==='%') 
            if (value >100) value =100
        setDiscount({ ...discount, [name]: value })
        onChangeDiscount({ ...discount, [name]: value })
    }

    return (
        <>
            <table className="tb-2-col-w-50">
                <tbody>
                    <tr>
                        <td className="col-text">Chiết khấu thường</td>
                        <td className="col-num  " >
                            <RadioGroup row name="type" value={discount.type} onChange={handleChange}>
                                <FormControlLabel value="%" control={<Radio />} label="%" />&nbsp;&nbsp;
                                <FormControlLabel value="đ" control={<Radio />} label="đ" />
                            </RadioGroup>
                            <Input
                                type="number"
                                name="value"
                                value={discount.value}
                                inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                style={{ width: "100%" }}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default FormDiscount;