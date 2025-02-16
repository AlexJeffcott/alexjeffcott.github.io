import { render } from 'preact'
import { StoresProvider } from '@/contexts/stores.tsx'
import { initActionListeners } from '@/actions/init-action-listeners.ts'
import { createStores } from '@/stores/mod.ts'
import { LandingPage } from '@/pages/mod.ts'

import '@/global.css'

const element = document.body

if (element instanceof HTMLElement) {
  const stores = createStores()
  initActionListeners(element, stores)
  render(
    <StoresProvider stores={stores}>
      <LandingPage />
    </StoresProvider>,
    element,
  )
}
