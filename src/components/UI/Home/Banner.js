import React from 'react';

const Banner = () => {
    return (
        <>
            <div className="home" style={{ backgroundImage: `url('/assets/images/home_slider_1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="home_slider_container">
                    <div className="home_slider_content">
                        <div className="container">
                            <div className="row">
                                <div className="col text-center">
                                    <div className="home_slider_title">The Premium System Education</div>
                                    <div className="home_slider_subtitle">Future Of Education Technology</div>
                                    <div className="home_slider_form_container">
                                        <form action="#" id="home_search_form_1" className="home_search_form d-flex flex-lg-row flex-column align-items-center justify-content-between">
                                            <div className="d-flex flex-row align-items-center justify-content-start">
                                                <input type="search" className="home_search_input" placeholder="Keyword Search" required="required" />
                                                <select className="dropdown_item_select home_search_input">
                                                    <option>Category Courses</option>
                                                    <option>Category</option>
                                                    <option>Category</option>
                                                </select>
                                                <select className="dropdown_item_select home_search_input">
                                                    <option>Select Price Type</option>
                                                    <option>Price Type</option>
                                                    <option>Price Type</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="home_search_button">search</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
