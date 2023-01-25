import React from 'react'

import Select from 'react-select'
import './CustomSelect.css'

type CustomSelectType = {
  value: string
  defaultValue: string
  options: Array<{ value: string; label: string }>
  isSearchable?: boolean
  callbackHandler: (newValue: { value: string; label: string }) => void
}

const CustomSelect: React.FC<CustomSelectType> = ({
  value,
  defaultValue,
  options,
  isSearchable,
  callbackHandler,
}): any => {
  const getValue = (): any => {
    return value
      ? options.find((option) => option.value === value)
      : { label: defaultValue, value: defaultValue }
  }

  return (
    <Select
      classNamePrefix='custom-select'
      options={options}
      isSearchable={isSearchable}
      value={getValue()}
      onChange={callbackHandler}
    />
  )
}

export default CustomSelect
