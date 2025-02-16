import { type FunctionalComponent, type RefObject } from 'preact'
import { cls } from '@/utils/mod.ts'
import classes from '@/ui-components/btn/btn.module.css'

function createPressHandlers(onPress: () => void, onLongPress?: () => void) {
  return {
    onClick: (event: Event) => handleClickEvent(event as MouseEvent, onPress),
    onTouchStart: (event: Event) =>
      handleTouchEvent(
        event as TouchEvent,
        onPress,
        onLongPress,
      ),
    onKeydown: (event: Event) =>
      handlekeyboardEvent(event as KeyboardEvent, onPress),
  }
}

function handleClickEvent(event: MouseEvent, onPress: () => void) {
  onPress()
}

function handlekeyboardEvent(event: KeyboardEvent, onPress: () => void) {
  if (event.key === 'Enter') {
    onPress()
  }
}

function handleTouchEvent(
  event: TouchEvent,
  onPress: () => void,
  onLongPress?: () => void,
  longPressThreshold: number = 500,
) {
  const { target } = event

  if (!target) {
    return
  }

  let timeout: ReturnType<typeof setTimeout>

  const touchEndHandler = (event: Event) => {
    clearTimeout(timeout)
    if (
      event.type === 'touchend' &&
      'changedTouches' in event &&
      Array.isArray(event.changedTouches) &&
      event.changedTouches.length > 0
    ) {
      onPress()
    }
    target.removeEventListener('touchend', touchEndHandler)
  }

  timeout = setTimeout(() => {
    if (!onLongPress) {
      onPress()
    } else {
      onLongPress()
    }
    target.removeEventListener('touchend', touchEndHandler)
  }, longPressThreshold)

  target.addEventListener('touchend', touchEndHandler)
}

type BtnProps = {
  ariaLabel?: string
  class?: string
  forwardRef?: RefObject<HTMLButtonElement>
  onPress: () => void
  onLongPress?: () => void
  title?: string
  children: preact.ComponentChildren
}

export const Btn: FunctionalComponent<BtnProps> = ({
  ariaLabel,
  title,
  children,
  class: className,
  forwardRef,
  onPress,
  onLongPress,
}) => {
  const pressHandlers = createPressHandlers(onPress, onLongPress)

  return (
    <button
      ref={forwardRef}
      class={cls(classes.btn, className)}
      {...pressHandlers}
      tabIndex={0}
      title={title || ariaLabel}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
