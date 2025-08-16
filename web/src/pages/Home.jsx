import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    fetch('/prompt.json').then(r => r.json()).then(setPrompts).catch(() => setPrompts([]))
  }, [])

  const randomThree = prompts
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div>
      <h1>Artifacts of Reflection</h1>
      <p>Select a prompt to share a story.</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {randomThree.map(p => (
          <li key={p.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12 }}>
            <div style={{ marginBottom: 8 }}>{p.text}</div>
            <Link to={`/submit?promptId=${encodeURIComponent(p.id)}`}>Answer</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

