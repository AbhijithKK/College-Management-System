import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Clubs.css'
import { Container } from 'react-bootstrap';
import { studentClubApi } from '../../api/StudentApi';




export default function Clubs() {
    const [clubs,setClubs]=React.useState([])
    const ApiHelper=async()=>{
        let data=await studentClubApi()
        setClubs(data)
    }
    React.useEffect(()=>{
        ApiHelper()
    },[])
    const[status,setStatus]=React.useState({})
   const RequestSend=(id)=>{
        setStatus({id:id,msg:'Request Send'})
   } 
  return (
    <Container>
{
            clubs.map((data,index)=>(
    <Box key={index} className='Clubcard'>
      <Card variant="outlined" className='clubcard'>
        
      <React.Fragment >
    <CardContent >
      
      <Typography variant="h5" component="div">
        {data.name}
      </Typography>
      <Typography sx={{ mb: 1.8 }} color="text.secondary">
        Club Admin:{data.clubAdmin} 
      </Typography>
      <Typography variant="body2">
       {data.description}
      </Typography>
    </CardContent>
    <CardActions>
    <Button size="large" onClick={()=>RequestSend(data._id)}>Join Club</Button>
    {
      status.id===data._id ?
    <p style={{backgroundColor:'orange'}}>{status.msg}</p>
    :''
    }

    </CardActions>
  </React.Fragment>
      </Card>
    </Box>
))} 
    </Container>
  );
}