import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./SavedTracker.css";

function SavedTracker() {
  const [savedCareer, setSavedCareer] = useState("");
  const [savedCareerId, setSavedCareerId] = useState(null);

  const [savedItems, setSavedItems] = useState([]);

  // Saved Scholarships
  const [savedScholarships, setSavedScholarships] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");

  // =========================================================
  // DEMO DEADLINE DATA
  // =========================================================

  const demoDeadlines = [
    {
      id: 1,
      title: "Web Development Internship",
      type: "Internship",
      deadline: "2026-10-05",
      icon: "💻",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Student Innovation Hackathon",
      type: "Hackathon",
      deadline: "2026-10-12",
      icon: "🏆",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Resume Building Workshop",
      type: "Workshop",
      deadline: "2026-10-18",
      icon: "📄",
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Cybersecurity Learning Opportunity",
      type: "Certification",
      deadline: "2026-10-25",
      icon: "🔐",
      status: "Upcoming",
    },
  ];

  // =========================================================
  // LOAD ALL SAVED DATA
  // =========================================================

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.id) {
          setSavedCareer("");
          setSavedCareerId(null);
          setSavedItems([]);
          setSavedScholarships([]);
          return;
        }

        // =====================================================
        // LOAD SAVED CAREER
        // =====================================================

        const careerResponse = await fetch(
          `http://localhost:5000/api/saved-careers/${student.id}`
        );

        const careerData = await careerResponse.json();

        if (
          careerResponse.ok &&
          Array.isArray(careerData.savedCareers) &&
          careerData.savedCareers.length > 0
        ) {
          const latestCareer = careerData.savedCareers[0];

          setSavedCareer(latestCareer.career_name);
          setSavedCareerId(latestCareer.id);
        } else {
          setSavedCareer("");
          setSavedCareerId(null);
        }

        // =====================================================
        // LOAD SAVED OPPORTUNITIES
        // =====================================================

        const opportunityResponse = await fetch(
          `http://localhost:5000/api/saved-opportunities/${student.id}`
        );

        const opportunityData =
          await opportunityResponse.json();

        if (
          opportunityResponse.ok &&
          Array.isArray(
            opportunityData.savedOpportunities
          )
        ) {
          const formattedItems =
            opportunityData.savedOpportunities.map(
              (item) => ({
                id: item.opportunity_id,
                saved_record_id: item.id,
                title: item.title,
                type: item.type,
                deadline: item.deadline,
                icon: item.icon,
              })
            );

          setSavedItems(formattedItems);
        } else {
          setSavedItems([]);
        }

        // =====================================================
        // LOAD SAVED SCHOLARSHIPS
        // =====================================================

        const scholarshipResponse = await fetch(
          `http://localhost:5000/api/saved-scholarships/${student.id}`
        );

        const scholarshipData =
          await scholarshipResponse.json();

        if (
          scholarshipResponse.ok &&
          Array.isArray(
            scholarshipData.savedScholarships
          )
        ) {
          setSavedScholarships(
            scholarshipData.savedScholarships
          );
        } else {
          setSavedScholarships([]);
        }
      } catch (error) {
        console.error(
          "Unable to load saved data:",
          error
        );

        setSavedCareer("");
        setSavedCareerId(null);
        setSavedItems([]);
        setSavedScholarships([]);
      }
    };

    loadSavedData();
  }, []);

  // =========================================================
  // SAVE OPPORTUNITY
  // =========================================================

  const saveOpportunity = async (item) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.id) {
        alert("Please login first.");
        return;
      }

      const alreadySaved = savedItems.some(
        (savedItem) => savedItem.id === item.id
      );

      if (alreadySaved) {
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/saved-opportunity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: student.id,
            opportunity_id: item.id,
            title: item.title,
            type: item.type,
            deadline: item.deadline,
            icon: item.icon,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to save opportunity."
        );
        return;
      }

      const savedOpportunity =
        data.savedOpportunity;

      const newSavedItem = {
        id: savedOpportunity.opportunity_id,
        saved_record_id: savedOpportunity.id,
        title: savedOpportunity.title,
        type: savedOpportunity.type,
        deadline: savedOpportunity.deadline,
        icon: savedOpportunity.icon,
      };

      setSavedItems((previousItems) => [
        ...previousItems,
        newSavedItem,
      ]);

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

  // =========================================================
  // REMOVE OPPORTUNITY
  // =========================================================

  const removeOpportunity = async (
    opportunityId
  ) => {
    try {
      const savedItem = savedItems.find(
        (item) => item.id === opportunityId
      );

      if (!savedItem?.saved_record_id) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/saved-opportunity/${savedItem.saved_record_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to remove opportunity."
        );
        return;
      }

      setSavedItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== opportunityId
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

  // =========================================================
  // REMOVE SAVED CAREER
  // =========================================================

  const removeCareer = async () => {
    if (!savedCareerId) {
      setSavedCareer("");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/saved-career/${savedCareerId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to remove saved career."
        );
        return;
      }

      setSavedCareer("");
      setSavedCareerId(null);

      localStorage.removeItem(
        "savedCareer"
      );

      alert(
        "Saved career removed successfully!"
      );
    } catch (error) {
      console.error(
        "Remove career error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  // =========================================================
  // REMOVE SAVED SCHOLARSHIP
  // =========================================================

  const removeScholarship = async (
    savedScholarshipId
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/saved-scholarship/${savedScholarshipId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to remove scholarship."
        );
        return;
      }

      setSavedScholarships(
        (previousScholarships) =>
          previousScholarships.filter(
            (scholarship) =>
              scholarship.id !==
              savedScholarshipId
          )
      );

      alert(
        "Saved scholarship removed successfully!"
      );
    } catch (error) {
      console.error(
        "Remove scholarship error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Not available";
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // DAYS LEFT
  // =========================================================

  const getDaysLeft = (dateString) => {
    const today = new Date();

    const deadline = new Date(
      `${dateString}T00:00:00`
    );

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const difference =
      deadline.getTime() -
      today.getTime();

    return Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );
  };

  // =========================================================
  // FILTER DEADLINES
  // =========================================================

  const filteredDeadlines = useMemo(() => {
    if (activeFilter === "All") {
      return demoDeadlines;
    }

    return demoDeadlines.filter(
      (item) =>
        item.type === activeFilter
    );
  }, [activeFilter]);

  return (
    <div className="saved-tracker-page">

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

      <section className="saved-tracker-hero">

        <div className="saved-tracker-hero-icon">
          🔖
        </div>

        <div>

          <span className="saved-tracker-tag">
            MY CAREER TRACKER
          </span>

          <h1>
            Saved & Deadline Tracker
          </h1>

          <p>
            Keep your important careers,
            scholarships, opportunities and
            deadlines organised in one simple place.
          </p>

        </div>

      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="saved-tracker-container">

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <section className="tracker-overview">

          <div className="tracker-stat-card">

            <div className="tracker-stat-icon">
              🔖
            </div>

            <div>

              <span>
                SAVED ITEMS
              </span>

              <strong>
                {savedItems.length +
                  savedScholarships.length}
              </strong>

            </div>

          </div>

          <div className="tracker-stat-card">

            <div className="tracker-stat-icon">
              ⏰
            </div>

            <div>

              <span>
                UPCOMING
              </span>

              <strong>
                {demoDeadlines.length}
              </strong>

            </div>

          </div>

          <div className="tracker-stat-card">

            <div className="tracker-stat-icon">
              🎯
            </div>

            <div>

              <span>
                SAVED CAREER
              </span>

              <strong>
                {savedCareer ? "1" : "0"}
              </strong>

            </div>

          </div>

        </section>

        {/* ===================================================
            SAVED CAREER
        =================================================== */}

        <section className="saved-career-section">

          <div className="saved-section-heading">

            <div className="saved-section-heading-icon">
              🎯
            </div>

            <div>

              <span>
                MY CAREER
              </span>

              <h2>
                Saved Career
              </h2>

              <p>
                Your selected career from Career Explorer
                appears here.
              </p>

            </div>

          </div>

          {savedCareer ? (

            <div className="saved-career-card">

              <div className="saved-career-main">

                <div className="saved-career-icon">
                  🚀
                </div>

                <div>

                  <span>
                    SAVED CAREER
                  </span>

                  <h3>
                    {savedCareer}
                  </h3>

                  <p>
                    Continue exploring the required
                    skills, roadmap and opportunities
                    for this career.
                  </p>

                </div>

              </div>

              <div className="saved-career-actions">

                <Link
                  to="/career-explorer"
                  className="saved-primary-button"
                >
                  Explore Career →
                </Link>

                <button
                  type="button"
                  className="saved-remove-button"
                  onClick={removeCareer}
                >
                  Remove
                </button>

              </div>

            </div>

          ) : (

            <div className="tracker-empty-card">

              <div className="tracker-empty-icon">
                🧭
              </div>

              <h3>
                No career saved yet
              </h3>

              <p>
                Visit Career Explorer and save
                a career to track it here.
              </p>

              <Link
                to="/career-explorer"
                className="saved-primary-button"
              >
                Explore Careers →
              </Link>

            </div>

          )}

        </section>

        {/* ===================================================
            SAVED SCHOLARSHIPS
        =================================================== */}

        <section className="saved-scholarships-section">

          <div className="saved-section-heading">

            <div className="saved-section-heading-icon">
              🎓
            </div>

            <div>

              <span>
                MY SCHOLARSHIPS
              </span>

              <h2>
                Saved Scholarships
              </h2>

              <p>
                Keep scholarships you are interested
                in ready for later.
              </p>

            </div>

          </div>

          {savedScholarships.length > 0 ? (

            <div className="saved-scholarships-grid">

              {savedScholarships.map(
                (scholarship) => (

                  <div
                    className="saved-scholarship-card"
                    key={scholarship.id}
                  >

                    <div className="saved-scholarship-top">

                      <div className="saved-scholarship-icon">
                        🎓
                      </div>

                      <button
                        type="button"
                        className="saved-delete-button"
                        onClick={() =>
                          removeScholarship(
                            scholarship.id
                          )
                        }
                        aria-label={`Remove ${scholarship.name}`}
                      >
                        ×
                      </button>

                    </div>

                    <span className="saved-scholarship-label">
                      SAVED SCHOLARSHIP
                    </span>

                    <h3>
                      {scholarship.name}
                    </h3>

                    <p className="saved-scholarship-date">
                      Saved on{" "}
                      {scholarship.created_at
                        ? formatDate(
                            scholarship.created_at
                              .split(" ")[0]
                          )
                        : "Recently"}
                    </p>

                    <div className="saved-scholarship-actions">

                      <Link
                        to="/scholarships"
                        className="saved-primary-button"
                      >
                        View Scholarships →
                      </Link>

                      <button
                        type="button"
                        className="saved-remove-button"
                        onClick={() =>
                          removeScholarship(
                            scholarship.id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="tracker-empty-card">

              <div className="tracker-empty-icon">
                🎓
              </div>

              <h3>
                No scholarships saved yet
              </h3>

              <p>
                Visit Scholarship Matcher and
                save scholarships that interest you.
              </p>

              <Link
                to="/scholarships"
                className="saved-primary-button"
              >
                Find Scholarships →
              </Link>

            </div>

          )}

        </section>

        {/* ===================================================
            SAVED OPPORTUNITIES
        =================================================== */}

        <section className="saved-items-section">

          <div className="saved-section-heading">

            <div className="saved-section-heading-icon">
              🔖
            </div>

            <div>

              <span>
                SAVED OPPORTUNITIES
              </span>

              <h2>
                My Saved Items
              </h2>

              <p>
                Keep important opportunities ready
                for later.
              </p>

            </div>

          </div>

          {savedItems.length > 0 ? (

            <div className="saved-items-grid">

              {savedItems.map(
                (item) => (

                  <div
                    className="saved-item-card"
                    key={item.id}
                  >

                    <div className="saved-item-top">

                      <div className="saved-item-icon">
                        {item.icon}
                      </div>

                      <button
                        type="button"
                        className="saved-delete-button"
                        onClick={() =>
                          removeOpportunity(
                            item.id
                          )
                        }
                        aria-label={`Remove ${item.title}`}
                      >
                        ×
                      </button>

                    </div>

                    <span className="saved-item-type">
                      {item.type}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <div className="saved-item-deadline">

                      <span>
                        Deadline
                      </span>

                      <strong>
                        {formatDate(
                          item.deadline
                        )}
                      </strong>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="tracker-empty-card">

              <div className="tracker-empty-icon">
                📌
              </div>

              <h3>
                No saved opportunities
              </h3>

              <p>
                Save useful internships,
                hackathons or other opportunities
                to keep them in your tracker.
              </p>

              <Link
                to="/opportunities"
                className="saved-primary-button"
              >
                Explore Opportunities →
              </Link>

            </div>

          )}

        </section>

        {/* ===================================================
            DEADLINES
        =================================================== */}

        <section className="deadline-section">

          <div className="saved-section-heading">

            <div className="saved-section-heading-icon">
              ⏰
            </div>

            <div>

              <span>
                DEADLINE TRACKER
              </span>

              <h2>
                Upcoming Deadlines
              </h2>

              <p>
                Check important dates and plan
                your applications in advance.
              </p>

            </div>

          </div>

          {/* FILTERS */}

          <div className="deadline-filters">

            {[
              "All",
              "Internship",
              "Hackathon",
              "Workshop",
              "Certification",
            ].map(
              (filter) => (

                <button
                  key={filter}
                  type="button"
                  className={
                    activeFilter === filter
                      ? "deadline-filter active"
                      : "deadline-filter"
                  }
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                >
                  {filter}
                </button>

              )
            )}

          </div>

          <div className="deadline-list">

            {filteredDeadlines.map(
              (item) => {

                const daysLeft =
                  getDaysLeft(
                    item.deadline
                  );

                const isSaved =
                  savedItems.some(
                    (savedItem) =>
                      savedItem.id === item.id
                  );

                return (

                  <div
                    className="deadline-card"
                    key={item.id}
                  >

                    <div className="deadline-icon">
                      {item.icon}
                    </div>

                    <div className="deadline-main">

                      <span className="deadline-type">
                        {item.type}
                      </span>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        Deadline:{" "}
                        {formatDate(
                          item.deadline
                        )}
                      </p>

                    </div>

                    <div className="deadline-right">

                      <div
                        className={
                          daysLeft <= 7
                            ? "deadline-days urgent"
                            : "deadline-days"
                        }
                      >
                        {daysLeft > 0
                          ? `${daysLeft} days left`
                          : daysLeft === 0
                          ? "Due today"
                          : "Deadline passed"}
                      </div>

                      <button
                        type="button"
                        className={
                          isSaved
                            ? "deadline-save saved"
                            : "deadline-save"
                        }
                        onClick={() =>
                          isSaved
                            ? removeOpportunity(
                                item.id
                              )
                            : saveOpportunity(
                                item
                              )
                        }
                      >
                        {isSaved
                          ? "✓ Saved"
                          : "🔖 Save"}
                      </button>

                    </div>

                  </div>

                );
              }
            )}

          </div>

          <p className="tracker-demo-note">
            Demo deadline data is shown for
            the frontend. Official scholarship
            and opportunity deadlines will be
            connected to verified sources later.
          </p>

        </section>

        {/* ===================================================
            NEXT STEP
        =================================================== */}

        <section className="tracker-next-section">

          <div className="tracker-next-icon">
            🚀
          </div>

          <div>

            <span>
              KEEP MOVING FORWARD
            </span>

            <h2>
              Build your career step by step
            </h2>

            <p>
              Use Career Explorer, Skills Roadmap
              and Opportunities together to plan
              your next career steps.
            </p>

            <div className="tracker-next-actions">

              <Link
                to="/skills-roadmap"
                className="tracker-primary-button"
              >
                View Skills Roadmap →
              </Link>

              <Link
                to="/opportunities"
                className="tracker-secondary-button"
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

      <footer className="saved-tracker-footer">

        <p>
          © 2026 CareerScholarshipPlatform
        </p>

        <p>
          Helping students plan their career journey.
        </p>

      </footer>

    </div>
  );
}

export default SavedTracker;