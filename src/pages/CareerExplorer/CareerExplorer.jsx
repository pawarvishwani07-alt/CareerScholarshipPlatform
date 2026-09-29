import { useState } from "react";
import { Link } from "react-router-dom";
import "./CareerExplorer.css";

function CareerExplorer() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [savedCareer, setSavedCareer] = useState(false);
  // =====================================================
  // EDUCATION PATHS
  // =====================================================

  const educationPaths = {
    after10: {
      title: "Choose your path after 10th",
      description:
        "Select a stream or pathway to explore suitable courses and career opportunities.",

      options: [
        {
          icon: "🔬",
          title: "Science",
          description:
            "Explore technology, engineering, medicine, research and science-related careers.",
        },
        {
          icon: "📊",
          title: "Commerce",
          description:
            "Explore finance, accounting, banking, business and management careers.",
        },
        {
          icon: "🎨",
          title: "Arts",
          description:
            "Explore design, psychology, media, communication and creative careers.",
        },
        {
          icon: "🛠️",
          title: "Diploma",
          description:
            "Build practical and technical skills through diploma programs.",
        },
        {
          icon: "⚙️",
          title: "Vocational",
          description:
            "Develop job-focused skills through vocational education and training.",
        },
      ],
    },

    after12: {
      title: "Choose your path after 12th",
      description:
        "Explore courses and career directions available after completing 12th.",

      options: [
        {
          icon: "🎓",
          title: "Degree Courses",
          description:
            "Explore undergraduate degrees and the careers they can lead to.",
        },
        {
          icon: "💼",
          title: "Professional Courses",
          description:
            "Explore professional courses and career-focused programs.",
        },
        {
          icon: "📜",
          title: "Diploma Courses",
          description:
            "Build practical skills through diploma-level education.",
        },
        {
          icon: "🏛️",
          title: "Competitive Exams",
          description:
            "Explore competitive examinations and government career pathways.",
        },
        {
          icon: "💻",
          title: "Skill-Based Careers",
          description:
            "Explore technology, design, digital and other skill-based careers.",
        },
      ],
    },

    graduation: {
      title: "Choose your path after graduation",
      description:
        "Explore different career directions after completing your graduation.",

      options: [
        {
          icon: "🎓",
          title: "Higher Studies",
          description:
            "Explore postgraduate courses, master's degrees and advanced studies.",
        },
        {
          icon: "💼",
          title: "Private Jobs",
          description:
            "Explore private-sector jobs and professional opportunities.",
        },
        {
          icon: "🏛️",
          title: "Government Jobs",
          description:
            "Explore government careers and competitive examinations.",
        },
        {
          icon: "📜",
          title: "Professional Certifications",
          description:
            "Build specialised skills through professional certifications.",
        },
        {
          icon: "🚀",
          title: "Entrepreneurship",
          description:
            "Explore startups, freelancing, business and entrepreneurship.",
        },
      ],
    },
  };

  // =====================================================
  // CAREER DATA
  // =====================================================

  const careerData = {
    // ===================================================
    // AFTER 10TH — SCIENCE
    // ===================================================

    "Computer Science": {
      icon: "💻",
      category: "Technology",
      title: "Computer Science",

      shortDescription:
        "A technology-focused career area involving programming, software, websites, applications, data and digital systems.",

      about:
        "Computer Science is a broad technology field where students learn how software, applications, websites and digital systems are created and managed.",

      education: [
        "Science stream after 10th",
        "12th with Mathematics is useful for many degree programs",
        "B.Sc. Computer Science",
        "BCA",
        "B.Tech / B.E. Computer Engineering",
        "Other recognised computer and technology programs",
      ],

      skills: [
        "Programming",
        "Problem solving",
        "Logical thinking",
        "Web development",
        "Database management",
        "Communication",
      ],

      careers: [
        "Software Developer",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
        "Data Analyst",
        "Cybersecurity Analyst",
        "AI / ML Engineer",
        "UI / UX Designer",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable Science / technology pathway",
        "Complete 12th or relevant diploma",
        "Choose a computer-related degree or course",
        "Build programming and technical skills",
        "Create projects and portfolio",
        "Apply for internships and entry-level opportunities",
      ],
    },

    Engineering: {
      icon: "⚙️",
      category: "Engineering",
      title: "Engineering",

      shortDescription:
        "A technical career area covering computer, mechanical, civil, electronics and other engineering disciplines.",

      about:
        "Engineering uses mathematics, science and technical knowledge to design, build and improve products, systems and solutions.",

      education: [
        "Science stream after 10th",
        "12th with Physics, Chemistry and Mathematics for many engineering routes",
        "Diploma in Engineering",
        "B.E.",
        "B.Tech.",
      ],

      skills: [
        "Mathematics",
        "Problem solving",
        "Technical thinking",
        "Communication",
        "Project management",
        "Practical knowledge",
      ],

      careers: [
        "Software Engineer",
        "Mechanical Engineer",
        "Civil Engineer",
        "Electrical Engineer",
        "Electronics Engineer",
        "Network Engineer",
        "Automation Engineer",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Science pathway",
        "Complete 12th or relevant diploma",
        "Choose an engineering branch",
        "Complete engineering education",
        "Build technical projects",
        "Apply for internships and jobs",
      ],
    },

    Medicine: {
      icon: "🩺",
      category: "Healthcare",
      title: "Medicine",

      shortDescription:
        "A healthcare career area focused on understanding diseases, patient care, diagnosis and treatment.",

      about:
        "Medicine is a healthcare field involving scientific study of the human body, diseases, diagnosis and patient care.",

      education: [
        "Science stream after 10th",
        "12th with Physics, Chemistry and Biology for relevant medical pathways",
        "Medical entrance requirements depend on the chosen course",
        "MBBS and other recognised healthcare programs",
      ],

      skills: [
        "Biology knowledge",
        "Communication",
        "Observation",
        "Patience",
        "Decision making",
        "Empathy",
      ],

      careers: [
        "Doctor",
        "Dentist",
        "Physiotherapist",
        "Medical Researcher",
        "Healthcare Professional",
        "Medical Laboratory Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Science with Biology",
        "Complete 12th",
        "Meet admission requirements for the chosen course",
        "Complete professional healthcare education",
        "Complete required practical training",
        "Begin professional practice according to applicable rules",
      ],
    },

    Pharmacy: {
      icon: "🧪",
      category: "Healthcare",
      title: "Pharmacy",

      shortDescription:
        "A healthcare field focused on medicines, pharmaceutical science, drug safety and patient support.",

      about:
        "Pharmacy combines science and healthcare to understand medicines, their preparation, use, safety and effects.",

      education: [
        "Science stream after 10th",
        "12th with relevant science subjects",
        "Diploma in Pharmacy",
        "Bachelor of Pharmacy",
        "Other recognised pharmacy programs",
      ],

      skills: [
        "Chemistry",
        "Biology",
        "Attention to detail",
        "Communication",
        "Scientific thinking",
        "Organisation",
      ],

      careers: [
        "Pharmacist",
        "Pharmaceutical Researcher",
        "Quality Control Professional",
        "Clinical Research Professional",
        "Pharmaceutical Sales Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Science pathway",
        "Complete 12th or relevant diploma",
        "Choose a recognised pharmacy program",
        "Complete practical training where required",
        "Develop pharmaceutical knowledge",
        "Explore relevant career opportunities",
      ],
    },

    Research: {
      icon: "🔬",
      category: "Science & Research",
      title: "Research",

      shortDescription:
        "A career area focused on discovering new knowledge through scientific investigation, experiments and analysis.",

      about:
        "Research careers involve asking questions, studying evidence, performing experiments and developing new knowledge or solutions.",

      education: [
        "Science stream after 10th",
        "Relevant undergraduate degree",
        "Postgraduate study for many research careers",
        "Specialised research training depending on the field",
      ],

      skills: [
        "Scientific thinking",
        "Observation",
        "Data analysis",
        "Research skills",
        "Problem solving",
        "Patience",
      ],

      careers: [
        "Research Scientist",
        "Laboratory Researcher",
        "Data Researcher",
        "Scientific Analyst",
        "Academic Researcher",
      ],

      roadmap: [
        "Build a strong science foundation",
        "Complete an undergraduate degree",
        "Choose a research area",
        "Develop research and analytical skills",
        "Complete advanced study where required",
        "Work on research projects",
        "Apply for research opportunities",
      ],
    },

    Architecture: {
      icon: "🏛️",
      category: "Design & Architecture",
      title: "Architecture",

      shortDescription:
        "A design and technical field involving buildings, spaces, planning and the built environment.",

      about:
        "Architecture combines design, technical knowledge and planning to create functional and meaningful buildings and spaces.",

      education: [
        "Science pathway can be relevant for many architecture routes",
        "12th with required subjects for the chosen course",
        "Bachelor of Architecture",
        "Relevant entrance and admission requirements",
      ],

      skills: [
        "Creative thinking",
        "Drawing",
        "Design",
        "Spatial thinking",
        "Technical knowledge",
        "Communication",
      ],

      careers: [
        "Architect",
        "Interior Designer",
        "Urban Planning Professional",
        "Architectural Visualiser",
        "Design Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable academic pathway",
        "Complete 12th with required subjects",
        "Meet the chosen architecture course requirements",
        "Complete architecture education",
        "Build a design portfolio",
        "Explore internships and professional opportunities",
      ],
    },

    // ===================================================
    // AFTER 10TH — COMMERCE
    // ===================================================

    "Accounting & Finance": {
      icon: "💰",
      category: "Commerce & Finance",
      title: "Accounting & Finance",

      shortDescription:
        "A career area focused on money management, accounting, financial records, budgeting and business finance.",

      about:
        "Accounting and finance involve maintaining financial information, understanding business finances and helping organisations manage money effectively.",

      education: [
        "Commerce stream after 10th",
        "11th and 12th Commerce",
        "B.Com",
        "BMS / BBA",
        "Professional finance and accounting certifications",
      ],

      skills: [
        "Accounting",
        "Mathematics",
        "Excel",
        "Financial analysis",
        "Attention to detail",
        "Communication",
      ],

      careers: [
        "Accountant",
        "Financial Analyst",
        "Tax Assistant",
        "Accounts Executive",
        "Finance Executive",
        "Auditing Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Commerce",
        "Complete 12th Commerce",
        "Choose B.Com or another suitable course",
        "Learn accounting and Excel",
        "Build practical finance skills",
        "Apply for internships and entry-level jobs",
      ],
    },

    "Business & Management": {
      icon: "📈",
      category: "Business",
      title: "Business & Management",

      shortDescription:
        "A career area involving business operations, management, planning, marketing and organisational decision-making.",

      about:
        "Business and management careers involve planning, organising and managing people, resources and business activities.",

      education: [
        "Commerce stream after 10th",
        "12th Commerce",
        "BMS",
        "BBA",
        "B.Com",
        "MBA for advanced management roles",
      ],

      skills: [
        "Leadership",
        "Communication",
        "Planning",
        "Teamwork",
        "Problem solving",
        "Decision making",
      ],

      careers: [
        "Business Executive",
        "Management Trainee",
        "Business Analyst",
        "Operations Executive",
        "Marketing Executive",
        "Entrepreneur",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Commerce",
        "Complete 12th",
        "Choose a business or management degree",
        "Develop communication and leadership skills",
        "Gain practical experience",
        "Explore jobs or entrepreneurship",
      ],
    },

    Banking: {
      icon: "🏦",
      category: "Banking & Finance",
      title: "Banking",

      shortDescription:
        "A career area involving banking services, financial transactions, customer support and financial operations.",

      about:
        "Banking careers involve financial services, customer support, account operations and other banking activities.",

      education: [
        "Commerce stream after 10th",
        "12th Commerce",
        "B.Com / BBA / BMS",
        "Banking-related certifications",
        "Competitive examinations for relevant banking recruitment",
      ],

      skills: [
        "Numerical ability",
        "Communication",
        "Customer service",
        "Computer skills",
        "Financial knowledge",
        "Accuracy",
      ],

      careers: [
        "Banking Executive",
        "Customer Service Executive",
        "Bank Clerk",
        "Relationship Executive",
        "Financial Services Executive",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Commerce",
        "Complete 12th",
        "Complete a suitable graduation course",
        "Develop banking and aptitude skills",
        "Prepare for relevant recruitment processes",
        "Explore banking opportunities",
      ],
    },

    "Digital Marketing": {
      icon: "📱",
      category: "Marketing",
      title: "Digital Marketing",

      shortDescription:
        "A modern career area involving social media, online advertising, content, websites and digital campaigns.",

      about:
        "Digital marketing uses online platforms and digital channels to communicate with customers and promote products or services.",

      education: [
        "Commerce stream can be suitable",
        "12th education",
        "Degree in Commerce, Management, Marketing or related field",
        "Digital marketing certifications",
      ],

      skills: [
        "Communication",
        "Content creation",
        "Social media",
        "Canva",
        "Analytics",
        "Creativity",
      ],

      careers: [
        "Digital Marketing Executive",
        "Social Media Executive",
        "SEO Executive",
        "Content Marketing Executive",
        "Digital Advertising Executive",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable stream",
        "Complete 12th",
        "Learn digital marketing skills",
        "Build sample campaigns and projects",
        "Complete useful certifications",
        "Apply for internships and jobs",
      ],
    },

    // ===================================================
    // AFTER 10TH — ARTS
    // ===================================================

    "Graphic Design": {
      icon: "🎨",
      category: "Design",
      title: "Graphic Design",

      shortDescription:
        "A creative career involving visual communication, branding, posters, social media designs and digital graphics.",

      about:
        "Graphic design combines creativity and visual communication to create designs for digital and printed media.",

      education: [
        "Arts stream after 10th can be suitable",
        "12th education",
        "Degree or diploma in design",
        "Graphic design certifications",
        "Portfolio development",
      ],

      skills: [
        "Creativity",
        "Canva",
        "Typography",
        "Colour theory",
        "Visual communication",
        "Portfolio building",
      ],

      careers: [
        "Graphic Designer",
        "Social Media Designer",
        "Brand Designer",
        "Visual Designer",
        "Freelance Designer",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable academic pathway",
        "Learn graphic design",
        "Practice using design tools",
        "Create a portfolio",
        "Take internships or freelance projects",
        "Apply for design opportunities",
      ],
    },

    Psychology: {
      icon: "🧠",
      category: "Psychology & Social Science",
      title: "Psychology",

      shortDescription:
        "A field focused on human behaviour, thoughts, emotions and psychological processes.",

      about:
        "Psychology studies human behaviour and mental processes using scientific and research-based approaches.",

      education: [
        "Arts stream can be suitable",
        "12th education",
        "Bachelor's degree in Psychology",
        "Postgraduate study for many specialised careers",
      ],

      skills: [
        "Communication",
        "Observation",
        "Listening",
        "Research",
        "Empathy",
        "Critical thinking",
      ],

      careers: [
        "Psychology Professional",
        "Research Assistant",
        "Counselling-related roles with required qualifications",
        "Human Resources Professional",
        "Behavioural Researcher",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable stream",
        "Complete 12th",
        "Study Psychology at undergraduate level",
        "Develop research and communication skills",
        "Complete further study where required",
        "Explore suitable professional roles",
      ],
    },

    "Journalism & Media": {
      icon: "📰",
      category: "Media & Communication",
      title: "Journalism & Media",

      shortDescription:
        "A communication-focused field involving news, writing, digital media, reporting and storytelling.",

      about:
        "Journalism and media involve researching, creating and communicating information through different media platforms.",

      education: [
        "Arts stream can be suitable",
        "12th education",
        "Bachelor's degree in Journalism or Mass Media",
        "Diploma and certification programs",
      ],

      skills: [
        "Writing",
        "Communication",
        "Research",
        "Storytelling",
        "Interviewing",
        "Digital media",
      ],

      careers: [
        "Journalist",
        "Content Writer",
        "Reporter",
        "Social Media Executive",
        "Digital Media Professional",
        "Copywriter",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable stream",
        "Complete 12th",
        "Study journalism, media or communication",
        "Build writing and communication skills",
        "Create a media portfolio",
        "Apply for internships and media opportunities",
      ],
    },

    "Social Sciences": {
      icon: "🌍",
      category: "Social Science",
      title: "Social Sciences",

      shortDescription:
        "A broad academic area covering society, people, culture, economics, politics and human relationships.",

      about:
        "Social sciences study people, societies, institutions and relationships using different research methods.",

      education: [
        "Arts stream can be suitable",
        "12th education",
        "Bachelor's degree in a social science subject",
        "Postgraduate study for specialised careers",
      ],

      skills: [
        "Research",
        "Writing",
        "Critical thinking",
        "Communication",
        "Analysis",
        "Observation",
      ],

      careers: [
        "Research Assistant",
        "Social Research Professional",
        "Policy Research Professional",
        "Content Professional",
        "Teaching-related roles with required qualifications",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose Arts or another suitable stream",
        "Complete 12th",
        "Choose a social science subject",
        "Develop research and communication skills",
        "Complete advanced study where required",
        "Explore relevant career opportunities",
      ],
    },

    "Animation & Design": {
      icon: "🎬",
      category: "Creative Design",
      title: "Animation & Design",

      shortDescription:
        "A creative technology field involving animation, illustration, digital art, visual effects and design.",

      about:
        "Animation and design combine creativity, storytelling and digital tools to create visual content.",

      education: [
        "Arts stream can be suitable",
        "12th education",
        "Diploma in animation or design",
        "Degree in animation, multimedia or design",
        "Specialised certifications",
      ],

      skills: [
        "Drawing",
        "Creativity",
        "Storytelling",
        "Digital design",
        "Animation tools",
        "Visual thinking",
      ],

      careers: [
        "Animator",
        "Illustrator",
        "Motion Designer",
        "3D Artist",
        "Visual Effects Artist",
        "Game Artist",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable pathway",
        "Learn drawing and design basics",
        "Study animation or design",
        "Build a creative portfolio",
        "Create projects",
        "Apply for internships and creative opportunities",
      ],
    },

    // ===================================================
    // AFTER 10TH — DIPLOMA
    // ===================================================

    "Diploma Engineering": {
      icon: "🔧",
      category: "Technical Education",
      title: "Diploma Engineering",

      shortDescription:
        "A practical technical pathway covering engineering skills and industry-focused education.",

      about:
        "Diploma engineering programs provide practical and technical education in areas such as mechanical, civil, electrical and computer engineering.",

      education: [
        "Complete 10th education",
        "Choose a recognised engineering diploma",
        "Select a suitable engineering branch",
        "Further education can be pursued where eligible",
      ],

      skills: [
        "Technical knowledge",
        "Problem solving",
        "Mathematics",
        "Practical skills",
        "Computer skills",
        "Teamwork",
      ],

      careers: [
        "Junior Engineer",
        "Technical Assistant",
        "CAD Technician",
        "Maintenance Technician",
        "Engineering Assistant",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a diploma branch",
        "Complete diploma education",
        "Build practical technical skills",
        "Complete projects or practical training",
        "Apply for internships",
        "Explore jobs or further education",
      ],
    },

    "IT & Computer Diploma": {
      icon: "💻",
      category: "Information Technology",
      title: "IT & Computer Diploma",

      shortDescription:
        "A practical technology pathway focused on computers, software, networking and digital skills.",

      about:
        "IT and computer diploma programs help students build practical knowledge in computers, software and information technology.",

      education: [
        "Complete 10th education",
        "Choose a recognised computer or IT diploma",
        "Learn programming and computer fundamentals",
        "Continue higher education where eligible",
      ],

      skills: [
        "Computer skills",
        "Programming",
        "Networking",
        "Database basics",
        "Problem solving",
        "Communication",
      ],

      careers: [
        "IT Support Executive",
        "Computer Technician",
        "Junior Web Developer",
        "Network Support Executive",
        "Technical Support Executive",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose an IT or computer diploma",
        "Learn technical fundamentals",
        "Build small projects",
        "Complete practical training",
        "Create a resume and portfolio",
        "Apply for entry-level opportunities",
      ],
    },

    Automobile: {
      icon: "🚗",
      category: "Automobile",
      title: "Automobile",

      shortDescription:
        "A technical field focused on vehicles, automobile systems, maintenance and mechanical technology.",

      about:
        "Automobile careers involve vehicle systems, maintenance, repair, manufacturing and technical support.",

      education: [
        "Complete 10th education",
        "Automobile diploma or technical program",
        "Further technical education where eligible",
        "Practical training",
      ],

      skills: [
        "Mechanical knowledge",
        "Problem solving",
        "Technical skills",
        "Practical work",
        "Safety awareness",
        "Teamwork",
      ],

      careers: [
        "Automobile Technician",
        "Service Technician",
        "Workshop Assistant",
        "Automobile Service Advisor",
        "Automobile Technical Assistant",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose automobile technical education",
        "Learn vehicle systems",
        "Complete practical training",
        "Build hands-on experience",
        "Apply for internships",
        "Explore automobile industry opportunities",
      ],
    },

    Electrical: {
      icon: "⚡",
      category: "Electrical Technology",
      title: "Electrical",

      shortDescription:
        "A technical field involving electrical systems, equipment, maintenance and installation.",

      about:
        "Electrical careers involve understanding, installing, maintaining and troubleshooting electrical systems and equipment.",

      education: [
        "Complete 10th education",
        "Electrical diploma or technical course",
        "Practical training",
        "Further technical education where eligible",
      ],

      skills: [
        "Electrical knowledge",
        "Safety",
        "Problem solving",
        "Technical skills",
        "Practical work",
        "Attention to detail",
      ],

      careers: [
        "Electrical Technician",
        "Maintenance Technician",
        "Electrical Assistant",
        "Service Technician",
        "Technical Support Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose electrical technical education",
        "Learn electrical fundamentals",
        "Complete practical training",
        "Build hands-on skills",
        "Apply for internships",
        "Explore technical jobs",
      ],
    },

    // ===================================================
    // AFTER 10TH — VOCATIONAL
    // ===================================================

    "Healthcare Support": {
      icon: "🏥",
      category: "Healthcare Support",
      title: "Healthcare Support",

      shortDescription:
        "A job-focused pathway for students interested in healthcare support and patient-care environments.",

      about:
        "Healthcare support careers can involve assisting healthcare teams and supporting routine healthcare services, depending on the qualification and role.",

      education: [
        "Complete 10th education",
        "Choose a recognised healthcare vocational course",
        "Complete practical training",
        "Obtain additional qualifications where required",
      ],

      skills: [
        "Communication",
        "Care and responsibility",
        "Observation",
        "Teamwork",
        "Basic healthcare knowledge",
        "Discipline",
      ],

      careers: [
        "Healthcare Support Worker",
        "Hospital Assistant",
        "Patient Care Assistant",
        "Healthcare Service Assistant",
        "Medical Support Staff",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable healthcare course",
        "Complete theoretical learning",
        "Complete practical training",
        "Develop workplace skills",
        "Apply for suitable entry-level roles",
        "Continue learning and certification",
      ],
    },

    Hospitality: {
      icon: "🏨",
      category: "Hospitality",
      title: "Hospitality",

      shortDescription:
        "A practical career area involving hotels, restaurants, customer service, food services and tourism.",

      about:
        "Hospitality careers focus on serving customers and managing services in hotels, restaurants, travel and related industries.",

      education: [
        "Complete 10th education",
        "Vocational hospitality course",
        "Certificate or diploma in hospitality",
        "Practical training",
      ],

      skills: [
        "Communication",
        "Customer service",
        "Teamwork",
        "Time management",
        "Presentation",
        "Problem solving",
      ],

      careers: [
        "Hotel Staff",
        "Front Office Executive",
        "Food Service Professional",
        "Housekeeping Professional",
        "Customer Service Executive",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose hospitality training",
        "Learn customer service",
        "Complete practical training",
        "Gain workplace experience",
        "Build communication skills",
        "Explore hospitality opportunities",
      ],
    },

    "Retail & Sales": {
      icon: "🛍️",
      category: "Retail & Sales",
      title: "Retail & Sales",

      shortDescription:
        "A practical career area involving customer service, sales, retail operations and product support.",

      about:
        "Retail and sales careers involve helping customers, explaining products, managing stores and supporting business sales.",

      education: [
        "Complete 10th education",
        "Vocational retail or sales course",
        "Certificate programs",
        "Practical workplace training",
      ],

      skills: [
        "Communication",
        "Customer service",
        "Sales",
        "Product knowledge",
        "Teamwork",
        "Basic computer skills",
      ],

      careers: [
        "Sales Executive",
        "Retail Associate",
        "Customer Service Executive",
        "Store Assistant",
        "Sales Coordinator",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose retail or sales training",
        "Learn customer service",
        "Develop communication skills",
        "Complete practical training",
        "Gain work experience",
        "Explore retail and sales jobs",
      ],
    },

    "Beauty & Wellness": {
      icon: "💄",
      category: "Beauty & Wellness",
      title: "Beauty & Wellness",

      shortDescription:
        "A practical career area involving beauty services, personal care, wellness and customer services.",

      about:
        "Beauty and wellness careers involve practical personal-care services and customer-focused work.",

      education: [
        "Complete 10th education",
        "Beauty and wellness vocational course",
        "Certificate or diploma training",
        "Practical training",
      ],

      skills: [
        "Creativity",
        "Customer service",
        "Communication",
        "Practical skills",
        "Attention to detail",
        "Time management",
      ],

      careers: [
        "Beauty Professional",
        "Hair Professional",
        "Makeup Professional",
        "Salon Assistant",
        "Wellness Service Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a beauty or wellness course",
        "Learn practical techniques",
        "Complete hands-on training",
        "Build experience and portfolio",
        "Explore employment opportunities",
        "Consider freelance or business opportunities",
      ],
    },

    "Skilled Trades": {
      icon: "🧰",
      category: "Skilled Trades",
      title: "Skilled Trades",

      shortDescription:
        "Practical careers involving hands-on technical work, maintenance, repair and skilled services.",

      about:
        "Skilled trades provide practical training for technical and service-based work in different industries.",

      education: [
        "Complete 10th education",
        "Choose a recognised vocational or trade course",
        "Complete practical training",
        "Continue skill development through experience",
      ],

      skills: [
        "Practical skills",
        "Technical knowledge",
        "Problem solving",
        "Safety awareness",
        "Attention to detail",
        "Work discipline",
      ],

      careers: [
        "Technician",
        "Maintenance Worker",
        "Electrician",
        "Machine Operator",
        "Repair Technician",
        "Skilled Trade Professional",
      ],

      roadmap: [
        "Complete 10th education",
        "Choose a suitable trade",
        "Complete vocational training",
        "Develop hands-on skills",
        "Complete practical work",
        "Gain industry experience",
        "Explore employment or self-employment",
      ],
    },

    // ===================================================
    // AFTER 12TH — DEGREE COURSES
    // ===================================================

    "B.Sc. Computer Science": {
      icon: "💻",
      category: "Degree Courses",
      title: "B.Sc. Computer Science",

      shortDescription:
        "A degree pathway focused on programming, software, databases, web development and computer science concepts.",

      about:
        "B.Sc. Computer Science provides undergraduate education in programming, computer systems, databases, software and related technologies.",

      education: [
        "Complete 12th education with the required eligibility",
        "Apply for B.Sc. Computer Science or related degree",
        "Study programming and computer science subjects",
        "Complete practical projects",
      ],

      skills: [
        "Programming",
        "Problem solving",
        "Logical thinking",
        "Database management",
        "Web development",
        "Communication",
      ],

      careers: [
        "Software Developer",
        "Web Developer",
        "Data Analyst",
        "System Support Executive",
        "Cybersecurity Professional",
        "Junior Software Engineer",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose a recognised computer science degree",
        "Learn programming",
        "Build academic and personal projects",
        "Create a portfolio",
        "Complete internships",
        "Apply for technology jobs",
      ],
    },

    "B.Com & Finance": {
      icon: "💰",
      category: "Degree Courses",
      title: "B.Com & Finance",

      shortDescription:
        "An undergraduate pathway covering accounting, finance, taxation, business and commerce.",

      about:
        "B.Com and finance-related degrees provide knowledge of accounting, business, economics, finance and related subjects.",

      education: [
        "Complete 12th education with required eligibility",
        "B.Com or related degree",
        "Study accounting and finance",
        "Build practical business skills",
      ],

      skills: [
        "Accounting",
        "Excel",
        "Financial analysis",
        "Business knowledge",
        "Numerical ability",
        "Communication",
      ],

      careers: [
        "Accountant",
        "Accounts Executive",
        "Finance Executive",
        "Tax Assistant",
        "Financial Analyst",
        "Audit Assistant",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose B.Com or related degree",
        "Build accounting skills",
        "Learn Excel and financial tools",
        "Complete internships",
        "Build a professional resume",
        "Apply for finance opportunities",
      ],
    },

    "BBA & Management": {
      icon: "📊",
      category: "Degree Courses",
      title: "BBA & Management",

      shortDescription:
        "An undergraduate pathway focused on business administration, management, marketing and operations.",

      about:
        "BBA and management programs introduce students to business operations, marketing, finance, human resources and management.",

      education: [
        "Complete 12th education",
        "BBA or related management degree",
        "Study business and management",
        "Develop practical business skills",
      ],

      skills: [
        "Leadership",
        "Communication",
        "Marketing",
        "Planning",
        "Teamwork",
        "Decision making",
      ],

      careers: [
        "Management Trainee",
        "Marketing Executive",
        "HR Executive",
        "Operations Executive",
        "Business Development Executive",
        "Business Analyst",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose a recognised management degree",
        "Develop business knowledge",
        "Complete projects and internships",
        "Build communication skills",
        "Create a professional resume",
        "Apply for management opportunities",
      ],
    },

    "BA Psychology": {
      icon: "🧠",
      category: "Degree Courses",
      title: "BA Psychology",

      shortDescription:
        "An undergraduate pathway focused on human behaviour, psychology, research and social development.",

      about:
        "A psychology degree introduces students to human behaviour, psychological concepts, research methods and related areas.",

      education: [
        "Complete 12th education",
        "Bachelor's degree in Psychology",
        "Develop research knowledge",
        "Further study for specialised roles",
      ],

      skills: [
        "Observation",
        "Research",
        "Communication",
        "Listening",
        "Critical thinking",
        "Writing",
      ],

      careers: [
        "Research Assistant",
        "HR Professional",
        "Behavioural Researcher",
        "Psychology-related roles with required qualifications",
        "Social Research Professional",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose Psychology degree",
        "Build research skills",
        "Complete academic projects",
        "Consider postgraduate study",
        "Gain relevant experience",
        "Explore suitable career opportunities",
      ],
    },

    // ===================================================
    // AFTER 12TH — PROFESSIONAL COURSES
    // ===================================================

    "CA / Accounting": {
      icon: "📚",
      category: "Professional Courses",
      title: "CA / Accounting",

      shortDescription:
        "A professional accounting pathway focused on financial reporting, taxation, auditing and business finance.",

      about:
        "Professional accounting education develops advanced knowledge in accounting, auditing, taxation and financial management.",

      education: [
        "Complete 12th education",
        "Meet the eligibility requirements of the chosen professional course",
        "Complete required examinations and training",
        "Continue professional development",
      ],

      skills: [
        "Accounting",
        "Numerical ability",
        "Analysis",
        "Discipline",
        "Time management",
        "Attention to detail",
      ],

      careers: [
        "Accounting Professional",
        "Audit Professional",
        "Tax Professional",
        "Finance Professional",
        "Financial Consultant",
      ],

      roadmap: [
        "Complete 12th education",
        "Check professional course eligibility",
        "Register for the relevant pathway",
        "Prepare for examinations",
        "Complete required training",
        "Develop professional skills",
        "Build a career in accounting and finance",
      ],
    },

    "Law": {
      icon: "⚖️",
      category: "Professional Courses",
      title: "Law",

      shortDescription:
        "A professional field involving legal systems, rights, regulations, documentation and legal practice.",

      about:
        "Law involves understanding legal rules, rights, responsibilities and the systems used to resolve legal matters.",

      education: [
        "Complete 12th education for undergraduate law routes",
        "Choose a recognised law program",
        "Complete required legal education",
        "Meet professional requirements applicable to the chosen career",
      ],

      skills: [
        "Reading",
        "Research",
        "Communication",
        "Logical reasoning",
        "Writing",
        "Critical thinking",
      ],

      careers: [
        "Legal Professional",
        "Legal Researcher",
        "Legal Assistant",
        "Corporate Legal Professional",
        "Legal Consultant",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose a recognised law pathway",
        "Complete legal education",
        "Develop research and communication skills",
        "Complete required practical training",
        "Meet applicable professional requirements",
        "Explore legal career opportunities",
      ],
    },

    "Hotel Management": {
      icon: "🏨",
      category: "Professional Courses",
      title: "Hotel Management",

      shortDescription:
        "A professional pathway focused on hotels, hospitality, food services, tourism and customer experience.",

      about:
        "Hotel management combines hospitality knowledge with customer service, operations, food services and management skills.",

      education: [
        "Complete 12th education",
        "Degree, diploma or professional hospitality course",
        "Practical training",
        "Industry experience",
      ],

      skills: [
        "Communication",
        "Customer service",
        "Leadership",
        "Teamwork",
        "Time management",
        "Problem solving",
      ],

      careers: [
        "Hotel Manager",
        "Front Office Executive",
        "Food Service Manager",
        "Guest Relations Executive",
        "Hospitality Professional",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose a recognised hospitality course",
        "Learn hotel operations",
        "Complete practical training",
        "Gain industry experience",
        "Develop leadership skills",
        "Explore hospitality careers",
      ],
    },

    // ===================================================
    // AFTER 12TH — DIPLOMA COURSES
    // ===================================================

    "Digital Design Diploma": {
      icon: "🎨",
      category: "Diploma Courses",
      title: "Digital Design Diploma",

      shortDescription:
        "A practical design pathway covering graphics, digital media, visual communication and creative tools.",

      about:
        "A digital design diploma can provide practical training in graphic design, digital media and visual communication.",

      education: [
        "Complete 12th education",
        "Choose a recognised design diploma",
        "Learn digital design tools",
        "Build a creative portfolio",
      ],

      skills: [
        "Graphic design",
        "Canva",
        "Creativity",
        "Typography",
        "Visual communication",
        "Portfolio building",
      ],

      careers: [
        "Graphic Designer",
        "Digital Designer",
        "Social Media Designer",
        "Visual Designer",
        "Freelance Designer",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose a suitable design diploma",
        "Learn design tools",
        "Create practical projects",
        "Build a portfolio",
        "Complete internships",
        "Apply for design opportunities",
      ],
    },

    "IT Diploma": {
      icon: "💻",
      category: "Diploma Courses",
      title: "IT Diploma",

      shortDescription:
        "A practical technology course covering computers, software, networking and information technology.",

      about:
        "An IT diploma can help students develop practical knowledge in computer applications, software and technical support.",

      education: [
        "Complete 12th education",
        "Choose a recognised IT diploma",
        "Learn computer and technology fundamentals",
        "Complete practical projects",
      ],

      skills: [
        "Computer skills",
        "Programming",
        "Networking",
        "Database basics",
        "Problem solving",
        "Technical support",
      ],

      careers: [
        "IT Support Executive",
        "Technical Support Executive",
        "Junior Web Developer",
        "Computer Operator",
        "Network Support Executive",
      ],

      roadmap: [
        "Complete 12th education",
        "Choose an IT diploma",
        "Learn technical skills",
        "Build small projects",
        "Complete practical training",
        "Create a technical resume",
        "Apply for entry-level IT opportunities",
      ],
    },

    // ===================================================
    // AFTER 12TH — COMPETITIVE EXAMS
    // ===================================================

    "Government Services": {
      icon: "🏛️",
      category: "Competitive Exams",
      title: "Government Services",

      shortDescription:
        "A career direction involving government organisations and recruitment through applicable competitive examinations.",

      about:
        "Government career pathways can involve different examinations and recruitment processes depending on the organisation, role and eligibility.",

      education: [
        "Complete 12th education for applicable roles",
        "Graduation may be required for many examinations",
        "Check the eligibility of each examination",
        "Prepare according to the selected examination syllabus",
      ],

      skills: [
        "General knowledge",
        "Reasoning",
        "Communication",
        "Time management",
        "Current affairs",
        "Problem solving",
      ],

      careers: [
        "Government Administrative Roles",
        "Government Clerical Roles",
        "Public Sector Support Roles",
        "Government Department Roles",
      ],

      roadmap: [
        "Complete the required education",
        "Identify suitable government examinations",
        "Check eligibility and requirements",
        "Prepare according to the syllabus",
        "Take the applicable examination",
        "Complete further selection stages if applicable",
        "Join the organisation after selection",
      ],
    },

    "Defence Careers": {
      icon: "🪖",
      category: "Competitive Exams",
      title: "Defence Careers",

      shortDescription:
        "A career direction involving defence services and related roles subject to eligibility and selection requirements.",

      about:
        "Defence career opportunities include different services and roles with specific educational, physical and selection requirements.",

      education: [
        "Complete the required education",
        "Check eligibility for the chosen defence entry",
        "Meet applicable physical and medical requirements",
        "Complete the relevant selection process",
      ],

      skills: [
        "Discipline",
        "Teamwork",
        "Leadership",
        "Physical fitness",
        "Communication",
        "Decision making",
      ],

      careers: [
        "Defence Service Roles",
        "Technical Defence Roles",
        "Support Service Roles",
        "Administrative Defence Roles",
      ],

      roadmap: [
        "Complete required education",
        "Research suitable defence entries",
        "Check eligibility requirements",
        "Prepare academically and physically",
        "Complete the relevant selection process",
        "Complete training if selected",
        "Begin service according to the applicable role",
      ],
    },

    // ===================================================
    // AFTER 12TH — SKILL-BASED CAREERS
    // ===================================================

    "Web Development": {
      icon: "🌐",
      category: "Skill-Based Careers",
      title: "Web Development",

      shortDescription:
        "A technology career involving websites, web applications, frontend development and backend systems.",

      about:
        "Web development involves creating and maintaining websites and web applications using programming and web technologies.",

      education: [
        "Complete 12th education",
        "Learn HTML, CSS and JavaScript",
        "Learn frontend or backend development",
        "Degree, diploma or certification can support the pathway",
      ],

      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Problem solving",
        "Git",
      ],

      careers: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Web Designer",
        "Web Developer",
      ],

      roadmap: [
        "Complete 12th education",
        "Learn web development fundamentals",
        "Build small websites",
        "Learn a modern framework",
        "Create projects",
        "Build a portfolio",
        "Apply for internships and jobs",
      ],
    },

    "UI UX Design": {
      icon: "🖥️",
      category: "Skill-Based Careers",
      title: "UI UX Design",

      shortDescription:
        "A design-focused career involving user interfaces, user experience, digital products and visual design.",

      about:
        "UI/UX design focuses on creating useful, accessible and visually clear digital experiences for users.",

      education: [
        "Complete 12th education",
        "Learn UI/UX principles",
        "Learn design tools",
        "Build a portfolio of design projects",
      ],

      skills: [
        "Figma",
        "Canva",
        "Wireframing",
        "User research",
        "Visual design",
        "Problem solving",
      ],

      careers: [
        "UI Designer",
        "UX Designer",
        "Product Designer",
        "Visual Designer",
        "UX Research Assistant",
      ],

      roadmap: [
        "Complete 12th education",
        "Learn design fundamentals",
        "Learn Figma or similar tools",
        "Create UI projects",
        "Build case studies",
        "Create a design portfolio",
        "Apply for internships and jobs",
      ],
    },

    "Data Analytics": {
      icon: "📊",
      category: "Skill-Based Careers",
      title: "Data Analytics",

      shortDescription:
        "A technology and business field involving data collection, analysis, visualisation and decision support.",

      about:
        "Data analytics involves examining data to identify patterns, understand information and support business or organisational decisions.",

      education: [
        "Complete 12th education",
        "Learn Excel and data fundamentals",
        "Learn SQL",
        "Learn data visualisation tools",
        "Build practical projects",
      ],

      skills: [
        "Excel",
        "SQL",
        "Data analysis",
        "Charts",
        "Statistics",
        "Problem solving",
      ],

      careers: [
        "Data Analyst",
        "Business Analyst",
        "Reporting Analyst",
        "Data Support Executive",
        "Junior Data Professional",
      ],

      roadmap: [
        "Complete 12th education",
        "Learn Excel",
        "Learn SQL",
        "Learn data visualisation",
        "Complete data projects",
        "Build a portfolio",
        "Apply for internships and entry-level roles",
      ],
    },

    // ===================================================
    // AFTER GRADUATION — HIGHER STUDIES
    // ===================================================

    "MCA": {
      icon: "💻",
      category: "Higher Studies",
      title: "MCA",

      shortDescription:
        "A postgraduate computer application pathway for students interested in software, technology and computing careers.",

      about:
        "MCA is a postgraduate program focused on computer applications, software development, databases and related technologies.",

      education: [
        "Complete a suitable bachelor's degree",
        "Meet the eligibility requirements of the chosen MCA program",
        "Complete postgraduate study",
        "Build technical projects",
      ],

      skills: [
        "Programming",
        "Database management",
        "Problem solving",
        "Web development",
        "Software development",
        "Communication",
      ],

      careers: [
        "Software Developer",
        "Web Developer",
        "Application Developer",
        "System Analyst",
        "Data Analyst",
        "IT Professional",
      ],

      roadmap: [
        "Complete graduation",
        "Check MCA eligibility",
        "Apply for suitable MCA programs",
        "Build technical skills",
        "Complete projects",
        "Take internships",
        "Apply for technology jobs",
      ],
    },

    "MBA": {
      icon: "📈",
      category: "Higher Studies",
      title: "MBA",

      shortDescription:
        "A postgraduate management pathway covering business, finance, marketing, operations and leadership.",

      about:
        "MBA programs develop knowledge and skills in business management, leadership, strategy and organisational functions.",

      education: [
        "Complete graduation",
        "Meet the eligibility requirements of the selected MBA program",
        "Complete management education",
        "Develop practical business skills",
      ],

      skills: [
        "Leadership",
        "Communication",
        "Business analysis",
        "Planning",
        "Decision making",
        "Teamwork",
      ],

      careers: [
        "Management Professional",
        "Business Analyst",
        "Marketing Manager",
        "HR Professional",
        "Operations Professional",
        "Business Development Professional",
      ],

      roadmap: [
        "Complete graduation",
        "Choose an MBA specialisation",
        "Check admission requirements",
        "Complete management education",
        "Build leadership experience",
        "Complete internships or projects",
        "Apply for management opportunities",
      ],
    },

    "Master's Degree": {
      icon: "🎓",
      category: "Higher Studies",
      title: "Master's Degree",

      shortDescription:
        "Advanced academic study that allows graduates to specialise in their chosen subject or career area.",

      about:
        "A master's degree provides advanced knowledge and specialisation after undergraduate education.",

      education: [
        "Complete a relevant bachelor's degree",
        "Meet the selected university or program requirements",
        "Complete postgraduate study",
        "Complete projects or research where required",
      ],

      skills: [
        "Research",
        "Subject knowledge",
        "Analysis",
        "Writing",
        "Communication",
        "Critical thinking",
      ],

      careers: [
        "Subject Specialist",
        "Research Professional",
        "Academic Professional",
        "Industry Professional",
        "Specialised Consultant",
      ],

      roadmap: [
        "Complete graduation",
        "Choose a specialisation",
        "Research suitable master's programs",
        "Meet admission requirements",
        "Complete postgraduate education",
        "Build specialised experience",
        "Explore professional opportunities",
      ],
    },

    // ===================================================
    // AFTER GRADUATION — PRIVATE JOBS
    // ===================================================

    "IT Jobs": {
      icon: "💻",
      category: "Private Jobs",
      title: "IT Jobs",

      shortDescription:
        "Private-sector technology opportunities involving software, support, web development, data and digital systems.",

      about:
        "IT jobs cover a wide range of technology roles across software, support, infrastructure, data and digital products.",

      education: [
        "Complete a relevant graduation or technology course",
        "Build technical skills",
        "Create projects and portfolio",
        "Develop job-ready skills",
      ],

      skills: [
        "Programming",
        "Problem solving",
        "Communication",
        "Technical knowledge",
        "Teamwork",
        "Project skills",
      ],

      careers: [
        "Software Developer",
        "Web Developer",
        "IT Support Executive",
        "Data Analyst",
        "QA Tester",
        "System Support Professional",
      ],

      roadmap: [
        "Complete graduation",
        "Choose a technology area",
        "Build technical skills",
        "Create projects",
        "Prepare a professional resume",
        "Apply for internships and jobs",
        "Continue learning new technologies",
      ],
    },

    "Finance Jobs": {
      icon: "💰",
      category: "Private Jobs",
      title: "Finance Jobs",

      shortDescription:
        "Private-sector opportunities involving accounting, finance, banking, reporting and financial operations.",

      about:
        "Finance careers involve financial records, reporting, analysis, accounting and business financial operations.",

      education: [
        "Complete a relevant graduation",
        "Build accounting and finance skills",
        "Learn Excel and relevant tools",
        "Complete certifications where useful",
      ],

      skills: [
        "Accounting",
        "Excel",
        "Financial analysis",
        "Numerical ability",
        "Attention to detail",
        "Communication",
      ],

      careers: [
        "Accounts Executive",
        "Finance Executive",
        "Financial Analyst",
        "Audit Assistant",
        "Banking Professional",
      ],

      roadmap: [
        "Complete graduation",
        "Choose a finance career area",
        "Build accounting and Excel skills",
        "Complete relevant projects or certifications",
        "Prepare your resume",
        "Apply for internships and jobs",
        "Develop professional experience",
      ],
    },

    "Marketing Jobs": {
      icon: "📱",
      category: "Private Jobs",
      title: "Marketing Jobs",

      shortDescription:
        "Private-sector opportunities involving digital marketing, sales, branding, social media and customer engagement.",

      about:
        "Marketing careers involve understanding customers, promoting products and communicating with audiences across different channels.",

      education: [
        "Complete graduation",
        "Learn marketing fundamentals",
        "Develop digital marketing skills",
        "Build practical campaign projects",
      ],

      skills: [
        "Communication",
        "Marketing",
        "Social media",
        "Content creation",
        "Analytics",
        "Creativity",
      ],

      careers: [
        "Marketing Executive",
        "Digital Marketing Executive",
        "Social Media Executive",
        "Sales Executive",
        "Content Marketing Executive",
      ],

      roadmap: [
        "Complete graduation",
        "Choose a marketing area",
        "Learn digital marketing tools",
        "Create sample campaigns",
        "Build a portfolio",
        "Apply for internships",
        "Apply for marketing jobs",
      ],
    },

    // ===================================================
    // AFTER GRADUATION — GOVERNMENT JOBS
    // ===================================================

    "Civil Services": {
      icon: "🏛️",
      category: "Government Jobs",
      title: "Civil Services",

      shortDescription:
        "A government career direction involving administrative and public-service roles through applicable competitive examinations.",

      about:
        "Civil service pathways involve competitive examinations and selection processes for administrative and public-service positions.",

      education: [
        "Complete graduation",
        "Check the eligibility requirements of the relevant examination",
        "Prepare according to the official syllabus",
        "Complete all applicable selection stages",
      ],

      skills: [
        "General knowledge",
        "Current affairs",
        "Reasoning",
        "Writing",
        "Communication",
        "Time management",
      ],

      careers: [
        "Administrative Service Roles",
        "Government Officer Roles",
        "Public Administration Roles",
        "Policy and Governance Roles",
      ],

      roadmap: [
        "Complete graduation",
        "Identify suitable examinations",
        "Check official eligibility requirements",
        "Prepare according to the syllabus",
        "Appear for the examination",
        "Complete applicable selection stages",
        "Join after successful selection",
      ],
    },

    "Banking Exams": {
      icon: "🏦",
      category: "Government & Banking",
      title: "Banking Exams",

      shortDescription:
        "A career direction involving banking recruitment examinations and financial-sector roles.",

      about:
        "Banking recruitment can involve examinations and selection processes for different roles depending on the organisation and notification.",

      education: [
        "Complete graduation for many banking recruitment routes",
        "Check the eligibility of each examination",
        "Prepare aptitude and reasoning",
        "Follow the official recruitment notification",
      ],

      skills: [
        "Reasoning",
        "Numerical ability",
        "English",
        "General awareness",
        "Computer skills",
        "Time management",
      ],

      careers: [
        "Banking Officer",
        "Bank Clerk",
        "Customer Service Role",
        "Banking Operations Role",
      ],

      roadmap: [
        "Complete graduation",
        "Identify suitable banking examinations",
        "Check official eligibility",
        "Prepare aptitude and reasoning",
        "Take the applicable examination",
        "Complete selection stages",
        "Join after successful selection",
      ],
    },

    "Government Technical Jobs": {
      icon: "🖥️",
      category: "Government Jobs",
      title: "Government Technical Jobs",

      shortDescription:
        "Technology and technical opportunities in government organisations for graduates with relevant qualifications.",

      about:
        "Government organisations recruit for different technical and technology-related roles depending on qualifications and vacancies.",

      education: [
        "Complete a relevant technical graduation",
        "Build technical skills",
        "Check the qualification requirements of each recruitment",
        "Prepare according to the relevant selection process",
      ],

      skills: [
        "Technical knowledge",
        "Programming",
        "Problem solving",
        "Computer skills",
        "Communication",
        "Logical thinking",
      ],

      careers: [
        "Technical Assistant",
        "IT Support Professional",
        "Software-related Government Role",
        "Computer Operator",
        "Technical Officer Role",
      ],

      roadmap: [
        "Complete graduation",
        "Choose a technical specialisation",
        "Build technical skills",
        "Track relevant recruitment notifications",
        "Prepare for applicable examinations",
        "Complete the selection process",
        "Join after successful selection",
      ],
    },

    // ===================================================
    // AFTER GRADUATION — PROFESSIONAL CERTIFICATIONS
    // ===================================================

    "Cybersecurity Certification": {
      icon: "🔐",
      category: "Professional Certifications",
      title: "Cybersecurity Certification",

      shortDescription:
        "A technology specialisation focused on protecting systems, networks, applications and data.",

      about:
        "Cybersecurity focuses on identifying security risks and protecting digital systems, networks and information.",

      education: [
        "Complete a suitable graduation or technology course",
        "Learn networking and security fundamentals",
        "Complete relevant cybersecurity certifications",
        "Build practical security projects where appropriate",
      ],

      skills: [
        "Networking",
        "Linux",
        "Security fundamentals",
        "Problem solving",
        "Analytical thinking",
        "Communication",
      ],

      careers: [
        "Cybersecurity Analyst",
        "Security Support Professional",
        "SOC Analyst",
        "Information Security Professional",
        "Security Testing Professional",
      ],

      roadmap: [
        "Complete graduation",
        "Learn networking fundamentals",
        "Learn cybersecurity basics",
        "Complete suitable certifications",
        "Build practical projects",
        "Apply for internships",
        "Apply for cybersecurity roles",
      ],
    },

    "Data Analytics Certification": {
      icon: "📊",
      category: "Professional Certifications",
      title: "Data Analytics Certification",

      shortDescription:
        "A skill-development pathway for graduates interested in data analysis, reporting and business insights.",

      about:
        "Data analytics certifications can help graduates develop practical skills in data preparation, analysis and visualisation.",

      education: [
        "Complete graduation",
        "Learn Excel",
        "Learn SQL",
        "Learn data visualisation tools",
        "Complete relevant certification",
      ],

      skills: [
        "Excel",
        "SQL",
        "Statistics",
        "Data visualisation",
        "Analysis",
        "Problem solving",
      ],

      careers: [
        "Data Analyst",
        "Reporting Analyst",
        "Business Analyst",
        "Data Support Professional",
        "Analytics Associate",
      ],

      roadmap: [
        "Complete graduation",
        "Learn Excel and SQL",
        "Learn data visualisation",
        "Complete a suitable certification",
        "Create data projects",
        "Build a portfolio",
        "Apply for analytics opportunities",
      ],
    },

    "Digital Marketing Certification": {
      icon: "📱",
      category: "Professional Certifications",
      title: "Digital Marketing Certification",

      shortDescription:
        "A professional skill pathway covering SEO, social media, content, advertising and digital campaigns.",

      about:
        "Digital marketing certifications can help graduates develop practical knowledge of online marketing channels and tools.",

      education: [
        "Complete graduation",
        "Learn digital marketing fundamentals",
        "Complete suitable certifications",
        "Create practical marketing projects",
      ],

      skills: [
        "SEO",
        "Social media",
        "Content creation",
        "Analytics",
        "Advertising",
        "Communication",
      ],

      careers: [
        "Digital Marketing Executive",
        "SEO Executive",
        "Social Media Executive",
        "Content Marketing Executive",
        "Digital Advertising Executive",
      ],

      roadmap: [
        "Complete graduation",
        "Learn digital marketing",
        "Complete suitable certifications",
        "Create sample campaigns",
        "Build a portfolio",
        "Complete internships",
        "Apply for marketing roles",
      ],
    },

    // ===================================================
    // AFTER GRADUATION — ENTREPRENEURSHIP
    // ===================================================

    "Startup & Business": {
      icon: "🚀",
      category: "Entrepreneurship",
      title: "Startup & Business",

      shortDescription:
        "A pathway for graduates interested in starting and developing their own business or startup.",

      about:
        "Entrepreneurship involves identifying opportunities, developing products or services and building a sustainable business.",

      education: [
        "Complete graduation or relevant education",
        "Learn business fundamentals",
        "Understand customers and markets",
        "Develop financial and operational knowledge",
      ],

      skills: [
        "Leadership",
        "Communication",
        "Planning",
        "Marketing",
        "Financial management",
        "Problem solving",
      ],

      careers: [
        "Entrepreneur",
        "Startup Founder",
        "Business Owner",
        "Small Business Professional",
        "Business Consultant",
      ],

      roadmap: [
        "Complete graduation",
        "Identify a problem or opportunity",
        "Research the target market",
        "Create a business plan",
        "Develop the product or service",
        "Test and improve the idea",
        "Build and grow the business",
      ],
    },

    Freelancing: {
      icon: "💼",
      category: "Entrepreneurship",
      title: "Freelancing",

      shortDescription:
        "A flexible career pathway where professionals offer skills and services directly to clients.",

      about:
        "Freelancing allows people to provide professional services independently across areas such as design, writing, technology and marketing.",

      education: [
        "Complete relevant education",
        "Develop a marketable skill",
        "Build a portfolio",
        "Learn client communication and project management",
      ],

      skills: [
        "Communication",
        "Portfolio building",
        "Time management",
        "Client management",
        "Technical or creative skills",
        "Self discipline",
      ],

      careers: [
        "Freelance Designer",
        "Freelance Developer",
        "Content Writer",
        "Digital Marketing Freelancer",
        "Video Editor",
        "Virtual Assistant",
      ],

      roadmap: [
        "Complete graduation or skill training",
        "Choose a service to offer",
        "Develop strong skills",
        "Create a portfolio",
        "Create professional profiles",
        "Start with suitable projects",
        "Build long-term client relationships",
      ],
    },

    "Small Business": {
      icon: "🏪",
      category: "Entrepreneurship",
      title: "Small Business",

      shortDescription:
        "A business pathway focused on starting and managing a small local or online business.",

      about:
        "Small businesses can operate in areas such as retail, services, food, design, technology and online commerce.",

      education: [
        "Complete graduation or relevant education",
        "Learn basic business management",
        "Understand budgeting and pricing",
        "Learn customer service and marketing",
      ],

      skills: [
        "Business planning",
        "Communication",
        "Marketing",
        "Financial management",
        "Customer service",
        "Problem solving",
      ],

      careers: [
        "Business Owner",
        "Online Seller",
        "Service Business Owner",
        "Retail Business Owner",
        "Small Business Manager",
      ],

      roadmap: [
        "Identify a business idea",
        "Research customers and competitors",
        "Plan costs and pricing",
        "Create the product or service",
        "Start on a manageable scale",
        "Build customers and reputation",
        "Expand the business gradually",
      ],
    },
  };

  // =====================================================
  // PATH → CAREERS
  // =====================================================

  const pathCareers = {
    // AFTER 10TH

    Science: [
      "Computer Science",
      "Engineering",
      "Medicine",
      "Pharmacy",
      "Research",
      "Architecture",
    ],

    Commerce: [
      "Accounting & Finance",
      "Business & Management",
      "Banking",
      "Digital Marketing",
    ],

    Arts: [
      "Graphic Design",
      "Psychology",
      "Journalism & Media",
      "Social Sciences",
      "Animation & Design",
    ],

    Diploma: [
      "Diploma Engineering",
      "IT & Computer Diploma",
      "Automobile",
      "Electrical",
    ],

    Vocational: [
      "Healthcare Support",
      "Hospitality",
      "Retail & Sales",
      "Beauty & Wellness",
      "Skilled Trades",
    ],

    // AFTER 12TH

    "Degree Courses": [
      "B.Sc. Computer Science",
      "B.Com & Finance",
      "BBA & Management",
      "BA Psychology",
    ],

    "Professional Courses": [
      "CA / Accounting",
      "Law",
      "Hotel Management",
    ],

    "Diploma Courses": [
      "Digital Design Diploma",
      "IT Diploma",
    ],

    "Competitive Exams": [
      "Government Services",
      "Defence Careers",
    ],

    "Skill-Based Careers": [
      "Web Development",
      "UI UX Design",
      "Data Analytics",
    ],

    // AFTER GRADUATION

    "Higher Studies": [
      "MCA",
      "MBA",
      "Master's Degree",
    ],

    "Private Jobs": [
      "IT Jobs",
      "Finance Jobs",
      "Marketing Jobs",
    ],

    "Government Jobs": [
      "Civil Services",
      "Banking Exams",
      "Government Technical Jobs",
    ],

    "Professional Certifications": [
      "Cybersecurity Certification",
      "Data Analytics Certification",
      "Digital Marketing Certification",
    ],

    Entrepreneurship: [
      "Startup & Business",
      "Freelancing",
      "Small Business",
    ],
  };

  // =====================================================
  // HANDLERS
  // =====================================================

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setSelectedPath(null);
    setSelectedCareer(null);
  };

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setSelectedCareer(null);
  };

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
  };

  const handleSaveCareer = async () => {
  if (!selectedCareer) return;

  try {
    const student = JSON.parse(localStorage.getItem("student"));

    if (!student?.id) {
      alert("Please login first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/saved-career",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student.id,
          career_name: selectedCareer,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to save career.");
      return;
    }

    setSavedCareer(selectedCareer);

    alert("Career saved successfully!");
  } catch (error) {
    console.error("Save career error:", error);
    alert("Unable to connect to the backend.");
  }
};

  const currentCareer = selectedCareer
    ? careerData[selectedCareer]
    : null;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="career-explorer-page">

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

      <section className="career-explorer-hero">

        <div className="career-explorer-hero-content">

          <span className="career-explorer-tag">
            CAREER EXPLORER
          </span>

          <h1>
            Discover the right
            <br />
            <span>career path for you.</span>
          </h1>

          <p>
            Explore education pathways, career options,
            required skills and possible next steps.
          </p>

        </div>

        <div className="career-explorer-hero-icon">
          🧭
        </div>

      </section>

      {/* STEP 1 */}

      <section className="career-explorer-section">

        <div className="career-explorer-section-heading">

          <span>
            STEP 01
          </span>

          <h2>
            Where are you in your education journey?
          </h2>

          <p>
            Choose your current education level to explore
            suitable career pathways.
          </p>

        </div>

        <div className="education-level-grid">

          {/* AFTER 10TH */}

          <div
            className={`education-card ${
              selectedLevel === "after10"
                ? "selected-education"
                : ""
            }`}
          >

            <div className="education-card-number">
              01
            </div>

            <div className="education-card-icon">
              🎓
            </div>

            <h3>
              After 10th
            </h3>

            <p>
              Explore Science, Commerce, Arts, Diploma
              and Vocational pathways.
            </p>

            <button
              onClick={() =>
                handleLevelSelect("after10")
              }
            >
              Explore Paths →
            </button>

          </div>

          {/* AFTER 12TH */}

          <div
            className={`education-card ${
              selectedLevel === "after12"
                ? "selected-education"
                : ""
            }`}
          >

            <div className="education-card-number">
              02
            </div>

            <div className="education-card-icon">
              📚
            </div>

            <h3>
              After 12th
            </h3>

            <p>
              Discover degree courses, professional courses,
              competitive exams and skill-based careers.
            </p>

            <button
              onClick={() =>
                handleLevelSelect("after12")
              }
            >
              Explore Paths →
            </button>

          </div>

          {/* AFTER GRADUATION */}

          <div
            className={`education-card ${
              selectedLevel === "graduation"
                ? "selected-education"
                : ""
            }`}
          >

            <div className="education-card-number">
              03
            </div>

            <div className="education-card-icon">
              🚀
            </div>

            <h3>
              After Graduation
            </h3>

            <p>
              Explore higher studies, jobs, certifications,
              government careers and entrepreneurship.
            </p>

            <button
              onClick={() =>
                handleLevelSelect("graduation")
              }
            >
              Explore Paths →
            </button>

          </div>

        </div>

        {/* STEP 2 */}

        {selectedLevel && (

          <div className="selected-path-section">

            <div className="selected-path-heading">

              <span>
                STEP 02
              </span>

              <h2>
                {educationPaths[selectedLevel].title}
              </h2>

              <p>
                {educationPaths[selectedLevel].description}
              </p>

            </div>

            <div className="selected-path-grid">

              {educationPaths[selectedLevel].options.map(
                (option, index) => (

                  <div
                    className={`selected-path-card ${
                      selectedPath === option.title
                        ? "selected-career-path"
                        : ""
                    }`}
                    key={index}
                  >

                    <div className="selected-path-icon">
                      {option.icon}
                    </div>

                    <div className="selected-path-content">

                      <h3>
                        {option.title}
                      </h3>

                      <p>
                        {option.description}
                      </p>

                      <button
                        onClick={() =>
                          handlePathSelect(
                            option.title
                          )
                        }
                      >
                        View Careers →
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* STEP 3 */}

        {selectedPath &&
          pathCareers[selectedPath] && (

            <div className="career-selection-section">

              <div className="career-selection-heading">

                <span>
                  STEP 03
                </span>

                <h2>
                  Explore {selectedPath} careers
                </h2>

                <p>
                  Choose a career area to understand
                  the education, skills, opportunities
                  and possible roadmap.
                </p>

              </div>

              <div className="career-selection-grid">

                {pathCareers[selectedPath].map(
                  (careerName) => {

                    const career =
                      careerData[careerName];

                    return (

                      <div
                        className={`career-selection-card ${
                          selectedCareer === career.title
                            ? "active-career-card"
                            : ""
                        }`}
                        key={career.title}
                      >

                        <div className="career-selection-icon">
                          {career.icon}
                        </div>

                        <span className="career-category">
                          {career.category}
                        </span>

                        <h3>
                          {career.title}
                        </h3>

                        <p>
                          {career.shortDescription}
                        </p>

                        <button
                          onClick={() =>
                            handleCareerSelect(
                              career.title
                            )
                          }
                        >
                          View Career Details →
                        </button>

                      </div>

                    );
                  }
                )}

              </div>

            </div>

          )}

        {/* STEP 4 */}

        {currentCareer && (

          <div className="career-details-section">

            <div className="career-details-header">

              <div className="career-details-icon">
                {currentCareer.icon}
              </div>

              <div>

                <span>
                  STEP 04 · {currentCareer.category}
                </span>

                <h2>
                  {currentCareer.title}
                </h2>

                <p>
                  {currentCareer.shortDescription}
                </p>

              </div>

            </div>

            <div className="career-details-grid">

              {/* ABOUT */}

              <div className="career-detail-card career-about-card">

                <span>
                  ABOUT THIS CAREER
                </span>

                <h3>
                  What is {currentCareer.title}?
                </h3>

                <p>
                  {currentCareer.about}
                </p>

              </div>

              {/* EDUCATION */}

              <div className="career-detail-card">

                <span>
                  EDUCATION
                </span>

                <h3>
                  What do you need to study?
                </h3>

                <ul>

                  {currentCareer.education.map(
                    (item, index) => (

                      <li key={index}>

                        <b>
                          ✓
                        </b>

                        {item}

                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* SKILLS */}

              <div className="career-detail-card">

                <span>
                  SKILLS
                </span>

                <h3>
                  Important skills
                </h3>

                <div className="skill-tags">

                  {currentCareer.skills.map(
                    (skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

              {/* OPPORTUNITIES */}

              <div className="career-detail-card">

                <span>
                  OPPORTUNITIES
                </span>

                <h3>
                  Career opportunities
                </h3>

                <div className="opportunity-list">

                  {currentCareer.careers.map(
                    (career, index) => (

                      <div key={index}>

                        <span>
                          →
                        </span>

                        {career}

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* ROADMAP */}

            <div className="career-roadmap-card">

              <div className="roadmap-heading">

                <span>
                  CAREER ROADMAP
                </span>

                <h3>
                  Your possible journey
                </h3>

                <p>
                  Follow these general steps to understand
                  how students can move towards this career.
                </p>

              </div>

              <div className="roadmap-list">

                {currentCareer.roadmap.map(
                  (step, index) => (

                    <div
                      className="roadmap-item"
                      key={index}
                    >

                      <div className="roadmap-number">
                        {index + 1}
                      </div>

                      <div>

                        <strong>
                          Step {index + 1}
                        </strong>

                        <p>
                          {step}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* NEXT STEP */}

            <div className="career-next-step">

              <div>

                <span>
                  NEXT STEP
                </span>

                <h3>
                  Ready to explore more?
                </h3>

                <p>
                  Save this career, explore related
                  scholarships, or check opportunities
                  connected with your goals.
                </p>

              </div>

              <div className="career-next-actions">

                <button onClick={handleSaveCareer}>
  {savedCareer === selectedCareer
    ? "✓ Career Saved"
    : "🔖 Save Career"}
</button>

                <button onClick={() => window.location.href = "/scholarships"}>
  💰 Find Scholarships
</button>

              </div>

            </div>

          </div>

        )}

      </section>

      {/* GENERAL PATH PREVIEW */}

      {!selectedLevel && (

        <section className="career-path-section">

          <div className="career-path-heading">

            <span>
              EXPLORE POSSIBILITIES
            </span>

            <h2>
              There is more than one path to success.
            </h2>

            <p>
              Your education is only the starting point.
              Explore different routes and understand
              what each path can lead to.
            </p>

          </div>

          <div className="career-path-grid">

            <div className="career-path-card">
              <span>🔬</span>
              <h3>Science</h3>
              <p>
                Technology, medicine, engineering,
                research and more.
              </p>
            </div>

            <div className="career-path-card">
              <span>📊</span>
              <h3>Commerce</h3>
              <p>
                Finance, accounting, business,
                banking and management.
              </p>
            </div>

            <div className="career-path-card">
              <span>🎨</span>
              <h3>Arts</h3>
              <p>
                Design, media, psychology,
                communication and creative careers.
              </p>
            </div>

            <div className="career-path-card">
              <span>💻</span>
              <h3>Technology</h3>
              <p>
                Software development, AI,
                cybersecurity, data and web careers.
              </p>
            </div>

            <div className="career-path-card">
              <span>🏛️</span>
              <h3>Government</h3>
              <p>
                Explore government jobs and
                competitive examination pathways.
              </p>
            </div>

            <div className="career-path-card">
              <span>💼</span>
              <h3>Business</h3>
              <p>
                Entrepreneurship, startups,
                freelancing and business careers.
              </p>
            </div>

          </div>

        </section>

      )}

      {/* HELP */}

      <section className="career-help-section">

        <div className="career-help-icon">
          💭
        </div>

        <div className="career-help-content">

          <span>
            NOT SURE WHAT TO CHOOSE?
          </span>

          <h2>
            I'm confused about my career
          </h2>

          <p>
            Answer a few simple questions and get guidance
            about career areas, skills and possible next steps.
          </p>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="career-explorer-footer">

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

    </div>
  );
}

export default CareerExplorer;