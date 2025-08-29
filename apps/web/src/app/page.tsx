import {Button} from '@nanoui/core'
import {Switch} from '@nanoui/core/src/components/switch'
import {ProgressPreview} from '@/components/ProgressPreview'

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
        <Switch size="sm" />
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
        <ProgressPreview />
      </section>
    </main>
  )
}
