import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    InputAdornment,
    TextField,
    Button,
    IconButton,
} from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdDelete, MdDone } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReportTable = ({ reports, getReports }) => {
    const columns = [
        { id: 'Người report', label: 'Người report', minWidth: 100, align: 'center' },
        { id: 'Nội dung', label: 'Nội dung', minWidth: 100, align: 'center' },
        { id: 'Loại', label: 'Loại', minWidth: 100, align: 'center' },
        { id: 'Ngày', label: 'Ngày', minWidth: 100, align: 'center' },
        { id: 'Actions', label: 'Actions', minWidth: 100, align: 'center' },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDeleteUser = async (userId) => {
  
        try {
            await axios.delete(`${process.env.REACT_APP_DELETE_USER_DETAILS}/${userId.author}`);
            toast.success('User deleted successfully');
        } catch (error) {
            
        }
    
    };

    const handleIgnoreReport = async (reportId) => {

            console.log('reportId', reportId);
            await axios.delete(`${process.env.REACT_APP_DELETE_REPORT_USER}/${reportId}`);
            toast.success('Report ignored successfully');

    };

    // const filteredReports = reports;
    // const sortedReports = reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filteredReports = reports.filter((report) => {
        const reporter = report.userId ? report.userId.lastName.toLowerCase() : '';
        const message = report.message.toLowerCase();
        const type = report.type.toLowerCase();
        const queries = searchQuery.toLowerCase().split(" ");

        return queries.every((query) => reporter.includes(query) || message.includes(query) || type.includes(query));
    });

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Tìm kiếm"
                    onChange={handleSearchInputChange}
                    sx={{ width: { xs: 350, sm: 500, md: 800 } }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>
            <Paper style={{ overflow: "auto" }}>
                <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{ position: 'sticky', top: 0 }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, color: "#1976d2", fontWeight: 'bold' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredReports.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <h4>Report not found.</h4>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredReports.map((report) => (
                                    <TableRow key={report._id}>
                                        <TableCell align="center"> {report.userId ? report.userId.lastName : ''} {report.userId ? report.userId.firstName : ''}</TableCell>
                                        <TableCell align="center">{report.message}</TableCell>
                                        <TableCell align="center">{report.type}</TableCell>
                                        <TableCell align="center">
                                            {new Date(report.createdAt).toLocaleDateString('vi', {
                                                weekday: "long", year: "numeric", month: "short", day: "numeric"
                                            })}{" "}
                                            {new Date(report.createdAt).toLocaleTimeString('en-US')}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleIgnoreReport(report._id)} color="secondary">
                                                <MdDelete />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteUser(report.productId)} color="primary">
                                                <MdDone />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default ReportTable;
