import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const REPOSITORY_URL = 'https://github.com/MinhTuan2405/AtelierOS';

type Route = 'home' | 'docs' | 'changelog' | 'demo';

type DemoSurface =
  | 'landing'
  | 'product'
  | 'dashboard'
  | 'ecommerce'
  | 'portfolio'
  | 'editorial'
  | 'redesign'
  | 'audit';

type RoutePlan = {
  profile: {
    label: string;
    file?: string;
  };
  workflow: string[];
  engines: string;
  review: string;
};

const routePlans: Record<DemoSurface, RoutePlan> = {
  landing: {
    profile: { label: 'Landing page', file: 'landing-page' },
    workflow: ['discovery', 'art-direction', 'shape', 'build', 'review', 'ship'],
    engines: 'Taste leads direction · Impeccable shapes and polishes',
    review: 'Conversion hierarchy, differentiation, responsive storytelling',
  },
  product: {
    profile: { label: 'SaaS product', file: 'saas-product' },
    workflow: ['discovery', 'shape', 'build', 'review', 'ship'],
    engines: 'Impeccable leads structure · Taste is selective',
    review: 'Task completion, state coverage, established system fit',
  },
  dashboard: {
    profile: { label: 'Dashboard', file: 'dashboard' },
    workflow: ['discovery', 'shape', 'build', 'review', 'ship'],
    engines: 'Impeccable leads · Taste supports brand character only',
    review: 'Density, scanability, data integrity, narrow-screen strategy',
  },
  ecommerce: {
    profile: { label: 'Ecommerce', file: 'ecommerce' },
    workflow: ['discovery', 'shape', 'build', 'review', 'ship'],
    engines: 'Impeccable leads flow · Taste supports campaign expression',
    review: 'Trust, conversion flow, errors, loading and recovery',
  },
  portfolio: {
    profile: { label: 'Portfolio', file: 'portfolio' },
    workflow: ['discovery', 'art-direction', 'shape', 'build', 'review', 'ship'],
    engines: 'Taste leads narrative · Impeccable validates clarity',
    review: 'Artifact hierarchy, pacing, responsive media, clear contact path',
  },
  editorial: {
    profile: { label: 'Editorial', file: 'editorial' },
    workflow: ['discovery', 'art-direction', 'shape', 'build', 'review', 'ship'],
    engines: 'Taste leads composition · Impeccable protects reading flow',
    review: 'Reading measure, navigation, typography, content hierarchy',
  },
  redesign: {
    profile: { label: 'Inherited product-category profile' },
    workflow: ['redesign', 'review', 'ship'],
    engines: 'Taste explores · Impeccable reshapes · Reviewer consolidates',
    review: 'Preserved behavior, evidence-led changes, regression risk',
  },
  audit: {
    profile: { label: 'Inherited product-category profile' },
    workflow: ['review'],
    engines: 'Design Reviewer owns findings · Engines contribute critique',
    review: 'Severity, root causes, accessibility, implementation quality',
  },
};

const surfaceLabels: Record<DemoSurface, string> = {
  landing: 'Marketing landing page',
  product: 'SaaS product surface',
  dashboard: 'Operational dashboard',
  ecommerce: 'Ecommerce flow',
  portfolio: 'Portfolio or studio site',
  editorial: 'Editorial publication',
  redesign: 'Existing surface redesign',
  audit: 'Design audit only',
};

const navigation: Array<{ route: Route; label: string }> = [
  { route: 'home', label: 'Home' },
  { route: 'docs', label: 'Docs' },
  { route: 'changelog', label: 'Changelog' },
  { route: 'demo', label: 'Live demo' },
];

function currentHashPath() {
  return window.location.hash.replace(/^#\/?/, '');
}

function routeFromPath(path: string): Route {
  const value = path.split('/')[0];
  return value === 'docs' || value === 'changelog' || value === 'demo' ? value : 'home';
}

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function routeHref(route: Route) {
  return route === 'home' ? '#/' : `#/${route}`;
}

function NavLinks({ route, mobile = false }: { route: Route; mobile?: boolean }) {
  const closeMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (mobile) event.currentTarget.closest('details')?.removeAttribute('open');
  };

  return (
    <>
      {navigation.map((item) => (
        <a
          key={item.route}
          href={routeHref(item.route)}
          aria-current={route === item.route ? 'page' : undefined}
          onClick={closeMenu}
        >
          {item.label}
        </a>
      ))}
      <a className="repo-link" href={REPOSITORY_URL} target="_blank" rel="noreferrer">
        GitHub <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}

function SiteHeader({ route, scrolled }: { route: Route; scrolled: boolean }) {
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#/" aria-label="AtelierOS home">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>AtelierOS</span>
        <small>0.1</small>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavLinks route={route} />
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          <NavLinks route={route} mobile />
        </nav>
      </details>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#/">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>AtelierOS</span>
        </a>
        <p>Design agents need direction, memory, and a review gate.</p>
      </div>
      <div className="footer-links">
        <a href="#/docs">Read the docs</a>
        <a href="#/demo">Compose a route</a>
        <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">Source on GitHub</a>
      </div>
      <p className="footer-meta">Open source · Built as a repository-owned system</p>
    </footer>
  );
}

function RouteDiagram() {
  const diagramRef = useRef<HTMLElement>(null);

  const moveDiagram = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const depths = [0.25, 0.55, 0.35, 0.7, 0.9];
    event.currentTarget.querySelectorAll<HTMLElement>('li').forEach((node, index) => {
      node.style.setProperty('--node-x', `${x * 18 * depths[index]}px`);
      node.style.setProperty('--node-y', `${y * 18 * depths[index]}px`);
    });
    event.currentTarget.style.setProperty('--reticle-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--reticle-y', `${event.clientY - bounds.top}px`);
  };

  const resetDiagram = () => {
    diagramRef.current?.querySelectorAll<HTMLElement>('li').forEach((node) => {
      node.style.setProperty('--node-x', '0px');
      node.style.setProperty('--node-y', '0px');
    });
  };

  return (
    <figure
      ref={diagramRef}
      className="route-diagram"
      aria-labelledby="route-diagram-title"
      onPointerMove={moveDiagram}
      onPointerLeave={resetDiagram}
    >
      <figcaption id="route-diagram-title">
        <span>ROUTE / LANDING-PAGE</span>
        <span>REVIEW REQUIRED</span>
      </figcaption>
      <ol>
        <li className="route-context">
          <span className="node-index">01</span>
          <div><strong>Product context</strong><small>requirements + memory</small></div>
        </li>
        <li className="route-director">
          <span className="node-index">02</span>
          <div><strong>Design Director</strong><small>classify + route</small></div>
        </li>
        <li className="route-profile">
          <span className="node-index">03</span>
          <div><strong>Profile + workflow</strong><small>landing / discovery → ship</small></div>
        </li>
        <li className="route-engines">
          <span className="node-index">04</span>
          <div><strong>Taste × Impeccable</strong><small>direction + structure</small></div>
        </li>
        <li className="route-output">
          <span className="node-index">05</span>
          <div><strong>Implementation</strong><small>reviewed + recorded</small></div>
        </li>
      </ol>
      <div className="diagram-axis axis-x" aria-hidden="true">X / 1440</div>
      <div className="diagram-axis axis-y" aria-hidden="true">Y / 900</div>
      <div className="diagram-reticle" aria-hidden="true" />
    </figure>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero page-grid" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Open-source design orchestration</p>
          <h1 id="home-title" tabIndex={-1}>Give design agents<br /><em>a system.</em></h1>
          <p className="hero-summary">Route persistent context through the right workflow, engines, and review gate.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/docs">Explore docs</a>
            <a className="button button-secondary" href="#/demo">Compose a route</a>
          </div>
        </div>
        <RouteDiagram />
      </section>

      <section className="manifesto-section page-grid" aria-labelledby="memory-title" data-reveal>
        <div className="section-number">01 / MEMORY</div>
        <div className="manifesto-copy">
          <h2 id="memory-title">What survives the prompt?</h2>
          <p>Product truth, visual language, and every durable decision stay in your repository. The next agent starts with evidence, not a blank chat.</p>
        </div>
        <dl className="memory-ledger">
          <div><dt>PRODUCT.md</dt><dd>Audience, positioning, constraints</dd></div>
          <div><dt>DESIGN.md</dt><dd>Tokens, composition, interaction</dd></div>
          <div><dt>.design/</dt><dd>Briefs, references, decisions, audits</dd></div>
        </dl>
      </section>

      <section className="routing-section page-grid" aria-labelledby="routing-title" data-reveal>
        <div className="routing-heading">
          <div className="section-number">02 / ROUTING</div>
          <h2 id="routing-title">One request.<br />An explicit route.</h2>
          <p>The Director names the profile, workflow, engines, preserved constraints, and review requirement before implementation begins.</p>
        </div>
        <ol className="route-steps">
          <li><span>01</span><div><strong>Classify</strong><p>Landing, product, dashboard, commerce, portfolio, editorial, redesign, or audit.</p></div></li>
          <li><span>02</span><div><strong>Select</strong><p>Load one category profile and only the workflow stages the task needs.</p></div></li>
          <li><span>03</span><div><strong>Direct</strong><p>Give each installed engine a defined job instead of blending their opinions.</p></div></li>
          <li><span>04</span><div><strong>Review</strong><p>Resolve major findings, verify behavior, and record decisions before shipping.</p></div></li>
        </ol>
      </section>

      <section className="engines-section" aria-labelledby="engines-title">
        <div className="engines-intro page-grid" data-reveal>
          <div>
            <div className="section-number">03 / ENGINES</div>
            <h2 id="engines-title">Two engines.<br />One chain of command.</h2>
          </div>
          <p>AtelierOS does not average design opinions. Product context and project memory outrank replaceable engine advice.</p>
        </div>
        <div className="engine-planes" data-reveal>
          <article className="engine-plane taste-plane">
            <div className="plane-code">A / TASTE</div>
            <h3>Distinct on purpose.</h3>
            <p>Leads art direction, composition, typography voice, and the challenge against generic AI defaults.</p>
            <a href="https://github.com/Leonxlnx/taste-skill" target="_blank" rel="noreferrer">View upstream <span aria-hidden="true">↗</span></a>
          </article>
          <article className="engine-plane impeccable-plane">
            <div className="plane-code">B / IMPECCABLE</div>
            <h3>Coherent in practice.</h3>
            <p>Leads structure, state coverage, responsive behavior, critique, technical audit, and final refinement.</p>
            <a href="https://github.com/pbakaus/impeccable" target="_blank" rel="noreferrer">View upstream <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="repo-section page-grid" aria-labelledby="repo-title" data-reveal>
        <div className="file-tree" aria-label="AtelierOS repository structure">
          <div className="tree-header"><span>ROOT</span><span>SOURCE OF TRUTH</span></div>
          <pre>{`atelierOS/
├── kernel/       direction + review
├── profiles/     category priorities
├── workflows/    executable stages
├── rules/        quality constraints
└── engines/      replaceable upstreams

src/
├── PRODUCT.md    durable facts
├── DESIGN.md     visual system
└── .design/      project memory`}</pre>
        </div>
        <div className="repo-copy">
          <div className="section-number">04 / OWNERSHIP</div>
          <h2 id="repo-title">Your repository remains the source of truth.</h2>
          <p>Adapters stay thin. Engines stay replaceable. Product context and design decisions remain readable, reviewable files your team owns.</p>
          <a className="text-link" href={REPOSITORY_URL} target="_blank" rel="noreferrer">Inspect the source <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="closing-section page-grid" aria-labelledby="closing-title" data-reveal>
        <p>Ready to route the next interface?</p>
        <h2 id="closing-title">Install the system.<br />Keep the judgment.</h2>
        <div>
          <code>git clone --recurse-submodules {REPOSITORY_URL}.git</code>
          <a className="button button-primary" href="#/docs">Start with docs</a>
        </div>
      </section>
    </>
  );
}

function CodeBlock({ children, label }: { children: string; label: string }) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    window.setTimeout(() => setCopyStatus('idle'), 1800);
  };

  return (
    <div className="code-block">
      <div><span>{label}</span><button type="button" onClick={copy}>{copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy'}</button></div>
      <pre><code>{children}</code></pre>
      <span className="sr-only" aria-live="polite">{copyStatus === 'copied' ? `${label} copied to clipboard` : copyStatus === 'error' ? `Could not copy ${label.toLowerCase()}` : ''}</span>
    </div>
  );
}

function PageIntro({ code, title, children }: { code: string; title: string; children: React.ReactNode }) {
  return (
    <header className="page-intro page-grid" data-reveal>
      <p className="page-code">{code}</p>
      <div>
        <h1 tabIndex={-1}>{title}</h1>
        <p>{children}</p>
      </div>
    </header>
  );
}

function DocsPage() {
  return (
    <>
      <PageIntro code="MANUAL / 01" title="Documentation">Install the toolkit, understand its boundaries, and route substantial frontend work through one explicit system.</PageIntro>
      <div className="docs-layout page-grid">
        <aside className="docs-index" aria-label="Documentation index" data-reveal>
          <p>ON THIS PAGE</p>
          <a href="#/docs/install">Install</a>
          <a href="#/docs/structure">Structure</a>
          <a href="#/docs/commands">Commands</a>
          <a href="#/docs/memory">Design memory</a>
          <a href="#/docs/engines">Engines</a>
        </aside>
        <article className="docs-content">
          <section id="install" data-reveal>
            <span className="doc-number">01</span>
            <h2 tabIndex={-1}>Install</h2>
            <p>Clone with submodules so both replaceable engines are available, then initialize the workspace adapters and run the health check.</p>
            <CodeBlock label="TERMINAL">{`git clone --recurse-submodules ${REPOSITORY_URL}.git
cd AtelierOS
pnpm install
pnpm design:setup
pnpm design:doctor`}</CodeBlock>
            <div className="callout"><strong>Requirement</strong><span>Node.js 18.18 or newer and pnpm. Impeccable's own development tooling requires a newer Node version only when working inside that upstream repository.</span></div>
          </section>
          <section id="structure" data-reveal>
            <span className="doc-number">02</span>
            <h2 tabIndex={-1}>System structure</h2>
            <p>The toolkit and project remain separate. Root files orchestrate the whole workspace; `atelierOS/` owns reusable policy; `src/` owns the actual product.</p>
            <div className="structure-map">
              <div><strong>ROOT</strong><span>Workspace config + agent entry</span></div>
              <div><strong>atelierOS/</strong><span>Kernel + rules + profiles + workflows + engines</span></div>
              <div><strong>src/</strong><span>Application + product context + design memory</span></div>
            </div>
          </section>
          <section id="commands" data-reveal>
            <span className="doc-number">03</span>
            <h2 tabIndex={-1}>Commands</h2>
            <div className="command-list">
              <div><code>pnpm design:setup</code><p>Create missing memory and agent integrations without overwriting established context.</p></div>
              <div><code>pnpm design:sync</code><p>Refresh generated skills and thin pointers from kernel source files.</p></div>
              <div><code>pnpm design:doctor</code><p>Validate configuration, required paths, adapters, engines, and symlinks.</p></div>
              <div><code>pnpm design:update</code><p>Fast-forward clean Git-managed engine checkouts without touching custom policy.</p></div>
              <div><code>pnpm design:check</code><p>Discover and run the quality capabilities exposed by the application project.</p></div>
            </div>
          </section>
          <section id="memory" data-reveal>
            <span className="doc-number">04</span>
            <h2 tabIndex={-1}>Design memory</h2>
            <p>Context files answer different questions. Keeping those concerns separate prevents a task brief from silently becoming permanent policy.</p>
            <dl className="docs-definitions">
              <div><dt>PRODUCT.md</dt><dd>What the product is, who it serves, and what it can credibly promise.</dd></div>
              <div><dt>DESIGN.md</dt><dd>The established visual, interaction, responsive, and accessibility system.</dd></div>
              <div><dt>BRIEF.md</dt><dd>The current task, required behavior, constraints, assumptions, and success criteria.</dd></div>
              <div><dt>DECISIONS.md</dt><dd>An append-only record of durable choices and the alternatives they replaced.</dd></div>
            </dl>
          </section>
          <section id="engines" data-reveal>
            <span className="doc-number">05</span>
            <h2 tabIndex={-1}>Engine routing</h2>
            <p>Taste and Impeccable advise the kernel; neither outranks product requirements, project memory, accessibility, or established conventions.</p>
            <CodeBlock label="ROUTE CONTRACT">{`Classification: landing page
Profile: landing-page
Workflow: discovery → art-direction → shape → build → review → ship
Engines: Taste (direction) + Impeccable (shape and polish)
Constraints preserved: product context + design memory
Review required: yes`}</CodeBlock>
          </section>
        </article>
      </div>
    </>
  );
}

function ChangelogPage() {
  return (
    <>
      <PageIntro code="RECORD / CHANGELOG" title="Changelog">A concise record of meaningful changes to the toolkit, its public surface, and the system it directs.</PageIntro>
      <div className="changelog page-grid">
        <aside data-reveal><span>Current</span><strong>Unreleased</strong></aside>
        <div className="release-list">
          <article data-reveal>
            <header><div><span>UNRELEASED</span><h2>Public project website</h2></div><time>In progress</time></header>
            <ul>
              <li>Added Home, Docs, Changelog, and Live Demo destinations.</li>
              <li>Established the technical-atelier visual system with light and dark modes.</li>
              <li>Added a functional route composer based on real profiles and workflows.</li>
              <li>Replaced placeholder product and design memory with durable project context.</li>
            </ul>
          </article>
          <article data-reveal>
            <header><div><span>V0.1.0</span><h2>System foundation</h2></div><time>Initial release</time></header>
            <ul>
              <li>Introduced the Design Director and Design Reviewer kernel skills.</li>
              <li>Added six product profiles and seven executable workflows.</li>
              <li>Added persistent project memory, templates, rules, and agent adapters.</li>
              <li>Integrated Taste and Impeccable as replaceable Git submodules.</li>
              <li>Added setup, synchronization, health, update, and quality-check tooling.</li>
            </ul>
            <a className="text-link" href={`${REPOSITORY_URL}/commits/main/`} target="_blank" rel="noreferrer">Browse commit history <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </div>
    </>
  );
}

function RouteComposer() {
  const [surface, setSurface] = useState<DemoSurface>('landing');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const plan = routePlans[surface];
  const profile = plan.profile.file ? `${plan.profile.label} (${plan.profile.file}.md)` : plan.profile.label;
  const contract = `Classification: ${surfaceLabels[surface]}\nProfile: ${profile}\nWorkflow: ${plan.workflow.join(' -> ')}\nEngines: ${plan.engines}\nReview focus: ${plan.review}\nReview required: yes`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contract);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    window.setTimeout(() => setCopyStatus('idle'), 1800);
  };

  return (
    <div className="composer">
      <div className="composer-controls">
        <div>
          <span className="composer-step">INPUT / 01</span>
          <label htmlFor="surface">What are you designing?</label>
          <select id="surface" value={surface} onChange={(event) => setSurface(event.target.value as DemoSurface)}>
            {(Object.keys(surfaceLabels) as DemoSurface[]).map((value) => <option key={value} value={value}>{surfaceLabels[value]}</option>)}
          </select>
        </div>
        <div className="context-register">
          <span className="composer-step">CONTEXT / 02</span>
          <ul>
            <li><span>PRODUCT.md</span><strong>required</strong></li>
            <li><span>DESIGN.md</span><strong>required</strong></li>
            <li><span>.design/BRIEF.md</span><strong>current task</strong></li>
            <li><span>Existing implementation</span><strong>inspect</strong></li>
          </ul>
        </div>
      </div>
      <div className="composer-output">
        <div className="output-header"><span>ROUTE PREVIEW / 03</span><span>NOT EXECUTED</span></div>
        <dl key={surface} className="route-update">
          <div><dt>Classification</dt><dd>{surfaceLabels[surface]}</dd></div>
          <div><dt>Profile</dt><dd>{plan.profile.file ? <code>{plan.profile.file}.md</code> : plan.profile.label}</dd></div>
          <div><dt>Workflow</dt><dd className="workflow-chain">{plan.workflow.map((step, index) => <span key={step}>{index > 0 && <i aria-hidden="true">→</i>}<code>{step}</code></span>)}</dd></div>
          <div><dt>Engines</dt><dd>{plan.engines}</dd></div>
          <div><dt>Review focus</dt><dd>{plan.review}</dd></div>
        </dl>
        <button className="button button-primary copy-route" type="button" onClick={copy}>{copyStatus === 'copied' ? 'Route copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy route'}</button>
        <span className="sr-only" aria-live="polite">{copyStatus === 'copied' ? 'Route contract copied to clipboard' : copyStatus === 'error' ? 'Could not copy route contract' : ''}</span>
      </div>
    </div>
  );
}

function DemoPage() {
  return (
    <>
      <PageIntro code="ROUTER / LIVE DEMO" title="Compose a route">Choose a surface and see how AtelierOS assigns context, profile, workflow, engines, and review responsibility.</PageIntro>
      <section className="demo-section page-grid" aria-label="AtelierOS route composer">
        <div className="composer-reveal" data-reveal><RouteComposer /></div>
      </section>
      <section className="demo-notes page-grid" aria-labelledby="demo-notes-title" data-reveal>
        <h2 id="demo-notes-title">What this demo proves</h2>
        <div>
          <p><strong>Routing is explicit.</strong> The task category changes the workflow and engine balance instead of applying every design opinion at once.</p>
          <p><strong>Context comes first.</strong> Product facts, design language, the current brief, and existing implementation constrain every route.</p>
          <p><strong>Review stays mandatory.</strong> Engines can contribute critique, but the Design Reviewer owns severity and consolidation.</p>
        </div>
      </section>
    </>
  );
}

function NotFoundFallback() {
  return <HomePage />;
}

const pages: Record<Route, () => React.JSX.Element> = {
  home: HomePage,
  docs: DocsPage,
  changelog: ChangelogPage,
  demo: DemoPage,
};

export function App() {
  const hashPath = useSyncExternalStore(subscribeToHash, currentHashPath, () => '');
  const route = routeFromPath(hashPath);
  const section = hashPath.split('/')[1];
  const Page = pages[route] ?? NotFoundFallback;
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    document.title = `${navigation.find((item) => item.route === route)?.label ?? 'Home'} | AtelierOS`;
    window.requestAnimationFrame(() => {
      if (section) {
        const target = document.getElementById(section);
        target?.scrollIntoView();
        target?.querySelector<HTMLElement>('h2')?.focus();
      } else {
        window.scrollTo({ top: 0 });
        document.querySelector<HTMLElement>('main h1')?.focus();
      }
    });
  }, [hashPath, route, section]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('#main-content [data-reveal]');

    if (!document.documentElement.classList.contains('motion-ready')) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [route]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader route={route} scrolled={headerScrolled} />
      <main id="main-content" key={route} className="page-enter">
        <Page />
      </main>
      <SiteFooter />
    </div>
  );
}
