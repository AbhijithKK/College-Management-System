import React from 'react';
import pic from '../assets/404.jpg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Fpage = () => {
  let navigate=useNavigate()
  return (
    <div
      style={{
        backgroundColor:'red',
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        height: '100vh',
      }}
    ><div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'300px',fontSize:'1000'}}>

      <Button style={{textDecoration:'underline',fontWeight:'bold',letterSpacing:'2px'}} onClick={()=>navigate('/')}>go back  &lt;----</Button>
    </div>
    </div>
  );
};

export default Fpage;
