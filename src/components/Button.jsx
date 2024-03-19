import React from "react";


function Button (
    children,
    type = "button",
    bgColor = "bg-blue-600",
    className = '',
    textColor = "white",
    ...props
){
    return (
        <button type={type}
        className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`}
        {...props}
        
        > {children} </button>
    )
}

export default Button