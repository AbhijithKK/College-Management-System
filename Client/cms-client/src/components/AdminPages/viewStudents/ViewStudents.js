// import {Form,Container,Row,Col,Button} from 'react-bootstrap';
import "./ViewStudents.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSharp from "@mui/icons-material/EditSharp";
import axios from "../../Axios/Axios";
import { DeleteForeverSharp } from "@mui/icons-material";
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ApiStudentDelete, ApiStudentUpdatePost, ApiUpdateStudent, ApiViewClass, ApiViewDepartment, ApiViewSemester } from "../../api/AdminApi";
import SideBar from '../SideBar/SideBar';
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewStudents() {
  // =====>MODAL<=======
  const [open, setOpen] = React.useState(false);
  
 
  const [name,setName]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [mobNumber,setmobNumber]=React.useState('')
  const [dob,setDob]=React.useState('')
  const [admYear,setAdmyear]=React.useState('')
  const [guardianName,setguardianName]=React.useState('')
  const [guardianNumber,setguardianNumber]=React.useState('')
  const [address,setaddress]=React.useState('')
  const [department,setdepartment]=React.useState('')
  const [gender,setgender]=React.useState('')
  const [semester,setsemester]=React.useState('')
  const[id,setid]=React.useState('')
  const[className,setsClass]=React.useState('')
  
               
  const HandleClickOpen =async (id) => { 
    setid(id)
    let data=await  ApiUpdateStudent(id)
   
    setOpen(true);
    setName(data.name)
    setEmail(data.email)
    setmobNumber(data.mobNumber)
    setDob(data.DOB)
    setAdmyear(data.admYear)
    setguardianName(data.guardianName)
    setguardianNumber(data.guardianNo)
    setaddress(data.address)
    setdepartment(data.department)
    setgender(data.gender)
    setsemester(data.semester)
    setsClass(data.className)
   console.log(data);
    
  }
  const handleClose = () => {
    setOpen(false);
  };
  const [AllClass,setAllClass]=React.useState([])
const [totalDepartment,setDep]=React.useState([])

 const[totalSem,setSem]=React.useState([])
 
  const [refresh, setRefresh]=React.useState(false)
//  console.log(semester);
  // ===================
  const[search,setSearch]=React.useState('')
  const [student, useStudent] = React.useState([]);
  const [Dep,setDept]=React.useState('default')
  React.useEffect(() => {
    axios
      .get("/admin/students",{params:{Dep,search}}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((data) => {
        
        SetStudentdata(data.data);
      });
      HelpDepts()


      const GetApi=async()=>{
        let data=await ApiViewDepartment()
        setDep(data)
        let sem=await ApiViewSemester(department)
        setSem(sem)
        let cls=await ApiViewClass(department,semester)
        setAllClass(cls)
      }
      GetApi()
  }, [refresh,Dep,department,semester,search]);
  const SetStudentdata = (data) => {
    useStudent(data);
  };
 const [ErrMsg,setErrmsg]=React.useState('')
 const HandlSave=()=>{
  if (id.trim()&&name.trim()&&email.trim()&&mobNumber.trim()&&address.trim()&&department.trim()&&
    dob.trim()&&admYear.trim()&&semester.trim()&&gender.trim()&&guardianName.trim()&&
    guardianNumber.trim()&&className) {
    
  
  ApiStudentUpdatePost(id,name,email,mobNumber,address,department,
    dob,admYear,semester,gender,guardianName,
    guardianNumber,className)
    setRefresh(!refresh)
    setOpen(false);
  }else{
    setErrmsg('Fill All The Fields')
  }
 }
 const DeleteStudent=(id)=>{
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
      let data = await ApiStudentDelete(id)
      if (data === true) {
        Swal.fire({
          icon: 'success',
          text: 'Deleted Successfully',
        });
        setRefresh(!refresh)
      }
    }
  });
  
  
 }
  const [allDept,setDepts]=React.useState([])
  const HelpDepts=async()=>{
    let data=await ApiViewDepartment()
    setDepts(data)
  }
  
  return (
    <>
    <SideBar/>
      <Container>
      <h1>VIEW STUDENTS</h1>
        {/* =======>MODAL<======= */}
      <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Student Details</DialogTitle>
        <DialogContent>
          <p style={{color:'red'}}>{ErrMsg}</p>
          <TextField
            autoFocus
            margin="dense"
            id="fullname"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            name="names"
            value={ name }
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
          />
          <TextField
            margin="dense"
            id="phonenumber"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            name="mobNumber"
            value={mobNumber}
            onChange={(event)=> setmobNumber(event.target.value)}
          />
          <TextField
            margin="dense"
            id="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            name="dob"
            value={dob}
            onChange={(event)=>setDob(event.target.value)}
          />
          <TextField
            margin="dense"
            id="admissionyear"
            label="Admission Year"
            type="number"
            fullWidth
            variant="standard"
            name="admYear"
            value={admYear}
            onChange={(event)=>setAdmyear(event.target.value)}
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel id="department-label">Select Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              variant="standard"
              fullWidth
             
            value={department}
            onChange={(event)=>setdepartment(event.target.value)}
            >
              {totalDepartment.length>0 ? totalDepartment.map((data, index) => (

                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
              )) :''}
            </Select>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="semester-label">Select Semester</InputLabel>
            <Select
              labelId="semester-label"
              id="semester"
              variant="standard"
              fullWidth
              
              value={semester}
            onChange={(event)=>  setsemester(event.target.value)
            }
            >
             {totalSem.length>0 ? totalSem.map((data, index) => (

            <MenuItem key={index} value={data.semester}>{data.semester}</MenuItem>
              )):''}
            </Select>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="semester-label">Select Class</InputLabel>
            <Select
              labelId="semester-label"
              id="semester"
              variant="standard"
              fullWidth
              
              value={className}
            onChange={(event)=>  setsClass(event.target.value)
            }
            >
              
             {AllClass.length>0 ? AllClass.map((data, index) => (

            <MenuItem key={index} value={data.className}>{data.className}</MenuItem>
              )):''}
            </Select>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="gender-label">Select Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              variant="standard"
              fullWidth
             
            value={gender}
            onChange={(event)=> setgender(event.target.value)}
            >
              <MenuItem hidden value={gender}>{gender}</MenuItem>
              <MenuItem value="m">Male</MenuItem>
              <MenuItem value="f">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="guardianname"
            label="Guardian Name"
            type="text"
            fullWidth
            variant="standard"
            name="guardianName"
            value={guardianName}
            onChange={(event)=> setguardianName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="guardiannumber"
            label="Guardian Number"
            type="tel"
            fullWidth
            variant="standard"
            name="guardianNumber"
            value={guardianNumber}
            onChange={(event)=> setguardianNumber(event.target.value)
             
            }
          />
          <TextField 
            margin="dense"
            id="address"
            label="Full Address"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            name="address"
            value={address}
            onChange={(event)=> setaddress(event.target.value)
              }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="button" onClick={HandlSave}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
      {/* ======================= */}

      <TableContainer component={Paper}>
        {/* ================>SEARCH<==================== */}
      <div style={{display:'grid',marginLeft:'72px',width:'100%'}}>
            <TextField
              margin="dense"
              label='Search student name'
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            {/* ==================================== */}
        <Table
          sx={{ minWidth: 600 }}
          aria-label="customized table"
          className="tables"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell>


                <Select
                  style={{ color: 'white', backgroundColor: 'black', borderColor: 'white' }}
                  name="department"
                  value={Dep}
                  onChange={(e)=>setDept(e.target.value)}
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
                  {allDept.length>0 ? allDept.map((data, index) => (
                    <MenuItem key={index} value={data.name}>
                      {data.name}
                    </MenuItem>
                  )):''}
                </Select>



              </StyledTableCell>
              <StyledTableCell >Mob.Number</StyledTableCell>
              <StyledTableCell >Adm Year</StyledTableCell>
              <StyledTableCell >D-O-B</StyledTableCell>
              <StyledTableCell >Gender</StyledTableCell>
              <StyledTableCell >Image</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.length>0 ? student.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.regNumber}
                </StyledTableCell>
                <StyledTableCell >{row.name}</StyledTableCell>
                <StyledTableCell >{row.department}</StyledTableCell>
                <StyledTableCell >{row.mobNumber}</StyledTableCell>
                <StyledTableCell >{row.admYear}</StyledTableCell>
                <StyledTableCell >
                  {new Date(row.DOB).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell >{row.gender}</StyledTableCell>
                <StyledTableCell >
                  <Avatar src="/broken-image.jpg" />
                </StyledTableCell>
                <StyledTableCell >
                  <Button onClick={() => HandleClickOpen(row._id)}>
                    <EditSharp /></Button>
                  <Button onClick={()=>DeleteStudent(row._id)}>
                    <DeleteForeverSharp /></Button>
                </StyledTableCell>
              </StyledTableRow>
            )):<div>There is no Students Found</div>}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </>
  );
}
