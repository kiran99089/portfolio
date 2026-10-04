export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Web" | "AI-ML" | "Quantum";
  description: string;
   status?: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

// export interface Achievement {
//   id: string;
//   title: string;
//   organization: string;
//   date: string;
//   description: string;
// }

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    subRoles: string[];
    tagline: string;
    bio: string[];
    email: string;
    github: string;
    linkedin: string;
    resume: string;
    location: string;
    stats: {
      projects: number;
      certifications: number;
      learningYears: number;
      Technologies: string;
    };
  };
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  // achievements: Achievement[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "KIRAN EEGALA",
    role: "Full-Stack & AI/ML Developer",
    subRoles: [
      "Full-Stack Developer",
      "AI-ML Enthusiast",
      "Data scientist",
      "Software Engineer",
      "Problem Solver",
    ],
    tagline: "Turning Ideas into Intelligent, Scalable Experiences.",
   bio: [
  "I'm a final-year B.Tech Computer Science student passionate about building high-performance web applications and intelligent AI-driven solutions.",
  "With a strong foundation in computer science, I build seamless end-to-end experiences, from interactive user interfaces to scalable backends and machine learning models.",
  "I enjoy turning complex problems into clean, efficient solutions while exploring new technologies in software development, AI, and cloud computing.",
],
    email: "eegalakiran@gmail.com",
    github: "https://github.com/kiran99089",
    linkedin: "https://www.linkedin.com/in/eegalakiran/?isSelfProfile=true",
    resume: "/EEGALA_KIRAN.pdf",
    location: "India",
    stats: {
      projects: 4,
      certifications: 3,
      learningYears: 5,
      Technologies: "20+",
    },
  },
  skills: [
    {
      category: "Languages",
      skills: [
        { name: "Python", level: 90, icon: "python" },
        { name: "TypeScript", level: 88, icon: "typescript" },
        { name: "JavaScript (ES6+)", level: 92, icon: "javascript" },
        { name: "C++", level: 85, icon: "cpp" },
        { name: "SQL", level: 85, icon: "sql" },
        { name: "HTML5/CSS3", level: 95, icon: "html" },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React.js / Next.js", level: 92, icon: "react" },
        { name: "Tailwind CSS", level: 95, icon: "tailwind" },
        { name: "Three.js / R3F", level: 80, icon: "three" },
        { name: "Framer Motion", level: 88, icon: "framer" },
        { name: "Redux Toolkit / Zustand", level: 85, icon: "state" },
      ],
    },
    {
      category: "Backend & Cloud",
      skills: [
        { name: "Node.js / Express", level: 88, icon: "node" },
        { name: "FastAPI / Flask", level: 85, icon: "python" },
        { name: "REST & GraphQL APIs", level: 90, icon: "api" },
        { name: "PostgreSQL / MongoDB", level: 85, icon: "database" },
        { name: "Redis", level: 80, icon: "redis" },
        { name: "Docker / Vercel", level: 82, icon: "docker" },
      ],
    },
    {
      category: "AI / Machine Learning",
      skills: [
        { name: "PyTorch & TensorFlow", level: 82, icon: "brain" },
        { name: "Scikit-Learn", level: 88, icon: "chart" },
        { name: "OpenCV / Computer Vision", level: 80, icon: "eye" },
        { name: "LLM / LangChain / RAG", level: 84, icon: "sparkles" },
        { name: "Pandas & NumPy", level: 90, icon: "table" },
      ],
    },
  ],
projects: [
  {
    id: "food-donation-ai",
    title: "AI-Powered Food Donation Platform",
    tagline:
      "A smart platform connecting surplus food with people and organizations in need.",
    category: "AI-ML",
    description:
      "An AI-powered food donation platform designed to reduce food waste by connecting food donors with individuals and organizations that can utilize surplus food.",
    problem:
      "Large amounts of edible food are wasted while many individuals and organizations struggle to access sufficient food resources.",
    solution:
      "Built a web-based platform that streamlines food donation and helps manage surplus food information through an AI-assisted approach.",
    features: [
      "Food donation and surplus food management",
      "Donor and recipient interaction",
      "AI-assisted food management",
      "Responsive web interface",
    ],
  techStack: [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Drizzle ORM",
  "Replit",
],
    image: "/projects/food-donation.png",
    githubUrl: "https://github.com/kiran99089",
    liveUrl: "https://github.com/kiran99089",
    featured: true,
  },

  {
    id: "blood-bank-management",
    title: "Blood Bank Management System",
    tagline:
      "A web-based system for managing blood donors, blood availability, and requests.",
    category: "Web",
    description:
      "A web-based Blood Bank Management System developed as a diploma final-year project to simplify the management of blood donors, blood groups, availability, and blood requests.",
    problem:
      "Manual blood bank processes can make it difficult to efficiently maintain donor information and track available blood units.",
    solution:
      "Developed a centralized web application to manage donor records, blood group information, availability, and blood requests through a structured interface.",
    features: [
      "Blood donor registration and management",
      "Blood group information management",
      "Blood availability tracking",
      "Blood request management",
      "Responsive user interface",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "XAMPP",
    ],
    image: "/projects/blood-bank.png",
    githubUrl: "https://github.com/kiran99089",
    liveUrl: "https://github.com/kiran99089",
    featured: true,
  },

  {
    id: "advanced-weather-app",
    title: "Advanced Weather Application",
    tagline:
      "A responsive weather application providing real-time weather information.",
    category: "Web",
    description:
      "A responsive weather application developed during B.Tech to provide users with weather information through a clean and interactive interface.",
    problem:
      "Users need a simple and accessible way to view current weather conditions and related information for different locations.",
    solution:
      "Developed an interactive weather application that retrieves weather information and presents it through a user-friendly responsive interface.",
    features: [
      "Location-based weather information",
      "Real-time weather data",
      "Responsive design",
      "Interactive weather interface",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Weather API",
    ],
    image: "/projects/weather-app.png",
    githubUrl: "https://github.com/kiran99089",
    liveUrl: "https://github.com/kiran99089",
    featured: false,
  },

  {
    id: "ats-resume-analyzer",
    title: "AI-Powered ATS Resume Analyzer",
    tagline:
      "An AI-based system for analyzing resumes and matching them with job descriptions.",
    category: "AI-ML",
    description:
      "An AI-powered Applicant Tracking System that analyzes PDF resumes, compares them with job descriptions, and generates a resume-to-job compatibility score.",
    problem:
      "Job seekers often struggle to understand how well their resumes match specific job descriptions and which skills need improvement.",
    solution:
      "Built a Streamlit-based application that extracts resume content from PDF files and uses Google's Generative AI to analyze the resume against a provided job description.",
    features: [
      "PDF resume upload and text extraction",
      "Job description comparison",
      "AI-powered resume analysis",
      "Resume-to-job match percentage",
      "Skill and keyword analysis",
    ],
    techStack: [
      "Python",
      "Streamlit",
      "Google Gemini",
      "PyPDF2",
      "Pillow",
      "PDF2Image",
    ],
    image: "/projects/ats-analyzer.png",
    githubUrl: "https://github.com/kiran99089",
    liveUrl: "https://github.com/kiran99089",
    featured: true,
  },

  {
    id: "quantumshield",
    title: "QuantumShield",
    tagline:
      "An ongoing quantum computing research project exploring next-generation cybersecurity.",
    category: "Quantum",
    status: "In Development",
    description:
      "An ongoing final-year project currently under development, exploring the application of quantum computing concepts to cybersecurity and secure information processing.",
    problem:
      "The rapid development of computing technologies creates new challenges for conventional cryptographic approaches and future cybersecurity systems.",
    solution:
      "Currently researching quantum computing concepts, quantum algorithms, and their potential applications in developing secure and future-ready cybersecurity approaches.",
    features: [
      "Quantum computing research",
      "Quantum cybersecurity concepts",
      "Quantum algorithm exploration",
      "Secure information processing research",
      "Ongoing final-year project development",
    ],
    techStack: [
      "Quantum Computing",
      "Python",
      "Qiskit",
      "Cryptography",
    ],
    image: "/projects/quantumshield.png",
    githubUrl: "https://github.com/kiran99089",
    liveUrl: "https://github.com/kiran99089",
    featured: true,
  },
],
  experiences: [
  {
    id: "exp-1",
    role: "Full-Stack Developer Intern",
    company: "Vinukoti Business Solutions",
    period: "2023 - 2024",
    location: "Onsite",
    description: [
      "Contributed to the development of the RecruitUs web platform using HTML, CSS, JavaScript, and PHP.",
      "Worked on frontend interfaces and backend functionality for web-based applications.",
      "Implemented backend functionality and database operations using PHP and MySQL.",
      "Used XAMPP for local development, testing, and managing the Apache and MySQL environment.",
      "Collaborated with the development team to implement features, fix issues, and improve application functionality.",
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "XAMPP",
    ],
  },

  {
    id: "exp-2",
    role: "AI & Data Science Intern",
    company: "Pantech Prolabs India Pvt Ltd",
    period: "Jul 2025 - Oct 2025",
    location: "Remote",
    description: [
      "Successfully completed a 3-month internship focused on Artificial Intelligence, Data Science, Machine Learning, and Deep Learning.",
      "Worked on data preprocessing, exploratory data analysis, feature engineering, and machine learning workflows.",
      "Gained hands-on experience in developing and evaluating machine learning and deep learning models using Python.",
      "Applied AI, machine learning, and deep learning techniques to practical datasets and problem-solving tasks.",
    ],
    skills: [
      "Python",
      "Artificial Intelligence",
      "Data Science",
      "Machine Learning",
      "Deep Learning",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
    ],
  },

  {
    id: "exp-3",
    role: "Web Development & Cloud Integration Intern",
    company: "SkillDzire",
    period: "2025",
    location: "Remote",
    description: [
      "Gained practical experience in web development and cloud integration concepts.",
      "Worked on developing responsive web interfaces using modern web technologies.",
      "Explored cloud-based application integration and deployment workflows.",
      "Strengthened understanding of web application development and cloud technologies.",
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Web Development",
      "Cloud Computing",
      "Cloud Integration",
    ],
  },

  {
    id: "exp-4",
    role: "Java Full Stack Development Intern",
    company: "BlackBucks",
    period: "2025",
    location: "Remote",
    description: [
      "Completed a Java Full Stack Development internship focused on developing web applications using Java-based technologies.",
      "Gained practical experience in frontend and backend development concepts.",
      "Worked with Java programming and full-stack application development workflows.",
      "Strengthened understanding of application development, debugging, and software development practices.",
    ],
    skills: [
      "Java",
      "HTML5",
      "CSS3",
      "JavaScript",
      "SQL",
      "Full Stack Development",
    ],
  },
],
certifications: [
  {
    id: "cert-1",
    title: "Web Development Internship",
    issuer: "Vinukoti Business Solutions",
    date: "2024",
    credentialUrl: "/certificates/vinukoti.pdf",
  },
  {
    id: "cert-2",
    title: "AI & Data Science Internship",
    issuer: "Pantech Prolabs India Pvt Ltd",
    date: "2025",
    credentialUrl: "/certificates/pantech.pdf",
  },
  {
    id: "cert-3",
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "2025",
    credentialUrl: "/certificates/hackerrank-python.pdf",
  },
  {
    id: "cert-4",
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "2025",
    credentialUrl: "/certificates/be10x.pdf",
  },
  {
    id: "cert-5",
    title: "Java Full Stack Development Internship",
    issuer: "BlackBucks",
    date: "2025",
    credentialUrl: "/certificates/blackbucks.pdf",
  },
],
  // achievements: [
  //   {
  //     id: "ach-1",
  //     title: "National Hackathon Finalist",
  //     organization: "Smart India Hackathon",
  //     date: "2024",
  //     description: "Built an AI-driven smart traffic monitoring prototype in 36 continuous hours, placing in the top 10 teams nationwide.",
  //   },
  //   {
  //     id: "ach-2",
  //     title: "Competitive Programming Excellence",
  //     organization: "LeetCode & CodeChef",
  //     date: "2023 - Present",
  //     description: "Solved 500+ data structure and algorithm problems; achieved Knight rating candidate status.",
  //   },
  // ],
};
