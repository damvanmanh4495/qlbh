import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TablePagination from "@material-ui/core/TablePagination";
import ColumnType from "./type/ColumnType";

type PaginationProps = {
  columns: ColumnType[],
  page: number,
  rowsPerPage: number,
  totalRows: number,
  rowsPerPageOptions: (number | { value: number; label: string; })[],
  onChangePage: (newPage: number) => void,
  onChangeRowsPerPage: (rowsPerPage: number) => void,
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    columns,
    page,
    rowsPerPage,
    totalRows,
    onChangePage,
    onChangeRowsPerPage,
    rowsPerPageOptions,
  } = props;

  const labelDisplayedRows = ({ from, to, count }: { from: number, to: number, count: number }): string => {
    return `Hiển thị ${from}-${to} trên tổng ${count !== -1 ? count : `more than ${to}`
      }`;
  };

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      colSpan={columns.length + 1}
      count={totalRows}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={(e, newPage) => {
        onChangePage(newPage + 1);
      }}
      onChangeRowsPerPage={(e) => {
        onChangeRowsPerPage(parseInt(e.target.value, 10));
      }}
      ActionsComponent={TablePaginationActions}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        native: true,
      }}
      labelDisplayedRows={labelDisplayedRows}
      labelRowsPerPage={"Hiển thị"}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

export default Pagination;
