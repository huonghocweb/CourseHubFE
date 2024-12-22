import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../../api/Service/AuthService';
import CustomAlert from '../../../../components/Functional/CustomAlert';
const Login = () => {


    const [alert,setAlert] = useState(null);
    const navigate = useNavigate();
    const [authRequestState,setAuthRequestState] = useState({
        userName : '',
        password : '', 
        remember : false
    })

    const handleChangeAuthRequest = (name, value) => {
        setAuthRequestState(prev => ({
            ...prev, 
            [name] : value
        }))
        console.log(name , value)
    }

    const submitLogin = async () => {
        try {
            const response= await login(authRequestState.userName, authRequestState.password);
            console.log(response.data);
            if(response.data.data){
                setAlert({type : 'success', message : 'Login Success !'});
                if(authRequestState.remember){
                    console.log('LocalStorage');
                    localStorage.setItem('jwtToken',response.data.data);
                }else {
                    console.log('Session');
                    sessionStorage.setItem('jwtToken',response.data.data);
                }
                setTimeout(() => {
                    navigate(`/`);
                    window.location.reload();
                },2500)
            }else {
                setAlert({type : 'error' , message : 'Login Failed !'});
            }
            setAuthRequestState({
                userName: '',
                password: '',
                remember: false,
            });
        } catch (error) {
            console.error('error in submit Login', error);
        }
    }

    return (
        <>
           {alert && (
                <CustomAlert
                type = {alert.type}
                message = {alert.message}
                onClose = {() => setAlert(null)}
                 />
        )}
           <section className="sign-in-page">
            <div className="container bg-white mt-5 p-0">
                <div className="row no-gutters" style={{backgroundColor : '#f8f9fa'}}>
                    <div className="col-sm-6 align-self-center">
                        <div className="sign-in-from">
                            <h1 className="mb-0 dark-signin">Sign in</h1>
                            <p>Enter your email address and password to access admin panel.</p>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">User Name :  </label>
                                    <input
                                    value={authRequestState.userName}
                                     onChange={(e) => handleChangeAuthRequest('userName', e.target.value)}
                                     type="text" 
                                     className="form-control mb-0"  
                                     placeholder="Enter UserName"/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password : </label>
                                    <a href="#" className="float-right">Forgot password?</a>
                                    <input 
                                     value={authRequestState.password}
                                    onChange={(e) => handleChangeAuthRequest('password', e.target.value)}
                                    type="password" 
                                    className="form-control mb-0"  
                                    placeholder="Password"/>
                                </div>
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked= {authRequestState.remember}
                                        onChange={(e) => handleChangeAuthRequest('remember', e.target.checked)}
                                    />
                                    <label  htmlFor="rememberMe">
                                        Remember Me
                                    </label>
                                    </div>
                                    <button onClick={submitLogin} className="btn btn-primary float-right">Sign in</button>
                                </div>
                                <div className="sign-info">
                                    <span className="dark-color d-inline-block line-height-2">Don't have an account? <button className='btn btn-secondary'>Sign up</button></span>
                                    <ul className="iq-social-media">
                                        <li><button ><i className="fa-brands fa-facebook"></i></button></li>
                                        <li><button><i className="fa-brands fa-google"></i></button></li>
                                        <li><button><i className="fa-brands fa-github"></i></button></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div className="sign-in-detail text-white">
                            <a className="sign-in-logo mb-5" href="#"><img src={('../assets/images/online_courses.jpg')} className="img-fluid" alt="logo"/></a>
                            <div className="slick-slider11">
                                <div className="item">
                                    <img src={('../assets/images/online_courses.jpg')}  className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                {/* <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    
        </>
    );
};

export default Login;