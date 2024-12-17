import React from 'react'

const Button = ({ children, onClick, type, disabled }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className='px-4 py-1.5 w-full hover:bg-secondary transition-all duration-75 bg-primary   transform  hover:scale-[0.97] rounded-lg shadow-md text-base   text-[#868b8e] font-semibold'>
            {children}

        </button>
    )
}

export default Button