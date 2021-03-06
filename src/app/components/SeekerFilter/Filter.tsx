import React from 'react';
import FilterType from './type/FilterType';
import filter from "./svg/filter.svg";

const Filter: React.FC<FilterType> = (props) => {
    const { label } = props;
    return (
        <button className="btn btn-filter" type="button">
            <span>{label}</span>
            <img src={filter} alt="icon" className="img-filter" />
        </button>
    )
}

export default Filter;