import React from 'react'
import {TInputFieldProps} from '@/types/input'

const InputField: React.FC<TInputFieldProps> = ({
  id,
  label,
  type,
  value,
  placeholder,
  onChange,
  required = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-600 ring-2 ring-slate-300"
        />
      </div>
    </div>
  )
}

export default InputField
