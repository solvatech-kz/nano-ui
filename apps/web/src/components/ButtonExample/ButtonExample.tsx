'use client'
import {BUTTON_CONTROLLER_ITEMS} from './config'
import {Button, ButtonBaseProps, ButtonSize} from '@nanoui/core'
import {useState} from 'react'
import styles from './ButtonExample.module.css'

export const ButtonExample = () => {
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
    <div className={styles['button-example']}>
      <div className={styles['button-example-controller']}>
        <span className={styles['button-example-name']}>Size: {size}</span>
        {BUTTON_CONTROLLER_ITEMS.map((item) => (
          <Button
            key={item.label}
            onClick={() => handleSizeChange(item.size)}
            className={item.size === size ? styles['button-selected'] : ''}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>With state:</span>
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
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Loading:</span>
        <Button size={size} loading={true}>
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Disabled:</span>
        <Button size={size} disabled>
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Primary:</span>
        <Button size={size} variant="primary">
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Secondary:</span>
        <Button size={size} variant="secondary">
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Outline:</span>
        <Button size={size} variant="outline">
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Ghost:</span>
        <Button size={size} variant="ghost">
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>Link:</span>
        <Button size={size} variant="link">
          Click me
        </Button>
      </div>
      <div className={styles['button-example-item']}>
        <span className={styles['button-example-name']}>As anchor tag:</span>
        <Button size={size} variant="link" as="a" href="#">
          Click me
        </Button>
      </div>
    </div>
  )
}
