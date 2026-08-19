import { useEffect, useMemo, useState } from 'react'
import './App.css'

type RouteKey = 'home' | 'solutions' | 'services' | 'industries' | 'company' | 'careers' | 'contact'

const solutions = [
  {
    code: '01',
    title: 'Digital Platforms',
    copy: 'Customer portals, internal systems and scalable web platforms built around real operational needs.',
    items: ['Portals', 'Dashboards', 'Business systems'],
  },
  {
    code: '02',
    title: 'AI & Automation',
    copy: 'Practical AI capabilities that reduce repetitive work, improve decisions and create faster workflows.',
    items: ['AI assistants', 'Workflow automation', 'Smart search'],
  },
  {
    code: '03',
    title: 'Commerce Systems',
    copy: 'Modern digital commerce experiences designed to simplify catalog, ordering and customer operations.',
    items: ['E-commerce', 'Catalog systems', 'Customer experience'],
  },
]

const services = [
  ['Strategy & Discovery', 'Product planning, requirements, structure and a clear technical direction before development begins.'],
  ['UI / UX Design', 'Responsive interfaces, user flows and design systems built for clarity and consistency.'],
  ['Frontend Engineering', 'Fast, maintainable React applications and websites with reusable architecture.'],
  ['AI Integration', 'AI-powered features integrated into products and workflows where they create measurable value.'],
  ['Technical Consulting', 'Architecture reviews, product improvement and practical guidance for digital transformation.'],
]

const industries = [
  ['Retail & Commerce', 'Digital storefronts, catalogs, order flows and customer-facing platforms.'],
  ['Professional Services', 'Portals, internal operations and modern client experiences.'],
  ['Finance & Operations', 'Dashboards, reporting, workflows and structured business systems.'],
  ['Startups & New Ventures', 'From initial product definition to a launch-ready frontend experience.'],
]

const caseStudies = [
  ['Flamingo Park', 'Commerce', 'Digital retail platform'],
  ['LedgerPro', 'Business Software', 'SaaS operations platform'],
  ['Kayan', 'Platform', 'Digital marketplace experience'],
]

const jobs = [
  ['Frontend Developer', 'Engineering', 'Remote / Hybrid'],
  ['UI/UX Designer', 'Design', 'Remote'],
  ['AI Engineer', 'AI & Automation', 'Remote / Hybrid'],
]

function currentRoute(): RouteKey {
  const value = window.location.hash.replace('#/', '').trim()
  if (['solutions', 'services', 'industries', 'company', 'careers', 'contact'].includes(value)) return value as RouteKey
  return 'home'
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Smart System home">
      <span className="brand-symbol"><i /><i /></span>
      <span className="brand-copy"><strong>Smart System</strong><small>Technology Company</small></span>
    </a>
  )
}

function Header({ route }: { route: RouteKey }) {
  const [open, setOpen] = useState(false)
  const links: Array<[RouteKey, string]> = [
    ['solutions', 'Solutions'],
    ['services', 'Services'],
    ['industries', 'Industries'],
    ['company', 'Company'],
    ['careers', 'Careers'],
  ]

  useEffect(() => setOpen(false), [route])

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {links.map(([key, label]) => (
            <a key={key} className={route === key ? 'active' : ''} href={`#/${key}`}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="contact-link" href="#/contact">Contact</a>
          <a className="nav-button" href="#/contact">Talk to us <Arrow /></a>
        </div>
        <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function SectionHeader({ label, title, copy }: { label: string, title: string, copy?: string }) {
  return (
    <div className="section-header">
      <span className="section-label">{label}</span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero-shell">
      <div className="hero">
        <div className="hero-copy">
          <span className="hero-label"><i /> Technology for modern business</span>
          <h1>We design and build <em>digital systems</em> that move businesses forward.</h1>
          <p>Smart System helps companies create better digital products, automate workflows and build scalable web platforms with a clear business purpose.</p>
          <div className="hero-actions">
            <a className="button primary" href="#/solutions">Explore solutions <Arrow /></a>
            <a className="button secondary" href="#/contact">Discuss a project</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="system-window">
            <div className="system-head"><div><span /><span /><span /></div><small>SMART SYSTEM / OPERATIONS</small></div>
            <div className="system-layout">
              <aside><i /><i /><i /><i /></aside>
              <div className="system-main">
                <div className="system-title"><span /><b /></div>
                <div className="system-metrics"><i /><i /><i /></div>
                <div className="system-chart"><span /><span /><span /><span /><span /><span /></div>
              </div>
            </div>
          </div>
          <div className="visual-note note-one"><span>AI</span><strong>Automation</strong></div>
          <div className="visual-note note-two"><span>WEB</span><strong>Platforms</strong></div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Hero />

      <section className="trust-strip">
        <div><span>Built for</span><strong>Growing companies</strong></div>
        <div><span>Focused on</span><strong>Business outcomes</strong></div>
        <div><span>Delivered through</span><strong>Design + Engineering + AI</strong></div>
        <div><span>Working model</span><strong>Direct & collaborative</strong></div>
      </section>

      <section className="section">
        <SectionHeader label="Solutions" title="Technology solutions built around how your business actually works." copy="We focus on systems that improve operations, customer experience and the way teams work with information." />
        <div className="solution-grid">
          {solutions.map((solution) => (
            <article className="solution-card" key={solution.code}>
              <div className="solution-top"><span>{solution.code}</span><Arrow /></div>
              <h3>{solution.title}</h3>
              <p>{solution.copy}</p>
              <ul>{solution.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <a className="inline-link" href="#/solutions">View all solutions <Arrow /></a>
      </section>

      <section className="band band-dark">
        <div className="band-inner">
          <SectionHeader label="Capabilities" title="One company across strategy, design, engineering and AI." copy="The work stays connected from the first business requirement to the final interface." />
          <div className="capability-list">
            {services.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section industries-home">
        <SectionHeader label="Industries" title="Flexible technology experience across different business models." />
        <div className="industry-grid">
          {industries.map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="company-block">
        <div className="company-copy">
          <span className="section-label">Why Smart System</span>
          <h2>Built to work like a technology partner, not a temporary design vendor.</h2>
          <p>We care about the complete system: what the business needs, how users interact with it, how the frontend is structured and how the product can evolve after launch.</p>
          <a className="button dark" href="#/company">About the company <Arrow /></a>
        </div>
        <div className="company-points">
          <div><strong>01</strong><span>Direct communication with the people doing the work.</span></div>
          <div><strong>02</strong><span>Design and engineering decisions made together.</span></div>
          <div><strong>03</strong><span>Frontend systems built for maintainability and growth.</span></div>
          <div><strong>04</strong><span>AI used where it creates practical value, not as decoration.</span></div>
        </div>
      </section>

      <section className="section case-section">
        <div className="case-heading">
          <SectionHeader label="Selected case studies" title="A few examples of the systems we are building." />
        </div>
        <div className="case-list">
          {caseStudies.map(([name, type, description], index) => (
            <article key={name}>
              <span className="case-number">0{index + 1}</span>
              <div><small>{type}</small><h3>{name}</h3></div>
              <p>{description}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <CorporateCTA />
    </>
  )
}

function PageHero({ label, title, copy }: { label: string, title: string, copy: string }) {
  return (
    <section className="page-hero">
      <span className="section-label">{label}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  )
}

function SolutionsPage() {
  return (
    <>
      <PageHero label="Solutions" title="Digital systems for operations, customers and growth." copy="We build focused solutions that solve specific business problems instead of forcing every company into the same template." />
      <section className="section page-section">
        <div className="solution-grid large">
          {solutions.map((solution) => (
            <article className="solution-card" key={solution.code}><div className="solution-top"><span>{solution.code}</span><Arrow /></div><h3>{solution.title}</h3><p>{solution.copy}</p><ul>{solution.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
          ))}
        </div>
      </section>
      <CorporateCTA />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero label="Services" title="The capabilities required to take a digital initiative from idea to implementation." copy="Our services can be used individually or combined as one delivery team." />
      <section className="section page-section service-table">
        {services.map(([title, copy], index) => (
          <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div><Arrow /></article>
        ))}
      </section>
      <CorporateCTA />
    </>
  )
}

function IndustriesPage() {
  return (
    <>
      <PageHero label="Industries" title="Technology adapted to the way each business operates." copy="We bring the same product and engineering discipline while adapting the solution to each industry context." />
      <section className="section page-section industry-grid page-industries">
        {industries.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><a href="#/contact">Discuss your needs <Arrow /></a></article>)}
      </section>
      <CorporateCTA />
    </>
  )
}

function CompanyPage() {
  return (
    <>
      <PageHero label="Company" title="A technology company focused on building useful systems with clear ownership." copy="Smart System brings product thinking, frontend engineering and AI capability together in one focused team." />
      <section className="section page-section company-story">
        <div><span className="story-kicker">Our direction</span><h2>We are building a company for long-term digital partnerships.</h2></div>
        <div><p>Our goal is not to produce isolated screens or short-lived websites. We want to understand how a business works, identify where technology can create value and build systems that remain useful as the company grows.</p><p>That means organized delivery, maintainable frontend architecture, practical design decisions and direct communication throughout the project.</p></div>
      </section>
      <section className="band company-values"><div className="band-inner"><SectionHeader label="Principles" title="How we want to operate as a company." /><div className="principle-grid"><article><span>01</span><h3>Clarity</h3><p>Clear scope, clear communication and interfaces that are easy to understand.</p></article><article><span>02</span><h3>Ownership</h3><p>We take responsibility for the quality of the outcome, not only the assigned task.</p></article><article><span>03</span><h3>Practicality</h3><p>Technology choices must solve real needs and remain maintainable.</p></article><article><span>04</span><h3>Growth</h3><p>We design systems with the next stage of the business in mind.</p></article></div></div></section>
      <CorporateCTA />
    </>
  )
}

function CareersPage() {
  return (
    <>
      <PageHero label="Careers" title="Join a team building the foundation of a modern technology company." copy="We are interested in people who care about quality, take ownership and enjoy solving real product problems." />
      <section className="section page-section careers-list">
        <div className="careers-head"><h2>Open positions</h2><span>{jobs.length} roles</span></div>
        {jobs.map(([title, department, location]) => (
          <a className="career-row" href="#/contact" key={title}><div><small>{department}</small><h3>{title}</h3></div><span>{location}</span><Arrow /></a>
        ))}
        <div className="open-role"><div><small>Open application</small><h3>Think you can add value to Smart System?</h3></div><p>Send your CV, portfolio or GitHub profile and tell us where you can contribute.</p><a href="#/contact">Contact us <Arrow /></a></div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-intro">
        <span className="section-label">Contact</span>
        <h1>Tell us what your business needs to improve.</h1>
        <p>Share the challenge, current process or digital product you want to build. We can start from the business problem and define the right next step.</p>
        <div className="contact-details">
          <div><span>Email</span><strong>hello@smartsystem.dev</strong></div>
          <div><span>Project status</span><strong>Accepting selected projects</strong></div>
        </div>
      </div>
      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <div className="form-row"><label>Name<input placeholder="Your name" /></label><label>Company<input placeholder="Company name" /></label></div>
        <label>Work email<input type="email" placeholder="you@company.com" /></label>
        <label>What do you need?<select defaultValue=""><option value="" disabled>Select a solution</option><option>Digital platform</option><option>AI & automation</option><option>E-commerce</option><option>Company website</option><option>Technical consulting</option></select></label>
        <label>Project context<textarea rows={6} placeholder="Tell us about the current challenge, goals and timeline..." /></label>
        <button className="button primary" type="submit">Send inquiry <Arrow /></button>
        <small>Frontend preview only — form submission will be connected later.</small>
      </form>
    </section>
  )
}

function CorporateCTA() {
  return (
    <section className="cta-shell">
      <div className="cta">
        <div><span>Start a conversation</span><h2>Need a digital system built around your business?</h2></div>
        <a className="button light" href="#/contact">Talk to Smart System <Arrow /></a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><Logo /><p>Digital platforms, AI solutions and modern web systems for growing businesses.</p></div>
        <div><strong>Company</strong><a href="#/company">About</a><a href="#/careers">Careers</a><a href="#/contact">Contact</a></div>
        <div><strong>What we do</strong><a href="#/solutions">Solutions</a><a href="#/services">Services</a><a href="#/industries">Industries</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Smart System</span><span>Technology Company</span></div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState<RouteKey>(currentRoute())

  useEffect(() => {
    const sync = () => {
      setRoute(currentRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const page = useMemo(() => ({
    home: <HomePage />,
    solutions: <SolutionsPage />,
    services: <ServicesPage />,
    industries: <IndustriesPage />,
    company: <CompanyPage />,
    careers: <CareersPage />,
    contact: <ContactPage />,
  })[route], [route])

  return <div className="app"><Header route={route} /><main>{page}</main>{route !== 'contact' && <Footer />}</div>
}

export default App
