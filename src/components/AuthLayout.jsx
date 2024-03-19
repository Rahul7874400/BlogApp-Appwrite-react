import React , {useState , useEffect} from "react";
import {useSelect} from "react-redux"
import {useNavigate} from "react-router-dom"


export default function Protected({
    childred,
    authentication = true
}){
    const [loader , setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelect( state => state.auth.status )

    useEffect( ()=>{
        if(authentication &&  authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }

        setLoader(false)
    },[authStatus , authentication , navigate] )

    return loader ? <h1>Loading....</h1> : <> {childred} </>
}