import { BrowserRouter , Route, Routes } from 'react-router-dom'; 
import HomeLayOut from './pages/Home/HomeLayOut';
import Index from './pages/Home/Index/Index';
import './styles/Home/main.css';
import CourseDetails from './pages/Home/Index/CourseDetails';
import Login from './pages/Home/Index/Login/Login';
import LessonPage from './pages/Home/Index/Login/Lesson/LessonPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>

          <Route path='/' element= {<HomeLayOut/>}>
              <Route index element= {<Index/>} />
              <Route path='courseDetails/:courseId' element= {<CourseDetails/>} />
              <Route path='login' element = {<Login/>} />
              <Route path='lessonPage' element= {<LessonPage/>} />
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
