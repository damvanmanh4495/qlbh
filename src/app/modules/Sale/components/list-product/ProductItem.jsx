import { Button, Input } from "@material-ui/core";
import { useContext, useState } from "react";
import { formatCash } from "../../../../components/ultis";
import SaleContext from "../../../../contexts/SaleContext";
import PopupPrice from "./PopupPrice";

const ProductItem = (props) => {

    const { setChangeItem } = useContext(SaleContext)
    const [showPopup, setShowPopup] = useState({
        price: false,
        note: false
    })
    
    let { product, onDelete , maxDiscount} = props

    const priceForm ={
        price: product.price,
        discount: product.discount,
        tax: product.tax
    }

    let rowClassname = "product-item odd-row"
    if (props.index % 2 === 0) rowClassname = "product-item even-row"

    const handleChange = (e) => {
        let value = parseInt(e.target.value);
        if (value <= 0) value = 1
        if (value > product.quantity) value = product.quantity;
        setChangeItem(product.id, "amount", value)
    }

    const handleShowPopup = (e) => {
        let {name} = e.currentTarget
        setShowPopup({ ...showPopup, [name]: true })
    }

    const closePopup = (name) => {
        setShowPopup({ ...showPopup, [name]: false })
    }

    const handleUpdatePrice = (form) => {
        if (product.price != form.price) setChangeItem(product.id,"price",form.price)
        if (product.discount != form.discount) setChangeItem(product.id,"discount",form.discount)
        if (product.tax != form.tax)setChangeItem(product.id,"tax",form.tax)
    }

    let discountText
    if( priceForm.discount > 0) discountText= <div className="discount-text">{`-${priceForm.discount}`}</div>

    if (product.id)
        return (
            <>
                <PopupPrice show={showPopup.price} close={()=>closePopup("price")} 
                    code={product.code} update={handleUpdatePrice} priceForm={priceForm}  total = {maxDiscount}/>
                <tr className={rowClassname}>
                    <td width="5%">{product.id}</td>
                    <td width="5%"><i className="far fa-trash-alt" onClick={() => onDelete(product.id)}></i></td>
                    <td width="10%" className="text-left" >{product.code}</td>
                    <td width="40%" className="text-left" >{product.name}</td>
                    <td width="10%"> <Input autoFocus={true} type="number" name="quantity" value={product.amount} onChange={handleChange} inputProps={{ 'aria-label': 'quantity', style: { textAlign: 'center' } }} /></td>
                    <td width="15%">
                        <Button onClick={handleShowPopup} variant="text" name="price">{formatCash(product.price - product.discount)}</Button>
                        {discountText}
                    </td>
                    <td width="15%" className="font-weight-bold">{formatCash((product.price - product.discount) * product.amount)}</td>
                </tr>
            </>
        );
    else return null;
}

export default ProductItem;