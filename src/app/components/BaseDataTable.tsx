import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "./Table/DataTable";
import ColumnType from "./Table/type/ColumnType";
import Service from "../../services/base/Service";
import AppContext from "../contexts/AppContext";
import SeekerType from "./SeekerFilter/type/SeekerType";
import FilterType from "./SeekerFilter/type/FilterType";
import ButtonType from "./Button/type/ButtonType";
import HeadPage from "./HeadPage/HeadPage";
import { objectToQueryString } from "./../utils/common"

interface Props {
    service: Service
    baseURL: string
    columns: ColumnType[]
    titlePage: string
    confirmDelete: {
        title: string
        message: string
        messageSuccess: string
    },
    createLink?: string
    updateLink?: string
    checkboxSelection?: boolean
    tabs?: string[]
    seeker?: SeekerType
    filter?: FilterType
    actionBar?: React.ReactNode
    headerBackBtn?: ButtonType
    query: any
    onClickRow?: (id: number) => void
}

const BaseDataTable: React.FC<Props> = (props) => {
    const history = useHistory();
    const appCtx = useContext(AppContext);
    const { openNotifier, levels } = appCtx;

    const {
        service, titlePage,
        columns, baseURL, createLink, updateLink,
        checkboxSelection, tabs, filter, query,
        headerBackBtn, actionBar, onClickRow
    } = props;
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
        history.push("/" + baseURL + "?"  + objectToQueryString(newQuery))
    };
    const handleChangeRowsPerPage = (newSize: number) => {
        const newQuery = {
            ...query,
            page: 1,
            size: newSize
        }
        history.push("/" + baseURL + "?" + objectToQueryString(newQuery))
    };

    const resetList = useCallback(async () => {
        const response = await service.getList(query.page, query.size, query);

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
    }, [openNotifier, levels, query, service]);

    useEffect(() => {
        if (readyUpdate) {
            resetList();
            setReadyUpdate(false);
        }
    }, [readyUpdate, resetList]);

    useEffect(() => {
        setReadyUpdate(true);
    }, [query]);

    const search = (searchQuery: string) => {
        const newQuery = {
            ...query,
            query: searchQuery
        }
        history.push("/" + baseURL + "?" + objectToQueryString(newQuery))
    }
    const seeker = {
        ...props.seeker,
        search: search
    }

    let buttons;
    if (createLink) {
        buttons = [
            {
                link: createLink || `/${baseURL}/create`,
                label: "Tạo mới",
                classNames: "btn btn-primary",
            },
        ];
    }

    return (
        <>
            <HeadPage
                title={titlePage}
                buttons={buttons}
                actionBar={actionBar}
                backBtn={headerBackBtn}
            />
            <DataTable
                rows={domains && domains.data}
                columns={columns}
                updateLink={updateLink || `/${baseURL}/`}
                page={+query.page - 1}
                rowsPerPage={+query.size}
                totalRows={domains ? domains.totalElements : 0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                checkboxSelection={checkboxSelection}
                seeker={seeker}
                filter={filter}
                tabs={tabs}
                actionBar={actionBar}
                onClickRow={onClickRow}
            />
        </>
    );
}

export default BaseDataTable;