import React, { useState, useContext, useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import AppContext from "../../contexts/AppContext";
import HeadPage from "../../components/HeadPage/HeadPage";
import EmployeeService from "../../../services/EmployeeService";
import EmployeeForm from './components/EmployeeForm';


const baseURL = "employees";
const titlePageCreate = "Thêm mới nhân viên"
const employeeService = new EmployeeService();

interface MatchParams {
    query: string;
    id?: string;
  }

interface Props extends RouteComponentProps<MatchParams> {
}

const EmployeeFormPage: React.FC<Props> = (props) => {
    const appCtx = useContext(AppContext);
    const { openNotifier, levels } = appCtx;
    const {
        match: { params },
    } = props;

    const [titlePage, setTitlePage] = useState<string>();
    const [employee, setEmployee] = useState<any>();
    const [errors, setErrors] = useState<any>();
    const [notFound, setNotFound] = useState<boolean>(false);
    const [readySave, setReadySave] = useState<boolean>(false);

    const loadEmployee = useCallback(async () => {
        if (!params.id) {
            setTitlePage(titlePageCreate);
            return;
        }

        if (isNaN(+params.id)) {
            setNotFound(true);
            return;
        }

        const employeeRes = await employeeService.getOne(+params.id);
        if (!employeeRes || employeeRes.status !== 200 || !employeeRes.data) {
            setNotFound(true);
            return;
        }
        const propductResData = employeeRes.data;
        setEmployee(propductResData);
        setTitlePage(`${propductResData.name}`);
    }, [params]);

    const validate = (employee?: any) => {
        return true;
    };

    const save = useCallback(async () => {
        if (!validate(employee)) {
            return;
        }
        if (!employee) {
            return;
        }

        const { id } = employee;
        const response = await employeeService.save(employee);

        let level = levels.success;
        let message = "Thêm mới thành công";
        let isCreate = true;
        if (id) {
            isCreate = false;
            message = "Cập nhật thành công";
        }

        if (!response) {
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
                loadEmployee();
            }
        }
    }, [employee, openNotifier, levels, props.history, loadEmployee]);

    useEffect(() => {
        loadEmployee();
    }, [loadEmployee]);

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
                <h1>Nhân viên không tồn tại!</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <HeadPage
                title={titlePage}
                backBtn={{ label: "Quay lại trang danh sách", link: `/${baseURL}` }}
            />
            <EmployeeForm
              employee={employee}
              setEmployee={setEmployee}
              errors={errors}
              cancelLink={`/${baseURL}`}
              onSubmit={() => {
                setReadySave(true);
              }}
            />
        </div>
    )
}

export default EmployeeFormPage;