import './CreatePayment.css'
import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,

}
    from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import SideBarStudent from '../SideBar/SideBar';
import { ApiDeletepayment, ApiGetpayment, ApiPayment } from '../../api/AdminApi';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle,
} from '@mui/material';


import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Delete } from '@mui/icons-material';
import PaymentHistory from '../../PaymentHistory/PaymentHistory';
import { Container } from 'react-bootstrap';




function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function CreatePayment() {
    const [title, setTitle] = useState('')
    const [Amount, setAmount] = useState('')
    const [Date, setDate] = useState('')
    const [errMsg, setErrmsg] = useState('')
    const sendComplaint = async () => {
        if (title.trim() && Amount.trim() && Date.trim()&& Amount>100&& Date>currentDate) {
            let data = await ApiPayment(title, Amount, Date)
            if (data === true) {
                Swal.fire({
                    icon: 'success',

                    text: 'Payment created Successfully',
                })
                setAmount('')
                setTitle('')
                setErrmsg('')
                setDate('')
                REfreshHelper()
            }
        } else {
            setErrmsg('Fill all the fileds')
        }
    }
    // ======>modal<=====
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    // ===================
    // =======================>TABLE<============================
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [result, setResult] = React.useState([])
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [refresh, setRefresh] = useState(false)
    const REfreshHelper = () => {
        setRefresh(!refresh)
    }
    useEffect(() => {
        GetApi()
    }, [refresh])
    const GetApi = async () => {
        let data = await ApiGetpayment()
        setResult(data)
    }
    const deleteApi = async (i) => {
        handleClose()
        let id = result[i]._id
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Payment!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete',
            confirmButtonColor: '#dc3545',
        }).then(async (result) => {
            if (result.isConfirmed) {
                let data = await ApiDeletepayment(id)
                if (data === true) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Deleted Successfully',
                    });
                    REfreshHelper()
                }
            }
        });


    }
    const[hSeter,Hsetter]=useState(false)
    const handleClickHistory = () => {
        Hsetter(!hSeter)
    }
    const currentDate = new window.Date().toISOString().slice(0, 10);
    return (
        <>
            <div style={{ backgroundColor: 'gray', marginTop: '0px', height: '100vh' }}><SideBarStudent />
                <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
                    <div className='mask gradient-custom-3'></div>
                    <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                        <MDBCardBody className='px-5'>
                            <h2 className="text-uppercase text-center mb-5">Create Payment</h2>
                            <p style={{ color: 'red' }}>{errMsg}</p>
                            <MDBInput wrapperClass='mb-4' value={title} onChange={(e) => setTitle(e.target.value)} label='Title' size='lg' id='form1' type='text' />
                            <MDBInput label='Amount Min(100)' value={Amount} onChange={(e) => setAmount(e.target.value)}
                                id='textAreaExample' rows={4} wrapperClass='mb-4' type='number' size='lg'  minLength={100} required />
                            <MDBInput wrapperClass='mb-4' value={Date} onChange={(e) => setDate(e.target.value)} label='Due Date' size='lg' id='form1' type='date' minLength={currentDate} required />

                            <MDBBtn className='mb-4 w-100 gradient-custom-4' type='button' onClick={sendComplaint} size='lg'>Register</MDBBtn>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                <Button onClick={handleClickOpen}>
                                    view Created Payments
                                </Button><br />
                                <Button onClick={handleClickHistory}>
                                    {hSeter===false? 'view Payments history':'close Payments history'}
                                </Button>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>All Patments</DialogTitle>
                        <DialogContent>

                            {/* ================================================================ */}
                            {/* ========================================================== */}
                            <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }} align="center">Title</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="center">Amount</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="center">Due Date</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="center">Action</TableCell>
                                    </TableRow>
                                    {result.length > 0 ? (rowsPerPage > 0
                                        ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : result
                                    ).map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="center">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.amount}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.date}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => deleteApi(i)}><Delete /></Button>
                                            </TableCell>

                                        </TableRow>
                                    )) : <div>Result not found</div>}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={3} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={result.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            {/* ================================================================ */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>

                        </DialogActions>
                    </Dialog>

                </MDBContainer>
                <div>
                    <Container>
                      {hSeter &&   <PaymentHistory />}
                    </Container>
                </div>

            </div>
        </>
    );
}

export default CreatePayment;