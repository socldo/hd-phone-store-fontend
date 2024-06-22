import React, { useEffect } from 'react'
import axios from 'axios'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import CategoryCard from '../../Components/Category_Card/CategoryCard';
import BannerData from '../../Helpers/HomePageBanner';
import Carousel from '../../Components/Carousel/Carousel'
import SearchBar from '../../Components/SearchBar/SearchBar'
import CopyRight from '../../Components/CopyRight/CopyRight'
import {Link} from "react-router-dom";
const HomePage = () => {
    const { setCart } = useContext(ContextFunction)
    let authToken = localStorage.getItem('Authorization')
    useEffect(() => {
        getCart()
        window.scroll(0, 0)
    }, [])
    const getCart = async () => {
        if (authToken !== null) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setCart(data);
        }

    }
    const items = BannerData.map((item) => (

        <Link to={`product/type/${item.name}`} key={item.name} >
            <div className="item" style={{ marginTop: 10 }} >
                <img src={item.img} loading='lazy' alt={item.name} style={{ height: '90%', width: '90%', objectFit: 'contain' }} />
            </div>
        </Link>
    ))


    return (
        <>
            <Container maxWidth='xl' style={{ maxWidth: '1200px', margin:'auto', display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column", marginBottom: 70 }}>
                <Box padding={1}>
                    <Carousel items={items}/>
                </Box>
                <Container style={{display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <SearchBar />
                </Container>
                <Typography variant='h3' sx={{ textAlign: 'center', marginTop: "10px", color: '#1976d2', fontWeight: 'bold' }}>Danh mục</Typography>
                <Container maxWidth='xl' style={{ marginTop: "20px", display: "flex", justifyContent: 'center', flexGrow: 1, flexWrap: 'wrap', gap: 20, }}>
                    {
                        BannerData.map(data => (
                            <CategoryCard data={data} key={data.img} />
                        ))
                    }
                </Container>
            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </ >
    )
}

export default HomePage