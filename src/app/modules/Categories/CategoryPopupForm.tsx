import React, { useState } from 'react';
import Popup from "../../components/Popup/Popup";
import CategoryForm from './components/CategoryForm';

type Props = {
    show: boolean,
    category: any,
    setCategory: React.Dispatch<any>,
    close: () => void,
    onSubmit: () => void,
}

const CategoryPopupForm: React.FC<Props> = (props) => {
    const {show, category, setCategory, close, onSubmit} = props;

    let label = "Thêm mới loại sản phẩm";
    let btnSubmitLabel = "Thêm mới";
    if (category && category.id) {
        label = "Cập nhật loại sản phẩm";
        btnSubmitLabel = "Lưu";
    }

    return (
        <Popup
            buttonSubmit={{ label: btnSubmitLabel, onClick: onSubmit, classname: "btn btn-primary" }}
            title={label}
            show={show}
            onClose={close}
            body={<CategoryForm category={category} setCategory={setCategory} />}
        />
    )
}

export default CategoryPopupForm;