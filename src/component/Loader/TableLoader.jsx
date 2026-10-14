import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const TableLoader = () => {
    return (
        <TableRow sx={{ width: "100%" }}>
            <TableCell align="center" colSpan={9}>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        p: 10,
                    }}
                >
                    <CircularProgress color="success" />
                    <h1 className='text-gray-500 text-xs font-semibold'>Loading Data....</h1>
                </Box>
            </TableCell>
        </TableRow>
    )
}
