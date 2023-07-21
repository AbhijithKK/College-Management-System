import './ViewSemester.css'
import {Container} from 'react-bootstrap';
import Swal from 'sweetalert2'
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
import SideBar from '../SideBar/SideBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    useDepartment(data)
    useSemester(data)
  }
  // ============================================================
 const [Dep, useDep] = React.useState('default')
 const [departmentArr, useDepartment] = React.useState([])
 const SelectDep = (event) => {
  
    useDep(event.target.value)
  }
// ==============================================================
const[pageNo,setPageNo]=React.useState(1)
const PaginationHelp=(event,page)=>{
  setPageNo(page)
}
const[total,setTotal]=React.useState(0)
  const[search,setSearch]=React.useState('')
  React.useEffect(() => {
    const ApiCall = async () => {
      let val = await ApiViewSemester(Dep,search,pageNo)
      useValue(val.allSemesters)
      setTotal(val.total)
    }
    ApiCall()
    ApiSem()
  }, [refresh,search,Dep,pageNo])
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
      let data = await ApiDeleteSemester(id)
      if (data === true) {
        Swal.fire({
          icon: 'success',
          text: 'Deleted Successfully',
        });
        userefresh(!refresh)
      }
    }
  });


}
  return (
    <>
    <SideBar/>
    <Container>
      <h1>VIEW SEMESTERS</h1>
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
              {semester.length>0 ? semester.map((val,index)=>(
              <MenuItem key={index} value={val.name}>{val.name}</MenuItem>
              )):''}
             
             
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={AddSem}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer component={Paper}>
         {/* ================>SEARCH<==================== */}
      <div style={{display:'grid',marginLeft:'72px',width:'100%'}}>
            <TextField
              margin="dense"
              label='Search by semester '
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            {/* ==================================== */}
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className="tables">
          <TableHead>
            <TableRow>
              <StyledTableCell>Semester</StyledTableCell>
              <StyledTableCell>
              {/* ============================================>DEPARTMENT FILTER<==================================== */}
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
              {/* ====================================================================================================== */}


              </StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.length>0 ? value.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.semester}
                </StyledTableCell>
                <StyledTableCell align="left">{row.department}</StyledTableCell>
                <StyledTableCell align="left"><Button onClick={()=>DeleteSem(row._id)}><DeleteForeverSharp/></Button></StyledTableCell>
              </StyledTableRow>
            )) :<div>There is no Semester found</div>}
          </TableBody>
        </Table>
        <br/>
        <Stack style={{marginLeft:'72px'}} spacing={2}>
      <Pagination 
      count={total}
       color="primary"
       page={pageNo}
       onChange={PaginationHelp}
        />
    </Stack>
    <br/>
      </TableContainer>
    </React.Fragment>
    </Container>
    </>
  );
}
