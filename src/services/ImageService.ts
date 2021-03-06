import AuthService from "./AuthService";
import API from "./API";

export default class ImageService {

    public save = async (file: any, productId: number): Promise<any> => {
        let response = null;
        let formData = new FormData();
        formData.append('file', file);
        const token = AuthService.getToken();

        await API.post(
            `products/${productId}/images`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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
}