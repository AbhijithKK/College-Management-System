import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import './ViewComplaint.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ApiDeleteComplaint, ApiViewComplaint } from '../../api/AdminApi';
import {  MoreVert } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import SideBar from '../SideBar/SideBar';
import DatePicker from 'react-datepicker';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useMediaQuery, useTheme } from '@mui/material';
// ==============================================================
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 
// ==============================================================

export default function ViewComplaint() {
  const [allCompliant, setAllComplaint] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedDate, handleDateChange] = useState('');
  const [pageNo, setPageNo] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const complaintContentStyle = {
    fontSize: isMobileScreen ? '14px' : '16px',
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event,data) => {
    setAnchorEl(event.currentTarget);
    setMoreInfo(data)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

const [moreInfo,setMoreInfo]=useState({})
const handleMoreInfo=()=>{
   handleClickOpen()
}

  const handleDelete = () => {
    console.log(moreInfo._id);
    handleMenuClose();
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
        let data = await ApiDeleteComplaint(moreInfo._id);
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

  const PaginationHelp = (event, page) => {
    setPageNo(page);
  };

  useEffect(() => {
    const ApiHelper = async () => {
      let data = await ApiViewComplaint(selectedDate, pageNo);
      setAllComplaint(data.allCompliants);
      setTotal(data.total);
    };
    ApiHelper();
  }, [refresh, selectedDate, pageNo]);

  // ============================MODAL============================
  const [open, setOpen] = React.useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // ===============================================================

  return (
    <>
      <SideBar />
      <div className="customViewComplaint" style={{ backgroundColor: 'gray', marginTop: '-65px', height: '100vh' }}>
        <Container >
          {/* =================================MODAL======================== */}
          <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"More Info"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {moreInfo.name}<br/>
           {moreInfo.who}<br/>
           {moreInfo.department} Department<br/>
           {moreInfo.className?`${moreInfo.className} Class`:''}<br/>
           {moreInfo.date}<br/>
           {moreInfo.teachingArea}<br/>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
          {/* ==================================================================== */}
          <Row style={{ marginLeft: '72px', paddingTop: '18px' }}>
            <Col xs={12} md={12} lg={12}>
              <h1 style={{ fontWeight: 'bold' }}>VIEW COMPLAINTS</h1>
              <div style={{ display: 'grid', width: '100%' }}>
                <label>Search by Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  className="form-control formleavedate"
                />
                <hr></hr>
              </div>
            </Col>
          </Row>
          {allCompliant.length > 0 ? allCompliant.map((data, index) => (
            <Row key={index} style={{ marginLeft: '72px',marginTop:'5px'  }}>
              <Col xs={12} md={12} lg={12} >
                <Box className="customViewComplaint-Clubcard" > {/* Add custom CSS class */}
                  <Card variant="outlined" className="customViewComplaint-clubcard"> {/* Add custom CSS class */}
                    <CardContent>
                      <div style={{display:'flex' ,justifyContent:'space-between'}}>
                      <Typography variant="h5" component="div">
                        {data.title}
                      </Typography>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="Menu">
                          <IconButton onClick={(e)=>handleMenuOpen(e,data)}>
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => handleMoreInfo(data)}>More info</MenuItem>
                          <MenuItem onClick={() => handleDelete(data._id)}>Delete</MenuItem>
                        </Menu>
                      </div> 
                      </div>
                      <Typography sx={{ mb: 1.8 }} color="text.secondarmoreInfo.classNamey">
                        Name: {data.name}
                      </Typography>
                      <Typography variant="body2" className='textContent' style={complaintContentStyle}>
                        {data.content}
                      </Typography>
                     
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Box>
              </Col>
            </Row>
          )) : <div>There is no Complaint Found</div>}
          <Row style={{ marginLeft: '72px' }}>
            <Col xs={12} md={12} lg={12}>
              <Stack spacing={2}>
                <Pagination
                  count={total}
                  color="primary"
                  page={pageNo}
                  onChange={PaginationHelp}
                />
              </Stack>
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    </>
  );
}
