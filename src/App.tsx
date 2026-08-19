import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './App.css'

type RouteKey = 'home' | 'solutions' | 'services' | 'industries' | 'work' | 'company' | 'careers' | 'contact'
type RevealProps = { children: ReactNode; className?: string; delay?: number }

type Solution = {
  code: string
  title: string
  copy: string
  tags: string[]
  visual: 'platform' | 'automation' | 'commerce'
}

const solutions: Solution[] = [
  { code: '01', title: 'Digital Platforms', copy: 'Portals, internal systems and customer-facing products built around real business workflows.', tags: ['Portals', 'Dashboards', 'SaaS'], visual: 'platform' },
  { code: '02', title: 'AI & Automation', copy: 'Practical AI features and automations that reduce repetitive work and make operations faster.', tags: ['AI Assistants', 'Automation', 'Smart Search'], visual: 'automation' },
  { code: '03', title: 'Commerce Systems', copy: 'Modern commerce experiences designed for product discovery, ordering and customer operations.', tags: ['E-commerce', 'Catalog', 'Orders'], visual: 'commerce' },
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

const processSteps = [
  ['01', 'Discover', 'We map the business problem, users, constraints and the outcome that matters.'],
  ['02', 'Design', 'We turn the problem into clear flows, screens and a reusable product system.'],
  ['03', 'Build', 'We engineer the frontend with performance, maintainability and scale in mind.'],
  ['04', 'Improve', 'We test, refine and keep the product ready for the next stage of growth.'],
]

const stack = ['React', 'TypeScript', 'Design Systems', 'API Integration', 'AI Workflows', 'Cloud Platforms', 'Automation', 'Analytics']

function currentRoute(): RouteKey {
  const value = window.location.hash.replace('#/', '').trim()
  if (['solutions', 'services', 'industries', 'work', 'company', 'careers', 'contact'].includes(value)) return value as RouteKey
  return 'home'
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  return reduced
}

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible')
        observer.unobserve(node)
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }

function Logo() {
  return <a className="brand" href="#/" aria-label="Smart System home"><span className="brand-mark"><i /><i /><b /></span><span className="brand-copy"><strong>Smart System</strong><small>Technology Company</small></span></a>
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => { window.removeEventListener('scroll', sync); window.removeEventListener('resize', sync) }
  }, [])
  return <div className="scroll-progress"><i style={{ width: `${progress}%` }} /></div>
}

function Header({ route }: { route: RouteKey }) {
  const [open, setOpen] = useState(false)
  const links: Array<[RouteKey, string]> = [['solutions', 'Solutions'], ['services', 'Services'], ['industries', 'Industries'], ['work', 'Work'], ['company', 'Company'], ['careers', 'Careers']]
  useEffect(() => setOpen(false), [route])
  return <header className="site-header"><ScrollProgress /><div className="nav-shell"><Logo /><nav className={open ? 'nav-menu open' : 'nav-menu'}>{links.map(([key, label]) => <a key={key} href={`#/${key}`} className={route === key ? 'active' : ''}>{label}</a>)}</nav><div className="nav-actions"><a className="nav-contact" href="#/contact">Contact</a><a className="nav-cta" href="#/contact">Start a project <Arrow /></a><button className="menu-toggle" type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)}><span /><span /></button></div></div></header>
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <Reveal className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{copy && <p>{copy}</p>}</Reveal>
}

function HeroVisual() {
  const reduced = useReducedMotion()
  const [mode, setMode] = useState(0)
  const modes = [
    { name: 'Operations', label: 'Business intelligence', metrics: [['Automated tasks', '12,840', '+18.4%'], ['Active users', '4,219', '+9.2%'], ['System uptime', '99.98%', 'Healthy']] },
    { name: 'Automation', label: 'AI workflow engine', metrics: [['Requests routed', '8,421', '+24.1%'], ['Rules active', '128', 'Stable'], ['Avg. response', '1.8s', 'Fast']] },
    { name: 'Commerce', label: 'Customer experience', metrics: [['Catalog items', '10K+', 'Ready'], ['Journeys', '24', 'Optimized'], ['Channels', '3', 'Connected']] },
  ]

  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(() => setMode((current) => (current + 1) % modes.length), 4200)
    return () => window.clearInterval(timer)
  }, [reduced, modes.length])

  const active = modes[mode]
  return <div className="hero-visual" aria-label="Interactive Smart System product preview"><div className="visual-glow visual-glow-a" /><div className="visual-glow visual-glow-b" /><div className="command-window"><div className="command-top"><div className="window-dots"><i /><i /><i /></div><span>SMART SYSTEM / CONTROL CENTER</span><b>Live</b></div><div className="visual-mode-tabs">{modes.map((item, index) => <button key={item.name} className={mode === index ? 'active' : ''} onClick={() => setMode(index)}>{item.name}</button>)}</div><div className="command-layout"><aside className="command-side"><div className="side-logo">S</div><i className="active" /><i /><i /><i /><i /></aside><main className="command-main"><div className="command-head"><div><small>{active.name} overview</small><strong>{active.label}</strong></div><button>Last 30 days</button></div><div className="metric-grid">{active.metrics.map(([title, value, change]) => <article key={title}><span>{title}</span><strong>{value}</strong><small>{change}</small></article>)}</div><div className="command-lower"><div className="chart-panel"><div className="panel-head"><span>Performance</span><small>Realtime</small></div><div className="bar-chart">{[38,58,44,76,62,88,70,96,73,82,91,68].map((height, index) => <i key={`${mode}-${index}`} style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }} />)}</div></div><div className="workflow-panel"><div className="panel-head"><span>Smart workflow</span><small className="status-ok">Running</small></div><div className="flow-step active"><b>01</b><div><strong>Signal received</strong><span>Input connected</span></div><i>✓</i></div><div className="flow-connector" /><div className="flow-step active"><b>02</b><div><strong>AI processing</strong><span>Context analyzed</span></div><i>✓</i></div><div className="flow-connector" /><div className="flow-step"><b>03</b><div><strong>Action routed</strong><span>Workflow ready</span></div><i>→</i></div></div></div></main></div></div><div className="floating-card float-card-a"><span>Automation layer</span><strong>Connected systems</strong></div><div className="floating-card float-card-b"><span>Platform health</span><strong>All services online</strong></div></div>
}

function MiniVisual({ type }: { type: Solution['visual'] }) {
  if (type === 'automation') return <div className="mini-visual automation-mini"><div><b>Trigger</b><span>New request</span></div><i /><div className="pulse-node"><b>AI</b><span>Analyze</span></div><i /><div><b>Action</b><span>Route task</span></div></div>
  if (type === 'commerce') return <div className="mini-visual commerce-mini">{[1,2,3].map((item) => <div key={item}><i /><span /><b /></div>)}</div>
  return <div className="mini-visual platform-mini"><aside><i /><i /><i /></aside><main><div className="mini-metrics"><i /><i /><i /></div><div className="mini-chart">{[28,42,35,64,52,78,66,90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></main></div>
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  return <Reveal delay={index * 90}><article className="solution-card"><div className="solution-card-head"><span>{solution.code}</span><Arrow /></div><div className="solution-icon"><span>{solution.title.charAt(0)}</span></div><h3>{solution.title}</h3><p>{solution.copy}</p><div className="pill-row">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><MiniVisual type={solution.visual} /></article></Reveal>
}

function TechMarquee() {
  const items = [...stack, ...stack]
  return <section className="stack-strip" aria-label="Technology capabilities"><div className="stack-track">{items.map((item, index) => <span key={`${item}-${index}`}><i />{item}</span>)}</div></section>
}

function ProcessSection() {
  const [active, setActive] = useState(0)
  return <section className="process-band"><div className="section"><SectionTitle eyebrow="Delivery system" title="A clear path from business problem to working product." copy="Every phase has a purpose, an output and a clear handoff into the next one." /><Reveal className="process-console"><div className="process-rail">{processSteps.map(([number, title], index) => <button key={number} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>{number}</span><strong>{title}</strong><i /></button>)}</div><div className="process-detail"><div><span className="process-code">PHASE {processSteps[active][0]}</span><h3>{processSteps[active][1]}</h3><p>{processSteps[active][2]}</p><div className="process-checks"><span>Clear output</span><span>Direct feedback</span><span>Ready for next phase</span></div></div><div className="process-orbit"><i /><i /><i /><b>{active + 1}</b></div></div></Reveal></div></section>
}

function HomePage() {
  return <>
    <section className="hero-section"><div className="hero-inner"><Reveal className="hero-copy"><span className="hero-badge"><i /> Technology for modern business</span><h1>We build <em>digital systems</em> that make companies work smarter.</h1><p>Smart System combines product design, frontend engineering and AI to create modern platforms, automations and customer experiences.</p><div className="hero-actions"><a className="btn btn-primary" href="#/solutions">Explore solutions <Arrow /></a><a className="btn btn-ghost" href="#/contact">Discuss a project</a></div><div className="hero-points"><span>✓ Product strategy</span><span>✓ UI / UX systems</span><span>✓ React engineering</span><span>✓ AI integration</span></div></Reveal><Reveal className="hero-visual-wrap" delay={120}><HeroVisual /></Reveal></div></section>
    <section className="signal-strip"><div><small>Core focus</small><strong>Business systems</strong></div><div><small>Built with</small><strong>Design + Engineering + AI</strong></div><div><small>Delivery model</small><strong>Direct collaboration</strong></div><div><small>Designed for</small><strong>Growth & scale</strong></div></section>
    <TechMarquee />
    <section className="section"><SectionTitle eyebrow="Solutions" title="Technology solutions built around real business operations." copy="Not generic pages. We design systems that improve workflows, customer experience and the way teams use information." /><div className="solutions-grid">{solutions.map((solution, index) => <SolutionCard key={solution.code} solution={solution} index={index} />)}</div></section>
    <section className="capabilities-section"><div className="section dark-inner"><SectionTitle eyebrow="Capabilities" title="One company across product, design, engineering and AI." copy="The work stays connected from the business requirement to the final interface and technical system." /><div className="capabilities-grid">{services.slice(0,4).map(([title, copy], index) => <Reveal key={title} delay={index * 80}><article><span>0{index + 1}</span><div className="capability-icon">{index + 1}</div><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></div></section>
    <ProcessSection />
    <section className="section"><SectionTitle eyebrow="Industries" title="Flexible technology for different business models." copy="We adapt the same product discipline to the operational reality of each industry." /><div className="industry-grid">{industries.map(([title, copy, label], index) => <Reveal key={title} delay={index * 80}><article><span className="industry-label">{label}</span><div className="industry-art"><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p><a href="#/industries">Explore sector <Arrow /></a></article></Reveal>)}</div></section>
    <section className="work-band"><div className="section"><SectionTitle eyebrow="Selected work" title="A growing portfolio of platforms, commerce and business software." copy="Case studies are part of the company story — not the whole story." /><div className="project-grid">{projects.map(([name, type, copy, visual], index) => <Reveal key={name} delay={index * 90}><article className="project-card"><div className={`project-art ${visual}`}><div className="project-screen"><div className="project-top"><i /><i /><i /></div><div className="project-body"><aside /><main><span /><span /><div><i /><i /><i /></div></main></div></div><b>0{index + 1}</b></div><div className="project-copy"><span>{type}</span><h3>{name}</h3><p>{copy}</p><a href="#/work">View case study <Arrow /></a></div></article></Reveal>)}</div></div></section>
    <section className="section company-split"><Reveal className="company-copy"><span className="eyebrow">Why Smart System</span><h2>Built to act like a technology partner, not a temporary vendor.</h2><p>We look at the complete system: business needs, user experience, frontend architecture, automation opportunities and what happens after launch.</p><a className="btn btn-dark" href="#/company">About the company <Arrow /></a></Reveal><Reveal className="company-board" delay={120}><div><strong>01</strong><span>Direct communication with the people doing the work.</span></div><div><strong>02</strong><span>Design and engineering decisions made together.</span></div><div><strong>03</strong><span>Systems built for maintainability and growth.</span></div><div><strong>04</strong><span>AI used where it creates practical value.</span></div></Reveal></section>
    <section className="careers-preview"><div className="section"><Reveal className="careers-preview-card"><div><span className="eyebrow">Careers</span><h2>Help us build the next chapter of Smart System.</h2><p>We are interested in people who care about quality, ownership and modern product thinking.</p></div><a className="btn btn-light" href="#/careers">View open roles <Arrow /></a></Reveal></div></section>
    <CorporateCTA />
  </>
}

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="page-hero"><Reveal><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></Reveal></section>
}

function SolutionsPage() {
  return <><PageHero eyebrow="Solutions" title="Digital systems for operations, customers and growth." copy="We build focused solutions that solve specific business problems instead of forcing every company into the same template." /><section className="section page-section"><div className="solution-detail-list">{solutions.map((solution, index) => <Reveal key={solution.code} delay={index * 70}><article className="solution-detail"><div className="solution-detail-copy"><span>{solution.code}</span><h2>{solution.title}</h2><p>{solution.copy}</p><div className="pill-row">{solution.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="#/contact">Discuss this solution <Arrow /></a></div><MiniVisual type={solution.visual} /></article></Reveal>)}</div></section><ProcessSection /><CorporateCTA /></>
}

function ServicesPage() {
  return <><PageHero eyebrow="Services" title="The capabilities needed to move from idea to implementation." copy="Use our services individually or combine them as one connected delivery team." /><section className="section page-section service-table">{services.map(([title, copy], index) => <Reveal key={title} delay={index * 60}><article><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div><Arrow /></article></Reveal>)}</section><TechMarquee /><ProcessSection /><CorporateCTA /></>
}

function IndustriesPage() {
  return <><PageHero eyebrow="Industries" title="Technology adapted to the way each business operates." copy="The same product discipline, adapted to the context, customers and operations of each industry." /><section className="section page-section"><div className="industry-grid page-industries">{industries.map(([title, copy, label], index) => <Reveal key={title} delay={index * 70}><article><span className="industry-label">{label}</span><div className="industry-art"><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p><a href="#/contact">Discuss your needs <Arrow /></a></article></Reveal>)}</div><Reveal className="industry-matrix"><div><span>Customer experience</span><b>Web + commerce</b></div><div><span>Internal operations</span><b>Portals + dashboards</b></div><div><span>Repetitive workflows</span><b>AI + automation</b></div><div><span>Decision support</span><b>Data + analytics</b></div></Reveal></section><CorporateCTA /></>
}

function WorkPage() {
  return <><PageHero eyebrow="Work" title="Selected digital products and platform experiences." copy="A growing portfolio across commerce, SaaS and digital platforms." /><section className="work-band page-work"><div className="section page-section"><div className="project-grid">{projects.map(([name, type, copy, visual], index) => <Reveal key={name} delay={index * 90}><article className="project-card"><div className={`project-art ${visual}`}><div className="project-screen"><div className="project-top"><i /><i /><i /></div><div className="project-body"><aside /><main><span /><span /><div><i /><i /><i /></div></main></div></div><b>0{index + 1}</b></div><div className="project-copy"><span>{type}</span><h3>{name}</h3><p>{copy}</p><a href="#/contact">Discuss a similar project <Arrow /></a></div></article></Reveal>)}</div><Reveal className="work-note"><span>How we approach work</span><strong>Business goal → product system → interface → scalable frontend</strong></Reveal></div></section><CorporateCTA /></>
}

function CompanyPage() {
  return <><PageHero eyebrow="Company" title="A technology company built around clarity, ownership and useful systems." copy="Smart System brings product thinking, frontend engineering and AI capability together in one focused team." /><section className="section company-page-grid"><Reveal><h2>We want to become a long-term technology partner for growing businesses.</h2></Reveal><Reveal delay={100}><p>Our goal is not to produce isolated screens or short-lived websites. We want to understand how a business works, identify where technology can create value and build systems that remain useful as the company grows.</p><p>That means organized delivery, maintainable frontend architecture, practical design decisions and direct communication throughout the project.</p></Reveal></section><section className="leadership-band"><div className="section"><SectionTitle eyebrow="Founding team" title="Two responsibilities. One connected company." copy="The founding structure keeps product, technology and delivery close to every project." /><div className="leadership-grid"><Reveal><article><div className="leader-visual leader-one"><span>MW</span><i /><i /></div><small>Co-founder / Product & Technology</small><h3>Mohammed Waleed</h3><p>Frontend engineering, digital product systems and AI.</p></article></Reveal><Reveal delay={100}><article><div className="leader-visual leader-two"><span>SS</span><i /><i /></div><small>Co-founder / Business & Delivery</small><h3>Co-founder</h3><p>Business development, project delivery and company operations.</p></article></Reveal></div></div></section><section className="principles-band"><div className="section"><SectionTitle eyebrow="Principles" title="How we want to operate as a company." /><div className="principles-grid">{[['Clarity','Clear scope, communication and interfaces.'],['Ownership','Responsibility for the outcome, not only the task.'],['Practicality','Technology choices that solve real needs.'],['Growth','Systems designed for the next stage of the business.']].map(([title, copy], index) => <Reveal key={title} delay={index * 70}><article><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></div></section><CorporateCTA /></>
}

function CareersPage() {
  const culture = [['Own the outcome', 'Take responsibility beyond the ticket.'], ['Care about craft', 'Quality is visible in the small decisions.'], ['Keep learning', 'Technology changes; curiosity stays useful.']]
  return <><PageHero eyebrow="Careers" title="Join a team building the foundation of a modern technology company." copy="We are interested in people who care about quality, take ownership and enjoy solving real product problems." /><section className="section culture-section"><SectionTitle eyebrow="Working at Smart System" title="A small team with high ownership." /><div className="culture-grid">{culture.map(([title, copy], index) => <Reveal key={title} delay={index * 70}><article><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></section><section className="section page-section careers-list"><div className="careers-head"><h2>Open positions</h2><span>{jobs.length} roles</span></div>{jobs.map(([title, department, location], index) => <Reveal key={title} delay={index * 60}><a className="career-row" href="#/contact"><div><small>{department}</small><h3>{title}</h3></div><span>{location}</span><Arrow /></a></Reveal>)}<Reveal><div className="open-application"><div><small>Open application</small><h3>Think you can add value to Smart System?</h3></div><p>Send your CV, portfolio or GitHub profile and tell us where you can contribute.</p><a href="#/contact">Contact us <Arrow /></a></div></Reveal></section><section className="hiring-band"><div className="section"><SectionTitle eyebrow="Hiring process" title="Simple, direct and focused on how you think." /><div className="hiring-steps">{[['01','Introduction'],['02','Practical discussion'],['03','Role fit'],['04','Decision']].map(([number,title], index) => <Reveal key={number} delay={index * 60}><div><span>{number}</span><strong>{title}</strong></div></Reveal>)}</div></div></section></>
}

function ContactPage() {
  return <section className="contact-page"><Reveal className="contact-intro"><span className="eyebrow">Contact</span><h1>Tell us what your business needs to improve.</h1><p>Share the challenge, process or digital product you want to build. We can start from the business problem and define the right next step.</p><div className="contact-details"><div><span>Best starting point</span><strong>Project brief</strong></div><div><span>Current status</span><strong>Accepting selected projects</strong></div><div><span>Typical topics</span><strong>Platforms · AI · Commerce</strong></div></div></Reveal><Reveal delay={120}><form className="contact-form" onSubmit={(event) => event.preventDefault()}><div className="form-row"><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@company.com" /></label></div><label>Company<input placeholder="Company name" /></label><label>What do you need?<select defaultValue=""><option value="" disabled>Select a service</option><option>Digital platform</option><option>AI & automation</option><option>E-commerce</option><option>UI / UX design</option><option>Technical consulting</option></select></label><label>Project details<textarea rows={7} placeholder="Tell us about the challenge, goals and timing..." /></label><button className="btn btn-primary" type="submit">Send project brief <Arrow /></button><small>Frontend demo only — submission will be connected when the backend is ready.</small></form></Reveal></section>
}

function CorporateCTA() {
  return <section className="cta-wrap"><Reveal className="cta-card"><div><span className="eyebrow">Start a project</span><h2>Have a business challenge that technology can solve?</h2><p>Tell us what you are trying to improve and we will help define the right digital approach.</p></div><a className="btn btn-light" href="#/contact">Talk to Smart System <Arrow /></a></Reveal></section>
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div className="footer-brand"><Logo /><p>Digital platforms, modern frontend and practical AI solutions for growing businesses.</p><span className="footer-status"><i /> Accepting selected projects</span></div><div className="footer-columns"><div><strong>Company</strong><a href="#/company">About</a><a href="#/work">Work</a><a href="#/careers">Careers</a></div><div><strong>Capabilities</strong><a href="#/solutions">Solutions</a><a href="#/services">Services</a><a href="#/industries">Industries</a></div><div><strong>Start</strong><a href="#/contact">Project brief</a><a href="#/contact">Contact</a></div></div></div><div className="footer-bottom"><span>© 2026 Smart System</span><span>Technology built with purpose.</span></div></footer>
}

function App() {
  const [route, setRoute] = useState<RouteKey>(currentRoute())
  useEffect(() => {
    const sync = () => { setRoute(currentRoute()); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const page = useMemo(() => ({ home: <HomePage />, solutions: <SolutionsPage />, services: <ServicesPage />, industries: <IndustriesPage />, work: <WorkPage />, company: <CompanyPage />, careers: <CareersPage />, contact: <ContactPage /> })[route], [route])
  return <div className="app"><Header route={route} /><main key={route} className="page-transition">{page}</main>{route !== 'contact' && <Footer />}</div>
}

export default App
