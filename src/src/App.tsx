const setupSteps = [
  {
    file: 'PRODUCT.md',
    description: 'Define the product, audience, goals, voice, and constraints.',
  },
  {
    file: 'DESIGN.md',
    description: 'Record the visual system, interaction rules, and responsive behavior.',
  },
  {
    file: '.design/BRIEF.md',
    description: 'Describe the first surface or feature you want to build.',
  },
];

export function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="/" aria-label="AtelierOS starter home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>AtelierOS</span>
          <small>STARTER / 0.1</small>
        </a>
        <a className="header-link" href="https://github.com/MinhTuan2405/AtelierOS" target="_blank" rel="noreferrer">
          Toolkit source <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main-content">
        <section className="intro page-grid" aria-labelledby="starter-title">
          <div className="intro-copy">
            <p className="eyebrow">Project workspace / ready</p>
            <h1 id="starter-title">Your product<br /><em>starts here.</em></h1>
            <p className="summary">
              Replace the project memory with real product context, then direct your coding
              agent through the DesignKernel workflow.
            </p>

            <div className="actions">
              <a className="button button-primary" href="#setup">Review the setup</a>
              <a className="button button-secondary" href="https://github.com/MinhTuan2405/AtelierOS/tree/main/atelierOS" target="_blank" rel="noreferrer">
                Inspect the kernel
              </a>
            </div>
          </div>

          <aside className="status-board" aria-label="Starter project status">
            <div className="board-header"><span>BOOT / PROJECT</span><span>CONTEXT REQUIRED</span></div>
            <div className="board-center">
              <span className="status-mark" aria-hidden="true"><i /><i /><i /></span>
              <strong>Ready to define</strong>
              <small>src/ · React + Vite</small>
            </div>
            <dl>
              <div><dt>Kernel</dt><dd>installed</dd></div>
              <div><dt>Project memory</dt><dd>template</dd></div>
              <div><dt>Review gate</dt><dd>enabled</dd></div>
            </dl>
          </aside>
        </section>

        <section className="setup page-grid" id="setup" aria-labelledby="setup-title">
          <div className="section-heading">
            <p>01 / Context</p>
            <h2 id="setup-title">Three files before the first prompt.</h2>
            <p className="section-summary">Give every session durable product truth instead of asking it to infer intent from a blank application.</p>
          </div>

          <ol className="steps">
            {setupSteps.map((step, index) => (
              <li key={step.file}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <code>{step.file}</code>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer>
        <div><span>02 / BUILD</span><p>Context ready? Start the workspace.</p></div>
        <code>pnpm --dir src dev</code>
      </footer>
    </div>
  );
}
