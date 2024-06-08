// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography
// } from '@mui/material';

// const ProductTable = ({ data }) => {
//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>ID</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Description</TableCell>
//                         <TableCell>Price</TableCell>
//                         <TableCell>Created At</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.length > 0 ? (
//                         data.map((product) => (
//                             <TableRow key={product.id}>
//                                 <TableCell>{product.id}</TableCell>
//                                 <TableCell>{product.name}</TableCell>
//                                 <TableCell>{product.description}</TableCell>
//                                 <TableCell>{product.price}</TableCell>
//                                 <TableCell>{product.createdAt}</TableCell>
//                             </TableRow>
//                         ))
//                     ) : (
//                         <TableRow>
//                             <TableCell colSpan={5}>
//                                 <Typography variant="h6" align="center">
//                                     No products available.
//                                 </Typography>
//                             </TableCell>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// ProductTable.propTypes = {
//     data: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             name: PropTypes.string.isRequired,
//             description: PropTypes.string,
//             price: PropTypes.number.isRequired,
//             createdAt: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };

// export default ProductTable;
