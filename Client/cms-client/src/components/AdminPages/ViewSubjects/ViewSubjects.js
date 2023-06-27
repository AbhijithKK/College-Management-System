import './ViewSubjects.css'
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
import { ApiAddSubjects, ApiDeleteSubjects, ApiViewDepartment, ApiViewSemester, ApiViewSubjects } from '../../api/AdminApi';
import { DeleteForeverSharp } from '@mui/icons-material';
import { useForm } from '../../useForm/useForm';

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


export default function ViewSubjects() {
  const [open, setOpen] = React.useState(false);
  const [refresh, useRefresh] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 const [formVal,useForms]=useForm({
  subject:'',
  department:'',
  semester:''
 })
  const [value, setVal] = React.useState([])
  const SubApi = async () => {
    let data = await ApiViewSubjects()
    setVal(data)
  }
  const[department,useDepartment]=React.useState([])
  const DepartmentApi = async () => {
    let data = await ApiViewDepartment()
    useDepartment(data)
  }
  React.useEffect(() => {
    SubApi()
    DepartmentApi()
    ApiSem()
  }, [refresh])

  const DeleteSub = (id) => {
    ApiDeleteSubjects(id)
    useRefresh(!refresh)
  }
  const AddSubject=()=>{
    ApiAddSubjects()
    useRefresh(!refresh)

  }
  const FormDatas=(event)=>{
    useForms(event)
  }
  const[semester,useSemester]=React.useState([])
  const ApiSem=async()=>{
   let data=await ApiViewSemester()
   useSemester(data)
  }
  return (
    <React.Fragment>
      <div>
        <div className="addbtn">
          <Button variant="outlined" className="departmentAddBtn" onClick={handleClickOpen}>
            Add Subject
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Subject"
              type="text"
              fullWidth
              variant="standard"
              name='subject'
              value={formVal.subject}
              onChange={FormDatas}
            />
            <Select
            name='department'
              value={formVal.department}
              onChange={FormDatas}
              fullWidth
              variant="standard"
              label="Select Department"
              
            >
              {department.map((data,index)=>(

                  <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                ))
              }
             
            </Select>
            <Select
            name='semester'
              value={formVal.semester}
              onChange={FormDatas}
              fullWidth
              variant="standard"
              label="Select sem"
              
            >
              <MenuItem value=''>Select Semester</MenuItem>
              {semester.map((data,index)=>(

                  <MenuItem key={index} value={data.semester}>{data.semester}</MenuItem>
                ))
              }
             
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={AddSubject}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="tables">
          <TableHead>
            <TableRow>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Semester</StyledTableCell>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.subject}
                </StyledTableCell>
                <StyledTableCell align="left">{row.department}</StyledTableCell>
                <StyledTableCell align="left">{row.semester}</StyledTableCell>
                <StyledTableCell align="left"><Button onClick={() => DeleteSub(row._id)}><DeleteForeverSharp /></Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
