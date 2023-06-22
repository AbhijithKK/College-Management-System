import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container,Row,Col} from 'react-bootstrap'
import './ViewComplaint.css'
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Dep:EEE
      </Typography>
      <Typography variant="h5" component="div">
       Abcd{bull}kk
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       Sem:6
      </Typography>
      <Typography variant="body2">
       Complaint content
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Read More</Button>
    </CardActions>
  </React.Fragment>
);

export default function ViewComplaint() {
  return (
   <>
   <Container fluid>
    <Row >
        <Col sm={12} md={4} className='complientMain mx-4'>
        <Box  >
      <Card variant="outlined">{card}</Card>
    </Box>
        </Col>
        <Col sm={12} md={4} className='complientMain'>
        <Box >
      <Card variant="outlined">{card}</Card>
    </Box>
        </Col>
    </Row>
   </Container>
   </>
  );
}
