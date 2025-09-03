'use client'

import {BUTTON_CONTROLLER_ITEMS} from './config'
import {Button, ButtonBaseProps, ButtonSize} from '@nanoui/core'
import {useState} from 'react'

export default function Home() {
  const [size, setSize] = useState<ButtonSize>('md')
  const [state, setState] = useState<ButtonBaseProps<'button'>['state']>()

  const handleSizeChange = (size: ButtonSize) => setSize(size)

  const getExample = () => {
    setState('loading')
    return fetch('https://jsonplaceholder.typicode.com/todo/1')
      .then((response) => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then((json) => {
        setState('success')
        return json
      })
      .catch((error) => {
        setState('error')
      })
  }

  return (
    <main>
      <h1>Hello NanoUI</h1>
      <section className="example-section example-button">
        <h2>Button example</h2>
        <div className="example-button-controller">
          <span>Size: {size}</span>
          {BUTTON_CONTROLLER_ITEMS.map((item) => (
            <Button key={item.label} onClick={() => handleSizeChange(item.size)} size={item.size}>
              {item.label}
            </Button>
          ))}
        </div>
        <div className="example-button-item">
          <span className="example-button-name">With state:</span>
          <Button
            size={size}
            onClick={getExample}
            state={state}
            successIcon="./success.svg"
            errorIcon="./error.svg"
            variant="secondary"
          >
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Loading:</span>
          <Button size={size} loading={true}>
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Disabled:</span>
          <Button size={size} disabled>
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Primary:</span>
          <Button size={size} variant="primary">
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Secondary:</span>
          <Button size={size} variant="secondary">
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Outline:</span>
          <Button size={size} variant="outline">
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Ghost:</span>
          <Button size={size} variant="ghost">
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">Link:</span>
          <Button size={size} variant="link">
            Click me
          </Button>
        </div>
        <div className="example-button-item">
          <span className="example-button-name">As anchor tag:</span>
          <Button size={size} variant="link" as="a" href="#">
            Click me
          </Button>
        </div>
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
