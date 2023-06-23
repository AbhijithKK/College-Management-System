// import {Form,Container,Row,Col,Button} from 'react-bootstrap';
import './ViewStudents.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../Axios/Axios'

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


export default function ViewStudents() {
  const [student,useStudent]=React.useState([])
  React.useEffect(()=>{
    axios.get('/admin/viewStudents',{
      headers:{
        'Content-Type':'application/json'
      },withCredentials:true
    }).then((data)=>{
     Studentdata(data.data)
    })
  },[])
  const Studentdata=(data)=>{
    useStudent(data)
  }
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='tables'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Roll No.</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Department</StyledTableCell>
            <StyledTableCell align="right">Mob.Number</StyledTableCell>
            <StyledTableCell align="right">Adm Year</StyledTableCell>
            <StyledTableCell align="right">D-O-B</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.regNumber}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.department}</StyledTableCell>
              <StyledTableCell align="right">{row.mobNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.admYear}</StyledTableCell>
              <StyledTableCell align="right">{row.DOB}</StyledTableCell>
              <StyledTableCell align="right">{row.gender}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
