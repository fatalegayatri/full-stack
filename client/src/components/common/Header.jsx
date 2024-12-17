import React, { useEffect, useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';


const Header = (props) => {
    const [isUser, setIsUser] = useState(localStorage.getItem('user'));
    const pathName = window.location.pathname;
    console.log(pathName);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            console.log('User is logged in')
        }
        else {
            console.log('User is not logged in')
        }
    }, [])
    return (
        <div className='flex  w-full    top-0    bg-white shadow-lg px-2 py-2'>
            <div className='flex justify-between items-center w-full max-w-6xl mx-auto'>
                <div className='flex gap-4 items-center'>
                    <h1 className='text-2xl font-semibold'>Logo</h1>

                </div>
                {
                    isUser &&

                    <ul className='flex gap-4'>
                        <Link to={'/'}>
                            <li
                                className=
                                {`text-base text-secondary hover:text-primary hover:font-semibold font-medium   transition-all duration-150  pb-1 ${pathName === '/' ? 'border-b-primary  border-b text-primary font-semibold ' : ''}`}>
                                Create Product</li>
                        </Link>

                        <Link to={'/products'}>
                            <li
                                className=
                                {`text-base text-secondary hover:text-primary hover:font-semibold font-medium   transition-all duration-150  pb-1 ${pathName === '/products' ? 'border-b-primary  border-b text-primary font-semibold ' : ''}`}>
                                All Product</li>
                        </Link>

                        <Link to={'/profile'}>
                            <li
                                className=
                                {`text-base text-secondary hover:text-primary hover:font-semibold font-medium   transition-all duration-150  pb-1 ${pathName === '/profile' ? 'border-b-primary  border-b text-primary font-semibold ' : ''}`}>
                                Profile</li>
                        </Link>
                    </ul>
                }
                <div className='flex gap-4 items-center'>

                    <Button>Logout</Button>
                    {
                        !isUser &&
                        <Button>Login</Button>
                    }


                </div>
            </div>
        </div>
    )
}

export default Header