import React from 'react';
import "./style/ImportExportButton.css";
import BtnExportImportType from "./type/BtnExportImportType";

const ButtonImport: React.FC<BtnExportImportType> = (props) => {

    return (
        <button
            className="btn btn-transparent"
            onClick={props.onClick}
        >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M13.707 6.707a.996.996 0 0 1-1.414 0L11 5.414V13a1 1 0 1 1-2 0V5.414L7.707 6.707a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414zM17 18H3a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2z"></path>
            </svg>
            {props.title || <span>Nhập file</span>}
            {props.children}
        </button>
    )
}

export default ButtonImport;