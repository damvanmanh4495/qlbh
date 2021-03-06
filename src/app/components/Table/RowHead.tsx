import React, { useRef } from 'react';
import TableRow from "@material-ui/core/TableRow";
import ColumnType from "./type/ColumnType";

type PropsType = {
    columns: ColumnType[],
    checkboxSelection?: boolean,
    numSelected: number
    rowCount?: number
    onSelectAllClick: () => void
}

const RowHead: React.FC<PropsType> = (props) => {
    const { checkboxSelection, numSelected, onSelectAllClick, rowCount, columns } = props;

    if (checkboxSelection && rowCount) {
        return (
            <TableRow>
                <th className="table-cell">
                    <div className="center">
                        <div
                            className="custom-control custom-checkbox"
                            onClick={onSelectAllClick}
                        >
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                checked={rowCount > 0 && numSelected === rowCount}
                                readOnly
                                ref={el => el && (el.indeterminate = (numSelected > 0 && numSelected < rowCount))}
                            />
                            <label className="custom-control-label"></label>
                        </div>
                    </div>
                </th>
                {columns.map((column) => (
                    <th
                        key={column.field}
                        className="table-cell"
                        style={{ minWidth: column.minWidth }}
                    >
                        <div className={column.align}>{column.label}</div>
                    </th>
                ))}
            </TableRow>)

    }

    return (
        <TableRow>
            {columns.map((column) => (
                <th
                    key={column.field}
                    className="table-cell"
                    style={{ minWidth: column.minWidth }}
                >
                    <div className={column.align}>{column.label}</div>
                </th>
            ))}
        </TableRow>
    )
}

export default RowHead;