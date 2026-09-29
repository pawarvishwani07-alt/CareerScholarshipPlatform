import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./SkillGapAnalyzer.css";

const careerData = {
  "Web Developer": {
    icon: "💻",
    description:
      "Build websites and web applications using frontend and backend technologies.",
    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "SQL",
    ],
    suggestedProjects: [
      "Personal Portfolio Website",
      "Student Management Website",
      "Expense Tracker",
    ],
  },

  "Data Analyst": {
    icon: "📊",
    description:
      "Work with data to find useful information and support business decisions.",
    requiredSkills: [
      "Excel",
      "SQL",
      "Python",
      "Statistics",
      "Power BI",
      "Data Visualization",
    ],
    suggestedProjects: [
      "Sales Data Dashboard",
      "Student Performance Analysis",
      "Expense Analysis Dashboard",
    ],
  },

  "UI/UX Designer": {
    icon: "🎨",
    description:
      "Design simple, attractive and user-friendly digital products and experiences.",
    requiredSkills: [
      "Figma",
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
    ],
    suggestedProjects: [
      "Mobile App Design",
      "College Website Redesign",
      "Student Career App",
    ],
  },

  "Cybersecurity Analyst": {
    icon: "🔐",
    description:
      "Help protect systems, networks and information from security threats.",
    requiredSkills: [
      "Networking",
      "Linux",
      "Cybersecurity",
      "Ethical Hacking",
      "Security Tools",
    ],
    suggestedProjects: [
      "Network Security Project",
      "Password Security Checker",
      "Basic Vulnerability Assessment",
    ],
  },

  "Digital Marketer": {
    icon: "📱",
    description:
      "Promote products and services through digital platforms and online strategies.",
    requiredSkills: [
      "Social Media",
      "Content Writing",
      "SEO",
      "Analytics",
      "Advertising",
    ],
    suggestedProjects: [
      "Social Media Campaign",
      "Digital Marketing Plan",
      "SEO Website Project",
    ],
  },
};

const allSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Git",
  "SQL",
  "Excel",
  "Python",
  "Statistics",
  "Power BI",
  "Data Visualization",
  "Figma",
  "UI Design",
  "UX Research",
  "Wireframing",
  "Prototyping",
  "Networking",
  "Linux",
  "Cybersecurity",
  "Ethical Hacking",
  "Security Tools",
  "Social Media",
  "Content Writing",
  "SEO",
  "Analytics",
  "Advertising",
];

function SkillGapAnalyzer() {
  const [selectedCareer, setSelectedCareer] = useState("Web Developer");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const currentCareer = careerData[selectedCareer];

  const toggleSkill = (skill) => {
    setSelectedSkills((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill]
    );
  };

  const analysis = useMemo(() => {
    const required = currentCareer.requiredSkills;

    const matchedSkills = required.filter((skill) =>
      selectedSkills.includes(skill)
    );

    const missingSkills = required.filter(
      (skill) => !selectedSkills.includes(skill)
    );

    const progress =
      required.length === 0
        ? 0
        : Math.round(
            (matchedSkills.length / required.length) * 100
          );

    return {
      matchedSkills,
      missingSkills,
      progress,
    };
  }, [currentCareer, selectedSkills]);

  const handleCareerChange = (career) => {
    setSelectedCareer(career);
    setSelectedSkills([]);
  };

  const clearSkills = () => {
    setSelectedSkills([]);
  };

  return (
    <div className="skill-gap-page">

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
      <section className="skill-gap-hero">

        <div className="skill-gap-hero-icon">
          🧩
        </div>

        <div>

          <span className="skill-gap-tag">
            CAREER TOOLS
          </span>

          <h1>
            Skill Gap Analyzer
          </h1>

          <p>
            Compare your current skills with the skills required for
            a career and discover what you can learn next.
          </p>

        </div>

      </section>

      {/* MAIN */}
      <main className="skill-gap-container">

        {/* CAREER SELECTION */}
        <section className="skill-gap-section">

          <div className="skill-gap-section-heading">

            <div className="skill-gap-number">
              01
            </div>

            <div>
              <span>CHOOSE YOUR CAREER</span>

              <h2>
                Which career are you targeting?
              </h2>

              <p>
                Select a career to see its important skills.
              </p>
            </div>

          </div>

          <div className="skill-gap-career-grid">

            {Object.entries(careerData).map(
              ([career, data]) => (

                <button
                  key={career}
                  type="button"
                  className={
                    selectedCareer === career
                      ? "skill-gap-career-card active"
                      : "skill-gap-career-card"
                  }
                  onClick={() =>
                    handleCareerChange(career)
                  }
                >

                  <div className="skill-gap-career-icon">
                    {data.icon}
                  </div>

                  <div>
                    <h3>
                      {career}
                    </h3>

                    <p>
                      {data.requiredSkills.length} key skills
                    </p>
                  </div>

                </button>

              )
            )}

          </div>

        </section>

        {/* YOUR SKILLS */}
        <section className="skill-gap-section">

          <div className="skill-gap-section-heading">

            <div className="skill-gap-number">
              02
            </div>

            <div>
              <span>YOUR CURRENT SKILLS</span>

              <h2>
                Select the skills you already know
              </h2>

              <p>
                Choose all the skills you are comfortable using.
              </p>
            </div>

          </div>

          <div className="skill-gap-skill-box">

            <div className="skill-gap-skill-grid">

              {allSkills.map((skill) => (

                <button
                  key={skill}
                  type="button"
                  className={
                    selectedSkills.includes(skill)
                      ? "skill-option selected"
                      : "skill-option"
                  }
                  onClick={() => toggleSkill(skill)}
                >
                  {selectedSkills.includes(skill)
                    ? "✓ "
                    : "+ "}

                  {skill}
                </button>

              ))}

            </div>

            <div className="skill-gap-skill-actions">

              <span>
                {selectedSkills.length} skill
                {selectedSkills.length === 1
                  ? ""
                  : "s"} selected
              </span>

              <button
                type="button"
                onClick={clearSkills}
              >
                Clear All
              </button>

            </div>

          </div>

        </section>

        {/* ANALYSIS */}
        <section className="skill-gap-section">

          <div className="skill-gap-section-heading">

            <div className="skill-gap-number">
              03
            </div>

            <div>
              <span>YOUR ANALYSIS</span>

              <h2>
                Your Skill Gap
              </h2>

              <p>
                See how your current skills compare with the selected career.
              </p>
            </div>

          </div>

          {/* CAREER SUMMARY */}
          <div className="skill-gap-career-summary">

            <div className="skill-gap-summary-icon">
              {currentCareer.icon}
            </div>

            <div>

              <span>
                SELECTED CAREER
              </span>

              <h3>
                {selectedCareer}
              </h3>

              <p>
                {currentCareer.description}
              </p>

            </div>

          </div>

          {/* PROGRESS */}
          <div className="skill-gap-progress-card">

            <div className="skill-gap-progress-top">

              <div>

                <span>
                  SKILL MATCH
                </span>

                <h3>
                  {analysis.progress}%
                </h3>

              </div>

              <div className="skill-gap-progress-text">
                {analysis.matchedSkills.length} of{" "}
                {currentCareer.requiredSkills.length} required skills
                matched
              </div>

            </div>

            <div className="skill-gap-progress-bar">

              <div
                className="skill-gap-progress-fill"
                style={{
                  width: `${analysis.progress}%`,
                }}
              />

            </div>

          </div>

          {/* MATCHED + MISSING */}
          <div className="skill-gap-result-grid">

            <div className="skill-gap-result-card matched">

              <div className="skill-gap-result-header">
                <div className="skill-gap-result-icon">
                  ✓
                </div>

                <div>
                  <span>
                    YOU HAVE
                  </span>

                  <h3>
                    Matched Skills
                  </h3>
                </div>
              </div>

              {analysis.matchedSkills.length > 0 ? (

                <div className="skill-gap-tags">

                  {analysis.matchedSkills.map(
                    (skill) => (
                      <span key={skill}>
                        ✓ {skill}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <p className="skill-gap-empty-text">
                  Select your current skills above to see
                  matching skills.
                </p>

              )}

            </div>

            <div className="skill-gap-result-card missing">

              <div className="skill-gap-result-header">
                <div className="skill-gap-result-icon">
                  +
                </div>

                <div>
                  <span>
                    NEXT TO LEARN
                  </span>

                  <h3>
                    Skill Gaps
                  </h3>
                </div>
              </div>

              {analysis.missingSkills.length > 0 ? (

                <div className="skill-gap-tags">

                  {analysis.missingSkills.map(
                    (skill) => (
                      <span key={skill}>
                        + {skill}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <p className="skill-gap-empty-text">
                  Great! You have selected all the key
                  skills for this career.
                </p>

              )}

            </div>

          </div>

        </section>

        {/* LEARNING PLAN */}
        <section className="skill-gap-learning-section">

          <div className="skill-gap-learning-icon">
            🚀
          </div>

          <div className="skill-gap-learning-content">

            <span>
              RECOMMENDED NEXT STEP
            </span>

            <h2>
              Start with your missing skills
            </h2>

            <p>
              Focus on one missing skill at a time, practise it
              through a small project and then add it to your
              portfolio.
            </p>

            <div className="skill-gap-learning-list">

              {analysis.missingSkills.slice(0, 4).map(
                (skill, index) => (

                  <div
                    key={skill}
                    className="skill-gap-learning-item"
                  >

                    <strong>
                      {String(index + 1).padStart(2, "0")}
                    </strong>

                    <div>
                      <h3>
                        Learn {skill}
                      </h3>

                      <p>
                        Learn the basics and practise with a small
                        project.
                      </p>
                    </div>

                  </div>

                )
              )}

              {analysis.missingSkills.length === 0 && (

                <div className="skill-gap-complete-message">
                  🎉 You have selected all the important skills for
                  this career. Keep practising and build projects.
                </div>

              )}

            </div>

          </div>

        </section>

        {/* PROJECT IDEAS */}
        <section className="skill-gap-section">

          <div className="skill-gap-section-heading">

            <div className="skill-gap-number">
              04
            </div>

            <div>
              <span>BUILD PRACTICAL EXPERIENCE</span>

              <h2>
                Project Ideas
              </h2>

              <p>
                Use projects to practise your skills and strengthen your portfolio.
              </p>
            </div>

          </div>

          <div className="skill-gap-project-grid">

            {currentCareer.suggestedProjects.map(
              (project, index) => (

                <div
                  className="skill-gap-project-card"
                  key={project}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {project}
                  </h3>

                  <p>
                    Build this project to practise your
                    career-related skills.
                  </p>

                </div>

              )
            )}

          </div>

        </section>

        {/* NEXT ACTIONS */}
        <section className="skill-gap-next-section">

          <div>

            <span>
              KEEP BUILDING
            </span>

            <h2>
              Turn your skill gap into a career roadmap
            </h2>

            <p>
              After identifying your missing skills, use your
              roadmap and opportunities to continue learning.
            </p>

          </div>

          <div className="skill-gap-next-actions">

            <Link
              to={`/skills-roadmap?career=${encodeURIComponent(selectedCareer)}`}
              className="skill-gap-primary-button"
            >
              View Skills Roadmap →
            </Link>

            <Link
              to="/opportunities"
              className="skill-gap-secondary-button"
            >
              Explore Opportunities →
            </Link>

          </div>

        </section>

        {/* DEMO NOTE */}
        <p className="skill-gap-demo-note">
          Skill requirements shown here are structured guidance
          for the frontend. Career skill requirements can vary
          by role and employer and can be refined later through
          backend data.
        </p>

      </main>

      {/* FOOTER */}
      <footer className="skill-gap-footer">

        <p>
          © 2026 CareerScholarshipPlatform
        </p>

        <p>
          Helping students understand and build career skills.
        </p>

      </footer>

    </div>
  );
}

export default SkillGapAnalyzer;