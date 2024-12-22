import React, { useEffect, useState } from 'react';
import Features from '../../../components/UI/Home/Features';
import Banner from '../../../components/UI/Home/Banner';
import { getAllCourse } from '../../../api/Service/CourseService';
import CourseList from '../../../components/Home/Course/CourseList';

const Index = () => {

    const [courses , setCourses] = useState([]);
    const [paginationState, setPaginationState] = useState({
        pageCurrent : 0, 
        pageSize : 4, 
        sortOrder : 'asc', 
        sortBy : 'courseId', 
        totalPages : ''
    })

   const handleChangePagination = (name ,value) => {
    setPaginationState(prev => ({
        ...prev, 
        [name] : value 
    }))
   }
    const fetchAllCourse = async () => {
        try {
            const resAllCourse = await getAllCourse(paginationState);
            console.log(resAllCourse.data.data);
            setCourses(resAllCourse.data.data.content);
            handleChangePagination('totalPages' , resAllCourse.data.data.totalPages);
        } catch (error) {
            console.error('error in fetch All Course',error);
        }
    }
    useEffect(() => {
        fetchAllCourse();
    }, [...Object.values(paginationState)])

    return (
        <>
            <Banner/>
            <Features/>   
            <CourseList
                courses = {courses}
            /> 
        </>
    );
};

export default Index;