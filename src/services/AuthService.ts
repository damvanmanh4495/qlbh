import API from "./API";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const AUTH_BASE_URL = "auth";

class AuthService {
  logout = () => {
    this.removeUserSession();
  };

  login = async (username: string, password: string): Promise<any> => {
    let response;
    if (!this.validate(username, password)) {
      return { status: 401 };
    }
    await API.post(AUTH_BASE_URL + "/signin", {
      username: username,
      password: password,
    })
      .then((res) => {
        response = res;
        this.setUserSession({
          username: username,
          accessToken: res.data.accessToken,
        });
      })
      .catch((error) => {
        if (error.response) {
          response = error.response;
        }
      });
    return response;
  };

  getUserInfo = async (): Promise<any> => {
    let response;
    const token = this.getToken();
    if (!token) {
      return;
    }

    await API.get("/users/profile", {
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
  };

  validate = (username: string, password: string) => {
    if (!username || !password) {
      return false;
    }
    if (username.length < 5 || username.length > 32) {
      return false;
    }
    if (password.length < 5 || password.length > 32) {
      return false;
    }
    return true;
  };

  getUser = () => {
    return cookies.get("user");
  };

  getToken = (): string | null => {
    const userCookie = cookies.get("user");
    if (userCookie && userCookie.accessToken) {
      return userCookie.accessToken;
    }
    return null;
  };

  // remove the token and user from the cookies
  removeUserSession = (): void => {
    cookies.remove("user");
  };

  // set the token and user from the cookies
  setUserSession = (user: any) => {
    cookies.set("user", user, { path: "/" });
  };
}

export default new AuthService();
