import AuthService from "./AuthService";
import API from "./API";

const BRAND_BASE_URL = "brands";

export default class BrandService {

  public save = async (domain: any): Promise<any> => {
    let response = null;
    const token = AuthService.getToken();

    if (!domain.id) {
      await API.post(
        BRAND_BASE_URL,
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
      `${BRAND_BASE_URL}/${domain.id}`,
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

  public getList = async (name?: string): Promise<any> => {
    const token = AuthService.getToken();
    let data;

    await API.get(BRAND_BASE_URL, {
      params: {
        name: name || "",
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