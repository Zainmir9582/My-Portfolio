import { Project, SkillCategory, TimelineItem, ApiEndpoint } from './types';

export const PERSONAL_INFO = {
  name: 'Zain Ul Abideen',
  title: 'Full-Stack Developer',
  subtitle: 'Specialized in Nest.js, Next.js, & Scalable Databases',
  tagline: 'Crafting high-performance web solutions with robust, secure backend engines and polished, pixel-perfect user interfaces.',
  email: 'zainmir9582@gmail.com',
  linkedin: 'https://www.linkedin.com/in/zain-mir-ab46081a7',
  github: 'https://github.com/Zainmir9582',
  fiverr: 'https://www.fiverr.com/s/YRbe4Yd',
};

export const PROJECTS: Project[] = [
  {
    id: 'lms-fullstack',
    title: 'Full-Stack Learning Management System (LMS)',
    description: 'A comprehensive educational platform featuring secure authentication, dynamic course management, progress tracking, and interactive quizzes.',
    longDescription: 'This full-stack LMS is built from the ground up with strict type safety, modular structures, and relational database integrity. It splits into a high-performance Next.js/React frontend client and a scalable, robust Nest.js API gateway. The backend handles complex business logic including role-based access control (Admin, Instructor, Student), course progression tracking, interactive quiz validation, and certificate generation, managed gracefully via TypeORM and a MySQL database.',
    tags: ['Next.js', 'Nest.js', 'Typescript', 'TypeORM', 'MySQL', 'Tailwind CSS', 'RESTful API'],
    githubFrontend: 'https://github.com/Zainmir9582/LMS-Frontend',
    githubBackend: 'https://github.com/Zainmir9582/LMS-Backend',
    category: 'Full-Stack',
    highlights: [
      'Role-based Access Control (RBAC) ensuring precise endpoint authorization for Admins, Instructors, and Students.',
      'Course progression tracking engine that computes active percentages dynamically on lesson completions.',
      'Fully interactive quiz engine with score calculation, time constraints, and immediate answers feedback.',
      'TypeORM query caching and database relational optimization with proper indexing to ensure fast page loads.'
    ],
    architecture: {
      frontend: ['Next.js App Router & React functional components', 'Tailwind CSS for responsive layouts', 'Client-side state & local token storage'],
      backend: ['Nest.js modular architecture (Controllers, Services, Modules)', 'Passport-JWT auth strategies & Guard validation', 'Input parsing with class-validator'],
      database: ['MySQL relational design with strict constraints', 'TypeORM migration controls and custom queries', 'Complex relationships: Users ↔ Enrollments ↔ Courses ↔ Lessons']
    }
  },
  {
    id: 'queue-management',
    title: 'University Convocation Queue Management System',
    description: 'A robust, high-concurrency real-time scheduling and queuing platform built for university convocations during his VU Software House residency.',
    longDescription: 'Developed as a principal project during his internship at Virtual University of Pakistan Software House, this system solved the intense congestion and bottleneck issues faced during large-scale student convocations. It handles thousands of concurrent student registrations, automated seating queues, stage clearance pipelines, and instant status updates. It significantly streamlined student verification and increased the clearance speed of graduates heading to the stage by 60%.',
    tags: ['Nest.js', 'React', 'Typescript', 'MySQL', 'TypeORM', 'MUI', 'RESTful API'],
    category: 'Backend',
    highlights: [
      'Successfully designed a real-time ticketing queue engine that coordinates Stage, Seating, and Reception zones.',
      'Implemented automated ticket verification scanning hooks with unique QR tokens.',
      'Developed an executive dashboard showing live throughput metrics, stage occupancy rates, and bottleneck alerts.',
      'Designed a resilient DB schema utilizing MySQL transactions to ensure zero queue double-booking under load.'
    ],
    architecture: {
      frontend: ['React with Material-UI (MUI) components', 'Dynamic layout responsive grid system', 'SSE (Server-Sent Events) live ticker updates'],
      backend: ['Nest.js event-driven messaging pipelines', 'Queue state machines storing temporal queue slots', 'Custom guard middleware verifying gate credentials'],
      database: ['MySQL relational storage mapping student status', 'TypeORM query optimizations', 'Pre-allocated ticket queues with relational locks']
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core',
    skills: [
      { name: 'Typescript', level: 95, description: 'Type safety, custom interfaces, advanced generics, and enterprise patterns.', iconName: 'Code2', category: 'language' },
      { name: 'Javascript', level: 95, description: 'Modern ES6+, closures, async/await, prototype chaining, and promise architectures.', iconName: 'FileJson', category: 'language' },
      { name: 'HTML5 & CSS3', level: 90, description: 'Semantic structure, grid layout, custom properties, and responsive flexbox design.', iconName: 'Terminal', category: 'language' }
    ]
  },
  {
    title: 'Backend Mastery',
    skills: [
      { name: 'Nest.js', level: 92, description: 'Modular design, dependency injection, custom guards, interceptors, and microservices.', iconName: 'Server', category: 'backend' },
      { name: 'Node.js', level: 92, description: 'V8 compilation, asynchronous event loop, filesystem orchestration, and clustering.', iconName: 'Cpu', category: 'backend' },
      { name: 'RESTful API', level: 95, description: 'Endpoint design, JWT authentication, request validation, CORS, and status codes.', iconName: 'Network', category: 'backend' }
    ]
  },
  {
    title: 'Frontend Craftsmanship',
    skills: [
      { name: 'Next.js', level: 90, description: 'Server-side rendering, static site generation, dynamic routing, layout slots, and caching.', iconName: 'Layers', category: 'frontend' },
      { name: 'React', level: 93, description: 'Custom hooks, state management, synthetic events, virtualization, and fiber reconciliation.', iconName: 'Atom', category: 'frontend' },
      { name: 'Tailwind CSS', level: 95, description: 'Utility-first utility structure, theme extensions, arbitrary values, and custom fluid design.', iconName: 'Palette', category: 'frontend' },
      { name: 'Material UI (MUI)', level: 88, description: 'Custom theme injection, responsive styling wrappers, and component customization.', iconName: 'Box', category: 'frontend' }
    ]
  },
  {
    title: 'Database & ORM',
    skills: [
      { name: 'MySQL', level: 90, description: 'Relational mapping, custom index configuration, transactions, and performance profiling.', iconName: 'Database', category: 'database' },
      { name: 'TypeORM', level: 92, description: 'Entity relations, query builders, auto-migrations, database pooling, and lazy loading.', iconName: 'GitMerge', category: 'database' },
      { name: 'DBdiagram.io', level: 85, description: 'Visual entity relationship diagram (ERD) design and database schema mapping.', iconName: 'Workflow', category: 'database' }
    ]
  },
  {
    title: 'Developer Utilities',
    skills: [
      { name: 'Postman', level: 95, description: 'API collection building, automated unit testing, mock servers, and header injections.', iconName: 'Settings', category: 'tool' },
      { name: 'Figma', level: 80, description: 'Component prototyping, wireframing, dev-mode inspection, and visual layouts.', iconName: 'Figma', category: 'tool' },
      { name: 'Git & GitHub', level: 90, description: 'Branch merging strategies, pull requests, cherry-picking, conflict resolution, and CI hooks.', iconName: 'GitBranch', category: 'tool' }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'internship-vuswh',
    role: 'Backend/Frontend Developer Intern',
    company: 'VU Software House (VUSWH)',
    period: 'Nov 2023 - Aug 2024',
    description: 'Acquired hands-on industry experience building scalable solutions for academic administration in a highly competitive dev environment.',
    bullets: [
      'Spearheaded the development of the Convocation Queue Management System, reducing stage-clearance latency by 60% and organizing thousands of attendees.',
      'Engineered both robust, secure REST endpoints using Nest.js and responsive interfaces using Next.js/React and Material-UI.',
      'Modeled database relations and indexes using DBdiagram.io and MySQL, implementing TypeORM to handle complex queries safely.',
      'Wrote comprehensive API integration tests in Postman to ensure stable client-to-server sync and bug-free production rollouts.'
    ],
    type: 'experience',
    logoText: 'VU',
    badge: 'Internship'
  },
  {
    id: 'edu-vu',
    role: 'Bachelor of Science in Information Technology (BS IT)',
    company: 'Virtual University of Pakistan',
    period: 'Nov 2020 - Sep 2024',
    description: 'Completed a comprehensive four-year program specializing in software design, networking, and system architectures.',
    bullets: [
      'Graduated with a CGPA of 3.03/4.00, achieving high academic marks in advanced software engineering and database modules.',
      'Key subjects included Object Oriented Programming, Software Engineering, Database Management Systems, and Web Design & Development.',
      'Completed CS619 (Final Project) with an outstanding Grade A (4.00 G.P.) as part of the core software requirements.'
    ],
    type: 'education',
    logoText: 'BS',
    badge: 'Degree'
  }
];

export const MOCK_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/courses',
    description: 'Fetch all available courses with instructor profiles and average rating aggregates.',
    responseBody: JSON.stringify([
      {
        id: "crs-101",
        title: "Introduction to Nest.js Architecture",
        lessonsCount: 14,
        instructor: "Zain Ul Abideen",
        category: "Backend",
        enrolledStudents: 312,
        rating: 4.9
      },
      {
        id: "crs-102",
        title: "Enterprise Full-Stack Scaling with Next.js",
        lessonsCount: 22,
        instructor: "Zain Ul Abideen",
        category: "Full-Stack",
        enrolledStudents: 489,
        rating: 4.8
      }
    ], null, 2),
    dbQuery: `SELECT c.id, c.title, COUNT(l.id) as lessonsCount, u.name as instructor, c.category \nFROM courses c \nLEFT JOIN lessons l ON l.courseId = c.id \nLEFT JOIN users u ON u.id = c.instructorId \nGROUP BY c.id;`
  },
  {
    method: 'POST',
    path: '/api/courses/enroll',
    description: 'Enroll a user in a specified course and initialize their progression records.',
    requestBody: JSON.stringify({
      courseId: "crs-101",
      userId: "usr-043"
    }, null, 2),
    responseBody: JSON.stringify({
      success: true,
      message: "Enrollment successful. Welcome to the course!",
      enrollmentId: "enr-78921",
      initialProgress: 0,
      enrolledAt: new Date().toISOString()
    }, null, 2),
    dbQuery: `INSERT INTO enrollments (userId, courseId, progress, enrolledAt) \nVALUES ('usr-043', 'crs-101', 0, NOW());`
  },
  {
    method: 'GET',
    path: '/api/queue/status',
    description: 'Retrieve real-time stats, ticket counts, and clearance rates for the active Convocation queue.',
    responseBody: JSON.stringify({
      activeVenue: "Virtual University Convocation Hall",
      totalQueued: 843,
      currentlyCleared: 612,
      activeWaitTimeMinutes: 8,
      status: "ACTIVE",
      gates: {
        "Gate A": "Processing ticket #613",
        "Gate B": "Processing ticket #614",
        "Stage Queue": "12 students on deck"
      }
    }, null, 2),
    dbQuery: `SELECT status, COUNT(*) as count \nFROM convocation_tickets \nGROUP BY status;`
  },
  {
    method: 'POST',
    path: '/api/queue/ticket',
    description: 'Issue a new convocation queue ticket with a locked stage seat relation.',
    requestBody: JSON.stringify({
      studentId: "BC20040433",
      seatNumber: "A-12"
    }, null, 2),
    responseBody: JSON.stringify({
      success: true,
      ticketCode: "TKT-88402",
      studentName: "Zain Ul Abideen",
      queuePosition: 231,
      estimatedStageTime: "11:45 AM",
      qrToken: "a98df23f87b286c12c7d9e"
    }, null, 2),
    dbQuery: `START TRANSACTION;\nINSERT INTO convocation_tickets (studentId, seatNumber, ticketCode, status) \nVALUES ('BC20040433', 'A-12', 'TKT-88402', 'WAITING');\nCOMMIT;`
  }
];
