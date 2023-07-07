import './ViewSemester.css'
import {Container} from 'react-bootstrap';

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
import { ApiAddSemester, ApiDeleteSemester, ApiViewDepartment, ApiViewSemester } from '../../api/AdminApi';
import { useForm } from '../../useForm/useForm';
import { DeleteForeverSharp } from '@mui/icons-material';

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



export default function ViewSemester() {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const [value, useValue] = React.useState([])
  const ApiCall = async () => {
    let val = await ApiViewSemester()
    useValue(val)
  }
  const Changeval = (event) => {
    useFormdata(event)
  }
  const [formdata, useFormdata] = useForm({
    semester:'',
    department:'default'
  })
  const [semester,useSemester]=React.useState([])
  const [refresh,userefresh]=React.useState(false)
  const ApiSem=async()=>{
    let data=await ApiViewDepartment()
    useSemester(data)
  }
  React.useEffect(() => {
    ApiCall()
    ApiSem()
  }, [refresh])
  const[errMsg,setErrMsg]=React.useState('')
const AddSem=()=>{
  if (formdata.semester.trim()&&formdata.department!=='default') {
    ApiAddSemester(formdata)
    setOpen(false);
    userefresh(!refresh)
  }else{
    setErrMsg('Fill the form properly')
  }
 
}
const DeleteSem=(id)=>{
ApiDeleteSemester(id)
userefresh(!refresh)
}
  return (
    <Container>
      <React.Fragment>
      <div>
        <div className="addbtn">
          <Button variant="outlined" className="departmentAddBtn" onClick={handleClickOpen}>
            Add Semester
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Semester</DialogTitle>
          <DialogContent>
          <p style={{color:'red'}}>{errMsg}</p>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Semester"
              type="text"
              fullWidth
              variant="standard"
              name='semester'
              value={formdata.semester}
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
              <MenuItem  hidden value={formdata.department}>Select Department</MenuItem>
              {semester.map((val,index)=>(
              <MenuItem key={index} value={val.name}>{val.name}</MenuItem>
              ))}
             
             
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={AddSem}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="tables">
          <TableHead>
            <TableRow>
              <StyledTableCell>Semester</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.semester}
                </StyledTableCell>
                <StyledTableCell align="left">{row.department}</StyledTableCell>
                <StyledTableCell align="left"><Button onClick={()=>DeleteSem(row._id)}><DeleteForeverSharp/></Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
    </Container>
  );
}
