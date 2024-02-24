import React, { createContext, useState } from 'react'

export const registerContext=createContext()


function Contextshare({children}) {

    const [registerdata,setregisterData]=useState("")
   

  return (
    <>
    
    <registerContext.Provider value={{registerdata,setregisterData}}>
  
        {children}
  
    </registerContext.Provider>
    
    
    </>
  )
}

export default Contextshare