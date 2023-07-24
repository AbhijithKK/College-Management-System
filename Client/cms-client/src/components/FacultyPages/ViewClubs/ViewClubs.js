import './ViewClubs.css'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import { Delete } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { FacultyDeleteClubs, FacultyGetClubs } from '../../api/FacultyApi';
import SideBarFaculty from '../SideBar/SideBarFaculty';
// ===========>DATE=======================
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// =========================================== 
// ====================TIME===============================
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// ========================================================

export default function ViewClubs() {
  const [allClubs, setAllClubs] = useState([]);



  const [refresh, setRefresh] = useState(false);

  const DeleteHelper = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this complaint!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = await FacultyDeleteClubs(id);
        if (data === true) {
          Swal.fire({
            icon: 'success',
            text: 'Deleted Successfully',
          });
          setRefresh(!refresh);
        }
      }
    });
  };
  const [search, setSearch] = useState('')
  useEffect(() => {
    const ApiHelper = async () => {
      let data = await FacultyGetClubs(search);
      setAllClubs(data);
    };
    ApiHelper();
  }, [refresh, search]);
  // ======>modal<=====
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [add, useAdd] = React.useState(false)


  // ===================
  const[date,setDate]=useState('')
  const[time,setTime]=useState('')
  const[name,setName]=useState('def')
  const[errMsg,setErrmsg]=useState('')

  const SheduleHelper=async()=>{
    if (time!==''&&date!==''&&name!=='def') {
      let dates=new Date(date).toLocaleDateString('en-GB')
      let times=new Date(time).toLocaleTimeString('en-GB',{hour12: true})

      
      setOpen(false);
    }else{
      setErrmsg('Fill All The Fields')
    }
      useAdd(!add)
  }

  return (
    <>
      <SideBarFaculty />
      <Container>
        {allClubs.length === 0 ? <h1>You are Not An Admin of Clubs</h1> : <div><h1>Your Clubs</h1><br />


        </div>}
        {/* ==================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
          <TextField style={{ width: '95%' }}
            margin="dense"
            label='Search by Name'
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* =======================SHEDULE MEETING===================================== */}
          <div className="addbtn">
            <Button variant="outlined" className='departmentAddBtn1' onClick={handleClickOpen}>
              shedule meeting
            </Button>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Department</DialogTitle>
            <DialogContent>
              <p style={{color:'red'}}>{errMsg}</p>
              <Select
                 onChange={(e)=>setName(e.target.value)}
                fullWidth
                variant="standard"
                label="Select Semester"
                name='semester'
               value={name}
              >
                <MenuItem hidden value={name}>Select Club</MenuItem>

                 {allClubs.length>0 ? allClubs.map((val,index)=>(
                <MenuItem key={index} value={val._id}>{val.name}</MenuItem>
              )) :''}              
              </Select>
              {/* ==================DATE============================ */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker 
                  onChange={setDate}
                  label="Basic date picker" />
                </DemoContainer>
              </LocalizationProvider>
              {/* =============================================== */}
              {/* ===========================TIME=================================== */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker 
                  onChange={setTime}
                  label="Basic time picker" />
                </DemoContainer>
              </LocalizationProvider>
              {/* ===================================================================== */}

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={SheduleHelper}>Add</Button>
            </DialogActions>
          </Dialog>
          {/* ============================================================================= */}
        </div>
        {/* ==================================== */}


        {allClubs.length > 0 ? allClubs.map((data, index) => (
          <Box key={index} className='Clubcard'>
            <Card variant='outlined' className='clubcard'>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {data.name}
                </Typography>
                <Typography sx={{ mb: 1.8 }} color='text.secondary'>

                </Typography>
                <Typography variant='body2'>{data.discription}</Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Tooltip title='Delete'>
                    <Button type='button' onClick={() => DeleteHelper(data._id)}>
                      <Delete />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Box>
        )) : <div>clubs not Found</div>}
      </Container>
    </>
  );
}
