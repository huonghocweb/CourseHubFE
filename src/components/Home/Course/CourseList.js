import React from 'react';
import { NavLink } from 'react-router-dom';

const CourseList = ({courses}) => {
	if(!courses){
		return (
			<p>Loading....</p>
		)
	}
    return (
        <>
         	<div class="courses">
		<div class="section_background parallax-window" data-parallax="scroll" data-image-src={`../../../assets/images/courses_background.jpg`} data-speed="0.8"></div>
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="section_title_container text-center">
						<h2 class="section_title">Popular Online Courses</h2>
						<div class="section_subtitle"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel gravida arcu. Vestibulum feugiat, sapien ultrices fermentum congue, quam velit venenatis sem</p></div>
					</div>
				</div>
			</div>
			<div class="row courses_row">
				
			{
				courses.map((item,index) => (
					<div key={index} class="col-lg-4 course_col">
					<div class="course">
						<NavLink to={`/courseDetails/${item.courseId}`}> 
						<div class="course_image"><img src={item.imageUrl} alt=""/></div>
						<div class="course_body">
							<h3 class="course_title"><a href="course.html">{item.courseTitle}</a></h3>
							<div class="course_teacher">{item.user.gender ? 'MR.' : 'MS.'}{item.user.fullName}</div>
							<div class="course_text">
								<p>{item.description.substring(0,50)}...</p>
							</div>
						</div>
						</NavLink>
						<div class="course_footer">
							<div class="course_footer_content d-flex flex-row align-items-center justify-content-start">
								<div class="course_info">
									<i class="fa fa-graduation-cap" aria-hidden="true"></i>
									<span>{item.totalUser} Student</span>
								</div>
								<div class="course_info">
									<i class="fa fa-star" aria-hidden="true"></i>
									<span>{item.avgReview} Ratings</span>
								</div>
								<div class="course_price ml-auto">{item.coursePrice !== 0 ? item.coursePrice : 'FREE'}</div>
							</div>
						</div>
					</div>
				</div>
				))
			}

			</div>
			<div class="row">
				<div class="col">
					<div class="courses_button trans_200"><a href="#">view all courses</a></div>
				</div>
			</div>
		</div>
	</div>   
        </>
    );
};

export default CourseList;