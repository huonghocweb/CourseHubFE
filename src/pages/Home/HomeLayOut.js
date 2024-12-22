import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UI/Home/Header';
import Footer from '../../components/UI/Home/Footer';
import '../../styles/Home/boostrapmin.css';
import '../../styles/Admin/Admin.css';
import '../../styles/Admin/Typogarphu.css';
const HomeLayOut = () => {
    return (
        <>
            <Header/>
            <Outlet></Outlet>
            <Footer/>
        </>
    );
};

export default HomeLayOut;