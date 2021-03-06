import React, { useState, useCallback, useEffect, useContext } from "react";
import { RouteComponentProps } from 'react-router';
import AppContext from "../../contexts/AppContext";
import HeadPage from "../../components/HeadPage/HeadPage";
import PermissionForm from "./components/PermissionForm";
import PermissionService from "../../../services/PermissionService";
import PageService from "../../../services/PageService";
import GroupType, { TenantRole } from "./type/GroupType";
import PageType from "./type/PageType";

const baseURL = "permission";
const permissionService = new PermissionService();
const pageService = new PageService();

interface MatchParams {
    query: string;
    id?: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const PermissionFormPage: React.FC<Props> = (props) => {
    const titlePageCreate = "Thêm mới vai trò";
    const appCtx = useContext(AppContext);
    const { openNotifier, levels } = appCtx;
    const {
        match: { params },
    } = props;

    const [titlePage, setTitlePage] = useState<string>();
    const [group, setGroup] = useState<GroupType>({});
    const [pages, setPages] = useState<PageType[]>();
    const [errors, setErrors] = useState<any>();
    const [notFound, setNotFound] = useState<boolean>(false);
    const [readySave, setReadySave] = useState<boolean>(false);

    const loadGroup = useCallback(async () => {
        if (!params.id) {
            setTitlePage(titlePageCreate);
            return;
        }

        if (isNaN(+params.id)) {
            setNotFound(true);
            return;
        }

        const groupRes = await permissionService.getOne(+params.id);
        if (!groupRes || groupRes.status !== 200 || !groupRes.data) {
            setNotFound(true);
            return;
        }
        const propductResData = groupRes.data;
        setGroup(propductResData);
        setTitlePage(`${propductResData.name}`);
    }, [params]);

    const loadPages = useCallback(async () => {
        let response = await pageService.getList();
        if (!response || response.status !== 200 || !response.data) {
            return;
        }
        setPages(response.data);
    }, []);

    const validate = (group?: any) => {
        return true;
    };

    const save = useCallback(async () => {
        if (!validate(group)) {
            return;
        }
        if (!group) {
            return;
        }

        const { id } = group;
        const response = await permissionService.save(group);

        let level = levels.success;
        let message = "Thêm mới vai trò thành công";
        let isCreate = true;
        if (id) {
            isCreate = false;
            message = "Cập nhật vai trò thành công";
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
        if (level === levels.success && response.data) {
            if (isCreate) {
                props.history.push(`/${baseURL}/${response.data.id}`);
            } else {
                loadGroup();
            }
        }
    }, [group, openNotifier, levels, props.history, loadGroup]);

    useEffect(() => {
        loadPages();
        loadGroup();
    }, [loadGroup, loadPages]);

    useEffect(() => {
        if (!readySave) {
            return;
        }
        setReadySave(false);
        save();
    }, [readySave, save]);

    if (notFound) {
        return (
            <div className="text-center mt-5">
                <h1>Vài trò không tồn tại!</h1>
            </div>
        );
    }

    const setRoleToPage = (pageId: number, rolesId: number[]) => {
        if (!group.tenant_roles) {
            setGroup({ ...group, tenant_roles: [{ page_id: pageId, roles_id: rolesId }] })
            return;
        }
        let tenantRoles: TenantRole[] = [];
        group.tenant_roles.forEach((e: TenantRole) => {
            if (e.page_id !== pageId) {
                tenantRoles.push(e);
                return;
            }
        });
        tenantRoles.push({ page_id: pageId, roles_id: rolesId });
        setGroup({ ...group, tenant_roles: tenantRoles })
    }

    const roleIsActive = (pageId: number, roleId: number): boolean => {
        if (!group.tenant_roles || group.tenant_roles.length === 0) {
            return false;
        }
        let isExist = false;
        group.tenant_roles.forEach((e: TenantRole) => {
            if (isExist) {
                return;
            }
            if (e.page_id !== pageId) {
                return;
            }
            isExist = e.roles_id.includes(roleId);
        });
        return isExist;
    }

    return (
        <div className="container">
            <HeadPage
                title={titlePage}
                backBtn={{ label: "Quay lại trang danh sách", link: `/${baseURL}` }}
            />
            <PermissionForm
                group={group}
                setGroup={setGroup}
                errors={errors}
                cancelLink={`/${baseURL}`}
                onSubmit={() => {
                    setReadySave(true);
                }}
                roleIsActive={roleIsActive}
                setRoleToPage={setRoleToPage}
                pages={pages}
            />
        </div>
    );
}

export default PermissionFormPage;