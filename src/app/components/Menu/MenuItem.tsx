import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import MenuItemType from "./MenuItemType";

type Props = {
  active?: boolean;
  openDrawer?: boolean;
  handleToggle: (menuIdSelected?: number | undefined) => void
  item: MenuItemType,
}

const MenuItem: React.FC<Props> = (props) => {
  const { item, openDrawer, active, handleToggle } = props;

  return (
    <li className="menu-item">
      {item.children ? (
        <div className="a" onClick={() => handleToggle(item.id)}>
          <i className={item.icon + " icon"}></i>
          <span className="label">{openDrawer && item.name}</span>
          <Icon className={"icon right" + (active ? " active" : "")}>
            {openDrawer ? "keyboard_arrow_right" : ""}
          </Icon>
        </div>
      ) : (
        <NavLink
          activeClassName="active"
          exact
          className={"a" + (active ? " active" : "")}
          to={item.url}
        >
          <i className={item.icon + " icon"}></i>
          <span className="label">{openDrawer && item.name}</span>
        </NavLink>
      )}
      {item.children && (
        <ul className={"menu-list children " + (active ? "show" : "")}>
          {item.children &&
            item.children.map((subItem: {url: string, name: string}, subIndex: number) => (
              <li
                className="menu-item child"
                key={`drawer-sub-menu-${subIndex}`}
              >
                <NavLink
                  activeClassName="active"
                  className="a"
                  exact
                  to={subItem.url}
                >
                  <span className="label">{openDrawer && subItem.name}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
