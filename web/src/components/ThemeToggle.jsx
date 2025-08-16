import { useTheme } from './ThemeProvider'
import './components.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${theme}`}>
          <div className={`toggle-icon ${theme}`}>
            {theme === 'light' ? '☀️' : '🌙'}
          </div>
        </div>
      </div>
    </button>
  )
}
