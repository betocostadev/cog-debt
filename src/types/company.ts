export interface ICompanyDepartment {
  id?: number
  departmentKey: string
  title: string
  functions: string[]
  numberOfEmployees: number
}

export const departments = {
  engineering: {
    title: 'Engineering',
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
