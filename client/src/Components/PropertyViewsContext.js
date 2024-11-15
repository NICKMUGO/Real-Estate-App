import React,  {createContext,useState } from 'react'

export const viewsContext = createContext();
function PropertyViewsContext({children}) {
  const[countViews,setCountViews]=useState({});
  return (
    <viewsContext.Provider value={[countViews,setCountViews]}>
        {children}
    </viewsContext.Provider>
  )
}

export default PropertyViewsContext
