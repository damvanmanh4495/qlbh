import React, { useState } from 'react';
import { RouteComponentProps } from "react-router";
import BaseDataTable from '../../components/BaseDataTable';
import ColumnType from "../../components/Table/type/ColumnType";
import ProductService from '../../../services/ProductService';
import ActionBar from './components/ActionBar';

const ProductsPage: React.FC<RouteComponentProps<any>> = (props) => {

    const [columns] = useState<ColumnType[]>([
        {
            field: "images",
            valueField: "url",
            type: "images"
        },
        {
            field: "name",
            label: "Sản phẩm",
            type: "link",
        },
        {
            field: "category",
            valueField: "name",
            label: "Loại",
            type: "children",
        },
        {
            field: "brand",
            valueField: "name",
            label: "Nhãn hiệu",
            type: "children",
        },
        {
            field: "quantity",
            label: "Có thể bán",
            align: "center",
            type: "variants"
        },
        {
            field: "status",
            label: "Trạng thái",
            type: "status",
            mapper: [
                {
                    value: 0,
                    label: "Ngừng giao dịch",
                    color: "red"
                },
                {
                    value: 1,
                    label: "Đang giao dịch",
                    color: "green"
                }
            ]

        },
        {
            field: "created_on",
            label: "Ngày khởi tạo",
            type: "date",
            format: "DD/MM/YYYY HH:mm",
        },
    ]);
    const confirmDelete = {
        title: "Xóa sản phẩm",
        message: "Thao tác này sẽ xóa sản phẩm bạn đã chọn. Thao tác này không thể khôi phục.",
        messageSuccess: "Xóa sản phẩm thành công"
    }
    const titlePage = "Sản phẩm";
    const seeker = {
        placeholder: "Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode",
    }
    const filter = {
        label: "Lọc sản phẩm",
    }
    const tabs = ["Tất cả sản phẩm", "Tìm kiếm ..."];
    let search = new URLSearchParams(props.location.search);
    const query = {
        page: search.get("page") || 1,
        size: search.get("size") || 20,
        query: search.get("query") || "",
    };

    return (
        <BaseDataTable
            baseURL="products"
            createLink="products/create"
            service={new ProductService()}
            columns={columns}
            confirmDelete={confirmDelete}
            titlePage={titlePage}
            checkboxSelection
            seeker={seeker}
            filter={filter}
            tabs={tabs}
            actionBar={<ActionBar/>}
            query={query}
        />
    )
}

export default ProductsPage;