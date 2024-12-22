import axiosInstance from "../AxiosConfig/AxiosInstance";


const getLessonsByCourseId = async (courseId) => {
    try {
        const response = await axiosInstance.get(`/api/lesson/getByCourseId/${courseId}`);
        return response;
    } catch (error) {
        console.error('error in get Lessons By Course Id', error);
        throw error;
    }
}

const getLessonById = async (lessonId) => {
    try {
        const response = await axiosInstance.get(`/api/lesson/getById/${lessonId}`);
        return response;
    } catch (error) {
        console.error('error in get Lesson By Id',error);
        throw error;
    }
}

export {getLessonsByCourseId , getLessonById};