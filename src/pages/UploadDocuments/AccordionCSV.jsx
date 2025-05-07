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
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
    <table style={{
        width: '100%',
        maxWidth: '1000px',
        borderCollapse: 'separate',
        borderSpacing: '0',
        minWidth: '600px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
    }}>
        <thead>
            <tr>
                {csvData.length > 0 && Object.keys(csvData[0]).map((header, idx) => (
                    <th
                        key={idx}
                        style={{
                            borderBottom: '2px solid #e0e0e0',
                            padding: '12px 16px',
                            backgroundColor: '#f0f4f8',
                            textAlign: 'left',
                            fontWeight: '600',
                            color: '#333'
                        }}
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {csvData.map((row, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb', transition: 'background-color 0.3s' }}>
                    {Object.values(row).map((cell, i) => (
                        <td
                            key={i}
                            style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid #eee',
                                color: '#444',
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
