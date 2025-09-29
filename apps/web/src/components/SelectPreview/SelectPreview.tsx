import {FC, Fragment, useState} from 'react'
import {Select} from '@nanoui/core'
import styles from './SelectPreview.module.css'

const SelectPreview: FC = () => {
  const [options, setOptions] = useState([
    {label: 'Some option', value: '1'},
    {label: 'Another option', value: '2'},
    {label: 'More and more options', value: '3'}
  ])
  const multipleOptions = [
    {label: 'Single-choice', value: 'false'},
    {label: 'Multiple-choice', value: 'true'}
  ]
  const disabledOptions = [
    {label: 'Enabled', value: 'false'},
    {label: 'Disabled', value: 'true'}
  ]
  const [value, setValue] = useState(['1', '2'])
  const [multiple, setMultiple] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <>
      <div className={styles['select-settings']}>
        <div className={styles['select-settings__values']}>
          {options.map((o, i) => (
            <Fragment key={i}>
              <input
                type="text"
                value={o.label}
                placeholder="Label"
                onChange={(e) =>
                  setOptions(() => {
                    const temp = [...options]
                    temp[i].label = e.target.value
                    return temp
                  })
                }
              />
              <input
                type="text"
                value={o.value}
                placeholder="Value"
                onChange={(e) =>
                  setOptions(() => {
                    const temp = [...options]
                    temp[i].value = e.target.value
                    return temp
                  })
                }
              />
              <button
                onClick={() => {
                  setOptions(options.filter((del) => del !== o))
                }}
              >
                Delete
              </button>
            </Fragment>
          ))}
          <button
            onClick={() => {
              setOptions([...options, {label: '', value: ''}])
            }}
          >
            Add option
          </button>
        </div>
        <div className={styles['select-settings__options']}>
          <div>
            <label htmlFor="select-multiple">Option choice</label>
            <Select
              className={styles['select-settings__select']}
              id="select-multiple"
              name="select-multiple"
              options={multipleOptions}
              value={[String(multiple)]}
              onSelectChange={([value]) => setMultiple(value === 'true')}
            />
          </div>
          <div>
            <label htmlFor="select-disabled">Select state</label>
            <Select
              className={styles['select-settings__select']}
              id="select-disabled"
              name="select-disabled"
              options={disabledOptions}
              value={[String(disabled)]}
              onSelectChange={([value]) => setDisabled(value === 'true')}
            />
          </div>
        </div>
      </div>
      <Select
        className={styles.select}
        options={options}
        name="stuff"
        value={value}
        multiple={multiple}
        onSelectChange={setValue}
        disabled={disabled}
      />
      <p>Values: {value.join(', ')}</p>
    </>
  )
}

export {SelectPreview}
