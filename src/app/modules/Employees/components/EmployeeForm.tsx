import React from "react";
import { Link } from "react-router-dom";
import ButtonLoading from "../../../components/Button/ButtonLoading";
import DatePicker from "../../../components/DatePicker/DatePicker";
import Paper from "../../../components/Paper/Paper";

interface Props {
    cancelLink: string,
    onSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined,
    setEmployee: React.Dispatch<React.SetStateAction<any | undefined>>,
    employee?: any,
    errors?: any
}

const EmployeeForm: React.FC<Props> = (props) => {
    const {
        employee, setEmployee, errors,
        onSubmit, cancelLink
    } = props;

    return (
        <form className={"form-data row" + (errors ? " was-validated" : "")} noValidate>
            <div className="col-md-4">
                <span>Chi tiết nhân viên</span><br/>
                <span>Thông tin chi tiết nhân viên để phục vụ cho việc quản lý sau này.</span>
            </div>
            <div className="col-md-8 col-12">

                <Paper>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="input-required">Tên nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={(employee && employee.name) || ""}
                                onChange={(e) => setEmployee({ ...employee, name: e.target.value, })}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="input-required">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={(employee && employee.username) || ""}
                                onChange={(e) => setEmployee({ ...employee, username: e.target.value, })}
                                required
                                readOnly={employee && employee.id}
                            />
                        </div>
                        {(employee && !employee.id) && <>
                            <div className="col-md-6 mb-3">
                                <label className="input-required">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder=""
                                    value={(employee && employee.password) || ""}
                                    onChange={(e) => setEmployee({ ...employee, password: e.target.value, })}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="input-required">Nhập lại mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder=""
                                    value={(employee && employee.re_password) || ""}
                                    onChange={(e) => setEmployee({ ...employee, re_password: e.target.value, })}
                                    required
                                />
                            </div>
                        </>}

                        <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder=""
                                value={(employee && employee.email) || ""}
                                onChange={(e) => setEmployee({ ...employee, email: e.target.value, })}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={(employee && employee.phone_no) || ""}
                                onChange={(e) => setEmployee({ ...employee, phone_no: e.target.value, })}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Địa chỉ</label>
                            <textarea
                                className="form-control"
                                rows={2}
                                value={(employee && employee.address) || ""}
                                onChange={(e) => setEmployee({ ...employee, address: e.target.value, })}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Ngày sinh</label>
                            <DatePicker
                                selected={(employee && employee.birthdate) && new Date(employee.birthdate)}
                                onChange={(date) =>
                                    setEmployee({ ...employee, birthdate: date, })
                                }
                                maxDate={new Date()}
                                openToDate={new Date("2000-01-01")}
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Ghi chú</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                value={(employee && employee.note) || ""}
                                onChange={(e) => setEmployee({ ...employee, note: e.target.value, })}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Vai trò</label>
                            <select
                                className="form-control"
                                value={(employee && employee.group) || undefined}
                                onChange={(e) => setEmployee({ ...employee, group_id: e.target.value })}
                            >
                                <option value={0}>Lựa chọn vai trò</option>
                                {employee && employee.group && employee.group.map((item: any, index: number) => {
                                    return (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </Paper>
            </div>

            <div className="col-12 mb-4">
                <hr />
                <div className="d-flex mt-4">
                    <button type="button" className="btn btn-danger">Xóa nhân viên</button>
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

export default EmployeeForm;