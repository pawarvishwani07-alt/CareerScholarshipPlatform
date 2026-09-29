import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  /* =========================================================
     GET LOGGED-IN STUDENT
  ========================================================= */

  const [student] = useState(() => {
    try {
      const savedStudent = localStorage.getItem("student");

      return savedStudent
        ? JSON.parse(savedStudent)
        : null;
    } catch (error) {
      console.error("Unable to read student data:", error);
      return null;
    }
  });


  /* =========================================================
     LOGOUT
     Only goes to Home
  ========================================================= */

  const handleLogout = () => {
    navigate("/");
  };


  return (
    <div className="dashboard-page">


      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="dashboard-header">

        <div className="dashboard-header-left">

          {/* LOGO */}

          <div className="dashboard-logo">
            <img
              src="/CareerScholarshipPlatform-logo-transparent.png"
              alt="Career Scholarship Platform"
            />
          </div>


          {/* HEADER TITLE */}

          <div className="dashboard-header-title">

            <span>
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back!
            </h1>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="dashboard-header-right">


          {/* STUDENT PROFILE */}

          <div className="dashboard-profile">

            <div className="profile-avatar">

              {student?.full_name
                ? student.full_name
                    .charAt(0)
                    .toUpperCase()
                : "S"}

            </div>


            <div className="profile-info">

              <strong>
                {student?.full_name || "Student"}
              </strong>

              <span>
  {student?.education_level === "after10"
    ? "After 10th"
    : student?.education_level === "after12"
    ? "After 12th"
    : student?.education_level === "graduation"
    ? "Graduation"
    : student?.education_level === "postgraduation"
    ? "Post Graduation"
    : "My Profile"}
</span>

            </div>

          </div>


          {/* LOGOUT */}

          <button
            type="button"
            className="dashboard-logout-top"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>



      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="dashboard-main">


        {/* =====================================================
            DASHBOARD INTRO
        ===================================================== */}

        <section className="dashboard-intro">

          <div>

            <p className="dashboard-small-text">
              YOUR CAREER JOURNEY
            </p>

            <h2>
              Let's plan your next step.
            </h2>

            <p className="dashboard-subtitle">
              Explore careers, build skills, find opportunities
              and prepare yourself for your future career.
            </p>

          </div>


          <Link
            to="/career-explorer"
            className="dashboard-primary-btn"
          >
            Start Career Exploration →
          </Link>

        </section>



        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span className="dashboard-section-tag">
                EXPLORE
              </span>

              <h2>
                What would you like to do?
              </h2>

            </div>

          </div>


          <div className="quick-actions-grid">


            {/* CAREER EXPLORER */}

            <div className="quick-action-card purple-card">

              <div className="quick-action-icon">
                🧭
              </div>

              <h3>
                Career Explorer
              </h3>

              <p>
                Explore career paths, education requirements,
                skills and possible opportunities.
              </p>

              <Link
                to="/career-explorer"
                className="dashboard-card-link"
              >
                Explore Careers →
              </Link>

            </div>



            {/* CAREER QUIZ */}

            <div className="quick-action-card blue-card">

              <div className="quick-action-icon">
                🎯
              </div>

              <h3>
                Career Quiz
              </h3>

              <p>
                Discover career areas based on your interests,
                strengths and preferences.
              </p>

              <Link
                to="/career-quiz"
                className="dashboard-card-link"
              >
                Play Career Quiz →
              </Link>

            </div>



            {/* OPPORTUNITIES */}

            <div className="quick-action-card orange-card">

              <div className="quick-action-icon">
                🚀
              </div>

              <h3>
                Opportunities
              </h3>

              <p>
                Discover internships, jobs, certifications,
                competitions and other opportunities.
              </p>

              <Link
                to="/opportunities"
                className="dashboard-card-link"
              >
                Explore Opportunities →
              </Link>

            </div>



            {/* SKILLS & ROADMAP */}

            <div className="quick-action-card purple-card">

              <div className="quick-action-icon">
                📚
              </div>

              <h3>
                My Skills & Roadmap
              </h3>

              <p>
                Track your skills, follow your roadmap and
                build your career step by step.
              </p>

              <Link
                to="/skills-roadmap"
                className="dashboard-card-link"
              >
                Open Roadmap →
              </Link>

            </div>

            {/* SCHOLARSHIP MATCHER */}

<div className="quick-action-card green-card">

  <div className="quick-action-icon">
    💰
  </div>

  <h3>
    Scholarship Matcher
  </h3>

  <p>
    Find scholarships based on your education, course,
    category and eligibility.
  </p>

  <Link
    to="/scholarships"
    className="dashboard-card-link"
  >
    Find Scholarships →
  </Link>

</div>

{/* SAVED TRACKER */}

<div className="quick-action-card blue-card">

  <div className="quick-action-icon">
    🔖
  </div>

  <h3>
    Saved Tracker
  </h3>

  <p>
    View your saved careers, scholarships and opportunities
    and keep track of your important items.
  </p>

  <Link
    to="/saved-tracker"
    className="dashboard-card-link"
  >
    View Saved Items →
  </Link>

</div>
          </div>

        </section>



        {/* =====================================================
            CONFUSED ABOUT CAREER
        ===================================================== */}

        <section className="confused-card">

          <div className="confused-icon">
            💭
          </div>

          <div className="confused-content">

            <span>
              NEED HELP CHOOSING?
            </span>

            <h2>
              I'm confused about my career
            </h2>

            <p>
              Answer a few simple questions and explore career
              areas, useful skills and possible next steps.
            </p>

            <Link
              to="/career-quiz"
              className="dashboard-card-link"
            >
              Start with Career Quiz →
            </Link>

          </div>

        </section>



        {/* =====================================================
            CAREER JOURNEY + AI
        ===================================================== */}

        <section className="dashboard-two-column">


          {/* CAREER JOURNEY */}

          <div className="dashboard-panel">

            <div className="panel-heading">

              <div>

                <span>
                  MY PROGRESS
                </span>

                <h2>
                  Career Journey
                </h2>

              </div>

              <strong>
                75%
              </strong>

            </div>


            <div className="progress-bar">

              <div className="progress-fill"></div>

            </div>


            <p className="progress-text">
              You're making good progress. Continue exploring
              your career options and building your skills.
            </p>


            <div className="journey-list">

              <div className="journey-item completed">

                <span>
                  ✓
                </span>

                <p>
                  Complete your profile
                </p>

              </div>


              <div className="journey-item completed">

                <span>
                  ✓
                </span>

                <p>
                  Explore career options
                </p>

              </div>


              <div className="journey-item">

                <span>
                  3
                </span>

                <p>
                  Complete Career Quiz
                </p>

              </div>


              <div className="journey-item">

                <span>
                  4
                </span>

                <p>
                  Create your career roadmap
                </p>

              </div>

            </div>

          </div>



          {/* AI CAREER BUDDY */}

          <div className="dashboard-panel ai-panel">

            <div className="ai-icon">
              🤖
            </div>

            <span className="ai-label">
              AI CAREER BUDDY
            </span>

            <h2>
              Have a career question?
            </h2>

            <p>
              Ask about careers, skills, scholarships,
              internships, resumes, interviews, projects
              and your next step.
            </p>

            <p className="ai-buddy-note">
              Use the AI Buddy button on the screen to start a chat.
            </p>

          </div>

        </section>



        {/* =====================================================
            CAREER TOOLS
        ===================================================== */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span className="dashboard-section-tag">
                SMART TOOLS
              </span>

              <h2>
                Career Tools
              </h2>

            </div>

          </div>


          <div className="quick-actions-grid">


            {/* SKILL GAP ANALYZER */}

            <div className="quick-action-card purple-card">

              <div className="quick-action-icon">
                🧩
              </div>

              <h3>
                Skill Gap Analyzer
              </h3>

              <p>
                Compare your current skills with the skills needed
                for your target career and discover what to learn next.
              </p>

              <Link
                to="/skill-gap"
                className="dashboard-card-link"
              >
                Analyze My Skills →
              </Link>

            </div>

          </div>

        </section>



        {/* =====================================================
            CAREER PREPARATION
        ===================================================== */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span className="dashboard-section-tag">
                GET READY
              </span>

              <h2>
                Career Preparation
              </h2>

            </div>

          </div>


          <div className="preparation-grid">


            {/* RESUME */}

            <div className="preparation-card">

              <span>
                📄
              </span>

              <div>

                <h3>
                  Resume Builder
                </h3>

                <p>
                  Create a professional student resume.
                </p>

              </div>

              <Link
                to="/resume-prep"
                className="preparation-open-button"
              >
                Open →
              </Link>

            </div>



            {/* INTERVIEW */}

            <div className="preparation-card">

              <span>
                💬
              </span>

              <div>

                <h3>
                  Interview Preparation
                </h3>

                <p>
                  Practice common interview questions and tips.
                </p>

              </div>

              <Link
                to="/interview-prep"
                className="preparation-open-button"
              >
                Open →
              </Link>

            </div>



            {/* PORTFOLIO */}

            <div className="preparation-card">

              <span>
                🌐
              </span>

              <div>

                <h3>
                  Portfolio Guide
                </h3>

                <p>
                  Learn how to showcase your projects and skills.
                </p>

              </div>

              <Link
                to="/portfolio-guide"
                className="preparation-open-button"
              >
                Open →
              </Link>

            </div>

          </div>

        </section>



        {/* =====================================================
            SAVED & UPCOMING
        ===================================================== */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span className="dashboard-section-tag">
                STAY ON TRACK
              </span>

              <h2>
                Saved & Upcoming
              </h2>

            </div>

            <Link
              to="/saved-tracker"
              className="view-all-btn"
            >
              View All →
            </Link>

          </div>


          <div className="deadline-grid">


            {/* SCHOLARSHIP */}

            <div className="deadline-card">

              <div className="deadline-date">

                <strong>
                  15
                </strong>

                <span>
                  OCT
                </span>

              </div>


              <div>

                <span className="deadline-type">
                  SCHOLARSHIP
                </span>

                <h3>
                  Scholarship Application
                </h3>

                <p>
                  Application deadline approaching
                </p>

              </div>


              <span className="deadline-status">
                Soon
              </span>

            </div>



            {/* INTERNSHIP */}

            <div className="deadline-card">

              <div className="deadline-date">

                <strong>
                  22
                </strong>

                <span>
                  OCT
                </span>

              </div>


              <div>

                <span className="deadline-type">
                  INTERNSHIP
                </span>

                <h3>
                  Internship Application
                </h3>

                <p>
                  Saved opportunity
                </p>

              </div>


              <span className="deadline-status">
                Upcoming
              </span>

            </div>

          </div>

        </section>



        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="dashboard-footer">

          <div>

            <strong>
              Career<span>Scholarship</span>
            </strong>

            <p>
              Helping students make informed career decisions.
            </p>

          </div>


          <p>
            © 2026 CareerScholarshipPlatform
          </p>

        </footer>

      </main>

    </div>
  );
}

export default Dashboard;