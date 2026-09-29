import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ScholarshipMatcher.css";

/* =========================================================
   API
========================================================= */

const API_URL = "https://career-scholarship-backend.onrender.com";

/* =========================================================
   OFFICIAL SCHOLARSHIP SOURCES
   Verified government / official portals
========================================================= */

const officialSources = {
  "National Scholarship Portal":
    "https://scholarships.gov.in/All-Scholarships",

  "MahaDBT Maharashtra":
    "https://mahadbt.maharashtra.gov.in/",

  "AICTE Pragati Scholarship":
    "https://scholarships.gov.in/All-Scholarships",

  "AICTE Swanath Scholarship":
    "https://scholarships.gov.in/All-Scholarships",

  "AICTE Saksham Scholarship":
    "https://scholarships.gov.in/All-Scholarships",

  "National Fellowship and Scholarship for ST Students":
    "https://scholarships.gov.in/All-Scholarships",

  "Top Class Education for SC Students":
    "https://socialjustice.gov.in/schemes/27",

  "National Scholarship for Post Graduate Studies":
    "https://scholarships.gov.in/All-Scholarships",

  "PM-USP Central Sector Scholarship":
    "https://scholarships.gov.in/All-Scholarships",

  "Top Class Education for OBC/EBC/DNT Students":
    "https://scholarships.gov.in/All-Scholarships",
};


/* =========================================================
   FALLBACK DATA
   Used only if backend is unavailable
========================================================= */

const fallbackScholarships = [
  {
    id: 1,
    name: "National Scholarship Portal",
    category: "Government",
    level: "College",
    amount: "Varies by scheme",
    state: "All India",

    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma",
      "BCA",
      "BTech",
    ],

    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "Eligibility depends on the individual scholarship scheme listed on the National Scholarship Portal.",

    deadline:
      "Check official portal",

    keywords: [
      "national",
      "government",
      "scholarship",
      "college",
      "post matric",
      "higher education",
    ],

    description:
      "The National Scholarship Portal provides access to scholarship schemes offered by different government ministries and departments.",

    sourceUrl:
      officialSources["National Scholarship Portal"],
  },

  {
    id: 2,
    name: "MahaDBT Maharashtra Post-Matric Scholarship",
    category: "Government",
    level: "College",
    amount: "Varies by scheme",
    state: "Maharashtra",

    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma",
      "BCA",
      "BTech",
    ],

    studentCategories: [
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "Students must satisfy the eligibility conditions of the applicable Maharashtra scholarship scheme.",

    deadline:
      "Check MahaDBT portal",

    keywords: [
      "mahadbt",
      "maharashtra",
      "post matric",
      "sc",
      "st",
      "obc",
      "minority",
    ],

    description:
      "MahaDBT is the Maharashtra government's online platform for accessing and applying for various welfare and scholarship schemes.",

    sourceUrl:
      officialSources["MahaDBT Maharashtra"],
  },

  {
    id: 3,
    name: "AICTE Pragati Scholarship for Girl Students",
    category: "Girls",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "Engineering",
      "BTech",
      "Diploma",
    ],

    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "For eligible girl students pursuing technical education. Students must verify the current AICTE/NSP eligibility conditions.",

    deadline:
      "31 October 2026 for AY 2026-27 student applications listed on NSP",

    keywords: [
      "aicte",
      "pragati",
      "girls",
      "girl student",
      "technical education",
      "engineering",
      "btech",
      "diploma",
    ],

    description:
      "AICTE Pragati Scholarship Scheme supports eligible girl students pursuing technical education.",

    sourceUrl:
      officialSources["AICTE Pragati Scholarship"],
  },

  {
    id: 4,
    name: "AICTE Swanath Scholarship Scheme",
    category: "Government",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "Engineering",
      "BTech",
      "Diploma",
    ],

    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "Students must meet the current AICTE Swanath Scholarship eligibility conditions.",

    deadline:
      "31 October 2026 for AY 2026-27 student applications listed on NSP",

    keywords: [
      "aicte",
      "swanath",
      "technical",
      "engineering",
      "btech",
      "diploma",
    ],

    description:
      "AICTE Swanath Scholarship is a welfare-based scholarship scheme listed on the National Scholarship Portal.",

    sourceUrl:
      officialSources["AICTE Swanath Scholarship"],
  },

  {
    id: 5,
    name: "AICTE Saksham Scholarship Scheme",
    category: "Category Based",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "Engineering",
      "BTech",
      "Diploma",
    ],

    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "Students should verify the current AICTE eligibility requirements before applying.",

    deadline:
      "Check official NSP portal",

    keywords: [
      "aicte",
      "saksham",
      "technical education",
      "engineering",
      "diploma",
      "btech",
    ],

    description:
      "AICTE Saksham is a scholarship scheme for eligible students pursuing technical education.",

    sourceUrl:
      officialSources["AICTE Saksham Scholarship"],
  },

  {
    id: 6,
    name: "National Fellowship and Scholarship for ST Students",
    category: "Category Based",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "BTech",
      "BCA",
    ],

    studentCategories: [
      "ST",
    ],

    eligibility:
      "For eligible Scheduled Tribe students. Exact course, institution and academic requirements must be checked on the official NSP scheme page.",

    deadline:
      "31 October 2026 for AY 2026-27 student applications listed on NSP",

    keywords: [
      "st",
      "scheduled tribe",
      "tribal",
      "higher education",
      "national fellowship",
      "scholarship",
    ],

    description:
      "The National Scholarship Portal lists the National Fellowship and Scholarship for Higher Education of ST Students.",

    sourceUrl:
      officialSources[
        "National Fellowship and Scholarship for ST Students"
      ],
  },

  {
    id: 7,
    name: "Top Class Education for SC Students",
    category: "Category Based",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "BTech",
      "BCA",
    ],

    studentCategories: [
      "SC",
    ],

    eligibility:
      "For eligible SC students pursuing studies beyond Class 12 in empanelled institutions. Students should verify the current requirements.",

    deadline:
      "31 October 2026 for AY 2026-27 student applications listed on NSP",

    keywords: [
      "sc",
      "scheduled caste",
      "top class",
      "higher education",
      "college",
    ],

    description:
      "The Central Sector Scholarship of Top Class Education for SC Students provides financial support for eligible SC students pursuing higher education.",

    sourceUrl:
      officialSources[
        "Top Class Education for SC Students"
      ],
  },

  {
    id: 8,
    name: "National Scholarship for Post Graduate Studies",
    category: "Merit",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "MSc",
      "MA",
      "MCom",
      "MCA",
      "MBA",
      "Post Graduation",
    ],

    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "For eligible students pursuing postgraduate studies. Exact requirements should be verified on NSP.",

    deadline:
      "31 October 2026 for AY 2026-27 student applications listed on NSP",

    keywords: [
      "post graduate",
      "pg",
      "masters",
      "ugc",
      "higher education",
      "merit",
    ],

    description:
      "The National Scholarship for Post Graduate Studies is listed by UGC on the National Scholarship Portal.",

    sourceUrl:
      officialSources[
        "National Scholarship for Post Graduate Studies"
      ],
  },

  {
    id: 9,
    name: "PM-USP Central Sector Scholarship for College and University Students",
    category: "Merit",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "BTech",
      "BCA",
    ],

    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority",
    ],

    eligibility:
      "Eligibility depends on academic performance, income and other conditions specified by the current Central Sector Scholarship scheme.",

    deadline:
      "Check official NSP portal",

    keywords: [
      "pm usp",
      "central sector",
      "college",
      "university",
      "merit",
      "scholarship",
    ],

    description:
      "The PM-USP Central Sector Scheme of Scholarship for College and University Students is available through NSP.",

    sourceUrl:
      officialSources[
        "PM-USP Central Sector Scholarship"
      ],
  },

  {
    id: 10,
    name: "Top Class Education for OBC, EBC and DNT Students",
    category: "Category Based",
    level: "College",
    amount: "As per current scheme guidelines",
    state: "All India",

    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "BTech",
      "BCA",
    ],

    studentCategories: [
      "OBC",
    ],

    eligibility:
      "Eligible OBC, EBC and DNT students should verify the current scheme requirements and empanelled institutions.",

    deadline:
      "Check official NSP portal",

    keywords: [
      "obc",
      "ebc",
      "dnt",
      "top class",
      "higher education",
      "college",
    ],

    description:
      "The Department of Social Justice and Empowerment lists Top Class Education for OBC, EBC and DNT students.",

    sourceUrl:
      officialSources[
        "Top Class Education for OBC/EBC/DNT Students"
      ],
  },
];


/* =========================================================
   NORMALIZE SCHOLARSHIP
========================================================= */

const normalizeScholarship = (scholarship) => ({
  ...scholarship,

  courses: Array.isArray(scholarship.courses)
    ? scholarship.courses
    : [],

  studentCategories:
    Array.isArray(scholarship.studentCategories)
      ? scholarship.studentCategories
      : [],

  keywords: Array.isArray(scholarship.keywords)
    ? scholarship.keywords
    : [],

  sourceUrl:
    scholarship.sourceUrl ||
    officialSources[scholarship.name] ||
    "",
});


/* =========================================================
   COMPONENT
========================================================= */

function ScholarshipMatcher() {
  const [scholarships, setScholarships] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [educationLevel, setEducationLevel] =
    useState("Any");

  const [course, setCourse] =
    useState("Any");

  const [state, setState] =
    useState("Any");

  const [studentCategory, setStudentCategory] =
    useState("Any");

  const [scholarshipType, setScholarshipType] =
    useState("Any");

  const [selectedScholarship, setSelectedScholarship] =
    useState(null);

  const [savedScholarshipIds, setSavedScholarshipIds] =
    useState([]);

  const [showMatches, setShowMatches] =
    useState(false);

  const [loadingScholarships, setLoadingScholarships] =
    useState(true);


  /* =========================================================
     LOAD SCHOLARSHIPS
  ========================================================= */

  useEffect(() => {
    const loadScholarships = async () => {
      try {
        setLoadingScholarships(true);

        const response = await fetch(
          `${API_URL}/api/scholarships`
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load scholarships."
          );
        }

        const data = await response.json();

        if (
          Array.isArray(data.scholarships) &&
          data.scholarships.length > 0
        ) {
          setScholarships(
            data.scholarships.map(
              normalizeScholarship
            )
          );
        } else {
          setScholarships(
            fallbackScholarships
          );
        }
      } catch (error) {
        console.error(
          "Scholarship loading error:",
          error
        );

        setScholarships(
          fallbackScholarships
        );
      } finally {
        setLoadingScholarships(false);
      }
    };

    loadScholarships();
  }, []);


  /* =========================================================
     LOAD SAVED SCHOLARSHIPS
  ========================================================= */

  useEffect(() => {
    const loadSavedScholarships = async () => {
      try {
        const student = JSON.parse(
          localStorage.getItem("student")
        );

        if (!student?.id) {
          setSavedScholarshipIds([]);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/saved-scholarships/${student.id}`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (
          Array.isArray(
            data.savedScholarships
          )
        ) {
          setSavedScholarshipIds(
            data.savedScholarships.map(
              (item) =>
                Number(item.scholarship_id)
            )
          );
        }
      } catch (error) {
        console.error(
          "Saved scholarship loading error:",
          error
        );
      }
    };

    loadSavedScholarships();
  }, []);


  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setEducationLevel("Any");
    setCourse("Any");
    setState("Any");
    setStudentCategory("Any");
    setScholarshipType("Any");
    setSearch("");
    setShowMatches(false);
  };


  /* =========================================================
     FIND SCHOLARSHIPS
  ========================================================= */

  const findScholarships = () => {
    setShowMatches(true);
  };


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredScholarships =
    scholarships.filter((scholarship) => {
      const searchText =
        search.toLowerCase().trim();

      const searchableContent = [
        scholarship.name,
        scholarship.category,
        scholarship.level,
        scholarship.amount,
        scholarship.state,
        scholarship.eligibility,
        scholarship.description,
        ...(scholarship.courses || []),
        ...(scholarship.keywords || []),
        ...(scholarship.studentCategories || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchText === "" ||
        searchableContent.includes(
          searchText
        );

      const matchesEducation =
        educationLevel === "Any" ||
        scholarship.level === educationLevel;

      const matchesCourse =
        course === "Any" ||
        (scholarship.courses || []).includes(
          course
        );

      const matchesState =
        state === "Any" ||
        scholarship.state === "All India" ||
        scholarship.state === state;

      const matchesCategory =
        studentCategory === "Any" ||
        (
          scholarship.studentCategories || []
        ).includes(studentCategory);

      const matchesType =
        scholarshipType === "Any" ||
        scholarship.category === scholarshipType;

      return (
        matchesSearch &&
        matchesEducation &&
        matchesCourse &&
        matchesState &&
        matchesCategory &&
        matchesType
      );
    });


  /* =========================================================
     DETAILS
  ========================================================= */

  const handleViewDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
  };


  const handleCloseDetails = () => {
    setSelectedScholarship(null);
  };


  /* =========================================================
     OPEN OFFICIAL SOURCE
  ========================================================= */

  const handleOpenOfficialSource = (
    scholarship
  ) => {
    const url =
      scholarship.sourceUrl ||
      officialSources[scholarship.name];

    if (!url) {
      alert(
        "Official source is not available."
      );
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =========================================================
     SAVE SCHOLARSHIP
  ========================================================= */

  const handleSaveScholarship = async (
    scholarship
  ) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      if (!student?.id) {
        alert("Please login first.");
        return;
      }

      const scholarshipId =
        Number(scholarship.id);

      if (
        savedScholarshipIds.includes(
          scholarshipId
        )
      ) {
        return;
      }

      const response = await fetch(
        `${API_URL}/api/saved-scholarship`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            student_id: student.id,
            scholarship_id: scholarshipId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to save scholarship."
        );
        return;
      }

      setSavedScholarshipIds(
        (previousIds) => [
          ...previousIds,
          scholarshipId,
        ]
      );

      alert(
        "Scholarship saved successfully!"
      );
    } catch (error) {
      console.error(
        "Save scholarship error:",
        error
      );

      alert(
        "Unable to connect to the backend."
      );
    }
  };


  /* =========================================================
     REMOVE SCHOLARSHIP
  ========================================================= */

  const handleRemoveScholarship = async (
    scholarship
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
        `${API_URL}/api/saved-scholarships/${student.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to find saved scholarship."
        );
        return;
      }

      const savedScholarship =
        data.savedScholarships.find(
          (item) =>
            Number(item.scholarship_id) ===
            Number(scholarship.id)
        );

      if (!savedScholarship) {
        setSavedScholarshipIds(
          (previousIds) =>
            previousIds.filter(
              (id) =>
                id !== Number(scholarship.id)
            )
        );

        return;
      }

      const deleteResponse =
        await fetch(
          `${API_URL}/api/saved-scholarship/${savedScholarship.id}`,
          {
            method: "DELETE",
          }
        );

      const deleteData =
        await deleteResponse.json();

      if (!deleteResponse.ok) {
        alert(
          deleteData.message ||
            "Unable to remove scholarship."
        );
        return;
      }

      setSavedScholarshipIds(
        (previousIds) =>
          previousIds.filter(
            (id) =>
              id !== Number(scholarship.id)
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


  return (
    <div className="scholarship-page">

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

      <section className="scholarship-hero">

        <div>

          <span className="scholarship-tag">
            💰 SCHOLARSHIP MATCHER
          </span>

          <h1>
            Find Scholarships That Match You
          </h1>

          <p>
            Search and filter scholarship
            opportunities based on your education,
            course, state and student category.
          </p>

        </div>

        <div className="scholarship-hero-icon">
          🎓
        </div>

      </section>


      {/* =====================================================
          MATCHER
      ===================================================== */}

      <section className="scholarship-matcher">

        <div className="matcher-heading">

          <div>

            <span>
              PERSONALIZED SEARCH
            </span>

            <h2>
              Find scholarships for you
            </h2>

            <p>
              Select what applies to you.
              You can leave any option as
              "Any".
            </p>

          </div>

          <div className="matcher-icon">
            ✨
          </div>

        </div>


        <div className="matcher-grid">

          {/* EDUCATION */}

          <div className="matcher-field">

            <label>
              🎓 Education Level
            </label>

            <select
              value={educationLevel}
              onChange={(e) =>
                setEducationLevel(
                  e.target.value
                )
              }
            >

              <option value="Any">
                Any education level
              </option>

              <option value="College">
                College
              </option>

            </select>

          </div>


          {/* COURSE */}

          <div className="matcher-field">

            <label>
              📚 Course
            </label>

            <select
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
            >

              <option value="Any">
                Any course
              </option>

              <option value="BSc">
                B.Sc.
              </option>

              <option value="BSc Computer Science">
                B.Sc. Computer Science
              </option>

              <option value="BCA">
                BCA
              </option>

              <option value="BCom">
                B.Com
              </option>

              <option value="BA">
                B.A.
              </option>

              <option value="Engineering">
                Engineering
              </option>

              <option value="BTech">
                B.Tech
              </option>

              <option value="BTech Computer Science">
                B.Tech Computer Science
              </option>

              <option value="Diploma">
                Diploma
              </option>

              <option value="MBA">
                MBA
              </option>

            </select>

          </div>


          {/* STATE */}

          <div className="matcher-field">

            <label>
              📍 State
            </label>

            <select
              value={state}
              onChange={(e) =>
                setState(e.target.value)
              }
            >

              <option value="Any">
                Any state
              </option>

              <option value="Maharashtra">
                Maharashtra
              </option>

              <option value="Gujarat">
                Gujarat
              </option>

              <option value="Karnataka">
                Karnataka
              </option>

              <option value="Delhi">
                Delhi
              </option>

              <option value="Tamil Nadu">
                Tamil Nadu
              </option>

              <option value="West Bengal">
                West Bengal
              </option>

              <option value="Rajasthan">
                Rajasthan
              </option>

              <option value="Uttar Pradesh">
                Uttar Pradesh
              </option>

            </select>

          </div>


          {/* CATEGORY */}

          <div className="matcher-field">

            <label>
              👩 Student Category
            </label>

            <select
              value={studentCategory}
              onChange={(e) =>
                setStudentCategory(
                  e.target.value
                )
              }
            >

              <option value="Any">
                Any category
              </option>

              <option value="General">
                General
              </option>

              <option value="SC">
                SC
              </option>

              <option value="ST">
                ST
              </option>

              <option value="OBC">
                OBC
              </option>

              <option value="Minority">
                Minority
              </option>

            </select>

          </div>


          {/* TYPE */}

          <div className="matcher-field">

            <label>
              💰 Scholarship Type
            </label>

            <select
              value={scholarshipType}
              onChange={(e) =>
                setScholarshipType(
                  e.target.value
                )
              }
            >

              <option value="Any">
                Any type
              </option>

              <option value="Government">
                Government
              </option>

              <option value="Merit">
                Merit
              </option>

              <option value="Girls">
                Girls
              </option>

              <option value="Category Based">
                Category Based
              </option>

            </select>

          </div>

        </div>


        <div className="matcher-actions">

          <button
            type="button"
            className="find-scholarships-btn"
            onClick={findScholarships}
          >
            🔎 Find My Scholarships
          </button>

          <button
            type="button"
            className="reset-scholarships-btn"
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>

      </section>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="scholarship-search-section">

        <div className="scholarship-search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search BSc, engineering, girls, Maharashtra, SC..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </section>


      {/* =====================================================
          RESULTS
      ===================================================== */}

      <section className="scholarship-results">

        <div className="scholarship-results-heading">

          <div>

            <span>
              {showMatches
                ? "YOUR MATCHES"
                : "SCHOLARSHIP OPPORTUNITIES"}
            </span>

            <h2>
              {showMatches
                ? "Scholarships Matching Your Profile"
                : "Explore Scholarships"}
            </h2>

          </div>

          <p>
            {loadingScholarships
              ? "Loading..."
              : `${filteredScholarships.length} opportunities found`}
          </p>

        </div>


        {loadingScholarships ? (

          <div className="no-scholarships">

            <div>🎓</div>

            <h3>
              Loading scholarships...
            </h3>

            <p>
              Getting scholarship records
              from the backend.
            </p>

          </div>

        ) : (

          <div className="scholarship-grid">

            {filteredScholarships.map(
              (scholarship) => {

                const isSaved =
                  savedScholarshipIds.includes(
                    Number(scholarship.id)
                  );

                return (
                  <div
                    className="scholarship-card"
                    key={scholarship.id}
                  >

                    <div className="scholarship-card-top">

                      <div className="scholarship-icon">
                        💰
                      </div>

                      <span className="scholarship-category">
                        {scholarship.category}
                      </span>

                    </div>


                    <h3>
                      {scholarship.name}
                    </h3>


                    <p className="scholarship-description">
                      {scholarship.eligibility}
                    </p>


                    <div className="scholarship-info">

                      <div>
                        <span>
                          Level
                        </span>

                        <strong>
                          {scholarship.level}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Support
                        </span>

                        <strong>
                          {scholarship.amount}
                        </strong>
                      </div>

                      <div>
                        <span>
                          State
                        </span>

                        <strong>
                          {scholarship.state}
                        </strong>
                      </div>

                    </div>


                    <div className="scholarship-card-actions">

                      <button
                        type="button"
                        className={
                          isSaved
                            ? "scholarship-save-btn saved"
                            : "scholarship-save-btn"
                        }
                        onClick={() =>
                          isSaved
                            ? handleRemoveScholarship(
                                scholarship
                              )
                            : handleSaveScholarship(
                                scholarship
                              )
                        }
                      >
                        {isSaved
                          ? "✓ Saved"
                          : "🔖 Save"}
                      </button>


                      <button
                        type="button"
                        className="scholarship-details-btn"
                        onClick={() =>
                          handleViewDetails(
                            scholarship
                          )
                        }
                      >
                        View Details →
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}


        {!loadingScholarships &&
          filteredScholarships.length === 0 && (

            <div className="no-scholarships">

              <div>🔎</div>

              <h3>
                No matching scholarships found
              </h3>

              <p>
                Try changing one or more
                profile selections or search
                keywords.
              </p>

            </div>

          )}

      </section>


      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedScholarship && (

        <div
          className="scholarship-details-overlay"
          onClick={handleCloseDetails}
        >

          <div
            className="scholarship-details-modal scholarship-details-modal-large"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="scholarship-close-btn"
              onClick={handleCloseDetails}
              aria-label="Close scholarship details"
            >
              ×
            </button>


            <div className="scholarship-modal-icon">
              💰
            </div>


            <span className="scholarship-modal-category">
              {selectedScholarship.category}
            </span>


            <h2>
              {selectedScholarship.name}
            </h2>


            <p className="scholarship-modal-description">
              {selectedScholarship.description}
            </p>


            {/* BASIC INFORMATION */}

            <div className="scholarship-modal-info">

              <div>
                <span>
                  Education Level
                </span>

                <strong>
                  {selectedScholarship.level}
                </strong>
              </div>


              <div>
                <span>
                  Financial Support
                </span>

                <strong>
                  {selectedScholarship.amount}
                </strong>
              </div>


              <div>
                <span>
                  State
                </span>

                <strong>
                  {selectedScholarship.state}
                </strong>
              </div>


              <div>
                <span>
                  Deadline
                </span>

                <strong>
                  {selectedScholarship.deadline}
                </strong>
              </div>

            </div>


            {/* ELIGIBILITY */}

            <div className="scholarship-modal-detail-section">

              <h3>
                ✅ Eligibility
              </h3>

              <p>
                {selectedScholarship.eligibility}
              </p>

            </div>


            {/* COURSES */}

            <div className="scholarship-modal-detail-section">

              <h3>
                📚 Courses Covered
              </h3>

              <div className="scholarship-detail-tags">

                {(selectedScholarship.courses || [])
                  .map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}

              </div>

            </div>


            {/* STUDENT CATEGORIES */}

            <div className="scholarship-modal-detail-section">

              <h3>
                👩 Student Categories
              </h3>

              <div className="scholarship-detail-tags">

                {(selectedScholarship.studentCategories || [])
                  .map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}

              </div>

            </div>


            {/* KEYWORDS */}

            <div className="scholarship-modal-detail-section">

              <h3>
                🔎 Related Keywords
              </h3>

              <div className="scholarship-detail-tags">

                {(selectedScholarship.keywords || [])
                  .map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}

              </div>

            </div>


            {/* OFFICIAL SOURCE */}

            <div className="scholarship-official-box">

              <h3>
                🌐 Official Source
              </h3>

              <p>
                Always verify the latest
                eligibility, documents, deadline
                and application requirements on
                the official source.
              </p>

              <button
                type="button"
                className="scholarship-official-btn"
                onClick={() =>
                  handleOpenOfficialSource(
                    selectedScholarship
                  )
                }
              >
                Open Official Source →
              </button>

            </div>


            {/* SAVE */}

            <div className="scholarship-save-modal-box">

              <h3>
                🔖 Save Scholarship
              </h3>

              <p>
                Save this scholarship to your
                Saved Tracker so you can review
                it later.
              </p>


              {savedScholarshipIds.includes(
                Number(
                  selectedScholarship.id
                )
              ) ? (

                <button
                  type="button"
                  className="scholarship-remove-modal-btn"
                  onClick={() =>
                    handleRemoveScholarship(
                      selectedScholarship
                    )
                  }
                >
                  ✓ Saved — Remove
                </button>

              ) : (

                <button
                  type="button"
                  className="scholarship-save-modal-btn"
                  onClick={() =>
                    handleSaveScholarship(
                      selectedScholarship
                    )
                  }
                >
                  🔖 Save Scholarship
                </button>

              )}

            </div>


            <button
              type="button"
              className="scholarship-modal-close"
              onClick={handleCloseDetails}
            >
              Close Details
            </button>

          </div>

        </div>

      )}


      {/* =====================================================
          HELP
      ===================================================== */}

      <section className="scholarship-help">

        <div className="scholarship-help-icon">
          💡
        </div>

        <div>

          <h2>
            Not sure which scholarship is right
            for you?
          </h2>

          <p>
            Select your profile details above
            and let CareerScholarshipPlatform
            show matching opportunities.
          </p>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="scholarship-footer">

        <strong>
          CareerScholarshipPlatform
        </strong>

        <span>
          Helping students discover better
          opportunities.
        </span>

      </footer>

    </div>
  );
}

export default ScholarshipMatcher;