import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API_URL from "../../config";
import "./PortfolioGuide.css";

function PortfolioGuide() {
  const portfolioPreviewRef = useRef(null);

  // =========================================================
  // PORTFOLIO DATA
  // =========================================================

  const [portfolioData, setPortfolioData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    careerGoal: "",
    education: "",
    college: "",
    graduationYear: "",
    skills: "",
    certifications: "",
    achievements: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [projects, setProjects] = useState([
    {
      name: "",
      description: "",
      technology: "",
      role: "",
      result: "",
    },
  ]);

  // =========================================================
  // PORTFOLIO STATUS
  // =========================================================

  const [isLoadingPortfolio, setIsLoadingPortfolio] =
    useState(true);

  const [isSavingPortfolio, setIsSavingPortfolio] =
    useState(false);

  const [hasSavedPortfolio, setHasSavedPortfolio] =
    useState(false);

  // =========================================================
  // GET LOGGED-IN STUDENT ID
  // =========================================================

  const getStudentId = () => {
    const possibleKeys = [
      "studentId",
      "student_id",
      "userId",
      "user_id",
    ];

    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);

      if (
        value &&
        !Number.isNaN(Number(value))
      ) {
        return Number(value);
      }
    }

    const possibleUserKeys = [
      "student",
      "user",
      "loggedInStudent",
      "currentUser",
    ];

    for (const key of possibleUserKeys) {
      const value = localStorage.getItem(key);

      if (!value) {
        continue;
      }

      try {
        const user = JSON.parse(value);

        const id =
          user?.id ??
          user?.student_id ??
          user?.studentId;

        if (
          id &&
          !Number.isNaN(Number(id))
        ) {
          return Number(id);
        }
      } catch (error) {
        console.warn(
          `Unable to read ${key} from localStorage.`
        );
      }
    }

    return null;
  };

  // =========================================================
  // LOAD SAVED PORTFOLIO
  // =========================================================

  useEffect(() => {
    const loadPortfolio = async () => {
      const studentId = getStudentId();

      if (!studentId) {
        console.warn(
          "Student ID not found. Portfolio cannot be loaded."
        );

        setIsLoadingPortfolio(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/portfolio/${studentId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load portfolio."
          );
        }

        if (data.portfolio) {
          const saved = data.portfolio;

          setPortfolioData({
            fullName: saved.full_name || "",
            title: saved.title || "",
            email: saved.email || "",
            phone: saved.phone || "",
            location: saved.location || "",
            about: saved.about || "",
            careerGoal:
              saved.career_goal || "",
            education:
              saved.education || "",
            college:
              saved.college || "",
            graduationYear:
              saved.graduation_year || "",
            skills:
              saved.skills || "",
            certifications:
              saved.certifications || "",
            achievements:
              saved.achievements || "",
            github:
              saved.github || "",
            linkedin:
              saved.linkedin || "",
            portfolio:
              saved.portfolio || "",
          });

          setProjects(
            Array.isArray(saved.projects) &&
              saved.projects.length > 0
              ? saved.projects
              : [
                  {
                    name: "",
                    description: "",
                    technology: "",
                    role: "",
                    result: "",
                  },
                ]
          );

          setHasSavedPortfolio(true);
        }

      } catch (error) {
        console.error(
          "Load portfolio error:",
          error
        );
      } finally {
        setIsLoadingPortfolio(false);
      }
    };

    loadPortfolio();
  }, []);

  // =========================================================
  // HANDLE NORMAL INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPortfolioData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE PROJECT INPUT
  // =========================================================

  const handleProjectChange = (
    index,
    field,
    value
  ) => {
    setProjects((previous) =>
      previous.map(
        (project, projectIndex) =>
          projectIndex === index
            ? {
                ...project,
                [field]: value,
              }
            : project
      )
    );
  };

  // =========================================================
  // ADD PROJECT
  // =========================================================

  const addProject = () => {
    setProjects((previous) => [
      ...previous,
      {
        name: "",
        description: "",
        technology: "",
        role: "",
        result: "",
      },
    ]);
  };

  // =========================================================
  // REMOVE PROJECT
  // =========================================================

  const removeProject = (index) => {
    if (projects.length === 1) {
      return;
    }

    setProjects((previous) =>
      previous.filter(
        (_, projectIndex) =>
          projectIndex !== index
      )
    );
  };

  // =========================================================
  // SPLIT COMMA ITEMS
  // =========================================================

  const splitItems = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // =========================================================
  // SAVE PORTFOLIO
  // =========================================================

  const handleSavePortfolio = async () => {
    const studentId = getStudentId();

    if (!studentId) {
      alert(
        "Please login first before saving your portfolio."
      );
      return;
    }

    if (!portfolioData.fullName.trim()) {
      alert(
        "Please enter your full name before saving."
      );
      return;
    }

    try {
      setIsSavingPortfolio(true);

      const response = await fetch(
        `${API_URL}/api/portfolio`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            student_id: studentId,

            full_name:
              portfolioData.fullName,

            title:
              portfolioData.title,

            email:
              portfolioData.email,

            phone:
              portfolioData.phone,

            location:
              portfolioData.location,

            about:
              portfolioData.about,

            career_goal:
              portfolioData.careerGoal,

            education:
              portfolioData.education,

            college:
              portfolioData.college,

            graduation_year:
              portfolioData.graduationYear,

            skills:
              portfolioData.skills,

            certifications:
              portfolioData.certifications,

            achievements:
              portfolioData.achievements,

            github:
              portfolioData.github,

            linkedin:
              portfolioData.linkedin,

            portfolio:
              portfolioData.portfolio,

            projects,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save portfolio."
        );
      }

      setHasSavedPortfolio(true);

      alert(
        data.message ||
          "Portfolio saved successfully!"
      );

    } catch (error) {
      console.error(
        "Save portfolio error:",
        error
      );

      alert(
        error.message ||
          "Unable to save portfolio. Please try again."
      );

    } finally {
      setIsSavingPortfolio(false);
    }
  };

  // =========================================================
  // DELETE SAVED PORTFOLIO
  // =========================================================

  const handleDeletePortfolio = async () => {
    const studentId = getStudentId();

    if (!studentId) {
      alert("Please login first.");
      return;
    }

    if (!hasSavedPortfolio) {
      alert("No saved portfolio found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your saved portfolio?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/portfolio/${studentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to delete portfolio."
        );
      }

      setPortfolioData({
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        about: "",
        careerGoal: "",
        education: "",
        college: "",
        graduationYear: "",
        skills: "",
        certifications: "",
        achievements: "",
        github: "",
        linkedin: "",
        portfolio: "",
      });

      setProjects([
        {
          name: "",
          description: "",
          technology: "",
          role: "",
          result: "",
        },
      ]);

      setHasSavedPortfolio(false);

      alert(
        data.message ||
          "Portfolio deleted successfully!"
      );

    } catch (error) {
      console.error(
        "Delete portfolio error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete portfolio."
      );
    }
  };

  // =========================================================
  // CLEAR FORM
  // =========================================================

  const handleClear = () => {
    setPortfolioData({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      about: "",
      careerGoal: "",
      education: "",
      college: "",
      graduationYear: "",
      skills: "",
      certifications: "",
      achievements: "",
      github: "",
      linkedin: "",
      portfolio: "",
    });

    setProjects([
      {
        name: "",
        description: "",
        technology: "",
        role: "",
        result: "",
      },
    ]);
  };

  // =========================================================
  // DOWNLOAD PDF
  // =========================================================

  const handleDownloadPDF = async () => {
    const preview =
      portfolioPreviewRef.current;

    if (!preview) {
      alert(
        "Portfolio preview not found."
      );
      return;
    }

    if (!portfolioData.fullName.trim()) {
      alert(
        "Please enter your full name before downloading."
      );
      return;
    }

    try {
      const canvas =
        await html2canvas(preview, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

      const imageData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imageWidth = pdfWidth;

      const imageHeight =
        (canvas.height * imageWidth) /
        canvas.width;

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
        position =
          heightLeft - imageHeight;

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

      const safeName =
        portfolioData.fullName
          .trim()
          .replace(
            /[^a-zA-Z0-9]+/g,
            "_"
          ) || "Student";

      pdf.save(
        `${safeName}_Portfolio.pdf`
      );

    } catch (error) {
      console.error(
        "Portfolio PDF error:",
        error
      );

      alert(
        "Unable to download the portfolio PDF. Please try again."
      );
    }
  };

  // =========================================================
  // PREVIEW DATA
  // =========================================================

  const skills = splitItems(
    portfolioData.skills
  );

  const certifications =
    splitItems(
      portfolioData.certifications
    );

  const achievements =
    splitItems(
      portfolioData.achievements
    );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="portfolio-guide-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

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

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="portfolio-guide-hero">

        <div className="portfolio-guide-hero-icon">
          🌐
        </div>

        <div>

          <span className="portfolio-guide-tag">
            CAREER PREPARATION
          </span>

          <h1>
            Portfolio Guide & Builder
          </h1>

          <p>
            Learn how to create a professional
            portfolio, showcase your projects
            and skills, and download your
            portfolio as a PDF.
          </p>

        </div>

      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="portfolio-guide-container">

        {/* ===================================================
            INTRO
        =================================================== */}

        <section className="portfolio-intro">

          <span className="portfolio-section-number">
            01
          </span>

          <div>

            <h2>
              Build a Portfolio That Shows Your Skills
            </h2>

            <p>
              A student portfolio can help you
              showcase your projects, technical
              skills, achievements and learning
              journey.
            </p>

          </div>

        </section>

        {/* ===================================================
            WHAT TO INCLUDE
        =================================================== */}

        <section className="portfolio-section">

          <div className="portfolio-section-title">

            <span>💡</span>

            <div>

              <h2>
                What Should Your Portfolio Include?
              </h2>

              <p>
                Include these important sections
                to create a complete student
                portfolio.
              </p>

            </div>

          </div>

          <div className="portfolio-guide-grid">

            <div className="portfolio-guide-card">
              <span>👋</span>

              <h3>
                About Me
              </h3>

              <p>
                Write a short introduction about
                your education, interests, skills
                and career goals.
              </p>
            </div>

            <div className="portfolio-guide-card">
              <span>🎓</span>

              <h3>
                Education
              </h3>

              <p>
                Add your degree, college, academic
                year and relevant educational
                achievements.
              </p>
            </div>

            <div className="portfolio-guide-card">
              <span>💻</span>

              <h3>
                Projects
              </h3>

              <p>
                Showcase your best academic and
                personal projects with descriptions
                and technologies used.
              </p>
            </div>

            <div className="portfolio-guide-card">
              <span>🛠️</span>

              <h3>
                Skills
              </h3>

              <p>
                List your technical, creative and
                professional skills clearly.
              </p>
            </div>

            <div className="portfolio-guide-card">
              <span>🏆</span>

              <h3>
                Achievements
              </h3>

              <p>
                Add hackathons, competitions,
                awards, certificates and other
                achievements.
              </p>
            </div>

            <div className="portfolio-guide-card">
              <span>🔗</span>

              <h3>
                Professional Links
              </h3>

              <p>
                Add relevant GitHub, LinkedIn and
                other professional profile links.
              </p>
            </div>

          </div>

        </section>

        {/* ===================================================
            PROJECT SECTION
        =================================================== */}

        <section className="portfolio-project-section">

          <div className="portfolio-section-title">

            <span>🚀</span>

            <div>

              <h2>
                How to Present Your Projects
              </h2>

              <p>
                A good project description should
                quickly explain what you built and
                what you learned.
              </p>

            </div>

          </div>

          <div className="portfolio-project-grid">

            <div className="portfolio-project-card">
              <strong>01</strong>

              <h3>
                Project Name
              </h3>

              <p>
                Give your project a clear and
                meaningful name.
              </p>
            </div>

            <div className="portfolio-project-card">
              <strong>02</strong>

              <h3>
                Problem
              </h3>

              <p>
                Explain the problem or purpose
                behind the project.
              </p>
            </div>

            <div className="portfolio-project-card">
              <strong>03</strong>

              <h3>
                Technology
              </h3>

              <p>
                Mention the programming languages,
                tools or technologies you used.
              </p>
            </div>

            <div className="portfolio-project-card">
              <strong>04</strong>

              <h3>
                Your Role
              </h3>

              <p>
                Explain what you personally
                worked on.
              </p>
            </div>

            <div className="portfolio-project-card">
              <strong>05</strong>

              <h3>
                Result
              </h3>

              <p>
                Explain what the project achieved
                or demonstrated.
              </p>
            </div>

            <div className="portfolio-project-card">
              <strong>06</strong>

              <h3>
                What You Learned
              </h3>

              <p>
                Mention the important skills or
                knowledge you gained.
              </p>
            </div>

          </div>

        </section>

        {/* ===================================================
            STRUCTURE
        =================================================== */}

        <section className="portfolio-structure-section">

          <div className="portfolio-section-title">

            <span>🧩</span>

            <div>

              <h2>
                Simple Portfolio Structure
              </h2>

              <p>
                Follow this simple order when
                creating your portfolio.
              </p>

            </div>

          </div>

          <div className="portfolio-structure">

            <div className="portfolio-structure-item">
              <strong>01</strong>

              <div>
                <h3>
                  Home
                </h3>

                <p>
                  Short introduction and career
                  focus.
                </p>
              </div>
            </div>

            <div className="portfolio-structure-item">
              <strong>02</strong>

              <div>
                <h3>
                  About Me
                </h3>

                <p>
                  Education, interests and career
                  goals.
                </p>
              </div>
            </div>

            <div className="portfolio-structure-item">
              <strong>03</strong>

              <div>
                <h3>
                  Skills
                </h3>

                <p>
                  Technical and professional skills.
                </p>
              </div>
            </div>

            <div className="portfolio-structure-item">
              <strong>04</strong>

              <div>
                <h3>
                  Projects
                </h3>

                <p>
                  Your best academic and personal
                  projects.
                </p>
              </div>
            </div>

            <div className="portfolio-structure-item">
              <strong>05</strong>

              <div>
                <h3>
                  Achievements
                </h3>

                <p>
                  Certificates, competitions and
                  awards.
                </p>
              </div>
            </div>

            <div className="portfolio-structure-item">
              <strong>06</strong>

              <div>
                <h3>
                  Contact
                </h3>

                <p>
                  Professional contact information
                  and links.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ===================================================
            PORTFOLIO BUILDER
        =================================================== */}

        <section
          className="portfolio-builder-section"
          id="portfolio-builder"
        >

          <div className="portfolio-section-title">

            <span>🛠️</span>

            <div>

              <h2>
                Build Your Portfolio
              </h2>

              <p>
                Enter your information below and
                create a professional portfolio
                with a live preview.
              </p>

            </div>

          </div>

          <div className="portfolio-builder-layout">

            {/* =================================================
                FORM
            ================================================= */}

            <div className="portfolio-builder-form">

              <div className="builder-form-header">

                <h3>
                  ✏️ Portfolio Information
                </h3>

                <p>
                  Fill in your details to build
                  your portfolio.
                </p>

                {isLoadingPortfolio && (
                  <small>
                    🔄 Loading your saved portfolio...
                  </small>
                )}

                {!isLoadingPortfolio &&
                  hasSavedPortfolio && (
                    <small>
                      ✅ Your saved portfolio has
                      been loaded.
                    </small>
                  )}

              </div>

              {/* PERSONAL INFORMATION */}

              <div className="builder-form-section">

                <h4>
                  👤 Personal Information
                </h4>

                <div className="builder-form-grid">

                  <div className="builder-field">

                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={
                        portfolioData.fullName
                      }
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />

                  </div>

                  <div className="builder-field">

                    <label>
                      Professional Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={
                        portfolioData.title
                      }
                      onChange={handleChange}
                      placeholder="e.g. B.Sc. Computer Science Student"
                    />

                  </div>

                  <div className="builder-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        portfolioData.email
                      }
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />

                  </div>

                  <div className="builder-field">

                    <label>
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={
                        portfolioData.phone
                      }
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />

                  </div>

                  <div className="builder-field builder-full-field">

                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={
                        portfolioData.location
                      }
                      onChange={handleChange}
                      placeholder="Mumbai, Maharashtra"
                    />

                  </div>

                </div>

              </div>

              {/* ABOUT */}

              <div className="builder-form-section">

                <h4>
                  👋 About Me
                </h4>

                <div className="builder-field">

                  <label>
                    About You
                  </label>

                  <textarea
                    name="about"
                    value={
                      portfolioData.about
                    }
                    onChange={handleChange}
                    placeholder="Write a short introduction about yourself, your interests and your skills..."
                    rows="5"
                  />

                </div>

                <div className="builder-field">

                  <label>
                    Career Goal
                  </label>

                  <textarea
                    name="careerGoal"
                    value={
                      portfolioData.careerGoal
                    }
                    onChange={handleChange}
                    placeholder="What type of career do you want to build?"
                    rows="4"
                  />

                </div>

              </div>

              {/* EDUCATION */}

              <div className="builder-form-section">

                <h4>
                  🎓 Education
                </h4>

                <div className="builder-form-grid">

                  <div className="builder-field">

                    <label>
                      Degree / Course
                    </label>

                    <input
                      type="text"
                      name="education"
                      value={
                        portfolioData.education
                      }
                      onChange={handleChange}
                      placeholder="B.Sc. Computer Science"
                    />

                  </div>

                  <div className="builder-field">

                    <label>
                      College / University
                    </label>

                    <input
                      type="text"
                      name="college"
                      value={
                        portfolioData.college
                      }
                      onChange={handleChange}
                      placeholder="College name"
                    />

                  </div>

                  <div className="builder-field">

                    <label>
                      Graduation Year
                    </label>

                    <input
                      type="text"
                      name="graduationYear"
                      value={
                        portfolioData.graduationYear
                      }
                      onChange={handleChange}
                      placeholder="2026"
                    />

                  </div>

                </div>

              </div>

              {/* SKILLS */}

              <div className="builder-form-section">

                <h4>
                  🛠️ Skills
                </h4>

                <div className="builder-field">

                  <label>
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={
                      portfolioData.skills
                    }
                    onChange={handleChange}
                    placeholder="React, JavaScript, Python, MySQL"
                  />

                  <small>
                    Separate skills using commas.
                  </small>

                </div>

              </div>

              {/* PROJECTS */}

              <div className="builder-form-section">

                <div className="builder-section-heading-row">

                  <div>

                    <h4>
                      💻 Projects
                    </h4>

                    <p>
                      Add your academic or
                      personal projects.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="add-project-button"
                    onClick={addProject}
                  >
                    + Add Project
                  </button>

                </div>

                {projects.map(
                  (project, index) => (

                    <div
                      className="builder-project-form"
                      key={index}
                    >

                      <div className="builder-project-title">

                        <h5>
                          Project {index + 1}
                        </h5>

                        {projects.length > 1 && (
                          <button
                            type="button"
                            className="remove-project-button"
                            onClick={() =>
                              removeProject(index)
                            }
                          >
                            Remove
                          </button>
                        )}

                      </div>

                      <div className="builder-field">

                        <label>
                          Project Name
                        </label>

                        <input
                          type="text"
                          value={
                            project.name
                          }
                          onChange={(event) =>
                            handleProjectChange(
                              index,
                              "name",
                              event.target.value
                            )
                          }
                          placeholder="e.g. SheCare"
                        />

                      </div>

                      <div className="builder-field">

                        <label>
                          Description
                        </label>

                        <textarea
                          value={
                            project.description
                          }
                          onChange={(event) =>
                            handleProjectChange(
                              index,
                              "description",
                              event.target.value
                            )
                          }
                          placeholder="Explain what your project does..."
                          rows="3"
                        />

                      </div>

                      <div className="builder-form-grid">

                        <div className="builder-field">

                          <label>
                            Technologies
                          </label>

                          <input
                            type="text"
                            value={
                              project.technology
                            }
                            onChange={(event) =>
                              handleProjectChange(
                                index,
                                "technology",
                                event.target.value
                              )
                            }
                            placeholder="React, Node.js, MySQL"
                          />

                        </div>

                        <div className="builder-field">

                          <label>
                            Your Role
                          </label>

                          <input
                            type="text"
                            value={
                              project.role
                            }
                            onChange={(event) =>
                              handleProjectChange(
                                index,
                                "role",
                                event.target.value
                              )
                            }
                            placeholder="Frontend Developer"
                          />

                        </div>

                      </div>

                      <div className="builder-field">

                        <label>
                          Result / Achievement
                        </label>

                        <textarea
                          value={
                            project.result
                          }
                          onChange={(event) =>
                            handleProjectChange(
                              index,
                              "result",
                              event.target.value
                            )
                          }
                          placeholder="What did the project achieve?"
                          rows="3"
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* CERTIFICATIONS */}

              <div className="builder-form-section">

                <h4>
                  📜 Certifications
                </h4>

                <div className="builder-field">

                  <label>
                    Certifications
                  </label>

                  <textarea
                    name="certifications"
                    value={
                      portfolioData.certifications
                    }
                    onChange={handleChange}
                    placeholder="Python Certificate, Web Development Certificate, Excel Certificate"
                    rows="4"
                  />

                  <small>
                    Separate certifications
                    using commas.
                  </small>

                </div>

              </div>

              {/* ACHIEVEMENTS */}

              <div className="builder-form-section">

                <h4>
                  🏆 Achievements
                </h4>

                <div className="builder-field">

                  <label>
                    Achievements
                  </label>

                  <textarea
                    name="achievements"
                    value={
                      portfolioData.achievements
                    }
                    onChange={handleChange}
                    placeholder="Hackathon participation, awards, competitions..."
                    rows="4"
                  />

                  <small>
                    Separate achievements
                    using commas.
                  </small>

                </div>

              </div>

              {/* LINKS */}

              <div className="builder-form-section">

                <h4>
                  🔗 Professional Links
                </h4>

                <div className="builder-field">

                  <label>
                    GitHub
                  </label>

                  <input
                    type="text"
                    name="github"
                    value={
                      portfolioData.github
                    }
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />

                </div>

                <div className="builder-field">

                  <label>
                    LinkedIn
                  </label>

                  <input
                    type="text"
                    name="linkedin"
                    value={
                      portfolioData.linkedin
                    }
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />

                </div>

                <div className="builder-field">

                  <label>
                    Personal Portfolio
                  </label>

                  <input
                    type="text"
                    name="portfolio"
                    value={
                      portfolioData.portfolio
                    }
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                  />

                </div>

              </div>

              {/* ACTIONS */}

              <div className="portfolio-builder-actions">

                <button
                  type="button"
                  className="portfolio-save-button"
                  onClick={
                    handleSavePortfolio
                  }
                  disabled={
                    isSavingPortfolio
                  }
                >
                  {isSavingPortfolio
                    ? "💾 Saving..."
                    : "💾 Save Portfolio"}
                </button>

                <button
                  type="button"
                  className="portfolio-download-button"
                  onClick={
                    handleDownloadPDF
                  }
                >
                  📄 Download Portfolio PDF
                </button>

                <button
                  type="button"
                  className="portfolio-clear-button"
                  onClick={handleClear}
                >
                  🗑️ Clear Form
                </button>

                {hasSavedPortfolio && (
                  <button
                    type="button"
                    className="portfolio-delete-button"
                    onClick={
                      handleDeletePortfolio
                    }
                  >
                    🗑️ Delete Saved Portfolio
                  </button>
                )}

              </div>

            </div>

            {/* =================================================
                LIVE PREVIEW
            ================================================= */}

            <div className="portfolio-preview-wrapper">

              <div className="portfolio-preview-heading">

                <span>
                  👀
                </span>

                <div>

                  <h3>
                    Live Preview
                  </h3>

                  <p>
                    Your portfolio updates
                    automatically.
                  </p>

                </div>

              </div>

              <div
                className="portfolio-live-preview"
                ref={portfolioPreviewRef}
              >

                {/* PREVIEW HEADER */}

                <div className="preview-profile">

                  <div className="preview-avatar">

                    {portfolioData.fullName
                      ? portfolioData.fullName
                          .trim()
                          .split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "VP"}

                  </div>

                  <div>

                    <h1>
                      {portfolioData.fullName ||
                        "Your Name"}
                    </h1>

                    <h2>
                      {portfolioData.title ||
                        "Your Professional Title"}
                    </h2>

                    <div className="preview-contact">

                      {portfolioData.email && (
                        <span>
                          ✉️{" "}
                          {portfolioData.email}
                        </span>
                      )}

                      {portfolioData.phone && (
                        <span>
                          📱{" "}
                          {portfolioData.phone}
                        </span>
                      )}

                      {portfolioData.location && (
                        <span>
                          📍{" "}
                          {portfolioData.location}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* ABOUT */}

                {(portfolioData.about ||
                  portfolioData.careerGoal) && (

                  <div className="preview-section">

                    <h3>
                      👋 About Me
                    </h3>

                    {portfolioData.about && (
                      <p>
                        {portfolioData.about}
                      </p>
                    )}

                    {portfolioData.careerGoal && (
                      <div className="preview-goal">

                        <strong>
                          🎯 Career Goal
                        </strong>

                        <p>
                          {
                            portfolioData.careerGoal
                          }
                        </p>

                      </div>
                    )}

                  </div>

                )}

                {/* EDUCATION */}

                {(portfolioData.education ||
                  portfolioData.college ||
                  portfolioData.graduationYear) && (

                  <div className="preview-section">

                    <h3>
                      🎓 Education
                    </h3>

                    <div className="preview-education">

                      {portfolioData.education && (
                        <strong>
                          {
                            portfolioData.education
                          }
                        </strong>
                      )}

                      {portfolioData.college && (
                        <span>
                          {
                            portfolioData.college
                          }
                        </span>
                      )}

                      {portfolioData.graduationYear && (
                        <span>
                          Graduation:{" "}
                          {
                            portfolioData.graduationYear
                          }
                        </span>
                      )}

                    </div>

                  </div>

                )}

                {/* SKILLS */}

                {skills.length > 0 && (

                  <div className="preview-section">

                    <h3>
                      🛠️ Skills
                    </h3>

                    <div className="preview-skills">

                      {skills.map(
                        (skill, index) => (
                          <span key={index}>
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                )}

                {/* PROJECTS */}

                {projects.some(
                  (project) =>
                    project.name ||
                    project.description ||
                    project.technology ||
                    project.role ||
                    project.result
                ) && (

                  <div className="preview-section">

                    <h3>
                      💻 Projects
                    </h3>

                    <div className="preview-projects">

                      {projects.map(
                        (project, index) => {

                          if (
                            !project.name &&
                            !project.description &&
                            !project.technology &&
                            !project.role &&
                            !project.result
                          ) {
                            return null;
                          }

                          return (
                            <div
                              className="preview-project"
                              key={index}
                            >

                              <h4>
                                {project.name ||
                                  `Project ${
                                    index + 1
                                  }`}
                              </h4>

                              {project.description && (
                                <p>
                                  {
                                    project.description
                                  }
                                </p>
                              )}

                              {project.technology && (
                                <p>
                                  <strong>
                                    Technology:
                                  </strong>{" "}
                                  {
                                    project.technology
                                  }
                                </p>
                              )}

                              {project.role && (
                                <p>
                                  <strong>
                                    Role:
                                  </strong>{" "}
                                  {
                                    project.role
                                  }
                                </p>
                              )}

                              {project.result && (
                                <p>
                                  <strong>
                                    Result:
                                  </strong>{" "}
                                  {
                                    project.result
                                  }
                                </p>
                              )}

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>

                )}

                {/* CERTIFICATIONS */}

                {certifications.length > 0 && (

                  <div className="preview-section">

                    <h3>
                      📜 Certifications
                    </h3>

                    <ul className="preview-list">

                      {certifications.map(
                        (
                          certificate,
                          index
                        ) => (
                          <li key={index}>
                            {certificate}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                )}

                {/* ACHIEVEMENTS */}

                {achievements.length > 0 && (

                  <div className="preview-section">

                    <h3>
                      🏆 Achievements
                    </h3>

                    <ul className="preview-list">

                      {achievements.map(
                        (
                          achievement,
                          index
                        ) => (
                          <li key={index}>
                            {achievement}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                )}

                {/* LINKS */}

                {(portfolioData.github ||
                  portfolioData.linkedin ||
                  portfolioData.portfolio) && (

                  <div className="preview-section">

                    <h3>
                      🔗 Professional Links
                    </h3>

                    <div className="preview-links">

                      {portfolioData.github && (
                        <span>
                          GitHub:{" "}
                          {
                            portfolioData.github
                          }
                        </span>
                      )}

                      {portfolioData.linkedin && (
                        <span>
                          LinkedIn:{" "}
                          {
                            portfolioData.linkedin
                          }
                        </span>
                      )}

                      {portfolioData.portfolio && (
                        <span>
                          Portfolio:{" "}
                          {
                            portfolioData.portfolio
                          }
                        </span>
                      )}

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            SAMPLE STUDENT PORTFOLIO
        =================================================== */}

        <section className="portfolio-sample-section">

          <div className="portfolio-section-title">

            <span>
              ✨
            </span>

            <div>

              <h2>
                Sample Student Portfolio
              </h2>

              <p>
                Here is an example of how a student
                can present their education, skills,
                projects and career goals.
              </p>

            </div>

          </div>

          <div className="portfolio-sample-card">

            <div className="portfolio-sample-header">

              <div className="portfolio-sample-avatar">
                VP
              </div>

              <div>

                <h3>
                  Vishwani Pawar
                </h3>

                <p>
                  B.Sc. Computer Science Student
                </p>

                <span>
                  Aspiring Web Developer
                </span>

              </div>

            </div>

            <div className="portfolio-sample-block">

              <h4>
                👋 About Me
              </h4>

              <p>
                I am a B.Sc. Computer Science
                student interested in web
                development, software development
                and modern technology. I enjoy
                creating practical projects and
                learning new technical skills.
              </p>

            </div>

            <div className="portfolio-sample-block">

              <h4>
                🛠️ Skills
              </h4>

              <div className="portfolio-sample-skills">

                <span>
                  HTML
                </span>

                <span>
                  CSS
                </span>

                <span>
                  JavaScript
                </span>

                <span>
                  React
                </span>

                <span>
                  Python
                </span>

                <span>
                  MySQL
                </span>

              </div>

            </div>

            <div className="portfolio-sample-block">

              <h4>
                💻 Projects
              </h4>

              <div className="portfolio-sample-projects">

                <div>

                  <strong>
                    🌸 SheCare
                  </strong>

                  <p>
                    Women's Health Awareness
                    Platform designed to provide
                    useful health information and
                    an AI chatbot interface.
                  </p>

                </div>

                <div>

                  <strong>
                    🎓 CareerScholarshipPlatform
                  </strong>

                  <p>
                    A career and scholarship guidance
                    platform that helps students
                    explore careers, scholarships,
                    skills and opportunities.
                  </p>

                </div>

              </div>

            </div>

            <div className="portfolio-sample-block">

              <h4>
                🎓 Education
              </h4>

              <p>

                <strong>
                  B.Sc. Computer Science
                </strong>

                <br />

                College / University

                <br />

                Academic Year: 2026–27

              </p>

            </div>

            <div className="portfolio-sample-block">

              <h4>
                🎯 Career Goal
              </h4>

              <p>
                To build strong technical skills
                and start a career in web development
                or software development.
              </p>

            </div>

            <div className="portfolio-sample-block">

              <h4>
                🔗 Professional Links
              </h4>

              <div className="portfolio-sample-links">

                <span>
                  GitHub Profile
                </span>

                <span>
                  LinkedIn Profile
                </span>

                <span>
                  Personal Portfolio
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            TIPS
        =================================================== */}

        <section className="portfolio-tips-section">

          <div className="portfolio-tips-icon">
            🎯
          </div>

          <div className="portfolio-tips-content">

            <span>
              IMPORTANT TIPS
            </span>

            <h2>
              Make Your Portfolio More Professional
            </h2>

            <div className="portfolio-tips-grid">

              <div>
                <strong>
                  01
                </strong>

                <p>
                  Keep the design clean and easy
                  to navigate.
                </p>
              </div>

              <div>
                <strong>
                  02
                </strong>

                <p>
                  Show your strongest projects first.
                </p>
              </div>

              <div>
                <strong>
                  03
                </strong>

                <p>
                  Keep project descriptions clear
                  and simple.
                </p>
              </div>

              <div>
                <strong>
                  04
                </strong>

                <p>
                  Keep your professional links
                  updated.
                </p>
              </div>

              <div>
                <strong>
                  05
                </strong>

                <p>
                  Check spelling and grammar carefully.
                </p>
              </div>

              <div>
                <strong>
                  06
                </strong>

                <p>
                  Update your portfolio as you learn
                  new skills.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            NEXT STEP
        =================================================== */}

        <section className="portfolio-next-section">

          <div className="portfolio-next-icon">
            🚀
          </div>

          <div>

            <span>
              READY TO GROW?
            </span>

            <h2>
              Build projects and explore career opportunities
            </h2>

            <p>
              Use your portfolio to showcase your
              skills and continue building practical
              experience.
            </p>

            <div className="portfolio-next-actions">

              <a
                href="#portfolio-builder"
                className="portfolio-primary-button"
              >
                🛠️ Build My Portfolio →
              </a>

              <Link
                to="/skills-roadmap"
                className="portfolio-primary-button"
              >
                View Skills Roadmap →
              </Link>

              <Link
                to="/opportunities"
                className="portfolio-secondary-button"
              >
                Explore Opportunities →
              </Link>

            </div>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="portfolio-guide-footer">

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

export default PortfolioGuide;