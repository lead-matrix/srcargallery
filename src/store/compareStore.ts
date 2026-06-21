import { create } from 'zustand'

interface CompareState {
  compareIds: string[]
  addCar: (id: string) => void
  removeCar: (id: string) => void
  clear: () => void
  toggleCar: (id: string) => void
}

export const useCompareStore = create<CompareState>((set) => ({
  compareIds: [],
  addCar: (id) => set((state) => {
    if (state.compareIds.includes(id)) return state
    if (state.compareIds.length >= 3) {
      alert('You can compare up to 3 cars at a time.')
      return state
    }
    return { compareIds: [...state.compareIds, id] }
  }),
  removeCar: (id) => set((state) => ({
    compareIds: state.compareIds.filter((cid) => cid !== id)
  })),
  clear: () => set({ compareIds: [] }),
  toggleCar: (id) => set((state) => {
    if (state.compareIds.includes(id)) {
      return { compareIds: state.compareIds.filter((cid) => cid !== id) }
    }
    if (state.compareIds.length >= 3) {
      alert('You can compare up to 3 cars at a time.')
      return state
    }
    return { compareIds: [...state.compareIds, id] }
  })
}))
