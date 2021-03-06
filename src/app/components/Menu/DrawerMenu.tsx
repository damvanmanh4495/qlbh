import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "./MenuItem";
import MenuItemType from "./MenuItemType";
import "./style/DrawerMenu.css";
import UserContext from "../../contexts/UserContext";

type Props = {
  openDrawer?: boolean;
  classes: Record<string, string>,
  menuList: MenuItemType[],
  pathname: string,
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerMenu: React.FC<Props> = (props) => {
  const { classes, openDrawer, setOpenDrawer, pathname, menuList } = props;

  const userCtx = useContext(UserContext);
  const { handleSignOut } = userCtx;

  const [openMenuAccount, setOpenMenuAccount] = React.useState(false);
  const [menuIdActive, setMenuIdActive] = useState<number>();

  const getMenuIdByPath = (menuList: MenuItemType[], pathname: string, openDrawer?: boolean): void => {
    if (!openDrawer) {
      setMenuIdActive(undefined);
      return;
    }
    menuList.forEach((item: MenuItemType) => {
      if (!item.children) {
        return;
      }
      const subItems = item.children.filter((item: { url: string }) => {
        return pathname.search(item.url) !== -1;
      });
      if (subItems && subItems.length) {
        setMenuIdActive(item.id);
        return;
      }
    });
  }

  useEffect(() => {
    getMenuIdByPath(menuList, pathname, openDrawer)
  }, [menuList, pathname, openDrawer])

  const handleOpenMenuAccount = () => {
    setOpenMenuAccount(!openMenuAccount);
  };

  const handleDrawerClose = () => {
    getMenuIdByPath(menuList, pathname, !openDrawer);
    setOpenDrawer(!openDrawer);
  };

  const handleToggle = (menuIdSelected?: number) => {
    if (!openDrawer) {
      return;
    }
    menuList.forEach((e) => {
      if (menuIdActive === menuIdSelected) {
        setMenuIdActive(undefined);
        return;
      }
      if (e.id === menuIdSelected) {
        setMenuIdActive(menuIdSelected);
      }
    });
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openDrawer,
        [classes.drawerClose]: !openDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
          "drawer-paper": true,
        }),
      }}
    >
      <div className={classes.toolbar + " toolbar"}>
        <div className={openDrawer ? "logo" : "d-none"}>
          <img src={process.env.PUBLIC_URL + "/sapo.png"} alt="LOGO" />
        </div>
        <button
          className="btn-toggle-menu 1"
          onClick={() => handleDrawerClose()}
        >
          <Icon style={{ fontSize: 37 }}>more_vert</Icon>
        </button>
      </div>
      <hr className="menu-divider divider-bottom" />
      <ul className="menu-list">
        {menuList.map((item: MenuItemType, index: number) => (
          <MenuItem
            key={`drawer-menu-${index}`}
            item={item}
            active={item.id === menuIdActive}
            openDrawer={openDrawer}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
      <hr className="menu-divider divider-bottom" />
      <ul
        className={
          clsx(classes.drawer, {
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }) + " menu-detail-acount"
        }
        onClick={() => handleOpenMenuAccount()}
      >
        <li>
          <div className="d-flex w-100 align-items-center">
            <span>
              <Avatar className="avatar">{"DP"}</Avatar>
            </span>
            <span className={openDrawer ? "label d-flex" : "d-none"}>
              {userCtx.userInfo && userCtx.userInfo.name}
            </span>
            <span className={openDrawer ? "btn-sub-menu d-flex" : "d-none"}>
              <Icon className="icon right">keyboard_arrow_down</Icon>
            </span>
          </div>
          <ul className={openMenuAccount ? "show sub-menu" : "sub-menu"}>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="a"
                to="/profile"
                target="_blank"
                exact
              >
                <Icon className="icon">person</Icon>
                <span className="label">Hồ sơ cá nhân</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <div className="a" onClick={handleSignOut}>
                <Icon className="icon">exit_to_app</Icon>
                <span className="label">Thoát</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </Drawer>
  );
}

export default DrawerMenu;
