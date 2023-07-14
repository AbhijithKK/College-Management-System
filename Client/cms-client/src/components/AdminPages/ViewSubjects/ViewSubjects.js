import './ViewSubjects.css'
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
import { ApiAddSubjects, ApiDeleteSubjects, ApiViewClass, ApiViewDepartment, ApiViewSemester, ApiViewSubjects } from '../../api/AdminApi';
import {  DeleteForeverSharp } from '@mui/icons-material';
import { useForm } from '../../useForm/useForm';
import { Container } from 'react-bootstrap';
import SideBar from '../SideBar/SideBar';
import Swal from 'sweetalert2';

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
const[department,usedepartment]=React.useState('defaul')
  const [formVal, useForms] = useForm({
    subject: '',
    
    semester: 'default'
  })
  const [value, setVal] = React.useState([])
  const SubApi = async (dep) => {
    let data = await ApiViewSubjects(dep)
    setVal(data)
  }
  const [Dep, useDep] = React.useState('default')
  const [departmentArr, useDepartment] = React.useState([])
  const DepartmentApi = async () => {
    let data = await ApiViewDepartment()
    useDepartment(data)
  }
  
  React.useEffect(() => {
    const ApiSem = async () => {
    
    let data = await ApiViewSemester(department)
    
    useSemester(data)
  }
  const GetClass=async()=>{
    let data=await ApiViewClass(department)
    setclassNameArr(data)
  }
    SubApi(Dep)
    DepartmentApi()
    ApiSem()
    GetClass()
  }, [refresh, Dep,department])
const RefreshHelper=()=>{
  useRefresh(!refresh)
}
  const DeleteSub = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Fculty!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dc3545',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await ApiDeleteSubjects(id)
        if (data === true) {
          Swal.fire({
            icon: 'success',
            text: 'Deleted Successfully',
          });
        }
        RefreshHelper()
      }
     
    });
    
    
  }
  const [errormsg,useErroemsg]=React.useState('')
  const ErrormsgFnc=()=>{
    useErroemsg('fill all input fileds')
  }
  const AddSubject = () => {
    if (formVal.subject.trim() && department!=='default' && formVal.semester!=='default' &&className!=='default') {
      
      ApiAddSubjects(formVal,department,className)
      setOpen(false);
    }else{
     ErrormsgFnc()
    }
    useRefresh(!refresh)
  }
  const FormDatas = (event) => {
    useForms(event)
  }
 
  
  const [semester, useSemester] = React.useState([])
 const[classNameArr,setclassNameArr]=React.useState([])
  const SelectDep = (event) => {
  
    useDep(event.target.value)
  }

  const [className,setClassName]=React.useState('default')
  return (
    <>
    <SideBar/>
   <Container>
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
            <p style={{color:'red'}}>{errormsg}</p>
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
              value={department}
              onChange={(e)=>usedepartment(e.target.value)}
              fullWidth
              variant="standard"
              label="Select Department"

            >
              <MenuItem hidden value={department}>Select Department</MenuItem>
              {departmentArr.length>0 ? departmentArr.map((data, index) => (

                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
              ))
              :''}

            </Select>
            <Select
              name='semester'
              value={formVal.semester}
              onChange={FormDatas}
              fullWidth
              variant="standard"
              label="Select sem"

            >
              <MenuItem hidden value={formVal.semester}>Select Semester</MenuItem>
              {semester.length>0 ? semester.map((data, index) => (

                <MenuItem key={index} value={data.semester}>{data.semester}</MenuItem>
              ))
              :''}

            </Select>
            <Select
              name='Class'
              value={className}
              onChange={(e)=>setClassName(e.target.value)}
              fullWidth
              variant="standard"
              label="Select sem"

            >
              <MenuItem hidden value={className}>Select Class</MenuItem>
              {classNameArr.length>0 ? classNameArr.map((data, index) => (

                <MenuItem key={index} value={data.className}>{data.className}</MenuItem>
              ))
              :""}

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
          <TableHead style={{ color: 'gray !importent' }}>
            <TableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>


                <Select
                  style={{ color: 'white', backgroundColor: 'black', borderColor: 'white' }}
                  name="department"
                  value={Dep}
                  onChange={SelectDep}
                  fullWidth
                  variant="standard"
                  label="Select Department"
                  MenuProps={{
                    PaperProps: {
                      style: {

                      },
                    },
                  }}
                  IconComponent={(props) => (
                    <span {...props} style={{ color: 'white' }}>
                      ▼
                    </span>
                  )}
                >
                  <MenuItem value={Dep ? 'default' : 'default'}>
                    Department
                  </MenuItem>
                  {departmentArr.length>0 ? departmentArr.map((data, index) => (
                    <MenuItem key={index} value={data.name}>
                      {data.name}
                    </MenuItem>
                  )):''}
                </Select>



              </StyledTableCell>
              <StyledTableCell>Semester</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.length>0 ? value.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.subject}
                </StyledTableCell>
                <StyledTableCell align="left">{row.department}</StyledTableCell>
                <StyledTableCell align="left">{row.semester}</StyledTableCell>
                <StyledTableCell align="left"><Button onClick={() => DeleteSub(row._id)}><DeleteForeverSharp /></Button></StyledTableCell>
              </StyledTableRow>
            )):<div>There is no Subject Found</div>}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
   </Container>
   </>
  );
}
