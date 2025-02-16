import { UIStore } from '@/stores/ui.ts'

export type Stores = {
  uiStore: UIStore
}

export function createStores(): Stores {
  return {
    uiStore: new UIStore(),
  }
}
