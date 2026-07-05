export interface PortfolioProject {
  id: string
  name: string
  tagline: string
  description: string
  industry: string
  services: string[]
  url: string
  color: string
  accentColor: string
  year: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'afterschool',
    name: 'AfterSchool',
    tagline: 'Where every student\'s journey is managed, measured, and mentored.',
    description: 'A complete digital ecosystem for a modern coaching institute — from enrollment to performance dashboards, parent portals to automated fee management. Built to replace chaos with clarity.',
    industry: 'Education Technology',
    services: ['Web Platform', 'Custom CRM', 'Parent Portal', 'Analytics Dashboard'],
    url: 'https://www.afterschoolgoa.com',
    color: '#4A90E8',
    accentColor: '#34D399',
    year: '2024',
  },
  {
    id: 'hridhyansh',
    name: 'Hridhyansh',
    tagline: 'Five days. A lifetime of connection.',
    description: 'A soulful digital platform for a conscious parenting brand born in Goa. Designed to feel like a trusted friend — warm, intimate, frictionless. Built to convert scrollers into families that change.',
    industry: 'Family Wellness',
    services: ['Brand Website', 'Program Enrollment', 'WhatsApp Integration', 'E-commerce'],
    url: 'https://www.hridhyansh.in',
    color: '#E8734A',
    accentColor: '#C084FC',
    year: '2024',
  },
]
