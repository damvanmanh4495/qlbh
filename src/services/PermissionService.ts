import Service from "./base/Service";
import AuthService from "./AuthService";
import API from "./API";

const PERMISSION_BASE_URL = "groups";

export default class PermissionService implements Service {

    public save = async (domain: any): Promise<any> => {
        let response = null;
        const token = AuthService.getToken();
    
        if (!domain.id) {
          await API.post(
            PERMISSION_BASE_URL,
            {
              ...domain,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => {
              response = res;
            })
            .catch((error) => {
              if (error.response) {
                response = error.response;
              }
            });
          return response;
        }
    
        await API.put(
          `${PERMISSION_BASE_URL}/${domain.id}`,
          {
            ...domain,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => {
            response = res;
          })
          .catch((error) => {
            if (error.response) {
              response = error.response;
            }
          });
        return response;
      }

    public getList = async (page: number, size: number, params?: {}): Promise<any> => {
        let data;

        await API.get(PERMISSION_BASE_URL, {
            params: {
                page: page,
                size: size,
                ...params
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

    public getOne = async (id: number): Promise<any> => {
        let data;

        await API.get(`${PERMISSION_BASE_URL}/${id}`)
            .then((res) => {
                data = res;
            })
            .catch((error) => {
                if (error.response) {
                    data = error.response;
                }
            });
        return data;
    };

    public delete = async (id: number): Promise<any> => {
        let response = null;
        const token = AuthService.getToken();

        await API.delete(`${PERMISSION_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                response = res;
            })
            .catch((error) => {
                if (error.response) {
                    response = error.response;
                }
            });
        return response;
    }
}