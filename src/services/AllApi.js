import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

//Add user 
export const addUser=async(body,header)=>{
    return await commonApi("POST",`${BASE_URL}/add`,body,header)
}
//get user
export const allUsers=async(search)=>{
    return await commonApi("GET",`${BASE_URL}/get-all-users?search=${search}`,"")//?search=${search} is query parameter
}
//delete employee
export const deleteUser=async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}
//update employee
export const editUser=async(id,body,header)=>{
    return await commonApi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}