import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { allUsers, deleteUser } from '../services/AllApi'
import { registerContext} from './Contextshare'
import { Alert } from 'react-bootstrap'



function Home() {
  
  const{registerdata,setRegisterData}=useContext(registerContext)


 

  const[showspin,setshowSpin]=useState(true)
  const[allUserData,setallUserData]=useState([])
  //SEARCH
  const[search,setSearch]=useState("")

  const{id}=useParams()

  console.log(id)
  useEffect(()=>{
    getAllEmployees()
    setTimeout(()=>{setshowSpin(false)},2000);
  },[search])

    //to get all data call allUsers function
    const getAllEmployees=async()=>{
     const response= await allUsers(search)
     console.log(response)
     setallUserData(response.data)
     console.log(allUserData)
    }
   
    //console.log(search);

    //to delete a single data
    const removeUser=async(id)=>{
      const response=await deleteUser(id)
      if(response.status===200)
      {
        getAllEmployees()
      }
      else{
        alert("Operation failed !!! Please try after sometime")
      }
    }
   
  return (
    <>
    {
       registerdata&&<Alert variant='success'onClose={()=>setRegisterData("")} dismissible>
        {registerdata.fname.toUpperCase()} registered successfully..........................
       </Alert>
    }


    {
      showspin?
      <LoadingSpinner/>:


     <div className='container'>

      <div className='search-all d-flex align-items-center'>

        <div className='search d-flex align-items-center mt-5'>

          <span className='fw-bolder'>Search:</span>
          <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder='Search by Employee Name' className='form-control ms-1' style={{width:'400px'}} />


        </div>
        <Link to={'/add'} className='btn btn-warning ms-auto mt-5'><i class="fa-solid fa-user-plus"></i>ADD</Link>

      </div>
    <div className='table mt-5'>
    <h1 className='fw-bolder'>List Of All Employees</h1>
    <Hometable displayData={allUserData} removeuser={removeUser}/>
    </div>
     </div>
}
    </>
  )
}

export default Home