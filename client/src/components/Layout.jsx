import React from 'react'
import Header from './common/Header'

export const Layout = ({ children }) => {
    return (
        <div className='bg-[#eeede7] h-screen '>
            <Header />
            {children}
        </div>
    )
}
