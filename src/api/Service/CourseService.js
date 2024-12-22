import axiosInstance from "../AxiosConfig/AxiosInstance";

const getAllCourse = async (paginationState) => {
    try {
        const response = await axiosInstance.get(`/api/course` , {
            params : {
                pageCurrent : paginationState.pageCurrent, 
                pageSize : paginationState.pageSize , 
                sortOrder : paginationState.sortOrder , 
                sortBy : paginationState.sortBy
            }
        });
        return response;
    } catch (error) {
        console.error('error in get All Course', error);
        throw error;
    }
}

const getCourseById = async (courseId) => {
    try {
        const response = await axiosInstance.get(`/api/course/byId/${courseId}`);
        return response;
    } catch (error) {
        console.error('error in get Course By Id' , error);
        throw error;
    }
}


const createCourse = async (formData) => {
    try {
        const response = await axiosInstance.post(`/api/course` , formData, 
            { headers  : {'Content-Type' : 'multipart/form-data'}}
        )
        return response;
    } catch (error) {
        console.error('error in create Course',error);
        throw error;
    }
}

const updateCourse = async (courseId , formData) => {
    try {
        const response = await axiosInstance.put(`/api/course/${courseId}` , formData , 
            { headers : {'Content-Type' : 'multipart/form-data'}}
        )
        return response;
    } catch (error) {
        console.error('error in update Course',error);
        throw error;
    }
}


export {getAllCourse, getCourseById, createCourse, updateCourse}