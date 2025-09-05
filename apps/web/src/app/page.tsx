import {Switch} from '@nanoui/core/src/components/switch'
import {Button, List} from '@nanoui/core'
import {ProgressPreview} from '@/components/ProgressPreview'
import styles from '@/components/ListPreview/ListPreview.module.css'
import '@/components/ListPreview/ListPreview.css'

export default function Home() {
  const items = [
    {id: 1, icon: <img src="/vercel.svg" alt="Icon" />, text: 'Element with icon'},
    {
      id: 2,
      icon: <img src="/vercel.svg" alt="Icon" />,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel sem sed nulla scelerisque fermentum. Integer non libero ut arcu pharetra mattis in nec velit. Nulla facilisi. Donec bibendum eros sit amet lectusmollis, at dignissim odio hendrerit',
      multiline: true
    },
    {id: 3, icon: <img src="/vercel.svg" alt="Icon" />, text: <strong>You can even use a React element</strong>}
  ]

  const orderedItems = [
    {id: 1, text: 'Element'},
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel sem sed nulla scelerisque fermentum. Integer non libero ut arcu pharetra mattis in nec velit. Nulla facilisi. Donec bibendum eros sit amet lectusmollis, at dignissim odio hendrerit',
      multiline: false
    },
    {id: 3, text: <strong>You can even use a React element</strong>}
  ]

  return (
    <main>
      <h1>Hello NanoUI</h1>

      <section className="example-section">
        <h2>Button example</h2>
        <Button>Click me</Button>
      </section>
      <section className="example-section">
        <h2>Switch example</h2>
        <Switch size="lg"/>
      </section>
      <section className="example-section">
        <h2>Tooltip example</h2>
      </section>
      <section className="example-section">
        <h2>File Uploader example</h2>
      </section>
      <section className="example-section">
        <h2>List example</h2>
        <List items={items} className="list-demo" />
        <List items={orderedItems} className={styles.myList} />
        <List items={orderedItems} ordered={false} />
      </section>
      <section className="example-section">
        <h2>Progress example</h2>
        <ProgressPreview />
      </section>
    </main>
  )
}
