import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import PageType, { Role } from '../type/PageType';

type Props = {
    page: PageType,
    roles: number[],
    roleIsActive: (pageId: number, roleId: number) => boolean
    setRoleToPage: (pageId: number, rolesId: number[]) => void
}

const GroupCbx: React.FC<Props> = (props) => {
    const { page, roles, roleIsActive, setRoleToPage } = props;
    const [show, setShow] = useState<boolean>(true);
    const rowCount = page.roles.length;
    const count = roles.length;

    const handleSelectAll = () => {
        if (page.roles && !(rowCount > 0 && count === rowCount)) {
            setRoleToPage(page.id, page.roles.map((e) => e.id));
            return;
        }
        setRoleToPage(page.id, []);
    }

    const handleSelect = (roleId: number) => {
        let newRoles: number[] = [];
        if (roles.includes(roleId)) {
            newRoles = roles.filter(item => item !== roleId);
        } else {
            newRoles = [...roles, roleId];
        }
        setRoleToPage(page.id, newRoles);
    }

    return (
        <div>
            <div className="custom-control custom-checkbox">
                <div className="d-inline" onClick={handleSelectAll}>
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        checked={rowCount > 0 && count === rowCount}
                        readOnly
                        ref={el => el && (el.indeterminate = (count > 0 && count < rowCount))}
                    />
                    <label className="custom-control-label">{page.name}</label>
                </div>
                <i className={(show ? " fa-angle-double-down" : " fa-angle-double-right") + " fa drill-down-icon text-blue ml-2 cursor-pointer"}
                    onClick={() => setShow(!show)}
                    aria-expanded={show}
                />
            </div>
            <Collapse in={show} className="mx-2">
                <div className="row">
                    {page.roles && page.roles.map((role: Role, idx: number) => {
                        return (
                            <div className="col-4 my-2" key={`role-${page.id}-${idx}`}>
                                <div className="custom-control custom-checkbox" onClick={() => handleSelect(role.id)}>
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        checked={roleIsActive(page.id, role.id)}
                                        readOnly
                                    />
                                    <label className="custom-control-label">{role.name}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Collapse>
        </div>
    )
}

export default GroupCbx;