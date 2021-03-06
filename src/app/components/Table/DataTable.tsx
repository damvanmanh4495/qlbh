import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Moment from "react-moment";
import Pagination from "./Pagination";
import ColumnType from "./type/ColumnType";
import RowHead from "./RowHead";
import imageNotFound from "./../../../svg/image-not-found.svg";
import "./style/DataTable.css";
import Paper from "../Paper/Paper";
import Tab from "../Tab/Tab";
import SeekerFilter from "../SeekerFilter/SeekerFilter";
import FilterType from "../SeekerFilter/type/FilterType";
import SeekerType from "../SeekerFilter/type/SeekerType";
import ButtonType from "../Button/type/ButtonType";
import { formatCash } from "../ultis";

type Props = {
  columns: ColumnType[]
  rows?: Array<any>
  updateLink: string
  page: number
  rowsPerPage: number
  totalRows: number
  onChangePage: (newPage: number) => void
  onChangeRowsPerPage: (rowsPerPage: number) => void
  checkboxSelection?: boolean
  seeker?: SeekerType
  filter?: FilterType
  tabs?: string[]
  actionBar?: React.ReactNode
  headerBackBtn?: ButtonType
  onClickRow?: (id: number) => void
}

const DataTable: React.FC<Props> = (props) => {
  const {
    columns, rows, updateLink,
    page, rowsPerPage, totalRows,
    checkboxSelection,
    onChangePage, onChangeRowsPerPage,
    seeker, filter, tabs,
    onClickRow
  } = props;

  const [selected, setSelected] = useState<number[]>([]);
  const [query, setQuery] = useState<string>("");

  const getCell = (row: any, column: ColumnType) => {
    let value = row[column.showField || column.field];

    switch (column.type) {
      case "images":
        value = row[column.field][0] && row[column.field][0][column.valueField || 0] ? row[column.field][0][column.valueField || 0] : null;
        if (value) {
          return (
            <td key={column.field} className="table-cell img">
              <div><Link to={updateLink + row.id}><img src={value} alt="Ảnh SP" /></Link></div>
            </td>
          )
        }
        return (
          <td key={column.field} className="table-cell img">
            <div><Link to={updateLink + row.id}><img src={imageNotFound} alt="Ảnh SP" className="icon-symbol--loaded" /></Link></div>
          </td>
        );
      case "image":
        value = row[column.field] ? row[column.field][column.valueField || 0] : null;
        if (value) {
          return (
            <td key={column.field} className="table-cell img">
              <div><Link to={updateLink + row.id}><img src={value} alt="Ảnh SP" /></Link></div>
            </td>
          )
        }
        return (
          <td key={column.field} className="table-cell img">
            <div><Link to={updateLink + row.id}><img src={imageNotFound} alt="Ảnh SP" className="icon-symbol--loaded" /></Link></div>
          </td>
        );
      case "link":
        return (
          <td key={column.field} className="table-cell">
            <div className={column.align}><Link to={column.link ? (column.link + row[column.field]) : (updateLink + row.id)}>{value}</Link></div>
          </td>
        )
      case "children":
        return (
          <td key={column.field} className="table-cell">
            <div className={column.align}>{row[column.field] ? row[column.field][column.valueField || 0] : null}</div>
          </td>
        )
      case "date":
        return (
          <td key={column.field} className="table-cell">
            <div className={column.align}><Moment date={value} format={column.format} /></div>
          </td>
        )
      case "money":
        return (
          <td key={column.field} className="table-cell">
            <div className={column.align}>{formatCash(value)}</div>
          </td>
        )
      case "status":
        return getCellStatus(value, column);
      case "variants":
        const variants = row.variants;
        let num;
        if (variants) {
          num = variants.length || 1;
        }
        return (
          <td key={column.field} className="table-cell">
            <div className="center">
              <div className="text-center"><span>{value}</span><br /><span>({num} phiên bản)</span></div>
            </div>
          </td>
        )
      default:
        return (
          <td
            key={column.field}
            className="table-cell"
            onClick={() => {
              if (column.onClick) {
                column.onClick(row.id)
              }
            }}
          >
            <div className={column.align}>{value}</div>
          </td>
        )
    }
  };

  const getCellStatus = (value: any, column: ColumnType) => {
    const { mapper } = column;
    if (!mapper) return;
    let label;
    let color: string | undefined;

    for (let index = 0; index < mapper.length; index++) {
      const element = mapper[index];
      if (element.value === value) {
        label = element.label;
        color = element.color;
        break;
      }
    }

    return (
      <td key={column.field} className="table-cell">
        <div className={column.align} style={{ color: color }}>{label}</div>
      </td>
    )
  }

  const handleClickCheckbox = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = () => {
    if (rows && !(rows.length > 0 && selected.length === rows.length)) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const [tab, setTab] = React.useState<any>(0);
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Paper>
      {tabs && <Tab value={tab} onChange={handleChangeTab} tabs={tabs} />}
      {
        seeker && <div className="row">
          <div className="col-12">
            <SeekerFilter
              filter={filter}
              placeholder={seeker.placeholder}
              query={query}
              onChangeQuery={(e) => setQuery(e.target.value)}
              onKeyPressQuery={(e) => {
                if (seeker.search && e.key === 'Enter') {
                  seeker.search(query)
                }
              }}
            />
          </div>
        </div>
      }
      <div className="row">
        <div className="col-12">
          <Table className="table-custom">
            <TableHead>
              <RowHead
                onSelectAllClick={handleSelectAllClick}
                columns={columns}
                rowCount={rows && rows.length}
                numSelected={selected && selected.length}
                checkboxSelection={checkboxSelection}
              />
            </TableHead>
            {rows && (
              <>
                <TableBody>
                  {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow
                        hover
                        key={index}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        onClick={(e) => {
                          if (onClickRow) {
                            onClickRow(row.id)
                          }
                        }}
                      >
                        {
                          checkboxSelection &&
                          <td className="table-cell">
                            <div className="center">
                              <div className="custom-control custom-checkbox" onClick={() => handleClickCheckbox(row.id)}>
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  checked={isItemSelected}
                                  readOnly
                                />
                                <label className="custom-control-label"></label>
                              </div>
                            </div>
                          </td>
                        }

                        {columns.map((column) => {
                          return getCell(row, column);
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    {totalRows > rowsPerPage && 
                    <Pagination
                      columns={columns}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      totalRows={totalRows}
                      onChangePage={onChangePage}
                      onChangeRowsPerPage={onChangeRowsPerPage}
                      rowsPerPageOptions={[20, 50, 100]}
                    />}
                  </TableRow>
                </TableFooter>
              </>
            )}
          </Table>
        </div>
      </div>
    </Paper>
  );
};

export default DataTable;
