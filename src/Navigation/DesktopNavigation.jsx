import './Desktop.css'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle, AiOutlineShop } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, Slide, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { getCart, getWishList, handleLogOut, handleClickOpen, handleClose, Transition } from '../Constants/Constant'
import axios from 'axios'
import logoImage from '../Assets/Images/logo.png';
import { useLocation } from 'react-router-dom';

const DesktopNavigation = () => {

  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
  const [openAlert, setOpenAlert] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate()
  let authToken = localStorage.getItem('Authorization');
  let setProceed = authToken !== null ? true : false
  useEffect(() => {
    getCart(setProceed, setCart, authToken)
    getWishList(setProceed, setWishlistData, authToken)
    getUser()
  }, [])
  const location = useLocation();

  useEffect(() => {
      // Đây là nơi bạn có thể thực hiện các hành động khi chuyển trang
      console.log('Location changed:', location.pathname);
      // Bạn có thể thêm bất kỳ logic nào bạn muốn ở đây.
  }, [location]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_GET_ALL_USERS}`, {
        headers: {
          'Authorization': authToken
        }
      })
      setIsPartner(data.isPartner)
      setIsAdmin(data.isAdmin)
    } catch (error) {
      toast.error(error.response.data, { autoClose: 500, theme: "colored" });
    }
  }

  return (
    <>
      <div color="#be1e2d">
        <nav className='nav'>
          <div className="logo">
            <Link to='/'>
              <img src={logoImage} alt="Shop It Logo" style={{ height: '60px' }} />
            </Link>
          </div>
          <div className="nav-items">
            <ul className="nav-items">
              <li className="nav-links">
                <NavLink to='/'>
                  <span className='nav-icon-span'>  Trang chủ</span>
                </NavLink>
              </li>
              {/* <li className="nav-links">
              <NavLink to='/contact'>
                <span className='nav-icon-span'>  Contact Us</span>
              </NavLink>
            </li> */}

              {
                isPartner && !isAdmin ?
                  <li className="nav-links">
                    <Tooltip title='Post'>
                      <NavLink to="/post">
                        <span className='nav-icon-span'>Cửa hàng </span>
                      </NavLink>
                    </Tooltip>
                  </li>
                  : <div></div>}

              {
                !isAdmin ?
                  <li className="nav-links">
                    <Tooltip title='Cart'>
                      <NavLink to="/cart">
                        <span className='nav-icon-span'>Giỏ hàng    <Badge badgeContent={setProceed ? cart.length : 0}> <AiOutlineShoppingCart className='nav-icon' /></Badge></span>
                      </NavLink>
                    </Tooltip>
                  </li>
                  : <div></div>}

              {
                !isAdmin ?
                  <li className="nav-links">
                    <Tooltip title='Wishlist'>
                      <NavLink to="/wishlist">
                        <span className='nav-icon-span'>Yêu thích  <Badge badgeContent={setProceed ? wishlistData.length : 0}> <AiOutlineHeart className='nav-icon' /></Badge></span>
                      </NavLink>
                    </Tooltip>
                  </li>
                  : <div></div>}


              {
                setProceed ?
                  <>
                    <li className="nav-links">
                      <Tooltip title='Profile'>
                        <NavLink to='/update'>
                          <span className='nav-icon-span'>  <CgProfile style={{ fontSize: 29, marginTop: 7, marginRight: 10 }} /></span>
                        </NavLink>
                      </Tooltip>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }} onClick={() => handleClickOpen(setOpenAlert)}>
                      <Button variant='contained' className='nav-icon-span' sx={{ marginBottom: 1 }} endIcon={<FiLogOut />}>
                        <Typography variant='button'> Đăng xuất</Typography>
                      </Button>
                    </li>
                  </>
                  :
                  <li className="nav-links">
                    <Tooltip title='Login'>
                      <NavLink to='/login'>
                        <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29, marginTop: 7 }} /></span>
                      </NavLink>
                    </Tooltip>
                  </li>
              }
            </ul>
          </div>
        </nav >
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h6'>  Do You Want To Logout?</Typography>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link to="/">
              <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}>Logout</Button></Link>
            <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>

  )
}

export default DesktopNavigation