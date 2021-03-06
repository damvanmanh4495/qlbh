import API from "../API";
import AuthService from "../AuthService";
import Service from "./Service";

export default class BaseService implements Service {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public save = async (domain: any): Promise<any> => {
        let response = null;
        const token = AuthService.getToken();

        if (!domain.id) {
            await API.post(
                this.baseURL,
                { ...domain },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => {
                response = res;
            }).catch((error) => {
                if (error.response) {
                    response = error.response;
                }
            });
            return response;
        }

        await API.put(
            `${this.baseURL}/${domain.id}`,
            { ...domain },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((res) => {
            response = res;
        }).catch((error) => {
            if (error.response) {
                response = error.response;
            }
        });
        return response;
    };

    public getList = async (page: number, size: number, params?: {}): Promise<any> => {
        let data;
        if (!this.validateGetList(page, size)) {
            return {
                status: 404,
                message: "Parameters không hợp lệ"
            };
        }

        await API.get(this.baseURL, {
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

    public getOne = async (id: number): Promise<any> => {
        let response;
        await API.get(`${this.baseURL}/${id}`)
            .then((res) => {
                response = res;
            }).catch((error) => {
                if (error.response) {
                    response = error.response;
                }
            });
        return response;
    };

    public delete = async (id: number): Promise<any> => {
        let response = null;
        const token = AuthService.getToken();

        await API.delete(`${this.baseURL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            response = res;
        }).catch((error) => {
            if (error.response) {
                response = error.response;
            }
        });
        return response;
    };

    protected validateGetList(page: number, size: number): boolean {
        if (page < 1) {
            return false;
        }
        if (size < 1) {
            return false;
        }
        return true;
    }

    public suggest = async ( string: string): Promise<any> => {
        let url = this.baseURL +"/suggest"
        let params = { string}
        let response ;
        await API.get(
            url,{
                params
            }       
        ).then((res) => {
            response = res;
        }).catch((error) => {
            if (error.response) {
                response = error.response;
            }
        });
        return response;
    }
}