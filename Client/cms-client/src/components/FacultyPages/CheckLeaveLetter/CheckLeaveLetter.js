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
import './CheckLeaveLetter.css';
import { FacultyLeaveActionApi, FacultyLeaveLettersApi } from '../../api/FacultyApi';
import { Button, TextField, Tooltip } from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import Swal from "sweetalert2"
import SideBarFaculty from '../SideBar/SideBarFaculty';




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


export default function CheckLeaveLetter() {

  const [requests,useRequests]=React.useState([])
  const [refresh,useRefresh]=React.useState(false)
  
  console.log(requests);
  let Accept='Leave Approved'
  let Reject='Leave Canceled'
  const Action=async(id,status,adminName)=>{
    let data=await FacultyLeaveActionApi(id,status,adminName)
    if (data===true) {
      Swal.fire({
        icon: 'success',
        
        text: status
      })
    }
    useRefresh(!refresh)
  }
  const [search,setSearch]=React.useState('')
  React.useEffect(()=>{
    const HandleApi=async()=>{
      let data =await FacultyLeaveLettersApi(search)
      useRequests(data)
    }
    HandleApi()
  },[refresh,search])
console.log(requests);
  //         ======================>TABLE<===============================
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ============================================================================

  return (
    <><SideBarFaculty/>
    <Container>
      <h1>Leave Requests</h1>
      <TableContainer component={Paper} className="StudentResultTable">
        {/* ==================================== */}
        <div style={{display:'grid'}}>
            <TextField
              margin="dense"
              label='Search'
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            {/* ==================================== */}
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell style={{fontWeight:"bold"}}  >Student Name</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Department</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Semester</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Reason</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Date</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Leave Status</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Actions</TableCell>
            </TableRow>
            {requests.length>0 ? (rowsPerPage > 0
              ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : requests
            ).map((row,index) => (
              <TableRow key={index}>
                <TableCell style={{ width: 160 }} >
                  {row.studentName}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {row.department}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {row.semester}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {row.reson}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {new Date(row.date).toLocaleDateString()}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {row.status}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                 {
                  row.status===Accept ?
                   <Tooltip title='Canceled' type='button' onClick={()=>Action(row._id,Reject,row.adminName)}>
                   <Button><Close/></Button>
                   </Tooltip> 
                   : row.status===Reject ?
                   <Tooltip title='Approve'>
                   <Button type='button' onClick={()=>Action(row._id,Accept,row.adminName)}><Done/></Button>
                    </Tooltip>
                  :<>
                  <Tooltip title='Approve'>
                 <Button type='button' onClick={()=>Action(row._id,Accept,row.adminName)}><Done/></Button>
                  </Tooltip> 
                  <Tooltip title='Canceled' type='button' onClick={()=>Action(row._id,Reject,row.adminName)}>
                  <Button><Close/></Button>
                  </Tooltip>
                  </>
                 }
                </TableCell>
              </TableRow>
            )):<div>No leaveletters found</div>}
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
                count={requests.length}
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
    </>
  );
}
