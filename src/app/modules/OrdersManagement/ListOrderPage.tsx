import React, { useState } from 'react';
import BaseDataTable from '../../components/BaseDataTable';
import ColumnType from "../../components/Table/type/ColumnType";
import BaseService from '../../../services/base/BaseService';
import { URL_ORDER } from '../../../services/API';
import { RouteComponentProps } from "react-router";

const ListOrderPage: React.FC<RouteComponentProps<any>> = (props) => {

    const [columns] = useState<ColumnType[]>([
        {
            field: "code",
            label: "Mã đơn hàng",
            type: "link",
        },
        {
            field: "customer_name",
            label: "Tên khách hàng",
        },
        {
            field: "status",
            label: "Trạng thái đơn hàng",
            type: "status",
            mapper: [
                {
                    value: 0,
                    label: "Đang giao dịch",
                    color: "#f19403"
                },
                {
                    value: 1,
                    label: "Hoàn thành",
                    color: "green"
                },
                {
                    value: 2,
                    label: "Hủy",
                    color: "red"
                }
            ]
        },
        {
            field: "total_money",
            label: "Khách phải trả",
            align: "right",
            type: 'money'
        },
        {
            field: "created_on",
            label: "Ngày tạo đơn",
            type: "date",
            format: "DD/MM/YYYY HH:mm",
            align: 'right'
        },
       
    ]);
    const confirmDelete = {
        title: "Xóa sản phẩm",
        message: "Thao tác này sẽ xóa sản phẩm bạn đã chọn. Thao tác này không thể khôi phục.",
        messageSuccess: "Xóa sản phẩm thành công"
    }
    const titlePage = "Danh sách đơn hàng";
    const seeker = {
        placeholder: "Tìm kiếm theo mã đơn hàng, tên, SĐT khách hàng",
    }
    const filter = {
        label: "Lọc đơn hàng",
    }
    const tabs = ["Tất cả đơn hàng", "Đang giao dịch"];
    let search = new URLSearchParams(props.location.search);
    const query = {
        page: search.get("page") || 1,
        size: search.get("size") || 20,
        query: search.get("query") || "",
    };

    return (
        <BaseDataTable
            baseURL="orders"
            service={new BaseService(URL_ORDER)}
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

export default ListOrderPage;