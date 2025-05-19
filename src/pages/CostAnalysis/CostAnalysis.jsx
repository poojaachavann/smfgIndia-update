import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, Box, Typography, Divider, Collapse, IconButton, Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../Component/Sidebar';
import { motion } from 'framer-motion';

const rows = [
  { id: 1, name: 'Server Cost', amount: '$1200' },
  { id: 2, name: 'Database Cost', amount: '$800' },
  { id: 3, name: 'Storage Cost', amount: '$500' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      type: 'spring',
    },
  }),
};

function CostAnalysis() {
  const [openRowId, setOpenRowId] = useState(null);

  const toggleRow = (id) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  return (
    <Sidebar title="Consumption Cost Analysis">
      <Box sx={{ p: 3, backgroundColor: '	#f3e5f5', minHeight: '100vh' }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Cloud Cost Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Track and manage category-wise expenses across your cloud infrastructure.
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#0A1929' }}>
              <TableRow>
                <TableCell sx={{ color: '#e3f2fd', fontWeight: 600, fontSize: '1rem' }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: '#e3f2fd', fontWeight: 600, fontSize: '1rem' }}>
                  Amount
                </TableCell>
                <TableCell align="right" sx={{ color: '#e3f2fd', fontWeight: 600, fontSize: '1rem' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const isHigh = parseInt(row.amount.replace('$', '')) > 1000;
                const isOpen = openRowId === row.id;

                return (
                  <React.Fragment key={row.id}>
                    <motion.tr
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      style={{
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.amount}
                          color={isHigh ? 'error' : 'success'}
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            px: 2,
                            py: 1,
                            fontSize: '0.85rem',
                            boxShadow: 2,
                            backgroundColor: isHigh ? '#ffebee' : '#e8f5e9',
                            color: isHigh ? '#c62828' : '#2e7d32',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => toggleRow(row.id)}>
                          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                    </motion.tr>

                    <TableRow>
                      <TableCell colSpan={3} sx={{ p: 0, border: 0 }}>
                        <Collapse in={isOpen} timeout={300} unmountOnExit>
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Box
                              sx={{
                                backgroundColor: '#ffffff',
                                p: 2,
                                borderTop: '1px solid #e0e0e0',
                                transition: 'all 0.3s ease-in-out',
                              }}
                            >
                              <Typography variant="subtitle2" gutterBottom>
                                More Details for: <strong>{row.name}</strong>
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                                You can perform actions on this cost category below:
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                <IconButton
                                  sx={{ backgroundColor: '#e3f2fd' }}
                                  onClick={() => alert(`Edit ${row.name}`)}
                                >
                                  <EditIcon color="primary" />
                                </IconButton>
                                <IconButton
                                  sx={{ backgroundColor: '#ffebee' }}
                                  onClick={() => alert(`Delete ${row.name}`)}
                                >
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </Stack>
                            </Box>
                          </motion.div>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Sidebar>
  );
}

export default CostAnalysis;
