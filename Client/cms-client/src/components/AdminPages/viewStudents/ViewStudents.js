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
import EditSharp from '@mui/icons-material/EditSharp';
import axios from '../../Axios/Axios'
import { DeleteForeverSharp } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from '@mui/icons-material/CoPresentSharp';

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
      <Table sx={{ minWidth: 600 }} aria-label="customized table" className='tables'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Roll No.</StyledTableCell>
            <StyledTableCell align="">Name</StyledTableCell>
            <StyledTableCell align="">Department</StyledTableCell>
            <StyledTableCell align="">Mob.Number</StyledTableCell>
            <StyledTableCell align="">Adm Year</StyledTableCell>
            <StyledTableCell align="">D-O-B</StyledTableCell>
            <StyledTableCell align="">Gender</StyledTableCell>
            <StyledTableCell align="">Image</StyledTableCell>
            <StyledTableCell align="">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.regNumber}
              </StyledTableCell>
              <StyledTableCell align="">{row.name}</StyledTableCell>
              <StyledTableCell align="">{row.department}</StyledTableCell>
              <StyledTableCell align="">{row.mobNumber}</StyledTableCell>
              <StyledTableCell align="">{row.admYear}</StyledTableCell>
              <StyledTableCell align="">{new Date(row.DOB).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="">{row.gender}</StyledTableCell>
              <StyledTableCell align=""><Image></Image></StyledTableCell>
              <StyledTableCell align=""><Button><EditSharp/></Button> <Button><DeleteForeverSharp/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
