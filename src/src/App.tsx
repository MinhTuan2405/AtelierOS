import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const REPOSITORY_URL = 'https://github.com/MinhTuan2405/AtelierOS';

type Route = 'home' | 'docs' | 'changelog' | 'demo';
type DemoSurface = 'landing' | 'product' | 'dashboard' | 'ecommerce' | 'portfolio' | 'editorial' | 'redesign' | 'audit';

type RoutePlan = {
  profile: { label: string; file?: string };
  workflow: string[];
  engines: string;
  review: string;
};

const routePlans: Record<DemoSurface, RoutePlan> = {
  landing: {
    profile: { label: 'Landing page', file: 'landing-page' },
    workflow: ['discovery', 'art-direction', 'shape', 'build', 'review', 'ship'],
    engines: 'Taste leads direction. Impeccable shapes and polishes.',
    review: 'Conversion hierarchy, differentiation, responsive storytelling',
  },
  product: {
    profile: { label: 'SaaS product', file: 'saas-product' },
    workflow: ['discovery', 'shape', 'build', 'review', 'ship'],
    engines: 'Impeccable leads structure. Taste is selective.',
    review: 'Task completion, state coverage, established system fit',
  },
  dashboard: {
    profile: { label: 'Dashboard', file: 'dashboard' },
    workflow: ['discovery', 'shape', 'build', 'review', 'ship'],
    engines: 'Impeccable leads. Taste supports brand character only.',
    review: 'Density, scanability, data integrity, narrow-screen strategy',
  },
  ecommerce: {
    profile: { label: 'Ecommerce', file: 'ecommerce' },
    workflow: ['discovery', 'shape', 'build', 'review', 'ship'],
    engines: 'Impeccable leads flow. Taste supports campaign expression.',
    review: 'Trust, conversion flow, errors, loading, and recovery',
  },
  portfolio: {
    profile: { label: 'Portfolio', file: 'portfolio' },
    workflow: ['discovery', 'art-direction', 'shape', 'build', 'review', 'ship'],
    engines: 'Taste leads narrative. Impeccable validates clarity.',
    review: 'Artifact hierarchy, pacing, responsive media, clear contact path',
  },
  editorial: {
    profile: { label: 'Editorial', file: 'editorial' },
    workflow: ['discovery', 'art-direction', 'shape', 'build', 'review', 'ship'],
    engines: 'Taste leads composition. Impeccable protects reading flow.',
    review: 'Reading measure, navigation, typography, content hierarchy',
  },
  redesign: {
    profile: { label: 'Inherited product-category profile' },
    workflow: ['redesign', 'review', 'ship'],
    engines: 'Taste explores. Impeccable reshapes. The Reviewer consolidates.',
    review: 'Preserved behavior, evidence-led changes, regression risk',
  },
  audit: {
    profile: { label: 'Inherited product-category profile' },
    workflow: ['review'],
    engines: 'The Design Reviewer owns findings. Engines contribute critique.',
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

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>;
}

function NavLinks({ route, mobile = false }: { route: Route; mobile?: boolean }) {
  const closeMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (mobile) event.currentTarget.closest('details')?.removeAttribute('open');
  };

  return (
    <>
      {navigation.map((item) => (
        <a key={item.route} href={routeHref(item.route)} aria-current={route === item.route ? 'page' : undefined} onClick={closeMenu}>
          {item.label}
        </a>
      ))}
      <a className="repo-link" href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub</a>
    </>
  );
}

function SiteHeader({ route }: { route: Route }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="AtelierOS home">
        <BrandMark />
        <span>AtelierOS</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation"><NavLinks route={route} /></nav>
      <details className="mobile-nav">
        <summary><span>Menu</span><i aria-hidden="true" /></summary>
        <nav aria-label="Mobile navigation"><NavLinks route={route} mobile /></nav>
      </details>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <a className="brand" href="#/"><BrandMark /><span>AtelierOS</span></a>
        <p>The repository-owned control layer for AI-assisted frontend design.</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <a href="#/docs">Documentation</a>
        <a href="#/demo">Live demo</a>
        <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub source</a>
      </nav>
      <p className="footer-note">Open source<br />Context in. Reviewed UI out.</p>
    </footer>
  );
}

const signalStages = [
  { code: 'CONTEXT', title: 'Product truth', detail: 'Requirements and durable memory' },
  { code: 'DIRECT', title: 'Design Director', detail: 'Classifies the work and names the route' },
  { code: 'ROUTE', title: 'Profile and workflow', detail: 'One category. Only the stages needed.' },
  { code: 'MAKE', title: 'Taste and Impeccable', detail: 'Distinct jobs, explicit chain of command' },
  { code: 'VERIFY', title: 'Review gate', detail: 'Findings resolved. Decisions recorded.' },
];

function SignalMap() {
  const mapRef = useRef<HTMLElement>(null);

  const moveSignal = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`);
    event.currentTarget.querySelectorAll<HTMLElement>('li').forEach((node, index) => {
      const depth = (index + 1) * 1.4;
      node.style.setProperty('--shift-x', `${(x - 0.5) * depth}px`);
      node.style.setProperty('--shift-y', `${(y - 0.5) * depth}px`);
    });
  };

  const resetSignal = () => {
    mapRef.current?.querySelectorAll<HTMLElement>('li').forEach((node) => {
      node.style.setProperty('--shift-x', '0px');
      node.style.setProperty('--shift-y', '0px');
    });
  };

  return (
    <figure ref={mapRef} className="signal-map" aria-labelledby="signal-map-title" onPointerMove={moveSignal} onPointerLeave={resetSignal}>
      <figcaption id="signal-map-title"><span>ROUTE CONTRACT</span><span>REVIEW REQUIRED</span></figcaption>
      <ol>
        {signalStages.map((stage, index) => (
          <li key={stage.code} style={{ '--stage': index } as React.CSSProperties}>
            <span className="signal-code">{stage.code}</span>
            <span className="signal-node" aria-hidden="true" />
            <div><strong>{stage.title}</strong><small>{stage.detail}</small></div>
          </li>
        ))}
      </ol>
      <div className="signal-beam" aria-hidden="true" />
      <div className="map-coordinates" aria-hidden="true"><span>X 1440</span><span>Y 900</span></div>
    </figure>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero page-grid" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="hero-label">Open-source design orchestration</p>
          <h1 id="home-title" tabIndex={-1} aria-label="Design agents forget. Your repo doesn’t.">
            <span aria-hidden="true">Design agents</span>
            <span aria-hidden="true">forget.</span>
            <span className="hero-accent" aria-hidden="true">Your repo</span>
            <span className="hero-accent" aria-hidden="true">doesn’t.</span>
          </h1>
          <p className="hero-summary">Route durable context through the right workflow, design engines, and review gate.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/docs">Read the docs</a>
            <a className="button button-secondary" href="#/demo">Try the router</a>
          </div>
        </div>
        <SignalMap />
      </section>

      <section className="proof-band" aria-label="AtelierOS system facts" data-reveal>
        <p><strong>Repository-owned</strong><span>Context stays with the project</span></p>
        <p><strong>Engine-agnostic</strong><span>Advice stays replaceable</span></p>
        <p><strong>Review-gated</strong><span>Major findings block completion</span></p>
      </section>

      <section className="problem-section page-grid" aria-labelledby="problem-title" data-reveal>
        <div className="problem-statement">
          <h2 id="problem-title">A polished screen is not a system.</h2>
          <p>Without durable context, every session restarts the design conversation and every engine pulls in its own direction.</p>
        </div>
        <div className="failure-field" aria-label="Problems AtelierOS prevents">
          <span className="failure-word word-context">lost context</span>
          <span className="failure-word word-style">blended styles</span>
          <span className="failure-word word-review">skipped review</span>
          <span className="failure-cross" aria-hidden="true" />
          <p>AtelierOS turns those failure points into an explicit, inspectable route.</p>
        </div>
      </section>

      <section className="route-story page-grid" aria-labelledby="route-title">
        <header className="route-story-intro" data-reveal>
          <h2 id="route-title">The route is<br />the product.</h2>
          <p>Each request moves through one chain of responsibility. Nothing gets averaged. Nothing important stays implicit.</p>
          <a className="text-link" href="#/demo">Compose your route</a>
        </header>
        <ol className="route-story-list">
          {[
            ['Read', 'Product facts, design rules, the active brief, and the existing implementation.'],
            ['Classify', 'Name the surface before selecting any visual guidance.'],
            ['Route', 'Choose one profile, the necessary workflow, and a job for each engine.'],
            ['Build', 'Implement against preserved behavior, responsive rules, and accessibility.'],
            ['Review', 'Resolve severe findings and append durable decisions before completion.'],
          ].map(([title, detail], index) => (
            <li key={title} data-reveal style={{ '--route-index': index } as React.CSSProperties}>
              <span className="route-pin" aria-hidden="true" />
              <div><strong>{title}</strong><p>{detail}</p></div>
              <code>{index === 0 ? 'INPUT' : index === 4 ? 'GATE' : 'PASS'}</code>
            </li>
          ))}
        </ol>
      </section>

      <section className="memory-section" aria-labelledby="memory-title">
        <div className="memory-heading page-grid" data-reveal>
          <h2 id="memory-title">Memory that survives the chat.</h2>
          <p>Plain files keep product truth, visual rules, and decisions legible to people and agents.</p>
        </div>
        <div className="memory-files" data-reveal>
          <article className="memory-file file-product">
            <header><span>PRODUCT.md</span><span>TRUTH</span></header>
            <h3>What are we actually making?</h3>
            <p>Audience, problem, positioning, constraints, credible claims.</p>
            <div aria-hidden="true"><i /><i /><i /><i /></div>
          </article>
          <article className="memory-file file-design">
            <header><span>DESIGN.md</span><span>LANGUAGE</span></header>
            <h3>How should it behave and feel?</h3>
            <p>Type, color, spacing, composition, interaction, motion.</p>
            <div aria-hidden="true"><i /><i /><i /></div>
          </article>
          <article className="memory-file file-decisions">
            <header><span>.design/</span><span>RECORD</span></header>
            <h3>What did the project decide?</h3>
            <p>Briefs, references, audits, and an append-only decision log.</p>
            <div className="decision-lines" aria-hidden="true"><i /><i /><i /></div>
          </article>
        </div>
      </section>

      <section className="engine-section page-grid" aria-labelledby="engine-title">
        <header data-reveal>
          <h2 id="engine-title">Different engines.<br />Defined authority.</h2>
          <p>The kernel assigns responsibility instead of mixing aesthetics into a compromise.</p>
        </header>
        <div className="engine-routing" data-reveal>
          <article className="engine taste-engine">
            <span>TASTE</span>
            <h3>Find the point of view.</h3>
            <p>Art direction, composition, typographic voice, anti-generic pressure.</p>
          </article>
          <div className="kernel-switch" aria-label="The DesignKernel directs both engines">
            <BrandMark />
            <strong>DesignKernel</strong>
            <span>assigns the work</span>
          </div>
          <article className="engine impeccable-engine">
            <span>IMPECCABLE</span>
            <h3>Make the system hold.</h3>
            <p>Structure, responsive behavior, state coverage, critique, final polish.</p>
          </article>
        </div>
      </section>

      <section className="review-section page-grid" aria-labelledby="review-title" data-reveal>
        <div className="review-mark" aria-hidden="true"><span>R</span><i /></div>
        <div className="review-copy">
          <h2 id="review-title">“Looks done” is not the finish line.</h2>
          <p>Substantial UI work closes only after responsive, accessibility, behavior, and implementation checks have a recorded verdict.</p>
        </div>
        <ul className="review-checks">
          <li><span>01</span>Severity assigned</li>
          <li><span>02</span>Major findings resolved</li>
          <li><span>03</span>Behavior verified</li>
          <li><span>04</span>Decisions recorded</li>
        </ul>
      </section>

      <section className="install-section page-grid" aria-labelledby="install-title" data-reveal>
        <div>
          <h2 id="install-title">Put the control layer in your repository.</h2>
          <p>Clone the toolkit with both replaceable engines, then initialize the project memory and adapters.</p>
        </div>
        <CodeBlock label="INSTALL">{`git clone --recurse-submodules ${REPOSITORY_URL}.git\ncd AtelierOS\npnpm install\npnpm design:setup`}</CodeBlock>
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
      <div><span>{label}</span><button type="button" aria-label={`Copy ${label}`} onClick={copy}>{copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy'}</button></div>
      <pre><code>{children}</code></pre>
      <span className="sr-only" aria-live="polite">{copyStatus === 'copied' ? `${label} copied to clipboard` : copyStatus === 'error' ? `Could not copy ${label.toLowerCase()}` : ''}</span>
    </div>
  );
}

function PageIntro({ code, title, children }: { code: string; title: string; children: React.ReactNode }) {
  return (
    <header className="page-intro page-grid">
      <p className="page-code">{code}</p>
      <div>
        <h1 tabIndex={-1}>{title}</h1>
        <p>{children}</p>
      </div>
      <span className="page-intro-mark" aria-hidden="true" />
    </header>
  );
}

const docSections = [
  { id: 'start', label: 'Start here' },
  { id: 'install', label: 'Install' },
  { id: 'portfolio', label: 'Beginner portfolio' },
  { id: 'memory', label: 'Design memory' },
  { id: 'commands', label: 'Commands' },
  { id: 'structure', label: 'Structure' },
  { id: 'engines', label: 'Engines' },
];

function DocsPage() {
  return (
    <>
      <PageIntro code="MANUAL" title="Documentation">Start from zero, understand the toolkit's boundaries, and route frontend work through one explicit system.</PageIntro>
      <div className="docs-layout page-grid">
        <aside className="docs-index" aria-label="Documentation index">
          <p>ON THIS PAGE</p>
          {docSections.map((section) => <a key={section.id} href={`#/docs/${section.id}`}>{section.label}</a>)}
        </aside>
        <article className="docs-content">
          <section id="start" data-reveal>
            <h2 tabIndex={-1}>Start here</h2>
            <p>AtelierOS is a control layer for a coding agent, not a no-code site builder or an AI model. It stores product truth, routes the work, and requires review. The agent still writes the interface, and you still supply or approve every public fact.</p>
            <div className="callout"><strong>GOOD FIT</strong><span>You want source code, can use Git, Node.js, and pnpm with assistance, and have a coding agent that reads repository instructions.</span></div>
            <div className="callout"><strong>USE ANOTHER TOOL</strong><span>Choose a hosted site builder if you want to select a template and publish without managing code or a repository.</span></div>
            <div className="callout"><strong>LICENSE</strong><span>The root project does not currently grant redistribution rights. Unless you own it or have separate permission, stop at local development until an applicable root license exists.</span></div>
          </section>
          <section id="install" data-reveal>
            <h2 tabIndex={-1}>Install</h2>
            <p>Clone with submodules so both engines are available, then initialize workspace adapters and run the health check.</p>
            <CodeBlock label="TERMINAL">{`git clone --recurse-submodules ${REPOSITORY_URL}.git\ncd AtelierOS\npnpm install\npnpm design:setup\npnpm design:doctor`}</CodeBlock>
            <div className="callout"><strong>Requirement</strong><span>Node.js 18.18 or newer and pnpm.</span></div>
          </section>
          <section id="portfolio" data-reveal>
            <h2 tabIndex={-1}>Your first portfolio</h2>
            <p>You do not need finished case studies to begin. Start with a truthful personal profile, omit empty sections, and add evidence as you create it. Never ask the agent to manufacture clients, results, testimonials, employers, or proficiency.</p>
            <ol className="guide-steps">
              <li><span>01</span><div><strong>Inventory real content</strong><p>Collect your public name, direction, audience, current skills, education or transferable experience, learning notes, verified links, and one safe contact method.</p></div></li>
              <li><span>02</span><div><strong>Create a branch</strong><p>Run <code>git switch -c portfolio</code>, then start the current app with <code>pnpm --dir src dev</code> to confirm the workspace works before editing.</p></div></li>
              <li><span>03</span><div><strong>Replace product memory</strong><p>Rewrite <code>src/PRODUCT.md</code>, <code>src/DESIGN.md</code>, and <code>src/.design/BRIEF.md</code>. Do not append your identity beneath the existing AtelierOS product facts.</p></div></li>
              <li><span>04</span><div><strong>Direct the agent</strong><p>Ask it to use DesignKernel and the portfolio profile, preserve the React and Vite build, avoid fabricated content, implement responsive and accessible behavior, and complete review.</p></div></li>
              <li><span>05</span><div><strong>Verify every claim</strong><p>Read all public text, test every link, inspect mobile and desktop layouts, navigate by keyboard, run the checks, and preview the production build.</p></div></li>
              <li><span>06</span><div><strong>Prepare to publish</strong><p>Confirm redistribution permission first. The build appears in <code>src/dist/</code>, but hosting, domains, analytics, and form processing are separate decisions, not AtelierOS features.</p></div></li>
            </ol>
            <h3>Use honest sections</h3>
            <dl className="definition-grid portfolio-content-grid">
              <div><dt>INTRODUCTION</dt><dd>Your name, the field you are pursuing, and one clear next action.</dd></div>
              <div><dt>ABOUT</dt><dd>A short biography grounded in your actual interests and experience.</dd></div>
              <div><dt>NOW</dt><dd>What you are currently learning, building, or looking for.</dd></div>
              <div><dt>EVIDENCE</dt><dd>Coursework, experiments, volunteering, or employment labeled accurately. Omit this section if there is nothing useful yet.</dd></div>
              <div><dt>CONTACT</dt><dd>Only verified public links and information that is safe to share.</dd></div>
              <div><dt>LATER</dt><dd>Add case studies one at a time when you can explain your role, constraints, process, and outcome.</dd></div>
            </dl>
            <div className="callout warning-callout"><strong>NO FAKE WORK</strong><span>A focused personal site without projects is more credible than invented case studies. Remove unsupported sections rather than filling them with generic copy.</span></div>
            <h3>Draft the three files</h3>
            <p className="section-note">These are planning outlines, not complete replacement files. Expand each point under the existing headings in the matching file. The README contains full Markdown examples.</p>
            <CodeBlock label="PRODUCT.md OUTLINE">{`Product: [Your name] Portfolio\nAudience: [Who should understand or contact you]\nGoal: Explain my direction and provide one contact path\nProof available now: [Only real experience or learning work]\nNon-goal: Pretend that exercises are paid client projects\nVoice: Clear, curious, grounded, concise\nPrivacy: Do not expose sensitive personal information`}</CodeBlock>
            <CodeBlock label="DESIGN.md OUTLINE">{`Direction: Calm editorial portfolio with readable body text\nTheme: [Light, dark, or system controlled]\nCharacter: [Three observable qualities]\nAccent: One restrained color for actions and focus\nMotion: Short state changes only; respect reduced motion\nAvoid: Skill percentages, fake device mockups, and oversized empty heroes\nResponsive: Support 320px, 768px, laptop, and 200% zoom`}</CodeBlock>
            <CodeBlock label=".design/BRIEF.md OUTLINE">{`Task: Replace the current app with a one-page personal portfolio\nClassification: Portfolio\nAudience: [Primary visitor]\nPrimary goal: Understand my direction and contact me\nRequired: Intro, about, current learning, real evidence if available, contact\nPreserve: React, TypeScript, Vite, DesignKernel memory and review\nConstraints: No fabricated work or private information; WCAG 2.2 AA\nSuccess: Accurate content, working links, responsive layout, passing checks`}</CodeBlock>
            <h3>Give the agent a complete prompt</h3>
            <CodeBlock label="AGENT REQUEST">{`Build my first personal portfolio in the src application. I am new to frontend development and do not have finished portfolio projects yet.\n\nUse DesignKernel and the portfolio profile. Read src/PRODUCT.md, src/DESIGN.md, src/.design/BRIEF.md, src/.design/REFERENCES.md, and src/.design/DECISIONS.md before editing. Inspect the current React and Vite app, then build the smallest honest portfolio described by the brief.\n\nDo not invent projects, clients, metrics, testimonials, skills, links, or personal details. Ask one clear question only when missing information materially changes the structure. Implement semantic HTML, keyboard access, visible focus, responsive behavior from 320px upward, reflow at 200% zoom, and reduced-motion support. Run available checks, complete design review, fix BLOCKER and MAJOR findings, and record durable decisions.`}</CodeBlock>
            <h3>Check before publishing</h3>
            <CodeBlock label="TERMINAL">{`pnpm design:doctor\npnpm design:check\npnpm --dir src build\npnpm --dir src preview`}</CodeBlock>
            <p className="section-note">Read every sentence and test every link. Use the preview at phone and laptop widths, then navigate using only the keyboard. A skipped automated capability is not a pass, and automation cannot verify that your story is truthful.</p>
            <div className="callout"><strong>PUBLISHING STOP</strong><span>Confirm that you own the repository or have permission to redistribute it before deployment. Otherwise keep the result local until a root license applies.</span></div>
          </section>
          <section id="memory" data-reveal>
            <h2 tabIndex={-1}>Design memory</h2>
            <p>Each context file answers one question so temporary task detail cannot silently become permanent policy.</p>
            <dl className="definition-grid">
              <div><dt>PRODUCT.md</dt><dd>What the product is, who it serves, and what it can promise.</dd></div>
              <div><dt>DESIGN.md</dt><dd>The established visual, interaction, responsive, and accessibility system.</dd></div>
              <div><dt>BRIEF.md</dt><dd>The active task, behavior, constraints, and success criteria.</dd></div>
              <div><dt>DECISIONS.md</dt><dd>An append-only record of durable choices and rejected alternatives.</dd></div>
            </dl>
          </section>
          <section id="commands" data-reveal>
            <h2 tabIndex={-1}>Commands</h2>
            <div className="command-grid">
              {[
                ['pnpm design:setup', 'Create missing memory and agent integrations without overwriting context.'],
                ['pnpm design:sync', 'Refresh generated skills and thin pointers from kernel files.'],
                ['pnpm design:doctor', 'Validate configuration, engines, adapters, and required paths.'],
                ['pnpm design:update', 'Fast-forward clean engine checkouts without touching project policy.'],
                ['pnpm design:check', 'Discover and run the quality checks exposed by the application.'],
              ].map(([command, detail]) => <div key={command}><code>{command}</code><p>{detail}</p></div>)}
            </div>
          </section>
          <section id="structure" data-reveal>
            <h2 tabIndex={-1}>System structure</h2>
            <p>Reusable policy and product code remain separate, with clear ownership at every layer.</p>
            <div className="structure-map">
              <div><strong>ROOT</strong><span>Workspace config and agent entry</span></div>
              <div><strong>atelierOS/</strong><span>Kernel, rules, profiles, workflows, engines</span></div>
              <div><strong>src/</strong><span>Application, product context, design memory</span></div>
            </div>
          </section>
          <section id="engines" data-reveal>
            <h2 tabIndex={-1}>Engine routing</h2>
            <p>Engines advise the kernel. Product requirements, project memory, accessibility, and conventions remain in charge.</p>
            <CodeBlock label="ROUTE CONTRACT">{`Classification: landing page\nProfile: landing-page\nWorkflow: discovery -> art-direction -> shape -> build -> review -> ship\nEngines: Taste (direction) + Impeccable (shape and polish)\nConstraints preserved: product context + design memory\nReview required: yes`}</CodeBlock>
          </section>
        </article>
      </div>
    </>
  );
}

function ChangelogPage() {
  return (
    <>
      <PageIntro code="RECORD" title="Changelog">Meaningful changes to the toolkit, its public surface, and the system it directs.</PageIntro>
      <div className="changelog page-grid">
        <aside><span>Current state</span><strong>Unreleased</strong></aside>
        <div className="release-list">
          <article data-reveal>
            <header><div><span>UNRELEASED</span><h2>Public project website</h2></div><time>In progress</time></header>
            <ul>
              <li>Added Home, Docs, Changelog, and Live Demo destinations.</li>
              <li>Established the technical-atelier visual system in light and dark modes.</li>
              <li>Added a functional route composer based on real profiles and workflows.</li>
              <li>Added purposeful route motion and responsive interaction states.</li>
              <li>Added a detailed beginner path for an honest first portfolio.</li>
            </ul>
          </article>
          <article data-reveal>
            <header><div><span>V0.1.0</span><h2>System foundation</h2></div><time>Initial release</time></header>
            <ul>
              <li>Introduced the Design Director and Design Reviewer kernel skills.</li>
              <li>Added six product profiles and seven executable workflows.</li>
              <li>Added persistent project memory, templates, rules, and agent adapters.</li>
              <li>Integrated Taste and Impeccable as replaceable Git submodules.</li>
            </ul>
            <a className="text-link" href={`${REPOSITORY_URL}/commits/main/`} target="_blank" rel="noreferrer">Browse commit history</a>
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
          <span className="composer-label">INPUT</span>
          <label htmlFor="surface">What are you designing?</label>
          <select id="surface" value={surface} onChange={(event) => setSurface(event.target.value as DemoSurface)}>
            {(Object.keys(surfaceLabels) as DemoSurface[]).map((value) => <option key={value} value={value}>{surfaceLabels[value]}</option>)}
          </select>
        </div>
        <div className="context-register">
          <span className="composer-label">CONTEXT LOAD</span>
          <ul>
            <li><span>PRODUCT.md</span><strong>required</strong></li>
            <li><span>DESIGN.md</span><strong>required</strong></li>
            <li><span>.design/BRIEF.md</span><strong>active</strong></li>
            <li><span>Implementation</span><strong>inspect</strong></li>
          </ul>
        </div>
      </div>
      <div className="composer-output">
        <div className="output-header"><span>ROUTE PREVIEW</span><span>NOT EXECUTED</span></div>
        <dl key={surface} className="route-update">
          <div><dt>Classification</dt><dd>{surfaceLabels[surface]}</dd></div>
          <div><dt>Profile</dt><dd>{plan.profile.file ? <code>{plan.profile.file}.md</code> : plan.profile.label}</dd></div>
          <div><dt>Workflow</dt><dd className="workflow-chain">{plan.workflow.map((step) => <code key={step}>{step}</code>)}</dd></div>
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
      <PageIntro code="ROUTER" title="Compose a route">Choose a surface and inspect how AtelierOS assigns context, profile, workflow, engines, and review.</PageIntro>
      <section className="demo-section page-grid" aria-label="AtelierOS route composer">
        <div className="composer-wrap" data-reveal><RouteComposer /></div>
      </section>
      <section className="demo-notes page-grid" aria-labelledby="demo-notes-title" data-reveal>
        <h2 id="demo-notes-title">A route contract, not a simulated agent.</h2>
        <div>
          <p><strong>Explicit routing</strong><span>The surface changes the workflow and engine balance.</span></p>
          <p><strong>Context first</strong><span>Product facts and project memory constrain every route.</span></p>
          <p><strong>Review required</strong><span>The Reviewer owns severity and the final consolidated verdict.</span></p>
        </div>
      </section>
    </>
  );
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
  const Page = pages[route];

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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [route]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader route={route} />
      <main id="main-content" key={route} className="page-enter"><Page /></main>
      <SiteFooter />
    </div>
  );
}
