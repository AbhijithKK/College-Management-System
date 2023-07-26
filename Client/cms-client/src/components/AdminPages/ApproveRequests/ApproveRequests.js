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
import './ApproveRequests.css';
import SideBarStudent from '../SideBar/SideBar';
import { ApiDeleteRequests, ApiFacultyProfile, ApiViewApprovelists, ApiupdateRequests } from '../../api/AdminApi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TableHead, Tooltip } from '@mui/material';
import {  Delete, Done } from '@mui/icons-material';
import Swal from 'sweetalert2';

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


export default function ApproveList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [list,setList]=React.useState([])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ===================================================================
// ======>modal<=====
const[updatedata,setupdatedata]=React.useState({})
const[currentdata,setCurrentData]=React.useState({})
const [open, setOpen] = React.useState(false);
const handleClickOpen = async(data) => {
    let faculty=await ApiFacultyProfile(data.id)
    setupdatedata(data)
    setCurrentData(faculty)
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

// ===================
const [refresh,setRefresh]=React.useState(false)
const REfreshHelper=()=>{
setRefresh(!refresh)
}
const DeleteRequest=async(id)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Request!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
        confirmButtonColor: '#dc3545',
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = await ApiDeleteRequests(id)
          if (data === true) {
            Swal.fire({
              icon: 'success',
              text: 'Deleted Successfully',
            });
            REfreshHelper()
          }
        }
      });
}

const ApprovedRequest=async(id,category)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: 'If you will Approve Cannot be recover the current data and the request automaticaly deleted',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'green',
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = await ApiupdateRequests(id,category)
          if (data === true) {
            Swal.fire({
              icon: 'success',
              text: 'Approved Successfully',
            });
            REfreshHelper()
          }
        }
      })
}

React.useEffect(()=>{
 
  const ApiHelper=async()=>{
    let data=await ApiViewApprovelists()
    setList(data)
  }
ApiHelper()
},[ refresh])

let url=`http://localhost:4000/images/`
// ===================================================================
  return (
    <><SideBarStudent/>
    <Container>
      <h1>Approve Requests</h1>
      <TableContainer component={Paper} className="StudentResultTable">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell style={{fontWeight:"bold"}} align="center">Date</TableCell>
              <TableCell style={{fontWeight:"bold"}} align="center">Requested</TableCell>
              <TableCell style={{fontWeight:"bold"}} align="center">Changes</TableCell>
              <TableCell style={{fontWeight:"bold"}} align="center">Actions</TableCell>
            </TableRow>
            {list.length>0 ? (rowsPerPage > 0
              ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : list
            ).map((row,i) => (
              <TableRow key={i}>
                <TableCell align="center" >
                  {row.date}
                </TableCell>
                <TableCell  align="center">
                  {row.category}
                </TableCell>
                <TableCell  align="center">
                <Button style={{font:'message-box'}} onClick={()=>handleClickOpen(row)}>
                 View more Details
                </Button>
                </TableCell>
                <TableCell  align="center">
                <>
                   <Tooltip title='Accept'>
                 <Button type='button' onClick={()=>ApprovedRequest(row._id,row.category)} ><Done/></Button>
                  </Tooltip> 
                 
                  <Tooltip title='delete request'><Button type='button' onClick={()=>DeleteRequest(row._id)} ><Delete/></Button></Tooltip>
                   </>
                </TableCell>
              </TableRow>
            )):<div>list not found</div>}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[6, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={list.length}
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
      {/* ===========================MODAL=================================================== */}
      

    
    
  
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Department</DialogTitle>
      <DialogContent>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell> </TableCell>
        <TableCell>Current Data</TableCell>
        <TableCell>Updated Data</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
        <TableCell>{currentdata?.name}</TableCell>
        <TableCell>{updatedata?.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Email</TableCell>
        <TableCell>{currentdata?.email}</TableCell>
        <TableCell>{updatedata?.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Mobile Number</TableCell>
        <TableCell>{currentdata?.mobNumber}</TableCell>
        <TableCell>{updatedata?.mobNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Date of Birth</TableCell>
        <TableCell>{new Date(currentdata?.DOB).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(updatedata?.DOB).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Gender</TableCell>
        <TableCell>{currentdata?.gender}</TableCell>
        <TableCell>{updatedata?.gender}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Admission Year</TableCell>
        <TableCell>{currentdata?.admYear}</TableCell>
        <TableCell>{updatedata?.admYear}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Department</TableCell>
        <TableCell>{currentdata?.department}</TableCell>
        <TableCell>{updatedata?.department}</TableCell>
      </TableRow>
      {updatedata?.semester!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Semester</TableCell>
        <TableCell>{currentdata?.semester}</TableCell>
        <TableCell>{updatedata?.semester}</TableCell>
      </TableRow>
       :'' }
      {updatedata?.address!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>address</TableCell>
        <TableCell>{currentdata?.address}</TableCell>
        <TableCell>{updatedata?.address}</TableCell>
      </TableRow>
       :'' }
      {updatedata?.guardianNo!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>GuardianNumber</TableCell>
        <TableCell>{currentdata?.guardianNo}</TableCell>
        <TableCell>{updatedata?.guardianNo}</TableCell>
      </TableRow>
       :'' }
       {updatedata?.guardianName!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Guardian Name</TableCell>
        <TableCell>{currentdata?.guardianName}</TableCell>
        <TableCell>{updatedata?.guardianName}</TableCell>
      </TableRow>
       :'' }
       {updatedata?.className!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Class Name</TableCell>
        <TableCell>{currentdata?.className}</TableCell>
        <TableCell>{updatedata?.className}</TableCell>
      </TableRow>
       : '' }
       {updatedata?.qualifications!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Qualification</TableCell>
        <TableCell>{currentdata?.qualifications}</TableCell>
        <TableCell>{updatedata?.qualifications}</TableCell>
      </TableRow>
       :'' }
       {updatedata?.teachingArea!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Teaching Area</TableCell>
        <TableCell>{currentdata?.teachingArea}</TableCell>
        <TableCell>{updatedata?.teachingArea}</TableCell>
      </TableRow>
       :'' }
       {updatedata?.image!=='false' ?
      <TableRow>
        <TableCell style={{fontWeight:'bold'}}>Image</TableCell>
        <TableCell><img src={url+currentdata?.image} alt='No Images'></img></TableCell>
        <TableCell><img src={url+updatedata?.image} alt='No Images'></img></TableCell>
      </TableRow>
       :'' }
    </TableBody>
  </Table>

  
</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>


      {/* ======================================================================================== */}
    </Container>
    </>
  );
}
