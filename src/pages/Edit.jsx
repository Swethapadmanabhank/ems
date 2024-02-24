import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser, allUsers, editUser } from '../services/AllApi';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';

function Edit() {
  //create state for hold normal inputs
  const [normalUserInput, setnormalUserInput] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    gender: '',
    location: ''

  })
  //create a state for hold status
  const [status, setStatus] = useState("")

  //create a state for holding uploading files
  const [profile, setprofile] = useState("")
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  useEffect(() => {
    getUser()
  }, [])
  
  const [showspin, setshowSpin] = useState(true)


  //create a state for uploading picture 
  const [preview, setPreview] = useState("")


  //define normal input function
  const getandsetNormalInputs = (e) => {
    const { name, value } = e.target
    setnormalUserInput({ ...normalUserInput, [name]: value })
  }
  console.log(normalUserInput)
  console.log(status)
  const handlefile = (e) => {
    console.log(e.target.files[0])//uploaded content will be zeroth index of the file
    setprofile(e.target.files[0])
  }
  console.log(profile)

  useEffect(() => {
    if (profile) {
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }
    setTimeout(() => { setshowSpin(false) }, 2000);
  }, [profile])

    //edit a single employee details

    const{id}=useParams()
    console.log(id)

    const[existingImg,setexistingImg]=useState("")

    //call to get all users from database
    const getUser=async()=>{
      const {data}=await allUsers("")
      console.log(data)
      let existingUser=data.find(item=>item._id===id)
      console.log(existingUser)
      setnormalUserInput(existingUser)
      setStatus(existingUser.status)
      setexistingImg(existingUser.profile)
    }
//define handlesubmit button
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const{fname,lname,email,mobile,gender,location}=normalUserInput
    if(!fname||!lname||!email||!mobile||!gender||!location||!status||!profile)
    {
      alert('Please fill the form completely')
    }
    else{
     // alert("Form filled completely")
      //create form data
      const data=new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("location",location)
     profile? data.append("status",status):data.append("profile",existingImg) //edit image
      data.append("profile",profile)

      //header
      if(profile){
        var headers={
          "content-type":"multipart/form-data"
        }
      }
      else{
        var headers=""
      }
    
      //api call for edit 
   const response=await editUser(id,data,headers)
   console.log(response)
    }
  }
  return (
    <>
   {showspin ?
        <LoadingSpinner /> :
        <div className='container mt-3'>
          <h1 className='text-center fw-bolder'>Update Employee Details!!</h1>
          <div className='mt-3 shadow border rounded p-2'>
            <div className='text-center'>
              <img src={preview?preview:`${BASE_URL}/uploads/${existingImg}`} alt="No image" style={{ width: '70px', height: '70px', borderRadius: '50%' }} /></div>

            <Form className='mt-3'>
              <Row>
                {/*first name*/}
                <FloatingLabel controlId="floatingInputfname" label="fname" className='mb-3 col-lg-6'>
                  <Form.Control type="text" placeholder="fname" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.fname} name="fname" />
                </FloatingLabel>
                {/*Last name*/}
                <FloatingLabel controlId="floatingInputlname" label="lname" className='mb-3 col-lg-6'>
                  <Form.Control type="text" placeholder="lname" name="lname" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.lname} />
                </FloatingLabel>
                {/*email*/}
                <FloatingLabel controlId="floatingInputemail" label="email" className='mb-3 col-lg-6'>
                  <Form.Control type="email" placeholder="email" name="email" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.email} />
                </FloatingLabel>
                {/*Mobile*/}
                <FloatingLabel controlId="floatingInputmobile" label="mobile" className='mb-3 col-lg-6'>
                  <Form.Control type="text" placeholder="Mobile" name="mobile" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.mobile} />
                </FloatingLabel>
                {/*Gender*/}
                <Form.Group className='mb-3 col-lg-6'>
                  <Form.Label>Select Gender</Form.Label>
                  {/*male*/}
                  <Form.Check type={'radio'} name='gender' value={'Male'} label={"Male"} onChange={e => getandsetNormalInputs(e)} 
                  
                  checked={normalUserInput.gender==="Male"?true:false}
                  />
                  {/*Female*/}
                  <Form.Check type={'radio'} name='gender' value={'Female'} label={"Female"} onChange={e => getandsetNormalInputs(e)} 
                  
                  checked={normalUserInput.gender==="Female"?true:false}
                  />

                </Form.Group>
                {/*status*/}
                <Form.Group className='mb-3 col-lg-6'>
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select onChange={e => setStatus(e.value)} options={options} placeholder={status} />
                </Form.Group>
                {/*upload file*/}
                <Form.Group className='mb-3 col-lg-6'>
                  <Form.Label>Choose a Profile Picture</Form.Label>
                  <Form.Control type="file" name="profile" onChange={e => handlefile(e)} />
                </Form.Group>

                {/*Location*/}
                <FloatingLabel controlId="floatingInputlocation" label="location" className='mb-3 col-lg-6 mt-3'>
                  <Form.Control type="text" placeholder="location" name="location" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.location} />
                </FloatingLabel>
                <Button type='submit' variant='info' onClick={e=>handleSubmit(e)}>Submit</Button>
              </Row>
            </Form>

          </div>

        </div>}
    </>
  )
}

export default Edit