import { useEffect, useMemo, useState } from 'react'
import './App.css'

type RouteKey = 'home' | 'about' | 'services' | 'work' | 'team' | 'careers' | 'contact'

type Project = {
  title: string
  type: string
  description: string
  tags: string[]
  metric: string
}

const projects: Project[] = [
  {
    title: 'Flamingo Park',
    type: 'E-commerce Experience',
    description: 'A premium commerce experience designed for fast browsing, confident discovery and smooth conversion.',
    tags: ['React', 'Commerce', 'UX'],
    metric: 'Retail',
  },
  {
    title: 'LedgerPro',
    type: 'SaaS Platform',
    description: 'A modern business operations product focused on clarity, speed and scalable workflows.',
    tags: ['SaaS', 'Dashboard', 'Systems'],
    metric: 'B2B',
  },
  {
    title: 'Kayan',
    type: 'Digital Platform',
    description: 'A product experience built to connect talent and opportunities through a trusted digital journey.',
    tags: ['Platform', 'Product', 'UX'],
    metric: 'Marketplace',
  },
]

const services = [
  ['01', 'Digital Products', 'We design and build web products that feel fast, clear and premium from the first interaction.'],
  ['02', 'AI Solutions', 'Practical AI experiences, intelligent workflows and automation designed around real business outcomes.'],
  ['03', 'UI / UX Design', 'Interfaces shaped by product thinking, strong hierarchy, responsive systems and polished interaction.'],
  ['04', 'Web Platforms', 'Scalable front-end architecture for company platforms, SaaS products, portals and commerce experiences.'],
]

const jobs = [
  ['Frontend Developer', 'Product Engineering', 'Remote / Hybrid'],
  ['UI/UX Designer', 'Design', 'Remote'],
  ['AI Engineer', 'AI & Automation', 'Remote / Hybrid'],
]

const values = [
  ['Clarity over noise', 'Every screen and interaction should have a reason to exist.'],
  ['Build for real use', 'We prioritize real users, real constraints and measurable value.'],
  ['Move with quality', 'Speed matters, but the details are what make the product memorable.'],
  ['Think as one team', 'Design and engineering work together from the start, not as separate stages.'],
]

function routeFromHash(): RouteKey {
  const value = window.location.hash.replace('#/', '').trim()
  if (['about', 'services', 'work', 'team', 'careers', 'contact'].includes(value)) return value as RouteKey
  return 'home'
}

function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Smart System home">
      <span className="brand-mark"><i /><i /><i /></span>
      <span>SMART SYSTEM</span>
    </a>
  )
}

function ArrowIcon() {
  return <span className="arrow">↗</span>
}

function Header({ route }: { route: RouteKey }) {
  const [open, setOpen] = useState(false)
  const links: Array<[RouteKey, string]> = [
    ['about', 'About'],
    ['services', 'Services'],
    ['work', 'Work'],
    ['team', 'Team'],
    ['careers', 'Careers'],
  ]

  useEffect(() => setOpen(false), [route])

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {links.map(([key, label]) => (
            <a key={key} href={`#/${key}`} className={route === key ? 'active' : ''}>{label}</a>
          ))}
        </nav>
        <a className="nav-cta" href="#/contact">Start a project <ArrowIcon /></a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Logo />
          <p>We design and build smart digital products for ambitious teams and growing businesses.</p>
        </div>
        <div className="footer-links">
          <a href="#/about">About</a><a href="#/services">Services</a><a href="#/work">Work</a><a href="#/careers">Careers</a><a href="#/contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Smart System</span><span>Built with intention.</span></div>
    </footer>
  )
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string, title: string, copy?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><b />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <article className={`project-card project-${index + 1}`}>
      <div className="project-visual">
        <div className="mock-window"><span /><span /><span /><div className="mock-sidebar" /><div className="mock-content"><i /><i /><i /></div></div>
        <div className="project-number">0{index + 1}</div>
      </div>
      <div className="project-info">
        <div><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p></div>
        <div className="project-bottom"><div>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><b>{project.metric}</b></div>
      </div>
    </article>
  )
}

function CTASection() {
  return <section className="cta-section"><span>Have a project in mind?</span><h2>Let’s make something<br />worth remembering.</h2><a className="button light" href="#/contact">Start a conversation <ArrowIcon /></a></section>
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" /><div className="hero-grid" />
        <div className="hero-content">
          <span className="status-pill"><i /> Independent digital product studio</span>
          <h1>We build <span>smart systems</span><br />for ambitious ideas.</h1>
          <p>Strategy, design and engineering for digital products that need to look sharp, work beautifully and scale with confidence.</p>
          <div className="hero-actions"><a className="button primary" href="#/work">Explore our work <ArrowIcon /></a><a className="button ghost" href="#/contact">Tell us about your idea</a></div>
        </div>
        <div className="orbit-card" aria-hidden="true">
          <div className="orbit orbit-a"><span /></div><div className="orbit orbit-b"><span /></div><div className="orbit-core">S<span>S</span></div>
          <span className="float-chip chip-a">PRODUCT</span><span className="float-chip chip-b">AI</span><span className="float-chip chip-c">DESIGN</span>
        </div>
        <div className="hero-meta"><span>PRODUCT STRATEGY</span><span>UI / UX</span><span>FRONTEND</span><span>AI EXPERIENCES</span></div>
      </section>

      <section className="section services-preview">
        <SectionHeading eyebrow="What we do" title="From an idea to a product people want to use." copy="We combine product thinking, design and engineering so the final experience feels like one system — not separate pieces." />
        <div className="service-grid">{services.map(([number, title, copy]) => <article className="service-card" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowIcon /></article>)}</div>
      </section>

      <section className="section work-preview">
        <div className="section-topline"><SectionHeading eyebrow="Selected work" title="Products with a point of view." /><a href="#/work" className="text-link">View all work <ArrowIcon /></a></div>
        <div className="project-stack">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
      </section>

      <section className="statement-section"><span>SMART SYSTEM / PRINCIPLE 01</span><p>Good digital products should feel <em>obvious</em> after the hard thinking is done.</p></section>

      <section className="section capability-section">
        <SectionHeading eyebrow="How we work" title="Small team. High ownership. Clear momentum." />
        <div className="steps"><div><span>01</span><h3>Understand</h3><p>We get close to the problem, the audience and the outcome before touching the interface.</p></div><div><span>02</span><h3>Shape</h3><p>We turn ideas into flows, systems and visual directions that can be tested early.</p></div><div><span>03</span><h3>Build</h3><p>We engineer responsive, maintainable experiences with performance in mind.</p></div><div><span>04</span><h3>Refine</h3><p>We polish the details, remove friction and make the final product feel intentional.</p></div></div>
      </section>
      <CTASection />
    </>
  )
}

function PageHero({ index, eyebrow, title, copy }: { index: string, eyebrow: string, title: string, copy: string }) {
  return <section className="page-hero"><span className="page-index">{index}</span><span className="eyebrow"><b />{eyebrow}</span><h1>{title}</h1><p>{copy}</p></section>
}

function AboutPage() {
  return <><PageHero index="01" eyebrow="About Smart System" title="A focused team building useful digital things." copy="Smart System is a digital product team working across strategy, design, frontend engineering and intelligent experiences." /><section className="section split-story"><div><span className="big-number">02</span><p>Founding team members</p></div><div><h2>Built around ownership, not handoffs.</h2><p>We started Smart System to create the kind of team we wanted to work with: small enough to care about every detail, technical enough to solve difficult problems, and flexible enough to move without unnecessary layers.</p><p>Our goal is simple: turn ambitious ideas into products that look credible, feel intuitive and perform reliably.</p></div></section><section className="section"><SectionHeading eyebrow="Our values" title="The standards behind the work." /><div className="value-grid">{values.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section><CTASection /></>
}

function ServicesPage() {
  return <><PageHero index="02" eyebrow="Services" title="Design, engineering and intelligence in one product team." copy="We help teams move from fuzzy ideas to focused digital experiences without losing quality between disciplines." /><section className="section service-list">{services.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div><div className="service-tags"><i>Strategy</i><i>Design</i><i>Build</i></div></article>)}</section><CTASection /></>
}

function WorkPage() {
  return <><PageHero index="03" eyebrow="Selected work" title="A growing body of products, platforms and experiments." copy="We care about the whole experience: positioning, structure, interface, responsiveness, performance and the feeling after launch." /><section className="section"><div className="project-stack">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section><CTASection /></>
}

function TeamPage() {
  return <><PageHero index="04" eyebrow="The team" title="Small by design. Serious about the craft." copy="Smart System is built around a compact founding team with product, engineering and AI capability." /><section className="section team-grid"><article><div className="avatar avatar-a">MW</div><span>Co-founder</span><h2>Mohammed Waleed</h2><p>Frontend engineering, product systems and AI.</p></article><article><div className="avatar avatar-b">SS</div><span>Co-founder</span><h2>Partner profile</h2><p>Product delivery, technology and business development.</p></article></section><CTASection /></>
}

function CareersPage() {
  return <><PageHero index="05" eyebrow="Careers" title="Help us build the next chapter." copy="We want people who care about the details, take ownership and enjoy turning difficult problems into simple experiences." /><section className="section jobs-section"><div className="jobs-header"><h2>Open positions</h2><span>{jobs.length} roles</span></div>{jobs.map(([title, dept, location]) => <a className="job-row" href="#/contact" key={title}><div><span>{dept}</span><h3>{title}</h3></div><p>{location}</p><ArrowIcon /></a>)}<div className="careers-note"><h3>Don’t see your role?</h3><p>Send us your portfolio, GitHub or CV anyway. Strong people are always worth meeting.</p><a href="#/contact" className="text-link">Introduce yourself <ArrowIcon /></a></div></section></>
}

function ContactPage() {
  return <section className="contact-page"><div className="contact-copy"><span className="eyebrow"><b />Start a conversation</span><h1>Have an idea worth building?</h1><p>Tell us what you are working on. We will help you shape the next move.</p><div className="contact-detail"><span>Email</span><strong>hello@smartsystem.dev</strong></div><div className="contact-detail"><span>Availability</span><strong>Open for selected projects</strong></div></div><form className="contact-form" onSubmit={(e) => e.preventDefault()}><label>Your name<input placeholder="Name" /></label><label>Email<input type="email" placeholder="you@company.com" /></label><label>What do you need?<select defaultValue=""><option value="" disabled>Select a service</option><option>Digital product</option><option>AI solution</option><option>UI / UX design</option><option>Web platform</option></select></label><label>Tell us about the project<textarea rows={6} placeholder="A little context, goals and timing..." /></label><button className="button primary" type="submit">Send project brief <ArrowIcon /></button><small>Frontend demo only — form submission will be connected later.</small></form></section>
}

function App() {
  const [route, setRoute] = useState<RouteKey>(routeFromHash())

  useEffect(() => {
    const sync = () => {
      setRoute(routeFromHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const page = useMemo(() => ({
    home: <HomePage />,
    about: <AboutPage />,
    services: <ServicesPage />,
    work: <WorkPage />,
    team: <TeamPage />,
    careers: <CareersPage />,
    contact: <ContactPage />,
  })[route], [route])

  return <div className="app"><Header route={route} /><main>{page}</main>{route !== 'contact' && <Footer />}</div>
}

export default App
