export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  industry: string
  rating: number
}

// Architecture ready — real testimonials to be added by client
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Before INOVEX, we were managing 200 students on WhatsApp and a notebook. Now every enrollment, every fee, every parent message — it just works. We scaled from 200 to 800 students in 8 months.',
    author: 'Dr Nisha Sawant',
    role: 'Independent Director',
    company: 'Hrihdyansh - A piece of my Heart',
    industry: 'Family Wellfare',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'Our website used to get 3 calls a month. After INOVEX built our new platform and set up our Google Business, we get 3 calls a day. The ROI paid for itself in the first week.',
    author: 'Sanjay Fernandes',
    role: 'Owner',
    company: 'Goan Spice Restaurant',
    industry: 'Hospitality',
    rating: 5,
  },
  {
    id: 't3',
    quote: '"Inovex Solutions has been a valuable technology partner for After School Goa. From building our website to understanding our long-term vision, they consistently delivered solutions that were modern, reliable, and tailored to our needs. Their ability to combine great design with practical functionality has helped strengthen our online presence. I highly recommend them to any business looking for a dependable digital solutions partner."',
    author: 'Aamir Hussain Jakati',
    role: 'Founder and Director',
    company: 'After School Goa',
    industry: 'Education',
    rating: 5,
  },
   {
    id: 't4',
    quote: '"Before working with Inovex Solutions, our team was spending hours every day on repetitive administrative tasks. Ayesh Jamadar took the time to understand our workflow instead of pushing a one-size-fits-all solution. The automation system his team built eliminated manual processes, reduced errors, and gave our staff more time to focus on customers. Within weeks, we noticed a significant improvement in productivity. If you are looking for someone who genuinely understands business automation and builds solutions around your needs, I highly recommend Ayesh and the Inovex Solutions team."',
    author: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'Horizon Logistics',
    industry: 'Logistics',
    rating: 5,
  },
]
