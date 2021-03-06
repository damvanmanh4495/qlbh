import React, { FC } from 'react';
import "./style.css";

interface PropTypes {
    textInput: string
}

const SearchInput: FC<PropTypes> = ({ textInput }) => {
    return (
        <div className="group-input-query">
            <i className="fa fa-search icon" />
            <input type="text" placeholder={textInput} />
        </div>
    )
}

export default SearchInput;



