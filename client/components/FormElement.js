import React from 'react'

const FormElement = (props) => {
  const { 
    Tag="input", 
    type="text", 
    name, 
    label, 
    defaultValue, 
    onChange 
  } = props

  return (
    <div className="o-form-element">
      <label className="c-label" htmlFor={name}>{label}</label>
      <Tag
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