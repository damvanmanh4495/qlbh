import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_CUSTOMERS } from "../../../../services/API";
import BaseService from "../../../../services/base/BaseService";
import DatePicker from "../../../components/DatePicker/DatePicker";
import HeadPage from "../../../components/HeadPage/HeadPage";
import Paper from "../../../components/Paper/Paper";
import AppContext from "../../../contexts/AppContext";

const baseURL = "customers"
export interface CustomerFormProps {
    type?: "create" | "edit"
}

export type Customer = {
    id?: number
    name: string
    email?: string
    phone: string
    birthdate?: any,
    address?: string,
    gender?: number,
    description?: string
}

const defaultForm = {
    id: undefined,
    name: "",
    email: "",
    phone: "",
    birthdate: new Date("2000-01-01"),
    address: "",
    description: ""
}

type ParamType = {
    id: string
}

const CustomerForm: React.FC<CustomerFormProps> = (props) => {

    const [form, setForm] = useState<Customer>({
        name: "",
        email: "",
        phone: "",
        birthdate: new Date("2000-01-01"),
        address: "",
        description: ""
    });

    let { type } = props
    const { openNotifier, levels } = useContext(AppContext);
    let { id } = useParams<ParamType>();

    const service = new BaseService(URL_CUSTOMERS)

    useEffect(() => {
        if (type === "edit")
            getCustomerInfo()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(form => ({
            ...form,
            [name]: value
        }));
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(form => ({
            ...form,
            [name]: value
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let gender;
        if (form.gender == 1) gender = true
        if (form.gender == 2) gender = false
        let body_req = {
            id: form.id || undefined,
            address: form.address,
            code: "KH" + Math.floor(Math.random() * 100000),
            description: form.description,
            email: form.email,
            gender,
            status: 1,
            name: form.name,
            phone_no: form.phone,
            birthdate: form.birthdate
        }

        let res = await service.save(body_req);
        if (res && res.status === 201) {
            openNotifier(true, "Th??m kh??ch h??ng th??nh c??ng", levels.success);
            setForm(defaultForm)
        } else if (res && res.status === 200) {
            openNotifier(true, "C???p nh???t kh??ch h??ng th??nh c??ng", levels.success);
        } else
            openNotifier(true, "L??u kh??ch h??ng th???t b???i", levels.warn);
    }

    const getCustomerInfo = async () => {
        let res = await service.getOne(parseInt(id));
        if (res && res.status === 200) {
            let data = res.data
            setForm({
                ...form,
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone_no,
                birthdate: data.birthdate,
                address: data.address,
                description: data.description
            })
        } else
            openNotifier(true, "T???i th??ng tin kh??ch h??ng th???t b???i", levels.warn);
    }

    return (
        <div className="page-order-detail">
            <div className="container">
                <HeadPage
                    title={"Th??m m???i kh??ch h??ng"}
                    backBtn={{ label: "Danh s??ch kh??ch h??ng", link: `/${baseURL}` }}
                />

                <div className="form-data row">
                    <div className="col-md-8">
                        <Paper>
                            <form acceptCharset="utf-8" action="" id="customer_register" onSubmit={handleSubmit}>
                                <div>
                                    <div>
                                        <div className="form-signup clearfix">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <fieldset className="form-group">
                                                        <label>T??n kh??ch h??ng: <span className="required">* </span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            name="name"
                                                            value={form.name}
                                                            id="name"
                                                            placeholder="Nh???p t??n kh??ch h??ng"
                                                            required
                                                            onChange={handleChange} />
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <fieldset className="form-group">
                                                        <label>Email:</label>
                                                        <input
                                                            type="email"
                                                            pattern="^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$"
                                                            title="Email kh??ng h???p l???"
                                                            className="form-control form-control-lg" value={form.email} name="email" id="email"
                                                            placeholder=""
                                                            required
                                                            onChange={handleChange} />
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-6">
                                                    <fieldset className="form-group">
                                                        <label>Phone: <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            name="phone"
                                                            pattern="((09|03|07|08|05)+([0-9]{8})\b)"
                                                            title="S??? ??i???n tho???i kh??ng h???p l???"
                                                            id="phone" placeholder="" required value={form.phone}
                                                            onChange={handleChange} />
                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <fieldset className="form-group">
                                                        <label htmlFor="gender-select">Gi???i t??nh</label>
                                                        <select onChange={handleChangeSelect} style={{ border: "1px solid #ced4da" }} name="gender"
                                                            className="form-control" id="gender-select" value={form.gender}>
                                                            <option disabled hidden selected>Ch???n gi???i t??nh</option>
                                                            <option value={1}>Nam</option>
                                                            <option value={2}>N???</option>
                                                        </select>

                                                    </fieldset>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <fieldset className="form-group">
                                                        <label>Ng??y sinh</label>
                                                        <DatePicker
                                                            selected={(form && form.birthdate) && new Date(form.birthdate)}
                                                            onChange={(date) =>
                                                                setForm({ ...form, birthdate: date })
                                                            }
                                                            maxDate={new Date()}
                                                            openToDate={new Date("2000-01-01")}
                                                        />
                                                    </fieldset>
                                                </div>
                                                <div className="col-12">
                                                    <fieldset className="form-group">
                                                        <label>?????a ch???</label>
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            name="address" id="address"
                                                            className="form-control form-control-lg"
                                                            value={form.address}
                                                            onChange={handleChange} />
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ paddingBottom: "15px", textAlign: "right" }}>
                                    <button
                                        type="submit"
                                        value="L??u"
                                        className="btn btn-primary bt2"
                                    >L??u
                                    </button>
                                </div>
                            </form>

                        </Paper>
                    </div>

                    <div className="col-md-4">
                        <Paper>
                            <fieldset className="form-group" style={{ paddingBottom: "15px" }}>
                                <label>M?? t???</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows={5}
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </fieldset>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;