import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { IoBagCheckOutline } from 'react-icons/io5'

const OrderSummary = ({ proceedToCheckout, total, shippingCoast }) => {
    return (
        <Card
            sx={{ width: { xs: 450, sm: 550, md: 550, lg: 700 } }}
            // className={classes.root}

            elevation={15}
        >
            <CardContent >
                <Typography variant="div" component="h1">
                    {" "}
                    Tóm tắt đơn hàng
                </Typography>
                <Typography variant="subtitle2">
                    <hr />
                </Typography>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }} >
                        <Typography variant="body1" component="div" color='primary'>
                            Tạm tính
                        </Typography>
                        <Typography variant="h6" component="div" color='primary'>
                            {total - shippingCoast} đ
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }} >
                        <Typography variant="body1" component="div" color='primary'>
                            Tiền ship
                        </Typography>
                        <Typography variant="h6" component="div" color='primary'>
                            {shippingCoast} đ
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Typography variant="body1" component="div" color='primary'>
                            Tổng cộng
                        </Typography>
                        <Typography variant="h6" component="div" color='primary'>
                            {total} đ
                        </Typography>
                    </Box>
                </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Button variant='contained' size='large' endIcon={<IoBagCheckOutline />} color="primary" onClick={proceedToCheckout}>
                    Tiếp tục
                </Button>
            </CardActions>
        </Card >
    )
}

export default OrderSummary