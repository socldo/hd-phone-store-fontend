import React, { useState } from 'react'
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
    IconButton,

}
    from '@mui/material'
import { Link } from 'react-router-dom';
import AddUser from '../AddUser';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdDelete, MdDone } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
const UserTable = ({ user, getUser }) => {
    const columns = [
        {
            id: 'name',
            label: 'Tên',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'phone',
            label: 'Số điện thoại',
            align: 'center',
            minWidth: 100
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 70,
            align: 'center',

        },
        {
            id: 'date',
            label: 'Thời gian tạo',
            minWidth: 100,
            align: 'center',

        },
        {
            id: 'lock',
            label: 'Xóa tài khoản',
            minWidth: 100,
            align: 'center',

        },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const sortedUser = user.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filteredUsers = sortedUser.filter((user) => {
        const firstName = user.firstName.toLowerCase();
        const lastName = user.lastName.toLowerCase();
        const fullName = user.firstName.toLowerCase() + user.lastName.toLowerCase();
        const phoneNumber = user.phoneNumber.toString();
        const email = user.email.toLowerCase();
        const queries = searchQuery.toLowerCase().split(" ");

        return queries.every((query) => firstName.includes(query) || lastName.includes(query) || fullName.includes(query) || phoneNumber.includes(query) || email.includes(query));
    });

    const handleDeleteUser = async (userId) => {
        console.log('userId.author', userId)
        try {
            await axios.delete(`${process.env.REACT_APP_DELETE_USER_DETAILS}/${userId}`);
            toast.success('User deleted successfully');
            // getReports(); // Refresh the reports
        } catch (error) {
            
        }
    
    };
    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>

                <TextField
                    id="search"
                    type="search"
                    label="Tìm kiếm tài khoản"
                    onChange={handleSearchInputChange}
                    className="placeholder-animation"
                    sx={{ width: { xs: 350, sm: 500, md: 800 }, }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>
            <AddUser getUser={getUser} user={sortedUser} />
            <Paper
                style={{ overflow: "auto" }}>
                <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
                    <Table stickyHeader aria-label="sticky table" >
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

                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <h4> User not found.</h4>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (filteredUsers.map((info) => (
                                <TableRow
                                    key={info._id}

                                >
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`user/${info._id}`}>
                                            {info.firstName + " " + info.lastName}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link to={`user/${info._id}`}>
                                            {info.phoneNumber}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link to={`user/${info._id}`}>
                                            {info.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <Link to={`/user/${info._id}`}>
                                            {
                                                new Date(info.createdAt).toLocaleDateString('vi', {
                                                    weekday: "long", year: "numeric", month: "short", day: "numeric"
                                                }
                                                )
                                            }
                                            {" "}
                                            {new Date(info.createdAt).toLocaleTimeString('en-US')}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <IconButton onClick={() => handleDeleteUser(info._id)} color="secondary">
                                            <MdDelete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                            )
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
            </Paper>
        </>

    )
}

export default UserTable