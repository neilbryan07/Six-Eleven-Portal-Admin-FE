
const CloseButton = ({ title, handleClick = null }) => {
  return (
    <div onClick={handleClick} className='px-2 py-[4px] flex flex-row gap-2 items-center justify-center border border-gray-400 rounded cursor-pointer'>
      <h1 className='text-gray-600 text-sm font-semibold'>{title}</h1>
    </div>
  )
}

export default CloseButton
