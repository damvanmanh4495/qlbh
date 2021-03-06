import React, { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import ButtonLoading from "../Button/ButtonLoading";
import "./style/Header.css";
import ButtonImport from "../Button/ButtonImport";
import ButtonExport from "../Button/ButtonExport";
import BtnExportImportType from "../Button/type/BtnExportImportType";
import ButtonType from "../Button/type/ButtonType";

const useStyles = makeStyles((theme) => ({
  btnGroup: {
    textAlign: "right",
  },
  btnItem: {
    marginLeft: 15,
  },
}));

type Props = {
  buttons?: ButtonType[],
  backBtn?: ButtonType,
  actionBar?: React.ReactNode
  title?: string,
  subTitle?: ReactNode,
  btnImport?: BtnExportImportType,
  btnExport?: BtnExportImportType,
}

const HeadPage: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { buttons, backBtn, title, actionBar, subTitle } = props;

  const switchButton = (item: ButtonType, index: number) => {
    if (item.onClick) {
      return (
        <ButtonLoading
          className={classes.btnItem + " " + item.classNames}
          key={"head-btn-" + index}
          onClick={item.onClick}
          loading={item.loading}
        >
          {item.label}
        </ButtonLoading>
      );
    }
    return (
      <Link to={item.link || "/"} key={"head-btn-" + index}>
        <button className={classes.btnItem + " " + item.classNames}>
          {item.label}
        </button>
      </Link>
    );
  };

  return (
    <div className={"header-page"}>
      {backBtn && backBtn.link && (
        <NavLink to={backBtn.link} className="btn-back">
          <Icon className="icon">keyboard_arrow_left</Icon>
          {backBtn.label}
        </NavLink>
      )}

      <div className="row">
        <div className="col-12 col-sm-8">
          <div className="title-row d-flex">
          <h1 className="title">{title}</h1>
          {subTitle && (<span className="sub-title align-self-end">&nbsp;{subTitle}</span>)}
          </div>
          <div className="action-bar">
            {props.btnImport && <ButtonImport {...props.btnImport} />}
            {props.btnExport && <ButtonExport {...props.btnExport} />}
            {actionBar}
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="text-right">
            {buttons && buttons.map((item, index) => switchButton(item, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadPage;
