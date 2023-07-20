import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ViewComplaint.css';
import { Container } from 'react-bootstrap';
import { ApiDeleteComplaint, ApiViewComplaint } from '../../api/AdminApi';
import { Delete } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import DatePicker from "react-datepicker";

export default function ViewComplaint() {
  const [allCompliant, setAllComplaint] = useState([]);

  

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
        let data = await ApiDeleteComplaint(id);
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
const[selectedDate,handleDateChange]=useState('')
  useEffect(() => {
    const ApiHelper = async () => {
      let data = await ApiViewComplaint(selectedDate);
      setAllComplaint(data);
    };
    ApiHelper();
  }, [refresh,selectedDate]);
  

  return (
    <>
    <SideBar/>
    <Container>
    <h1 style={{fontWeight:'bold'}}>VIEW COMPLAINTS</h1>
    {/* ============================================================================== */}

    <div style={{display:'grid',width:'100%'}}>
                  <label>Search by Date</label>
                 <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Date"
                    className="form-control formleavedate" // Apply the same styling class as other inputs
                    
                    />
                    <hr></hr>
    </div>

    {/* ============================================================================== */}
      {allCompliant.length>0 ? allCompliant.map((data, index) => (
        <Box key={index} className='Clubcard'>
          <Card variant='outlined' className='clubcard'>
            <CardContent>
              <Typography variant='h5' component='div'>
                {data.title}
              </Typography>
              <Typography sx={{ mb: 1.8 }} color='text.secondary'>
                Name: {data.name}
              </Typography>
              <Typography variant='body2'>{data.content}</Typography>
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
      )): <div>There is no Comlaint Found</div>}
    </Container>
    </>
  );
}
