import Service from "./base/Service";
import AuthService from "./AuthService";
import API from "./API";

const CATEGORY_BASE_URL = "categories";

export default class CategoryService implements Service {

  public save = async (category: any): Promise<any> => {
    let response = null;
    const token = AuthService.getToken();

    if (!category.id) {
      await API.post(
        CATEGORY_BASE_URL,
        {
          ...category,
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
      `${CATEGORY_BASE_URL}/${category.id}`,
      {
        ...category,
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

    await API.get(CATEGORY_BASE_URL, {
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

  public suggest = async (query?: string): Promise<any> => {
    const token = AuthService.getToken();
    let data;

    await API.get(CATEGORY_BASE_URL + "/suggest", {
      params: {
        query: query || "",
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

    await API.get(`${CATEGORY_BASE_URL}/${id}`, {
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
  };

  public delete = async (id: number): Promise<any> => {
    let response = null;
    const token = AuthService.getToken();

    await API.delete(`${CATEGORY_BASE_URL}/${id}`, {
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