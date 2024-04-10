import React ,{ useDispatch } from "react";
import  authService from "../../appwrite/auth"
import { logOut } from "../../store/authSlice"



function LogOutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout()
        .then( () =>{
            dispatch(logOut())
        } )
        .catch( (error)=>{
            console.log("Something went worng while logouting " ,error)
        } )
    }

    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
      )
}

export default  LogOutBtn