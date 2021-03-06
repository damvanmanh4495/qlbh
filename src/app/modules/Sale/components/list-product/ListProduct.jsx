import ProductItem from "./ProductItem"
import "./style/style.css"
import { useContext } from "react";
import SaleContext from "../../../../contexts/SaleContext";
import { reducerMoney, reducerTax } from "../payment-menu/PaymentMenu";
const ListProduct = () => {

    const { orderItems, tabChosen, handleDelProductItem } = useContext(SaleContext)

    const orderDetail = orderItems.filter(list => list.tab == tabChosen)[0]
    let money = orderDetail.products.reduce(reducerMoney, 0)
    let tax = orderDetail.products.reduce(reducerTax, 0)
    let total = money + tax - orderDetail.discount

    const handleDelete = (id) => {
        handleDelProductItem(id)
    }

    return (
        <div className="products-sale">
            <table>
                <tbody>
                    {orderItems.map(x => {
                        if (x.tab == tabChosen) {
                            return (x.products.map(item =>
                                <ProductItem key={item.id} index={x.products.indexOf(item)} product={item} onDelete={handleDelete} maxDiscount={total} />
                            ))
                        }
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default ListProduct;