import Paper from "../../../../components/Paper/Paper";

export interface CustomerInfoProps {
    name?: string,
    phone?: string
}

const CustomerInfo: React.FC<CustomerInfoProps> = (props) => {
    let { name, phone } = props
    return (
        <Paper>
            <div className="form-content">
                <h4>Thông tin khách hàng</h4>
                <div className="or-dt-user-info d-flex align-items-center" >
                    <div className="w-50 d-flex align-items-center">
                        <i className="fas fa-user-circle"></i>
                        <span className="customer-name">{name}</span>
                    </div>
                    <div className="customer-phone"><b>{phone}</b></div>
                </div>
            </div>
        </Paper>
    );
}

export default CustomerInfo;