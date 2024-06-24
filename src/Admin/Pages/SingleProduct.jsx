import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { getSingleProduct } from '../../Constants/Constant';
import axios from "axios";

import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, Grid, InputLabel, MenuItem, Select, Skeleton, TextField, Typography } from '@mui/material';
import { AiFillCloseCircle, AiFillDelete, AiOutlineFileDone } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Transition } from '../../Constants/Constant';
import CopyRight from '../../Components/CopyRight/CopyRight';
import Carousel from "../../Components/Carousel/Carousel";
const SingleProduct = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    let authToken = localStorage.getItem("Authorization")
    const [productInfo, setProductInfo] = useState({
        name: "",
        image: [],
        price: "",
        rating: "",
        category: "",
        type: "",
        description: "",
        brand: ""
    });

    const { id, type } = useParams();
    let navigate = useNavigate()
    useEffect(() => {
        getSingleProduct()
        window.scroll(0, 0)
    }, [])
    const getSingleProduct = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_FETCH_PRODUCT}/${id}`)
        productInfo.name = data.name
        productInfo.image = data.image
        productInfo.price = data.price
        productInfo.rating = data.rating
        productInfo.category = data.category
        productInfo.type = data.type
        productInfo.description = data.description
        setProduct(data)
        setLoading(false);
    }
    const handleOnchange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }
    const productFilter = []

    if (product.type === 'Điện thoại') {
        productFilter.push('Iphone', 'Samsung', 'Xiaomi', 'Huawei')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productInfo.name && !productInfo.price && !productInfo.rating && !productInfo.category && !productInfo.type && !productInfo.description) {
            toast.error("All fields are required", { autoClose: 500, })

        }
        if (!productFilter.includes(productInfo.category)) {
            setError(true)
            console.log(productInfo.category.includes(productFilter), productFilter);
        }
        else {
            setError(false)
            try {
                console.log("productInfor", productInfo)
                const { data } = await axios.put(`${process.env.REACT_APP_ADMIN_UPDATE_PRODUCT}/${product._id}`, { productDetails: productInfo }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                console.log("res", data)
                if (data.success) {
                    toast.success("Product updated successfully", { autoClose: 500, })

                }
                else {
                    toast.error("Có gì đó sai sai", { autoClose: 500, })
                }

            } catch (error) {
                toast.error("Có gì đó sai sai", { autoClose: 500, })

            }
        }
    }
    const deleteProduct = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_DELETE_PRODUCT}/${product._id}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            if (data == true) {
                toast.success("Product deleted successfully", { autoClose: 500, theme: 'colored' })
                navigate(-1);
            }
            else {
                toast.error("Có gì đó sai sai", { autoClose: 500, theme: 'colored' })
            }

        } catch (error) {

            toast.error(error.response.data, { autoClose: 500, theme: 'colored' })
        }
    }
    const[srcImage, setSrcImage] = useState();

    let items
    if(!loading) {
        items = product.image.map((src) => (
            <img
                src={src}
                loading="lazy"
                alt=""
                style={{height: '60%', width: '100%', objectFit: 'contain', paddingRight: 10, boderRadius: 10}}
                onClick={() => setSrcImage(src)}
            />
        ))
    }
    return (
        <>
            <Container sx={{ width: "100%", marginBottom: 5 }}>
                {loading ? (
                    <section style={{ display: 'flex', flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: 'center' }}>
                        <Skeleton variant='rectangular' height={200} width="200px" />
                        <Skeleton variant='text' height={400} width={700} />

                    </section>
                ) : (
                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <div className="product-image">
                            <div className='detail-img-box'>
                                <img alt={product.name} src={srcImage || product.image[0]} className='detail-img'
                                     width={'100%'} height={'100%'}/>
                            </div>
                            <div className='details-img-box'>
                                <Carousel items={items} disableBtnControl={false}/>
                            </div>
                        </div>
                        <div>
                            <Typography variant='h4'>{product.name}</Typography>
                        </div>
                    </Box>
                )}
                <form autoComplete="off" onSubmit={handleSubmit} style={{ marginTop: 30 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField label="Name" name='name' value={productInfo.name} onChange={handleOnchange} variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Price" name='price' value={productInfo.price} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Rating" name='rating' value={productInfo.rating} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productInfo.category}
                                    label="Product Category"
                                    name='category'
                                    onChange={handleOnchange}
                                >
                                    {productFilter.map(item =>
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}sm = {6} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productInfo.type}
                                    label="Product Type"
                                    name='type'
                                    onChange={handleOnchange}
                                >
                                    {productFilter.map(item =>
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ margin: "10px auto" }}>
                            <TextField
                                id="filled-textarea"
                                value={productInfo.description} onChange={handleOnchange}
                                label="Description"
                                multiline
                                sx={{ width: "100%" }}
                                variant="outlined"
                                name='description'

                            />
                        </Grid>
                    </Grid>
                    <Container sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 5 }}>
                        <Button variant='contained' endIcon={<AiOutlineFileDone />} type='submit'>Save</Button>
                    </Container>
                </form >
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "25px 0", width: '100%' }}>
                    <Typography variant='h6'>Delete {productInfo.name}?</Typography>
                    <Button variant='contained' color='error' endIcon={<AiFillDelete />} onClick={() => setOpenAlert(true)}>Delete</Button>
                </Box>
                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenAlert(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            <Typography variant='body1'>Do you want to delete this product?</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant='contained' endIcon={<AiFillDelete />} color='error' onClick={deleteProduct}>Delete</Button>
                        <Button variant='contained' color='primary'
                                onClick={() => setOpenAlert(false)} endIcon={<AiFillCloseCircle />}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    )
}

export default SingleProduct