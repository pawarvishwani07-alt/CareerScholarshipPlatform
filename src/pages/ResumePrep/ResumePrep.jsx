import React, { useState } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./ResumePrep.css";

function ResumePrep() {
  const [activeTab, setActiveTab] = useState("resume");

  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    careerTitle: "",
    education: "",
    college: "",
    graduationYear: "",
    skills: "",
    projects: "",
    certifications: "",
    achievements: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setResumeData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearResume = () => {
    setResumeData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      careerTitle: "",
      education: "",
      college: "",
      graduationYear: "",
      skills: "",
      projects: "",
      certifications: "",
      achievements: "",
      linkedin: "",
      github: "",
      portfolio: "",
    });
  };

  const splitItems = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // =====================================================
  // DOWNLOAD RESUME AS PDF
  // =====================================================

  const handleDownloadPDF = async () => {
    const resumeElement = document.querySelector(".resume-preview");

    if (!resumeElement) {
      alert("Resume preview not found.");
      return;
    }

    if (!resumeData.fullName.trim()) {
      alert("Please enter your full name before downloading.");
      return;
    }

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imageWidth = pdfWidth;

      const imageHeight =
        (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(
        imageData,
        "PNG",
        0,
        position,
        imageWidth,
        imageHeight
      );

      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;

        pdf.addPage();

        pdf.addImage(
          imageData,
          "PNG",
          0,
          position,
          imageWidth,
          imageHeight
        );

        heightLeft -= pdfHeight;
      }

      const fileName =
        resumeData.fullName
          .trim()
          .replace(/[^a-zA-Z0-9]+/g, "_") +
        "_Resume.pdf";

      pdf.save(fileName);

    } catch (error) {
      console.error("PDF download error:", error);

      alert(
        "Unable to download the resume. Please try again."
      );
    }
  };

  return (
    <div className="resume-prep-page">

      {/* HEADER */}
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

      {/* HERO */}
      <section className="resume-prep-hero">

        <div className="resume-prep-hero-icon">
          📄
        </div>

        <div>
          <span className="resume-prep-tag">
            CAREER PREPARATION
          </span>

          <h1>
            Resume & Interview Prep
          </h1>

          <p>
            Build a professional student resume, prepare for interviews
            and learn how to present your skills confidently.
          </p>
        </div>

      </section>

      {/* TABS */}
      <main className="resume-prep-container">

        <div className="resume-prep-tabs">

          <button
            className={
              activeTab === "resume"
                ? "active-tab"
                : ""
            }
            onClick={() => setActiveTab("resume")}
          >
            📄 Resume Builder
          </button>

          <button
            className={
              activeTab === "interview"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab("interview")
            }
          >
            💬 Interview Prep
          </button>

          <button
            className={
              activeTab === "portfolio"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab("portfolio")
            }
          >
            🌐 Portfolio Guide
          </button>

        </div>

        {/* =====================================================
            RESUME BUILDER
        ===================================================== */}

        {activeTab === "resume" && (

          <section className="resume-prep-section">

            <div className="resume-section-heading">

              <span>
                01
              </span>

              <div>
                <h2>
                  Build Your Student Resume
                </h2>

                <p>
                  Enter your information and create a professional
                  resume preview.
                </p>
              </div>

            </div>

            <div className="resume-builder-layout">

              {/* FORM */}

              <div className="resume-builder-form">

                {/* PERSONAL DETAILS */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>👤</span>

                    <div>
                      <h3>Personal Details</h3>
                      <p>
                        Add your basic contact information.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-grid">

                    <div className="resume-form-group">

                      <label>
                        Full Name *
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={resumeData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />

                    </div>

                    <div className="resume-form-group">

                      <label>
                        Career / Job Title
                      </label>

                      <input
                        type="text"
                        name="careerTitle"
                        value={resumeData.careerTitle}
                        onChange={handleChange}
                        placeholder="e.g. Web Developer"
                      />

                    </div>

                    <div className="resume-form-group">

                      <label>
                        Email *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={resumeData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />

                    </div>

                    <div className="resume-form-group">

                      <label>
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={resumeData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />

                    </div>

                    <div className="resume-form-group full-width">

                      <label>
                        Location
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={resumeData.location}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai, Maharashtra"
                      />

                    </div>

                  </div>

                </div>

                {/* EDUCATION */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>🎓</span>

                    <div>
                      <h3>Education</h3>

                      <p>
                        Add your current or completed education.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-grid">

                    <div className="resume-form-group">

                      <label>
                        Degree / Course
                      </label>

                      <input
                        type="text"
                        name="education"
                        value={resumeData.education}
                        onChange={handleChange}
                        placeholder="e.g. B.Sc. Computer Science"
                      />

                    </div>

                    <div className="resume-form-group">

                      <label>
                        College / Institute
                      </label>

                      <input
                        type="text"
                        name="college"
                        value={resumeData.college}
                        onChange={handleChange}
                        placeholder="College name"
                      />

                    </div>

                    <div className="resume-form-group">

                      <label>
                        Graduation Year
                      </label>

                      <input
                        type="text"
                        name="graduationYear"
                        value={resumeData.graduationYear}
                        onChange={handleChange}
                        placeholder="e.g. 2026"
                      />

                    </div>

                  </div>

                </div>

                {/* SKILLS */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>💻</span>

                    <div>
                      <h3>Skills</h3>

                      <p>
                        Separate multiple skills using commas.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-group">

                    <label>
                      Technical & Professional Skills
                    </label>

                    <textarea
                      name="skills"
                      value={resumeData.skills}
                      onChange={handleChange}
                      placeholder="React, JavaScript, Python, SQL, Communication"
                      rows="4"
                    />

                  </div>

                </div>

                {/* PROJECTS */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>🚀</span>

                    <div>
                      <h3>Projects</h3>

                      <p>
                        Add your academic or personal projects.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-group">

                    <label>
                      Projects
                    </label>

                    <textarea
                      name="projects"
                      value={resumeData.projects}
                      onChange={handleChange}
                      placeholder="SheCare Website, CareerScholarshipPlatform, Expense Tracker"
                      rows="4"
                    />

                  </div>

                </div>

                {/* CERTIFICATIONS */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>📜</span>

                    <div>
                      <h3>Certifications</h3>

                      <p>
                        Add courses and certifications.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-group">

                    <label>
                      Certifications
                    </label>

                    <textarea
                      name="certifications"
                      value={resumeData.certifications}
                      onChange={handleChange}
                      placeholder="Python Certification, Web Development Course"
                      rows="3"
                    />

                  </div>

                </div>

                {/* ACHIEVEMENTS */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>🏆</span>

                    <div>
                      <h3>Achievements</h3>

                      <p>
                        Mention awards, competitions or achievements.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-group">

                    <label>
                      Achievements
                    </label>

                    <textarea
                      name="achievements"
                      value={resumeData.achievements}
                      onChange={handleChange}
                      placeholder="Hackathon participation, college achievement..."
                      rows="3"
                    />

                  </div>

                </div>

                {/* LINKS */}

                <div className="resume-form-card">

                  <div className="resume-form-title">
                    <span>🔗</span>

                    <div>
                      <h3>Professional Links</h3>

                      <p>
                        Add your online professional profiles.
                      </p>
                    </div>
                  </div>

                  <div className="resume-form-grid">

                    <div className="resume-form-group">

                      <label>
                        LinkedIn
                      </label>

                      <input
                        type="url"
                        name="linkedin"
                        value={resumeData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                      />

                    </div>

                    <div className="resume-form-group">

                      <label>
                        GitHub
                      </label>

                      <input
                        type="url"
                        name="github"
                        value={resumeData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                      />

                    </div>

                    <div className="resume-form-group full-width">

                      <label>
                        Portfolio
                      </label>

                      <input
                        type="url"
                        name="portfolio"
                        value={resumeData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                      />

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="resume-clear-button"
                  onClick={clearResume}
                >
                  Clear Resume
                </button>

                <button
                  type="button"
                  className="resume-download-button"
                  onClick={handleDownloadPDF}
                >
                  📄 Download Resume PDF
                </button>

              </div>

              {/* LIVE PREVIEW */}

              <div className="resume-preview-wrapper">

                <div className="resume-preview-heading">
                  <span>
                    LIVE PREVIEW
                  </span>

                  <h3>
                    Your Resume
                  </h3>
                </div>

                <div className="resume-preview">

                  <div className="resume-preview-header">

                    <h1>
                      {resumeData.fullName ||
                        "Your Name"}
                    </h1>

                    <h2>
                      {resumeData.careerTitle ||
                        "Career / Job Title"}
                    </h2>

                    <p>
                      {[
                        resumeData.email,
                        resumeData.phone,
                        resumeData.location,
                      ]
                        .filter(Boolean)
                        .join(" • ") ||
                        "Email • Phone • Location"}
                    </p>

                  </div>

                  {resumeData.education ||
                  resumeData.college ? (

                    <div className="resume-preview-section">

                      <h3>
                        EDUCATION
                      </h3>

                      <div className="resume-preview-item">

                        <strong>
                          {resumeData.education ||
                            "Degree / Course"}
                        </strong>

                        <p>
                          {resumeData.college}
                          {resumeData.graduationYear &&
                            ` • ${resumeData.graduationYear}`}
                        </p>

                      </div>

                    </div>

                  ) : null}

                  {resumeData.skills && (

                    <div className="resume-preview-section">

                      <h3>
                        SKILLS
                      </h3>

                      <div className="resume-preview-tags">

                        {splitItems(
                          resumeData.skills
                        ).map((skill) => (
                          <span key={skill}>
                            {skill}
                          </span>
                        ))}

                      </div>

                    </div>

                  )}

                  {resumeData.projects && (

                    <div className="resume-preview-section">

                      <h3>
                        PROJECTS
                      </h3>

                      {splitItems(
                        resumeData.projects
                      ).map((project) => (

                        <div
                          className="resume-preview-item"
                          key={project}
                        >

                          <strong>
                            {project}
                          </strong>

                          <p>
                            Academic / personal project demonstrating
                            practical skills and problem-solving.
                          </p>

                        </div>

                      ))}

                    </div>

                  )}

                  {resumeData.certifications && (

                    <div className="resume-preview-section">

                      <h3>
                        CERTIFICATIONS
                      </h3>

                      <ul>
                        {splitItems(
                          resumeData.certifications
                        ).map((certification) => (
                          <li key={certification}>
                            {certification}
                          </li>
                        ))}
                      </ul>

                    </div>

                  )}

                  {resumeData.achievements && (

                    <div className="resume-preview-section">

                      <h3>
                        ACHIEVEMENTS
                      </h3>

                      <ul>
                        {splitItems(
                          resumeData.achievements
                        ).map((achievement) => (
                          <li key={achievement}>
                            {achievement}
                          </li>
                        ))}
                      </ul>

                    </div>

                  )}

                  {(resumeData.linkedin ||
                    resumeData.github ||
                    resumeData.portfolio) && (

                    <div className="resume-preview-section">

                      <h3>
                        PROFESSIONAL LINKS
                      </h3>

                      <div className="resume-preview-links">

                        {resumeData.linkedin && (
                          <a
                            href={resumeData.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            LinkedIn
                          </a>
                        )}

                        {resumeData.github && (
                          <a
                            href={resumeData.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        )}

                        {resumeData.portfolio && (
                          <a
                            href={resumeData.portfolio}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Portfolio
                          </a>
                        )}

                      </div>

                    </div>

                  )}

                  {!resumeData.fullName &&
                    !resumeData.education &&
                    !resumeData.skills &&
                    !resumeData.projects && (

                    <div className="resume-preview-empty">

                      <span>
                        📄
                      </span>

                      <h3>
                        Your resume preview will appear here
                      </h3>

                      <p>
                        Start filling the form to create your resume.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

            <div className="resume-tips-box">

              <h3>
                💡 Resume Tips
              </h3>

              <ul>
                <li>
                  Keep your resume clear and easy to read.
                </li>

                <li>
                  Highlight skills related to the job.
                </li>

                <li>
                  Use your projects to show practical knowledge.
                </li>

                <li>
                  Check spelling and grammar before applying.
                </li>

                <li>
                  Keep your information honest and up to date.
                </li>
              </ul>

            </div>

          </section>
        )}

        {/* =====================================================
            INTERVIEW PREPARATION
        ===================================================== */}

        {activeTab === "interview" && (

          <section className="resume-prep-section">

            <div className="resume-section-heading">

              <span>
                02
              </span>

              <div>
                <h2>
                  Interview Preparation
                </h2>

                <p>
                  Practise common interview questions and improve
                  your confidence.
                </p>
              </div>

            </div>

            <div className="interview-question-grid">

              <div className="interview-question-card">
                <span>01</span>

                <h3>
                  Tell me about yourself.
                </h3>

                <p>
                  Prepare a short introduction covering your education,
                  skills, projects and career interests.
                </p>
              </div>

              <div className="interview-question-card">
                <span>02</span>

                <h3>
                  What are your strengths?
                </h3>

                <p>
                  Mention genuine strengths and support them with
                  examples from your studies or projects.
                </p>
              </div>

              <div className="interview-question-card">
                <span>03</span>

                <h3>
                  Why should we hire you?
                </h3>

                <p>
                  Explain how your skills, learning attitude and
                  projects can contribute to the role.
                </p>
              </div>

              <div className="interview-question-card">
                <span>04</span>

                <h3>
                  What are your career goals?
                </h3>

                <p>
                  Explain the skills and experience you want to develop
                  in the coming years.
                </p>
              </div>

              <div className="interview-question-card">
                <span>05</span>

                <h3>
                  Tell me about your project.
                </h3>

                <p>
                  Explain the problem, technologies used, your role
                  and what you learned.
                </p>
              </div>

              <div className="interview-question-card">
                <span>06</span>

                <h3>
                  Do you have any questions?
                </h3>

                <p>
                  Prepare a few professional questions about the role,
                  team or learning opportunities.
                </p>
              </div>

            </div>

            <div className="interview-tips-box">

              <h3>
                🎯 Interview Tips
              </h3>

              <ul>
                <li>
                  Listen carefully before answering.
                </li>

                <li>
                  Speak clearly and confidently.
                </li>

                <li>
                  Use examples from your projects.
                </li>

                <li>
                  Do not be afraid to say you are still learning.
                </li>

                <li>
                  Research the company before the interview.
                </li>
              </ul>

            </div>

          </section>
        )}

        {/* =====================================================
            PORTFOLIO GUIDE
        ===================================================== */}

        {activeTab === "portfolio" && (

          <section className="resume-prep-section">

            <div className="resume-section-heading">

              <span>
                03
              </span>

              <div>
                <h2>
                  Portfolio Guide
                </h2>

                <p>
                  Learn how to present your projects and skills online.
                </p>
              </div>

            </div>

            <div className="portfolio-guide-grid">

              <div className="portfolio-guide-card">
                <span>👋</span>

                <h3>
                  About You
                </h3>

                <p>
                  Write a short introduction about your education,
                  interests and career goals.
                </p>
              </div>

              <div className="portfolio-guide-card">
                <span>💻</span>

                <h3>
                  Show Your Projects
                </h3>

                <p>
                  Add your best academic and personal projects with
                  descriptions and technologies used.
                </p>
              </div>

              <div className="portfolio-guide-card">
                <span>🛠️</span>

                <h3>
                  Show Your Skills
                </h3>

                <p>
                  List the technical and professional skills you are
                  comfortable using.
                </p>
              </div>

              <div className="portfolio-guide-card">
                <span>🔗</span>

                <h3>
                  Add Your Links
                </h3>

                <p>
                  Add relevant GitHub, LinkedIn or other professional
                  profile links.
                </p>
              </div>

            </div>

            <div className="portfolio-structure-box">

              <h3>
                🌟 Simple Portfolio Structure
              </h3>

              <div className="portfolio-steps">

                <div>
                  <strong>01</strong>
                  <span>Home / Introduction</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>About Me</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Skills</span>
                </div>

                <div>
                  <strong>04</strong>
                  <span>Projects</span>
                </div>

                <div>
                  <strong>05</strong>
                  <span>Education</span>
                </div>

                <div>
                  <strong>06</strong>
                  <span>Contact</span>
                </div>

              </div>

            </div>

          </section>
        )}

        {/* NEXT STEP */}
        <section className="resume-next-section">

          <div className="resume-next-icon">
            🚀
          </div>

          <div>

            <span>
              READY TO GROW?
            </span>

            <h2>
              Build skills and prepare for opportunities
            </h2>

            <p>
              Continue building your skills and explore internships,
              hackathons and other career opportunities.
            </p>

            <div className="resume-next-actions">

              <Link
                to="/skills-roadmap"
                className="resume-primary-button"
              >
                View Skills Roadmap →
              </Link>

              <Link
                to="/opportunities"
                className="resume-secondary-button"
              >
                Explore Opportunities →
              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="resume-prep-footer">

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

export default ResumePrep;