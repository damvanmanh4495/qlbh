import React from "react";
import { Link } from "react-router-dom";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import Paper from "../../../components/Paper/Paper";
import GroupType from "../type/GroupType";
import PageType from "../type/PageType";
import TenantRoleCbb from "./TenantRoleCbb";

interface Props {
    cancelLink: string
    onSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
    setGroup: React.Dispatch<React.SetStateAction<any | undefined>>
    group?: GroupType
    pages?: PageType[]
    errors?: any
    roleIsActive: (pageId: number, roleId: number) => boolean
    setRoleToPage: (pageId: number, rolesId: number[]) => void
}

const PermissionFomr: React.FC<Props> = (props) => {
    const {
        group, setGroup, pages, errors,
        onSubmit, cancelLink, roleIsActive,
        setRoleToPage
    } = props;

    const showTenantRole = (page: PageType, index: number) => {
        if (!page.roles || page.roles.length === 0) {
            return
        }
        let roles: number[] = [];
        group?.tenant_roles?.forEach((e) => {
            if (e.page_id === page.id) {
                roles = e.roles_id;
            }
        });
        return (
            <div className="col-md-12 mb-3" key={`page-${index}`}>
                <TenantRoleCbb page={page} roles={roles} roleIsActive={roleIsActive} setRoleToPage={setRoleToPage} />
            </div>
        )
    }

    return (
        <form className={"form-data row" + (errors ? " was-validated" : "")} noValidate>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-md-4 col-12">
                        <span>Chi tiết vai trò</span><br />
                        <span>Thông tin chi tiết vủa vai trò để phục vụ cho các việc quản sau này</span>
                    </div>
                    <div className="col-md-8 col-12">
                        <Paper>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="input-required">Tên nhân viên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={(group && group.name) || ""}
                                        onChange={(e) => setGroup({ ...group, name: e.target.value, })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Ghi chú</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={(group && group.description) || ""}
                                        onChange={(e) => setGroup({ ...group, description: e.target.value, })}
                                    />
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-md-4 col-12">
                        <span>Phân quyền chi tiết</span><br />
                        <span>Cho phép người quản lý giới hạn quyền của vai trò trong hệ thống</span>
                    </div>
                    <div className="col-md-8 col-12">
                        <Paper>
                            <div className="row">
                                {pages && pages.map(showTenantRole)}
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>

            <div className="col-12 mb-4">
                <hr />
                <div className="d-flex mt-4">
                    <button type="button" className="btn btn-danger">Xóa vai trò</button>
                    <div className="mx-auto"></div>
                    <div>
                        <Link to={cancelLink}>
                            <button type="button" className="btn btn-light mr-3">Hủy</button>
                        </Link>
                        <ButtonLoading type="button" className="btn btn-primary" onClick={onSubmit}>Lưu</ButtonLoading>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PermissionFomr;