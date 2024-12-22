import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserByToken } from '../../../api/Service/UserService';
import MyAccountPopup from './Index/MyAccountPopup';
import { removeToken } from '../../../api/Service/AuthService';

const Header = () => {

    const [isOpenPopup ,setIsOpenPopup] = useState(null);
    const [userByToken , setUserByToken] = useState(null);
    const navigate = useNavigate();

    const handleChangeIsOpen = () => {
        setIsOpenPopup(!isOpenPopup);
    }
    const fetchUserByToken = async () => {
        try {
            const resUserByToken = await getUserByToken();
            console.log(resUserByToken?.data?.data);
            if(resUserByToken.data !== null){
                setUserByToken(resUserByToken.data.data);
            }else {
                setUserByToken(null);
            }
        } catch (error) {
            console.error('error in fetch User By token ' , error);
        }
    }

    const handleLogout = async () => {
        try {
          removeToken();
          handleChangeIsOpen();
          navigate(`/login`);
          window.location.reload();
        } catch (error) {
          console.error('error i handleLogout',error)
        }
      }

    useEffect(() => {
        fetchUserByToken();
    },[])

    return (
        <>
            <header className="header">
            <div className="top_bar">
                <div className="top_bar_container">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="top_bar_content d-flex flex-row align-items-center justify-content-start">
                                    <ul className="top_bar_contact_list">
                                        <li><div className="question">Have any questions?</div></li>
                                        <li>
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                            <div>001-1234-88888</div>
                                        </li>
                                        <li>
                                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                            <div>info.deercreative@gmail.com</div>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>				
            </div>
    
            <div className="header_container">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="header_content d-flex flex-row align-items-center justify-content-start">
                                <div className="logo_container">
                                    <NavLink to={`/`}>
                                        <div className="logo_text">Unic<span>at</span></div>
                                    </NavLink>
                                </div>
                                
                                <nav className="main_nav_contaner ml-auto">
                                    <ul className="main_nav">
                                        <li className="active"><NavLink to={`/`}>Home</NavLink></li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="courses.html">Courses</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><div className="search_button"><i className="fa fa-search" aria-hidden="true"></i></div>
                                        <div className="shopping_cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></div></li>
                                        <li>
                                        {
                                        userByToken ? (
                                                <button onClick={handleChangeIsOpen} className="search-toggle iq-waves-effect d-flex align-items-center bg-success rounded">
                                                    <img src={userByToken?.imageUrl} className="avatar-40 rounded mr-3" alt="user"/>
                                                    <div className="caption">
                                                    <h6 className="mb-0 line-height text-white">{userByToken?.userName}</h6>
                                                    <span className="font-size-12 text-white">{userByToken?.roles?.map(role => role.roleName).join(' , ') } </span>
                                                    </div>
                                                </button>
                                        ) : (
                                            <button onClick={handleChangeIsOpen} className="search-toggle iq-waves-effect d-flex align-items-center  rounded">
                                                <NavLink to={`/login`} className="icons-btn d-inline-block js-search-open">
                                                    LOG IN <i className="fa-solid fa-right-to-bracket fa-lg"></i></NavLink>
                                            </button>
                                        )
                                        }
                                        </li>
                                    </ul>

                                    <MyAccountPopup
                                        userByToken={userByToken}
                                        isOpen={isOpenPopup}
                                        handleChangIsOpen={handleChangeIsOpen}
                                        handleLogout={handleLogout}
                                     />
                                   
                                </nav>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header_search_container">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="header_search_content d-flex flex-row align-items-center justify-content-end">
                                <form action="#" className="header_search_form">
                                    <input type="search" className="search_input" placeholder="Search" required="required"/>
                                    <button className="header_search_button d-flex flex-column align-items-center justify-content-center">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>			
            </div>			
        </header>

        <div className="menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400">
		<div className="menu_close_container"><div className="menu_close"><div></div><div></div></div></div>
		<div className="search">
			<form action="#" className="header_search_form menu_mm">
				<input type="search" className="search_input menu_mm" placeholder="Search" required="required"/>
				<button className="header_search_button d-flex flex-column align-items-center justify-content-center menu_mm">
					<i className="fa fa-search menu_mm" aria-hidden="true"></i>
				</button>
			</form>
		</div>
		<nav className="menu_nav">
			<ul className="menu_mm">
				<li className="menu_mm"><a href="index.html">Home</a></li>
				<li className="menu_mm"><a href="#">About</a></li>
				<li className="menu_mm"><a href="#">Courses</a></li>
				<li className="menu_mm"><a href="#">Blog</a></li>
				<li className="menu_mm"><a href="#">Page</a></li>
				<li className="menu_mm"><a href="contact.html">Contact</a></li>
			</ul>
		</nav>
	</div>

        </>
    );
};

export default Header;