import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Sidebar from '../../../Component/Sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../../Component/BaseURL'
import Markdown from 'react-markdown'
import React from 'react';




export default function Spendpattern() {

  const url = window.location.href
  const mainUrl = url.split('/')
  const [selectedData, setSelectedData] = useState([])
  const [currentPage_1, setCurrentPage_1] = useState(1);
  const itemsPerPage = 1;

  const loanAppFormFillData = async () => {
    try {
      const response = await axios.get(API.loanAppformDataFetch)
      console.log('response', response.data?.loanAppformData);

      setSelectedData(response.data?.loanAppformData.filter((data) => data._id === mainUrl[mainUrl.length - 1]))

    } catch (error) {

    }
  }

  useEffect(() => {
    loanAppFormFillData()
  }, [])

  console.log('selectedData', selectedData[0]?.check_history[0]?.text?.spent_pattern_report)


  const handlePageChange = (event, value, pageType) => {
    if (pageType === 'page_1') {
      setCurrentPage_1(value);
    }
    loanAppFormFillData(value);
  };
  const paginatedData = selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.spents.slice(
    (currentPage_1 - 1) * itemsPerPage,
    currentPage_1 * itemsPerPage
  );

  const totalPages_1 = Math.ceil(selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.spents?.length / itemsPerPage);


  const [visibleRows, setVisibleRows] = useState(5);

  const loadMore = () => {
    setVisibleRows((prev) => prev + 5);
  };


  return (
    <>
      <Sidebar title={'Spend Pattern'}>


        <Typography sx={{ fontSize: '14px', color: '#656565', fontWeight: '600', textAlign: 'end', mr: '20px', mt: '20px' }}>Total Score: {selectedData[0]?.check_history[0]?.text?.spent_pattern_report?.overall_score || 0}</Typography>

        {paginatedData && paginatedData.map((data, index) => (
          <Box key={index}>
            <Box>
              <Typography sx={{ fontSize: '18px', color: '#000', fontWeight: '600', mb: '20px', ml: "40px" }}>
                Spends
              </Typography>
              <ul style={{ marginLeft: '10%' }}>
                <li>
                  <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                    <strong>Spent Category:</strong> {data.spent_category}
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                    <strong>Spending Frequency:</strong> {data.spending_frequency}
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                    <strong>Spend Type:</strong> {data.spend_type}
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                    <strong>Reason:</strong> <Markdown>{data.reason}</Markdown>
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px' }}>
                    <strong>score:</strong> {data.score} / 10
                  </Typography>
                </li>
              </ul>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
              <Box sx={{ width: '90%' }}>
                {/* <TableContainer sx={{ borderRadius: '10px' }}>
                  <Table sx={{ border: '1px solid #ddd' }}>
                    <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                      <TableRow>
                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Date</TableCell>
                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565', borderRight: '1px solid #ddd' }}>Info</TableCell>
                        <TableCell sx={{ textAlign: 'start', fontSize: '14px', fontWeight: '600', width: '40%', color: '#656565' }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.transaction_dates_amounts &&
                        data.transaction_dates_amounts.slice(0, visibleRows).map((tableData, index) => (
                          <TableRow key={index} sx={{
                            textAlign: 'center', borderBottom: '1px solid #ddd'
                          }}>
                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{tableData.date}</TableCell>
                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500', borderRight: '1px solid #ddd' }}>{tableData.info}</TableCell>
                            <TableCell sx={{ textAlign: 'start', fontSize: '13px', fontWeight: '500' }}>{tableData.amount}</TableCell>

                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}

                <TableContainer sx={{ borderRadius: '10px' }}>
                  <Table sx={{ border: '1px solid #ddd' }}>
                    <TableHead sx={{ bgcolor: '#f0f0f4' }}>
                      <TableRow>
                        <TableCell
                          sx={{
                            textAlign: 'start',
                            fontSize: '14px',
                            fontWeight: '600',
                            width: '40%',
                            color: '#656565',
                            borderRight: '1px solid #ddd',
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: 'start',
                            fontSize: '14px',
                            fontWeight: '600',
                            width: '40%',
                            color: '#656565',
                            borderRight: '1px solid #ddd',
                          }}
                        >
                          Info
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: 'start',
                            fontSize: '14px',
                            fontWeight: '600',
                            width: '40%',
                            color: '#656565',
                          }}
                        >
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.transaction_dates_amounts &&
                        [...data.transaction_dates_amounts]
                          .sort((a, b) => Number(b.amount) - Number(a.amount))
                          .slice(0, visibleRows)
                          .map((tableData, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                textAlign: 'center',
                                borderBottom: '1px solid #ddd',
                              }}
                            >
                              <TableCell
                                sx={{
                                  textAlign: 'start',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  borderRight: '1px solid #ddd',
                                }}
                              >
                                {tableData.date}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: 'start',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  borderRight: '1px solid #ddd',
                                }}
                              >
                                {tableData.info}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: 'start',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                }}
                              >
                                {tableData.amount}
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {visibleRows < data.transaction_dates_amounts?.length && (

                  <Typography onClick={loadMore} sx={{ fontSize: '14px', color: '#000', fontWeight: '500', mb: '10px', '&:hover': { color: 'blue', fontWeight: '600' }, cursor: 'pointer' }}>Read More...</Typography>

                )}
              </Box>
            </Box>

          </Box>
        ))}

        {paginatedData?.length === 0 ? '' :
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: '10px' }}>
            <Pagination
              count={totalPages_1}
              page={currentPage_1}
              onChange={(event, value) => handlePageChange(event, value, 'page_1')}
              variant="standard"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#858585',
                  '&.Mui-selected': {
                    color: '#000',
                  },
                },
              }}
            />
          </Box>
        }

      </Sidebar >


    </>
  )
}

