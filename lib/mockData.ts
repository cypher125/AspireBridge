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
}

export interface Application {
  id: number;
  userId: number;
  opportunityId: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedAt: string;
  coverLetter: string; // Add this line
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
    location: "San Francisco, CA"
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
    funding: "Up to $50,000"
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
    funding: "Up to $100,000"
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
    location: "New York, NY"
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
    location: "Remote"
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
    location: "Remote"
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
    location: "Remote"
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
    location: "Remote"
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
    location: "Remote"
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
    location: "Remote"
  }
];

export let mockApplications: Application[] = [
  {
    id: 1,
    userId: 2,
    opportunityId: 1,
    status: 'Pending',
    appliedAt: '2023-05-15',
    coverLetter: 'I am excited about this opportunity because...',
  },
  {
    id: 2,
    userId: 2,
    opportunityId: 3,
    status: 'Accepted',
    appliedAt: '2023-06-10',
    coverLetter: 'My experience in this field makes me a strong candidate...',
  },
  {
    id: 3,
    userId: 3,
    opportunityId: 2,
    status: 'Rejected',
    appliedAt: '2023-06-05',
    coverLetter: 'I believe I can contribute to your organization by...',
  },
  {
    id: 4,
    userId: 4,
    opportunityId: 1,
    status: 'Pending',
    appliedAt: '2023-05-20',
    coverLetter: 'I am passionate about this field and eager to learn...',
  },
  {
    id: 5,
    userId: 3,
    opportunityId: 4,
    status: 'Accepted',
    appliedAt: '2023-07-01',
    coverLetter: 'My academic background and skills align perfectly with...',
  },
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

