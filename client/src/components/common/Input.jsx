import React from 'react'

const Input = ({ type, value, onChange, label, name, inputType = 'input' }) => {

    return (
        <div className='flex w-full  flex-col justify-start'>
            <label htmlFor='email' className='text-sm font-semibold'>{label}</label>
            {
                inputType === 'textarea' ? <textarea name={name} type={type}
                    className='bg-gray-100 p-2 w-full rounded-lg border border-gray-300'

                    value={value} onChange={(e) => { onChange(e) }} /> :
                    <input name={name} type={type}
                        className='bg-gray-100 p-2 w-full rounded-lg border border-gray-300'

                        value={value} onChange={(e) => { onChange(e) }} />
            }

        </div>
    )
}

export default Input