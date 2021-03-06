import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useCallback, useContext, useEffect, useState } from "react";
import BaseService from "../../../../../services/base/BaseService";
import { debounce } from "../../../../components/Input/debounce";
import SaleContext from "../../../../contexts/SaleContext";
import "./style/style.css";

const SuggestInput = (props) => {
    let { title, disableUnderline, type, reset, url, onAdd, field } = props

    const [input, setInput] = useState(false)
    const [value, setValue] = useState("")
    const [listSuggest, setListSuggest] = useState([{ name: "" }])
    const { setChosen } = useContext(SaleContext)

    const service = new BaseService(url)

    const getSuggestList = useCallback(
        debounce(async value => {
            let res = await service.suggest(value)
            if (res) {
                setListSuggest(res.data)
            }

        }, 1000)
        ,
        [],
    )
    
    useEffect(() => {
        getSuggestList(value)
    }, [value])

    const handleChoose = (value) => {
        if (reset) setInput(!input)
        setChosen(type, value)
    }

    let buttonAdd = <IconButton size="small" aria-label="add" onClick={onAdd}><i className="fas fa-plus" /></IconButton>


    return (
        <div className="input-group ">
            <Autocomplete
                key={input}
                disableClearable
                forcePopupIcon={false}
                options={listSuggest}
                getOptionLabel={(option) => option.name}
                filterOptions={(options, state) => options}
                onInputChange={(event,value)=>setValue(value)}
                onChange={(event, value) => handleChoose(value)}
                renderOption={(option) =>
                    <div >
                        <div><b>{option.name}</b></div>
                        <div style={{fontSize:"12px"}}>{option[field] || ""}</div>
                    </div>}
                style={{ width: "100%", display: "flex", alignItems: "center" }}
                renderInput={(params) => <TextField {...params} InputProps={{
                    ...params.InputProps,
                    disableUnderline: disableUnderline,
                    placeholder: title,
                    startAdornment: <InputAdornment position="start"><i className="fas fa-search"></i></InputAdornment>,
                    endAdornment: <InputAdornment position="end">{buttonAdd}</InputAdornment>
                }} variant="standard"
                />}
            />

        </div>
    );
}

export default SuggestInput;