import './Notice'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import { Download } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SideBarFaculty from '../SideBar/SideBarFaculty';
import { FacultyNoticeApi } from '../../api/FacultyApi';
import { TextField } from '@mui/material';

export default function Notice() {
    const [notice,setNotice]=React.useState([])
   
    const[search,setSearch]=React.useState('')
    React.useEffect(()=>{
      const ApiHelper=async()=>{
        let data=await FacultyNoticeApi(search)
        setNotice(data)
    }
       ApiHelper()
    },[search])
    console.log(notice);
  return (
    <>
    <SideBarFaculty/>
    <Container  >
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
        <div className='d-flex justify-content-between'>
       {notice.length>0 ?
        notice.map((data,index)=>(
            <Card key={index} sx={{ maxWidth: 345 }} style={{marginTop:'10px'}}>
            <CardMedia
              sx={{ height: 200 }}
              style={{height:"290px",}}
              image="https://as2.ftcdn.net/v2/jpg/01/03/75/43/1000_F_103754394_xSNhdDOKFusz9Vrb8ZZNLY8SXSwLfaIT.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.name}
              </Typography>
            <Link to={''}>
                {/* data.filePath */}
              <p style={{color:'blue',textDecoration:'underline'}} >Download Pdf  <Download></Download></p>
            </Link>
            
            </CardContent>
            
          </Card>
        ))
       :<div>Notice not Found</div>}
       </div>
    </Container> 
    </>
  );
}