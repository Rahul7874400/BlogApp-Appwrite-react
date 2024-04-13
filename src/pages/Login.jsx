import React from "react";
import { Login as LoginComponent } from "../components";
import { login } from "../store/authSlice";



function Login(){

    return (
        <div className="py-8">
            <LoginComponent/>
        </div>
    )
}

export default login