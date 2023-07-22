import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Clubs.css';
import { Container } from 'react-bootstrap';
import { StudentClubStatus, studentClubApi } from '../../api/StudentApi';
import { FacultyClubrequestSend } from '../../api/FacultyApi';
import SideBarStudent from '../SideBar/SideBarStudent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Clubs() {
  const [studentData, setStudentData] = useState({});
  const [clubs, setClubs] = useState([]);
  const [status, setStatus] = useState([]);
  const [clubss, setClubss] = useState([]);
  const [refresh, useRefresh] = useState(false)
  const [pageNo, setPageNo] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const PaginationHelp = (event, page) => {
    setPageNo(page)
  }
  const fetchData = useCallback(async () => {
    const data = await studentClubApi(pageNo);
    setClubs(data.club);
    setTotal(data.total)
    setStudentData(data.student);
    const clubSts = await StudentClubStatus();
    setStatus(clubSts);
  }, [pageNo]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]);

  const datafilter = useCallback(() => {
    const arr = clubs.map((club) => {
      const clubStatus = status.find((s) => s.studentId === studentData._id && s.clubId === club._id);
      return {
        clubId: club._id,
        clubName: club.name,
        clubAdmin: club.clubAdmin,
        clubDes: club.discription,
        clubAdminId: club.clubAdminId,
        clubStatus: clubStatus ? clubStatus.status : null,
      };
    });
    setClubss(arr);
  }, [clubs, status, studentData]);

  useEffect(() => {
    datafilter();
  }, [datafilter, refresh]);

  const RequestSend = (clubId, clubName, clubAdmin, clubAdminId) => {
    console.log(clubAdminId);
    const studentName = studentData.name;
    const department = studentData.department;
    const semester = studentData.semester;
    const studentId = studentData._id;
    FacultyClubrequestSend(studentName, department, semester, clubName, clubAdminId, clubAdmin, studentId, clubId);
    useRefresh(!refresh)
  };

  return (
    <><SideBarStudent />
      <Container>
        {clubs.length === 0 ? <h1>No Clubs Created</h1> : <h1>Your Clubs</h1>}
        {clubs.length > 0 ? clubss.map((data, index) => (
          <Box key={index} className='Clubcard'>
            <Card variant='outlined' className='clubcard'>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {data.clubName}
                </Typography>
                <Typography sx={{ mb: 1.8 }} color='text.secondary'>
                  Club Admin: {data.clubAdmin}
                </Typography>
                <Typography variant='body2'>{data.clubDes}</Typography>
              </CardContent>
              <CardActions>
                {data.clubStatus ? (
                  <p key={index} style={{ backgroundColor: data.clubStatus === 'Request Send' ? 'orange' : data.clubStatus === 'Now Your a Member' ? 'green' : 'red' }}>
                    {data.clubStatus}
                  </p>
                ) : (
                  <Button
                    size='large'
                    onClick={() => RequestSend(data.clubId, data.clubName, data.clubAdmin, data.clubAdminId)}
                  >
                    Join Club
                  </Button>
                )}
              </CardActions>
            </Card>
          </Box>
        )) : <div>Clubs not found</div>}
         <Stack style={{marginLeft:'72px'}} spacing={2}>
      <Pagination 
      count={total}
       color="primary"
       page={pageNo}
       onChange={PaginationHelp}
        />
    </Stack>
    <br/>
      </Container>
    </>
  );
}
