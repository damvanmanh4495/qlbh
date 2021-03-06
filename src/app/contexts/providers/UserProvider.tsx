import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../../services/AuthService";
import UserContext from "../UserContext";
import AppContext from "../AppContext";
import UserType from "./UserType";

const UserProvider: React.FC = (props) => {
  const appCtx = useContext(AppContext);
  const { openNotifier, levels } = appCtx;
  const [token, setToken] = useState(AuthService.getUser());
  const [userInfo, setUserInfo] = useState<UserType | undefined>({});

  const handleSignIn = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);
    if (!response) {
      openNotifier(true, "Lỗi hệ thống", levels.warn);
    }
    if (response && response.status === 200) {
      openNotifier(true, "Đăng nhập thành công", levels.success);
      setToken(AuthService.getUser());
    }
    if (response && response.status === 401) {
      openNotifier(true, "username/password không đúng", levels.warn);
    }
    return response;
  };

  const hasRole = (pageId: number, roleId?: number) => {
    if (!userInfo || !userInfo.group || !userInfo.group.tenant_roles) {
      return false;
    }
    const tenantRoles = userInfo.group.tenant_roles;
    const role = tenantRoles.find(e => {
      return e.page_id === pageId
    });

    if (!role) {
      return false;
    }

    if (role && !roleId) {
      return true;
    }
    
    return role?.roles_id.includes(pageId);
  }

  const handleSignOut = () => {
    AuthService.logout();
    setToken(undefined);
    setUserInfo(undefined);
  };

  useEffect(() => {
    const response = AuthService.getUserInfo();
    if (!response) {
      return;
    }
    response.then((result) => {
      if (result && result.status === 200) {
        setUserInfo(result.data);
      } else {
        AuthService.removeUserSession();
        setToken(undefined);
        setUserInfo(undefined);
      }
    });
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token: token,
        userInfo: userInfo,
        handleSignIn: handleSignIn,
        handleSignOut: handleSignOut,
        hasRole: hasRole
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;