import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./SkillsRoadmap.css";

const careerData = {
  "Web Developer": {
    icon: "💻",
    description:
      "Build websites and web applications using frontend and backend technologies.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Git", "Basic SQL"],
    projects: [
      "Personal Portfolio Website",
      "Student Management Website",
      "Expense Tracker",
    ],
    certifications: [
      "Web Development Certification",
      "JavaScript Certification",
      "React Certification",
    ],
    roadmap: [
      "Learn HTML and CSS",
      "Learn JavaScript fundamentals",
      "Build small web projects",
      "Learn React",
      "Learn Git and GitHub",
      "Build a strong portfolio",
      "Apply for internships and jobs",
    ],
  },

  "Data Analyst": {
    icon: "📊",
    description:
      "Work with data to find useful information and support business decisions.",
    skills: [
      "Excel",
      "SQL",
      "Python",
      "Statistics",
      "Power BI",
      "Data Visualization",
    ],
    projects: [
      "Sales Data Dashboard",
      "Student Performance Analysis",
      "Expense Analysis Dashboard",
    ],
    certifications: [
      "Excel Certification",
      "SQL Certification",
      "Power BI Certification",
    ],
    roadmap: [
      "Learn Excel",
      "Learn basic statistics",
      "Learn SQL",
      "Learn Power BI",
      "Practise with datasets",
      "Build data projects",
      "Apply for internships and jobs",
    ],
  },

  "UI/UX Designer": {
    icon: "🎨",
    description:
      "Design simple, attractive and user-friendly digital products and experiences.",
    skills: [
      "Figma",
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
    ],
    projects: [
      "Mobile App Design",
      "College Website Redesign",
      "Student Career App",
    ],
    certifications: [
      "UI/UX Design Certification",
      "Figma Certification",
      "UX Design Course",
    ],
    roadmap: [
      "Understand UI/UX fundamentals",
      "Learn Figma",
      "Practise wireframes",
      "Create prototypes",
      "Complete design projects",
      "Build a design portfolio",
      "Apply for internships and jobs",
    ],
  },

  "Cybersecurity Analyst": {
    icon: "🔐",
    description:
      "Help protect systems, networks and information from security threats.",
    skills: [
      "Networking",
      "Linux",
      "Cybersecurity",
      "Ethical Hacking",
      "Security Tools",
    ],
    projects: [
      "Network Security Project",
      "Password Security Checker",
      "Basic Vulnerability Assessment",
    ],
    certifications: [
      "Cybersecurity Fundamentals",
      "Ethical Hacking Certification",
      "Network Security Certification",
    ],
    roadmap: [
      "Learn computer networking",
      "Learn Linux basics",
      "Understand cybersecurity fundamentals",
      "Learn security tools",
      "Practise ethical hacking concepts",
      "Complete security projects",
      "Apply for cybersecurity internships",
    ],
  },

  "Digital Marketer": {
    icon: "📱",
    description:
      "Promote products and services through digital platforms and online strategies.",
    skills: [
      "Social Media",
      "Content Writing",
      "SEO",
      "Analytics",
      "Advertising",
    ],
    projects: [
      "Social Media Campaign",
      "Digital Marketing Plan",
      "SEO Website Project",
    ],
    certifications: [
      "Digital Marketing Certification",
      "SEO Certification",
      "Social Media Marketing Course",
    ],
    roadmap: [
      "Learn digital marketing fundamentals",
      "Learn social media marketing",
      "Learn SEO",
      "Practise content creation",
      "Understand digital analytics",
      "Build marketing projects",
      "Apply for internships and jobs",
    ],
  },
};
function SkillsRoadmap() {
  const [searchParams] = useSearchParams();

  const careerFromUrl = searchParams.get("career");

  const initialCareer =
    careerFromUrl &&
    careerData[careerFromUrl]
      ? careerFromUrl
      : "Web Developer";

  const [selectedCareer, setSelectedCareer] =
    useState(initialCareer);


  const [selectedStep, setSelectedStep] =
    useState(0);

  const [completedSteps, setCompletedSteps] =
    useState([]);

  const [loadingProgress, setLoadingProgress] =
    useState(true);

  const [savingStep, setSavingStep] =
    useState(null);

  const [learningResource, setLearningResource] =
    useState(null);

  const [
    loadingLearningResource,
    setLoadingLearningResource,
  ] = useState(true);

  const currentCareer =
    careerData[selectedCareer];

  /* =========================================================
     LOAD ROADMAP PROGRESS FROM SQLITE
  ========================================================= */

  useEffect(() => {
    const loadRoadmapProgress = async () => {
      try {
        setLoadingProgress(true);

        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.id) {
          setCompletedSteps([]);
          setLoadingProgress(false);
          return;
        }

        const response = await fetch(
          `https://career-scholarship-backend.onrender.com/api/roadmap-progress/${student.id}/${encodeURIComponent(
            selectedCareer
          )}`
        );

        const data =
          await response.json();

        if (
          response.ok &&
          Array.isArray(data.progress)
        ) {
          const completedIndexes =
            data.progress
              .filter(
                (item) =>
                  Number(item.completed) === 1
              )
              .map((item) =>
                Number(item.step_number)
              );

          setCompletedSteps(
            completedIndexes
          );
        } else {
          setCompletedSteps([]);
        }
      } catch (error) {
        console.error(
          "Unable to load roadmap progress:",
          error
        );

        setCompletedSteps([]);
      } finally {
        setLoadingProgress(false);
      }
    };

    loadRoadmapProgress();
  }, [selectedCareer]);

  /* =========================================================
     LOAD STEP-SPECIFIC LEARNING RESOURCE
  ========================================================= */

  useEffect(() => {
    const loadLearningResource = async () => {
      try {
        setLoadingLearningResource(true);
        setLearningResource(null);

        const response = await fetch(
          `https://career-scholarship-backend.onrender.com/api/learning-resources/${encodeURIComponent(
            selectedCareer
          )}/${selectedStep}`
        );

        const data =
          await response.json();

        if (
          response.ok &&
          data.resource
        ) {
          setLearningResource(
            data.resource
          );
        } else {
          setLearningResource(null);
        }
      } catch (error) {
        console.error(
          "Unable to load step learning resource:",
          error
        );

        setLearningResource(null);
      } finally {
        setLoadingLearningResource(false);
      }
    };

    loadLearningResource();
  }, [
    selectedCareer,
    selectedStep,
  ]);

  /* =========================================================
     SAVE ROADMAP PROGRESS TO SQLITE
  ========================================================= */

  const toggleStep = async (index) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.id) {
        alert("Please login first.");
        return;
      }

      const isCurrentlyCompleted =
        completedSteps.includes(index);

      const newCompletedValue =
        isCurrentlyCompleted
          ? 0
          : 1;

      setSavingStep(index);

      const response = await fetch(
        "https://career-scholarship-backend.onrender.com/api/roadmap-progress",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            student_id:
              student.id,

            career_name:
              selectedCareer,

            step_number:
              index,

            step_title:
              currentCareer.roadmap[
                index
              ],

            completed:
              newCompletedValue,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to save roadmap progress."
        );

        return;
      }

      setCompletedSteps(
        (previousSteps) => {
          if (
            newCompletedValue === 1
          ) {
            return previousSteps.includes(
              index
            )
              ? previousSteps
              : [
                  ...previousSteps,
                  index,
                ];
          }

          return previousSteps.filter(
            (step) =>
              step !== index
          );
        }
      );

      /* =====================================================
         AUTOMATICALLY MOVE TO NEXT STEP
      ===================================================== */

      if (
        newCompletedValue === 1 &&
        index <
          currentCareer.roadmap.length - 1
      ) {
        setSelectedStep(index + 1);
      }

    } catch (error) {
      console.error(
        "Roadmap progress error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    } finally {
      setSavingStep(null);
    }
  };

  /* =========================================================
     CAREER CHANGE
  ========================================================= */

  const handleCareerChange = (
    career
  ) => {
    setSelectedCareer(career);
    setSelectedStep(0);
    setCompletedSteps([]);
  };

  /* =========================================================
     STEP SELECTION
  ========================================================= */

  const handleStepSelect = (
    index
  ) => {
    setSelectedStep(index);
  };

  /* =========================================================
     PROGRESS CALCULATION
  ========================================================= */

  const progress =
    currentCareer.roadmap.length ===
    0
      ? 0
      : Math.round(
          (completedSteps.length /
            currentCareer.roadmap.length) *
            100
        );

  return (
    <div className="skills-roadmap-page">

      {/* HEADER */}
      <header className="scholarship-header">

        <div className="scholarship-logo">
<div className="scholarship-logo">
           <div className="dashboard-logo">
            <img
              src="/CareerScholarshipPlatform-logo-transparent.png"
              alt="Career Scholarship Platform"
            />
          </div>


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
      <section className="skills-roadmap-hero">

        <div className="skills-roadmap-hero-icon">
          🗺️
        </div>

        <div>

          <span className="skills-roadmap-tag">
            SKILLS & CAREER GROWTH
          </span>

          <h1>
            My Skills & Roadmap
          </h1>

          <p>
            Choose a career and follow
            a simple step-by-step roadmap
            to build the skills you need.
          </p>

        </div>

      </section>

      <main className="skills-roadmap-container">

        {/* CAREER SELECTOR */}
        <section className="skills-career-selector">

          <div className="skills-section-heading">

            <span>
              01
            </span>

            <div>

              <h2>
                Choose Your Career
              </h2>

              <p>
                Select a career to see its
                recommended skills and roadmap.
              </p>

            </div>

          </div>

          <div className="skills-career-grid">

            {Object.keys(
              careerData
            ).map(
              (career) => (

                <button
                  type="button"
                  key={career}
                  className={
                    selectedCareer ===
                    career
                      ? "skills-career-card active-skill-career"
                      : "skills-career-card"
                  }
                  onClick={() =>
                    handleCareerChange(
                      career
                    )
                  }
                >

                  <span className="skills-career-icon">
                    {
                      careerData[
                        career
                      ].icon
                    }
                  </span>

                  <span className="skills-career-name">
                    {career}
                  </span>

                  {selectedCareer ===
                    career && (

                    <span className="skills-selected-mark">
                      ✓
                    </span>

                  )}

                </button>

              )
            )}

          </div>

        </section>

        {/* CAREER INTRO */}
        <section className="selected-career-roadmap">

          <div className="selected-career-info">

            <div className="selected-career-icon">
              {
                currentCareer.icon
              }
            </div>

            <div>

              <span>
                YOUR SELECTED CAREER
              </span>

              <h2>
                {selectedCareer}
              </h2>

              <p>
                {
                  currentCareer.description
                }
              </p>

            </div>

          </div>

          <Link
            to="/career-explorer"
            className="roadmap-explore-link"
          >
            Explore More Careers →
          </Link>

        </section>

        {/* PROGRESS */}
        <section className="roadmap-progress-section">

          <div className="roadmap-progress-header">

            <div>

              <span>
                YOUR PROGRESS
              </span>

              <h2>
                Career Roadmap Progress
              </h2>

            </div>

            <strong>
              {loadingProgress
                ? "..."
                : `${progress}%`}
            </strong>

          </div>

          <div className="roadmap-progress-bar">

            <div
              className="roadmap-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

          <p>
            {completedSteps.length} of{" "}
            {
              currentCareer.roadmap
                .length
            }{" "}
            steps completed
          </p>

        </section>

        {/* SKILLS */}
        <section className="roadmap-content-section">

          <div className="skills-section-heading">

            <span>
              02
            </span>

            <div>

              <h2>
                Skills You Should Build
              </h2>

              <p>
                These skills can help you
                prepare for this career.
              </p>

            </div>

          </div>

          <div className="required-skills-grid">

            {currentCareer.skills.map(
              (skill, index) => (

                <div
                  className="required-skill-card"
                  key={skill}
                >

                  <span>
                    {index + 1}
                  </span>

                  <div>

                    <h3>
                      {skill}
                    </h3>

                    <p>
                      Build practical
                      knowledge through
                      learning and projects.
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

        {/* ROADMAP */}
        <section className="roadmap-content-section">

          <div className="skills-section-heading">

            <span>
              03
            </span>

            <div>

              <h2>
                Step-by-Step Roadmap
              </h2>

              <p>
                Select a step to see its
                learning video and resource.
              </p>

            </div>

          </div>

          <div className="career-roadmap-list">

            {currentCareer.roadmap.map(
              (step, index) => {

                const completed =
                  completedSteps.includes(
                    index
                  );

                const isSaving =
                  savingStep === index;

                const isSelected =
                  selectedStep === index;

                return (

                  <div
                    className={
                      completed
                        ? isSelected
                          ? "roadmap-step completed-roadmap-step selected-roadmap-step"
                          : "roadmap-step completed-roadmap-step"
                        : isSelected
                        ? "roadmap-step selected-roadmap-step"
                        : "roadmap-step"
                    }
                    key={step}
                  >

                    <button
                      type="button"
                      className="roadmap-step-number"
                      onClick={() =>
                        handleStepSelect(
                          index
                        )
                      }
                      aria-label={`Open learning for step ${
                        index + 1
                      }`}
                    >
                      {completed
                        ? "✓"
                        : index + 1}
                    </button>

                    <button
                      type="button"
                      className="roadmap-step-content roadmap-step-select-button"
                      onClick={() =>
                        handleStepSelect(
                          index
                        )
                      }
                    >

                      <span>
                        STEP {index + 1}
                      </span>

                      <h3>
                        {step}
                      </h3>

                      <p>
                        {completed
                          ? "Great! You have completed this step."
                          : "Select this step to view the learning resource."}
                      </p>

                    </button>

                    <button
                      type="button"
                      className="roadmap-complete-button"
                      onClick={() =>
                        toggleStep(
                          index
                        )
                      }
                      disabled={isSaving}
                    >
                      {isSaving
                        ? "Saving..."
                        : completed
                        ? "Completed ✓"
                        : "Mark Complete"}
                    </button>

                  </div>

                );
              }
            )}

          </div>

        </section>

        {/* STEP LEARNING RESOURCE */}
        <section className="roadmap-video-section">

          <div className="roadmap-video-header">

            <div>

              <span>
                STEP {selectedStep + 1} • WATCH & LEARN
              </span>

              <h2>
                {
                  currentCareer
                    .roadmap[
                      selectedStep
                    ]
                }
              </h2>

              <p>
                Learning material for this
                specific roadmap step.
              </p>

            </div>

            <div className="roadmap-video-badge">
              🎥 Learning
            </div>

          </div>

          {loadingLearningResource ? (

            <div className="tracker-empty-card">

              <div className="tracker-empty-icon">
                🎥
              </div>

              <h3>
                Loading resource...
              </h3>

              <p>
                Getting the learning resource
                from the backend.
              </p>

            </div>

          ) : learningResource ? (

            <div className="step-learning-card">

              <div className="step-learning-icon">
                🎓
              </div>

              <div className="step-learning-content">

                <span>
                  RECOMMENDED VIDEO
                </span>

                <h3>
                  {
                    learningResource.resource_title
                  }
                </h3>

                <p>
                  This resource is connected
                  to Step {selectedStep + 1}:{" "}
                  {
                    currentCareer.roadmap[
                      selectedStep
                    ]
                  }
                </p>

                <div className="step-learning-actions">

                  <a
                    href={
                      learningResource.video_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="roadmap-watch-button"
                  >
                    🎥 Watch Video →
                  </a>

                  {learningResource.resource_url && (

                    <a
                      href={
                        learningResource.resource_url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="roadmap-resource-button"
                    >
                      📚 Open Learning Resource →
                    </a>

                  )}

                </div>

                <small className="step-learning-note">
                  The video button opens YouTube
                  results for this specific topic.
                  Choose a suitable educational
                  video from the results.
                </small>

              </div>

            </div>

          ) : (

            <div className="tracker-empty-card">

              <div className="tracker-empty-icon">
                📚
              </div>

              <h3>
                No learning resource found
              </h3>

              <p>
                A resource has not been added
                for this step yet.
              </p>

            </div>

          )}

        </section>

        {/* PROJECTS */}
        <section className="roadmap-content-section">

          <div className="skills-section-heading">

            <span>
              04
            </span>

            <div>

              <h2>
                Practice Projects
              </h2>

              <p>
                Projects can help you practise
                your skills and build a portfolio.
              </p>

            </div>

          </div>

          <div className="roadmap-project-grid">

            {currentCareer.projects.map(
              (project, index) => (

                <div
                  className="roadmap-project-card"
                  key={project}
                >

                  <div>
                    {index === 0 &&
                      "🛠️"}

                    {index === 1 &&
                      "💡"}

                    {index === 2 &&
                      "🚀"}
                  </div>

                  <h3>
                    {project}
                  </h3>

                  <p>
                    Build this project to practise
                    your career-related skills.
                  </p>

                </div>

              )
            )}

          </div>

        </section>

        {/* CERTIFICATIONS */}
        <section className="roadmap-content-section">

          <div className="skills-section-heading">

            <span>
              05
            </span>

            <div>

              <h2>
                Recommended Learning
              </h2>

              <p>
                Certification and learning
                areas you can explore.
              </p>

            </div>

          </div>

          <div className="roadmap-certification-grid">

            {currentCareer.certifications.map(
              (certification) => (

                <div
                  className="roadmap-certification-card"
                  key={
                    certification
                  }
                >

                  <span>
                    📜
                  </span>

                  <div>

                    <h3>
                      {certification}
                    </h3>

                    <p>
                      Explore this learning
                      area to strengthen
                      your profile.
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </section>

        {/* NEXT STEPS */}
        <section className="roadmap-next-section">

          <div className="roadmap-next-icon">
            🚀
          </div>

          <div>

            <span>
              READY FOR THE NEXT STEP?
            </span>

            <h2>
              Turn your skills into opportunities
            </h2>

            <p>
              After building your skills,
              explore internships,
              hackathons and other
              opportunities.
            </p>

            <div className="roadmap-next-actions">

              <Link
                to="/opportunities"
                className="roadmap-primary-button"
              >
                Explore Opportunities →
              </Link>

              <Link
                to="/ai-career"
                className="roadmap-secondary-button"
              >
                Ask AI Career Assistant →
              </Link>

            </div>

          </div>

        </section>

        {/* DISCLAIMER */}
        <section className="skills-roadmap-disclaimer">

          <strong>
            ℹ️ Career Roadmap Information
          </strong>

          <p>
            These roadmaps are educational
            guidance for students. Career
            requirements can vary by role,
            organisation, course and industry.
          </p>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="skills-roadmap-footer">

        <p>
          © 2026 CareerScholarshipPlatform
        </p>

        <p>
          Helping students build skills
          and plan their careers.
        </p>

      </footer>

    </div>
  );
}

export default SkillsRoadmap;