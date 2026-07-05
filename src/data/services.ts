export interface Service {
  id: string
  index: string
  title: string
  verb: string
  description: string
  before: string
  after: string
  color: string
}

export const services: Service[] = [
  {
    id: 'web',
    index: '01',
    title: 'Web & Mobile',
    verb: 'Presence',
    description: 'Your digital storefront works 24 hours a day. We make it earn its keep — converting visitors into customers before you even look up from your coffee.',
    before: 'Static pages. Zero conversions. Invisible to Google.',
    after: 'A living product that grows your business while you sleep.',
    color: '#64B5F6',
  },
  {
    id: 'crm-erp',
    index: '02',
    title: 'CRM & ERP',
    verb: 'Intelligence',
    description: 'Your customer data scattered across WhatsApp, notebooks, and memory. We build the central nervous system your business has been missing.',
    before: 'Deals lost to forgotten follow-ups. Data in silos.',
    after: 'Every lead tracked. Every deal remembered. Every opportunity captured.',
    color: '#E8734A',
  },
  {
    id: 'automation',
    index: '03',
    title: 'AI Automation',
    verb: 'Liberation',
    description: 'The repetitive work your team dreads every morning. We automate it — permanently. So the people you pay to think can finally start thinking.',
    before: 'Hours lost to copy-paste. Human error in every process.',
    after: 'Workflows that run without humans. Teams that focus on what matters.',
    color: '#C084FC',
  },
  {
    id: 'seo',
    index: '04',
    title: 'SEO & Google Business',
    verb: 'Visibility',
    description: 'Your competitor shows up first. You don\'t. We fix that — with data, content, and precision — until your business is what they find.',
    before: 'Page 3. No calls. No clicks. No visibility.',
    after: 'Top results. More calls. Customers finding you first, every time.',
    color: '#34D399',
  },
  {
    id: 'analytics',
    index: '05',
    title: 'Analytics & Strategy',
    verb: 'Clarity',
    description: 'Running a business on gut feel is expensive. We give you the numbers — clean, clear, and actionable — so every decision is backed by evidence.',
    before: 'Guessing what works. Budget going somewhere unknown.',
    after: 'Every rupee tracked. Every channel measured. Every decision informed.',
    color: '#FF9A3C',
  },
]
