'use client'

import {Button} from '@nanoui/core'
import {useEffect, useState} from 'react'
import SuccessIconSVG from './icons/SuccessIconSVG'
import ErrorIconSVG from './icons/ErrorIconSvg'

type TSize = 'sm' | 'md' | 'lg'

export default function Home() {
  const [size, setSize] = useState<TSize>('md')

  const handleSizeChange = (size: TSize) => {
    setSize(size)
  }

  const getExample = () => {
    return fetch('https://jsonplaceholder.typicode.com/todo/1')
      .then((response) => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then((json) => {
        return json
      })
  }

  return (
    <main>
      <h1>Hello NanoUI</h1>
      <div className="controller">
        <span className="">Size: {size}</span>
        <Button
          onClick={() => {
            handleSizeChange('sm')
          }}
        >
          Small
        </Button>
        <Button
          onClick={() => {
            handleSizeChange('md')
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            handleSizeChange('lg')
          }}
        >
          Large
        </Button>
      </div>
      <section className="example-section">
        <h2>Button example</h2>
        <div className="example-section-item">
          <span className="example-section-name">Auto Resolve State = true:</span>
          <Button
            size={size}
            onClick={getExample}
            autoResolveState={true}
            successIcon={<SuccessIconSVG />}
            errorIcon={<ErrorIconSVG />}
          >
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Loading:</span>
          <Button size={size} loading={true}>
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Disabled:</span>
          <Button size={size} disabled>
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Primary:</span>
          <Button size={size} variant="primary">
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Secondary:</span>
          <Button size={size} variant="secondary">
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Outline:</span>
          <Button size={size} variant="outline">
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Ghost:</span>
          <Button size={size} variant="ghost">
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">Link:</span>
          <Button size={size} variant="link">
            Click me
          </Button>
        </div>
        <div className="example-section-item">
          <span className="example-section-name">As anchor tag:</span>
          <Button size={size} variant="link" as="a">
            Click me
          </Button>
        </div>
      </section>
    </main>
  )
}
