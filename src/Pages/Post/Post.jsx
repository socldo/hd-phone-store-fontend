import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';
import ProductTable from '../../Admin/Components/Tables/ProductTable';
import {
    Typography,
    Container,
    CssBaseline,
    Box,
} from '@mui/material'
import axios from 'axios'

import CopyRight from '../../Components/CopyRight/CopyRight';

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
                    <Typography>{children}</Typography>
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

const Post = () => {
    const [productData, setProductData] = useState([]);
    const [userIda, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserAndProducts = async () => {
            try {
                await getUser();
                if (userIda) {
                    await getProducts();
                }
            } catch (error) {
                console.error('Error in fetching data', error);
            }
        };

        fetchUserAndProducts();
    }, [userIda]);

    let authToken = localStorage.getItem('Authorization');
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_PRODUCT_USERID}/${userIda}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            setProductData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_GET_ALL_USERS}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            setUserId(data.phoneNumber);
        } catch (error) {
            toast.error(error.response.data, { autoClose: 500, theme: "colored" });
            throw error;
        }
    }

    return (
        <>
            <CssBaseline />
            <Container fixed maxWidth="lg">
                <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 10, color: '#1976d2', fontWeight: 'bold' }}>
                    Cửa hàng
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "column", mb: 10 }}>
                    <TabPanel value={0} index={0}>
                        <ProductTable data={productData} />
                    </TabPanel>
                </Box>
            </Container>
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    )
}

export default Post;
