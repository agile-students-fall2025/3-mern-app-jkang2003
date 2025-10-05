import { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002'

export default function AboutUs() {
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    let on = true
    axios.get(`${API}/about`, { timeout: 8000 })
      .then(r => on && setData(r.data))
      .catch(e => on && setErr(e.message || 'Failed to load'))
    return () => { on = false }
  }, [])

  if (err) return <pre style={{ color: 'crimson' }}>{err}</pre>
  if (!data) return <p>Loading…</p>

  return (
    <main style={{ maxWidth: 820, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ margin: '0 0 12px' }}>{data.title}</h1>
      <img
        src={data.photoUrl}
        alt="About"
        style={{ width: '100%', maxWidth: 420, borderRadius: 8, margin: '0 0 16px' }}
      />
      {Array.isArray(data.paragraphs) &&
        data.paragraphs.map((p, i) => (
          <p
            key={i}
            style={{ lineHeight: 1.7, margin: '0 0 14px', whiteSpace: 'pre-line' }}
          >
            {p}
          </p>
        ))}
    </main>
  )
}