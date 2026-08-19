import { useEffect, useMemo, useState, type ReactNode } from 'react'
import './App.css'

type RouteKey = 'home' | 'solutions' | 'services' | 'industries' | 'work' | 'company' | 'careers' | 'contact'
type IconName = 'layers' | 'spark' | 'cart' | 'chart' | 'code' | 'design' | 'automation' | 'shield' | 'retail' | 'briefcase' | 'finance' | 'rocket' | 'arrow' | 'check' | 'people' | 'clock' | 'globe'

type Solution = {
  icon: IconName
  title: string
  copy: string
  points: string[]
  visual: 'platform' | 'automation' | 'commerce' | 'analytics'
}

type CaseStudy = {
  title: string
  category: string
  copy: string
  tags: string[]
  theme: 'purple' | 'blue' | 'cyan'
}

const solutions: Solution[] = [
  {
    icon: 'layers',
    title: 'Business Platforms',
    copy: 'Customer portals, internal systems and web products designed around real workflows.',
    points: ['Portals & dashboards', 'Internal tools', 'SaaS products'],
    visual: 'platform',
  },
  {
    icon: 'spark',
    title: 'AI & Automation',
    copy: 'Practical AI that reduces repetitive work and helps teams move faster with better information.',
    points: ['AI assistants', 'Workflow automation', 'Smart search'],
    visual: 'automation',
  },
  {
    icon: 'cart',
    title: 'Commerce Systems',
    copy: 'Digital commerce experiences built for clear discovery, ordering and customer operations.',
    points: ['E-commerce', 'Catalog systems', 'Order experiences'],
    visual: 'commerce',
  },
  {
    icon: 'chart',
    title: 'Data & Operations',
    copy: 'Clear dashboards and operational views that turn business activity into useful decisions.',
    points: ['Analytics', 'Reporting', 'Operational dashboards'],
    visual: 'analytics',
  },
]

const services = [
  { icon: 'design' as IconName, title: 'Product & UI/UX Design', copy: 'Product structure, user journeys, responsive interfaces and design systems.' },
  { icon: 'code' as IconName, title: 'Frontend Engineering', copy: 'Modern React interfaces built for performance, maintainability and growth.' },
  { icon: 'automation' as IconName, title: 'AI Integration', copy: 'AI features and automations connected to useful business workflows.' },
  { icon: 'shield' as IconName, title: 'Technical Consulting', copy: 'Architecture, product reviews and practical guidance for digital initiatives.' },
]

const industries = [
  { icon: 'retail' as IconName, title: 'Retail & Commerce', copy: 'Storefronts, catalogs, order flows and customer-facing systems.' },
  { icon: 'briefcase' as IconName, title: 'Professional Services', copy: 'Client portals, internal operations and digital service experiences.' },
  { icon: 'finance' as IconName, title: 'Finance & Operations', copy: 'Dashboards, workflows, reporting and structured business systems.' },
  { icon: 'rocket' as IconName, title: 'Startups & New Ventures', copy: 'From first product definition to launch-ready frontend experience.' },
]

const caseStudies: CaseStudy[] = [
  {
    title: 'Flamingo Park',
    category: 'Commerce',
    copy: 'A premium retail experience focused on product discovery, speed and a smooth customer journey.',
    tags: ['React', 'Commerce', 'Responsive UI'],
    theme: 'purple',
  },
  {
    title: 'LedgerPro',
    category: 'Business Software',
    copy: 'A SaaS operations product that turns complex business workflows into a clear working system.',
    tags: ['SaaS', 'Dashboard', 'Product UI'],
    theme: 'blue',
  },
  {
    title: 'Kayan',
    category: 'Digital Platform',
    copy: 'A platform experience designed around trusted connections, structured journeys and scale.',
    tags: ['Platform', 'UX', 'Frontend'],
    theme: 'cyan',
  },
]

const jobs = [
  { title: 'Frontend Developer', department: 'Engineering', type: 'Remote / Hybrid' },
  { title: 'UI/UX Designer', department: 'Design', type: 'Remote' },
  { title: 'AI Engineer', department: 'AI & Automation', type: 'Remote / Hybrid' },
]

function getRoute(): RouteKey {
  const value = window.location.hash.replace('#/', '').trim()
  const allowed: RouteKey[] = ['solutions', 'services', 'industries', 'work', 'company', 'careers', 'contact']
  return allowed.includes(value as RouteKey) ? (value as RouteKey) : 'home'
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<IconName, ReactNode> = {
    layers: <><path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></>,
    spark: <><path d="m12 3-1.2 4.2a5.5 5.5 0 0 1-3.6 3.6L3 12l4.2 1.2a5.5 5.5 0 0 1 3.6 3.6L12 21l1.2-4.2a5.5 5.5 0 0 1 3.6-3.6L21 12l-4.2-1.2a5.5 5.5 0 0 1-3.6-3.6L12 3Z"/></>,
    cart: <><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></>,
    chart: <><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></>,
    code: <><path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/></>,
    design: <><path d="M4 20h16"/><path d="M7 16 17 6l1 1a2 2 0 0 1 0 3L10 18l-4 1 1-3Z"/><path d="m14 9 3 3"/></>,
    automation: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    retail: <><path d="M4 9h16l-1-5H5L4 9Z"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></>,
    finance: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10"/><path d="M7 12h4"/><path d="M7 16h3"/><path d="M15 12h2v4h-2z"/></>,
    rocket: <><path d="M14 4c3-3 6-2 6-2s1 3-2 6l-6 6-4-4 6-6Z"/><path d="m8 10-4 1-2 3 5 1"/><path d="m12 14 1 4-3 2-1-5"/><circle cx="16" cy="6" r="1"/></>,
    arrow: <><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function Logo() {
  return (
    <a className="brand" href="#/" aria-label="Smart System home">
      <span className="brand-icon"><i /><i /><b /></span>
      <span className="brand-text"><strong>Smart System</strong><small>Technology Company</small></span>
    </a>
  )
}

function Header({ route }: { route: RouteKey }) {
  const [open, setOpen] = useState(false)
  const items: Array<[RouteKey, string]> = [
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
          {items.map(([key, label]) => <a key={key} className={route === key ? 'active' : ''} href={`#/${key}`}>{label}</a>)}
        </nav>
        <div className="nav-right">
          <a className="nav-contact" href="#/contact">Contact</a>
          <a className="nav-cta" href="#/contact">Start a project <Icon name="arrow" size={16} /></a>
        </div>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}><span /><span /></button>
      </div>
    </header>
  )
}

function SectionTitle({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: ReactNode }) {
  return (
    <div className="section-title">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      <div className="section-side">{copy && <p>{copy}</p>}{action}</div>
    </div>
  )
}

function SystemVisual() {
  return (
    <div className="system-visual" aria-hidden="true">
      <div className="visual-shell">
        <div className="visual-topbar"><div className="dots"><i /><i /><i /></div><span>SMART SYSTEM / CONTROL CENTER</span><b>Live</b></div>
        <div className="visual-body">
          <aside className="visual-sidebar"><div className="mini-logo"/><i className="active"/><i/><i/><i/><i/></aside>
          <div className="visual-main">
            <div className="visual-heading"><div><span>Business overview</span><strong>Good morning.</strong></div><button>August 2026</button></div>
            <div className="metric-row">
              <div><span>Active workflows</span><strong>24</strong><small>+12%</small></div>
              <div><span>Automation rate</span><strong>78%</strong><small>+8%</small></div>
              <div><span>System health</span><strong>99.9%</strong><small>Stable</small></div>
            </div>
            <div className="visual-lower">
              <div className="chart-card"><div className="chart-head"><span>Operations</span><b>This month</b></div><div className="chart-bars">{[48,68,56,82,65,91,74,88,69,96,84,92].map((height, index)=><i key={index} style={{height:`${height}%`}} />)}</div><div className="chart-line"><span/><span/><span/><span/><span/></div></div>
              <div className="activity-card"><div className="activity-head"><span>Automation flow</span><b>Running</b></div><div className="flow-item"><i>01</i><div><strong>Customer request</strong><span>Captured</span></div><b>✓</b></div><div className="flow-line"/><div className="flow-item"><i>02</i><div><strong>AI processing</strong><span>Classified</span></div><b>✓</b></div><div className="flow-line"/><div className="flow-item active"><i>03</i><div><strong>Team action</strong><span>In progress</span></div><b>→</b></div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="visual-float visual-float-one"><Icon name="spark" size={17}/><div><span>AI workflow</span><strong>Automation ready</strong></div></div>
      <div className="visual-float visual-float-two"><Icon name="chart" size={17}/><div><span>Performance</span><strong>+32% efficiency</strong></div></div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge"><i/> Technology for modern business</div>
          <h1>We build digital systems that help companies <em>work smarter.</em></h1>
          <p>Smart System designs and develops modern web platforms, AI-powered workflows and digital products built around real business needs.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#/solutions">Explore solutions <Icon name="arrow" size={17}/></a><a className="btn btn-ghost" href="#/contact">Discuss a project</a></div>
          <div className="hero-points"><span><Icon name="check" size={15}/> Product strategy</span><span><Icon name="check" size={15}/> Frontend engineering</span><span><Icon name="check" size={15}/> AI integration</span></div>
        </div>
        <SystemVisual />
      </div>
      <div className="hero-strip"><div><Icon name="layers" size={17}/><span>Business platforms</span></div><div><Icon name="automation" size={17}/><span>AI automation</span></div><div><Icon name="cart" size={17}/><span>Digital commerce</span></div><div><Icon name="chart" size={17}/><span>Data & operations</span></div></div>
    </section>
  )
}

function SolutionMiniVisual({ type }: { type: Solution['visual'] }) {
  if (type === 'platform') return <div className="mini-visual platform-ui"><aside><i/><i/><i/><i/></aside><main><div className="mini-head"><span/><b/></div><div className="mini-metrics"><i/><i/><i/></div><div className="mini-table"><span/><span/><span/><span/></div></main></div>
  if (type === 'automation') return <div className="mini-visual automation-ui"><div className="auto-node"><Icon name="spark" size={18}/><span>AI</span></div><i/><div className="auto-node"><Icon name="automation" size={18}/><span>Route</span></div><i/><div className="auto-node"><Icon name="check" size={18}/><span>Done</span></div></div>
  if (type === 'commerce') return <div className="mini-visual commerce-ui"><div className="commerce-card"><div/><span/><b/></div><div className="commerce-card"><div/><span/><b/></div><div className="commerce-card"><div/><span/><b/></div></div>
  return <div className="mini-visual analytics-ui"><div className="analytics-top"><span/><span/></div><div className="analytics-chart">{[30,54,42,72,58,88,68,94].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="analytics-foot"><span/><span/><span/></div></div>
}

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="solution-card">
      <div className="solution-card-top"><div className="solution-icon"><Icon name={solution.icon}/></div><Icon name="arrow" size={18}/></div>
      <h3>{solution.title}</h3>
      <p>{solution.copy}</p>
      <SolutionMiniVisual type={solution.visual}/>
      <ul>{solution.points.map((point)=><li key={point}><Icon name="check" size={14}/>{point}</li>)}</ul>
    </article>
  )
}

function WorkPreview() {
  return (
    <div className="case-grid">
      {caseStudies.map((item, index) => (
        <article className="case-card" key={item.title}>
          <div className={`case-visual ${item.theme}`}>
            <div className="case-browser"><div className="case-browser-head"><i/><i/><i/></div><div className="case-browser-body"><aside><span/><span/><span/><span/></aside><main><div className="case-ui-title"><i/><b/></div><div className="case-ui-hero"><span/><span/></div><div className="case-ui-grid"><i/><i/><i/></div></main></div></div>
            <span className="case-count">0{index + 1}</span>
          </div>
          <div className="case-content"><span>{item.category}</span><h3>{item.title}</h3><p>{item.copy}</p><div>{item.tags.map((tag)=><i key={tag}>{tag}</i>)}</div></div>
        </article>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <section className="section section-solutions">
        <SectionTitle eyebrow="Solutions" title="Technology built around the way your business works." copy="We combine product thinking, engineering and AI to create systems that solve practical business problems." action={<a className="text-link" href="#/solutions">All solutions <Icon name="arrow" size={16}/></a>} />
        <div className="solutions-grid">{solutions.map((solution)=><SolutionCard key={solution.title} solution={solution}/>)}</div>
      </section>

      <section className="dark-section">
        <div className="section dark-inner">
          <SectionTitle eyebrow="Capabilities" title="One team across design, engineering and intelligent automation." copy="You do not need separate teams for product design, frontend and AI. We keep the work connected from idea to implementation." />
          <div className="capabilities-grid">{services.map((service, index)=><article key={service.title}><span>0{index+1}</span><div className="capability-icon"><Icon name={service.icon}/></div><h3>{service.title}</h3><p>{service.copy}</p><a href="#/services">Learn more <Icon name="arrow" size={15}/></a></article>)}</div>
        </div>
      </section>

      <section className="section industry-section">
        <SectionTitle eyebrow="Industries" title="Flexible solutions for different business models." copy="The technology changes with the business context, while the same product discipline stays consistent." />
        <div className="industry-grid">{industries.map((industry)=><article key={industry.title}><div className="industry-icon"><Icon name={industry.icon}/></div><div><h3>{industry.title}</h3><p>{industry.copy}</p></div><Icon name="arrow" size={18}/></article>)}</div>
      </section>

      <section className="work-section">
        <div className="section">
          <SectionTitle eyebrow="Selected work" title="A few products and systems we are building." copy="Our work spans commerce, business software and digital platforms." action={<a className="text-link" href="#/work">View case studies <Icon name="arrow" size={16}/></a>} />
          <WorkPreview />
        </div>
      </section>

      <section className="section engage-section">
        <SectionTitle eyebrow="How we can help" title="Choose the engagement that matches your stage." />
        <div className="engage-grid">
          <article><span className="engage-number">01</span><div className="engage-icon"><Icon name="rocket"/></div><h3>Build something new</h3><p>Define, design and build a new digital product or platform from the ground up.</p><ul><li>Product definition</li><li>UI/UX system</li><li>Frontend build</li></ul></article>
          <article><span className="engage-number">02</span><div className="engage-icon"><Icon name="layers"/></div><h3>Modernize a system</h3><p>Improve an existing experience that feels dated, fragmented or difficult to maintain.</p><ul><li>UX audit</li><li>Interface redesign</li><li>Frontend modernization</li></ul></article>
          <article><span className="engage-number">03</span><div className="engage-icon"><Icon name="automation"/></div><h3>Automate operations</h3><p>Use AI and workflow automation to remove repetitive tasks and speed up team operations.</p><ul><li>Workflow analysis</li><li>AI integration</li><li>Automation design</li></ul></article>
        </div>
      </section>

      <section className="company-highlight">
        <div className="company-visual"><div className="company-grid-art"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="company-badge"><Icon name="people"/><div><span>Focused team</span><strong>Direct ownership</strong></div></div></div>
        <div className="company-copy"><span className="eyebrow">Why Smart System</span><h2>A technology partner, not just a website vendor.</h2><p>We care about the whole system: the business need, the user experience, the technical structure and what happens after launch.</p><div className="company-list"><div><Icon name="check"/><span>Direct communication with the people doing the work</span></div><div><Icon name="check"/><span>Design and engineering decisions made together</span></div><div><Icon name="check"/><span>Systems designed for maintainability and growth</span></div></div><a className="btn btn-dark" href="#/company">About Smart System <Icon name="arrow" size={16}/></a></div>
      </section>

      <CTA />
    </>
  )
}

function PageHero({ eyebrow, title, copy, meta }: { eyebrow: string; title: string; copy: string; meta?: ReactNode }) {
  return <section className="page-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>{meta && <div className="page-hero-meta">{meta}</div>}</section>
}

function SolutionsPage() {
  return <><PageHero eyebrow="Solutions" title="Digital systems for customers, operations and growth." copy="We build focused technology solutions around specific business problems rather than forcing every company into the same template." meta={<><div><span>4</span><small>Core solutions</small></div><div><span>1</span><small>Connected team</small></div></>}/><section className="section page-section"><div className="solutions-grid page-solutions">{solutions.map((solution)=><SolutionCard key={solution.title} solution={solution}/>)}</div></section><section className="outcome-section"><div className="section outcome-inner"><div><span className="eyebrow">What changes</span><h2>Better systems should create visible operational improvement.</h2></div><div className="outcome-grid"><article><strong>01</strong><h3>Less manual work</h3><p>Reduce repetitive tasks and duplicated effort.</p></article><article><strong>02</strong><h3>Clearer information</h3><p>Put the right data in front of the right people.</p></article><article><strong>03</strong><h3>Better customer journeys</h3><p>Make digital interactions easier and more trustworthy.</p></article><article><strong>04</strong><h3>Room to scale</h3><p>Build frontend systems that can evolve with the business.</p></article></div></div></section><CTA /></>
}

function ServicesPage() {
  return <><PageHero eyebrow="Services" title="The capabilities to take a digital initiative from idea to implementation." copy="Use one capability or combine them as one connected delivery team."/><section className="section page-section"><div className="services-feature-grid">{services.map((service,index)=><article key={service.title}><div className="service-feature-head"><span>0{index+1}</span><div className="service-feature-icon"><Icon name={service.icon}/></div></div><h2>{service.title}</h2><p>{service.copy}</p><div className="service-feature-tags"><i>Strategy</i><i>Design</i><i>Build</i></div></article>)}</div></section><section className="process-band"><div className="section"><SectionTitle eyebrow="Delivery process" title="A clear path from problem to working product."/><div className="process-line">{['Discover','Define','Design','Build','Refine'].map((step,index)=><div key={step}><span>0{index+1}</span><i/><strong>{step}</strong></div>)}</div></div></section><CTA /></>
}

function IndustriesPage() {
  return <><PageHero eyebrow="Industries" title="Technology adapted to the way each business operates." copy="We bring the same product and engineering discipline while adapting the solution to each industry context."/><section className="section page-section"><div className="industry-page-grid">{industries.map((industry,index)=><article key={industry.title}><div className="industry-page-top"><span>0{index+1}</span><div className="industry-icon"><Icon name={industry.icon}/></div></div><h2>{industry.title}</h2><p>{industry.copy}</p><div className="industry-ui"><div/><div/><div/></div><a href="#/contact">Discuss your needs <Icon name="arrow" size={16}/></a></article>)}</div></section><CTA /></>
}

function WorkPage() {
  return <><PageHero eyebrow="Work" title="Digital products and systems designed around real use." copy="Selected work across commerce, SaaS and digital platform experiences."/><section className="section page-section"><WorkPreview /></section><section className="project-principles"><div className="section"><SectionTitle eyebrow="Our standard" title="Every project should be clear, fast and built to last."/><div className="principles-row"><div><Icon name="design"/><span>Clear user experience</span></div><div><Icon name="code"/><span>Maintainable frontend</span></div><div><Icon name="clock"/><span>Practical delivery</span></div><div><Icon name="chart"/><span>Business relevance</span></div></div></div></section><CTA /></>
}

function CompanyPage() {
  return <><PageHero eyebrow="Company" title="A focused technology company built around ownership and useful work." copy="Smart System brings product thinking, frontend engineering and AI capability into one practical team." meta={<><div><span>02</span><small>Founding team</small></div><div><span>∞</span><small>Room to grow</small></div></>}/><section className="section company-story"><div className="story-visual"><div className="story-block large">SMART<br/>SYSTEM</div><div className="story-block small"><Icon name="globe" size={26}/><span>Digital first</span></div><div className="story-block small accent"><Icon name="spark" size={26}/><span>AI capable</span></div></div><div className="story-copy"><span className="eyebrow">Our direction</span><h2>We want to become a long-term technology partner for ambitious businesses.</h2><p>That means understanding how a company works before deciding what to build, keeping communication direct and making technical decisions with the future in mind.</p><p>We are starting focused, building a strong standard of work and growing the company around quality rather than unnecessary layers.</p></div></section><section className="team-section"><div className="section"><SectionTitle eyebrow="Founding team" title="Small by design. Direct by default."/><div className="team-grid"><article><div className="team-avatar avatar-one">MW</div><div><span>Co-founder</span><h3>Mohammed Waleed</h3><p>Frontend engineering, digital products and AI.</p></div></article><article><div className="team-avatar avatar-two">SS</div><div><span>Co-founder</span><h3>Partner profile</h3><p>Business, delivery and technology.</p></div></article></div></div></section><section className="section values-section"><SectionTitle eyebrow="Principles" title="How we want Smart System to operate."/><div className="values-grid"><article><span>01</span><h3>Clarity</h3><p>Clear scope, communication and product decisions.</p></article><article><span>02</span><h3>Ownership</h3><p>Responsibility for the quality of the final outcome.</p></article><article><span>03</span><h3>Practicality</h3><p>Technology choices tied to real business value.</p></article><article><span>04</span><h3>Growth</h3><p>Systems designed with the next stage in mind.</p></article></div></section><CTA /></>
}

function CareersPage() {
  return <><PageHero eyebrow="Careers" title="Join a team building the foundation of a modern technology company." copy="We value ownership, curiosity, strong fundamentals and people who care about the final product."/><section className="section careers-benefits"><SectionTitle eyebrow="Working here" title="A small team means your work is visible."/><div className="benefits-grid"><article><Icon name="people"/><h3>Direct ownership</h3><p>Work close to the product and the decisions that shape it.</p></article><article><Icon name="rocket"/><h3>Room to grow</h3><p>Join early and help shape the way the company operates.</p></article><article><Icon name="clock"/><h3>Flexible work</h3><p>Remote-friendly collaboration focused on outcomes.</p></article></div></section><section className="jobs-section"><div className="section"><div className="jobs-head"><div><span className="eyebrow">Open roles</span><h2>Current opportunities</h2></div><span>{jobs.length} positions</span></div><div className="jobs-list">{jobs.map((job)=><a key={job.title} href="#/contact"><div><small>{job.department}</small><h3>{job.title}</h3></div><span>{job.type}</span><Icon name="arrow" size={18}/></a>)}</div><div className="open-application"><div><span>Open application</span><h3>Do not see your role?</h3></div><p>Send your CV, portfolio or GitHub and tell us where you can add value.</p><a className="btn btn-dark" href="#/contact">Introduce yourself <Icon name="arrow" size={16}/></a></div></div></section></>
}

function ContactPage() {
  return <section className="contact-page"><div className="contact-side"><Logo/><div><span className="eyebrow">Contact</span><h1>Tell us what you want to improve or build.</h1><p>Share the business challenge, current process or digital product you have in mind. We can start from there.</p></div><div className="contact-info"><div><span>Email</span><strong>hello@smartsystem.dev</strong></div><div><span>Availability</span><strong>Accepting selected projects</strong></div><div><span>Working model</span><strong>Remote / Hybrid</strong></div></div></div><div className="contact-form-wrap"><a className="back-home" href="#/">← Back to website</a><form onSubmit={(event)=>event.preventDefault()}><div className="form-heading"><span>Project brief</span><h2>Start a conversation</h2><p>A few details help us understand the right next step.</p></div><div className="form-grid"><label>Name<input placeholder="Your name"/></label><label>Company<input placeholder="Company name"/></label></div><div className="form-grid"><label>Email<input type="email" placeholder="you@company.com"/></label><label>Phone<input placeholder="Optional"/></label></div><label>What do you need?<select defaultValue=""><option value="" disabled>Select a service</option><option>Business platform</option><option>Company website</option><option>AI & automation</option><option>E-commerce</option><option>UI/UX design</option><option>Technical consulting</option></select></label><label>Project details<textarea rows={6} placeholder="What are you trying to build or improve?"/></label><div className="form-grid"><label>Estimated timeline<select defaultValue=""><option value="" disabled>Select timeline</option><option>As soon as possible</option><option>1–2 months</option><option>3–6 months</option><option>Still planning</option></select></label><label>Budget range<select defaultValue=""><option value="" disabled>Select range</option><option>To be discussed</option><option>Small project</option><option>Medium project</option><option>Large project</option></select></label></div><button className="btn btn-primary submit-btn" type="submit">Send project brief <Icon name="arrow" size={17}/></button><small className="form-note">Frontend demo only — form submission will be connected later.</small></form></div></section>
}

function CTA() {
  return <section className="cta-section"><div className="cta-inner"><div><span>Have a project in mind?</span><h2>Build the next system with Smart System.</h2></div><a className="btn btn-light" href="#/contact">Start a conversation <Icon name="arrow" size={17}/></a></div></section>
}

function Footer() {
  return <footer className="footer"><div className="footer-top"><div className="footer-brand"><Logo/><p>Digital platforms, modern frontend and practical AI solutions for growing businesses.</p></div><div className="footer-col"><span>Company</span><a href="#/company">About</a><a href="#/work">Work</a><a href="#/careers">Careers</a></div><div className="footer-col"><span>Capabilities</span><a href="#/solutions">Solutions</a><a href="#/services">Services</a><a href="#/industries">Industries</a></div><div className="footer-col"><span>Contact</span><a href="#/contact">Start a project</a><a href="mailto:hello@smartsystem.dev">hello@smartsystem.dev</a></div></div><div className="footer-bottom"><span>© 2026 Smart System. All rights reserved.</span><span>Technology Company</span></div></footer>
}

function App() {
  const [route, setRoute] = useState<RouteKey>(getRoute())

  useEffect(() => {
    const sync = () => {
      setRoute(getRoute())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const page = useMemo(() => ({
    home: <HomePage/>,
    solutions: <SolutionsPage/>,
    services: <ServicesPage/>,
    industries: <IndustriesPage/>,
    work: <WorkPage/>,
    company: <CompanyPage/>,
    careers: <CareersPage/>,
    contact: <ContactPage/>,
  })[route], [route])

  if (route === 'contact') return <div className="app">{page}</div>
  return <div className="app"><Header route={route}/><main>{page}</main><Footer/></div>
}

export default App
