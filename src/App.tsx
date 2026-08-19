import { useEffect, useMemo, useState } from 'react'
import './App.css'

type RouteKey = 'home' | 'about' | 'services' | 'work' | 'team' | 'careers' | 'contact'

type Project = {
  title: string
  type: string
  description: string
  tags: string[]
  accent: string
}

const services = [
  ['01', 'Product & UI/UX Design', 'Clear product structure, thoughtful user flows and polished responsive interfaces.'],
  ['02', 'Web Development', 'Fast, scalable React experiences for company websites, platforms, portals and SaaS products.'],
  ['03', 'AI Solutions', 'Useful AI features, intelligent workflows and automation focused on real business needs.'],
  ['04', 'E-commerce', 'Modern storefront experiences designed around discovery, trust and conversion.'],
]

const projects: Project[] = [
  {
    title: 'Flamingo Park',
    type: 'E-commerce platform',
    description: 'A premium retail experience designed for product discovery, speed and a smooth customer journey.',
    tags: ['React', 'Commerce', 'Responsive UI'],
    accent: 'violet',
  },
  {
    title: 'LedgerPro',
    type: 'SaaS product',
    description: 'A business operations platform that turns complex workflows into a clean and practical interface.',
    tags: ['SaaS', 'Dashboard', 'Product UI'],
    accent: 'blue',
  },
  {
    title: 'Kayan',
    type: 'Digital platform',
    description: 'A platform experience focused on trusted connections, clear journeys and scalable product structure.',
    tags: ['Platform', 'UX', 'Frontend'],
    accent: 'cyan',
  },
]

const jobs = [
  ['Frontend Developer', 'Product Engineering', 'Remote / Hybrid'],
  ['UI/UX Designer', 'Design', 'Remote'],
  ['AI Engineer', 'AI & Automation', 'Remote / Hybrid'],
]

const values = [
  ['Clarity first', 'A good product should be easy to understand before it tries to impress.'],
  ['Own the outcome', 'We care about the result, not only the task that was assigned.'],
  ['Build with purpose', 'Every section, interaction and technical decision should earn its place.'],
  ['Keep improving', 'We refine the details until the whole experience feels consistent.'],
]

function routeFromHash(): RouteKey {
  const value = window.location.hash.replace('#/', '').trim()
  if (['about', 'services', 'work', 'team', 'careers', 'contact'].includes(value)) return value as RouteKey
  return 'home'
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Smart System home">
      <span className="brand-mark"><i /><i /></span>
      <span>Smart System</span>
    </a>
  )
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
        <a className="nav-cta" href="#/contact">Start a project <Arrow /></a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function SectionIntro({ label, title, copy }: { label: string, title: string, copy?: string }) {
  return (
    <div className="section-intro">
      <span className="section-label">{label}</span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function ProjectVisual({ project, index }: { project: Project, index: number }) {
  return (
    <div className={`project-visual ${project.accent}`}>
      <div className="browser-frame">
        <div className="browser-bar"><span /><span /><span /></div>
        <div className="browser-body">
          <div className="mock-nav" />
          <div className="mock-hero"><b /><i /></div>
          <div className="mock-grid"><i /><i /><i /></div>
        </div>
      </div>
      <span className="project-index">0{index + 1}</span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <article className="project-card">
      <ProjectVisual project={project} index={index} />
      <div className="project-content">
        <span>{project.type}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
      </div>
    </article>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero">
          <div className="hero-copy">
            <span className="hero-kicker"><i /> Digital product studio</span>
            <h1>We build digital products that are <em>clear, useful and ready to grow.</em></h1>
            <p>Smart System combines product design, frontend engineering and AI to create modern digital experiences for ambitious businesses.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/work">View our work <Arrow /></a>
              <a className="button button-secondary" href="#/contact">Start a conversation</a>
            </div>
            <div className="hero-proof">
              <div><strong>01</strong><span>Product thinking</span></div>
              <div><strong>02</strong><span>Modern frontend</span></div>
              <div><strong>03</strong><span>AI capability</span></div>
            </div>
          </div>

          <div className="hero-panel" aria-hidden="true">
            <div className="panel-head"><span>Smart System</span><b>Studio overview</b></div>
            <div className="panel-feature">
              <span>What we build</span>
              <strong>Digital products<br />with structure.</strong>
              <div className="mini-bars"><i /><i /><i /></div>
            </div>
            <div className="panel-grid">
              <div><span>Web</span><strong>Platforms</strong></div>
              <div><span>AI</span><strong>Workflows</strong></div>
              <div><span>UX</span><strong>Interfaces</strong></div>
              <div><span>Scale</span><strong>Systems</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionIntro label="What we do" title="A compact team for the important parts of your product." copy="Instead of separating design, development and product thinking, we work on them as one connected system." />
        <div className="service-list-home">
          {services.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Arrow />
            </article>
          ))}
        </div>
      </section>

      <section className="work-section">
        <div className="content-section compact-top">
          <div className="work-heading">
            <SectionIntro label="Selected work" title="Projects that show how we think and build." />
            <a className="text-link" href="#/work">See all projects <Arrow /></a>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section className="content-section process-section">
        <SectionIntro label="Our process" title="Simple stages. Clear decisions." copy="We keep the process understandable so everyone knows what is being solved, what comes next and why." />
        <div className="process-grid">
          <article><span>01</span><h3>Understand</h3><p>Goals, audience, business context and product priorities.</p></article>
          <article><span>02</span><h3>Define</h3><p>Structure, user flows, content hierarchy and visual direction.</p></article>
          <article><span>03</span><h3>Build</h3><p>Responsive frontend implementation with clean reusable systems.</p></article>
          <article><span>04</span><h3>Refine</h3><p>Testing, polish, performance and final experience improvements.</p></article>
        </div>
      </section>

      <CTA />
    </>
  )
}

function PageHeader({ label, title, copy }: { label: string, title: string, copy: string }) {
  return (
    <section className="page-header">
      <span>{label}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageHeader label="About Smart System" title="Small team. Clear responsibility. Serious execution." copy="We are building Smart System as a focused digital company for product design, modern web development and practical AI solutions." />
      <section className="content-section story-grid">
        <div className="story-stat"><strong>02</strong><span>Founding team members</span></div>
        <div className="story-copy"><h2>We want the work to feel organized from the first conversation.</h2><p>Our approach is built around clarity. We understand the problem, define the product properly and then build with a consistent design and technical system.</p><p>That means fewer unnecessary layers, better communication and a final product that feels like one coherent experience.</p></div>
      </section>
      <section className="soft-section"><div className="content-section compact-top"><SectionIntro label="Our values" title="How we want Smart System to work." /><div className="value-grid">{values.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <CTA />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHeader label="Services" title="Design and technology focused on useful business outcomes." copy="Our services are intentionally connected so a project can move from idea to polished frontend without losing consistency." />
      <section className="content-section detailed-services">
        {services.map(([number, title, copy]) => (
          <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div><div className="service-pills"><i>Strategy</i><i>Design</i><i>Frontend</i></div></article>
        ))}
      </section>
      <CTA />
    </>
  )
}

function WorkPage() {
  return (
    <>
      <PageHeader label="Our work" title="Selected digital products and platform experiences." copy="A growing portfolio across commerce, SaaS and digital platforms." />
      <section className="content-section compact-top"><div className="project-grid work-page-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section>
      <CTA />
    </>
  )
}

function TeamPage() {
  return (
    <>
      <PageHeader label="Team" title="A focused founding team with product and technical ownership." copy="Smart System starts small on purpose. The aim is quality, responsibility and direct communication." />
      <section className="content-section team-grid">
        <article><div className="team-photo initials-one">MW</div><span>Co-founder</span><h2>Mohammed Waleed</h2><p>Frontend engineering, digital products and AI.</p></article>
        <article><div className="team-photo initials-two">SS</div><span>Co-founder</span><h2>Partner profile</h2><p>Business, delivery and technology.</p></article>
      </section>
      <CTA />
    </>
  )
}

function CareersPage() {
  return (
    <>
      <PageHeader label="Careers" title="Join a small team that wants to build excellent digital work." copy="We value ownership, curiosity, strong fundamentals and people who care about the final experience." />
      <section className="content-section jobs-wrap">
        <div className="jobs-title"><h2>Open roles</h2><span>{jobs.length} positions</span></div>
        {jobs.map(([title, department, location]) => <a className="job-row" href="#/contact" key={title}><div><span>{department}</span><h3>{title}</h3></div><p>{location}</p><Arrow /></a>)}
        <div className="open-application"><div><span>Open application</span><h3>Your role is not listed?</h3></div><p>Send your CV, portfolio or GitHub. We are always interested in strong people.</p><a href="#/contact">Contact us <Arrow /></a></div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <section className="contact-layout">
      <div className="contact-copy"><span>Contact</span><h1>Tell us what you want to build.</h1><p>Share the idea, the problem or the stage you are currently at. We can start from there.</p><div className="contact-meta"><div><span>Email</span><strong>hello@smartsystem.dev</strong></div><div><span>Status</span><strong>Open for selected projects</strong></div></div></div>
      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <div className="form-row"><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@company.com" /></label></div>
        <label>Project type<select defaultValue=""><option value="" disabled>Select a service</option><option>Company website</option><option>Web platform</option><option>E-commerce</option><option>AI solution</option><option>UI/UX design</option></select></label>
        <label>Project details<textarea rows={7} placeholder="What are you trying to build?" /></label>
        <button className="button button-primary" type="submit">Send project brief <Arrow /></button>
        <small>Frontend demo only. Submission will be connected later.</small>
      </form>
    </section>
  )
}

function CTA() {
  return (
    <section className="cta-wrap">
      <div className="cta-card"><span>Have a project in mind?</span><h2>Build it with a team that keeps things clear.</h2><a className="button button-light" href="#/contact">Start a conversation <Arrow /></a></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top"><div><Logo /><p>Digital products, modern frontend and practical AI solutions.</p></div><div className="footer-links"><a href="#/about">About</a><a href="#/services">Services</a><a href="#/work">Work</a><a href="#/careers">Careers</a><a href="#/contact">Contact</a></div></div>
      <div className="footer-bottom"><span>© 2026 Smart System</span><span>Built for clarity.</span></div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState<RouteKey>(routeFromHash())

  useEffect(() => {
    const syncRoute = () => {
      setRoute(routeFromHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
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
