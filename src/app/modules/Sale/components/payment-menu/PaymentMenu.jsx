import { Input, InputAdornment } from "@material-ui/core";
import { useContext, useState } from "react";
import { URL_CUSTOMERS, URL_ORDER } from "../../../../../services/API";
import BaseService from "../../../../../services/base/BaseService";
import Popup from "../../../../components/Popup/Popup";
import { formatCash, printBill } from "../../../../components/ultis";
import AppContext from "../../../../contexts/AppContext";
import SaleContext from "../../../../contexts/SaleContext";
import Bill from "../bill/Bill";
import SuggestInput from "../suggest-input/SuggestInput"
import FormDiscount from "./FormDiscount";
import FormCustomer from "./FormCustomer";
import "./style/style.css"

const PaymentMenu = () => {

    const [showPopup, setShowPopup] = useState({
        discount: false,
        customer: false
    });

    const { orderItems, tabChosen, setOrderField, customerChosen, setOrderItems, setChosen } = useContext(SaleContext)
    const { openNotifier, levels } = useContext(AppContext);
    const service = new BaseService(URL_ORDER)
    const orderDetail = orderItems.filter(list => list.tab == tabChosen)[0]
    const [discount, setDiscount] = useState({
        type: '%',
        value: 0
    });

    let money = 0, tax = 0, total = 0, return_money = 0, countProduct = 0;

    money = orderDetail.products.reduce(reducerMoney, 0)
    tax = orderDetail.products.reduce(reducerTax, 0)
    countProduct = orderDetail.products.reduce(reducerCount, 0)
    total = money + tax - orderDetail.discount
    return_money = orderDetail.deposit - total

    const handChangeDiscount = (val) => {
        setDiscount(val)
    }

    const calculateDiscount = () => {
        if (discount.type === "%")
            setOrderField("discount", money * discount.value / 100)
        else
            setOrderField("discount", discount.value)
    }

    const handleShowPopup = (name) => {
        setShowPopup({ ...showPopup, [name]: true })
    }

    const closePopup = (name) => {
        setShowPopup({ ...showPopup, [name]: false })
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setOrderField(name, value)
    }

    const saveOrder = async () => {
        let items_req = orderDetail.products.map(product => {
            let { discount, price, tax, note } = product
            return {
                product_id: product.id,
                quantity: product.amount,
                discount,
                price,
                tax,
                note
            }
        })

        let body_order_req = {
            customer_id: customerChosen.id || 1,
            customer_name: customerChosen.name,
            customer_phone: customerChosen.phone_no,
            code: "OD" + Math.floor(Math.random() * 100000),
            deposit: orderDetail.deposit,
            total_money: total,
            tax,
            payment_method: 1,
            discount: orderDetail.discount,
            note: orderDetail.note,
            status: 1,
            items: items_req
        }

        let res = await service.save(body_order_req)
        if (res && res.status === 201) {
            printBill()
            clearOrder()
        }
        else {
            openNotifier(
                true,
                "L??u ????n th???t b???i. Xin vui l??ng th??? l???i sau !",
                levels.error
            );
        }
    }

    let bill = {
        customer_name: customerChosen.name || "Kh??ch l???",
        deposit: orderDetail.deposit,
        total_money: total,
        tax,
        payment_method: 1,
        discount: orderDetail.discount,
        note: orderDetail.note,
        status: 1,
        money,
        return_money,
        products: orderDetail.products
    }

    const handlePay = () => {
        if (countProduct == 0) {
            openNotifier(
                true,
                "Vui l??ng ch???n s???n ph???m v??o ????n h??ng",
                levels.error
            );
        }
        else if (bill.return_money < 0)
            openNotifier(
                true,
                "S??? ti???n thanh to??n ch??a ?????",
                levels.error
            );
        else {
            saveOrder()
        }

    }

    const clearOrder = () => {
        let newList = orderItems
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].tab == tabChosen) {
                newList[i] = { ...newList[i], products: [], discount: 0, deposit: 0, note: "" }
            }
        }
        setOrderItems([...newList])
    }

    const handleCreateCustomer = async (customer) => {
        let service = new BaseService(URL_CUSTOMERS);
        let body_req = {
            name: customer.name,
            email: customer.email,
            address: customer.address,
            description: customer.note,
            status: 1,
            phone_no: customer.phone,
            code: "KH" + Math.floor(Math.random() * 100000)
        }
        let res = await service.save(body_req)
        if (res && res.status === 201){
            openNotifier(
                true,
                "L??u kh??ch h??ng th??nh c??ng",
                levels.success
            );
        } else {
            openNotifier(
                true,
                "L??u kh??ch h??ng th???t b???i " ,
                levels.error
            );
        }
    }

    return (
        <div className="payment-menu">
            <Popup
                buttonSubmit={{ label: "??p d???ng", onClick: calculateDiscount, classname: "btn-primary" }}
                title={"Chi???t kh???u ????n h??ng"}
                show={showPopup.discount}
                onClose={() => closePopup("discount")}
                body={<FormDiscount maxDiscount={money + tax} onChangeDiscount={handChangeDiscount} />}
            />
            <FormCustomer show={showPopup.customer} close={() => closePopup("customer")} onCreate={handleCreateCustomer} />
            <SuggestInput title="Th??m kh??ch h??ng v??o ????n (F4)" disableUnderline={false} type="customer"
                url={URL_CUSTOMERS} reset={false} onAdd={() => handleShowPopup("customer")} field="phone_no" />
            <div className="container-fluid">
                <table>
                    <tbody>
                        <tr>
                            <td className="col-text">{`T???ng ti???n (${countProduct} s???n ph???m)`}</td>
                            <td className="col-num">{formatCash(money)}</td>
                        </tr>
                        <tr>
                            <td className="col-text">VAT</td>
                            <td className="col-num">{formatCash(tax)}</td>
                        </tr>
                        <tr>
                            <td className="col-text">Chi???t kh???u</td>
                            <td className="col-num " onClick={() => handleShowPopup("discount")}>
                                <Input inputProps={{ min: 0, style: { textAlign: 'right' } }} value={orderDetail.discount} type="number" ></Input>
                            </td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td className="col-text">Kh??ch ph???i tr???</td>
                            <td className="col-num">{formatCash(total)}</td>
                        </tr>
                        <tr>
                            <td className="col-text">Ti???n kh??ch ????a</td>
                            <td className="col-num">
                                <Input
                                    inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                    value={orderDetail.deposit}
                                    name="deposit"
                                    onChange={handleChange}
                                    type="number" >
                                </Input></td>
                        </tr>
                        <tr>
                            <td className="col-text">Ti???n th???a</td>
                            <td className="col-num">{formatCash(return_money)}</td>
                        </tr>
                    </tbody>
                </table>
                <div>Ghi ch??</div>
                <div className="note">
                    <Input
                        id="standard-adornment-amount"
                        name="note"
                        placeholder="Nh???p ghi ch?? ????n h??ng"
                        value={orderDetail.note}
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start"><i className="fas fa-pen"></i></InputAdornment>}
                    />
                </div>

                <div className="bt-footer">
                    <div className="row">
                        <div className="col-lg-4">
                            <button className="bt-payment-type">Ch???n h??nh th???c thanh to??n</button>
                        </div>
                        <div className="col-lg-8">
                            <Bill data={bill} title={"H??a ????n b??n h??ng"}
                                footer={[{ label: "C???ng ti???n h??ng", value: formatCash(bill.money) },
                                { label: "Thu???", value: formatCash(bill.tax) },
                                { label: "Chi???t kh???u", value: formatCash(bill.discount) },
                                { label: "Kh??ch ph???i tr???", value: formatCash(bill.total_money) },
                                { label: "Ti???n kh??ch ????a", value: formatCash(bill.deposit) },
                                { label: "Tr??? l???i", value: formatCash(bill.return_money) },
                                ]} />
                            <button className="bt-deposit" onClick={handlePay}>Thanh to??n (F1)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentMenu;

const reducerMoney = (sum, currentProduct) => sum + (currentProduct.price - currentProduct.discount) * currentProduct.amount;
const reducerCount = (sum, currentProduct) => sum + currentProduct.amount;
const reducerTax = (sum, currentProduct) => sum + (currentProduct.price - currentProduct.discount) * currentProduct.tax * currentProduct.amount / 100;

export { reducerMoney, reducerCount, reducerTax }