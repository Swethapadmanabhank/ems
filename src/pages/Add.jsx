import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../services/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';



function Add() {

         const{registerdata,setregisterData}= useContext(registerContext)

         const navigate=useNavigate()
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
  const [showspin, setshowSpin] = useState(true)


  //create a state for uploading picture 
  const [preview, setPreview] = useState("")


  //define normal input function
  const getandsetNormalInputs = (e) => {
    const { name, value } = e.target
    setnormalUserInput({ ...normalUserInput, [name]: value })
  }
  //console.log(normalUserInput)
  //console.log(status)
  const handlefile = (e) => {
    console.log(e.target.files[0])//uploaded content will be zeroth index of the file
    setprofile(e.target.files[0])
  }
  //console.log(profile)

  useEffect(() => {
    if (profile) {
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }
    setTimeout(() => { setshowSpin(false) }, 2000);
  }, [profile])



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
      data.append("status",status)
      data.append("profile",profile)
      //header
      const headers={
        "content-type":"multipart/form-data"
      }
      //api call
    const response= await  addUser(data,headers)
    console.log(response);
    if (response.status==200){
      setnormalUserInput({ ...normalUserInput,
        
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        gender: '',
        location: ''
      
      })
      setStatus("")
      setprofile("")
      setregisterData(response.data)
      navigate('/')
      
    }
    }
  }
  return (
    <>
      {showspin ?
        <LoadingSpinner /> :
        <div className='container mt-3'>
          <h1 className='text-center fw-bolder'>Add New Employee Details!!</h1>
          <div className='mt-3 shadow border rounded p-2'>
            <div className='text-center'>
              <img src={preview?preview:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="No image" style={{ width: '70px', height: '70px', borderRadius: '50%' }} /></div>

            <Form className='mt-3'>
              <Row>
                {/*first name*/}
                <FloatingLabel controlId="floatingInputfname" label="fname" className='mb-3 col-lg-6'>
                  <Form.Control type="text" placeholder="fname" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} name="fname" />
                </FloatingLabel>
                {/*Last name*/}
                <FloatingLabel controlId="floatingInputlname" label="lname" className='mb-3 col-lg-6'>
                  <Form.Control type="text" placeholder="lname" name="lname" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} />
                </FloatingLabel>
                {/*email*/}
                <FloatingLabel controlId="floatingInputemail" label="email" className='mb-3 col-lg-6'>
                  <Form.Control type="email" placeholder="email" name="email" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} />
                </FloatingLabel>
                {/*Mobile*/}
                <FloatingLabel controlId="floatingInputmobile" label="mobile" className='mb-3 col-lg-6'>
                  <Form.Control type="text" placeholder="Mobile" name="mobile" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} />
                </FloatingLabel>
                {/*Gender*/}
                <Form.Group className='mb-3 col-lg-6'>
                  <Form.Label>Select Gender</Form.Label>
                  {/*male*/}
                  <Form.Check type={'radio'} name='gender' value={'Male'} label={"Male"} onChange={e => getandsetNormalInputs(e)} />
                  {/*Female*/}
                  <Form.Check type={'radio'} name='gender' value={'Female'} label={"Female"} onChange={e => getandsetNormalInputs(e)} />

                </Form.Group>
                {/*status*/}
                <Form.Group className='mb-3 col-lg-6'>
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select onChange={e => setStatus(e.value)} options={options} />
                </Form.Group>
                {/*upload file*/}
                <Form.Group className='mb-3 col-lg-6'>
                  <Form.Label>Choose a Profile Picture</Form.Label>
                  <Form.Control type="file" name="profile" onChange={e => handlefile(e)} />
                </Form.Group>

                {/*Location*/}
                <FloatingLabel controlId="floatingInputlocation" label="location" className='mb-3 col-lg-6 mt-3'>
                  <Form.Control type="text" placeholder="location" name="location" onChange={e => getandsetNormalInputs(e)} value={normalUserInput.value} />
                </FloatingLabel>
                <Button type='submit' variant='info' onClick={e=>handleSubmit(e)}>Submit</Button>
              </Row>
            </Form>

          </div>

        </div>}
    </>
  )
}

export default Add