// import {Form,Container,Row,Col,Button} from 'react-bootstrap';
import './ViewFaculty.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DeleteForeverSharp, EditSharp } from '@mui/icons-material';
import { Avatar, InputLabel, MenuItem, Select,Button,FormControl } from '@mui/material';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SideBar from '../SideBar/SideBar';

import { ApiDeleteFaculty, ApiFacultyUpdatePost, ApiUpdateFaculty, ApiViewClass, ApiViewDepartment, ApiViewFaculty, ApiViewSubjects } from '../../api/AdminApi';
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



export default function ViewFaculty() {
  const [faculty,useFaculty]=React.useState([])
  const [Dep,setDept]=React.useState('default')
  const [refresh, setRefresh]=React.useState(false)
console.log(Dep);
  const HelperFaculty=(data)=>{
    useFaculty(data);
  }
  const Facultys = React.useCallback(async () => {
    let data = await ApiViewFaculty(Dep);
    HelperFaculty(data)
  }, [Dep]);
  const[Class,setClass]=React.useState([])
  const [semester,setsemester]=React.useState('')
  const [department,setdepartment]=React.useState('')
  React.useEffect(() => {

    const fetchData = async () => {
      await Facultys();
      HelpDepts();
    };
    const subjectApi=async()=>{
      let classes=await ApiViewSubjects(department)
      setClass(classes)
    }
    subjectApi()
    fetchData();



    const GetDept=async()=>{
      let data=await ApiViewDepartment()
      setDep(data)
      let cls=await ApiViewClass(department,semester)
      setCls(cls)
    }
    GetDept()
  }, [refresh, Dep, Facultys,department,semester]);
  // =====>MODAL<=======
  const [open, setOpen] = React.useState(false);
  
 
  const [name,setName]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [mobNumber,setmobNumber]=React.useState('')
  const [dob,setDob]=React.useState('')
  const [admYear,setAdmyear]=React.useState('')
  const [qualifications,setqualifications]=React.useState('')
  const [teachingArea,setteachingArea]=React.useState('')
  const [address,setaddress]=React.useState('')
  const [gender,setgender]=React.useState('')
  const[id,setid]=React.useState('')
  const [className,setClassName]=React.useState('')
  
               
  const HandleClickOpen =async (id) => { 
    setid(id)
    let data=await  ApiUpdateFaculty(id)
   
    setOpen(true);
    setName(data.name)
    setEmail(data.email)
    setmobNumber(data.mobNumber)
    setDob(data.DOB)
    setAdmyear(data.admYear)
    setqualifications(data.qualifications)
    setteachingArea(data.teachingArea)
    setaddress(data.address)
    setdepartment(data.department)
    setgender(data.gender)
    setsemester(data.semester)
    setClassName(data.adminOfClass)
   
   
  }
  const handleClose = () => {
    setOpen(false);
  };
const [totalDepartment,setDep]=React.useState([])
const [totalClass,setCls]=React.useState([])


 
//  console.log(semester);
  // ===================
  const DeleteFaculty=(id)=>{
    ApiDeleteFaculty(id)
    setRefresh(!refresh)
  }
  const[errMsg,setErrmsg]=React.useState('')
  const HandlSave=()=>{
    if (id.trim()&&name.trim()&&email.trim()&&mobNumber.trim()&&address.trim()&&department.trim()&&
      dob.trim()&&admYear.trim()&&gender.trim()&&teachingArea.trim()&&
      qualifications.trim()&&className) {
      
        ApiFacultyUpdatePost(id,name,email,mobNumber,address,department,
          dob,admYear,semester,gender,teachingArea,
          qualifications,className)
          setRefresh(!refresh)
          setOpen(false);
        }else{
          setErrmsg('Fill All Fields')
        }
   }





   const [allDept,setDepts]=React.useState([])
  const HelpDepts=async()=>{
    let data=await ApiViewDepartment()
    setDepts(data)
  }
  return (
    <>
    <SideBar/>
    {/* =======>MODAL<======= */}
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Student Details</DialogTitle>
        <DialogContent>
          <p style={{color:'red'}}>{errMsg}</p>
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
              {totalDepartment.map((data, index) => (

                <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="department-label">Select Class</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              variant="standard"
              fullWidth
             
            value={className}
            onChange={(event)=>setClassName(event.target.value)}
            >
              {totalClass.map((data, index) => (

                <MenuItem key={index} value={data.className}>{data.className}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl  margin="dense" fullWidth>
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
            label="Qualification"
            type="text"
            fullWidth
            variant="standard"
            name="qualification"
            value={qualifications}
            onChange={(event)=> setqualifications(event.target.value)}
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel id="department-label">Select Teaching Area</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              variant="standard"
              fullWidth
             
            value={teachingArea}
            onChange={(event)=>setteachingArea(event.target.value)}
            >
              <MenuItem hidden value={teachingArea}>{teachingArea}</MenuItem>
              {Class.map((data, index) => (

                <MenuItem key={index} value={data.subject}>{data.subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='tables'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Roll No.</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >
            
                 
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
                  {allDept.map((data, index) => (
                    <MenuItem key={index} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
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
          {faculty.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.regNumber}
              </StyledTableCell>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.department}</StyledTableCell>
              <StyledTableCell >{row.mobNumber}</StyledTableCell>
              <StyledTableCell >{row.admYear}</StyledTableCell>
              <StyledTableCell >{new Date(row.DOB).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell >{row.gender}</StyledTableCell>
              <StyledTableCell ><Avatar src="/broken-image.jpg" /></StyledTableCell>
              <StyledTableCell >
              <Button onClick={() => HandleClickOpen(row._id)}>
                    <EditSharp /></Button>
                  <Button onClick={()=>DeleteFaculty(row._id)}>
                    <DeleteForeverSharp /></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
