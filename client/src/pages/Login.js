import React, { useEffect, useState } from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState([]);
    const getUserName = async () => {
        try {
            setLoading(true)
            const result = await fetch('https://jsonplaceholder.typicode.com/uses', {


            })
            console.log(result);

            if (result.ok) {
                const data = await result.json();
                setLoading(false)

                setUserName(data)
            }
            else {
                setLoading(false)
                setError("Error while getting user")
            }




        } catch (error) {
            setError(error)

        }
    }
    useEffect(() => {
        getUserName();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            setError('Please provide email and password');
            return;
        }
        try {
            setLoading(true);
            const result = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: values.email,
                        password: values.password,
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                withCredentials: true,

            }
            )
            console.log(result);
            const data = await result.json()


            if (result.ok === true) {
                setTimeout(() => {
                    localStorage.setItem('token', data.token)
                    navigate("/");
                }, 1000);

            }
            else {
                setError(data.message)
            }

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex justify-center items-center w-full h-screen bg-gray-50'>  <div className='bg-white border border-gray-500  border-b-8 border-b-gray-950  shadow-md p-4 rounded-lg flex flex-col gap-4 justify-center w-96'>
            <h1 className='text-2xl font-semibold'>Login</h1>
            <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>

                <Input type='email' value={values.email} onChange={handleChange} name='email' label="Email" />
                <Input type='password' value={values.password} onChange={handleChange} name='password' label="Password" />
                <div className='w-full  '>
                    <Button type={'submit'} disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <p>
                        Don't have an account? <a href='/signup' className='text-blue-500'>Signup</a>
                    </p>
                    {
                        error ? <p className='text-red-500 text-center test-sm'>{error}</p> : null
                    }
                </div>


            </form>

        </div>

        </div>

    )
}

export default Login