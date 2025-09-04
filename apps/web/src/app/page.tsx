import {ButtonExample} from '@/components/ButtonExample'

export default function Home() {
  return (
    <main>
      <h1>Hello NanoUI</h1>
      <section className="example-section">
        <h2>Button example</h2>
        <ButtonExample />
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
      </section>
    </main>
  )
}
