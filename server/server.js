import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({
  path: "./server/.env",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
const PORT = 5000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());
app.use(express.json());


/* =========================================================
   SQLITE DATABASE
========================================================= */

const db = new Database("./database.db");

db.pragma("foreign_keys = ON");


/* =========================================================
   CREATE STUDENTS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    education_level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();


/* =========================================================
   CREATE SAVED CAREERS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS saved_careers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    career_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
      REFERENCES students(id)
      ON DELETE CASCADE
  )
`).run();


/* =========================================================
   CREATE SAVED OPPORTUNITIES TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS saved_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    opportunity_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    deadline TEXT NOT NULL,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
      REFERENCES students(id)
      ON DELETE CASCADE
  )
`).run();


/* =========================================================
   CREATE ROADMAP PROGRESS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS roadmap_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    career_name TEXT NOT NULL,
    step_number INTEGER NOT NULL,
    step_title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
      REFERENCES students(id)
      ON DELETE CASCADE,

    UNIQUE (
      student_id,
      career_name,
      step_number
    )
  )
`).run();


/* =========================================================
   CREATE LEARNING RESOURCES TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS learning_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    career_name TEXT NOT NULL,
    step_number INTEGER NOT NULL,
    step_title TEXT NOT NULL,
    resource_title TEXT NOT NULL,
    video_url TEXT,
    resource_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
      career_name,
      step_number
    )
  )
`).run();


/* =========================================================
   CREATE SCHOLARSHIPS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    amount TEXT,
    state TEXT NOT NULL,
    courses TEXT NOT NULL,
    student_categories TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    deadline TEXT NOT NULL,
    keywords TEXT,
    description TEXT NOT NULL,
    source_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();


/* =========================================================
   CREATE SAVED SCHOLARSHIPS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS saved_scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    scholarship_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
      REFERENCES students(id)
      ON DELETE CASCADE,

    FOREIGN KEY (scholarship_id)
      REFERENCES scholarships(id)
      ON DELETE CASCADE,

    UNIQUE (
      student_id,
      scholarship_id
    )
  )
`).run();

/* =========================================================
   CREATE CAREER QUIZ RESULTS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS career_quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    career_area TEXT NOT NULL,
    result_title TEXT NOT NULL,
    scores TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
      REFERENCES students(id)
      ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL UNIQUE,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    location TEXT,
    career_title TEXT,
    education TEXT,
    college TEXT,
    graduation_year TEXT,
    skills TEXT,
    projects TEXT,
    certifications TEXT,
    achievements TEXT,
    linkedin TEXT,
    github TEXT,
    portfolio TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
  )
`).run();

/* =========================================================
   CREATE PORTFOLIOS TABLE
========================================================= */

db.prepare(`
  CREATE TABLE IF NOT EXISTS portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL UNIQUE,

    full_name TEXT,
    title TEXT,
    email TEXT,
    phone TEXT,
    location TEXT,

    about TEXT,
    career_goal TEXT,

    education TEXT,
    college TEXT,
    graduation_year TEXT,

    skills TEXT,
    certifications TEXT,
    achievements TEXT,

    github TEXT,
    linkedin TEXT,
    portfolio TEXT,

    projects TEXT,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id)
      REFERENCES students(id)
      ON DELETE CASCADE
  )
`).run();

/* =========================================================
   CREATE LEARNING RESOURCE DATA
========================================================= */

const learningResourceData = {
  "Web Developer": [
    {
      step: 0,
      title: "Learn HTML and CSS",
      videoTitle: "HTML and CSS for Beginners",
      query: "HTML CSS beginner tutorial freeCodeCamp",
      resourceUrl:
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
    },
    {
      step: 1,
      title: "Learn JavaScript fundamentals",
      videoTitle: "JavaScript Fundamentals for Beginners",
      query: "JavaScript fundamentals beginner tutorial freeCodeCamp",
      resourceUrl:
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting"
    },
    {
      step: 2,
      title: "Build small web projects",
      videoTitle: "Beginner Web Development Projects",
      query: "HTML CSS JavaScript beginner projects freeCodeCamp",
      resourceUrl:
        "https://developer.mozilla.org/en-US/docs/Learn_web_development"
    },
    {
      step: 3,
      title: "Learn React",
      videoTitle: "React for Beginners",
      query: "React beginner full course freeCodeCamp",
      resourceUrl:
        "https://react.dev/learn"
    },
    {
      step: 4,
      title: "Learn Git and GitHub",
      videoTitle: "Git and GitHub for Beginners",
      query: "Git GitHub beginner tutorial freeCodeCamp",
      resourceUrl:
        "https://docs.github.com/en/get-started"
    },
    {
      step: 5,
      title: "Build a strong portfolio",
      videoTitle: "Build a Developer Portfolio",
      query: "developer portfolio website beginner tutorial",
      resourceUrl:
        "https://developer.mozilla.org/en-US/docs/Learn_web_development"
    },
    {
      step: 6,
      title: "Apply for internships and jobs",
      videoTitle: "How to Prepare for Developer Jobs",
      query: "web developer internship job preparation beginner",
      resourceUrl:
        "https://developer.mozilla.org/en-US/docs/Learn_web_development"
    }
  ],

  "Data Analyst": [
    {
      step: 0,
      title: "Learn Excel",
      videoTitle: "Excel for Data Analysis Beginners",
      query: "Excel data analysis beginner tutorial",
      resourceUrl:
        "https://support.microsoft.com/en-us/excel"
    },
    {
      step: 1,
      title: "Learn basic statistics",
      videoTitle: "Statistics for Data Analysis Beginners",
      query: "statistics for data analysis beginner tutorial",
      resourceUrl:
        "https://www.khanacademy.org/math/statistics-probability"
    },
    {
      step: 2,
      title: "Learn SQL",
      videoTitle: "SQL for Data Analysts",
      query: "SQL beginner data analyst tutorial freeCodeCamp",
      resourceUrl:
        "https://www.w3schools.com/sql/"
    },
    {
      step: 3,
      title: "Learn Power BI",
      videoTitle: "Power BI for Beginners",
      query: "Power BI beginner tutorial Microsoft",
      resourceUrl:
        "https://learn.microsoft.com/en-us/training/powerplatform/power-bi"
    },
    {
      step: 4,
      title: "Practise with datasets",
      videoTitle: "Data Analysis Practice with Datasets",
      query: "data analysis datasets beginner project",
      resourceUrl:
        "https://www.kaggle.com/learn"
    },
    {
      step: 5,
      title: "Build data projects",
      videoTitle: "Data Analyst Portfolio Projects",
      query: "data analyst projects portfolio beginner",
      resourceUrl:
        "https://www.kaggle.com/learn"
    },
    {
      step: 6,
      title: "Apply for internships and jobs",
      videoTitle: "Data Analyst Job Preparation",
      query: "data analyst internship job preparation beginner",
      resourceUrl:
        "https://www.kaggle.com/learn"
    }
  ],

  "UI/UX Designer": [
    {
      step: 0,
      title: "Understand UI/UX fundamentals",
      videoTitle: "UI UX Design for Beginners",
      query: "UI UX design beginner tutorial",
      resourceUrl:
        "https://www.nngroup.com/articles/definition-user-experience/"
    },
    {
      step: 1,
      title: "Learn Figma",
      videoTitle: "Figma for Beginners",
      query: "Figma tutorial beginners UI UX",
      resourceUrl:
        "https://help.figma.com/hc/en-us/categories/360002051613"
    },
    {
      step: 2,
      title: "Practise wireframes",
      videoTitle: "Wireframing for Beginners",
      query: "wireframing UI UX beginner tutorial",
      resourceUrl:
        "https://www.nngroup.com/articles/wireframes/"
    },
    {
      step: 3,
      title: "Create prototypes",
      videoTitle: "Figma Prototyping for Beginners",
      query: "Figma prototyping beginner tutorial",
      resourceUrl:
        "https://help.figma.com/hc/en-us/articles/360040531773"
    },
    {
      step: 4,
      title: "Complete design projects",
      videoTitle: "UI UX Design Projects for Beginners",
      query: "UI UX design project beginner tutorial",
      resourceUrl:
        "https://www.figma.com/resource-library/"
    },
    {
      step: 5,
      title: "Build a design portfolio",
      videoTitle: "UI UX Portfolio for Beginners",
      query: "UI UX design portfolio beginner tutorial",
      resourceUrl:
        "https://www.figma.com/resource-library/"
    },
    {
      step: 6,
      title: "Apply for internships and jobs",
      videoTitle: "UI UX Designer Job Preparation",
      query: "UI UX design internship job preparation",
      resourceUrl:
        "https://www.nngroup.com/articles/"
    }
  ],

  "Cybersecurity Analyst": [
    {
      step: 0,
      title: "Learn computer networking",
      videoTitle: "Networking Fundamentals for Beginners",
      query: "computer networking fundamentals beginner tutorial",
      resourceUrl:
        "https://www.cisco.com/site/us/en/learn/topics/networking/what-is-computer-networking.html"
    },
    {
      step: 1,
      title: "Learn Linux basics",
      videoTitle: "Linux for Cybersecurity Beginners",
      query: "Linux command line beginner cybersecurity tutorial",
      resourceUrl:
        "https://ubuntu.com/tutorials/command-line-for-beginners"
    },
    {
      step: 2,
      title: "Understand cybersecurity fundamentals",
      videoTitle: "Cybersecurity Fundamentals for Beginners",
      query: "cybersecurity fundamentals beginner course",
      resourceUrl:
        "https://www.cisa.gov/topics/cyber-threats-and-advisories"
    },
    {
      step: 3,
      title: "Learn security tools",
      videoTitle: "Cybersecurity Security Tools Beginners",
      query: "cybersecurity tools beginner tutorial",
      resourceUrl:
        "https://www.cisco.com/site/us/en/learn/topics/security/what-is-cybersecurity.html"
    },
    {
      step: 4,
      title: "Practise ethical hacking concepts",
      videoTitle: "Ethical Hacking for Beginners",
      query: "ethical hacking beginner tutorial",
      resourceUrl:
        "https://www.eccouncil.org/train-certify/ethical-hacking/"
    },
    {
      step: 5,
      title: "Complete security projects",
      videoTitle: "Cybersecurity Projects for Beginners",
      query: "cybersecurity beginner projects tutorial",
      resourceUrl:
        "https://www.cisa.gov/"
    },
    {
      step: 6,
      title: "Apply for cybersecurity internships",
      videoTitle: "Cybersecurity Internship Job Preparation",
      query: "cybersecurity internship job preparation beginner",
      resourceUrl:
        "https://www.cisa.gov/"
    }
  ],

  "Digital Marketer": [
    {
      step: 0,
      title: "Learn digital marketing fundamentals",
      videoTitle: "Digital Marketing for Beginners",
      query: "digital marketing beginner full course",
      resourceUrl:
        "https://academy.hubspot.com/courses/digital-marketing"
    },
    {
      step: 1,
      title: "Learn social media marketing",
      videoTitle: "Social Media Marketing for Beginners",
      query: "social media marketing beginner tutorial",
      resourceUrl:
        "https://academy.hubspot.com/courses/social-media"
    },
    {
      step: 2,
      title: "Learn SEO",
      videoTitle: "SEO for Beginners",
      query: "SEO beginner tutorial Google",
      resourceUrl:
        "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
    },
    {
      step: 3,
      title: "Practise content creation",
      videoTitle: "Content Creation for Digital Marketing",
      query: "content creation digital marketing beginner",
      resourceUrl:
        "https://academy.hubspot.com/courses/content-marketing"
    },
    {
      step: 4,
      title: "Understand digital analytics",
      videoTitle: "Google Analytics for Beginners",
      query: "Google Analytics beginner tutorial",
      resourceUrl:
        "https://support.google.com/analytics/"
    },
    {
      step: 5,
      title: "Build marketing projects",
      videoTitle: "Digital Marketing Projects for Beginners",
      query: "digital marketing project beginner tutorial",
      resourceUrl:
        "https://academy.hubspot.com/"
    },
    {
      step: 6,
      title: "Apply for internships and jobs",
      videoTitle: "Digital Marketing Job Preparation",
      query: "digital marketing internship job preparation beginner",
      resourceUrl:
        "https://academy.hubspot.com/"
    }
  ]
};


/* =========================================================
   CREATE YOUTUBE SEARCH URL
========================================================= */

const createYouTubeSearchUrl = (query) => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
};


/* =========================================================
   INSERT / UPDATE LEARNING RESOURCES
========================================================= */

const insertLearningResource = db.prepare(`
  INSERT INTO learning_resources (
    career_name,
    step_number,
    step_title,
    resource_title,
    video_url,
    resource_url
  )
  VALUES (?, ?, ?, ?, ?, ?)

  ON CONFLICT (
    career_name,
    step_number
  )
  DO UPDATE SET
    step_title = excluded.step_title,
    resource_title = excluded.resource_title,
    video_url = excluded.video_url,
    resource_url = excluded.resource_url
`);


for (const [
  careerName,
  resources
] of Object.entries(
  learningResourceData
)) {

  for (const resource of resources) {

    insertLearningResource.run(
      careerName,
      resource.step,
      resource.title,
      resource.videoTitle,
      createYouTubeSearchUrl(
        resource.query
      ),
      resource.resourceUrl
    );

  }

}


/* =========================================================
   SCHOLARSHIP DATA
========================================================= */

const scholarshipData = [
  {
    name: "National Scholarship Portal",
    category: "Government",
    level: "College",
    amount: "Varies",
    state: "All India",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma"
    ],
    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Students pursuing higher education and meeting the required criteria.",
    deadline:
      "Check official portal",
    keywords: [
      "national",
      "government",
      "college",
      "post matric",
      "higher education"
    ],
    description:
      "A platform where students can explore scholarship schemes available through the National Scholarship Portal.",
    sourceUrl:
      "https://scholarships.gov.in/"
  },

  {
    name: "Post-Matric Scholarship",
    category: "Government",
    level: "College",
    amount: "Financial assistance",
    state: "Maharashtra",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma"
    ],
    studentCategories: [
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Students who satisfy the relevant post-matric scholarship scheme requirements.",
    deadline:
      "Check official portal",
    keywords: [
      "post matric",
      "maharashtra",
      "sc",
      "st",
      "obc",
      "minority"
    ],
    description:
      "Use the Maharashtra MahaDBT portal to check available post-matric scholarship schemes and their current eligibility.",
    sourceUrl:
      "https://www.mahadbt.maharashtra.gov.in/"
  },

  {
    name: "Merit Scholarship",
    category: "Merit",
    level: "College",
    amount: "Varies",
    state: "All India",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering"
    ],
    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Students with academic performance that meets the applicable scholarship requirements.",
    deadline:
      "Check official source",
    keywords: [
      "merit",
      "marks",
      "academic",
      "college",
      "students"
    ],
    description:
      "Example merit-based scholarship category for students to explore through official scholarship portals.",
    sourceUrl:
      "https://scholarships.gov.in/"
  },

  {
    name: "Private Education Scholarship",
    category: "Private",
    level: "College",
    amount: "Varies",
    state: "All India",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "MBA"
    ],
    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Students meeting the specific requirements of a private scholarship provider.",
    deadline:
      "Check official source",
    keywords: [
      "private",
      "education",
      "financial aid",
      "college",
      "students"
    ],
    description:
      "Example private-scholarship category for students to explore through verified provider sources.",
    sourceUrl:
      ""
  },

  {
    name: "Girls Education Scholarship",
    category: "Girls",
    level: "College",
    amount: "Varies",
    state: "All India",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma"
    ],
    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Female students who meet the requirements of an applicable scholarship scheme.",
    deadline:
      "Check official source",
    keywords: [
      "girls",
      "women",
      "female",
      "girl student",
      "education"
    ],
    description:
      "Example category for scholarships supporting girls and women in education.",
    sourceUrl:
      "https://scholarships.gov.in/"
  },

  {
    name: "ST Student Scholarship",
    category: "Category Based",
    level: "College",
    amount: "Financial assistance",
    state: "Maharashtra",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma"
    ],
    studentCategories: [
      "ST"
    ],
    eligibility:
      "Eligible ST students who meet the applicable scholarship requirements.",
    deadline:
      "Check official source",
    keywords: [
      "st",
      "scheduled tribe",
      "tribal",
      "maharashtra",
      "post matric"
    ],
    description:
      "Students can check Maharashtra scholarship schemes and eligibility through the official MahaDBT portal.",
    sourceUrl:
      "https://www.mahadbt.maharashtra.gov.in/"
  },

  {
    name: "SC Student Scholarship",
    category: "Category Based",
    level: "College",
    amount: "Financial assistance",
    state: "Maharashtra",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma"
    ],
    studentCategories: [
      "SC"
    ],
    eligibility:
      "Eligible SC students who meet the applicable scholarship requirements.",
    deadline:
      "Check official source",
    keywords: [
      "sc",
      "scheduled caste",
      "maharashtra",
      "post matric",
      "college"
    ],
    description:
      "Students can check Maharashtra scholarship schemes and eligibility through the official MahaDBT portal.",
    sourceUrl:
      "https://www.mahadbt.maharashtra.gov.in/"
  },

  {
    name: "Engineering Student Scholarship",
    category: "Merit",
    level: "College",
    amount: "Varies",
    state: "All India",
    courses: [
      "Engineering",
      "BTech"
    ],
    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Engineering students who meet the requirements of the relevant scholarship scheme.",
    deadline:
      "Check official source",
    keywords: [
      "engineering",
      "btech",
      "technical",
      "technology",
      "merit"
    ],
    description:
      "Example category for engineering and technical-education scholarship opportunities.",
    sourceUrl:
      "https://scholarships.gov.in/"
  },

  {
    name: "Computer Science Scholarship",
    category: "Merit",
    level: "College",
    amount: "Varies",
    state: "All India",
    courses: [
      "BSc Computer Science",
      "BCA",
      "BTech Computer Science"
    ],
    studentCategories: [
      "General",
      "SC",
      "ST",
      "OBC",
      "Minority"
    ],
    eligibility:
      "Students pursuing computer science or related technology courses who meet the relevant scheme requirements.",
    deadline:
      "Check official source",
    keywords: [
      "computer science",
      "bsc cs",
      "bca",
      "btech cs",
      "technology",
      "it",
      "computer"
    ],
    description:
      "Example category for students studying computer science and technology-related courses.",
    sourceUrl:
      "https://scholarships.gov.in/"
  },

  {
    name: "Minority Student Scholarship",
    category: "Category Based",
    level: "College",
    amount: "Financial assistance",
    state: "All India",
    courses: [
      "BSc",
      "BSc Computer Science",
      "BCom",
      "BA",
      "Engineering",
      "Diploma"
    ],
    studentCategories: [
      "Minority"
    ],
    eligibility:
      "Eligible students who meet the requirements of a relevant minority scholarship scheme.",
    deadline:
      "Check official source",
    keywords: [
      "minority",
      "community",
      "college",
      "post matric",
      "education"
    ],
    description:
      "Example category for minority scholarship opportunities that students can verify through official sources.",
    sourceUrl:
      "https://scholarships.gov.in/"
  }
];


/* =========================================================
   INSERT SCHOLARSHIP DATA
========================================================= */

const scholarshipExists =
  db.prepare(`
    SELECT id
    FROM scholarships
    WHERE name = ?
  `);

const insertScholarship =
  db.prepare(`
    INSERT INTO scholarships (
      name,
      category,
      level,
      amount,
      state,
      courses,
      student_categories,
      eligibility,
      deadline,
      keywords,
      description,
      source_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

for (
  const scholarship of scholarshipData
) {

  const existing =
    scholarshipExists.get(
      scholarship.name
    );

  if (!existing) {

    insertScholarship.run(
      scholarship.name,
      scholarship.category,
      scholarship.level,
      scholarship.amount,
      scholarship.state,
      JSON.stringify(
        scholarship.courses
      ),
      JSON.stringify(
        scholarship.studentCategories
      ),
      scholarship.eligibility,
      scholarship.deadline,
      JSON.stringify(
        scholarship.keywords
      ),
      scholarship.description,
      scholarship.sourceUrl
    );

  }
}


/* =========================================================
   TEST SERVER
========================================================= */

app.get("/", (req, res) => {
  res.json({
    message:
      "Career Scholarship Platform backend is running successfully!"
  });
});


/* =========================================================
   TEST DATABASE
========================================================= */

app.get("/api/test-db", (req, res) => {

  try {

    const tables =
      db
        .prepare(`
          SELECT name
          FROM sqlite_master
          WHERE type = 'table'
          ORDER BY name
        `)
        .all();

    res.json({
      message:
        "SQLite database is connected successfully!",
      tables
    });

  } catch (error) {

    console.error(
      "Database test error:",
      error
    );

    res.status(500).json({
      message:
        "Unable to test SQLite database."
    });
  }

});


/* =========================================================
   REGISTER STUDENT
========================================================= */

app.post(
  "/api/register",
  async (req, res) => {

    try {

      const {
        full_name,
        email,
        password,
        education_level
      } = req.body;


      if (
        !full_name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "Full name, email and password are required."
        });
      }


      const cleanName =
        full_name.trim();

      const cleanEmail =
        email
          .trim()
          .toLowerCase();


      if (
        password.length < 8
      ) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long."
        });
      }


      const existingStudent =
        db
          .prepare(`
            SELECT id
            FROM students
            WHERE email = ?
          `)
          .get(cleanEmail);


      if (existingStudent) {
        return res.status(409).json({
          message:
            "An account with this email already exists."
        });
      }


      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      const result =
        db
          .prepare(`
            INSERT INTO students (
              full_name,
              email,
              password,
              education_level
            )
            VALUES (?, ?, ?, ?)
          `)
          .run(
            cleanName,
            cleanEmail,
            hashedPassword,
            education_level || ""
          );


      res.status(201).json({

        message:
          "Registration successful!",

        student: {
          id:
            result.lastInsertRowid,

          full_name:
            cleanName,

          email:
            cleanEmail,

          education_level:
            education_level || ""
        }

      });

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while registering the student."
      });
    }

  }
);


/* =========================================================
   LOGIN STUDENT
========================================================= */

app.post(
  "/api/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;


      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "Email and password are required."
        });
      }


      const cleanEmail =
        email
          .trim()
          .toLowerCase();


      const student =
        db
          .prepare(`
            SELECT
              id,
              full_name,
              email,
              password,
              education_level,
              created_at
            FROM students
            WHERE email = ?
          `)
          .get(cleanEmail);


      if (!student) {
        return res.status(401).json({
          message:
            "No account was found with this email."
        });
      }


      const passwordMatches =
        await bcrypt.compare(
          password,
          student.password
        );


      if (!passwordMatches) {
        return res.status(401).json({
          message:
            "Incorrect password. Please try again."
        });
      }


      res.status(200).json({

        message:
          "Login successful!",

        student: {
          id:
            student.id,

          full_name:
            student.full_name,

          email:
            student.email,

          education_level:
            student.education_level,

          created_at:
            student.created_at
        }

      });

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      res.status(500).json({
        message:
          "Something went wrong while logging in."
      });
    }

  }
);


/* =========================================================
   GET STUDENT DETAILS
========================================================= */

app.get(
  "/api/student/:id",
  (req, res) => {

    try {

      const studentId =
        Number(req.params.id);


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      const student =
        db
          .prepare(`
            SELECT
              id,
              full_name,
              email,
              education_level,
              created_at
            FROM students
            WHERE id = ?
          `)
          .get(studentId);


      if (!student) {
        return res.status(404).json({
          message:
            "Student not found."
        });
      }


      res.status(200).json({
        student
      });

    } catch (error) {

      console.error(
        "Student fetch error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch student details."
      });
    }

  }
);


/* =========================================================
   SAVE CAREER
========================================================= */

app.post(
  "/api/saved-career",
  (req, res) => {

    try {

      const {
        student_id,
        career_name
      } = req.body;


      if (
        !student_id ||
        !career_name
      ) {
        return res.status(400).json({
          message:
            "Student ID and career name are required."
        });
      }


      const studentId =
        Number(student_id);


      const cleanCareerName =
        career_name.trim();


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0 ||
        !cleanCareerName
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID or career name."
        });
      }


      const student =
        db
          .prepare(`
            SELECT id
            FROM students
            WHERE id = ?
          `)
          .get(studentId);


      if (!student) {
        return res.status(404).json({
          message:
            "Student not found."
        });
      }


      const existingCareer =
        db
          .prepare(`
            SELECT id
            FROM saved_careers
            WHERE student_id = ?
            AND career_name = ?
          `)
          .get(
            studentId,
            cleanCareerName
          );


      if (existingCareer) {
        return res.status(409).json({
          message:
            "This career is already saved."
        });
      }


      const result =
        db
          .prepare(`
            INSERT INTO saved_careers (
              student_id,
              career_name
            )
            VALUES (?, ?)
          `)
          .run(
            studentId,
            cleanCareerName
          );


      res.status(201).json({

        message:
          "Career saved successfully!",

        savedCareer: {
          id:
            result.lastInsertRowid,

          student_id:
            studentId,

          career_name:
            cleanCareerName
        }

      });

    } catch (error) {

      console.error(
        "Save career error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to save career."
      });
    }

  }
);


/* =========================================================
   GET SAVED CAREERS
========================================================= */

app.get(
  "/api/saved-careers/:studentId",
  (req, res) => {

    try {

      const studentId =
        Number(req.params.studentId);


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      const savedCareers =
        db
          .prepare(`
            SELECT
              id,
              student_id,
              career_name,
              created_at
            FROM saved_careers
            WHERE student_id = ?
            ORDER BY created_at DESC
          `)
          .all(studentId);


      res.status(200).json({
        savedCareers
      });

    } catch (error) {

      console.error(
        "Get saved careers error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch saved careers."
      });
    }

  }
);


/* =========================================================
   DELETE SAVED CAREER
========================================================= */

app.delete(
  "/api/saved-career/:id",
  (req, res) => {

    try {

      const savedCareerId =
        Number(req.params.id);


      const savedCareer =
        db
          .prepare(`
            SELECT id
            FROM saved_careers
            WHERE id = ?
          `)
          .get(savedCareerId);


      if (!savedCareer) {
        return res.status(404).json({
          message:
            "Saved career not found."
        });
      }


      db
        .prepare(`
          DELETE FROM saved_careers
          WHERE id = ?
        `)
        .run(savedCareerId);


      res.status(200).json({
        message:
          "Saved career removed successfully."
      });

    } catch (error) {

      console.error(
        "Delete saved career error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to remove saved career."
      });
    }

  }
);


/* =========================================================
   SAVE OPPORTUNITY
========================================================= */

app.post(
  "/api/saved-opportunity",
  (req, res) => {

    try {

      const {
        student_id,
        opportunity_id,
        title,
        type,
        deadline,
        icon
      } = req.body;


      const studentId =
        Number(student_id);

      const opportunityId =
        Number(opportunity_id);


      if (
        !studentId ||
        !opportunityId ||
        !title ||
        !type ||
        !deadline
      ) {
        return res.status(400).json({
          message:
            "Student ID, opportunity ID, title, type and deadline are required."
        });
      }


      const student =
        db
          .prepare(`
            SELECT id
            FROM students
            WHERE id = ?
          `)
          .get(studentId);


      if (!student) {
        return res.status(404).json({
          message:
            "Student not found."
        });
      }


      const existingOpportunity =
        db
          .prepare(`
            SELECT id
            FROM saved_opportunities
            WHERE student_id = ?
            AND opportunity_id = ?
          `)
          .get(
            studentId,
            opportunityId
          );


      if (existingOpportunity) {
        return res.status(409).json({
          message:
            "This opportunity is already saved."
        });
      }


      const result =
        db
          .prepare(`
            INSERT INTO saved_opportunities (
              student_id,
              opportunity_id,
              title,
              type,
              deadline,
              icon
            )
            VALUES (?, ?, ?, ?, ?, ?)
          `)
          .run(
            studentId,
            opportunityId,
            title.trim(),
            type.trim(),
            deadline.trim(),
            icon || ""
          );


      res.status(201).json({

        message:
          "Opportunity saved successfully!",

        savedOpportunity: {
          id:
            result.lastInsertRowid,

          student_id:
            studentId,

          opportunity_id:
            opportunityId,

          title:
            title.trim(),

          type:
            type.trim(),

          deadline:
            deadline.trim(),

          icon:
            icon || ""
        }

      });

    } catch (error) {

      console.error(
        "Save opportunity error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to save opportunity."
      });
    }

  }
);


/* =========================================================
   GET SAVED OPPORTUNITIES
========================================================= */

app.get(
  "/api/saved-opportunities/:studentId",
  (req, res) => {

    try {

      const studentId =
        Number(req.params.studentId);


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      const savedOpportunities =
        db
          .prepare(`
            SELECT
              id,
              student_id,
              opportunity_id,
              title,
              type,
              deadline,
              icon,
              created_at
            FROM saved_opportunities
            WHERE student_id = ?
            ORDER BY created_at DESC
          `)
          .all(studentId);


      res.status(200).json({
        savedOpportunities
      });

    } catch (error) {

      console.error(
        "Get saved opportunities error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch saved opportunities."
      });
    }

  }
);


/* =========================================================
   DELETE SAVED OPPORTUNITY
========================================================= */

app.delete(
  "/api/saved-opportunity/:id",
  (req, res) => {

    try {

      const savedOpportunityId =
        Number(req.params.id);


      const savedOpportunity =
        db
          .prepare(`
            SELECT id
            FROM saved_opportunities
            WHERE id = ?
          `)
          .get(savedOpportunityId);


      if (!savedOpportunity) {
        return res.status(404).json({
          message:
            "Saved opportunity not found."
        });
      }


      db
        .prepare(`
          DELETE FROM saved_opportunities
          WHERE id = ?
        `)
        .run(savedOpportunityId);


      res.status(200).json({
        message:
          "Saved opportunity removed successfully."
      });

    } catch (error) {

      console.error(
        "Delete saved opportunity error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to remove saved opportunity."
      });
    }

  }
);


/* =========================================================
   SAVE / UPDATE ROADMAP PROGRESS
========================================================= */

app.post(
  "/api/roadmap-progress",
  (req, res) => {

    try {

      const {
        student_id,
        career_name,
        step_number,
        step_title,
        completed
      } = req.body;


      const studentId =
        Number(student_id);

      const stepNumber =
        Number(step_number);

      const completedValue =
        Number(completed);


      if (
        !studentId ||
        !career_name ||
        !step_title ||
        step_number === undefined ||
        completed === undefined
      ) {
        return res.status(400).json({
          message:
            "Student ID, career name, step number, step title and completed status are required."
        });
      }


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      if (
        !Number.isInteger(stepNumber) ||
        stepNumber < 0
      ) {
        return res.status(400).json({
          message:
            "Invalid step number."
        });
      }


      if (
        completedValue !== 0 &&
        completedValue !== 1
      ) {
        return res.status(400).json({
          message:
            "Completed status must be 0 or 1."
        });
      }


      const cleanCareerName =
        career_name.trim();

      const cleanStepTitle =
        step_title.trim();


      const student =
        db
          .prepare(`
            SELECT id
            FROM students
            WHERE id = ?
          `)
          .get(studentId);


      if (!student) {
        return res.status(404).json({
          message:
            "Student not found."
        });
      }


      db.prepare(`
        INSERT INTO roadmap_progress (
          student_id,
          career_name,
          step_number,
          step_title,
          completed,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)

        ON CONFLICT (
          student_id,
          career_name,
          step_number
        )
        DO UPDATE SET
          step_title = excluded.step_title,
          completed = excluded.completed,
          updated_at = CURRENT_TIMESTAMP
      `).run(
        studentId,
        cleanCareerName,
        stepNumber,
        cleanStepTitle,
        completedValue
      );


      const savedProgress =
        db
          .prepare(`
            SELECT
              id,
              student_id,
              career_name,
              step_number,
              step_title,
              completed,
              updated_at
            FROM roadmap_progress
            WHERE student_id = ?
            AND career_name = ?
            AND step_number = ?
          `)
          .get(
            studentId,
            cleanCareerName,
            stepNumber
          );


      res.status(200).json({

        message:
          "Roadmap progress saved successfully!",

        progress:
          savedProgress

      });

    } catch (error) {

      console.error(
        "Save roadmap progress error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to save roadmap progress."
      });
    }

  }
);


/* =========================================================
   GET ROADMAP PROGRESS
========================================================= */

app.get(
  "/api/roadmap-progress/:studentId/:careerName",
  (req, res) => {

    try {

      const studentId =
        Number(req.params.studentId);

      const careerName =
        decodeURIComponent(
          req.params.careerName
        ).trim();


      const progress =
        db
          .prepare(`
            SELECT
              id,
              student_id,
              career_name,
              step_number,
              step_title,
              completed,
              updated_at
            FROM roadmap_progress
            WHERE student_id = ?
            AND career_name = ?
            ORDER BY step_number ASC
          `)
          .all(
            studentId,
            careerName
          );


      res.status(200).json({
        progress
      });

    } catch (error) {

      console.error(
        "Get roadmap progress error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch roadmap progress."
      });
    }

  }
);


/* =========================================================
   GET ALL LEARNING RESOURCES FOR A CAREER
========================================================= */

app.get(
  "/api/learning-resources/:careerName",
  (req, res) => {

    try {

      const careerName =
        decodeURIComponent(
          req.params.careerName
        ).trim();


      const resources =
        db
          .prepare(`
            SELECT
              id,
              career_name,
              step_number,
              step_title,
              resource_title,
              video_url,
              resource_url,
              created_at
            FROM learning_resources
            WHERE career_name = ?
            ORDER BY step_number ASC
          `)
          .all(careerName);


      res.status(200).json({
        resources
      });

    } catch (error) {

      console.error(
        "Get learning resources error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch learning resources."
      });
    }

  }
);


/* =========================================================
   GET ONE LEARNING RESOURCE
========================================================= */

app.get(
  "/api/learning-resources/:careerName/:stepNumber",
  (req, res) => {

    try {

      const careerName =
        decodeURIComponent(
          req.params.careerName
        ).trim();

      const stepNumber =
        Number(
          req.params.stepNumber
        );


      const resource =
        db
          .prepare(`
            SELECT
              id,
              career_name,
              step_number,
              step_title,
              resource_title,
              video_url,
              resource_url,
              created_at
            FROM learning_resources
            WHERE career_name = ?
            AND step_number = ?
          `)
          .get(
            careerName,
            stepNumber
          );


      if (!resource) {
        return res.status(404).json({
          message:
            "Learning resource not found for this step."
        });
      }


      res.status(200).json({
        resource
      });

    } catch (error) {

      console.error(
        "Get step learning resource error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch learning resource."
      });
    }

  }
);


/* =========================================================
   GET SCHOLARSHIPS
========================================================= */

app.get(
  "/api/scholarships",
  (req, res) => {

    try {

      const rows =
        db
          .prepare(`
            SELECT
              id,
              name,
              category,
              level,
              amount,
              state,
              courses,
              student_categories,
              eligibility,
              deadline,
              keywords,
              description,
              source_url,
              created_at
            FROM scholarships
            ORDER BY id ASC
          `)
          .all();


      const scholarships =
        rows.map(
          (scholarship) => ({
            id:
              scholarship.id,

            name:
              scholarship.name,

            category:
              scholarship.category,

            level:
              scholarship.level,

            amount:
              scholarship.amount,

            state:
              scholarship.state,

            courses:
              JSON.parse(
                scholarship.courses || "[]"
              ),

            studentCategories:
              JSON.parse(
                scholarship.student_categories || "[]"
              ),

            eligibility:
              scholarship.eligibility,

            deadline:
              scholarship.deadline,

            keywords:
              JSON.parse(
                scholarship.keywords || "[]"
              ),

            description:
              scholarship.description,

            sourceUrl:
              scholarship.source_url || ""
          })
        );


      res.status(200).json({
        scholarships
      });

    } catch (error) {

      console.error(
        "Get scholarships error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch scholarships."
      });
    }

  }
);


/* =========================================================
   SAVE SCHOLARSHIP
========================================================= */

app.post(
  "/api/saved-scholarship",
  (req, res) => {

    try {

      const {
        student_id,
        scholarship_id
      } = req.body;


      const studentId =
        Number(student_id);

      const scholarshipId =
        Number(scholarship_id);


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      if (
        !Number.isInteger(scholarshipId) ||
        scholarshipId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid scholarship ID."
        });
      }


      const student =
        db
          .prepare(`
            SELECT id
            FROM students
            WHERE id = ?
          `)
          .get(studentId);


      if (!student) {
        return res.status(404).json({
          message:
            "Student not found."
        });
      }


      const scholarship =
        db
          .prepare(`
            SELECT id, name
            FROM scholarships
            WHERE id = ?
          `)
          .get(scholarshipId);


      if (!scholarship) {
        return res.status(404).json({
          message:
            "Scholarship not found."
        });
      }


      const existing =
        db
          .prepare(`
            SELECT id
            FROM saved_scholarships
            WHERE student_id = ?
            AND scholarship_id = ?
          `)
          .get(
            studentId,
            scholarshipId
          );


      if (existing) {
        return res.status(409).json({
          message:
            "This scholarship is already saved."
        });
      }


      const result =
        db
          .prepare(`
            INSERT INTO saved_scholarships (
              student_id,
              scholarship_id
            )
            VALUES (?, ?)
          `)
          .run(
            studentId,
            scholarshipId
          );


      res.status(201).json({

        message:
          "Scholarship saved successfully!",

        savedScholarship: {
          id:
            result.lastInsertRowid,

          student_id:
            studentId,

          scholarship_id:
            scholarshipId,

          name:
            scholarship.name
        }

      });

    } catch (error) {

      console.error(
        "Save scholarship error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to save scholarship."
      });
    }

  }
);


/* =========================================================
   GET SAVED SCHOLARSHIPS
========================================================= */

app.get(
  "/api/saved-scholarships/:studentId",
  (req, res) => {

    try {

      const studentId =
        Number(
          req.params.studentId
        );


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      const savedScholarships =
        db
          .prepare(`
            SELECT
              ss.id,
              ss.student_id,
              ss.scholarship_id,
              ss.created_at,
              s.name
            FROM saved_scholarships ss
            INNER JOIN scholarships s
              ON s.id = ss.scholarship_id
            WHERE ss.student_id = ?
            ORDER BY ss.created_at DESC
          `)
          .all(studentId);


      res.status(200).json({
        savedScholarships
      });

    } catch (error) {

      console.error(
        "Get saved scholarships error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch saved scholarships."
      });
    }

  }
);


/* =========================================================
   DELETE SAVED SCHOLARSHIP
========================================================= */

app.delete(
  "/api/saved-scholarship/:id",
  (req, res) => {

    try {

      const savedScholarshipId =
        Number(
          req.params.id
        );


      if (
        !Number.isInteger(
          savedScholarshipId
        ) ||
        savedScholarshipId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid saved scholarship ID."
        });
      }


      const savedScholarship =
        db
          .prepare(`
            SELECT id
            FROM saved_scholarships
            WHERE id = ?
          `)
          .get(
            savedScholarshipId
          );


      if (!savedScholarship) {
        return res.status(404).json({
          message:
            "Saved scholarship not found."
        });
      }


      db
        .prepare(`
          DELETE FROM saved_scholarships
          WHERE id = ?
        `)
        .run(
          savedScholarshipId
        );


      res.status(200).json({
        message:
          "Saved scholarship removed successfully."
      });

    } catch (error) {

      console.error(
        "Delete saved scholarship error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to remove saved scholarship."
      });
    }

  }
);

/* =========================================================
   SAVE CAREER QUIZ RESULT
========================================================= */

app.post(
  "/api/career-quiz-result",
  (req, res) => {

    try {

      const {
        student_id,
        career_area,
        result_title,
        scores
      } = req.body;


      const studentId =
        Number(student_id);


      /* -------------------------
         VALIDATION
      ------------------------- */

      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      if (
        !career_area ||
        !result_title ||
        !scores
      ) {
        return res.status(400).json({
          message:
            "Career area, result title and scores are required."
        });
      }


      /* -------------------------
         CHECK STUDENT
      ------------------------- */

      const student =
        db
          .prepare(`
            SELECT id
            FROM students
            WHERE id = ?
          `)
          .get(studentId);


      if (!student) {
        return res.status(404).json({
          message:
            "Student not found."
        });
      }


      /* -------------------------
         SAVE RESULT
      ------------------------- */

      const result =
        db
          .prepare(`
            INSERT INTO career_quiz_results (
              student_id,
              career_area,
              result_title,
              scores
            )
            VALUES (?, ?, ?, ?)
          `)
          .run(
            studentId,
            career_area.trim(),
            result_title.trim(),
            JSON.stringify(scores)
          );


      /* -------------------------
         GET SAVED RESULT
      ------------------------- */

      const savedResult =
        db
          .prepare(`
            SELECT
              id,
              student_id,
              career_area,
              result_title,
              scores,
              created_at
            FROM career_quiz_results
            WHERE id = ?
          `)
          .get(
            result.lastInsertRowid
          );


      res.status(201).json({

        message:
          "Career quiz result saved successfully!",

        result: {
          id:
            savedResult.id,

          student_id:
            savedResult.student_id,

          career_area:
            savedResult.career_area,

          result_title:
            savedResult.result_title,

          scores:
            JSON.parse(
              savedResult.scores
            ),

          created_at:
            savedResult.created_at
        }

      });

    } catch (error) {

      console.error(
        "Save career quiz result error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to save career quiz result."
      });
    }

  }
);


/* =========================================================
   GET CAREER QUIZ RESULTS
========================================================= */

app.get(
  "/api/career-quiz-results/:studentId",
  (req, res) => {

    try {

      const studentId =
        Number(
          req.params.studentId
        );


      if (
        !Number.isInteger(studentId) ||
        studentId <= 0
      ) {
        return res.status(400).json({
          message:
            "Invalid student ID."
        });
      }


      const results =
        db
          .prepare(`
            SELECT
              id,
              student_id,
              career_area,
              result_title,
              scores,
              created_at
            FROM career_quiz_results
            WHERE student_id = ?
            ORDER BY created_at DESC
          `)
          .all(studentId);


      const formattedResults =
        results.map(
          (item) => ({
            id:
              item.id,

            student_id:
              item.student_id,

            career_area:
              item.career_area,

            result_title:
              item.result_title,

            scores:
              JSON.parse(
                item.scores || "{}"
              ),

            created_at:
              item.created_at
          })
        );


      res.status(200).json({
        results:
          formattedResults
      });

    } catch (error) {

      console.error(
        "Get career quiz results error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to fetch career quiz results."
      });
    }

  }
);

// ==========================================
// RESUME BUILDER
// ==========================================

// Get saved resume
app.get("/api/resume/:studentId", (req, res) => {
  try {
    const { studentId } = req.params;

    const resume = db.prepare(`
      SELECT *
      FROM resumes
      WHERE student_id = ?
    `).get(studentId);

    res.json({
      resume: resume || null,
    });
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({
      message: "Unable to load resume.",
    });
  }
});


// Save / Update resume
app.post("/api/resume", (req, res) => {
  try {
    const {
      student_id,
      full_name,
      email,
      phone,
      location,
      career_title,
      education,
      college,
      graduation_year,
      skills,
      projects,
      certifications,
      achievements,
      linkedin,
      github,
      portfolio,
    } = req.body;

    if (!student_id) {
      return res.status(400).json({
        message: "Student ID is required.",
      });
    }

    const existingResume = db.prepare(`
      SELECT id
      FROM resumes
      WHERE student_id = ?
    `).get(student_id);

    if (existingResume) {
      db.prepare(`
        UPDATE resumes
        SET
          full_name = ?,
          email = ?,
          phone = ?,
          location = ?,
          career_title = ?,
          education = ?,
          college = ?,
          graduation_year = ?,
          skills = ?,
          projects = ?,
          certifications = ?,
          achievements = ?,
          linkedin = ?,
          github = ?,
          portfolio = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE student_id = ?
      `).run(
        full_name,
        email,
        phone,
        location,
        career_title,
        education,
        college,
        graduation_year,
        skills,
        projects,
        certifications,
        achievements,
        linkedin,
        github,
        portfolio,
        student_id
      );
    } else {
      db.prepare(`
        INSERT INTO resumes (
          student_id,
          full_name,
          email,
          phone,
          location,
          career_title,
          education,
          college,
          graduation_year,
          skills,
          projects,
          certifications,
          achievements,
          linkedin,
          github,
          portfolio
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        student_id,
        full_name,
        email,
        phone,
        location,
        career_title,
        education,
        college,
        graduation_year,
        skills,
        projects,
        certifications,
        achievements,
        linkedin,
        github,
        portfolio
      );
    }

    res.json({
      message: "Resume saved successfully!",
    });
  } catch (error) {
    console.error("Save resume error:", error);

    res.status(500).json({
      message: "Unable to save resume.",
    });
  }
});

// ==========================================
// PORTFOLIO BUILDER
// ==========================================


// =========================================================
// GET SAVED PORTFOLIO
// =========================================================

app.get("/api/portfolio/:studentId", (req, res) => {
  try {
    const studentId = Number(req.params.studentId);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return res.status(400).json({
        message: "Invalid student ID.",
      });
    }

    const portfolio = db.prepare(`
      SELECT *
      FROM portfolios
      WHERE student_id = ?
    `).get(studentId);

    if (!portfolio) {
      return res.json({
        portfolio: null,
      });
    }

    res.json({
      portfolio: {
        ...portfolio,
        projects: JSON.parse(portfolio.projects || "[]"),
      },
    });

  } catch (error) {

    console.error("Get portfolio error:", error);

    res.status(500).json({
      message: "Unable to load portfolio.",
    });
  }
});


// =========================================================
// SAVE / UPDATE PORTFOLIO
// =========================================================

app.post("/api/portfolio", (req, res) => {

  try {

    const {
      student_id,

      full_name,
      title,
      email,
      phone,
      location,

      about,
      career_goal,

      education,
      college,
      graduation_year,

      skills,
      certifications,
      achievements,

      github,
      linkedin,
      portfolio,

      projects,
    } = req.body;


    // ------------------------------------------
    // VALIDATE STUDENT ID
    // ------------------------------------------

    const studentId = Number(student_id);

    if (
      !Number.isInteger(studentId) ||
      studentId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid student ID.",
      });
    }


    // ------------------------------------------
    // CHECK STUDENT
    // ------------------------------------------

    const student = db.prepare(`
      SELECT id
      FROM students
      WHERE id = ?
    `).get(studentId);


    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }


    // ------------------------------------------
    // CHECK EXISTING PORTFOLIO
    // ------------------------------------------

    const existingPortfolio = db.prepare(`
      SELECT id
      FROM portfolios
      WHERE student_id = ?
    `).get(studentId);


    // Convert projects array into JSON
    const projectsJson = JSON.stringify(
      Array.isArray(projects)
        ? projects
        : []
    );


    // ------------------------------------------
    // UPDATE EXISTING PORTFOLIO
    // ------------------------------------------

    if (existingPortfolio) {

      db.prepare(`
        UPDATE portfolios
        SET
          full_name = ?,
          title = ?,
          email = ?,
          phone = ?,
          location = ?,

          about = ?,
          career_goal = ?,

          education = ?,
          college = ?,
          graduation_year = ?,

          skills = ?,
          certifications = ?,
          achievements = ?,

          github = ?,
          linkedin = ?,
          portfolio = ?,

          projects = ?,

          updated_at = CURRENT_TIMESTAMP

        WHERE student_id = ?
      `).run(

        full_name || "",
        title || "",
        email || "",
        phone || "",
        location || "",

        about || "",
        career_goal || "",

        education || "",
        college || "",
        graduation_year || "",

        skills || "",
        certifications || "",
        achievements || "",

        github || "",
        linkedin || "",
        portfolio || "",

        projectsJson,

        studentId
      );


      return res.json({
        message: "Portfolio updated successfully!",
      });
    }


    // ------------------------------------------
    // CREATE NEW PORTFOLIO
    // ------------------------------------------

    db.prepare(`
      INSERT INTO portfolios (

        student_id,

        full_name,
        title,
        email,
        phone,
        location,

        about,
        career_goal,

        education,
        college,
        graduation_year,

        skills,
        certifications,
        achievements,

        github,
        linkedin,
        portfolio,

        projects

      )

      VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?
      )
    `).run(

      studentId,

      full_name || "",
      title || "",
      email || "",
      phone || "",
      location || "",

      about || "",
      career_goal || "",

      education || "",
      college || "",
      graduation_year || "",

      skills || "",
      certifications || "",
      achievements || "",

      github || "",
      linkedin || "",
      portfolio || "",

      projectsJson
    );


    res.status(201).json({
      message: "Portfolio saved successfully!",
    });


  } catch (error) {

    console.error(
      "Save portfolio error:",
      error
    );

    res.status(500).json({
      message: "Unable to save portfolio.",
    });
  }
});


// =========================================================
// DELETE SAVED PORTFOLIO
// =========================================================

app.delete("/api/portfolio/:studentId", (req, res) => {

  try {

    const studentId = Number(req.params.studentId);


    if (
      !Number.isInteger(studentId) ||
      studentId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid student ID.",
      });
    }


    const existingPortfolio = db.prepare(`
      SELECT id
      FROM portfolios
      WHERE student_id = ?
    `).get(studentId);


    if (!existingPortfolio) {
      return res.status(404).json({
        message: "Portfolio not found.",
      });
    }


    db.prepare(`
      DELETE FROM portfolios
      WHERE student_id = ?
    `).run(studentId);


    res.json({
      message: "Portfolio deleted successfully!",
    });


  } catch (error) {

    console.error(
      "Delete portfolio error:",
      error
    );

    res.status(500).json({
      message: "Unable to delete portfolio.",
    });
  }
});

// ==========================================
// AI CAREER BUDDY
// ==========================================

app.post("/api/ai-career", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    const systemPrompt = `
You are AI Career Buddy for Career Scholarship Platform.

Your job is to help students with:
- Career guidance
- Education choices
- Scholarships
- Skills
- Internships
- Jobs
- Projects
- Resume building
- Portfolio building
- Interview preparation
- Learning roadmaps
- Computer Science and technology careers

Give clear, practical and student-friendly answers.

The student may be from any education background.
Do not assume that the student is studying Computer Science unless they tell you.

If the question is unrelated to careers or education, you may still answer briefly and politely, then guide the student back toward useful education or career information.

Do not claim that you have accessed private student information unless it is actually provided in the conversation.

For medical, legal, financial or other high-risk questions, provide general information and encourage the user to consult an appropriate qualified professional when necessary.

Use simple English and structured answers.
`;

    const safeHistory = Array.isArray(history)
      ? history.slice(-10)
      : [];

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...safeHistory
        .filter(
          (item) =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
        )
        .map((item) => ({
          role: item.role,
          content: item.content,
        })),

      {
        role: "user",
        content: message.trim(),
      },
    ];

    const userContents = messages
  .filter(
    (item) =>
      item &&
      (item.role === "user" || item.role === "assistant") &&
      typeof item.content === "string"
  )
  .map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: item.content,
      },
    ],
  }));

const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: userContents,
  config: {
    systemInstruction: systemPrompt,
  },
});

const answer =
  response.text ||
  "Sorry, I could not generate a response right now.";
    
    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Career Buddy Error:", error);

    res.status(500).json({
      success: false,
      message: "AI Career Buddy is temporarily unavailable.",
    });
  }
});

/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Career Scholarship Platform backend running on port ${PORT}`
  );
});