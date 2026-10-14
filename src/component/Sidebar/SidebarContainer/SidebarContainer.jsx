import React from 'react'

export const SidebarContainer = ({ children , name}) => {
  return (
            
    <div className='flex flex-col gap-2 mt-3'>

        <h1 className='text-[#556fa8] font-normal text-xs'>{ name }</h1>

        { children }

    </div>

  )
}
