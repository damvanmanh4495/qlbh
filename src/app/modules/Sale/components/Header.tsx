import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { URL_PRODUCTS } from "../../../../services/API";
import "./style/header.css"
import SuggestInput from "./suggest-input/SuggestInput"
import Tab from "./Tab"

const SaleHeader = () => {
    return (
        <div className="header-sale">
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-4">
                        <div className="suggest-input">
                            <SuggestInput title="Thêm sản phẩm vào đơn (F3)" disableUnderline={true} type="product" url={URL_PRODUCTS} reset={true} field="code" />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <Tab />
                    </div>
                    <div className="col-lg-1">
                        <div className="right-button">
                            <Tooltip title="Quay về trang quản trị " >
                                <Link to="/"><button className="bt-back"> <i className="fas fa-home"></i></button></Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default SaleHeader;