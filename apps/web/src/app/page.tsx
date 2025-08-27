import { Button, Progress } from '@nanoui/core'

export default function Home() {
  return (
    <main>
      <h1>Hello NanoUI</h1>

      <section className="example-section">
        <h2>Button example</h2>
        <Button>Click me</Button>
      </section>
      <section className="example-section">
        <h2>Switch example</h2>
      </section>
      <section className="example-section">
        <h2>Tooltip example</h2>
      </section>
      <section className="example-section">
        <h2>File Uploader example</h2>
      </section>
      <section className="example-section">
        <h2>List example</h2>
      </section>
      <section className="example-section">
        <h2>Progress example</h2>
        <p>Small</p>
        <Progress
          size="sm"
          style={{ margin: '0.5rem 0' }}
          value={25}
        />
        <p>Medium (default)</p>
        <Progress
          size="md"
          style={{ margin: '0.5rem 0' }}
          value={50}
        />
        <p>Large</p>
        <Progress
          size="lg"
          style={{ margin: '0.5rem 0' }}
          value={75}
        />
      </section>
    </main>
  )
}
