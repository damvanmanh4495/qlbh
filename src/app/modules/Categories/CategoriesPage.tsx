import React, { useEffect, useState, useContext, useCallback } from "react";
import ColumnType from "../../components/Table/type/ColumnType";
import CategoryService from '../../../services/CategoryService';
import AppContext from "../../contexts/AppContext";
import DataTable from '../../components/Table/DataTable';
import HeadPage from "../../components/HeadPage/HeadPage";
import CategoryPopupForm from "./CategoryPopupForm";

const categoryService = new CategoryService();

const CategoriesPage: React.FC = () => {
    const appCtx = useContext(AppContext);
    const { openNotifier, levels } = appCtx;

    const [query, setQuery] = useState<{
        page: number,
        size: number,
        query: string
    }>({
        page: 1,
        size: 20,
        query: "",
    });

    const [readyUpdate, setReadyUpdate] = useState(true);

    const [domains, setDomains] = useState<{
        data: Array<any>,
        totalElements: number,
        totalPages: number,
    }>();

    const handleChangePage = (newPage: number) => {
        setQuery({
            ...query,
            page: newPage,
        });
    };
    const handleChangeRowsPerPage = (newSize: number) => {
        setQuery({
            ...query,
            size: newSize,
            page: 1,
        });
    };

    const loadCategoryOnPopup = async (id: number) => {
        const response = await categoryService.getOne(id);
        if (!response) {
            openNotifier(true, "Lỗi hệ thống", levels.warn);
            return;
        }
        if (response.status !== 200) {
            openNotifier(true, response.message, levels.warn);
            return;
        }
        setCategory(response.data)
        setShow(true);
    }

    const resetList = useCallback(async () => {
        const response = await categoryService.getList(query.page, query.size, query);

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
    }, [openNotifier, levels, query]);

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
        setQuery({
            ...query,
            query: searchQuery
        });
    }

    const seeker = {
        placeholder: "Tìm kiếm loại sản phẩm",
        search: search
    }

    const [show, setShow] = useState<boolean>(false);
    const [category, setCategory] = useState<any>();
    const close = () => {
        setShow(false);
    }
    const handleSubmit = async () => {
        const { id } = category;
        const response = await categoryService.save(category);

        let level = levels.success;
        let message = "Thêm mới loại sản phẩm thành công";
        if (id) {
            message = "Cập nhật loại sản phẩm thành công";
        }

        if (!response || !response.data) {
            message = "Lỗi hệ thống";
            level = levels.warn;
        }

        if (
            response &&
            response.status !== 200 &&
            response.status !== 201 &&
            response.data
        ) {
            message = response.data.message;
            level = levels.warn;
        }

        openNotifier(true, message, level);
        setCategory(null);
        setReadyUpdate(true);
    }

    const buttons = [
        {
            label: "Thêm loại sản phẩm",
            classNames: "btn btn-primary",
            onClick: () => {
                setShow(true)
            }
        },
    ];

    const [columns] = useState<ColumnType[]>([
        {
            field: "name",
            label: "Loại sản phẩm",
            onClick: loadCategoryOnPopup
        },
        {
            field: "code",
            label: "Mã",
        },
        {
            field: "note",
            label: "Ghi chú",
        },
        {
            field: "created_on",
            label: "Ngày khởi tạo",
            type: "date",
            format: "DD/MM/YYYY",
        },
    ]);
    const titlePage = "Loại sản phẩm";

    return (
        <>
            <CategoryPopupForm
                category={category}
                setCategory={setCategory}
                show={show}
                close={close}
                onSubmit={handleSubmit}
            />
            <HeadPage
                title={titlePage}
                buttons={buttons}
                backBtn={{
                    label: "Sản phẩm",
                    link: "/products"
                }}
            />
            <DataTable
                rows={domains && domains.data}
                columns={columns}
                updateLink="/categories/"
                page={query.page - 1}
                rowsPerPage={query.size}
                totalRows={domains ? domains.totalElements : 0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                checkboxSelection
                seeker={seeker}
                onClickRow={loadCategoryOnPopup}
            />
        </>
    )
}

export default CategoriesPage;