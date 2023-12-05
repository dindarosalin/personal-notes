import { useState, createContext, useContext } from 'react'
import usePersistedState from './use-persisted-state'

// register the context
const ThemeContext = createContext({})

/**
 * export custom provider
 * @param {boolean} darkMode
 * @returns
 */
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = usePersistedState('darkmode', false)

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// export a custom hook to use this specific context
export function useThemeContext() {
  return useContext(ThemeContext)
}
