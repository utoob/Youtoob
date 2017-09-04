import React from 'react'

const FormElement = (props) => {
  const { 
    Tag="input", 
    type="text", 
    name, 
    label,
    required,
    defaultValue, 
    onChange,
    error
  } = props

  return (
    <div className="o-form-element">
      <label className={`c-label ${error ? 'u-color-error' : ''}`} htmlFor={name}>
        {label} {error && error.message && <small className="">{error.message}</small>}
      </label>
      <Tag
        type={type}
        name={name}
        required={required}
        className="c-field"
        onChange={onChange} 
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default FormElement