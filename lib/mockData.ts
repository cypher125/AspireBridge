export interface Opportunity {
  id: number;
  title: string;
  type: 'job' | 'scholarship' | 'internship' | 'grant';
  organization: string;
  description: string;
  requirements: string[];
  criteria: string[];
  deadline: string;
  status: 'Open' | 'Closed';
  createdAt: string;
  location?: string;
  funding?: string;
  totalApplicants?: number;
  experienceRequired?: number;
}

export interface Application {
  id: number;
  userId: number;
  opportunityId: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedAt: string;
  coverLetter: string;
  updatedAt?: string;
  documents?: { name: string; url: string; }[];
  evaluationNotes?: string;
}

export let mockOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "Software Engineering Internship",
    type: "internship",
    organization: "Tech Innovators Inc.",
    description: "Join our dynamic team for a 3-month internship focused on full-stack development using cutting-edge technologies.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong knowledge of JavaScript and React",
      "Familiarity with Node.js and Express",
      "Good problem-solving skills"
    ],
    criteria: [
      "GPA of 3.0 or higher",
      "Completion of at least 2 years of undergraduate studies",
      "Demonstrated interest in software engineering through projects or coursework"
    ],
    deadline: "2023-08-15",
    status: "Open",
    createdAt: "2023-05-01T10:00:00Z",
    location: "San Francisco, CA",
    totalApplicants: 45
  },
  {
    id: 2,
    title: "Data Science Scholarship",
    type: "scholarship",
    organization: "Future Analysts Foundation",
    description: "Full-ride scholarship for outstanding students pursuing a degree in Data Science or related fields.",
    requirements: [
      "Enrolled in a Data Science, Statistics, or related program",
      "Strong academic record",
      "Demonstrated interest in data analysis and machine learning"
    ],
    criteria: [
      "GPA of 3.5 or higher",
      "Submission of a data analysis project",
      "Two letters of recommendation",
      "Essay on how you plan to contribute to the field of Data Science"
    ],
    deadline: "2023-09-30",
    status: "Open",
    createdAt: "2023-05-15T14:30:00Z",
    location: "Remote",
    funding: "Up to $50,000",
    totalApplicants: 156
  },
  {
    id: 3,
    title: "Environmental Research Grant",
    type: "grant",
    organization: "Green Earth Institute",
    description: "Research grant for innovative projects focused on climate change mitigation and adaptation strategies.",
    requirements: [
      "PhD candidate or postdoctoral researcher in Environmental Science or related field",
      "Strong research proposal in climate change mitigation or adaptation",
      "Track record of publications in peer-reviewed journals"
    ],
    criteria: [
      "Novel approach to addressing climate change challenges",
      "Potential for real-world impact",
      "Interdisciplinary research approach",
      "Detailed budget and project timeline"
    ],
    deadline: "2023-10-31",
    status: "Open",
    createdAt: "2023-06-01T09:15:00Z",
    location: "Remote",
    funding: "Up to $100,000",
    totalApplicants: 89
  },
  {
    id: 4,
    title: "Frontend Developer",
    type: "job",
    organization: "WebCraft Solutions",
    description: "Join our team as a Frontend Developer and create stunning user interfaces for our diverse client base.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in frontend development",
      "Proficiency in React, TypeScript, and modern CSS",
      "Experience with responsive design and cross-browser compatibility"
    ],
    criteria: [
      "Strong portfolio showcasing frontend projects",
      "Excellent problem-solving skills",
      "Good communication skills and ability to work in a team",
      "Familiarity with UI/UX principles"
    ],
    deadline: "2023-07-31",
    status: "Open",
    createdAt: "2023-06-15T11:45:00Z",
    location: "New York, NY",
    totalApplicants: 78
  },
  {
    id: 5,
    title: "Renewable Energy Innovation Grant",
    type: "grant",
    organization: "Clean Power Initiative",
    description: "Funding for groundbreaking projects in renewable energy technologies and sustainable power solutions.",
    requirements: [
      "Researchers or research teams in renewable energy field",
      "Innovative project proposal in solar, wind, or other renewable energy technologies",
      "Commitment to open-source research and knowledge sharing"
    ],
    criteria: [
      "Potential for significant impact on renewable energy adoption",
      "Feasibility of project implementation",
      "Cost-effectiveness and scalability of proposed solution",
      "Collaboration with industry partners (preferred but not required)"
    ],
    deadline: "2023-11-30",
    status: "Open",
    createdAt: "2023-07-01T13:00:00Z",
    location: "Remote",
    funding: "Up to $75,000",
    totalApplicants: 34
  },
  {
    id: 6,
    title: "AI Research Internship",
    type: "internship",
    organization: "Cognitive Systems Lab",
    description: "Exciting opportunity to work on cutting-edge AI projects in natural language processing and computer vision.",
    requirements: [
      "Graduate student in Computer Science, AI, or related field",
      "Strong background in machine learning and deep learning",
      "Proficiency in Python and PyTorch or TensorFlow",
      "Familiarity with NLP or computer vision techniques"
    ],
    criteria: [
      "Academic excellence in AI-related coursework",
      "Previous research experience or publications (preferred)",
      "Ability to work independently and as part of a team",
      "Strong analytical and problem-solving skills"
    ],
    deadline: "2023-08-31",
    status: "Open",
    createdAt: "2023-07-15T10:30:00Z",
    location: "Remote",
    totalApplicants: 123
  },
  {
    id: 7,
    title: "Women in STEM Scholarship",
    type: "scholarship",
    organization: "Empowering Futures Foundation",
    description: "Scholarship program aimed at supporting and encouraging women pursuing degrees in STEM fields.",
    requirements: [
      "Female student enrolled in a STEM program",
      "Demonstrated academic excellence",
      "Active involvement in STEM-related extracurricular activities"
    ],
    criteria: [
      "GPA of 3.5 or higher",
      "Essay on career goals and vision for advancing women in STEM",
      "Two letters of recommendation",
      "Demonstrated leadership potential"
    ],
    deadline: "2023-09-15",
    status: "Open",
    createdAt: "2023-08-01T09:00:00Z",
    location: "Remote",
    funding: "Up to $30,000",
    totalApplicants: 245
  },
  {
    id: 8,
    title: "Cybersecurity Analyst",
    type: "job",
    organization: "SecureNet Defenders",
    description: "Join our cybersecurity team to protect critical infrastructure and sensitive data from evolving threats.",
    requirements: [
      "Bachelor's degree in Computer Science, Cybersecurity, or related field",
      "3+ years of experience in cybersecurity",
      "CISSP, CEH, or equivalent certification",
      "Strong knowledge of network security, encryption, and threat detection"
    ],
    criteria: [
      "Hands-on experience with security information and event management (SIEM) tools",
      "Familiarity with compliance frameworks (e.g., GDPR, HIPAA)",
      "Excellent analytical and problem-solving skills",
      "Ability to communicate complex security concepts to non-technical stakeholders"
    ],
    deadline: "2023-08-31",
    status: "Open",
    createdAt: "2023-08-15T14:00:00Z",
    location: "Remote",
    totalApplicants: 67
  },
  {
    id: 9,
    title: "Sustainable Agriculture Research Grant",
    type: "grant",
    organization: "FutureHarvest Foundation",
    description: "Funding for innovative research projects aimed at developing sustainable and resilient agricultural practices.",
    requirements: [
      "Researchers or research teams in agriculture, environmental science, or related fields",
      "Focus on sustainable farming methods, crop resilience, or agri-tech solutions",
      "Commitment to open-access publication of research findings"
    ],
    criteria: [
      "Potential for significant impact on agricultural sustainability",
      "Innovation in addressing challenges related to climate change and food security",
      "Interdisciplinary approach to research",
      "Clear plan for stakeholder engagement and knowledge transfer"
    ],
    deadline: "2023-10-15",
    status: "Open",
    createdAt: "2023-09-01T11:30:00Z",
    location: "Remote",
    funding: "Up to $120,000",
    totalApplicants: 56
  },
  {
    id: 10,
    title: "Quantum Computing Summer School",
    type: "internship",
    organization: "Quantum Frontiers Institute",
    description: "Intensive summer program for students interested in quantum computing and its applications.",
    requirements: [
      "Undergraduate or graduate student in Physics, Computer Science, or related field",
      "Strong background in linear algebra and quantum mechanics",
      "Programming experience (preferably in Python)",
      "Keen interest in quantum computing and its potential applications"
    ],
    criteria: [
      "Academic excellence in relevant coursework",
      "Motivation to pursue a career in quantum computing",
      "Ability to work on complex problems independently and in teams",
      "Creative thinking and innovative approach to problem-solving"
    ],
    deadline: "2023-03-31",
    status: "Closed",
    createdAt: "2023-01-15T08:45:00Z",
    location: "Remote",
    totalApplicants: 198
  },
  {
    id: 11,
    title: "Healthcare Innovation Fellowship",
    type: "internship",
    organization: "MedTech Ventures",
    description: "12-month fellowship program focused on developing innovative solutions for healthcare challenges using technology.",
    requirements: [
      "Graduate degree in Healthcare, Engineering, or related field",
      "Strong interest in healthcare innovation",
      "Experience with digital health technologies",
      "Excellent project management skills"
    ],
    criteria: [
      "Proven track record of innovation in healthcare",
      "Leadership experience",
      "Strong research and analytical skills",
      "Ability to work in cross-functional teams"
    ],
    deadline: "2023-12-15",
    status: "Open",
    createdAt: "2023-09-15T16:00:00Z",
    location: "Boston, MA",
    funding: "Up to $65,000",
    totalApplicants: 89
  },
  {
    id: 12,
    title: "Social Impact Entrepreneurship Grant",
    type: "grant",
    organization: "Change Makers Foundation",
    description: "Funding for innovative social enterprises addressing critical community challenges.",
    requirements: [
      "Registered social enterprise or nonprofit",
      "Clear social impact mission",
      "Sustainable business model",
      "Track record of community engagement"
    ],
    criteria: [
      "Innovative approach to social challenges",
      "Scalability potential",
      "Measurable impact metrics",
      "Community involvement plan"
    ],
    deadline: "2023-11-30",
    status: "Open",
    createdAt: "2023-09-20T09:30:00Z",
    location: "Remote",
    funding: "Up to $50,000",
    totalApplicants: 167
  }
];

export let mockApplications: Application[] = [
  {
    id: 1,
    userId: 2,
    opportunityId: 1,
    status: 'Pending',
    appliedAt: '2023-05-15',
    coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineering Internship position at Tech Innovators Inc. As a third-year Computer Science student at the National University of Singapore with a deep passion for software development and innovation, I am excited about the opportunity to contribute to your dynamic team.

Throughout my academic journey, I have maintained a strong focus on full-stack development, consistently achieving a GPA of 3.8. I have completed several significant projects that demonstrate my technical capabilities and problem-solving skills. Most notably, I developed a real-time collaborative coding platform using React and Node.js, which is now used by over 200 students in my university's coding club.

My technical skills align perfectly with your requirements. I am proficient in JavaScript and React, having built multiple web applications including a social media dashboard and an e-commerce platform. I have also worked extensively with Node.js and Express through my involvement in the university's developer society, where I led a team of five students in creating a campus event management system.

What particularly excites me about Tech Innovators Inc. is your commitment to pushing the boundaries of technology and your focus on mentorship. Your recent work on AI-powered development tools has especially caught my attention, and I would be thrilled to learn from and contribute to such innovative projects.

I am confident that my technical skills, passion for learning, and collaborative nature would make me a valuable addition to your team. I am eager to bring my perspective and enthusiasm to Tech Innovators Inc. and to grow alongside industry experts.

Thank you for considering my application. I look forward to discussing how I can contribute to your team.

Best regards,
[Student Name]`,
    updatedAt: '2023-05-15T10:30:00Z',
    documents: [
      { name: 'Resume.pdf', url: '/documents/resume.pdf' },
      { name: 'TranscriptFall2023.pdf', url: '/documents/transcript.pdf' }
    ]
  },
  {
    id: 2,
    userId: 2,
    opportunityId: 3,
    status: 'Accepted',
    appliedAt: '2023-06-10',
    coverLetter: `Dear Grant Committee,

I am writing to apply for the Environmental Research Grant at the Green Earth Institute. As a PhD candidate in Environmental Science at the University of California, Berkeley, with a focus on climate change adaptation strategies, I am excited about the opportunity to contribute to your mission of advancing sustainable solutions for our planet's future.

My research proposal, "Developing Resilient Urban Ecosystems Through Adaptive Management Strategies," aims to address the critical challenges cities face due to climate change. Through my previous research experience and publications in journals such as Nature Climate Change and Environmental Science & Technology, I have developed a strong foundation in climate science and ecosystem management.

The proposed research will utilize an innovative approach combining remote sensing technology, machine learning algorithms, and community-based participatory research to develop and implement effective urban climate adaptation strategies. This interdisciplinary approach will not only advance our scientific understanding but also provide practical solutions for cities worldwide.

I am particularly drawn to the Green Earth Institute's commitment to open science and its track record of translating research into actionable policy recommendations. My previous work with the California Climate Action Network has given me valuable experience in stakeholder engagement and policy advocacy, which I believe will be crucial for maximizing the impact of this research.

The requested funding would be instrumental in supporting:
- Advanced remote sensing equipment and data processing capabilities
- Community engagement workshops and stakeholder consultations
- Graduate student research assistance
- Publication costs in open-access journals

I am confident that this research aligns perfectly with the Green Earth Institute's mission and has the potential to make a significant contribution to climate change adaptation strategies.

Thank you for considering my application. I look forward to the possibility of conducting this important research under your support.

Sincerely,
[Researcher Name]`,
    updatedAt: '2023-06-15T14:20:00Z',
    documents: [
      { name: 'ResearchProposal.pdf', url: '/documents/proposal.pdf' },
      { name: 'CV.pdf', url: '/documents/cv.pdf' },
      { name: 'PublicationsList.pdf', url: '/documents/publications.pdf' }
    ]
  },
  {
    id: 3,
    userId: 3,
    opportunityId: 2,
    status: 'Rejected',
    appliedAt: '2023-06-05',
    coverLetter: `Dear Scholarship Committee,

I am writing to apply for the Data Science Scholarship offered by the Future Analysts Foundation. As a second-year student pursuing a Bachelor's degree in Data Science at MIT, I am passionate about leveraging data to drive meaningful insights and innovations that can transform our world.

Throughout my academic journey, I have maintained a 3.8 GPA while actively participating in various data science projects and competitions. My most recent project involved developing a machine learning model to predict urban air quality using multiple data sources, which won first place in our university's data science competition.

I am particularly interested in the intersection of data science and environmental sustainability. Last summer, I interned at a climate tech startup where I developed algorithms to optimize renewable energy distribution systems. This experience strengthened my belief in the power of data science to address global challenges.

My career goal is to become a leading data scientist focusing on applications in environmental protection and climate change mitigation. The Future Analysts Foundation's scholarship would be instrumental in helping me achieve this goal by allowing me to fully focus on my studies and research projects.

Thank you for considering my application.

Best regards,
[Student Name]`,
    updatedAt: '2023-06-20T09:15:00Z',
    documents: [
      { name: 'AcademicTranscript.pdf', url: '/documents/transcript.pdf' },
      { name: 'ProjectPortfolio.pdf', url: '/documents/portfolio.pdf' }
    ]
  },
  {
    id: 4,
    userId: 4,
    opportunityId: 6,
    status: 'Pending',
    appliedAt: '2023-07-20',
    coverLetter: `Dear Hiring Team,

I am writing to express my strong interest in the AI Research Internship position at Cognitive Systems Lab. As a Master's student in Computer Science at Stanford University specializing in Machine Learning, I am thrilled about the opportunity to contribute to cutting-edge AI research.

My academic background includes advanced coursework in deep learning, computer vision, and natural language processing. I have maintained a 4.0 GPA in my graduate studies while conducting research in transformer architectures for multi-modal learning. My recent work on attention mechanisms for video understanding was accepted as a poster presentation at the International Conference on Machine Learning (ICML).

I have extensive experience with PyTorch and have contributed to several open-source AI projects. During my previous internship at a leading tech company, I developed and deployed computer vision models for real-time object detection, achieving a 15% improvement in inference speed while maintaining accuracy.

I am particularly excited about Cognitive Systems Lab's work on combining NLP and computer vision for more robust AI systems. Your recent paper on cross-modal attention mechanisms has greatly influenced my research direction.

Thank you for considering my application.

Best regards,
[Student Name]`,
    updatedAt: '2023-07-20T15:45:00Z',
    documents: [
      { name: 'CV.pdf', url: '/documents/cv.pdf' },
      { name: 'ResearchStatement.pdf', url: '/documents/research.pdf' },
      { name: 'GradeTranscript.pdf', url: '/documents/transcript.pdf' }
    ]
  },
  {
    id: 5,
    userId: 5,
    opportunityId: 7,
    status: 'Accepted',
    appliedAt: '2023-08-10',
    coverLetter: `Dear Scholarship Committee,

I am writing to apply for the Women in STEM Scholarship. As a female sophomore majoring in Mechanical Engineering at Georgia Tech, I am passionate about breaking barriers and inspiring more women to pursue careers in engineering.

Throughout my academic career, I have maintained a 3.9 GPA while actively participating in various STEM initiatives. As the president of our Women in Engineering club, I have organized workshops and mentoring programs that have reached over 100 high school girls, encouraging them to explore engineering careers.

My research focuses on sustainable energy systems, and I am currently working on a project to develop more efficient solar panel cleaning mechanisms. This work has already resulted in a provisional patent application.

The scholarship would allow me to continue my research and outreach efforts while completing my degree. I am committed to being a role model for future generations of women in STEM.

Sincerely,
[Student Name]`,
    updatedAt: '2023-08-15T11:20:00Z',
    documents: [
      { name: 'Resume.pdf', url: '/documents/resume.pdf' },
      { name: 'Transcript.pdf', url: '/documents/transcript.pdf' },
      { name: 'Recommendations.pdf', url: '/documents/recommendations.pdf' }
    ]
  }
];

export function addOpportunity(opportunity: Opportunity): Opportunity[] {
  mockOpportunities = [...mockOpportunities, opportunity];
  return mockOpportunities;
}

export function updateOpportunity(updatedOpportunity: Opportunity): Opportunity[] {
  mockOpportunities = mockOpportunities.map(opp => 
    opp.id === updatedOpportunity.id ? updatedOpportunity : opp
  );
  return mockOpportunities;
}

export function deleteOpportunity(id: number): Opportunity[] {
  mockOpportunities = mockOpportunities.filter(opp => opp.id !== id);
  return mockOpportunities;
}

export function updateApplicationStatus(applicationId: number, newStatus: 'Pending' | 'Accepted' | 'Rejected'): Application[] {
  mockApplications = mockApplications.map(app => 
    app.id === applicationId ? { ...app, status: newStatus } : app
  );
  return mockApplications;
}
