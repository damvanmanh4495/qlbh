import React, { useState } from 'react';
import BaseDataTable from '../../components/BaseDataTable';
import ColumnType from "../../components/Table/type/ColumnType";
import { RouteComponentProps } from "react-router";
import BaseService from '../../../services/base/BaseService';
import { URL_CUSTOMERS } from '../../../services/API';

const CustomerList: React.FC<RouteComponentProps<any>> = (props) => {

    const [columns] = useState<ColumnType[]>([
        {
            field: "code",
            label: "Mã khách hàng",
            type: "link",
        },
        {
            field: "name",
            label: "Tên khách hàng",
        },      
        {
            field: "email",
            label: "Email",
        },      
        {
            field: "phone_no",
            label: "Số điện thoại",
        },      
        {
            field: "status",
            label: "Trạng thái",
            type: "status",
            mapper: [
                {
                    value: 1,
                    label: "Đang giao dịch",
                    color: "green"
                },
                {
                    value: 0,
                    label: "Ngừng giao dịch",
                    color: "#f19403"
                }
            ]
        }
    ]);
    const confirmDelete = {
        title: "Xóa khách hàng",
        message: "Thao tác này sẽ xóa khách hàng bạn đã chọn. Thao tác này không thể khôi phục.",
        messageSuccess: "Xóa khách hàng thành công"
    }
    const titlePage = "Danh sách khách hàng";
    const seeker = {
        placeholder: "Tìm kiếm theo mã khách hàng, tên, SĐT khách hàng",
    }
    const filter = {
        label: "Lọc khách hàng",
    }
    const tabs = ["Tất cả khách hàng", "Đang giao dịch"];
    let search = new URLSearchParams(props.location.search);

    const query = {
        page: search.get("page") || 1,
        size: search.get("size") || 20,
        query: search.get("query") || "",
    };

    return (
        <BaseDataTable
            baseURL="customers"
            createLink={"/customers/create"}
            service={new BaseService(URL_CUSTOMERS)}
            columns={columns}
            confirmDelete={confirmDelete}
            titlePage={titlePage}
            checkboxSelection
            seeker={seeker}
            filter={filter}
            tabs={tabs}
            query={query}
        />
    )
}

export default CustomerList;