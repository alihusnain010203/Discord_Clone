import React from 'react'

const Auth_Layout = ({children}:{children:React.ReactNode}) => {
  return (
   <div className='flex justify-center items-center h-full '>
    
    {children}
   </div>
  )
}

export default Auth_Layout