import './Notice'
import * as React from 'react';
import SideBarFaculty from '../SideBar/SideBarFaculty';
import { FacultyNoticeApi } from '../../api/FacultyApi';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function Notice() {
  const [notice, setNotice] = React.useState([])

  const [search, setSearch] = React.useState('')
  const DownloadFile = async (path, name) => {
    const downloadUrl = `http://localhost:4000/images/${path}`;

    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();


      const blobUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');

      downloadLink.href = blobUrl;
      downloadLink.setAttribute('download', name + '.jpg');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }

  }
  const [Total, setTotal] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1);
  const ChangePage = (event, page) => {
    setCurrentPage(page);
  }
  React.useEffect(() => {
    const ApiHelper = async () => {
      let data = await FacultyNoticeApi(search, currentPage)
      setNotice(data?.data)
      console.log(data);
      setTotal(data?.total)
    }
    ApiHelper()
  }, [search,currentPage])
  console.log(notice);
  return (
    <>
      <SideBarFaculty />
      <div style={{ marginLeft: '62px', backgroundColor: 'gray', marginTop: '-65px', height: notice.length === 8 ? '' : '100vh' }}>
        <Container>
          <Row>
          <Col xs={12} md={12} lg={12}>
              <h1>VIEW NOTICE</h1>
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
            {notice.length > 0 ? (
              notice.map((data, index) => (
                <Col key={index} xs={12} md={6} lg={3}>
                  <Card style={{ marginTop: '10px' }}>
                    <Card.Img
                      variant="top"
                      src="https://as2.ftcdn.net/v2/jpg/01/03/75/43/1000_F_103754394_xSNhdDOKFusz9Vrb8ZZNLY8SXSwLfaIT.jpg"
                      style={{ height: '200px' }}
                    />
                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>
                      <Button variant="primary" onClick={() => DownloadFile(data.filePath, data.name)}>
                        Download PDF
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12}>Notice not found</Col>
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