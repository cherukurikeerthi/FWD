import React, { useState } from "react";
import "./App.css";

function App() {
  // -------------------------------
  // SAMPLE DATA
  // -------------------------------
  const courses = [
    {
      id: 1,
      title: "Web Development Basics",
      lessons: [
        {
          id: 1,
          title: "Introduction to HTML",
          video: "https://www.w3schools.com/html/mov_bbb.mp4",
          files: ["HTML Notes.pdf"],
        },
        {
          id: 2,
          title: "CSS Fundamentals",
          video: "https://www.w3schools.com/html/movie.mp4",
          files: ["CSS Basics.pdf"],
        },
      ],
    },
  ];

  const quizQuestions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Team Markup Level",
      ],
      answer: 0,
    },
    {
      question: "What property changes the text color in CSS?",
      options: ["color", "text-style", "font-color"],
      answer: 0,
    },
  ];

  // --------------------------------------
  // STATE VARIABLES
  // --------------------------------------
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  // --------------------------------------
  // OPEN LESSON
  // --------------------------------------
  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
    setProgress((prev) => (prev < 50 ? prev + 25 : prev));
  };

  // --------------------------------------
  // QUIZ SUBMISSION
  // --------------------------------------
  const submitQuiz = () => {
    let score = 0;
    quizAnswers.forEach((ans, i) => {
      if (ans === quizQuestions[i].answer) score++;
    });

    if (score >= quizQuestions.length / 2) {
      alert("Quiz Passed! Certificate Unlocked.");
      setProgress(100);
      setShowCertificate(true);
    } else {
      alert("Quiz Failed. Try again.");
    }
  };

  // --------------------------------------
  return (
    <div className="app">

      {/* ---------------------- SIDEBAR (COURSES) ---------------------- */}
      <div className="sidebar">
        <h2>📘 Courses</h2>

        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => {
              setSelectedCourse(course);
              setSelectedLesson(null);
              setShowCertificate(false);
            }}
          >
            <h4>{course.title}</h4>
            <p>{course.lessons.length} Lessons</p>
          </div>
        ))}
      </div>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <div className="main">

        {/* ---------------- COURSE VIEW ---------------- */}
        {selectedCourse && !selectedLesson && !showCertificate && (
          <div className="card">
            <h2>{selectedCourse.title}</h2>

            <h3>Lessons:</h3>
            {selectedCourse.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="lesson-card"
                onClick={() => openLesson(lesson)}
              >
                {lesson.title}
              </div>
            ))}

            <h3 className="mt-6">Progress</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            {progress >= 50 && (
              <button
                className="btn mt-6"
                onClick={() => setSelectedLesson("quiz")}
              >
                Start Quiz
              </button>
            )}
          </div>
        )}

        {/* ---------------- LESSON VIEW ---------------- */}
        {selectedLesson && selectedLesson !== "quiz" && (
          <div className="card">
            <h2>{selectedLesson.title}</h2>

            <video controls width="100%" style={{ borderRadius: "10px" }}>
              <source src={selectedLesson.video} type="video/mp4" />
            </video>

            <h3 className="mt-6">Files:</h3>
            <ul>
              {selectedLesson.files.map((file, i) => (
                <li key={i}>{file}</li>
              ))}
            </ul>

            <button
              className="btn mt-6"
              onClick={() => {
                setSelectedLesson(null);
              }}
            >
              Back to Lessons
            </button>
          </div>
        )}

        {/* ---------------- QUIZ VIEW ---------------- */}
        {selectedLesson === "quiz" && !showCertificate && (
          <div className="card">
            <h2>Quiz</h2>

            {quizQuestions.map((q, i) => (
              <div key={i} className="quiz-box">
                <h3>{q.question}</h3>

                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`quiz-option ${
                      quizAnswers[i] === idx ? "selected" : ""
                    }`}
                    onClick={() => {
                      const updated = [...quizAnswers];
                      updated[i] = idx;
                      setQuizAnswers(updated);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            ))}

            <button className="btn mt-6" onClick={submitQuiz}>
              Submit Quiz
            </button>
          </div>
        )}

        {/* ---------------- CERTIFICATE VIEW ---------------- */}
        {showCertificate && (
          <div className="certificate">
            <h1>Certificate of Completion</h1>
            <p>Congratulations! You have successfully completed the course.</p>

            <button
              className="btn mt-6"
              onClick={() => {
                setSelectedLesson(null);
                setSelectedCourse(null);
                setShowCertificate(false);
                setProgress(0);
              }}
            >
              Back to Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
