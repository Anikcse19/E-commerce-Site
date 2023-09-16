import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import Nav from './Nav'

 const layout = ({children}) => {
 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data:session}=useSession()

    console.log(session)
    if(!session){
      return (
        <div className="bg-blue-800 w-screen h-screen flex items-center">
    
         <div className="text-center w-full">
            <button onClick={()=>{
              signIn('google')
            }} className=" bg-white text-base border-l-purple-900 p-4 rounded hover:opacity-80">Log in with Google</button>
          </div>
           
       </div>
         
          )
    }
    else if(session){
      return(
        <div className="bg-blue-800 min-h-screen flex">
      
        <Nav/>
          <div className="bg-white flex-grow my-2 rounded-md p-2">
           <div>
              <h2> {children}</h2>
           </div>
            </div>
       </div>
      )
    }
  
    
  
}

export default layout