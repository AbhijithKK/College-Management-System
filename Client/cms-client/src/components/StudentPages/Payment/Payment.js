import './Payment.css'
import * as React from 'react';
import { ApiStudentPayment, ApiStudentPaymentpost, } from '../../api/StudentApi';
import SideBarStudent from '../SideBar/SideBarStudent';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { ClipLoader, PulseLoader} from 'react-spinners';
export default function Payment() {
  const [search, setSearch] = React.useState('')

  const [Total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState({})
  const [currentPage, setCurrentPage] = React.useState(1);
  const ChangePage = (event, page) => {
    setCurrentPage(page);
  }
  const [payment, setPayment] = React.useState([])
  const [historyid, setHistoryid] = React.useState('')
  React.useEffect(() => {
    const ApiHelper = async () => {
      let data = await ApiStudentPayment(search, historyid, currentPage)
      setPayment(data?.payment)
      setTotal(data?.Total)
    }
    ApiHelper()
  }, [search, currentPage, historyid])
  const PayHelper = async (title, amount, id) => {
    setLoading({[id]:true})
    let res = await ApiStudentPaymentpost(title, amount, id)
    if (res === false) {
      Swal.fire({
        icon: 'error',
        text: 'Payment Gateway error',
      });
    } else {
      setHistoryid(res.id)
      window.location.href = res.url
    }
    setLoading({})
  }

  return (
    <>
      <SideBarStudent />
      <div style={{ marginLeft: '62px', backgroundColor: 'gray', marginTop: '-65px', height: '100vh' }}>
        <Container>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h1>PAYMENT</h1>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            {payment.length > 0 ? (
              payment.map((data, index) => (
                <Col key={index} xs={12} md={6} lg={3}>
                  <Card style={{ marginTop: '10px' }}>
                    <Card.Img
                      variant="top"
                      src="https://as1.ftcdn.net/v2/jpg/04/16/76/70/1000_F_416767099_N9ADfbv04z4TvviKK7loSXY8LJ495pgJ.jpg"
                      style={{ height: '200px' }}
                    />
                    <Card.Body>
                      <Card.Title>{data.title}</Card.Title>
                      <Card.Title>{data.amount}</Card.Title>
                      {data.status === 'true'
                        ? <div style={{
                          backgroundColor: 'green', color: 'white', paddingLeft: '72px '
                          , paddingTop: '5px', paddingBottom: '5px ', borderRadius: '10px'
                        }}>Payment completed</div>
                        : data.status === 'true'
                          ?<>
                            <div style={{ backgroundColor: 'red', color: 'white' }}>Payment faild</div>
                            <Button onClick={() => PayHelper(data.title, data.amount, data._id)} variant="primary" >
                              Pay {"   "}
                          {loading[data._id] && <PulseLoader  color='white' size={10}/>}
                            </Button>
                          </>
                          :<Button onClick={() => PayHelper(data.title, data.amount, data._id)} variant="primary" >
                            Pay {"   "}
                          {loading[data._id] && <PulseLoader  color='white' size={10}/>}
                          </Button>}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12}>Payment not found</Col>
            )}
            <br />
            <h1> </h1>
            <br />
            <Stack style={{ alignItems: 'center' }} spacing={2}>

              <Pagination
                onChange={ChangePage}
                count={Total}
                color="primary"
                page={currentPage}

              />
            </Stack>
            <br />
            <br />
            <h1> </h1>
            <br />
          </Row>
        </Container>
      </div>
    </>

  );
}