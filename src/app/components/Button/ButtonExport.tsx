import React from 'react';
import "./style/ImportExportButton.css";
import BtnExportImportType from "./type/BtnExportImportType";

const ButtonExport: React.FC<BtnExportImportType> = (props) => {

    return (
        <button
            className="btn btn-transparent"
            onClick={props.onClick}
        >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 13.707l-3-3a1 1 0 0 1 1.414-1.414L9 10.586V3a1 1 0 1 1 2 0v7.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0zM17 16a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h14z"></path>
            </svg>
            {props.title || <span>Xuất file</span>}
            {props.children}
        </button>
    )
}

export default ButtonExport;