export interface ICompanyDepartment {
  id?: number
  departmentKey: string
  title: string
  description?: string
  functions: string[]
  numberOfEmployees: number
}

export const departments = {
  engineering: {
    title: 'Engineering',
    description: 'Our wizards that make our engines run.',
    functions: [
      'Chief Technology Officer',
      'Chief Executive Officer',
      'Quality Assurance Engineer',
      'Database Administrator',
      'Developer',
      'Full Stack Developer',
      'Systems Architect',
      'Technical Support Engineer',
      'Web Developer',
    ],
    numberOfEmployees: 0,
  },
  support: {
    title: 'Support',
    description:
      'Help for every need, be it via call, message or anything else. Our support is always here.',
    functions: [
      'Support Specialist',
      'Research Support',
      'Legal Support',
      'Database Support',
      'Website Support',
    ],
    numberOfEmployees: 0,
  },
  research_and_development: {
    title: 'Research and Development',
    description:
      'Our research team always looking forward to develop new ways to make our lives better.',
    functions: [
      'Accountant',
      'Engineer',
      'Legal Counsel',
      'Researcher',
      'Research Database Administrator',
    ],
    numberOfEmployees: 0,
  },
  human_resources: {
    title: 'Human Resources',
    description:
      'Everybody needs help and needs to understand our process for everything.',
    functions: [
      'HR Operator',
      'Human Resources Manager',
      'Business Analyst',
      'Chief HR Officer',
    ],
    numberOfEmployees: 0,
  },
  product_management: {
    title: 'Product Management',
    description:
      'Our department that focuses on creating the best possible experience for our applications.',
    functions: [
      'Research Analyst',
      'Quality Assurance Engineer',
      'Software Engineer',
      'Technical Support Engineer',
      'Sales Manager',
      'Product Owner',
    ],
    numberOfEmployees: 0,
  },
  marketing: {
    title: 'Marketing',
    description:
      'Our public team that is always at the media, showing our services and talking about them.',
    functions: [
      'Chief Executive Officer',
      'Chief Marketing Officer',
      'Software Architect',
      'Research Analyst',
      'Market Researcher',
      'Public Relations',
    ],
    numberOfEmployees: 0,
  },
  services: {
    title: 'Services',
    description:
      'Our service team is always ready to make our operations run as nicely as possible.',
    functions: [
      'Services Controller',
      'Operations',
      'Services Manager',
      'Chief Operating Officer',
    ],
    numberOfEmployees: 0,
  },
  accounting: {
    title: 'Accounting',
    description: 'We are always taking everything into account.',
    functions: [
      'Accountant',
      'Business Analyst',
      'Chief Executive Officer',
      'Project Manager',
      'Chief Financial Officer',
      'Sales Manager',
    ],
    numberOfEmployees: 0,
  },
  training: {
    title: 'Training',
    description:
      'Training is always the most important step to achieve greatness.',
    functions: [
      'Junior Data Analyst',
      'Junior Database Administrator',
      'Junior Software Developer',
      'Junior Legal Councel',
      'Junior Seller',
    ],
    numberOfEmployees: 0,
  },
  legal: {
    title: 'Legal',
    description: 'We can take care of everything legal related.',
    functions: [
      'Business Analyst',
      'Business Development Manager',
      'Legal Counsel',
      'Chief Legal Officer',
    ],
    numberOfEmployees: 0,
  },
  sales: {
    title: 'Sales',
    description:
      'Our team of sellers that show our clients show Cog Debt products shine.',
    functions: ['System Seller', 'Service Seller', 'Sales Manager'],
    numberOfEmployees: 0,
  },
} as const

export interface ICompanyDepartments {
  accounting: 'Accounting'
  engineering: 'Engineering'
  human_resources: 'Human Resources'
  legal: 'Legal'
  marketing: 'Marketing'
  product_management: 'Product Management'
  research_and_development: 'Research and Development'
  sales: 'Sales'
  services: 'Services'
  support: 'Support'
  training: 'Training'
}

export type TAccountingFunctions = [
  keyof typeof departments.accounting.functions,
]

export type TEngineeringFunctions = [
  keyof typeof departments.engineering.functions,
]

export type THrFunctions = [keyof typeof departments.human_resources.functions]

export type TLegalFunctions = [keyof typeof departments.legal.functions]

export type TMarketingFunctions = [keyof typeof departments.marketing.functions]

export type TProductManFunctions = [
  keyof typeof departments.product_management.functions,
]

export type TRandDFunctions = [
  keyof typeof departments.research_and_development.functions,
]

export type TSalesFunctions = [keyof typeof departments.sales.functions]

export type TServicesFunctions = [keyof typeof departments.services.functions]

export type TSupportFunctions = [keyof typeof departments.support.functions]

export type TTrainingFunctions = [keyof typeof departments.training.functions]

export type TDeptFunctionsUnion =
  | TAccountingFunctions
  | TEngineeringFunctions
  | THrFunctions
  | TLegalFunctions
  | TMarketingFunctions
  | TProductManFunctions
  | TRandDFunctions
  | TSalesFunctions
  | TSupportFunctions
  | TTrainingFunctions
