import React, { useEffect } from 'react'

import Avatar from '@mui/material/Avatar';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

import { useNavigate, useLocation } from "react-router-dom";

import { pageRoutes } from "../../routes/pageRoutes"
import { useSelector } from 'react-redux';

const AppBar = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userData)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const checkToken = localStorage.getItem("access_token")

        if (!user?.admin_status) {
            localStorage.removeItem("access_token");
            navigate(pageRoutes.LOGIN)
        }

        if (!checkToken) {
            navigate(pageRoutes.LOGIN)
        }
    }, []);

    const handleSignOut = () => {

        localStorage.removeItem("access_token");
        navigate(pageRoutes.LOGIN)

    }

    return (
        <div className='w-full py-2 px-4 bg-white lg flex flex-row items-center justify-between border-b border-gray-300'>

            <div className='flex flex-col'>
                <h1 className='text-[#556fa8] font-normal'>TAS Portal ({user?.branch_name} Branch)</h1>
            </div>

            <div className='flex flex-row gap-2 items-center hover:bg-gray-100 rounded cursor-pointer px-2'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar sx={{ width: 30, height: 30, bgcolor: "#839f55", cursor: 'pointer' }}>
                    <InsertEmoticonOutlinedIcon />
                </Avatar>
                <h1 className='text-[#556fa8] font-normal text-sm'>{user?.name}</h1>
            </div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem />
                <MenuItem onClick={handleClose}></MenuItem>

                <MenuItem onClick={handleClose}>

                    {/* <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon> */}

                    <ListItemText>
                        <span onClick={handleSignOut}>Sign-Out</span>
                    </ListItemText>

                </MenuItem>
            </Menu>

        </div>
    )
}

export default AppBar
