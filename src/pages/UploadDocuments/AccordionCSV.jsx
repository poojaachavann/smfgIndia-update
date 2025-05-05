import { Box } from '@mui/material';
import Papa from 'papaparse';
import { useState, useEffect } from 'react';

const AccordionCSV = ({ csvUrl }) => {
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        Papa.parse(csvUrl, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setCsvData(results.data);
            },
        });
    }, [csvUrl]);

    return (
        <Box sx={{ padding: 2, overflowX: 'auto' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px'
            }}>
                <thead>
                    <tr>
                        {csvData.length > 0 && Object.keys(csvData[0]).map((header, idx) => (
                            <th
                                key={idx}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                    background: '#f5f5f5',
                                    textAlign: 'left'
                                }}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {csvData.map((row, idx) => (
                        <tr key={idx}>
                            {Object.values(row).map((cell, i) => (
                                <td
                                    key={i}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

export default AccordionCSV;
