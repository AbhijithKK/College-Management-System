import './ViewDepartment.css'
// import {Form,Container,Row,Col,Button} from 'react-bootstrap';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button,TextField,Dialog,DialogActions,DialogContent,
   DialogTitle} from '@mui/material';
import { ApiAddDepartment, ApiDeleteDepartment, ApiViewDepartment } from '../../api/AdminApi';
import { DeleteForeverSharp } from '@mui/icons-material';
import { Container } from 'react-bootstrap';
import SideBar from '../SideBar/SideBar';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ViewDepartment() {
    // ======>modal<=====
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const [value,setValue]=React.useState('')
const [add,useAdd]=React.useState(false)

const HandleAdd= async()=>{
  await ApiAddDepartment(value)
 setOpen(false);
 useAdd(!add)
 
}
const [departments, setDepartment]=React.useState([])
// ===================
const [deleted,useDeleted]=React.useState(false)

const FeatchData=async()=>{
  let data= await ApiViewDepartment()
  setDepartment(data)
}
React.useEffect(()=>{
  FeatchData()
 
},[deleted,add])
const DeleteDepartment=async(id)=>{
  await ApiDeleteDepartment(id)
  useDeleted(!deleted)
 
}
  return (
    <>
    <SideBar/>
   <Container>
    <React.Fragment>
    
    <div>
    <div className="addbtn">
    
      <Button variant="outlined" className='departmentAddBtn' onClick={handleClickOpen}>
        Add Department
      </Button>
    </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Department</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Department Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setValue(e.target.value)}
            value={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={HandleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
   
   
     <TableContainer component={Paper}  className='tableContainer'>
        
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className='tables'>
          <TableHead>
            <TableRow>
              <StyledTableCell className='rowWidth'>Department</StyledTableCell>
              <StyledTableCell align="left" >Action</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((row,index) => (
              <StyledTableRow key={index}>
                <StyledTableCell  component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell   align="left"><Button onClick={()=>DeleteDepartment(row._id)}><DeleteForeverSharp/></Button></StyledTableCell>
               
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   </React.Fragment>
   </Container>
   </>
  );
}
