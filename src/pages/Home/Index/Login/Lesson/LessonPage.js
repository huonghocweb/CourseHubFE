import React from 'react';
import './LessonPage.css';
const LessonPage = () => {
    return (
        <>
                <div className="lesson-container">
      <div className="lesson-header">
        <h2>Presentation Skills in English: Course Overview</h2>
        <div className="lesson-meta">
          <span>Instructor: John Doe</span>
          <span>Duration: 30 minutes</span>
        </div>
      </div>

      <div className="lesson-content">
        <div className="lesson-video">
          <video width="100%" controls>
            <source src="your-video-url.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-description">
            <h3>Lesson Title</h3>
            <p>This is a detailed description of the video content. It can include an explanation, goals, and learning outcomes.</p>
            <div className="lesson-meta">
              <span>Duration: 30 minutes</span>
              <span>Level: Beginner</span>
            </div>
          </div>
        </div>

        <div className="lesson-sidebar">
          <h4>Other Lessons</h4>
          <ul className="lesson-list">
            <li><a href="#">Lesson 1 - Introduction</a></li>
            <li><a href="#">Lesson 2 - Key Concepts</a></li>
            <li><a href="#">Lesson 3 - How to Present</a></li>
            <li><a href="#">Lesson 4 - Advanced Tips</a></li>
          </ul>
        </div>
      </div>
    </div>
        </>
    );
};

export default LessonPage;