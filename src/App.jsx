import { Routes, Route, Link } from "react-router-dom";

import CareerExplorer from "./pages/CareerExplorer/CareerExplorer";
import ScholarshipMatcher from "./pages/ScholarshipMatcher/ScholarshipMatcher";
import CareerQuiz from "./pages/CareerQuiz/CareerQuiz";
import Opportunities from "./pages/Opportunities/Opportunities";
import SkillsRoadmap from "./pages/SkillsRoadmap/SkillsRoadmap";
import ResumePrep from "./pages/ResumePrep/ResumePrep";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import PortfolioGuide from "./pages/PortfolioGuide/PortfolioGuide";
import SavedTracker from "./pages/SavedTracker/SavedTracker";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer/SkillGapAnalyzer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import "./App.css";


function Home() {
  return (
    <div className="home-page">

      {/* HEADER */}
      <header className="home-header">

        {/* LOGO */}
        <Link to="/" className="home-logo">
          <img
            src="/CareerScholarshipPlatform-logo-transparent.png"
            alt="Career Scholarship Platform"
            className="website-logo"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="home-nav">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

        </nav>

        {/* BUTTONS */}
        <div className="nav-buttons">

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="register-btn"
          >
            Register
          </Link>

        </div>

      </header>


      {/* MAIN CONTENT */}
      <main>

        {/* HERO */}
        <section
          className="hero"
          id="home"
        >

          <div className="hero-content">

            <p className="hero-tag">
              YOUR FUTURE STARTS HERE
            </p>

            <h1>
              Discover Your <span>Career</span>.
              <br />
              Find Your <span>Opportunity</span>.
            </h1>

            <p className="hero-text">
              Career ScholarshipPlatform helps students explore career
              opportunities, discover scholarships, and make informed
              decisions about their future.
            </p>

            <div className="hero-buttons">

              <Link
                to="/career-explorer"
                className="primary-btn"
              >
                Explore Careers →
              </Link>

              <Link
                to="/scholarships"
                className="secondary-btn"
              >
                Find Scholarships
              </Link>

            </div>

          </div>


          <div className="hero-card">

            <div className="card-icon">
              🎓
            </div>

            <h3>
              Build Your Future
            </h3>

            <p>
              Explore the right career path and opportunities based on
              your education and interests.
            </p>

            <div className="mini-stats">

              <div>
                <strong>
                  100+
                </strong>

                <span>
                  Career Paths
                </span>
              </div>

              <div>
                <strong>
                  50+
                </strong>

                <span>
                  Scholarships
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* ABOUT */}
        <section
          className="intro-section"
          id="about"
        >

          <p className="section-tag">
            ABOUT THE PLATFORM
          </p>

          <h2>
            Your Guide From <span>Education</span> to Career
          </h2>

          <p>
            Choosing a career or finding financial support for education
            can be difficult. Career ScholarshipPlatform brings career
            guidance and scholarship information together in one
            easy-to-use platform.
          </p>

        </section>


        {/* HOW IT WORKS */}
        <section
          className="features"
          id="how-it-works"
        >

          <p className="section-tag">
            HOW IT WORKS
          </p>

          <h2>
            Everything You Need in One Place
          </h2>

          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon">
                🧭
              </div>

              <h3>
                Career Guidance
              </h3>

              <p>
                Explore career paths after 10th, 12th and graduation.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Career Recommendations
              </h3>

              <p>
                Discover career options based on your interests and
                goals.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                💰
              </div>

              <h3>
                Scholarships
              </h3>

              <p>
                Find scholarships and understand their eligibility and
                deadlines.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                📝
              </div>

              <h3>
                Career Quiz
              </h3>

              <p>
                Test your knowledge and learn more about different
                career options.
              </p>

            </div>

          </div>

        </section>


        {/* CAREER PATHS */}
        <section
          className="career-section"
          id="careers"
        >

          <p className="section-tag">
            EXPLORE YOUR PATH
          </p>

          <h2>
            Where Are You in Your Journey?
          </h2>

          <div className="career-grid">

            <div className="career-card">

              <span>
                01
              </span>

              <h3>
                After 10th
              </h3>

              <p>
                Explore Science, Commerce, Arts, Diploma and Vocational
                pathways.
              </p>

              <Link
                to="/career-explorer"
                className="career-explore-button"
              >
                Explore →
              </Link>

            </div>


            <div className="career-card">

              <span>
                02
              </span>

              <h3>
                After 12th
              </h3>

              <p>
                Discover higher education, professional courses and
                career opportunities.
              </p>

              <Link
                to="/career-explorer"
                className="career-explore-button"
              >
                Explore →
              </Link>

            </div>


            <div className="career-card">

              <span>
                03
              </span>

              <h3>
                After Graduation
              </h3>

              <p>
                Explore jobs, higher studies, certifications,
                government careers and entrepreneurship.
              </p>

              <Link
                to="/career-explorer"
                className="career-explore-button"
              >
                Explore →
              </Link>

            </div>

          </div>

        </section>


        {/* SCHOLARSHIP */}
        <section
          className="scholarship-section"
          id="scholarships"
        >

          <div>

            <p className="section-tag">
              SCHOLARSHIP SUPPORT
            </p>

            <h2>
              Don't Let Financial Barriers Stop Your Dreams.
            </h2>

            <p>
              Search for scholarships, check eligibility requirements,
              track deadlines and save opportunities that match your
              education.
            </p>

            <Link
              to="/scholarships"
              className="primary-btn"
            >
              Explore Scholarships →
            </Link>

          </div>


          <div className="scholarship-box">

            <div>
              💰
            </div>

            <h3>
              Find Financial Support
            </h3>

            <p>
              Scholarships can help students continue their education
              and achieve their career goals.
            </p>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer>

        <h3>
          CareerScholarshipPlatform
        </h3>

        <p>
          Empowering students with career guidance and scholarship
          awareness.
        </p>

        <p>
          © 2026 CareerScholarshipPlatform
        </p>

      </footer>

    </div>
  );
}


function App() {

  return (
    <>
    

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/career-explorer"
          element={<CareerExplorer />}
        />

        <Route
          path="/scholarships"
          element={<ScholarshipMatcher />}
        />

        <Route
          path="/career-quiz"
          element={<CareerQuiz />}
        />


        <Route
          path="/opportunities"
          element={<Opportunities />}
        />

        <Route
          path="/skills-roadmap"
          element={<SkillsRoadmap />}
        />

        <Route
          path="/resume-prep"
          element={<ResumePrep />}
        />

        <Route
          path="/interview-prep"
          element={<InterviewPrep />}
        />

        <Route
          path="/portfolio-guide"
          element={<PortfolioGuide />}
        />

        <Route
          path="/saved-tracker"
          element={<SavedTracker />}
        />

        <Route
          path="/skill-gap"
          element={<SkillGapAnalyzer />}
        />


      </Routes>


    </>
  );
}


export default App;