import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

import LoginImage from "../../asset/images/LoginSecure.gif"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Alert from '@mui/material/Alert';

import { APIServices } from '../../contants/apiConfig';

import { pageRoutes } from "../../routes/pageRoutes"
import { useDispatch } from 'react-redux';
import { storeUserDetails } from '../../redux/userSlice';

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const checkToken = localStorage.getItem("access_token")

    if (checkToken) {
      navigate("/app/dashboard")
    }

  }, []);

  const handleLogin = async () => {
    setErrorMessage(null)
    const response = await APIServices.post({
      url: '/login', payload: {
        "email": email,
        "password": password
      }
    });

    if (response.status === 200) {

      if (!response?.data?.user?.admin_status) {
        setErrorMessage("User is not Admin");
        return
      }

      dispatch(
        storeUserDetails({
          id: response?.data?.user?.id,
          name: response?.data?.user?.name,
          email: response?.data?.user?.email,
          admin_status: response?.data?.user?.admin_status,
          portal_role: response?.data?.user?.portal_role,
          branch_id: response?.data?.user?.admin_branch?.id,
          branch_name: response?.data?.user?.admin_branch?.name,
          signature_path: response?.data?.user?.signature_path
        })
      );

      localStorage.setItem("access_token", response?.data?.token);

      navigate("/app/dashboard")

    } else if (response[0]?.status === 403) {
      setErrorMessage(response[0]?.response?.data?.message)
    }

    else {
      setErrorMessage("Invalid Credentials")
    }

  }

  return (
    <div className='h-screen w-full bg-white gap-2 flex flex-row items-center justify-center relative'>

      <div className='max-w-[500px] w-full max-h-[500px] h-full flex flex-col items-center justify-center'>
        <img className='h-full w-full' src={LoginImage} alt='N/A' />
      </div>

      <div className='max-w-[500px] w-full max-h-[500px] h-full p-4 border-[#839f55] flex flex-col gap-2 border-l'>

        <div className='flex flex-col items-center gap-2'>

          <AccountCircleIcon sx={{ color: '#556fa8' }} fontSize="large" />

          <div className='self-center'>
            <img class="default_logo lazyloaded" src="https://www.sixelevenbpo.com/wp-content/uploads/2020/05/six-eleven-center-logo.png" alt="six-eleven-center-logo" data-ll-status="loaded" />
          </div>

          <p className='text-md text-[#556fa8] font-light'>Admin Portal</p>
        </div>

        <div className='max-w-[400px] w-full flex flex-col self-center gap-3'>

          <FormControl sx={{ width: '100%' }}>
            <span className='mb-3 font-medium text-[#556fa8]'>Email</span>
            <TextField
              id="outlined-required"
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="type here..."
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>

            <div className='w-full flex flex-row items-center justify-between gap-2 my-3'>
              <span className='font-medium text-[#556fa8]'>Password</span>
              <span className='text-[#839f55] underline font-light cursor-pointer text-sm hover:text-[#556fa8]'>Forgot Password?</span>
            </div>

            <OutlinedInput
              id="outlined-adornment-password"
              placeholder="type here..."
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ?

                      <VisibilityOff sx={{
                        color: '#839f55',
                        '&.Mui-checked': {
                          color: '#839f55',
                        },
                      }}
                      /> :
                      <Visibility sx={{
                        color: '#839f55',
                        '&.Mui-checked': {
                          color: '#839f55',
                        },
                      }}
                      />
                    }
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox defaultChecked color="success"
                  sx={{
                    color: '#839f55',
                    '&.Mui-checked': {
                      color: '#839f55',
                    },

                  }}
                />
              }
              sx={{ color: '#556fa8' }}
              label="Remember me" />
          </FormGroup>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <div onClick={handleLogin} className='w-full font-lexend bg-[#839f55] flex flex-col items-center justify-center rounded py-2 cursor-pointer text-white font-medium hover:bg-[#556fa8]'>
            <span>Sign In</span>
          </div>

          <h1 className='text-xs text-[#556fa8] font-semibold self-center'>Hello! Let's get started</h1>

        </div>

      </div>


    </div>
  )
}

export default LoginPage
