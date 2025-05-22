import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Avatar,
  Box
} from '@mui/material';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const MangePRoducts = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/products');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography color="error">Failed to load data.</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
      px={2}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 1200, width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Voltage</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    variant="square"
                    src={item.imageURL}
                    alt={item.model}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.voltage}</TableCell>
                <TableCell>{item.price}৳</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <Link to={`/dashboard/products-edit/${item._id}`}
                className='flex items-center justify-center'
                >
                  <TableCell>
                  <Edit/>
                </TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MangePRoducts;
