import API from "./API";

const CUSTOMER_BASE_URL = "customers";
export default class CustomerService {

    public getListOrder = async (idCustomer: number, page: number, size: number, params?: {}): Promise<any> => {
        let data;

        await API.get(`${CUSTOMER_BASE_URL}/${idCustomer}/orders`, {
            params: {
                page: page,
                size: size,
                ...params
            }
        }).then((res) => {
            data = res;
        }).catch((error) => {
            if (error.response) {
                data = error.response;
            }
        });
        return data;
    };
}