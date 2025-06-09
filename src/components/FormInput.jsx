import React, { useState } from 'react'
import "./FormInput.css"

const FormInput = (props) => {
    const {id,key,label,onChange,errorMessage , ...inputProps} = props

    const [focused,setFocused] = useState(false)
    const handleFocus = () => {
        setFocused(!focused)
    }

    return (
        <div className="formInput">
            <label >{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput
