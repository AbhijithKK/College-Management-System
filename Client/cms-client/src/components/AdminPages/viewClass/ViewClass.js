import './ViewClass.css'
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
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';
import { ApiAddClass, ApiAddSemester, ApiDeleteClass, ApiDeleteSemester, ApiViewClass, ApiViewDepartment} from '../../api/AdminApi';
import { useForm } from '../../useForm/useForm';
import { DeleteForeverSharp } from '@mui/icons-material';
import { Container } from 'react-bootstrap';

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



export default function ViewClass() {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const [value, useValue] = React.useState([])
  const ApiCall = async () => {
    let val = await ApiViewClass()
    useValue(val)
  }
  const Changeval = (event) => {
    useFormdata(event)
  }
  const [formdata, useFormdata] = useForm({
    className:'',
    department:'hh'
  })
  const [Department,useDepartment]=React.useState([])
  const [refresh,userefresh]=React.useState(false)
  const ApiDept=async()=>{
    let data=await ApiViewDepartment()
    useDepartment(data)
   
  }
  React.useEffect(() => {
    ApiCall()
    ApiDept()
  }, [refresh])
const AddClass=()=>{
  ApiAddClass(formdata)
  setOpen(false);
  userefresh(!refresh)
}
const DeleteClass=(id)=>{
ApiDeleteClass(id)
userefresh(!refresh)
}
  return (
    <Container>
         <div>
        <div className="addbtn">
          <Button variant="outlined" className="departmentAddBtn" onClick={handleClickOpen}>
            Add Class
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Class Name"
              type="text"
              fullWidth
              variant="standard"
              name='className'
              value={formdata.className}
              onChange={Changeval}
            />
            
            <Select
             
              onChange={Changeval}
              fullWidth
              variant="standard"
              label="Select Department"
              name='department'
              value={formdata.department}
            >
              
                <MenuItem hidden value={formdata.department}>Select Department</MenuItem>
              
              {Department.map((val,index)=>(
                <MenuItem key={index} value={val.name}>{val.name}</MenuItem>
              ))}
             
             
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={AddClass}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="tables">
          <TableHead>
            <TableRow>
              <StyledTableCell>Class Name</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((row, index) => (
              <StyledTableRow key={index}>
               
                <StyledTableCell component="th" scope="row">
                  {row.className}
                </StyledTableCell>
                <StyledTableCell>{row.department}</StyledTableCell>
                <StyledTableCell ><Button onClick={()=>DeleteClass(row._id)}><DeleteForeverSharp/></Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
