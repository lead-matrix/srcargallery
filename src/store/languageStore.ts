import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Lang = 'en' | 'bn'

interface LanguageState {
  lang: Lang
  toggle: () => void
  setLang: (lang: Lang) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: 'en',
      toggle: () => set({ lang: get().lang === 'en' ? 'bn' : 'en' }),
      setLang: (lang) => set({ lang }),
    }),
    { name: 'sr-lang' }
  )
)

// Convenience hook
export const useLang = () => useLanguageStore((s) => s.lang)
export const useToggleLang = () => useLanguageStore((s) => s.toggle)
