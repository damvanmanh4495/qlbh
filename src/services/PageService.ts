import AuthService from "./AuthService";
import API from "./API";

const PAGE_BASE_URL = "pages";

export default class PageService {
    public getList = async (parentId?: number): Promise<any> => {
        const token = AuthService.getToken();
        let data;

        await API.get(PAGE_BASE_URL, {
            params: {
                parentId: parentId
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                data = res;
            })
            .catch((error) => {
                if (error.response) {
                    data = error.response;
                }
            });
        return data;
    }
}