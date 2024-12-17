import React, { useState } from 'react'
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        userName: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const handleChange = (e) => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;

        try {
            if (!values.email || !values.password || !values.userName) {
                setMessage('Please provide email and password');
                return;
            }
            setLoading(true);
            result = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: values.email,
                        password: values.password,
                        username: values.userName,
                        createdAt: new Date().toISOString()
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                withCredentials: true,
            }
            )
            const data = await result.json();
            console.log(data);

            if (result.status === 201) {
                setMessage('User signed in successfully')
                setTimeout(() => {
                    navigate('/login')

                }, 500)

            }
            else {

                setMessage(data.message);

            }
        } catch (error) {

            console.error(error);
            // setMessage(data);



        }
        finally {
            setLoading(false);
        }



    }
    return (
        <div className='flex justify-center items-center w-full h-screen'>  <div className='bg-white border border-gray-500  p-4 rounded-lg flex flex-col gap-4 justify-center w-96'>
            <h1 className='text-2xl font-semibold'>Signup</h1>
            <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>

                <Input type='text' value={values.userName} onChange={(e) => handleChange(e)} name='userName' label="Username" />
                <Input type='email' value={values.email} onChange={(e) => handleChange(e)} name='email' label="Email" />
                <Input type='password' value={values.password} onChange={(e) => handleChange(e)} name='password' label="Password" />

                <Button onClick={(e) => { handleSubmit(e) }}>
                    {
                        loading ? 'Loading...' : 'Signup'
                    }
                </Button>
                {
                    message && <p className=' text-center '>{message}</p>
                }
            </form>

        </div>

        </div>

    )
}

export default Signup