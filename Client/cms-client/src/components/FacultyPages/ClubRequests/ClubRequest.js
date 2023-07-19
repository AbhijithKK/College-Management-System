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
import './ClubRequest.css';
import { FacultyClubRequestUpdated, FacultyClubStatus, FacultyDeleteClubRequest } from '../../api/FacultyApi';
import { Button,  TextField,  Tooltip } from '@mui/material';
import { Close, Delete, Done } from '@mui/icons-material';
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


export default function ClubRequest() {
const [search,setSearch]=React.useState('')
  const [requests,useRequests]=React.useState([])
  const [refresh,useRefresh]=React.useState(false)
  
  let Accept='Now Your a Member'
  let Reject='Request Rejected'
  const Action=async(id,status)=>{
    let data=await FacultyClubRequestUpdated(id,status)
    if (data===true) {
      Swal.fire({
        icon: 'success',
        
        text: status==='Now Your a Member' ? 'Request Accepted' : status

      })
    }
    
    useRefresh(!refresh)
  }
  const RefreshHelper=()=>{
    useRefresh(!refresh);
  }
  const DeleteRequest=(id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this complaint!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await FacultyDeleteClubRequest(id);
        if (data === true) {
          Swal.fire({
            icon: 'success',
            text: 'Deleted Successfully',
          });
          RefreshHelper()
        }
      }
    });
    useRefresh(!refresh);
    

  }
  React.useEffect(()=>{
    const HandleApi=async()=>{
      let data =await FacultyClubStatus(search)
      useRequests(data)
    }
    HandleApi()
  },[refresh,search])
console.log(requests,search);
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
      <h1>Club Requests</h1>
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
              <TableCell style={{fontWeight:"bold"}} >Club Name</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Status</TableCell>
              <TableCell style={{fontWeight:"bold"}} >Actions</TableCell>
            </TableRow>
            {requests.length>0 ?(rowsPerPage > 0
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
                  {row.clubName}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {row.status==='Now Your a Member'?'Request Accepted':row.status==='Request Send' ? 'Requested':row.status}
                </TableCell>
                <TableCell style={{ width: 160 }} >
                  {row.status==='Now Your a Member'?
                  <Tooltip title='Reject' type='button' onClick={()=>Action(row._id,Reject)}>
                  <Button><Close/></Button>
                  </Tooltip>
                  :row.status===Reject ?
                  <Tooltip title='Accept'>
                  <Button type='button' onClick={()=>Action(row._id,Accept)}><Done/></Button>
                   </Tooltip> :
                   <>
                   <Tooltip title='Accept'>
                 <Button type='button' onClick={()=>Action(row._id,Accept)}><Done/></Button>
                  </Tooltip> 
                  <Tooltip title='Reject' type='button' onClick={()=>Action(row._id,Reject)}>
                  <Button><Close/></Button>
                  </Tooltip>
                   </>
                }
                <Tooltip title='delete request'><Button type='button' onClick={()=>DeleteRequest(row._id)}><Delete/></Button></Tooltip>
                 
                </TableCell>
              </TableRow>
            )):<div>No Requests</div>}
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
