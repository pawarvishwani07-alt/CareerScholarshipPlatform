import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./InterviewPrep.css";

function InterviewPrep() {
  const [activeCategory, setActiveCategory] = useState("Common");
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [practisedQuestions, setPractisedQuestions] = useState([]);
  const [randomQuestionId, setRandomQuestionId] = useState(null);

  // =====================================================
  // 30 COMMON QUESTIONS
  // =====================================================

  const commonQuestions = [
    {
      id: "common-1",
      number: "01",
      question: "Tell me about yourself.",
      answer:
        "Start with your education, important skills, projects or experience, and finish by explaining your career interests.",
      tip:
        "Keep your introduction short, clear and connected to the role.",
    },
    {
      id: "common-2",
      number: "02",
      question: "Can you walk me through your resume?",
      answer:
        "Briefly explain your education, skills, projects, internships, certifications and other important experiences in a logical order.",
      tip:
        "Know everything written on your resume because the interviewer may ask about any part of it.",
    },
    {
      id: "common-3",
      number: "03",
      question: "What are your strengths?",
      answer:
        "Choose two or three genuine strengths such as teamwork, communication, problem-solving, creativity or willingness to learn. Give a short example.",
      tip:
        "Use strengths that are useful for the position you are applying for.",
    },
    {
      id: "common-4",
      number: "04",
      question: "What is your biggest weakness?",
      answer:
        "Mention one genuine area you are improving and explain the steps you are taking to improve it.",
      tip:
        "Do not simply say you have no weaknesses. Show self-awareness and improvement.",
    },
    {
      id: "common-5",
      number: "05",
      question: "Why do you want this job?",
      answer:
        "Explain what interests you about the position and how it matches your skills, education and career goals.",
      tip:
        "Research the role before the interview.",
    },
    {
      id: "common-6",
      number: "06",
      question: "Why are you interested in this field?",
      answer:
        "Explain what attracted you to the field and mention your education, projects, interests or experiences related to it.",
      tip:
        "Show genuine interest instead of giving a memorized answer.",
    },
    {
      id: "common-7",
      number: "07",
      question: "Why should we hire you?",
      answer:
        "Explain how your skills, education, projects, attitude and willingness to learn can help you perform the responsibilities of the role.",
      tip:
        "Connect your abilities with the requirements of the job.",
    },
    {
      id: "common-8",
      number: "08",
      question: "What are your career goals?",
      answer:
        "Explain the skills, knowledge and experience you want to develop and the type of professional growth you are looking for.",
      tip:
        "Keep your goals realistic and related to your career direction.",
    },
    {
      id: "common-9",
      number: "09",
      question: "Where do you see yourself in five years?",
      answer:
        "Talk about becoming more skilled, taking greater responsibility and developing professionally in your chosen field.",
      tip:
        "Focus on learning, contribution and professional growth.",
    },
    {
      id: "common-10",
      number: "10",
      question: "What motivates you?",
      answer:
        "You can mention learning new things, solving problems, achieving goals, helping a team or improving your skills.",
      tip:
        "Choose something that genuinely motivates you.",
    },
    {
      id: "common-11",
      number: "11",
      question: "What are you looking for in your first job?",
      answer:
        "Mention an opportunity where you can apply your knowledge, learn from experienced people, develop skills and contribute to the organization.",
      tip:
        "Show that you are interested in learning as well as working.",
    },
    {
      id: "common-12",
      number: "12",
      question: "Why did you choose your career or field?",
      answer:
        "Explain your interest, educational background and experiences that influenced your decision.",
      tip:
        "Keep the answer personal and genuine.",
    },
    {
      id: "common-13",
      number: "13",
      question: "What do you know about this role?",
      answer:
        "Explain the main responsibilities, skills and expectations you understand about the position.",
      tip:
        "Read the job description carefully before attending the interview.",
    },
    {
      id: "common-14",
      number: "14",
      question: "What do you know about our company?",
      answer:
        "Mention the company's main work, products or services, industry and anything relevant to the position.",
      tip:
        "Research the company's official website and job description.",
    },
    {
      id: "common-15",
      number: "15",
      question: "How do you handle pressure?",
      answer:
        "Explain how you stay organized, prioritize important tasks and remain calm while completing your responsibilities.",
      tip:
        "Give a real example if possible.",
    },
    {
      id: "common-16",
      number: "16",
      question: "How do you manage your time?",
      answer:
        "Explain that you prioritize tasks, create a schedule, set deadlines and focus on important work first.",
      tip:
        "Mention a method you actually use.",
    },
    {
      id: "common-17",
      number: "17",
      question: "How do you prioritize your work?",
      answer:
        "Consider deadlines, importance, dependencies and the impact of each task before deciding what to complete first.",
      tip:
        "Show that you can organize your responsibilities logically.",
    },
    {
      id: "common-18",
      number: "18",
      question: "Do you prefer working independently or in a team?",
      answer:
        "Explain that you are comfortable working independently when required and collaborating with a team when the task needs teamwork.",
      tip:
        "Show flexibility rather than rejecting either option.",
    },
    {
      id: "common-19",
      number: "19",
      question: "How do you handle disagreements with teammates?",
      answer:
        "Listen to the other person's point of view, discuss the issue calmly and try to find a solution that supports the project.",
      tip:
        "Focus on solving the problem rather than winning an argument.",
    },
    {
      id: "common-20",
      number: "20",
      question: "How do you learn a new skill?",
      answer:
        "Explain how you use courses, documentation, videos, practice projects, tutorials or guidance from experienced people.",
      tip:
        "Give an example of a skill you recently learned.",
    },
    {
      id: "common-21",
      number: "21",
      question: "How do you respond to feedback?",
      answer:
        "Listen carefully, understand the feedback and use it to improve your work.",
      tip:
        "Show that you see constructive feedback as an opportunity to improve.",
    },
    {
      id: "common-22",
      number: "22",
      question: "Tell me about a challenge you faced.",
      answer:
        "Describe the challenge, explain what you did to handle it and share the result or lesson you learned.",
      tip:
        "Use the STAR structure when answering this type of question.",
    },
    {
      id: "common-23",
      number: "23",
      question: "Tell me about a mistake you made and what you learned.",
      answer:
        "Briefly describe a genuine mistake, explain how you corrected it and what you changed afterward to avoid repeating it.",
      tip:
        "Focus more on the lesson and improvement than the mistake itself.",
    },
    {
      id: "common-24",
      number: "24",
      question: "What achievement are you most proud of?",
      answer:
        "Choose an academic, project, personal or professional achievement and explain why it was important to you.",
      tip:
        "Explain your contribution and what the experience taught you.",
    },
    {
      id: "common-25",
      number: "25",
      question: "Tell me about a project you completed.",
      answer:
        "Explain the project's purpose, problem, technologies or methods used, your contribution, important features and what you learned.",
      tip:
        "Be prepared for follow-up questions about your project.",
    },
    {
      id: "common-26",
      number: "26",
      question: "What was your role in your project or internship?",
      answer:
        "Clearly explain the tasks you personally handled and the responsibilities you completed.",
      tip:
        "Do not claim work that you did not actually perform.",
    },
    {
      id: "common-27",
      number: "27",
      question: "What did you learn from your project or internship?",
      answer:
        "Mention technical skills, communication, teamwork, problem-solving, time management or other useful lessons.",
      tip:
        "Connect your learning to your future career.",
    },
    {
      id: "common-28",
      number: "28",
      question: "What are your salary expectations?",
      answer:
        "You can explain that you are looking for a fair opportunity based on the role, responsibilities, skills and market standards, while remaining open to discussion.",
      tip:
        "Research the role and level before discussing a specific amount.",
    },
    {
      id: "common-29",
      number: "29",
      question: "Are you willing to learn new technologies or skills?",
      answer:
        "Yes. Explain that you are willing to learn because continuous learning helps you adapt to new responsibilities and improve your performance.",
      tip:
        "Mention an example of something new you have already learned.",
    },
    {
      id: "common-30",
      number: "30",
      question: "Do you have any questions for us?",
      answer:
        "You can ask about the role, responsibilities, team structure, training, learning opportunities or what success looks like in the position.",
      tip:
        "Always keep at least one professional question ready.",
    },
  ];

  // =====================================================
  // HR QUESTIONS
  // =====================================================

  const hrQuestions = [
    {
      id: "hr-1",
      number: "HR 01",
      question: "How would you describe yourself?",
      answer:
        "Give a short professional description based on your education, skills, personality and career interests.",
      tip:
        "Choose qualities that are relevant to the workplace.",
    },
    {
      id: "hr-2",
      number: "HR 02",
      question: "How do you handle criticism?",
      answer:
        "Listen carefully, understand the feedback and use it to improve instead of taking it personally.",
      tip:
        "Show maturity and willingness to improve.",
    },
    {
      id: "hr-3",
      number: "HR 03",
      question: "How do you handle conflict?",
      answer:
        "Understand both sides, communicate respectfully and work toward a practical solution.",
      tip:
        "Focus on resolution and professionalism.",
    },
    {
      id: "hr-4",
      number: "HR 04",
      question: "What kind of work environment do you prefer?",
      answer:
        "Describe an environment where people communicate respectfully, collaborate and have opportunities to learn.",
      tip:
        "Avoid making unrealistic demands.",
    },
    {
      id: "hr-5",
      number: "HR 05",
      question: "What makes you different from other candidates?",
      answer:
        "Talk about your combination of skills, learning attitude, projects, experiences and personal strengths.",
      tip:
        "Support your answer with evidence.",
    },
    {
      id: "hr-6",
      number: "HR 06",
      question: "How do you deal with failure?",
      answer:
        "Understand what went wrong, learn from it, make improvements and try again with a better approach.",
      tip:
        "Show resilience and learning.",
    },
    {
      id: "hr-7",
      number: "HR 07",
      question: "What does success mean to you?",
      answer:
        "Success can mean achieving goals, continuously improving, learning new skills and making a useful contribution.",
      tip:
        "Give an answer that reflects your genuine values.",
    },
    {
      id: "hr-8",
      number: "HR 08",
      question: "How would your classmates or teammates describe you?",
      answer:
        "Mention positive qualities such as dependable, cooperative, responsible, creative or helpful, with an example.",
      tip:
        "Choose qualities people who know you would realistically mention.",
    },
    {
      id: "hr-9",
      number: "HR 09",
      question: "How do you handle tight deadlines?",
      answer:
        "Break the work into smaller tasks, prioritize the most important parts and track progress against the deadline.",
      tip:
        "Mention a real academic or project example if possible.",
    },
    {
      id: "hr-10",
      number: "HR 10",
      question: "Why should we trust you with responsibility?",
      answer:
        "Explain that you take responsibilities seriously, communicate when there is a problem and complete assigned work honestly.",
      tip:
        "Use examples from projects, college or internships.",
    },
  ];

  // =====================================================
  // TECHNICAL QUESTIONS
  // =====================================================

  const technicalQuestions = [
    {
      id: "technical-1",
      number: "TECH 01",
      question: "How would you explain a technical concept to a beginner?",
      answer:
        "Start with a simple definition, use an everyday example and then gradually explain the more technical details.",
      tip:
        "The interviewer is checking your understanding and communication skills.",
    },
    {
      id: "technical-2",
      number: "TECH 02",
      question: "How do you approach solving a problem?",
      answer:
        "First understand the problem, break it into smaller parts, identify possible solutions, test the solution and review the result.",
      tip:
        "Explain your thinking process clearly.",
    },
    {
      id: "technical-3",
      number: "TECH 03",
      question: "What do you do when you don't know the answer?",
      answer:
        "Be honest that you do not know, explain what you understand and describe how you would find or learn the correct answer.",
      tip:
        "Do not invent an answer just to appear knowledgeable.",
    },
    {
      id: "technical-4",
      number: "TECH 04",
      question: "How do you learn new technology?",
      answer:
        "Use official documentation, tutorials, courses and practical projects to understand and apply the technology.",
      tip:
        "Mention a technology you recently learned.",
    },
    {
      id: "technical-5",
      number: "TECH 05",
      question: "How do you test your work?",
      answer:
        "Check expected results, test different inputs or situations, identify errors and make corrections before final delivery.",
      tip:
        "Give an example related to your field.",
    },
    {
      id: "technical-6",
      number: "TECH 06",
      question: "What is the importance of documentation?",
      answer:
        "Documentation helps people understand how a system, project or process works and makes future maintenance and collaboration easier.",
      tip:
        "Mention that good documentation saves time.",
    },
    {
      id: "technical-7",
      number: "TECH 07",
      question: "How do you debug or find an error?",
      answer:
        "Reproduce the problem, check the relevant section, identify the cause, make a controlled change and test the result.",
      tip:
        "Explain your process rather than simply saying you fix errors.",
    },
    {
      id: "technical-8",
      number: "TECH 08",
      question: "How do you decide which tool or technology to use?",
      answer:
        "Consider the project requirements, complexity, available resources, compatibility, performance and maintainability.",
      tip:
        "The right technology depends on the problem.",
    },
    {
      id: "technical-9",
      number: "TECH 09",
      question: "How do you keep your technical skills updated?",
      answer:
        "Follow reliable learning resources, practice regularly, build projects and review updates related to your field.",
      tip:
        "Mention specific learning habits.",
    },
    {
      id: "technical-10",
      number: "TECH 10",
      question: "Explain one project you are technically proud of.",
      answer:
        "Explain the problem, solution, tools or technologies used, your contribution, challenges and final result.",
      tip:
        "Be ready for detailed follow-up questions.",
    },
  ];

  // =====================================================
  // FRESHER QUESTIONS
  // =====================================================

  const fresherQuestions = [
    {
      id: "fresher-1",
      number: "FR 01",
      question: "You are a fresher, so why should we hire you?",
      answer:
        "Explain your education, relevant skills, projects, willingness to learn and ability to adapt to a professional environment.",
      tip:
        "Focus on potential, preparation and transferable skills.",
    },
    {
      id: "fresher-2",
      number: "FR 02",
      question: "Do you have any work experience?",
      answer:
        "If you have no formal experience, discuss academic projects, internships, volunteering, certifications or practical work.",
      tip:
        "Projects and practical learning can demonstrate useful skills.",
    },
    {
      id: "fresher-3",
      number: "FR 03",
      question: "Why don't you have internship experience?",
      answer:
        "Give an honest explanation and focus on what you did during that period to develop your knowledge and skills.",
      tip:
        "Avoid making excuses. Focus on what you learned.",
    },
    {
      id: "fresher-4",
      number: "FR 04",
      question: "What did you learn during college?",
      answer:
        "Mention subject knowledge, projects, teamwork, presentations, problem-solving and other practical experiences.",
      tip:
        "Connect college learning with workplace skills.",
    },
    {
      id: "fresher-5",
      number: "FR 05",
      question: "Are you comfortable learning from senior employees?",
      answer:
        "Yes. Explain that guidance from experienced professionals can help you understand industry practices and improve your skills.",
      tip:
        "Show respect for learning and teamwork.",
    },
    {
      id: "fresher-6",
      number: "FR 06",
      question: "How will you adjust to a professional environment?",
      answer:
        "By learning workplace expectations, communicating professionally, managing time and taking feedback from experienced team members.",
      tip:
        "Show adaptability.",
    },
    {
      id: "fresher-7",
      number: "FR 07",
      question: "What if you are given a task you have never done before?",
      answer:
        "First understand the requirements, research the topic, ask relevant questions and then complete the task step by step.",
      tip:
        "Show that you can learn independently.",
    },
    {
      id: "fresher-8",
      number: "FR 08",
      question: "What are your expectations from your first job?",
      answer:
        "You can mention practical learning, professional experience, teamwork, skill development and opportunities to contribute.",
      tip:
        "Keep expectations realistic.",
    },
    {
      id: "fresher-9",
      number: "FR 09",
      question: "Are you willing to work with people from different backgrounds?",
      answer:
        "Yes. Working with different people can provide new perspectives and improve communication and teamwork.",
      tip:
        "Show respect and adaptability.",
    },
    {
      id: "fresher-10",
      number: "FR 10",
      question: "What can you contribute as a fresher?",
      answer:
        "You can contribute your current knowledge, fresh ideas, willingness to learn, energy, responsibility and project experience.",
      tip:
        "Do not underestimate your academic and project experience.",
    },
  ];

  // =====================================================
  // CATEGORY DATA
  // =====================================================

  const questionCategories = {
    Common: commonQuestions,
    HR: hrQuestions,
    Technical: technicalQuestions,
    Fresher: fresherQuestions,
  };

  const currentQuestions = questionCategories[activeCategory];

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredQuestions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return currentQuestions;
    }

    return currentQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(search) ||
        item.answer.toLowerCase().includes(search)
    );
  }, [activeCategory, searchTerm]);

  // =====================================================
  // TOGGLE ANSWER
  // =====================================================

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  // =====================================================
  // MARK PRACTISED
  // =====================================================

  const togglePractised = (id) => {
    setPractisedQuestions((previous) => {
      if (previous.includes(id)) {
        return previous.filter((questionId) => questionId !== id);
      }

      return [...previous, id];
    });
  };

  // =====================================================
  // RANDOM QUESTION
  // =====================================================

  const handleRandomQuestion = () => {
    if (currentQuestions.length === 0) return;

    const randomIndex = Math.floor(
      Math.random() * currentQuestions.length
    );

    const selected = currentQuestions[randomIndex];

    setRandomQuestionId(selected.id);
    setOpenQuestion(selected.id);

    setTimeout(() => {
      const element = document.getElementById(
        `question-${selected.id}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  return (
    <div className="interview-prep-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="scholarship-header">

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
          className="scholarship-back"
        >
          ← Dashboard
        </Link>

      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="interview-prep-hero">

        <div className="interview-prep-hero-icon">
          💬
        </div>

        <div>

          <span className="interview-prep-tag">
            CAREER PREPARATION
          </span>

          <h1>
            Interview Preparation
          </h1>

          <p>
            Practise common interview questions, improve your communication
            and prepare confidently for your first interview.
          </p>

        </div>

      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="interview-prep-container">

        {/* INTRO */}

        <section className="interview-intro">

          <span className="interview-section-number">
            01
          </span>

          <div>

            <h2>
              Prepare Before Your Interview
            </h2>

            <p>
              Good preparation helps you answer questions clearly and
              present your skills, projects and experience confidently.
            </p>

          </div>

        </section>

        {/* =================================================
            QUESTION PRACTICE
        ================================================= */}

        <section className="interview-section">

          <div className="interview-section-title">

            <span>💡</span>

            <div>

              <h2>
                Interview Question Practice
              </h2>

              <p>
                Choose a category and practise questions with sample
                answers and useful tips.
              </p>

            </div>

          </div>

          {/* CATEGORY BUTTONS */}

          <div className="interview-category-buttons">

            <button
              type="button"
              className={
                activeCategory === "Common"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveCategory("Common");
                setOpenQuestion(null);
                setSearchTerm("");
                setRandomQuestionId(null);
              }}
            >
              📝 Common Questions
            </button>

            <button
              type="button"
              className={
                activeCategory === "HR"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveCategory("HR");
                setOpenQuestion(null);
                setSearchTerm("");
                setRandomQuestionId(null);
              }}
            >
              👔 HR Preparation
            </button>

            <button
              type="button"
              className={
                activeCategory === "Technical"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveCategory("Technical");
                setOpenQuestion(null);
                setSearchTerm("");
                setRandomQuestionId(null);
              }}
            >
              💻 Technical Preparation
            </button>

            <button
              type="button"
              className={
                activeCategory === "Fresher"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveCategory("Fresher");
                setOpenQuestion(null);
                setSearchTerm("");
                setRandomQuestionId(null);
              }}
            >
              🎓 Fresher Preparation
            </button>

          </div>

          {/* SEARCH + RANDOM */}

          <div className="interview-practice-tools">

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="🔎 Search interview questions..."
              className="interview-search-input"
            />

            <button
              type="button"
              className="interview-random-button"
              onClick={handleRandomQuestion}
            >
              🎲 Random Question
            </button>

          </div>

          {/* CATEGORY INFORMATION */}

          <div className="interview-category-info">

            <strong>
              {activeCategory === "Common"
                ? "30 Common Interview Questions"
                : activeCategory === "HR"
                ? "HR Interview Preparation"
                : activeCategory === "Technical"
                ? "Technical Interview Preparation"
                : "Fresher Interview Preparation"}
            </strong>

            <span>
              {filteredQuestions.length} question
              {filteredQuestions.length !== 1 ? "s" : ""} available
            </span>

          </div>

          {/* QUESTIONS */}

          <div className="interview-question-grid">

            {filteredQuestions.length === 0 ? (

              <div className="interview-no-results">

                <span>🔍</span>

                <h3>
                  No questions found
                </h3>

                <p>
                  Try another search term.
                </p>

              </div>

            ) : (

              filteredQuestions.map((item) => {

                const isOpen =
                  openQuestion === item.id;

                const isPractised =
                  practisedQuestions.includes(item.id);

                const isRandom =
                  randomQuestionId === item.id;

                return (
                  <div
                    id={`question-${item.id}`}
                    key={item.id}
                    className={`interview-question-card ${
                      isOpen
                        ? "interview-question-open"
                        : ""
                    } ${
                      isRandom
                        ? "interview-random-selected"
                        : ""
                    } ${
                      isPractised
                        ? "interview-question-practised"
                        : ""
                    }`}
                  >

                    {/* QUESTION NUMBER */}

                    <div className="interview-question-top">

                      <span>
                        {item.number}
                      </span>

                      {isPractised && (
                        <small>
                          ✓ Practised
                        </small>
                      )}

                    </div>

                    {/* QUESTION */}

                    <h3>
                      {item.question}
                    </h3>

                    {/* SHORT GUIDANCE */}

                    <p>
                      Think about your own experience before
                      reading the sample answer.
                    </p>

                    {/* BUTTONS */}

                    <div className="interview-question-actions">

                      <button
                        type="button"
                        className="interview-view-answer-button"
                        onClick={() =>
                          toggleQuestion(item.id)
                        }
                      >
                        {isOpen
                          ? "Hide Answer ↑"
                          : "Show Answer ↓"}
                      </button>

                      <button
                        type="button"
                        className={`interview-practised-button ${
                          isPractised
                            ? "practised"
                            : ""
                        }`}
                        onClick={() =>
                          togglePractised(item.id)
                        }
                      >
                        {isPractised
                          ? "✓ Practised"
                          : "Mark as Practised"}
                      </button>

                    </div>

                    {/* ANSWER */}

                    {isOpen && (

                      <div className="interview-answer-tip">

                        <div className="interview-answer-label">
                          💬 Sample Answer
                        </div>

                        <p>
                          {item.answer}
                        </p>

                        <div className="interview-tip-label">
                          💡 Interview Tip
                        </div>

                        <p>
                          {item.tip}
                        </p>

                      </div>

                    )}

                  </div>
                );
              })

            )}

          </div>

        </section>

        {/* =================================================
            PRACTICE PROGRESS
        ================================================= */}

        <section className="interview-progress-section">

          <div>

            <span>
              PRACTICE PROGRESS
            </span>

            <h2>
              Keep practising
            </h2>

            <p>
              You have marked{" "}
              <strong>
                {practisedQuestions.length}
              </strong>{" "}
              question
              {practisedQuestions.length !== 1
                ? "s"
                : ""}{" "}
              as practised.
            </p>

          </div>

          <div className="interview-progress-number">
            {practisedQuestions.length}
          </div>

        </section>

        {/* =================================================
            INTERVIEW TIPS
        ================================================= */}

        <section className="interview-tips-section">

          <div className="interview-tips-icon">
            🎯
          </div>

          <div className="interview-tips-content">

            <span>
              IMPORTANT TIPS
            </span>

            <h2>
              How to Perform Better in an Interview
            </h2>

            <div className="interview-tips-grid">

              <div>
                <strong>01</strong>
                <p>
                  Listen carefully before answering.
                </p>
              </div>

              <div>
                <strong>02</strong>
                <p>
                  Speak clearly and confidently.
                </p>
              </div>

              <div>
                <strong>03</strong>
                <p>
                  Use examples from your projects.
                </p>
              </div>

              <div>
                <strong>04</strong>
                <p>
                  Be honest about what you know.
                </p>
              </div>

              <div>
                <strong>05</strong>
                <p>
                  Research the company before the interview.
                </p>
              </div>

              <div>
                <strong>06</strong>
                <p>
                  Dress professionally and arrive on time.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            STAR ANSWER STRUCTURE
        ================================================= */}

        <section className="interview-answer-section">

          <div className="interview-section-title">

            <span>🧩</span>

            <div>

              <h2>
                STAR Answer Structure
              </h2>

              <p>
                Use this simple structure for experience,
                challenge and project-based questions.
              </p>

            </div>

          </div>

          <div className="interview-answer-grid">

            <div className="interview-answer-card">

              <strong>01</strong>

              <h3>
                Situation
              </h3>

              <p>
                Explain the situation or problem.
              </p>

            </div>

            <div className="interview-answer-card">

              <strong>02</strong>

              <h3>
                Task
              </h3>

              <p>
                Explain what you needed to accomplish.
              </p>

            </div>

            <div className="interview-answer-card">

              <strong>03</strong>

              <h3>
                Action
              </h3>

              <p>
                Explain what you personally did.
              </p>

            </div>

            <div className="interview-answer-card">

              <strong>04</strong>

              <h3>
                Result
              </h3>

              <p>
                Explain the result or what you learned.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            INTERVIEW DAY CHECKLIST
        ================================================= */}

        <section className="interview-checklist-section">

          <div className="interview-section-title">

            <span>✅</span>

            <div>

              <h2>
                Interview Day Checklist
              </h2>

              <p>
                Quickly check these things before attending
                your interview.
              </p>

            </div>

          </div>

          <div className="interview-checklist-grid">

            <div>
              ✅ Updated resume
            </div>

            <div>
              ✅ Formal or professional outfit
            </div>

            <div>
              ✅ Company research completed
            </div>

            <div>
              ✅ Project explanation prepared
            </div>

            <div>
              ✅ Technical skills revised
            </div>

            <div>
              ✅ Questions prepared for interviewer
            </div>

          </div>

        </section>

        {/* =================================================
            NEXT STEP
        ================================================= */}

        <section className="interview-next-section">

          <div className="interview-next-icon">
            🚀
          </div>

          <div>

            <span>
              READY FOR THE NEXT STEP?
            </span>

            <h2>
              Build your skills and explore opportunities
            </h2>

            <p>
              Continue improving your skills and discover
              internships, hackathons and other career
              opportunities.
            </p>

            <div className="interview-next-actions">

              <Link
                to="/skills-roadmap"
                className="interview-primary-button"
              >
                View Skills Roadmap →
              </Link>

              <Link
                to="/opportunities"
                className="interview-secondary-button"
              >
                Explore Opportunities →
              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="interview-prep-footer">

        <p>
          © 2026 CareerScholarshipPlatform
        </p>

        <p>
          Helping students prepare for their career.
        </p>

      </footer>

    </div>
  );
}

export default InterviewPrep;