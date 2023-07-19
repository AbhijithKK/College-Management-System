import './ViewClubs'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import { Delete } from '@mui/icons-material';
import { TextField, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { FacultyDeleteClubs, FacultyGetClubs } from '../../api/FacultyApi';
import SideBarFaculty from '../SideBar/SideBarFaculty';

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
const [search,setSearch]=useState('')
  useEffect(() => {
    const ApiHelper = async () => {
      let data = await FacultyGetClubs(search);
      setAllClubs(data);
    };
    ApiHelper();
  }, [refresh,search]);

  return (
    <>
    <SideBarFaculty/>
    <Container>
       {/* ==================================== */}
    <div style={{display:'grid'}}>
            <TextField
              margin="dense"
              label='Search'
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            {/* ==================================== */}
        
        {allClubs.length===0 ? <h1>You are Not An Admin of Clubs</h1>:<div><h1>Your Clubs</h1><br/>
       
        
        </div>}
      {allClubs.length>0 ? allClubs.map((data, index) => (
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
      )):<div>clubs not Found</div>}
    </Container>
    </>
  );
}
