import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Container } from 'react-bootstrap';
import './AddAttendance.css';
import { HourglassBottom, HourglassDisabled, HourglassFull } from '@mui/icons-material';





function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('20/06/2023', 'rahul', 'present'),
  createData('21/06/2023', 'rahul', 'present'),
  createData('22/06/2023', 'rahul', 'present'),
  createData('23/06/2023', 'rahul', 'present'),
  createData('24/06/2023', 'rahul', 'present'),
  createData('25/06/2023', 'rahul', 'present'),
  createData('26/06/2023', 'rahul', 'present'),
  createData('27/06/2023', 'rahul', 'present'),
  createData('28/06/2023', 'rahul', 'present'),
  createData('29/06/2023', 'rahul', 'present'),
  createData('30/06/2023', 'rahul', 'present'),
  createData('01/07/2023', 'rahul', 'present'),
  createData('03/07/2023', 'rahul', 'present'),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function AddAttendance() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
// ================================================================

let present='Present';
let absent='Absent';
let halfDay='Half Day';
const [currentDate,setCurrentDate]=React.useState(new Date().toLocaleDateString())

const HandleApi=async()=>{

}
const Action=(id,status,studentId)=>{

}
React.useEffect(()=>{
    setCurrentDate(new Date().toLocaleDateString())
    HandleApi()
},[])
  return (
    <Container>
      <h1>Attendance</h1>
      <TableContainer component={Paper} className="facultyResultTable">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell style={{fontWeight:"bold"}}>Date</TableCell>
              <TableCell style={{fontWeight:"bold"}} align="right">Attendance By</TableCell>
              <TableCell style={{fontWeight:"bold"}} align="right">Status</TableCell>
              <TableCell style={{fontWeight:"bold"}} align="right">Actions</TableCell>
            </TableRow>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.calories}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.fat}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                 <Tooltip title='Present'>
                 <Button type='button' onClick={()=>Action(row._id,present,row.adminName)}><HourglassFull/></Button>
                  </Tooltip> 
                  <Tooltip title='HalfDay' type='button' onClick={()=>Action(row._id,halfDay,row.adminName)}>
                  <Button><HourglassBottom/></Button>
                  </Tooltip>
                  <Tooltip title='Absent' type='button' onClick={()=>Action(row._id,absent,row.adminName)}>
                  <Button><HourglassDisabled/></Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      
    </Container>
  );
}
