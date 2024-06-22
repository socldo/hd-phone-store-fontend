import React, { useEffect, useState } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, InputLabel, MenuItem, FormControl, Select,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Transition } from '../../Constants/Constant';
import { MdOutlineCancel, MdProductionQuantityLimits } from 'react-icons/md';


const AddProduct = ({ getProductInfo, data }) => {
    // const [age, setAge] = useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    const [open, setOpen] = useState(false);
    const [isPartner, setIsPartner] = useState(false);
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [images, setImages] = useState([]);

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

    useEffect(() => {
        getUser();
    }, [])

    let authToken = localStorage.getItem("Authorization")
    console.log('userId', userId);
    const [productInfo, setProductInfo] = useState({
        name: "",
        image: [],
        price: "",
        rating: "",
        category: "",
        type: "",
        description: "",
        author: "",
        brand: ""
    });



    // const [productInfo, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })
    const handleOnchange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    }
    const handleClick = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
    
        const newImages = [];
    
        fileArray.forEach((file) => {
            const reader = new FileReader(); // Create a FileReader
            reader.onload = (e) => {
                newImages.push(e.target.result);
    
                if (newImages.length === fileArray.length) {
                    // Once all files are read
                    const updatedImages = [...images, ...newImages];
                    setImages(updatedImages); // Add new image data to the state array
                    const updatedProduct = {
                        ...productInfo,
                        image : updatedImages,
                    }
                    setProductInfo(updatedProduct);
                }
            }
            reader.readAsDataURL(file); // Read the file as a data URL
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setImages([]);
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!productInfo.name && !productInfo.image && !productInfo.price && !productInfo.rating && !productInfo.category && !productInfo.type && !productInfo.description) {
                toast.error("Vui lòng điền đầy đủ thông tin", { autoClose: 500, theme: 'colored' })
            }
            else if (productInfo.rating < 0 || productInfo.rating > 5) {
                toast.error("Rating không hợp lệ", { autoClose: 500, theme: 'colored' })

            }
            else {
                console.log({
                    name: productInfo.name,
                    brand: productInfo.brand,
                    price: productInfo.price,
                    category: productInfo.category,
                    image: productInfo.image,
                    rating: productInfo.rating,
                    type: productInfo.type,
                    author: productInfo.author,
                    description: productInfo.description,
                    status: isAdmin ? 'Đang bán' : 'Chờ duyệt',
                    userId: userId
                }, authToken);
                const data = await axios.post(`${process.env.REACT_APP_ADMIN_ADD_PRODUCT}`,
                    {
                        name: productInfo.name,
                        brand: productInfo.brand,
                        price: productInfo.price,
                        category: productInfo.category,
                        image: productInfo.image,
                        rating: productInfo.rating,
                        type: productInfo.type,
                        author: productInfo.author,
                        description: productInfo.description,
                        userId: userId,
                        status: isAdmin ? 'Đang bán' : 'Chờ duyệt'
                    }, {
                    headers: {
                        'Authorization': authToken
                    }
                })
                setOpen(false);
                if (data.data) {
                    // getProductInfo() 

                    toast.success(`Thêm thành công sản phẩm ${productInfo.name}`, { autoClose: 500, theme: 'colored' })
                    setProductInfo({
                        name: "",
                        image: "",
                        price: "",
                        rating: "",
                        category: "",
                        type: "",
                        description: "",
                        author: "",
                        brand: ""
                    });
                }
                else {
                    toast.error("Sản phẩm đã tồn tại!", { autoClose: 500, theme: 'colored' })
                }
            }
        } catch (error) {
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }

    }
    const productFilter = []

    if (productInfo.type === 'Điện thoại') {
        productFilter.push('Iphone', 'Samsung', 'Xiaomi', 'Huawei', 'Vinsmart')
    }
    else if (productInfo.type === 'Laptop') {
        productFilter.push('Macbook', 'Laptop gaming', 'Laptop văn phòng')
    }
    else if (productInfo.type === 'Tai nghe') {
        productFilter.push('Tai nghe không dây', 'Tai nghe dây')
    }
    else if (productInfo.type === 'Loa') {
        productFilter.push('JBL', 'Marshal', 'Bose')
    }
    else if (productInfo.type === 'Sạc') {
        productFilter.push('Sạc không dây', 'Sạc dây')
    }
    else if (productInfo.type === 'Sạc dự phòng') {
        productFilter.push('Sạc nhanh', 'Dung lượng cao')
    }
    else if (productInfo.type === 'Đồng hồ') {
        productFilter.push('Đồng hồ cơ', 'Đồng hồ thông minh')
    }
    else {
        productFilter.push('all')

    }
    const typeDropdown = ['Điện thoại', 'Laptop', 'Tai nghe', 'Loa', 'Sạc', 'Sạc dự phòng', 'Đồng hồ'];
    const shoeBrand = ['adidas', 'hushpuppies', 'nike', 'reebok', 'vans']


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "20px 0" }} >
                <Typography variant='h6' textAlign='center' color="#1976d2" fontWeight="bold">Đăng bán sản phẩm </Typography>
                <Button variant='contained' endIcon={<MdProductionQuantityLimits />} onClick={handleClickOpen}>Thêm</Button>
            </Box>
            <Divider sx={{ mb: 5 }} />
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}>
                <DialogTitle sx={{ textAlign: "center", fontWeight: 'bold', color: "#1976d2" }}> Add new product</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField label="Name" name='name' value={productInfo.name} onChange={handleOnchange} variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={productInfo.type}
                                            label="Product Type"
                                            name='type'
                                            onChange={handleOnchange}
                                        >
                                            {typeDropdown.map(item =>
                                                <MenuItem value={item} key={item}>{item}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
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
                                {
                                    productInfo.type === 'book' &&
                                    <Grid item xs={12} >
                                        <TextField label="Author" name='author' value={productInfo.author} onChange={handleOnchange} variant="outlined" required fullWidth />
                                    </Grid>
                                }
                                {
                                    productInfo.type === 'shoe' &&
                                    <Grid item xs={12} >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Shoe Brand</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={productInfo.brand}
                                                label="Shoe Brand"
                                                name='brand'
                                                required
                                                onChange={handleOnchange}
                                            >
                                                {shoeBrand.map(item =>
                                                    <MenuItem value={item} key={item}>{item}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                }
                                <Grid item xs={12} >
                                    <input type="file" accept="image/png, image/jpeg" label="Image" name='image' onChange={handleClick} variant="outlined" fullWidth />
                                    <br />
                                    {images.map((image, index) => (
                                        <img key={index} src={image} alt={`Upload ${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
                                    ))}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Price" name='price' value={productInfo.price} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField label="Rating" name='rating' value={productInfo.rating} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                                </Grid>

                                <Grid item xs={12} sx={{ margin: "10px auto" }}>
                                    <TextField
                                        id="filled-textarea"
                                        value={productInfo.description} onChange={handleOnchange}
                                        label="Description"
                                        multiline
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        name='description'
                                        fullWidth

                                    />
                                </Grid>

                            </Grid>
                            <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 2 }}>
                                <Button fullWidth variant='contained' type='reset' color='error' onClick={handleClose} endIcon={<MdOutlineCancel />}>Hủy</Button>
                                <Button type="submit" fullWidth variant="contained" endIcon={<MdProductionQuantityLimits />}>Thêm</Button>
                            </DialogActions>
                        </form>
                    </Box >

                </DialogContent>
            </Dialog >
        </>
    )
}

export default AddProduct