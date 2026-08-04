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
