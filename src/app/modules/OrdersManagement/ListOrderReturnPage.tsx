import React, { useState } from 'react';
import BaseDataTable from '../../components/BaseDataTable';
import ColumnType from "../../components/Table/type/ColumnType";
import BaseService from '../../../services/base/BaseService';
import { URL_ORDER_RETURN } from '../../../services/API';
import { Tooltip } from '@material-ui/core';
import { RouteComponentProps } from "react-router";

const ListOrderReturnPage: React.FC<RouteComponentProps<any>> = (props) => {

    const statusTooltip = (title: string) => (
        <Tooltip title={title} placement="bottom">
            <i className="fas fa-circle"></i>
        </Tooltip>
    )

    const [columns] = useState<ColumnType[]>([
        {
            field: "code",
            label: "Mã đơn trả hàng",
            type: "link",
        },
        {
            field: "order_id",
            showField: "order_code",
            label: "Mã đơn hàng",
            type: "link",
            link: "/orders/"
        },
        {
            field: "customer_name",
            label: "Tên khách hàng",
        },
        {
            field: "payment_status",
            label: "Hoàn tiền",
            type: "status",
            align: 'center',
            mapper: [
                {
                    value: 0,
                    label: statusTooltip("Chưa hoàn tiền"),
                    color: "#f19403"
                },
                {
                    value: 1,
                    label: statusTooltip("Đã hoàn tiền"),
                    color: "green"
                },
            ]
        },
        {
            field: "receipt_status",
            label: "Nhập kho",
            type: "status",
            align: 'center',
            mapper: [
                {
                    value: 0,
                    label: statusTooltip("Chưa nhập kho"),
                    color: "#f19403"
                },
                {
                    value: 1,
                    label: statusTooltip("Đã nhập kho"),
                    color: "green"
                },
            ]
        },
        {
            field: "total_money",
            label: "Tổng tiền",
            align: "right",
            type: "money"
        },
        {
            field: "created_on",
            label: "Ngày nhận",
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
    const titlePage = "Danh sách đơn trả hàng";
    const seeker = {
        placeholder: "Tìm kiếm theo mã đơn hàng, mã đơn trả hàng, tên, SĐT khách hàng",
    }
    const filter = {
        label: "Lọc đơn trả hàng",
    }
    const tabs = ["Tất cả đơn trả hàng"];
    let search = new URLSearchParams(props.location.search);
    const query = {
        page: search.get("page") || 1,
        size: search.get("size") || 20,
        query: search.get("query") || "",
    };

    return (
        <BaseDataTable
            baseURL="orders/returns"
            createLink="/customers/create"
            service={new BaseService(URL_ORDER_RETURN)}
            columns={columns}
            confirmDelete={confirmDelete}
            titlePage={titlePage}
            seeker={seeker}
            filter={filter}
            tabs={tabs}
            query={query}
        />
    )
}

export default ListOrderReturnPage;