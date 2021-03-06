import API from "./API";
import AuthService from "./AuthService";
import Service from "./base/Service";

const PRODUCT_BASE_URL = "products";
export default class ProductService implements Service {

  public save = async (product: any): Promise<any> => {
    let response = null;
    const token = AuthService.getToken();
    if (!product.price) {
      product.price = 0;
    }

    if (!product.id) {
      await API.post(
        PRODUCT_BASE_URL,
        {
          ...product,
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
      `${PRODUCT_BASE_URL}/${product.id}`,
      {
        ...product,
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
    const token = AuthService.getToken();
    let data;

    await API.get(PRODUCT_BASE_URL, {
      params: {
        page: page,
        size: size,
        ...params
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

  public getOne = async (id: number): Promise<any> => {
    const token = AuthService.getToken();
    let data;

    await API.get(`${PRODUCT_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    )
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

    await API.delete(`${PRODUCT_BASE_URL}/${id}`, {
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

  public deleteList = async (ids: number[]): Promise<any> => {
    return {
      status: 200,
    };
  }
}