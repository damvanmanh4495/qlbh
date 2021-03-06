import React from 'react';
import { ReactDatePickerProps } from "react-datepicker";
import DatePickerReact, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import "./style/DatePicker.css";

registerLocale("vi", vi);
const DatePicker: React.FC<ReactDatePickerProps> = (props) => {
    return (
        <div className="date-picler-custom">
            <DatePickerReact {...props} locale="vi" />
        </div>
    )
}

export default DatePicker;