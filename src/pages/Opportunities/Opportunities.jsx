import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Opportunities.css";

const opportunitiesData = [
  {
    id: 1,
    title: "AICTE National Internship Portal",
    category: "Internships",
    icon: "💻",
    type: "Internship",
    mode: "Online / Hybrid / Onsite",
    description:
      "Explore internship opportunities listed through the AICTE National Internship Portal for students.",
    skills: ["Technology", "Projects", "Industry Experience"],
    level: "Beginner",
    eligibility:
      "Students can create a profile and explore internships according to their education, skills and preferences.",
    deadline: "Check official page",
    applyInfo:
      "Use the official AICTE National Internship Portal to view current internship listings, eligibility and application details.",
    officialLink:
      "https://internship.aicte-india.org/internships",
  },

  {
    id: 2,
    title: "Programming with Python - NPTEL",
    category: "Training",
    icon: "🐍",
    type: "Training",
    mode: "Online",
    description:
      "Learn programming and problem solving with Python through an official NPTEL course.",
    skills: ["Python", "Programming", "Problem Solving"],
    level: "Beginner",
    eligibility:
      "The course is designed for learners interested in learning programming and Python fundamentals.",
    deadline: "Check official page",
    applyInfo:
      "Open the official NPTEL course page to check the current course schedule, enrollment and examination information.",
    officialLink:
      "https://www.nptel.ac.in/courses/106106182",
  },

  {
    id: 3,
    title: "Figma Learn Design",
    category: "Training",
    icon: "🎨",
    type: "Design Learning",
    mode: "Online",
    description:
      "Learn digital design fundamentals and build understanding of UI and product design concepts with Figma.",
    skills: ["UI Design", "UX", "Figma"],
    level: "Beginner",
    eligibility:
      "Suitable for students and beginners interested in digital design and UI/UX.",
    deadline: "Not applicable",
    applyInfo:
      "Use the official Figma learning resources to explore design fundamentals and guided learning material.",
    officialLink:
      "https://www.figma.com/resource-library/getting-started-in-design/",
  },

  {
    id: 4,
    title: "Google Developer Codelabs",
    category: "Training",
    icon: "🌐",
    type: "Developer Learning",
    mode: "Online",
    description:
      "Practise development through guided hands-on codelabs and technical learning experiences.",
    skills: ["Web Development", "Programming", "Development Tools"],
    level: "Beginner",
    eligibility:
      "Suitable for learners who want practical experience with Google developer technologies.",
    deadline: "Not applicable",
    applyInfo:
      "Open the official Google Developers Codelabs page and choose a learning activity that matches your interests.",
    officialLink:
      "https://developers.google.com/codelabs",
  },

  {
    id: 5,
    title: "Cisco Cybersecurity Essentials",
    category: "Certifications",
    icon: "🔐",
    type: "Certification-aligned Course",
    mode: "Online / Instructor-led",
    description:
      "Build foundational cybersecurity knowledge covering threats, network security and security practices.",
    skills: ["Cybersecurity", "Networking", "Security"],
    level: "Beginner",
    eligibility:
      "Suitable for students and beginners who want to start learning cybersecurity concepts.",
    deadline: "Check official page",
    applyInfo:
      "Open the official Cisco Networking Academy course page to check course availability and enrollment options.",
    officialLink:
      "https://www.netacad.com/courses/cybersecurity-essentials/1000",
  },

  {
    id: 6,
    title: "HubSpot Digital Marketing Learning",
    category: "Certifications",
    icon: "📱",
    type: "Certification / Training",
    mode: "Online",
    description:
      "Learn digital marketing, social media and other business skills through HubSpot Academy.",
    skills: ["Digital Marketing", "Social Media", "Content"],
    level: "Beginner",
    eligibility:
      "Suitable for students, job seekers and beginners interested in marketing and digital skills.",
    deadline: "Check official page",
    applyInfo:
      "Open the official HubSpot Academy page to view current training and certification options.",
    officialLink:
      "https://academy.hubspot.com/courses/marketing",
  },

  {
    id: 7,
    title: "Smart India Hackathon",
    category: "Hackathons",
    icon: "🏆",
    type: "Hackathon",
    mode: "Team-based",
    description:
      "Explore the official Smart India Hackathon platform and student innovation opportunities.",
    skills: ["Problem Solving", "Innovation", "Teamwork"],
    level: "Intermediate",
    eligibility:
      "Students should check the current official edition rules, institution requirements and participation process.",
    deadline: "Check official page",
    applyInfo:
      "Open the official Smart India Hackathon website for the latest edition information, problem statements and participation updates.",
    officialLink:
      "https://www.sih.gov.in/",
  },

  {
    id: 8,
    title: "Google Cloud for Students",
    category: "Training",
    icon: "☁️",
    type: "Cloud Learning",
    mode: "Online",
    description:
      "Explore Google Cloud learning resources, hands-on labs, skill badges and student opportunities.",
    skills: ["Cloud", "AI", "Data"],
    level: "Beginner",
    eligibility:
      "Suitable for students interested in cloud computing and Google technologies.",
    deadline: "Not applicable",
    applyInfo:
      "Open the official Google Cloud student page to explore available learning resources and student programs.",
    officialLink:
      "https://cloud.google.com/edu/students",
  },

  {
    id: 9,
    title: "Microsoft Learn Developer Training",
    category: "Training",
    icon: "🧑‍💻",
    type: "Developer Training",
    mode: "Online",
    description:
      "Build development skills through Microsoft Learn modules and career-focused learning paths.",
    skills: ["Programming", "Web Development", "Cloud"],
    level: "Beginner",
    eligibility:
      "Suitable for learners who want to develop technical skills through self-paced Microsoft learning resources.",
    deadline: "Not applicable",
    applyInfo:
      "Open the official Microsoft Learn developer training page to explore learning paths and modules.",
    officialLink:
      "https://learn.microsoft.com/en-us/training/career-paths/developer",
  },

  {
    id: 10,
    title: "Upwork Beginner Freelancer Guide",
    category: "Freelancing",
    icon: "💼",
    type: "Freelancing",
    mode: "Online",
    description:
      "Learn the basics of creating a freelancer profile, finding projects and starting freelance work.",
    skills: ["Portfolio", "Communication", "Client Work"],
    level: "Beginner",
    eligibility:
      "Suitable for beginners who want to understand the basics of freelancing and online project work.",
    deadline: "Not applicable",
    applyInfo:
      "Open the official Upwork beginner guide to understand how freelancing works and how to prepare your profile.",
    officialLink:
      "https://www.upwork.com/resources/upwork-for-beginners",
  },
];

const categories = [
  "All",
  "Internships",
  "Hackathons",
  "Certifications",
  "Training",
  "Freelancing",
];

function Opportunities() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [savedOpportunityIds, setSavedOpportunityIds] =
    useState([]);

  /* =========================================================
     LOAD SAVED OPPORTUNITIES FROM SQLITE
  ========================================================= */

  useEffect(() => {
    const loadSavedOpportunities = async () => {
      try {
        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.id) {
          setSavedOpportunityIds([]);
          return;
        }

        const response = await fetch(
          `http://career-scholarship-backend.onrender.com/api/saved-opportunities/${student.id}`
        );

        const data = await response.json();

        if (
          response.ok &&
          Array.isArray(data.savedOpportunities)
        ) {
          const savedIds =
            data.savedOpportunities.map(
              (item) => item.opportunity_id
            );

          setSavedOpportunityIds(
            savedIds
          );
        } else {
          setSavedOpportunityIds([]);
        }
      } catch (error) {
        console.error(
          "Unable to load saved opportunities:",
          error
        );

        setSavedOpportunityIds([]);
      }
    };

    loadSavedOpportunities();
  }, []);

  /* =========================================================
     SAVE OPPORTUNITY TO SQLITE
  ========================================================= */

  const handleSaveOpportunity = async (
    opportunity
  ) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.id) {
        alert("Please login first.");
        return;
      }

      const isAlreadySaved =
        savedOpportunityIds.includes(
          opportunity.id
        );

      if (isAlreadySaved) {
        return;
      }

      const response = await fetch(
        "http://career-scholarship-backend.onrender.com/api/saved-opportunity",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            student_id: student.id,
            opportunity_id: opportunity.id,
            title: opportunity.title,
            type: opportunity.type,
            deadline: opportunity.deadline,
            icon: opportunity.icon,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to save opportunity."
        );

        return;
      }

      setSavedOpportunityIds(
        (previousIds) => [
          ...previousIds,
          opportunity.id,
        ]
      );

      alert(
        "Opportunity saved successfully!"
      );
    } catch (error) {
      console.error(
        "Save opportunity error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  /* =========================================================
     REMOVE OPPORTUNITY FROM SQLITE
  ========================================================= */

  const handleRemoveOpportunity = async (
    opportunity
  ) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.id) {
        alert("Please login first.");
        return;
      }

      const response = await fetch(
        `http://career-scholarship-backend.onrender.com/api/saved-opportunities/${student.id}`
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to find saved opportunity."
        );

        return;
      }

      const savedOpportunity =
        data.savedOpportunities.find(
          (item) =>
            item.opportunity_id ===
            opportunity.id
        );

      if (!savedOpportunity) {
        setSavedOpportunityIds(
          (previousIds) =>
            previousIds.filter(
              (id) =>
                id !== opportunity.id
            )
        );

        return;
      }

      const deleteResponse =
        await fetch(
          `http://career-scholarship-backend.onrender.com/api/saved-opportunity/${savedOpportunity.id}`,
          {
            method: "DELETE",
          }
        );

      const deleteData =
        await deleteResponse.json();

      if (!deleteResponse.ok) {
        alert(
          deleteData.message ||
            "Unable to remove opportunity."
        );

        return;
      }

      setSavedOpportunityIds(
        (previousIds) =>
          previousIds.filter(
            (id) =>
              id !== opportunity.id
          )
      );

      alert(
        "Saved opportunity removed successfully!"
      );
    } catch (error) {
      console.error(
        "Remove opportunity error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  /* =========================================================
     VIEW OPPORTUNITY
  ========================================================= */

  const handleViewOpportunity = (
    opportunity
  ) => {
    setSelectedOpportunity(
      opportunity
    );
  };

  const closeOpportunity = () => {
    setSelectedOpportunity(null);
  };

  /* =========================================================
     OPEN OFFICIAL LINK
  ========================================================= */

  const openOfficialLink = (
    opportunity
  ) => {
    if (!opportunity?.officialLink) {
      alert(
        "Official link is not available."
      );

      return;
    }

    window.open(
      opportunity.officialLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================================
     FILTER OPPORTUNITIES
  ========================================================= */

  const filteredOpportunities =
    opportunitiesData.filter(
      (opportunity) => {

        const matchesCategory =
          activeCategory === "All" ||
          opportunity.category ===
            activeCategory;

        const searchText =
          search.toLowerCase();

        const matchesSearch =
          opportunity.title
            .toLowerCase()
            .includes(searchText) ||

          opportunity.category
            .toLowerCase()
            .includes(searchText) ||

          opportunity.type
            .toLowerCase()
            .includes(searchText) ||

          opportunity.mode
            .toLowerCase()
            .includes(searchText) ||

          opportunity.description
            .toLowerCase()
            .includes(searchText) ||

          opportunity.level
            .toLowerCase()
            .includes(searchText) ||

          opportunity.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(searchText)
          );

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );

  return (
    <div className="opportunities-page">

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
      <section className="opportunities-hero">

        <div className="opportunities-hero-icon">
          🚀
        </div>

        <div>

          <span className="opportunities-tag">
            CAREER GROWTH
          </span>

          <h1>
            Opportunities Hub
          </h1>

          <p>
            Discover internships, hackathons,
            certifications, training and other
            opportunities to build your career.
          </p>

        </div>

      </section>

      {/* MAIN CONTENT */}
      <main className="opportunities-container">

        {/* SEARCH */}
        <section className="opportunities-search-section">

          <h2 className="opportunities-section-title">
            Find Opportunities
          </h2>

          <div className="opportunities-search-box">

            <span>
              🔎
            </span>

            <input
              type="text"
              placeholder="Search internships, skills, certifications..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* CATEGORY FILTERS */}
          <div className="opportunities-categories">

            {categories.map(
              (category) => (

                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory ===
                    category
                      ? "active-opportunity-category"
                      : ""
                  }
                  onClick={() =>
                    setActiveCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>

              )
            )}

          </div>

        </section>

        {/* RESULTS */}
        <section>

          <div className="opportunities-section-title">

            <h2>
              {activeCategory ===
              "All"
                ? "Available Opportunities"
                : `${activeCategory} Opportunities`}
            </h2>

            <span>
              {filteredOpportunities.length} opportunities
            </span>

          </div>

          {filteredOpportunities.length ===
          0 ? (

            <div className="opportunities-empty">

              <div>
                🔍
              </div>

              <h3>
                No opportunities found
              </h3>

              <p>
                Try another search word or
                choose a different category.
              </p>

            </div>

          ) : (

            <div className="opportunities-grid">

              {filteredOpportunities.map(
                (opportunity) => {

                  const isSaved =
                    savedOpportunityIds.includes(
                      opportunity.id
                    );

                  return (

                    <div
                      className="opportunity-card"
                      key={
                        opportunity.id
                      }
                    >

                      <div className="opportunity-card-top">

                        <div className="opportunity-icon">
                          {
                            opportunity.icon
                          }
                        </div>

                        <span className="opportunity-type">
                          {
                            opportunity.category
                          }
                        </span>

                      </div>

                      <h3>
                        {
                          opportunity.title
                        }
                      </h3>

                      <div className="opportunity-info">

                        <span>
                          📌{" "}
                          {
                            opportunity.type
                          }
                        </span>

                        <span>
                          🌐{" "}
                          {
                            opportunity.mode
                          }
                        </span>

                        <span>
                          🎓{" "}
                          {
                            opportunity.level
                          }
                        </span>

                      </div>

                      <p>
                        {
                          opportunity.description
                        }
                      </p>

                      <div className="opportunity-skills">

                        {
                          opportunity.skills.map(
                            (skill) => (
                              <span
                                key={
                                  skill
                                }
                              >
                                {skill}
                              </span>
                            )
                          )
                        }

                      </div>

                      <div className="opportunity-card-actions">

                        <button
                          type="button"
                          className={
                            isSaved
                              ? "opportunity-save-button saved"
                              : "opportunity-save-button"
                          }
                          onClick={() =>
                            isSaved
                              ? handleRemoveOpportunity(
                                  opportunity
                                )
                              : handleSaveOpportunity(
                                  opportunity
                                )
                          }
                        >
                          {isSaved
                            ? "✓ Saved"
                            : "🔖 Save"}
                        </button>

                        <button
                          type="button"
                          className="opportunity-details-button"
                          onClick={() =>
                            handleViewOpportunity(
                              opportunity
                            )
                          }
                        >
                          View Opportunity →
                        </button>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </section>

        {/* CAREER GROWTH */}
        <section className="opportunity-growth">

          <div className="opportunities-section-title">

            <h2>
              Build Your Career Step by Step
            </h2>

          </div>

          <div className="growth-steps">

            <div>
              <span>
                1
              </span>

              <h3>
                Learn
              </h3>

              <p>
                Build knowledge and practical skills.
              </p>
            </div>

            <div>
              <span>
                2
              </span>

              <h3>
                Practise
              </h3>

              <p>
                Work on projects and challenges.
              </p>
            </div>

            <div>
              <span>
                3
              </span>

              <h3>
                Experience
              </h3>

              <p>
                Gain internships and real-world exposure.
              </p>
            </div>

            <div>
              <span>
                4
              </span>

              <h3>
                Grow
              </h3>

              <p>
                Prepare for jobs and future opportunities.
              </p>
            </div>

          </div>

        </section>

        {/* NEXT SECTION */}
        <section className="opportunities-next-section">

          <div className="next-opportunity-card">

            <div className="opportunities-hero-icon">
              🧭
            </div>

            <div>

              <h2>
                Not sure where to start?
              </h2>

              <p>
                Explore careers or talk to the AI
                Career Assistant to understand your
                next step.
              </p>

              <div className="career-next-actions">

                <Link
                  to="/career-explorer"
                  className="career-help-button"
                >
                  Explore Careers →
                </Link>

                <Link
                  to="/ai-career"
                  className="career-help-button"
                >
                  Ask AI Career Assistant →
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* DISCLAIMER */}
        <section className="opportunities-disclaimer">

          <strong>
            ℹ️ Official Resource Links
          </strong>

          <p>
            The links above open official provider
            websites. Availability, eligibility,
            registration windows and deadlines can
            change, so students should always verify
            the latest information on the official page
            before applying or enrolling.
          </p>

        </section>

      </main>

      {/* DETAILS MODAL */}
      {selectedOpportunity && (

        <div
          className="opportunity-modal-overlay"
          onClick={
            closeOpportunity
          }
        >

          <div
            className="opportunity-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}
            <div className="opportunity-modal-header">

              <div className="opportunity-modal-title">

                <div className="opportunity-modal-icon">
                  {
                    selectedOpportunity.icon
                  }
                </div>

                <div>

                  <span>
                    {
                      selectedOpportunity.category
                    }
                  </span>

                  <h2>
                    {
                      selectedOpportunity.title
                    }
                  </h2>

                </div>

              </div>

              <button
                type="button"
                className="opportunity-modal-close"
                onClick={
                  closeOpportunity
                }
                aria-label="Close opportunity details"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}
            <div className="opportunity-modal-content">

              <div className="opportunity-modal-tags">

                <span>
                  📌{" "}
                  {
                    selectedOpportunity.type
                  }
                </span>

                <span>
                  🌐{" "}
                  {
                    selectedOpportunity.mode
                  }
                </span>

                <span>
                  🎓{" "}
                  {
                    selectedOpportunity.level
                  }
                </span>

              </div>

              {/* ABOUT */}
              <div className="opportunity-modal-section">

                <h3>
                  About this opportunity
                </h3>

                <p>
                  {
                    selectedOpportunity.description
                  }
                </p>

              </div>

              {/* SKILLS */}
              <div className="opportunity-modal-section">

                <h3>
                  Skills you can build
                </h3>

                <div className="opportunity-modal-skills">

                  {
                    selectedOpportunity.skills.map(
                      (skill) => (
                        <span
                          key={
                            skill
                          }
                        >
                          {skill}
                        </span>
                      )
                    )
                  }

                </div>

              </div>

              {/* ELIGIBILITY */}
              <div className="opportunity-modal-section">

                <h3>
                  Who can consider this?
                </h3>

                <p>
                  {
                    selectedOpportunity.eligibility
                  }
                </p>

              </div>

              {/* DETAILS GRID */}
              <div className="opportunity-modal-grid">

                <div className="opportunity-modal-detail">

                  <span>
                    ⏰ Deadline
                  </span>

                  <strong>
                    {
                      selectedOpportunity.deadline
                    }
                  </strong>

                </div>

                <div className="opportunity-modal-detail">

                  <span>
                    📍 Mode
                  </span>

                  <strong>
                    {
                      selectedOpportunity.mode
                    }
                  </strong>

                </div>

                <div className="opportunity-modal-detail">

                  <span>
                    🎯 Level
                  </span>

                  <strong>
                    {
                      selectedOpportunity.level
                    }
                  </strong>

                </div>

              </div>

              {/* OFFICIAL LINK */}
              <div className="opportunity-apply-box">

                <h3>
                  Official source
                </h3>

                <p>
                  {
                    selectedOpportunity.applyInfo
                  }
                </p>

                <button
                  type="button"
                  onClick={() =>
                    openOfficialLink(
                      selectedOpportunity
                    )
                  }
                >
                  Open Official Link →
                </button>

              </div>

              {/* SAVE */}
              <div className="opportunity-apply-box">

                <h3>
                  Save this opportunity
                </h3>

                <p>
                  Save this opportunity to
                  your personal tracker so
                  you can review it later.
                </p>

                {savedOpportunityIds.includes(
                  selectedOpportunity.id
                ) ? (

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveOpportunity(
                        selectedOpportunity
                      )
                    }
                  >
                    ✓ Saved — Remove
                  </button>

                ) : (

                  <button
                    type="button"
                    onClick={() =>
                      handleSaveOpportunity(
                        selectedOpportunity
                      )
                    }
                  >
                    🔖 Save Opportunity
                  </button>

                )}

              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="opportunity-modal-footer">

              <button
                type="button"
                onClick={
                  closeOpportunity
                }
              >
                Close
              </button>

              <Link
                to="/career-explorer"
                className="opportunity-modal-career-link"
                onClick={
                  closeOpportunity
                }
              >
                Explore Careers →
              </Link>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}
      <footer className="opportunities-footer">

        <p>
          © 2026 CareerScholarshipPlatform
        </p>

        <p>
          Helping students discover their
          career opportunities.
        </p>

      </footer>

    </div>
  );
}

export default Opportunities;