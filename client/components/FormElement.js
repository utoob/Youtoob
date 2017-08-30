import React from 'react'

const FormElement = ({ type="text", name, label, defaultValue, onChange }) => {
  return (
    <div className="o-form-element">
      <label className="c-label" htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className="c-field" 
        onChange={onChange} 
        defaultValue={defaultValue} 
      />
    </div>
  )
}

export default FormElement