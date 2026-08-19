import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import './App.css'

type RouteKey = 'home' | 'solutions' | 'services' | 'industries' | 'work' | 'company' | 'careers' | 'contact'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

const solutions = [
  {
    code: '01',
    title: 'Digital Platforms',
    copy: 'Portals, internal systems and customer-facing products built around real business workflows.',
    tags: ['Portals', 'Dashboards', 'SaaS'],
    visual: 'platform',
  },
  {
    code: '02',
    title: 'AI & Automation',
    copy: 'Practical AI features and automations that reduce repetitive work and make operations faster.',
    tags: ['AI Assistants', 'Automation', 'Smart Search'],
    visual: 'automation',
  },
  {
    code: '03',
    title: 'Commerce Systems',
    copy: 'Modern commerce experiences designed for product discovery, ordering and customer operations.',
    tags: ['E-commerce', 'Catalog', 'Orders'],
    visual: 'commerce',
  },
]

const services = [
  ['Product Strategy', 'Requirements, structure and a clear product direction before development starts.'],
  ['UI / UX Design', 'Responsive interfaces, design systems and user flows built for clarity.'],
  ['Frontend Engineering', 'Fast React applications with reusable architecture and strong performance.'],
  ['AI Integration', 'Useful AI-powered features integrated where they create measurable value.'],
  ['Technical Consulting', 'Architecture reviews, product improvement and digital transformation guidance.'],
]

const industries = [
  ['Retail & Commerce', 'Digital storefronts, ordering flows and customer platforms.', 'Retail'],
  ['Professional Services', 'Client portals, workflow systems and internal operations.', 'Services'],
  ['Finance & Operations', 'Dashboards, reporting and structured business systems.', 'Finance'],
  ['Startups & New Ventures', 'From product definition to launch-ready digital experiences.', 'Startups'],
]

const projects = [
  ['Flamingo Park', 'Commerce Platform', 'A premium retail experience focused on discovery, speed and customer confidence.', 'commerce'],
  ['LedgerPro', 'Business SaaS', 'A business operations platform that turns complex workflows into a clean product experience.', 'saas'],
  ['Kayan', 'Digital Marketplace', 'A platform designed around trusted connections, structured journeys and scalable UX.', 'marketplace'],
]

const jobs = [
  ['Frontend Developer', 'Engineering', 'Remote / Hybrid'],
  ['UI/UX Designer', 'Design', 'Remote'],
  ['AI Engineer', 'AI & Automation', 'Remote / Hybrid'],
]

function currentRoute(): RouteKey {
  const value = window.location.hash.replace('#/', '').trim()
  if (['solutions', 'services', 'industries', 'work', 'company', 'careers', 'contact'].includes(value)) return value as RouteKey
  return 'home'
}

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  )
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Smart System home">
      <span className="brand-mark"><i /><i /><b /></span>
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
    ['work', 'Work'],
    ['company', 'Company'],
    ['careers', 'Careers'],
  ]

  useEffect(() => setOpen(false), [route])

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={open ? 'nav-menu open' : 'nav-menu'}>
          {links.map(([key, label]) => <a key={key} href={`#/${key}`} className={route === key ? 'active' : ''}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-contact" href="#/contact">Contact</a>
          <a className="nav-cta" href="#/contact">Start a project <Arrow /></a>
          <button className="menu-toggle" type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
      </div>
    </header>
  )
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string, title: string, copy?: string }) {
  return (
    <Reveal className="section-title">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      {copy && <p>{copy}</p>}
    </Reveal>
  )
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-glow visual-glow-a" /><div className="visual-glow visual-glow-b" />
      <div className="command-window">
        <div className="command-top"><div className="window-dots"><i /><i /><i /></div><span>SMART SYSTEM / CONTROL CENTER</span><b>Live</b></div>
        <div className="command-layout">
          <aside className="command-side"><div className="side-logo">S</div><i className="active" /><i /><i /><i /><i /></aside>
          <main className="command-main">
            <div className="command-head"><div><small>Operations overview</small><strong>Business intelligence</strong></div><button>Last 30 days</button></div>
            <div className="metric-grid">
              <article><span>Automated tasks</span><strong>12,840</strong><small>+18.4%</small></article>
              <article><span>Active users</span><strong>4,219</strong><small>+9.2%</small></article>
              <article><span>System uptime</span><strong>99.98%</strong><small>Healthy</small></article>
            </div>
            <div className="command-lower">
              <div className="chart-panel"><div className="panel-head"><span>Performance</span><small>Realtime</small></div><div className="bar-chart">{[38,58,44,76,62,88,70,96,73,82,91,68].map((height, index) => <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }} />)}</div></div>
              <div className="workflow-panel"><div className="panel-head"><span>AI workflow</span><small className="status-ok">Running</small></div><div className="flow-step active"><b>01</b><div><strong>Lead captured</strong><span>CRM webhook</span></div><i>✓</i></div><div className="flow-connector" /><div className="flow-step active"><b>02</b><div><strong>AI qualification</strong><span>Scoring model</span></div><i>✓</i></div><div className="flow-connector" /><div className="flow-step"><b>03</b><div><strong>Team routing</strong><span>Automation</span></div><i>→</i></div></div>
            </div>
          </main>
        </div>
      </div>
      <div className="floating-card float-card-a"><span>AI automation</span><strong>+32% faster</strong></div>
      <div className="floating-card float-card-b"><span>System health</span><strong>All services online</strong></div>
    </div>
  )
}

function MiniVisual({ type }: { type: string }) {
  if (type === 'automation') {
    return <div className="mini-visual automation-mini"><div><b>Trigger</b><span>New request</span></div><i /><div className="pulse-node"><b>AI</b><span>Analyze</span></div><i /><div><b>Action</b><span>Route task</span></div></div>
  }
  if (type === 'commerce') {
    return <div className="mini-visual commerce-mini">{[1,2,3].map((item) => <div key={item}><i /><span /><b /></div>)}</div>
  }
  return <div className="mini-visual platform-mini"><aside><i /><i /><i /></aside><main><div className="mini-metrics"><i /><i /><i /></div><div className="mini-chart">{[28,42,35,64,52,78,66,90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></main></div>
}

function SolutionCard({ solution, index }: { solution: typeof solutions[number], index: number }) {
  return (
    <Reveal delay={index * 90}>
      <article className="solution-card">
        <div className="solution-card-head"><span>{solution.code}</span><Arrow /></div>
        <div className="solution-icon"><span>{solution.title.charAt(0)}</span></div>
        <h3>{solution.title}</h3>
        <p>{solution.copy}</p>
        <div className="pill-row">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <MiniVisual type={solution.visual} />
      </article>
    </Reveal>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-inner">
          <Reveal className="hero-copy">
            <span className="hero-badge"><i /> Technology for modern business</span>
            <h1>We build <em>digital systems</em> that make companies work smarter.</h1>
            <p>Smart System combines product design, frontend engineering and AI to create modern platforms, automations and customer experiences.</p>
            <div className="hero-actions"><a className="btn btn-primary" href="#/solutions">Explore solutions <Arrow /></a><a className="btn btn-ghost" href="#/contact">Discuss a project</a></div>
            <div className="hero-points"><span>✓ Product strategy</span><span>✓ UI / UX systems</span><span>✓ React engineering</span><span>✓ AI integration</span></div>
          </Reveal>
          <Reveal className="hero-visual-wrap" delay={120}><HeroVisual /></Reveal>
        </div>
      </section>

      <section className="signal-strip"><div><small>Core focus</small><strong>Business systems</strong></div><div><small>Built with</small><strong>Design + Engineering + AI</strong></div><div><small>Delivery model</small><strong>Direct collaboration</strong></div><div><small>Designed for</small><strong>Growth & scale</strong></div></section>

      <section className="section">
        <SectionTitle eyebrow="Solutions" title="Technology solutions built around real business operations." copy="Not generic pages. We design systems that improve workflows, customer experience and the way teams use information." />
        <div className="solutions-grid">{solutions.map((solution, index) => <SolutionCard key={solution.code} solution={solution} index={index} />)}</div>
      </section>

      <section className="capabilities-section">
        <div className="section dark-inner">
          <SectionTitle eyebrow="Capabilities" title="One company across product, design, engineering and AI." copy="The work stays connected from the business requirement to the final interface and technical system." />
          <div className="capabilities-grid">{services.slice(0,4).map(([title, copy], index) => <Reveal key={title} delay={index * 80}><article><span>0{index + 1}</span><div className="capability-icon">{index + 1}</div><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div>
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Industries" title="Flexible technology for different business models." copy="We adapt the same product discipline to the operational reality of each industry." />
        <div className="industry-grid">{industries.map(([title, copy, label], index) => <Reveal key={title} delay={index * 80}><article><span className="industry-label">{label}</span><div className="industry-art"><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p><a href="#/industries">Explore sector <Arrow /></a></article></Reveal>)}</div>
      </section>

      <section className="work-band">
        <div className="section">
          <SectionTitle eyebrow="Selected work" title="A growing portfolio of platforms, commerce and business software." copy="Case studies are part of the company story — not the whole story." />
          <div className="project-grid">{projects.map(([name, type, copy, visual], index) => <Reveal key={name} delay={index * 90}><article className="project-card"><div className={`project-art ${visual}`}><div className="project-screen"><div className="project-top"><i /><i /><i /></div><div className="project-body"><aside /><main><span /><span /><div><i /><i /><i /></div></main></div></div><b>0{index + 1}</b></div><div className="project-copy"><span>{type}</span><h3>{name}</h3><p>{copy}</p><a href="#/work">View case study <Arrow /></a></div></article></Reveal>)}</div>
        </div>
      </section>

      <section className="section company-split">
        <Reveal className="company-copy"><span className="eyebrow">Why Smart System</span><h2>Built to act like a technology partner, not a temporary vendor.</h2><p>We look at the complete system: business needs, user experience, frontend architecture, automation opportunities and what happens after launch.</p><a className="btn btn-dark" href="#/company">About the company <Arrow /></a></Reveal>
        <Reveal className="company-board" delay={120}><div><strong>01</strong><span>Direct communication with the people doing the work.</span></div><div><strong>02</strong><span>Design and engineering decisions made together.</span></div><div><strong>03</strong><span>Systems built for maintainability and growth.</span></div><div><strong>04</strong><span>AI used where it creates practical value.</span></div></Reveal>
      </section>

      <section className="careers-preview"><div className="section"><Reveal className="careers-preview-card"><div><span className="eyebrow">Careers</span><h2>Help us build the next chapter of Smart System.</h2><p>We are interested in people who care about quality, ownership and modern product thinking.</p></div><a className="btn btn-light" href="#/careers">View open roles <Arrow /></a></Reveal></div></section>

      <CorporateCTA />
    </>
  )
}

function PageHero({ eyebrow, title, copy }: { eyebrow: string, title: string, copy: string }) {
  return <section className="page-hero"><Reveal><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></Reveal></section>
}

function SolutionsPage() {
  return <><PageHero eyebrow="Solutions" title="Digital systems for operations, customers and growth." copy="We build focused solutions that solve specific business problems instead of forcing every company into the same template." /><section className="section page-section"><div className="solutions-grid">{solutions.map((solution, index) => <SolutionCard key={solution.code} solution={solution} index={index} />)}</div></section><CorporateCTA /></>
}

function ServicesPage() {
  return <><PageHero eyebrow="Services" title="The capabilities needed to move from idea to implementation." copy="Use our services individually or combine them as one connected delivery team." /><section className="section page-section service-table">{services.map(([title, copy], index) => <Reveal key={title} delay={index * 60}><article><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div><Arrow /></article></Reveal>)}</section><CorporateCTA /></>
}

function IndustriesPage() {
  return <><PageHero eyebrow="Industries" title="Technology adapted to the way each business operates." copy="The same product discipline, adapted to the context, customers and operations of each industry." /><section className="section page-section"><div className="industry-grid page-industries">{industries.map(([title, copy, label], index) => <Reveal key={title} delay={index * 70}><article><span className="industry-label">{label}</span><div className="industry-art"><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p><a href="#/contact">Discuss your needs <Arrow /></a></article></Reveal>)}</div></section><CorporateCTA /></>
}

function WorkPage() {
  return <><PageHero eyebrow="Work" title="Selected digital products and platform experiences." copy="A growing portfolio across commerce, SaaS and digital platforms." /><section className="work-band page-work"><div className="section page-section"><div className="project-grid">{projects.map(([name, type, copy, visual], index) => <Reveal key={name} delay={index * 90}><article className="project-card"><div className={`project-art ${visual}`}><div className="project-screen"><div className="project-top"><i /><i /><i /></div><div className="project-body"><aside /><main><span /><span /><div><i /><i /><i /></div></main></div></div><b>0{index + 1}</b></div><div className="project-copy"><span>{type}</span><h3>{name}</h3><p>{copy}</p><a href="#/contact">Discuss a similar project <Arrow /></a></div></article></Reveal>)}</div></div></section><CorporateCTA /></>
}

function CompanyPage() {
  return <><PageHero eyebrow="Company" title="A technology company built around clarity, ownership and useful systems." copy="Smart System brings product thinking, frontend engineering and AI capability together in one focused team." /><section className="section company-page-grid"><Reveal><h2>We want to become a long-term technology partner for growing businesses.</h2></Reveal><Reveal delay={100}><p>Our goal is not to produce isolated screens or short-lived websites. We want to understand how a business works, identify where technology can create value and build systems that remain useful as the company grows.</p><p>That means organized delivery, maintainable frontend architecture, practical design decisions and direct communication throughout the project.</p></Reveal></section><section className="principles-band"><div className="section"><SectionTitle eyebrow="Principles" title="How we want to operate as a company." /><div className="principles-grid">{[['Clarity','Clear scope, communication and interfaces.'],['Ownership','Responsibility for the outcome, not only the task.'],['Practicality','Technology choices that solve real needs.'],['Growth','Systems designed for the next stage of the business.']].map(([title, copy], index) => <Reveal key={title} delay={index * 70}><article><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></div></section><CorporateCTA /></>
}

function CareersPage() {
  return <><PageHero eyebrow="Careers" title="Join a team building the foundation of a modern technology company." copy="We are interested in people who care about quality, take ownership and enjoy solving real product problems." /><section className="section page-section careers-list"><div className="careers-head"><h2>Open positions</h2><span>{jobs.length} roles</span></div>{jobs.map(([title, department, location], index) => <Reveal key={title} delay={index * 60}><a className="career-row" href="#/contact"><div><small>{department}</small><h3>{title}</h3></div><span>{location}</span><Arrow /></a></Reveal>)}<Reveal><div className="open-application"><div><small>Open application</small><h3>Think you can add value to Smart System?</h3></div><p>Send your CV, portfolio or GitHub profile and tell us where you can contribute.</p><a href="#/contact">Contact us <Arrow /></a></div></Reveal></section></>
}

function ContactPage() {
  return <section className="contact-page"><Reveal className="contact-intro"><span className="eyebrow">Contact</span><h1>Tell us what your business needs to improve.</h1><p>Share the challenge, process or digital product you want to build. We can start from the business problem and define the right next step.</p><div className="contact-details"><div><span>Email</span><strong>hello@smartsystem.dev</strong></div><div><span>Project status</span><strong>Accepting selected projects</strong></div></div></Reveal><Reveal delay={120}><form className="contact-form" onSubmit={(event) => event.preventDefault()}><div className="form-row"><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@company.com" /></label></div><label>Company<input placeholder="Company name" /></label><label>What do you need?<select defaultValue=""><option value="" disabled>Select a service</option><option>Digital platform</option><option>AI & automation</option><option>E-commerce</option><option>UI / UX design</option><option>Technical consulting</option></select></label><label>Project details<textarea rows={7} placeholder="Tell us about the challenge, goals and timing..." /></label><button className="btn btn-primary" type="submit">Send project brief <Arrow /></button><small>Frontend demo only — submission will be connected later.</small></form></Reveal></section>
}

function CorporateCTA() {
  return <section className="cta-wrap"><Reveal className="cta-card"><div><span className="eyebrow">Start a project</span><h2>Have a business challenge that technology can solve?</h2><p>Tell us what you are trying to improve and we will help define the right digital approach.</p></div><a className="btn btn-light" href="#/contact">Talk to Smart System <Arrow /></a></Reveal></section>
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Logo /><p>Digital platforms, modern frontend and practical AI solutions for growing businesses.</p></div><div className="footer-links"><a href="#/solutions">Solutions</a><a href="#/services">Services</a><a href="#/industries">Industries</a><a href="#/work">Work</a><a href="#/company">Company</a><a href="#/careers">Careers</a></div></div><div className="footer-bottom"><span>© 2026 Smart System</span><span>Technology built with purpose.</span></div></footer>
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
    work: <WorkPage />,
    company: <CompanyPage />,
    careers: <CareersPage />,
    contact: <ContactPage />,
  })[route], [route])

  return <div className="app"><Header route={route} /><main>{page}</main>{route !== 'contact' && <Footer />}</div>
}

export default App
