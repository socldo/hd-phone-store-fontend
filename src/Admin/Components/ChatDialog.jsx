import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const socket = io('http://localhost:5000');

const ChatDialog = ({ open, onClose, productId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.emit('joinRoom', { productId, userId });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('leaveRoom', { productId, userId });
            socket.off();
        };
    }, [productId, userId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log( { productId, userId, message: newMessage });
            socket.emit('sendMessage', { productId,  userId, message: newMessage });
            setNewMessage('');
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Trò chuyện</DialogTitle>
            <DialogContent>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={msg.message} secondary={msg.userId} />
                        </ListItem>
                    ))}
                </List>
                <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    variant="outlined"
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSendMessage} color="primary">
                    Gửi
                </Button>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatDialog;
