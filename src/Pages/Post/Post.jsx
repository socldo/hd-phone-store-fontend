import React, { useContext, useEffect, useState } from 'react'
import { ContextFunction } from '../../Context/Context';
import {
    Typography,
    Container,
    CssBaseline,
} from '@mui/material'

import CopyRight from '../../Components/CopyRight/CopyRight';



const Post = () => {

    const getProducts = async () => {
        if (setProceed) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_WISHLIST}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setWishlistData(data)
        }
        else {
            setOpenAlert(true)
        }
    }
    
    return (
        <>
            <CssBaseline />
            <Container fixed maxWidth >

                <Typography variant='h3' sx={{ textAlign: 'center', marginTop: 10, color: '#1976d2', fontWeight: 'bold' }}>Đăng bán sản phẩm</Typography>

                <Container sx={{ display: 'flex', flexDirection: "column", mb: 10 }}>

                </Container>
            </Container>
           

            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    )
}

export default Post