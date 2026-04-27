export type ProjectCategory = 'wordpress' | 'full-stack' | 'plugins' | 'achievement';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  achievements?: string[];
  category: ProjectCategory;
  image?: string;
  link?: string;
  tags: string[];
}

export const PROJECT_CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: 'full-stack', label: 'Full Stack Application' },
  { value: 'wordpress', label: 'WordPress Website' },
  // { value: 'plugins', label: 'Plugins' },
  { value: 'achievement', label: 'Achievement' },
];

export const PROJECTS: Project[] = [
  {
    id: 'full-stack-leadsync',
    title: 'LeadSync - SaaS Lead Management System',
    description: 'LeadSync is a high-performance, enterprise-grade lead management ecosystem built with a premium Glassmorphism dark-themed UI. It features a sophisticated dynamic routing engine and RBAC system supporting 5+ specialized dashboards.',
    fullDescription: 'LeadSync is a full-scale SaaS-based lead management platform designed to streamline the entire lead lifecycle—from data entry to qualification and managerial assignment. The system automates lead distribution using Round Robin (RR), assigns Lead Qualifiers (LQs), and ensures verified leads are routed efficiently to managers. It features real-time performance dashboards for super admins, RBAC-based access control, and robust authentication/authorization. Advanced workflows include lead verification, rejection review, account approval systems, and dynamic load balancing across verifiers using batch-based tracking.',
    achievements: [
      'Built an end-to-end automated lead lifecycle system (Entry → Verification → Qualification → Manager Assignment)',
      'Implemented Round Robin (RR) logic for fair and scalable lead distribution',
      'Designed real-time analytics dashboard for team performance tracking',
      'Developed RBAC system with secure authentication & authorization',
      'Created lead rejection review and account approval workflows',
      'Optimized verifier distribution using batch tracking (v_claimedBy, v_batchId, v_claimedAt)',
      'Ensured scalable architecture supporting multiple roles (Admin, Verifier, LQ, Manager)'
    ],
    category: 'full-stack',
    tags: ['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'RBAC', 'Glassmorphism', 'SaaS'],
    link: 'https://leadsync.globaldigitsolutions.com/',
  },
  {
    id: 'custom-1',
    title: 'CloudRepo - Smart FYP Management Platform',
    description: 'A smart online platform designed to replace the traditional paper-based Final Year Project process with automated workflows and AI-based originality checks.',
    fullDescription: 'A smart online platform designed to replace the traditional paper-based Final Year Project process. Students submit their proposals as PDFs, which are automatically analyzed and compared with existing submissions to ensure originality. If a proposal is too similar, it is rejected; otherwise, it is forwarded to supervisors for review. The system also manages the full project lifecycle, allowing students to submit their final work, including documentation, code, and videos, while keeping them informed through automated email notifications.',
    achievements: [
      'Replaced a fully manual, paper-based FYP system with a complete digital workflow',
      'Automated proposal analysis and originality checks using AI-based comparison',
      'Reduced duplicate project ideas with an 80% similarity threshold system',
      'Streamlined supervisor review and approval process',
      'Enabled structured final submissions (documentation, code, video) in one place',
      'Implemented secure file storage and automated email communication',
      'Improved overall efficiency, transparency, and tracking of student projects'
    ],
    category: 'full-stack',
    tags: ['Node.js', 'Express', 'MongoDB', 'Gemini API', 'PDF Analysis', 'FYP'],
  },
  {
    id: 'achieve-1',
    title: 'Automated Lead Lifecycle System',
    description: 'Engineered a complete end-to-end lead management workflow from initial data entry and AI verification to automated qualification and manager assignment.',
    category: 'achievement',
    tags: ['Automation', 'Workflow', 'System Design'],
  },
  {
    id: 'achieve-2',
    title: 'AI Proposal Originality Engine',
    description: 'Developed an automated PDF analysis system for academic proposals that uses AI-based comparison to detect duplication and ensure research originality.',
    category: 'achievement',
    tags: ['AI', 'Gemini API', 'Innovation'],
  },
  {
    id: 'achieve-3',
    title: 'Round Robin Distribution Logic',
    description: 'Implemented a sophisticated Round Robin (RR) algorithm for fair, scalable, and automated lead distribution across multiple team roles.',
    category: 'achievement',
    tags: ['Algorithm', 'Scalability', 'Logic'],
  },
  {
    id: 'achieve-4',
    title: 'Real-Time Performance Dashboards',
    description: 'Designed and deployed high-performance analytics dashboards for Super Admins to track team efficiency and system metrics in real-time.',
    category: 'achievement',
    tags: ['Analytics', 'React', 'Dashboards'],
  },
  {
    id: 'achieve-5',
    title: 'Digital Transformation of Academic Workflows',
    description: 'Successfully migrated a fully manual, paper-based FYP process to a 100% digital ecosystem, improving efficiency and transparency by 70%.',
    category: 'achievement',
    tags: ['Transformation', 'Digitalization'],
  },
  {
    id: 'custom-2',
    title: 'Real-Time Chat Application',
    description: 'Full-stack real-time communication application with Socket.io for instant messaging, message storage, and user session management.',
    category: 'full-stack',
    tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
  },
  {
    id: 'custom-3',
    title: 'Ghaimalkhaleej.com',
    description: 'Static website for an industrial services company showcasing their offerings and portfolio. Built with HTML, CSS, JavaScript, and Bootstrap for a clean, modern interface.',
    category: 'full-stack',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    link: 'https://ghaimalkhaleej.com/',
  },
  {
    id: 'ams-1',
    title: 'Attendance Management System',
    description: 'A comprehensive employee attendance and shift management system with automated tracking and reporting.',
    category: 'full-stack',
    tags: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://ams.globaldigitsolutions.com/',
  },
  {
    id: 'wp-nursfpx',
    title: 'NursFPXWriters',
    description: 'Specialized nursing assignment writing service platform built with WordPress, focusing on nursing students and healthcare professionals.',
    category: 'wordpress',
    tags: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'wp-assignmentbuds',
    title: 'AssignmentBuds',
    description: 'A comprehensive academic writing service platform built with WordPress, providing students with professional essay writing, dissertation help, and assignment assistance.',
    category: 'wordpress',
    tags: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'wp-1',
    title: 'Write My Nursing',
    description: 'WordPress website for a premier nursing writing service (BSN, MSN, DNP) offering AI-free, zero-plagiarism assessments and papers with a focus on Capella, Walden, and WGU students.',
    category: 'wordpress',
    tags: ['WordPress', 'Service Website', 'Responsive'],
    link: 'https://writemynursing.com/',
  },
  {
    id: 'wp-4',
    title: 'Only America News',
    description: 'WordPress news and editorial website delivering breaking news, political analysis, and trending stories across sports and entertainment with a focus on high traffic content management.',
    category: 'wordpress',
    tags: ['WordPress', 'News', 'Blog'],
    link: 'https://onlyamericanews.com',
  },
];
