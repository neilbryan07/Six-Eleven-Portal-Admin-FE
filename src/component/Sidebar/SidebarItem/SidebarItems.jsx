import React from 'react'

import { useNavigate , useLocation } from "react-router-dom";

export const SidebarItems = ({ name , icon , anchor = null }) => {

  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div onClick={() => navigate(anchor)} 
      className={`
          flex flex-row ml-2 items-center gap-3  cursor-pointer hover:text-[#839f55] hover:bg-blue-100 rounded
          ${ pathname === `/app/${anchor}` ? 
            'bg-blue-100 text-[#839f55]' : 
            'text-gray-500'
          }
        `}>
        { icon }

        { pathname === `/app/${anchor}` ? 
          <h1 className='font-bold text-sm'>{name}</h1> : 
          <h1 className='font-normal text-sm'>{name}</h1> 
        }
    
    </div>
  )
}
