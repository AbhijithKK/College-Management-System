import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './AddClub.css';
import { useEffect, useState } from 'react';
import axios from '../../Axios/Axios';
import { useForm } from '../../useForm/useForm';
import Swal from "sweetalert2"
import { StudentClubAdminGetApi } from '../../api/StudentApi';
import SideBar from '../SideBar/SideBar';
function AddClub() {
  const [faculty, setFaculty] = useState([{ name: '' }]);
const[clubAdminId,setClubAdminId]=useState('')
  useEffect(() => {
    axios
      .get('/admin/facultys', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => {
        console.log(data.data);
        FacultyName(data.data);
      });
      const FacultyApi=async()=>{
        let data=await StudentClubAdminGetApi(clubAdminId)
        setAdminName(data.name)
      }
      FacultyApi()
  }, [clubAdminId]);
  const [AdminName,setAdminName]=useState('')
console.log(AdminName);
  const FacultyName = (data) => {
    setFaculty(data);
  };

  const [value ,useValue]=useForm({
    names:'',
    discription:''
  })
  console.log(value);
const HandleChange=(event)=>{
  useValue(event)
}
const[errorMsg,setErrMsg]=useState('')
const SendData=()=>{
  if(value.names.trim()&&value.discription.trim()&&clubAdminId.trim()&&AdminName.trim()){
  axios.post('/admin/addClub',{value,clubAdminId,clubAdmin:AdminName},{
    headers:{
      'Content-Type':'application/json'
    },withCredentials:true
  }).then((data)=>{
    Swal.fire({
      icon: 'success',
      text: 'Club Added',
  })
 
  })
}else{
setErrMsg('Fill the Form Properly')
}
}
  return (
    <div>
      <SideBar/>
      <Container>
        <Row>
          <Col sm={12}>
            <div
              className="studentclub"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Form className="form">
                <p style={{color:'red'}}>{errorMsg}</p>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Club Name</Form.Label>
                  <Form.Control type="text" name='names' value={value.names} onChange={HandleChange} placeholder="Enter Club Name" />
                </Form.Group>
                <Form.Select aria-label="Default select example" name='clubAdmin' onChange={(e)=>setClubAdminId(e.target.value)} >
                  <option hidden> Select Club Admin</option>
                  {faculty.map((value, index) => (
                    <option key={index} value={value._id}>
                      {value.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Add Description</Form.Label>
                  <Form.Control as="textarea" name='discription' value={value.discription} onChange={HandleChange} rows={3} />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button type="button" onClick={SendData}>Add</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddClub;
