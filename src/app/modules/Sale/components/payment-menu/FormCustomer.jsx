import { TextField } from "@material-ui/core";
import { useState } from "react";
import Popup from "../../../../components/Popup/Popup";

const FormCustomer = (props) => {
  let { show, close, onCreate } = props;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "phone":
        const regexPhone = /^(84|\+84}{|0)\d{9,10}$/;
        const resultP = regexPhone.exec(value);
        return updateError(fieldName, resultP);
      case "email":
        const regexEmail = /^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$/;
        const resultE = regexEmail.exec(value);
        return updateError(fieldName, resultE);
      default:
        return true;
    }
  };

  const updateError = (fieldName, result) => {
    if (result === null) {
      setError({ ...error, [fieldName]: true });
      return false;
    } else {
      setError({ ...error, [fieldName]: false });
      return true;
    }
  };

  const handleSubmit = () => {
    onCreate(form);
  };

  let body = (
    <div className="customer-form-popup">
      <form
        acceptCharset="utf-8"
        action=""
        id="customer_register"
        onSubmit={handleSubmit}
      >
        <div className="line">
          <div className="input-item">
            <TextField
              id="name"
              name="name"
              label="Họ và tên"
              color="primary"
              error={error.name}
              helperText={error.name && "Tên không hợp lệ"}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="input-item">
            <TextField
              required
              fullWidth
              id="phone"
              name="phone"
              label="Số điện thoại"
              error={error.phone}
              helperText={error.phone && "Số điện thoại không hợp lệ"}
              color="primary"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="line">
          <div className="input-item">
            <TextField
              id="email"
              name="email"
              label="Email"
              color="primary"
              error={error.email}
              helperText={error.email && "Email không hợp lệ"}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div className="input-item">
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Địa chỉ"
              error={error.address}
              helperText={error.address && "Địa chỉ không hợp lệ"}
              color="primary"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="line">
          <div className="full-line">
            <TextField
              fullWidth
              id="note"
              name="note"
              label="Ghi chú"
              color="primary"
              onChange={handleChange}
              fullWidth
            />
          </div>
        </div>
      </form>
    </div>
  );
  return (
    <Popup
      buttonSubmit={{
        label: "Thêm",
        onClick: handleSubmit,
        classname: "btn-primary",
      }}
      title={"Thêm khách hàng"}
      show={show}
      onClose={close}
      body={body}
    />
  );
};

export default FormCustomer;
