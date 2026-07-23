export interface ICompanyDepartment {
  id?: number
  departmentKey: string
  title: string
  functions: string[]
}

export const departments = {
  engineering: {
    title: 'Engineering',
    functions: [
      'Sales Manager',
      'Web Developer',
      'Database Administrator',
      'Chief Technology Officer',
      'Marketing Manager',
      'Developer',
      'Technical Support Engineer',
      'Chief Executive Officer',
    ],
  },
  support: {
    title: 'Support',
    functions: [
      'Support Specialist',
      'Research Analyst',
      'Legal Counsel',
      'Chief Financial Officer',
      'Sales Manager',
    ],
  },
  research_and_development: {
    title: 'Research and Development',
    functions: [
      'Accountant',
      'Engineer',
      'Legal Counsel',
      'Chief Financial Officer',
      'Database Administrator',
    ],
  },
  human_resources: {
    title: 'Human Resources',
    functions: [
      'Quality Assurance Engineer',
      'Business Analyst',
      'Chief Technology Officer',
    ],
  },
  product_management: {
    title: 'Product Management',
    functions: [
      'Research Analyst',
      'Quality Assurance Engineer',
      'Software Engineer',
      'Technical Support Engineer',
    ],
  },
  marketing: {
    title: 'Marketing',
    functions: [
      'Chief Executive Officer',
      'Chief Financial Officer',
      'Software Architect',
      'Research Analyst',
    ],
  },
  services: {
    title: 'Services',
    functions: ['Web Developer', 'Sales Manager', 'Human Resources Manager'],
  },
  accounting: {
    title: 'Accounting',
    functions: [
      'Business Analyst',
      'Chief Executive Officer',
      'Database Administrator',
      'Project Manager',
      'Technical Support Engineer',
      'Chief Operating Officer',
    ],
  },
  training: {
    title: 'Training',
    functions: ['Data Analyst', 'Junior Software developer'],
  },
  legal: {
    title: 'Legal',
    functions: [
      'Web Developer',
      'Business Analyst',
      'Business Development Manager',
      'Chief Information Officer',
      'Database Administrator',
      'Chief Financial Officer',
    ],
  },
  sales: {
    title: 'Sales',
    functions: ['Database Administrator'],
  },
} as const
