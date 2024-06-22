import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReportIcon from '@mui/icons-material/Report';

const ReportDialog = ({ open, onClose, userId, productId }) => {
    const [reportMessage, setReportMessage] = useState('');
    const [reportType, setReportType] = useState('');
    const [reportImage, setReportImage] = useState(null);

    const handleReportSubmit = async () => {
        const formData = new FormData();
        formData.append('userId', userId._id);
        formData.append('productId', productId);
        formData.append('message', reportMessage);
        formData.append('type', reportType);
        // if (reportImage) {
        //     formData.append('image', reportImage);
        // }

        try {
            console.log({
                userId: userId._id,
                productId: productId,
                message: reportMessage,
                type: reportType
            });
            await axios.post(`${process.env.REACT_APP_REPORT_USER}`, {
                userId: userId._id,
                productId: productId,
                message: reportMessage,
                type: reportType
            });

            toast.success('Report submitted successfully');
            onClose();
        } catch (error) {
            toast.error('Failed to submit report');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setReportImage(e.target.files[0]);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <ReportIcon color="error" sx={{ marginRight: 1 }} />
                    <Typography variant="h6">Report Người dùng</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TextField
                    select
                    margin="dense"
                    label="Loại report"
                    fullWidth
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                >
                    <MenuItem value="scam">Lừa đảo</MenuItem>
                    <MenuItem value="spam">Spam</MenuItem>
                    <MenuItem value="abuse">Xúc phạm</MenuItem>
                    <MenuItem value="inappropriate_language">Ngôn ngữ thô tục</MenuItem>
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nội dung report"
                    type="text"
                    fullWidth
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2 }}
                >
                    Gửi hình ảnh
                    <input
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleReportSubmit} color="primary">
                    Nộp
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportDialog;
