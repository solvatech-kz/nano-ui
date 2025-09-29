import {
  FC,
  AriaAttributes,
  CSSProperties,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef
} from 'react'
import styles from './Select.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {label: string; value: string}[]
  onSelectChange?: (values: string[]) => void
  className?: string
  id?: string
  style?: CSSProperties
}

const Select: FC<SelectProps> = ({
  options,
  multiple,
  disabled,
  required,
  autoComplete,
  name,
  value,
  onSelectChange,
  className,
  id,
  style
}) => {
  const classNames = useMemo(
    () => [styles.select, disabled ? styles.disabled : null, className].join(' ').trim(),
    [className, disabled]
  )
  const finalAutoComplete = useMemo(
    () =>
      ['none', 'inline', 'list', 'both', undefined].includes(autoComplete)
        ? (autoComplete as AriaAttributes['aria-autocomplete'])
        : 'none',
    [autoComplete]
  )

  const [open, setOpen] = useState(false)
  const selectRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (open) optionRefs.current[0]?.focus()
  }, [open])

  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      if (!optionRefs.current?.includes(e.target! as HTMLDivElement) && selectRef.current !== e.target) setOpen(false)
    }
    document.addEventListener('click', handleOutsideClick, true)

    return () => document.removeEventListener('click', handleOutsideClick, true)
  }, [])

  useEffect(() => {
    if (disabled) setOpen(false)
  }, [disabled])

  const initialSelect = useCallback(
    () =>
      options.map((o, i) => {
        if (typeof value === 'string') return value === o.value
        if (typeof value === 'number') return value === i
        if (Array.isArray(value)) return value.includes(o.value)
        return false
      }),
    [options, value]
  )
  const [selected, setSelected] = useState(initialSelect)
  const selectedDisplay = options.filter((_, i) => selected[i])

  useEffect(() => {
    setSelected(() => initialSelect())
  }, [value, initialSelect])

  useEffect(() => {
    if (multiple === false) {
      setSelected((s) => {
        const first = s.findIndex((o) => o)
        return s.map((_, i) => i === first)
      })
    }
  }, [multiple])

  const handleSelect = (i: number) => {
    if (!disabled) {
      if (multiple) {
        const temp = [...selected]
        temp[i] = !temp[i]
        if (onSelectChange) {
          onSelectChange(options.filter((_, index) => temp[index]).map((s) => s.value))
        } else {
          setSelected(temp)
        }
      } else {
        const temp = new Array(options.length).fill(false)
        temp[i] = true
        if (onSelectChange) {
          onSelectChange(options.filter((_, index) => temp[index]).map((s) => s.value))
        } else {
          setSelected(temp)
        }
        setOpen(false)
      }
    }
  }

  return (
    <>
      <input name={name} id={id} type="hidden" disabled={disabled} value={selectedDisplay.map((s) => s.value)} />
      <button
        ref={selectRef}
        className={classNames}
        tabIndex={0}
        role="combobox"
        aria-label={name}
        aria-required={required}
        aria-disabled={disabled}
        aria-autocomplete={finalAutoComplete}
        aria-multiselectable={multiple}
        style={style}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.code === 'Space') setOpen(!open)
          if (e.code === 'Enter') e.preventDefault()
        }}
      >
        {selectedDisplay.length > 0 ? selectedDisplay.map((o) => o.label).join(', ') : 'Select...'}
        {open && (
          <div className={styles.options} role="list">
            {options.map((o, i) => (
              <div
                key={i}
                ref={(el) => {
                  optionRefs.current[i] = el
                }}
                aria-selected={selected[i]}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(i)
                }}
                onKeyDown={(e) => {
                  switch (e.code) {
                    case 'Escape':
                    // fallthrough
                    case 'Tab':
                      setOpen(false)
                      break
                    case 'Enter':
                    // fallthrough
                    case 'Space':
                      e.stopPropagation()
                      handleSelect(i)
                      break
                    case 'ArrowUp':
                      e.preventDefault()
                      if (i > 0) optionRefs.current[i - 1]?.focus()
                      break
                    case 'ArrowDown':
                      e.preventDefault()
                      if (i < options.length - 1) optionRefs.current[i + 1]?.focus()
                      break
                    default:
                      break
                  }
                }}
                role="option"
                tabIndex={0}
              >
                {o.label}
              </div>
            ))}
          </div>
        )}
      </button>
    </>
  )
}

export {Select}
