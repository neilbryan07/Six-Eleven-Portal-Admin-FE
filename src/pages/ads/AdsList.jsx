import React, { lazy, Suspense, useState, useEffect } from 'react';


import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { APIServices } from '../../contants/apiConfig';
import { useSelector } from 'react-redux';

import { handleTimeFormat } from '../../contants/contans';

const EditAds = lazy(() => import('./modal/EditAds'));
const DeleteAds = lazy(() => import('./modal/DeleteAds'));
const ViewAds = lazy(() => import('./modal/ViewAds'));
const AddAds = lazy(() => import('./modal/AddAds'));

const AdsList = () => {

    const [openAds, setOpenAds] = useState(false);
    const [openViewAds, setViewAds] = useState(false);
    const [openEditAds, setEditAds] = useState(false);
    const [openDeleteAds, setDeleteAds] = useState(false);

    const [adsImagelist, setAdsImageList] = useState([]);
    const [selectedData, setSelectedData] = useState(null)

    const handleFetchAds = async () => {

        const response = await APIServices.get({
            url: '/ads/show'
        });

        if (response.status === 200) {
            setAdsImageList(response?.data);
        }

    }

    const handleCloseAds = () => {
        setOpenAds(false);
        setViewAds(false);
        setDeleteAds(false)
        setEditAds(false)
    }

    const handleOpen = (typeNumber, data = null,) => {

        let type = parseInt(typeNumber);

        if (type === 1) setOpenAds(true)
        else if (type === 2) setViewAds(true)
        else if (type === 3) setEditAds(true)
        else if (type === 4) setDeleteAds(true)

        setSelectedData(data)

    }



    useEffect(() => {
        handleFetchAds();
    }, []);

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {openAds && <AddAds openModal={openAds} handleClose={handleCloseAds} refreshData={handleFetchAds} />}
            </Suspense>

            <Suspense>
                {openViewAds && <ViewAds openModal={openViewAds} handleClose={handleCloseAds} rowData={selectedData} />}
            </Suspense>

            <Suspense>
                {openEditAds && <EditAds openModal={openEditAds} handleClose={handleCloseAds} refreshData={handleFetchAds} rowData={selectedData} />}
            </Suspense>

            <Suspense>
                {openDeleteAds && <DeleteAds openModal={openDeleteAds} handleClose={handleCloseAds} refreshData={handleFetchAds} rowData={selectedData} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <h1 className='font-normal text-lg text-[#839f55]'>Advertisements Content</h1>

                <div className='flex flex-row gap-2 items-center'>
                    <Tooltip title="Add Ads Content">
                        <div onClick={e => handleOpen(1)} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
                        </div>
                    </Tooltip>
                </div>

            </div>

            <div className='w-full flex flex-col max-h-[800px] overscroll-y-auto overflow-y-auto bg-white p-4 rounded'>

                <div className="w-full grid grid-cols-5 gap-4 items-center">
                    {
                        adsImagelist?.map((row, index) => (
                            <Card sx={{ maxWidth: 345 }} key={index}>

                                <CardMedia
                                    component="img"
                                    image={`${process.env.REACT_APP_API_STORAGE}${row?.file}`}
                                    alt="green iguana"
                                    sx={{
                                        width: "100%",
                                        height: 200,
                                        objectFit: "cover",
                                        borderRadius: "8px 8px 0 0",
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {row?.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {row?.user?.first_name}  {row?.user?.last_name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {handleTimeFormat(row?.created_at)}
                                    </Typography>

                                </CardContent>
                                <CardActions>

                                    <div className='w-full flex flex-row items-center justify-end gap-2 pb-2'>
                                        <div className='cursor-pointer' onClick={e => handleOpen(2, row)}>
                                            <Tooltip title="View Content">
                                                <VisibilityIcon color='success' />
                                            </Tooltip>
                                        </div>

                                        <div className='cursor-pointer' onClick={e => handleOpen(3, row)}>
                                            <Tooltip title="Update Content">
                                                <EditIcon color='info' />
                                            </Tooltip>
                                        </div>

                                        <div className='cursor-pointer' onClick={e => handleOpen(4, row)}>
                                            <Tooltip title="Delete Content">
                                                <DeleteIcon color='error' />
                                            </Tooltip>
                                        </div>

                                    </div>

                                </CardActions>

                            </Card>
                        ))}
                </div>

            </div>


        </div>
    )
}

export default AdsList