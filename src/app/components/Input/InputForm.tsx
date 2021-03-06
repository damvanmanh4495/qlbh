import React, { FC } from 'react'

interface PropTypes{
    textLabel:string,
}
const InputForm:FC<PropTypes> = ({ textLabel }) => {
    return (
        <div className="mb-3">
             <label>{textLabel}</label> <br></br>
              <input type="text" style={{width:"100%"}} />
        </div>
    )
}
export default InputForm;
