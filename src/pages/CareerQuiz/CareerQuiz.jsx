import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CareerQuiz.css";

const API_URL = "http://localhost:5000";

const questions = [
  {
    question: "What type of work interests you the most?",
    options: [
      { text: "💻 Technology & Computers", career: "Technology" },
      { text: "🎨 Creativity & Design", career: "Creative" },
      { text: "📊 Business & Finance", career: "Business" },
      { text: "🤝 Helping & Working With People", career: "People" },
    ],
  },
  {
    question: "Which activity sounds most enjoyable?",
    options: [
      { text: "Building websites or apps", career: "Technology" },
      { text: "Designing posters or interfaces", career: "Creative" },
      { text: "Planning a business or managing money", career: "Business" },
      { text: "Teaching, guiding or helping others", career: "People" },
    ],
  },
  {
    question: "What is one of your strengths?",
    options: [
      { text: "Problem solving", career: "Technology" },
      { text: "Creativity", career: "Creative" },
      { text: "Organization & planning", career: "Business" },
      { text: "Communication", career: "People" },
    ],
  },
  {
    question: "Which environment would you prefer?",
    options: [
      {
        text: "Computer and technology environment",
        career: "Technology",
      },
      {
        text: "Creative and visual environment",
        career: "Creative",
      },
      {
        text: "Professional business environment",
        career: "Business",
      },
      {
        text: "People-focused environment",
        career: "People",
      },
    ],
  },
  {
    question: "What would you like to learn?",
    options: [
      {
        text: "Programming, AI or Cybersecurity",
        career: "Technology",
      },
      {
        text: "UI/UX, Graphic Design or Animation",
        career: "Creative",
      },
      {
        text: "Finance, Marketing or Management",
        career: "Business",
      },
      {
        text: "Psychology, Education or Social Work",
        career: "People",
      },
    ],
  },
];

const careerResults = {
  Technology: {
    title: "Technology & IT",
    icon: "💻",
    description:
      "You may enjoy careers where technology, computers and problem-solving are important.",
    careers: [
      "Web Developer",
      "Software Developer",
      "Cybersecurity Analyst",
      "Data Analyst",
      "AI / ML Developer",
    ],
    skills: [
      "Python",
      "JavaScript",
      "SQL",
      "Problem Solving",
      "Git & GitHub",
    ],
    nextSteps: [
      "Learn programming basics",
      "Build small projects",
      "Create a GitHub profile",
      "Complete beginner certifications",
    ],
  },

  Creative: {
    title: "Creative & Design",
    icon: "🎨",
    description:
      "You may enjoy careers that combine creativity, visual thinking and digital tools.",
    careers: [
      "UI/UX Designer",
      "Graphic Designer",
      "Web Designer",
      "Content Designer",
      "Animation Designer",
    ],
    skills: [
      "Canva",
      "Figma",
      "UI/UX",
      "Visual Design",
      "Communication",
    ],
    nextSteps: [
      "Learn Figma and design principles",
      "Create a portfolio",
      "Design sample projects",
      "Apply for internships",
    ],
  },

  Business: {
    title: "Business & Finance",
    icon: "📊",
    description:
      "You may enjoy careers involving planning, business, finance and decision-making.",
    careers: [
      "Business Analyst",
      "Financial Analyst",
      "Digital Marketer",
      "Accountant",
      "Business Manager",
    ],
    skills: [
      "Excel",
      "Communication",
      "Financial Basics",
      "Data Analysis",
      "Presentation",
    ],
    nextSteps: [
      "Improve Excel skills",
      "Learn business fundamentals",
      "Work on practical projects",
      "Explore internships",
    ],
  },

  People: {
    title: "People & Communication",
    icon: "🤝",
    description:
      "You may enjoy careers involving communication, teamwork and helping people.",
    careers: [
      "Teacher",
      "HR Professional",
      "Counsellor",
      "Social Worker",
      "Content Creator",
    ],
    skills: [
      "Communication",
      "Leadership",
      "Presentation",
      "Teamwork",
      "Problem Solving",
    ],
    nextSteps: [
      "Improve communication skills",
      "Join practical activities",
      "Build leadership experience",
      "Explore internships and volunteering",
    ],
  },
};

function getStudentId() {
  const directId =
    localStorage.getItem("studentId") ||
    localStorage.getItem("student_id");

  if (directId) {
    return Number(directId);
  }

  const possibleKeys = ["student", "user", "loggedInUser"];

  for (const key of possibleKeys) {
    const storedData = localStorage.getItem(key);

    if (!storedData) continue;

    try {
      const parsedData = JSON.parse(storedData);

      const id =
        parsedData?.id ||
        parsedData?.student_id ||
        parsedData?.studentId;

      if (id) {
        return Number(id);
      }
    } catch (error) {
      console.log(`Could not read ${key} from localStorage`);
    }
  }

  return null;
}

function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [scores, setScores] = useState({
    Technology: 0,
    Creative: 0,
    Business: 0,
    People: 0,
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const [showResult, setShowResult] = useState(false);

  const [savingResult, setSavingResult] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  const handleAnswer = (career) => {
    setSelectedOption(career);

    setScores((previousScores) => ({
      ...previousScores,
      [career]: previousScores[career] + 1,
    }));

    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setShowResult(true);
      } else {
        setCurrentQuestion((previous) => previous + 1);
        setSelectedOption(null);
      }
    }, 350);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);

    setScores({
      Technology: 0,
      Creative: 0,
      Business: 0,
      People: 0,
    });

    setSelectedOption(null);
    setShowResult(false);
    setSaveMessage("");
  };

  const getResult = () => {
    const finalScores = {
      ...scores,
    };

    if (selectedOption) {
      finalScores[selectedOption] += 1;
    }

    let bestCareer = "Technology";

    Object.keys(finalScores).forEach((career) => {
      if (finalScores[career] > finalScores[bestCareer]) {
        bestCareer = career;
      }
    });

    return {
      careerKey: bestCareer,
      result: careerResults[bestCareer],
      finalScores,
    };
  };

  const resultData = showResult ? getResult() : null;

  const saveQuizResult = async () => {
    if (!resultData) return;

    const studentId = getStudentId();

    if (!studentId) {
      setSaveMessage(
        "Please login first to save your career quiz result."
      );
      return;
    }

    try {
      setSavingResult(true);
      setSaveMessage("");

      const response = await fetch(
        `${API_URL}/api/career-quiz-result`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: studentId,
            career_area: resultData.careerKey,
            result_title: resultData.result.title,
            scores: resultData.finalScores,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save quiz result."
        );
      }

      setSaveMessage("✅ Your career quiz result has been saved.");
    } catch (error) {
      console.error("Save quiz result error:", error);

      setSaveMessage(
        error.message || "Unable to save quiz result."
      );
    } finally {
      setSavingResult(false);
    }
  };

  const result = resultData?.result || null;

  return (
    <div className="career-quiz-page">

      {/* HEADER */}

      <header className="career-quiz-header">

        <div className="scholarship-logo">
           <div className="dashboard-logo">
            <img
              src="/CareerScholarshipPlatform-logo-transparent.png"
              alt="Career Scholarship Platform"
            />
          </div>
        </div>

        <Link
          to="/dashboard"
          className="career-quiz-back"
        >
          ← Dashboard
        </Link>

      </header>


      {/* HERO */}

      <section className="career-quiz-hero">

        <div>

          <span className="career-quiz-tag">
            🎯 CAREER QUIZ
          </span>

          <h1>
            Discover Career Areas
            <br />
            That Match You
          </h1>

          <p>
            Answer a few simple questions about your
            interests and strengths.
          </p>

        </div>

        <div className="career-quiz-hero-icon">
          🎯
        </div>

      </section>


      {!showResult ? (

        <section className="quiz-container">

          {/* PROGRESS */}

          <div className="quiz-progress">

            <div className="quiz-progress-text">

              <span>
                Question {currentQuestion + 1}
                {" "}
                of {questions.length}
              </span>

              <strong>
                {Math.round(
                  ((currentQuestion + 1) /
                    questions.length) *
                    100
                )}
                %
              </strong>

            </div>

            <div className="quiz-progress-bar">

              <div
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>


          {/* QUESTION */}

          <div className="quiz-question-card">

            <div className="quiz-question-number">
              Q{currentQuestion + 1}
            </div>

            <h2>
              {questions[currentQuestion].question}
            </h2>

            <p>
              Choose the option that feels closest to you.
            </p>


            <div className="quiz-options">

              {questions[currentQuestion].options.map(
                (option, index) => (

                  <button
                    key={index}
                    className={`quiz-option ${
                      selectedOption === option.career
                        ? "selected-option"
                        : ""
                    }`}
                    onClick={() =>
                      handleAnswer(option.career)
                    }
                  >

                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>
                      {option.text}
                    </span>

                    <span className="quiz-option-arrow">
                      →
                    </span>

                  </button>

                )
              )}

            </div>

          </div>

        </section>

      ) : (

        /* RESULT */

        <section className="quiz-result-section">

          <div className="quiz-result-header">

            <span className="result-tag">
              ✨ YOUR RESULT
            </span>

            <h2>
              Your Career Direction
            </h2>

            <p>
              Based on your answers, this career area
              may be worth exploring.
            </p>

          </div>


          <div className="quiz-result-main">

            <div className="result-icon">
              {result.icon}
            </div>

            <div>

              <span className="result-label">
                POSSIBLE CAREER AREA
              </span>

              <h3>
                {result.title}
              </h3>

              <p>
                {result.description}
              </p>

            </div>

          </div>


          {/* CAREER OPTIONS */}

          <div className="result-section">

            <h3>
              💼 Careers to Explore
            </h3>

            <div className="result-career-grid">

              {result.careers.map(
                (career, index) => (

                  <div
                    className="result-career-card"
                    key={index}
                  >
                    <span>→</span>
                    {career}
                  </div>

                )
              )}

            </div>

          </div>


          {/* SKILLS */}

          <div className="result-section">

            <h3>
              🧠 Skills to Build
            </h3>

            <div className="result-skill-list">

              {result.skills.map(
                (skill, index) => (

                  <span key={index}>
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>


          {/* NEXT STEPS */}

          <div className="result-roadmap">

            <h3>
              🚀 Your Suggested Next Steps
            </h3>

            <div className="result-roadmap-list">

              {result.nextSteps.map(
                (step, index) => (

                  <div
                    className="result-roadmap-item"
                    key={index}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <p>
                      {step}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>


          {/* SAVE RESULT */}

          <div className="quiz-save-result">

            <button
              onClick={saveQuizResult}
              className="save-quiz-result-btn"
              disabled={savingResult}
            >
              {savingResult
                ? "Saving..."
                : "💾 Save My Quiz Result"}
            </button>

            {saveMessage && (
              <p className="quiz-save-message">
                {saveMessage}
              </p>
            )}

          </div>


          {/* ACTIONS */}

          <div className="quiz-result-actions">

            <Link
              to="/career-explorer"
              className="explore-result-btn"
            >
              🧭 Explore Careers
            </Link>

            <Link
              to="/scholarships"
              className="scholarship-result-btn"
            >
              💰 Find Scholarships
            </Link>

            <button
              onClick={restartQuiz}
              className="restart-quiz-btn"
            >
              🔄 Retake Quiz
            </button>

          </div>

        </section>

      )}


      {/* FOOTER */}

      <footer className="career-quiz-footer">

        <strong>
          CareerScholarshipPlatform
        </strong>

        <span>
          Helping students make better career decisions.
        </span>

      </footer>

    </div>
  );
}

export default CareerQuiz;