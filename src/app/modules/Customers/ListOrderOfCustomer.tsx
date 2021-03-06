import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";
import CustomerService from "../../../services/CustomerService";
import DataTable from '../../components/Table/DataTable';
import ColumnType from "../../components/Table/type/ColumnType";
import AppContext from "../../contexts/AppContext";
import { objectToQueryString, toNumber } from "../../utils/common";

const customerService = new CustomerService();
export interface ListOrderOfCustomerProps extends RouteComponentProps<any> {
    customerId: number
}

const ListOrderOfCustomer: React.FC<ListOrderOfCustomerProps> = (props) => {
    let { customerId } = props;
    const history = useHistory();
    const [columns] = useState<ColumnType[]>([
        {
            field: "code",
            label: "Mã đơn hàng",
            type: "link",
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
            label: "Giá trị",
            align: "right",
            type: 'money'
        },
        {
            field: "created_on",
            label: "Ngày ghi nhận",
            type: "date",
            format: "DD/MM/YYYY HH:mm:ss",
            align: 'right'
        },
        {
            field: "modified_on",
            label: "Cập nhật cuối",
            type: "date",
            format: "DD/MM/YYYY HH:mm:ss",
            align: 'right'
        },

    ]);

    const titlePage = "Lịch sử mua hàng";
    const seeker = {
        placeholder: "Tìm kiếm theo mã đơn hàng, tên, SĐT khách hàng",
    }
    const tabs = ["Lịch sử mua hàng", "Ghi chú"];
    // const tabs = ["Danh sách đơn hàng"];

    const appCtx = useContext(AppContext);
    const { openNotifier, levels } = appCtx;

    const [domains, setDomains] = useState<{
        data: Array<any>,
        totalElements: number,
        totalPages: number,
    }>();
    const [readyUpdate, setReadyUpdate] = useState(true);

    const search = new URLSearchParams(props.location.search);
    const [query] = useState({
        page: toNumber(search.get("page")) || 1,
        size: toNumber(search.get("size")) || 20
    });

    const handleChangePage = (newPage: number) => {
        const newQuery = {
            ...query,
            page: newPage
        }
        history.push(`customers/${customerId}?` + objectToQueryString(newQuery))
    };
    const handleChangeRowsPerPage = (newSize: number) => {
        const newQuery = {
            ...query,
            page: 1,
            size: newSize
        }
        history.push(`customers/${customerId}?` + objectToQueryString(newQuery))
    };

    const resetList = useCallback(async () => {
        const response = await customerService.getListOrder(customerId, query.page, query.size, query);

        if (response && response.status === 404) {
            openNotifier(true, response.message, levels.warn);
            setDomains(undefined);
            return;
        }

        if (!response || response.status !== 200) {
            openNotifier(true, "Lỗi hệ thống", levels.warn);
            setDomains(undefined);
            return;
        }

        const responseData = response.data;
        if (!responseData) {
            return
        }
        setDomains({
            data: responseData.data,
            totalElements: responseData.total_elements,
            totalPages: responseData.total_pages,
        });
    }, [openNotifier, levels, query, customerId]);

    useEffect(() => {
        if (readyUpdate) {
            resetList();
            setReadyUpdate(false);
        }
    }, [readyUpdate, resetList]);

    useEffect(() => {
        setReadyUpdate(true);
    }, [query]);

    return (
        <div>
            <DataTable
                tabs={tabs}
                rows={domains && domains.data}
                columns={columns}
                updateLink="/orders/"
                page={query.page - 1}
                rowsPerPage={query.size}
                totalRows={domains ? domains.totalElements : 0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                seeker={seeker}
            />
        </div>
    )
}

export default ListOrderOfCustomer;