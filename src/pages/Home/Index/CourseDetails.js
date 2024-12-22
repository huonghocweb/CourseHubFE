import React, { useEffect, useState } from 'react';
import '../../../styles/Home/course.css';
import {NavLink, useParams} from 'react-router-dom';
import { getCourseById } from '../../../api/Service/CourseService';
import { getLessonsByCourseId } from '../../../api/Service/LessonService';

const CourseDetails = () => {

	const {courseId} = useParams();
	const [courseById , setCourseById] = useState();
    const [activeTab, setActiveTab] = useState('description');
	const [lessonsByCourseId ,setLessonsByCourseId] = useState([]);
	const [openLessonVideo, setOpentLessionVideo] = useState({});

	const handleOpenLessonVideo = (lessonId) => {
		setOpentLessionVideo(prev => ({
		  ...prev,
		  [lessonId]: !prev[lessonId], // Cập nhật trạng thái của video tương ứng
		}));
	  };
	  


	const handleLessonsByCourseId = async (courseId) => {
		handleTabClick('curriculum');
		try {
			const resLessonsByCourseId = await getLessonsByCourseId(courseId);
			console.log(resLessonsByCourseId.data.data);
			setLessonsByCourseId(resLessonsByCourseId.data.data);
		} catch (error) {
			console.error('error in handle Lesson By Course Id' , error);
		}
	}

    const handleTabClick = (tab) => {
        console.log(tab);
        setActiveTab(tab);
    }

	const fetchCourseById = async () => {
		try {
			const resCourseById = await getCourseById(courseId);
			console.log(resCourseById.data.data);
			setCourseById(resCourseById.data.data);
		} catch (error) {
			console.error('error in fetch Course By Id', error);
		}
	}

	useEffect(() => {
		if(courseId){
			fetchCourseById();
		}
	},[openLessonVideo])

	if(!courseById) {
		return (
			<p>Loading. ...</p>
		)
	}
    return (
        <>
            <div className="course">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="course_container">
						<div className="course_title">Software Training</div>
						<div className="course_info d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
							<div className="course_info_item">
								<div className="course_info_title">Teacher:</div>
								<div className="course_info_text"><NavLink >{courseById.user.fullName}</NavLink></div>
							</div>
							<div className="course_info_item">
								<div className="course_info_title">Reviews:</div>
								<div className="rating_r rating_r_4"><i></i><i></i><i></i><i></i><i></i></div>
							</div>
							<div className="course_info_item">	
								<div className="course_info_title">Categories:</div>
								<div className="course_info_text"><NavLink >{courseById.courseCategory.courseCategoryName}</NavLink></div>
							</div>
						</div>
						<div className="course_image"><img src={courseById.imageUrl} className='course_image' alt=""/></div>

						<div className="course_tabs_container">
							<div className="tabs d-flex flex-row align-items-center justify-content-start">
								<div className={`tab ${activeTab === 'description' ? 'active' : ''}`} onClick={() => handleTabClick('description')}>description</div>
								<div className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}  onClick={() => handleLessonsByCourseId(courseById.courseId)}>curriculum</div>
								<div className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}   onClick={() => handleTabClick('reviews')}>reviews</div>
							</div>

							<div className="tab_panels">
								{
                                    activeTab ==='description' && (
                                        <div className="tab_panel active">
									<div className="tab_panel_title"> {courseById.courseTitle} </div>
									<div className="tab_panel_content">
										<div className="tab_panel_text">
											<p>{courseById.description}</p>
										</div>
										<div className="tab_panel_section">
											<div className="tab_panel_subtitle">Requirements</div>
											<ul className="tab_panel_bullets">
												<li>Lorem Ipsn gravida nibh vel velit auctor aliquet. className aptent taciti sociosquad litora torquent.</li>
											</ul>
										</div>
										<div className="tab_panel_section">
											<div className="tab_panel_subtitle">What is the target audience?</div>
											<div className="tab_panel_text">
												<p>This course is intended for anyone interested in learning to master his or her own body.This course is aimed at beginners, so no previous experience with hand balancing skillts is necessary Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p>
											</div>
										</div>
										<div className="tab_panel_faq">
											<div className="tab_panel_title">FAQ</div>
											<div className="accordions">
												<div className="elements_accordions">
													<div className="accordion_container">
														<div className="accordion d-flex flex-row align-items-center"><div>Can I just enroll in a single course?</div></div>
														<div className="accordion_panel">
															<p>Lorem ipsun gravida nibh vel velit auctor aliquet. Aenean sollicitudin, a.</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
                                    )
                                }

								{
                                    activeTab === 'curriculum' && ( 
                                        <div className="tab_panel active">
									
									<div className="tab_panel_content">
										<div className="tab_panel_title"> {courseById.courseTitle} </div>
										<div className="tab_panel_content">
											<div className="tab_panel_text">
												<p>Lorem Ipsn gravida nibh vel velit auctor aliquet. Aenean sollicitudin, a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio.</p>
											</div>
											{
											lessonsByCourseId &&  (
												lessonsByCourseId.map((item,index) => (
													<>
													<ul className="dropdowns" key={index}>
														<li className="has_children">
															<div className="dropdown_item" onClick={() => handleOpenLessonVideo(item.lessonId)}>
																<div className="dropdown_item_title"><span>Lecture {item.orderNumber}:</span>{item.title}.</div>
																<div className="dropdown_item_text">
																	<p>Lorem Ipsn gravida nibh vel velit auctor aliquet. Aenean sollicitudin,.</p>
																</div>
															</div>
															</li>
															<ul>	{
																openLessonVideo[item.lessonId] && (
																	
																<>
																{item.lessonVideos.map((item,index) => (
																	<li><div className="dropdown_item active">
																		<div className="dropdown_item_title"><span>Lecture {item.orderNumber} :</span> {item.videoTitle}.</div>
																		<div className="dropdown_item_text">
																		<NavLink to={`/lessonPage`} className='btn btn-success'> <i class="fa-solid fa-eye fa-lg"></i>	({item.durationMinutes})minutes</NavLink>
																		</div>
																	</div></li>
																))}
																</>
														
														)}</ul>
															
														
														
													</ul>
													</>
												))
											)}
										
										</div>
									</div>
                                    </div>
                                    )
                                }

                                {
                                    activeTab === 'reviews' && (
                                        <div className="tab_panel active">
									<div className="tab_panel_title">Course Review</div>
									<div className="review_rating_container">
										<div className="review_rating">
											<div className="review_rating_num">4.5</div>
											<div className="review_rating_stars">
												<div className="rating_r rating_r_4"><i></i><i></i><i></i><i></i><i></i></div>
											</div>
											<div className="review_rating_text">(28 Ratings)</div>
										</div>
										<div className="review_rating_bars">
											<ul>
												<li><span>5 Star</span><div className="review_rating_bar"><div style={{width : '90%'}}></div></div></li>
												<li><span>4 Star</span><div className="review_rating_bar"><div style={{width : '70%'}}></div></div></li>
												<li><span>3 Star</span><div className="review_rating_bar"><div style={{width : '50%'}}></div></div></li>
												<li><span>2 Star</span><div className="review_rating_bar"><div style={{width : '10%'}}></div></div></li>
												<li><span>1 Star</span><div className="review_rating_bar"><div style={{width : '3%'}}></div></div></li>
											</ul>
										</div>
									</div>
									
									<div className="comments_container">
										<ul className="comments_list">
											<li>
												<div className="comment_item d-flex flex-row align-items-start jutify-content-start">
													<div className="comment_image"><div><img src="images/comment_1.jpg" alt=""/></div></div>
													<div className="comment_content">
														<div className="comment_title_container d-flex flex-row align-items-center justify-content-start">
															<div className="comment_author"><a href="#">Milley Cyrus</a></div>
															<div className="comment_rating"><div className="rating_r rating_r_4"><i></i><i></i><i></i><i></i><i></i></div></div>
															<div className="comment_time ml-auto">1 day ago</div>
														</div>
														<div className="comment_text">
															<p>There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some form, by injected humour.</p>
														</div>
														<div className="comment_extras d-flex flex-row align-items-center justify-content-start">
															<div className="comment_extra comment_likes"><a href="#"><i className="fa fa-heart" aria-hidden="true"></i><span>15</span></a></div>
															<div className="comment_extra comment_reply"><a href="#"><i className="fa fa-reply" aria-hidden="true"></i><span>Reply</span></a></div>
														</div>
													</div>
												</div>
												<ul>
													<li>
														<div className="comment_item d-flex flex-row align-items-start jutify-content-start">
															<div className="comment_image"><div><img src="images/comment_2.jpg" alt=""/></div></div>
															<div className="comment_content">
																<div className="comment_title_container d-flex flex-row align-items-center justify-content-start">
																	<div className="comment_author"><a href="#">John Tyler</a></div>
																	<div className="comment_rating"><div className="rating_r rating_r_4"><i></i><i></i><i></i><i></i><i></i></div></div>
																	<div className="comment_time ml-auto">1 day ago</div>
																</div>
																<div className="comment_text">
																	<p>There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some form, by injected humour.</p>
																</div>
																<div className="comment_extras d-flex flex-row align-items-center justify-content-start">
																	<div className="comment_extra comment_likes"><a href="#"><i className="fa fa-heart" aria-hidden="true"></i><span>15</span></a></div>
																	<div className="comment_extra comment_reply"><a href="#"><i className="fa fa-reply" aria-hidden="true"></i><span>Reply</span></a></div>
																</div>
															</div>
														</div>
													</li>
												</ul>
											</li>
										</ul>
										<div className="add_comment_container">
											<div className="add_comment_title">Add a review</div>
											<div className="add_comment_text">You must be <a href="#">logged</a> in to post a comment.</div>
										</div>
									</div>
								</div>
                                    )
                                }
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="sidebar">

						<div className="sidebar_section">
							<div className="sidebar_section_title">Course Feature</div>
							<div className="sidebar_feature">
								<div className="course_price">{courseById.coursePrice > 0 ? `${courseById.coursePrice}$`: 'FREE'}</div>

								<div className="feature_list">

									<div className="d-flex flex-row align-items-center justify-content-start">
										<div className="feature_title"><i className="fa-solid fa-clock"></i> <span>Duration:</span></div>
										<div className="feature_text ml-auto"> {courseById.duration_minutes}minus </div>
									</div>

									<div className=" d-flex flex-row align-items-center justify-content-start">
										<div className="feature_title"><i className="fa-solid fa-file"></i><span>Lectures:</span></div>
										<div className="feature_text ml-auto">10</div>
									</div>

									<div className=" d-flex flex-row align-items-center justify-content-start">
										<div className="feature_title"><i className="fa-solid fa-question"></i><span>Quiz:</span></div>
										<div className="feature_text ml-auto">6</div>
									</div>

									<div className=" d-flex flex-row align-items-center justify-content-start">
										<div className="feature_title"><i className="fa-solid fa-rectangle-list"></i><span>Lectures:</span></div>
										<div className="feature_text ml-auto">Yes</div>
									</div>

									<div className=" d-flex flex-row align-items-center justify-content-start">
										<div className="feature_title"><i className="fa fa-users" aria-hidden="true"></i><span>Students:</span></div>
										<div className="feature_text ml-auto">{courseById.totalUser}</div>
									</div>

								</div>
							</div>
						</div>

						<div className="sidebar_section">
							<div className="sidebar_section_title">Teacher</div>
							<div className="sidebar_teacher">
								<div className="teacher_title_container d-flex flex-row align-items-center justify-content-start">
									<div className="teacher_image"><img src={courseById.user.imageUrl} alt=""/></div>
									<div className="teacher_title">
										<div className="teacher_name"><NavLink >{courseById.user.fullName}</NavLink></div>
										<div className="teacher_position">Marketing & Management</div>
									</div>
								</div>
								<div className="teacher_meta_container">
									<div className="teacher_meta d-flex flex-row align-items-center justify-content-start">
										<div className="teacher_meta_title">Average Rating:</div>
										<div className="teacher_meta_text ml-auto"><span>4.7</span><i className="fa fa-star" aria-hidden="true"></i></div>
									</div>
									<div className="teacher_meta d-flex flex-row align-items-center justify-content-start">
										<div className="teacher_meta_title">Review:</div>
										<div className="teacher_meta_text ml-auto"><span>12k</span><i className="fa fa-comment" aria-hidden="true"></i></div>
									</div>
									<div className="teacher_meta d-flex flex-row align-items-center justify-content-start">
										<div className="teacher_meta_title">Quizzes:</div>
										<div className="teacher_meta_text ml-auto"><span>600</span><i className="fa fa-user" aria-hidden="true"></i></div>
									</div>
								</div>
								<div className="teacher_info">
									<p>Hi! I am Masion, I’m a marketing & management  eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum nam nulla ipsum.</p>
								</div>
							</div>
						</div>

						<div className="sidebar_section">
							<div className="sidebar_section_title">Latest Courses</div>
							<div className="sidebar_latest">

								<div className="latest d-flex flex-row align-items-start justify-content-start">
									<div className="latest_image"><div><img src="images/latest_1.jpg" alt=""/></div></div>
									<div className="latest_content">
										<div className="latest_title"><a href="course.html">How to Design a Logo a Beginners Course</a></div>
										<div className="latest_price">Free</div>
									</div>
								</div>

								<div className="latest d-flex flex-row align-items-start justify-content-start">
									<div className="latest_image"><div><img src="images/latest_2.jpg" alt=""/></div></div>
									<div className="latest_content">
										<div className="latest_title"><a href="course.html">Photography for Beginners MasterclassName</a></div>
										<div className="latest_price">$170</div>
									</div>
								</div>
								<div className="latest d-flex flex-row align-items-start justify-content-start">
									<div className="latest_image"><div><img src="images/latest_3.jpg" alt=""/></div></div>
									<div className="latest_content">
										<div className="latest_title"><a href="course.html">The Secrets of Body Language</a></div>
										<div className="latest_price">$220</div>
									</div>
								</div>
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

export default CourseDetails;