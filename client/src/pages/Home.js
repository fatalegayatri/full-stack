import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import { Layout } from '../components/Layout';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(
        {
            name: '',
            desc: '',
            price: '',

        }
    );
    const [cookies, removeCookie] = useCookies([]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
        removeCookie("token");
    };

    useEffect(() => {

        const verifyCookie = async () => {

            console.log("Current token:", cookies);
            const token = localStorage.getItem('token');
            if (!token && !cookies.token) {
                console.log("No token found, redirecting to login");
                navigate("/login");
                return;
            }
        }

        //     try {
        //         const response = await fetch("http://localhost:5000/verify", {
        //             method: "POST",
        //             credentials: 'include',
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             withcredentials: true,
        //             body: JSON.stringify({ token: cookies.token }),
        //         });

        //         if (!response.ok) {
        //             throw new Error('Server responded with an error');
        //         }

        //         const data = await response.json();
        //         console.log("Server response:", data);

        //         if (data.user) {
        //             setUsername(data.user);
        //         } else {
        //             console.log("Invalid token, redirecting to login");
        //             removeCookie("token");
        //             navigate("/login");
        //         }
        //     } catch (error) {
        //         console.error("Error verifying token:", error);
        //         removeCookie("token");
        //         navigate("/login");
        //     }
        // };


        verifyCookie();

    }, [cookies.token, navigate, removeCookie, cookies]);
    const handleAdd = async () => {
        const response = await fetch('', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result);

    }

    return (
        <Layout>
            <div className=' w-full   bg-[#eeede7] '>
                <div className='bg-white mx-auto  max-w-lg rounded-lg shadow-md p-4 mt-20 '>
                    <div className='flex items-center justify-center flex-col gap-2  '>
                        <Input
                            type={
                                'text'
                            }
                            label={
                                'Name'
                            }
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    name: e.target.value
                                })
                            }
                            }

                        />

                        <Input
                            name={'desc'}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    desc: e.target.value
                                })
                            }}
                            inputType='textarea'
                            type={
                                'text'
                            }
                            label={
                                'Description'
                            }
                        />
                        <Input

                            name={'price'}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    price: e.target.value
                                })
                            }
                            }
                            type={
                                'text'
                            }
                            label={
                                'Price'
                            }
                        />
                        <div className='mt-4 w-full'>

                            <Button onClick={handleAdd}>
                                Add
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Home;