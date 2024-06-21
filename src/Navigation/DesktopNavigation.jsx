import './Desktop.css'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { getCart, getWishList, handleLogOut, handleClickOpen, handleClose, Transition } from '../Constants/Constant'
import axios from 'axios'
import logoImage from '../Assets/Images/logo.png';
const DesktopNavigation = () => {
  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction);
  const [openAlert, setOpenAlert] = useState(false);
  const [isPartner, setIsPartner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  let authToken = localStorage.getItem('Authorization');
  let setProceed = authToken !== null;

  useEffect(() => {
    getCart(setProceed, setCart, authToken);
    getWishList(setProceed, setWishlistData, authToken);
    getUser();
  }, [authToken]);

  const getUser = async () => {

    const { data } = await axios.get(`${process.env.REACT_APP_ADMIN_GET_ALL_USERS}`, {
      headers: { 'Authorization': authToken },
    });
    setIsPartner(data.isPartner);
    setIsAdmin(data.isAdmin);

  };

  return (
    <>
      <div className="header shadow-xl">
        <nav className="nav">
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="Shop It Logo" className="logo-image" />
            </Link>
          </div>
          <div className="nav-items">
            <ul className="nav-items">
              {!isAdmin && <li className="nav-links">
                <NavLink to="/">Trang chủ</NavLink>
              </li>}
              {isPartner && !isAdmin && (
                <li className="nav-links">
                  <Tooltip title="Post">
                    <NavLink to="/post">Cửa hàng</NavLink>
                  </Tooltip>
                </li>
              )}
              {!isAdmin && (
                <>
                  <li className="nav-links">
                    <Tooltip title="Order">
                      <NavLink to="/order">Đặt hàng</NavLink>
                    </Tooltip>
                  </li>
                  <li className="nav-links">
                    <Tooltip title="Cart">
                      <NavLink to="/cart">
                        Giỏ hàng
                        <Badge badgeContent={setProceed ? cart.length : 0}>
                          <AiOutlineShoppingCart className="nav-icon" />
                        </Badge>
                      </NavLink>
                    </Tooltip>
                  </li>
                  <li className="nav-links">
                    <Tooltip title="Wishlist">
                      <NavLink to="/wishlist">
                        Yêu thích
                        <Badge badgeContent={setProceed ? wishlistData.length : 0}>
                          <AiOutlineHeart className="nav-icon" />
                        </Badge>
                      </NavLink>
                    </Tooltip>
                  </li>
                </>
              )}
              {setProceed ? (
                <>
                  <li className="nav-links">
                    <Tooltip title="Profile">
                      <NavLink to="/update">
                        <CgProfile className="profile-icon" />
                      </NavLink>
                    </Tooltip>
                  </li>
                  <li className="nav-links" onClick={() => handleClickOpen(setOpenAlert)}>
                    <Button variant="contained" className="logout-button" endIcon={<FiLogOut />}>
                      <Typography variant="button">Đăng xuất</Typography>
                    </Button>
                  </li>
                </>
              ) : (
                <li className="nav-links">
                  <Tooltip title="Login">
                    <NavLink to="/login">
                      <CgProfile className="profile-icon" />
                    </NavLink>
                  </Tooltip>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className="dialog-content">
            <Typography variant="h6">Bạn muốn đăng xuất?</Typography>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Link to="/">
              <Button
                variant="contained"
                endIcon={<FiLogOut />}
                color="primary"
                onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}
              >
                Đăng xuất
              </Button>
            </Link>
            <Button variant="contained" color="error" endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default DesktopNavigation;