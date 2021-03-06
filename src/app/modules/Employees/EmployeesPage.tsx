import React, { useState } from 'react';
import { RouteComponentProps } from "react-router";
import BaseDataTable from '../../components/BaseDataTable';
import ColumnType from "../../components/Table/type/ColumnType";
import EmployeeService from '../../../services/EmployeeService';

const EmployeesPage: React.FC<RouteComponentProps<any>> = (props) => {
    const [columns] = useState<ColumnType[]>([
        {
            field: "username",
            label: "Username",
            type: "link",
        },
        {
            field: "name",
            label: "Tên nhân viên",
        },
        {
            field: "email",
            label: "Email",
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
            field: "address",
            label: "Address",
        },
        {
            field: "phone_no",
            label: "Số điện thoại",
        },
        {
            field: "created_on",
            label: "Ngày khởi tạo",
            type: "date",
            format: "DD/MM/YYYY HH:mm",
        },
    ]);
    const confirmDelete = {
        title: "Xóa nhân viên",
        message: "Thao tác này sẽ xóa nhân viên bạn đã chọn. Thao tác này không thể khôi phục.",
        messageSuccess: "Xóa nhân viên thành công"
    }
    const titlePage = "Nhân viên";
    const seeker = {
        placeholder: "Tìm kiếm theo mã nhân viên, tên nhân viên",
    }
    const tabs = ["Tất cả nhân viên", "Đang làm việc"];
    let search = new URLSearchParams(props.location.search);
    const query = {
        page: search.get("page") || 1,
        size: search.get("size") || 20,
        query: search.get("query") || "",
    };
    const backBtn = {
        label: "Cấu hình",
        link: "/settings"
    }
    const baseURL = "employees";

    return (
        <BaseDataTable
            baseURL={baseURL}
            createLink="employees/create"
            service={new EmployeeService()}
            columns={columns}
            confirmDelete={confirmDelete}
            titlePage={titlePage}
            checkboxSelection
            seeker={seeker}
            tabs={tabs}
            query={query}
            headerBackBtn={backBtn}
        />
    )
}

export default EmployeesPage;