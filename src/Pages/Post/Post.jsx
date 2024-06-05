import React, { useContext, useEffect, useState } from 'react'
import { ContextFunction } from '../../Context/Context';
import {
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    Container,
    CssBaseline,
    Box,
} from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiFillCloseCircle, AiOutlineLogin } from 'react-icons/ai'
import CartCard from '../../Components/Card/CartCard/CartCard';
import ProductCard from '../../Components/Card/Product Card/ProductCard';
import { EmptyCart } from '../../Assets/Images/Image';
import { Transition } from '../../Constants/Constant';
import CopyRight from '../../Components/CopyRight/CopyRight';



const Post = () => {
    
    return (
        <>
            <div style={{ width: '100%', height: 300 }}>
                    alo
                </div>
        </>
    )
}

export default Post