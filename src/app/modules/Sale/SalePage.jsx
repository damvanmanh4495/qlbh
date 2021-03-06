import SaleProvider from "../../contexts/providers/SaleProvider";
import SaleHeader from "./components/Header";
import ListProduct from "./components/list-product/ListProduct";
import PaymentMenu from "./components/payment-menu/PaymentMenu";

const SalePage = () => {
    return (
        <SaleProvider>
            <div className="sale-page">
                <SaleHeader />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <ListProduct />
                        </div>
                        <div className="col-lg-4">
                            <PaymentMenu />
                        </div>
                    </div>
                </div>
            </div>
        </SaleProvider>
    );
}

export default SalePage;