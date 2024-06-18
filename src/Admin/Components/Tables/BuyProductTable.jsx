// BuyProductTable.js
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdVisibility, MdChat } from 'react-icons/md';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Link as MuiLink,
    Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddProduct from '../AddProduct';
import axios from 'axios';
import { toast } from 'react-toastify';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ChatDialog from '../ChatDialog';
import ReportDialog from '../ReportDialog';
import ReportIcon from '@mui/icons-material/Report';

const BuyProductTable = ({ data, getProductInfo }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatProductId, setChatProductId] = useState(null);
    const [isPartner, setIsPartner] = useState(false);
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [reportOpen, setReportOpen] = useState(false);
    const [reportUserId, setReportUserId] = useState(null);
    const [reportProductId, setReportProductId] = useState(null);

    let authToken = localStorage.getItem("Authorization")

    const getUser = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_GET_ALL_USERS}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            setUserId(data.phoneNumber);
            setIsAdmin(data.isAdmin);
            setIsPartner(data.isPartner);
        } catch (error) {
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
            throw error;
        }
    }

    const changeStatusProduct = async (id, status) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_CHANGE_STATUS}`,
                {
                    id: id,
                    status: status
                }, {
                headers: {
                    'Authorization': authToken
                }
            });
            if (data) {
                toast.success(`Cập nhật thành công`, { autoClose: 500, theme: 'colored' })
            }

        } catch (error) {
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
            throw error;
        }
    }

    const columns = [
        { id: 'name', label: 'Tên', minWidth: 170, align: 'center' },
        { id: 'image', label: 'Hình ảnh', minWidth: 100, align: 'center' },
        { id: 'type', label: 'Loại sản phẩm', align: 'center', minWidth: 100 },
        { id: 'price', label: 'Giá', minWidth: 100, align: 'center' },
        { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },
        { id: 'authorName', label: 'Tên người bán', minWidth: 100, align: 'center' },
        { id: 'authorPhone', label: 'Số điện thoại người bán', minWidth: 100, align: 'center' },
        { id: 'chat', label: 'Chat', minWidth: 100, align: 'center' }, // New column for chat
        { id: 'report', label: 'Report người dùng', minWidth: 100, align: 'center' }, // New column for report
    ];

    const filterData = () => {
        if (searchTerm === '') {
            return data;
        }
        return data.filter(
            (item) =>
                (item.name &&
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.type &&
                    item.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.price &&
                    item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.rating &&
                    item.rating.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.brand &&
                    item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.category &&
                    item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.author &&
                    item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.description &&
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.gender &&
                    item.gender.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const newFilteredData = filterData();
        setFilteredData(newFilteredData);
    };

    const handleApproveProduct = async (id, status) => {
        changeStatusProduct(id, status);
    };

    useEffect(() => {
        getUser();
        setFilteredData(filterData());
    }, [data, searchTerm]);

    const handleOrderDialogOpen = async (productId) => {
        try {
            const response = await axios.get(`/api/orders/${productId}`);
            setOrderDetails(response.data);
            setOpenOrderDialog(true);
        } catch (error) {
            console.error("Failed to fetch order details", error);
        }
    };

    const handleOrderDialogClose = () => {
        setOpenOrderDialog(false);
        setOrderDetails(null);
    };

    const handleChatOpen = (productId, author) => {
        setIdUser(author)
        setChatProductId(productId);
        setChatOpen(true);
    };

    const handleChatClose = () => {
        setChatOpen(false);
        setChatProductId(null);
    };

    const handleReportOpen = (userId, productId) => {
        setReportUserId(userId);
        setReportProductId(productId);
        setReportOpen(true);
    };

    const handleReportClose = () => {
        setReportOpen(false);
        setReportUserId(null);
        setReportProductId(null);
    };

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Tìm sản phẩm"
                    value={searchTerm}
                    onChange={handleSearch}
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
            <Paper
                style={{
                    overflow: "auto",
                    maxHeight: "500px"
                }}
            >
                <TableContainer sx={{ maxHeight: '440px' }}>
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
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <h4> Không tìm thấy sản phẩm.</h4>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((prod) => (
                                    <TableRow key={prod._id}>
                                        <TableCell component="th" scope="row" align="center">
                                            <Link to={`/admin/home/product/${prod.type}/${prod._id}`}>
                                                {prod.name.slice(0, 20)}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`/admin/home/product/${prod.type}/${prod._id}`}>
                                                <img src={prod.image} alt={prod.name} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`/admin/home/product/${prod.type}/${prod._id}`}>
                                                {prod.type}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`/admin/home/product/${prod.type}/${prod._id}`}>
                                                {prod.price} đ
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <MuiLink component={Link} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                                                <Box display="flex" alignItems="center" justifyContent="center">
                                                    {prod.status}
                                                </Box>
                                            </MuiLink>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link>
                                                {prod.author ? prod.author.lastName : ''}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link>
                                                {prod.author ? prod.author.phoneNumber : ''}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Chat với người bán">
                                                <Button onClick={() => handleChatOpen(prod._id, prod.author)}>
                                                    <MdChat />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Report người bán">
                                                <Button onClick={() => handleReportOpen(prod.author, prod._id)}>
                                                    <ReportIcon></ReportIcon>
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Order Dialog */}
            <Dialog
                open={openOrderDialog}
                onClose={handleOrderDialogClose}
            >
                <DialogTitle sx={{ textAlign: "center", fontWeight: 'bold', color: "#1976d2" }}>Chi tiết đơn hàng</DialogTitle>
                <DialogContent>
                    {orderDetails ? (
                        <Box>
                            {orderDetails.map((order, index) => (
                                <Box key={index} mb={2}>
                                    <Typography variant="body1">
                                        Order ID: {order.id}
                                    </Typography>
                                    <Typography variant="body1">
                                        Customer: {order.customerName}
                                    </Typography>
                                    <Typography variant="body1">
                                        Quantity: {order.quantity}
                                    </Typography>
                                    <Typography variant="body1">
                                        Total Price: {order.totalPrice} đ
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body1">Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOrderDialogClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Chat Dialog */}
            <ChatDialog
                open={chatOpen}
                onClose={handleChatClose}
                productId={chatProductId}
                userId={idUser}
            />

            {/* Report Dialog */}
            <ReportDialog
                open={reportOpen}
                onClose={handleReportClose}
                userId={reportUserId}
                productId={reportProductId}
            />
        </>
    );
}

export default BuyProductTable;
