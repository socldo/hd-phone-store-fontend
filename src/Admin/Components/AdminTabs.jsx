import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Typography, Box, useMediaQuery, Grid } from '@mui/material';
// import ProductChart from './Charts/ProductChart';
import UserTable from './Tables/UserTable';
import axios from 'axios';
import ProductTable from './Tables/ProductTable';
import { VscGraph } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { TbReportMoney } from 'react-icons/tb'
import OrderTable from './Tables/OrderTable';
import ReportTable from './Tables/ReportTable';
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import Widget from './Widget';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography >{children} </Typography>

                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ user, setUser, getUser }) {
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);
    const [review, setReview] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [paymentData, setPaymentData] = useState([]);
    const [report, setReportData] = useState([]);
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        getProductInfo();
    }, [])
    const getProductInfo = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_ADMIN_GET_CHART_DATA)
            setProducts(data.product);
            setReview(data.review);
            setCart(data.cart);
            setWishlist(data.wishlist);
            setPaymentData(data.payment);
            setReportData(data.report)
            setUsers(data.user)
        } catch (error) {
        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const totalRevenue = paymentData.reduce((acc, curr) => (acc + curr.totalAmount), 0);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} direction={isSmallScreen ? 'column' : 'row'} padding={1}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={totalRevenue} heading='Doanh thu' color='#9932CC' icon={<TbReportMoney />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={products.length}   heading='Sản phẩm' color='#FFC300' icon={<AiOutlineShoppingCart />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={user.length} heading='Người dùng' color='#FF69B4' icon={<CgProfile />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={paymentData.length} heading='Đơn hàng' color='#1f77b4  ' icon={<FaShippingFast />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={report?.length} heading='Report' color='#1f77b4  ' icon={<FaShippingFast />} />
                </Grid>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ overflowX: "a" }} >
                    {/*<Tab label={!isSmallScreen && 'Thống kế'}  {...a11yProps(0)} iconPosition='start' icon={<VscGraph fontSize={20} />} />*/}
                    <Tab label={!isSmallScreen && "Người dùng"} {...a11yProps(0)} iconPosition='start' icon={<CgProfile fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Sản phẩm"} {...a11yProps(1)} iconPosition='start' icon={<AiOutlineShoppingCart fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Đơn hàng"} {...a11yProps(2)} iconPosition='start' icon={<FaShippingFast fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Report"} {...a11yProps(3)} iconPosition='start' icon={<MdOutlineReportGmailerrorred fontSize={20} />} />
                </Tabs>
            </Box>
            {/*<TabPanel value={value} index={0} >*/}
            {/*    <ProductChart*/}
            {/*        products={products}*/}
            {/*        review={review}*/}
            {/*        cart={cart}*/}
            {/*        wishlist={wishlist}*/}
            {/*        paymentData={paymentData}*/}
            {/*        user={user} />*/}
            {/*</TabPanel>*/}
            <TabPanel value={value} index={0}>
                <UserTable user={users} paymentData={paymentData} getUser={getUser} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProductTable data={products} setProducts={setProducts} getProductInfo={getProductInfo} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OrderTable orders={paymentData} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ReportTable reports={report} />
            </TabPanel>
        </Box >
    );
}