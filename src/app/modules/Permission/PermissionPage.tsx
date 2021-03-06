import React, { useState, useEffect, useContext, useCallback } from 'react';
import { RouteComponentProps } from "react-router";
import ColumnType from "../../components/Table/type/ColumnType";
import HeadPage from "../../components/HeadPage/HeadPage";
import DataTable from "../../components/Table/DataTable";
import { objectToQueryString, toNumber } from "../../utils/common";
import AppContext from '../../contexts/AppContext';
import PermissionService from "../../../services/PermissionService";

const service = new PermissionService();

const PermissionPage: React.FC<RouteComponentProps<any>> = (props) => {
    const titlePage = "Danh sách vai trò";
    const baseURL = "permission";
    const [columns] = useState<ColumnType[]>([
        {
            field: "name",
            label: "Vai trò",
            type: "link"
        },
        {
            field: "description",
            label: "Ghi chú",
        },
        {
            field: "modified_on",
            label: "Lần cập nhật cuối",
            type: "date",
            format: "DD/MM/YYYY HH:mm",
        },
    ]);
    
    const buttons = [
        {
            link: "/permission/create",
            label: "Thêm mới vai trò",
            classNames: "btn btn-primary",
        },
    ];

    const appCtx = useContext(AppContext);
    const { openNotifier, levels } = appCtx;
    
    const search = new URLSearchParams(props.location.search);
    const [query] = useState({
        page: toNumber(search.get("page")) || 1,
        size: toNumber(search.get("size")) || 20
    });

    const [readyUpdate, setReadyUpdate] = useState(true);

    const [domains, setDomains] = useState<{
        data: Array<any>,
        totalElements: number,
        totalPages: number,
    }>();
    const handleChangePage = (newPage: number) => {
        const newQuery = {
            ...query,
            page: newPage
        }
        props.history.push(baseURL + "?" + objectToQueryString(newQuery))
    };
    const handleChangeRowsPerPage = (newSize: number) => {
        const newQuery = {
            ...query,
            page: 1,
            size: newSize
        }
        props.history.push(baseURL + "?" + objectToQueryString(newQuery))
    };

    const resetList = useCallback(async () => {
        const page = query.page;
        const size = query.size;
        const response = await service.getList(page, size, undefined);

        if (!response) {
            openNotifier(true, "Lỗi hệ thống! Không nhận được phản hồi từ máy chủ.", levels.warn);
            setDomains(undefined);
            return;
        }

        if (response.status !== 200 && response.data) {
            openNotifier(true, response.data.message, levels.warn);
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
    }, [openNotifier, levels, query]);

    useEffect(() => {
        if (readyUpdate) {
            resetList();
            setReadyUpdate(false);
        }
    }, [readyUpdate, resetList]);

    return (
        <div className="container">
            <HeadPage
                title={titlePage}
                backBtn={{ label: "Cấu hình", link: `/settings` }}
                buttons={buttons}
            />
            <div className="row">
                <div className="col-md-4">
                    <span>Quản lý vai trò và phân quyền</span><br />
                    <span>Hỗ trợ thêm mới, phân quyền và quản lý sửa xóa các vai trò của cửa hàng</span>
                </div>
                <div className="col-md-8 col-12">
                    <DataTable
                        updateLink={`/${baseURL}/`}
                        rows={domains && domains.data}
                        columns={columns}
                        page={+query.page - 1}
                        rowsPerPage={+query.size}
                        totalRows={domains ? domains.totalElements : 0}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default PermissionPage;