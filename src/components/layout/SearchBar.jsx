import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchItems } from '../../data/searchIndex'
import './SearchBar.css'

function SearchBar({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = searchItems(query)

  const handleSelect = (item) => {
    if (item.type === 'product') {
      navigate(`/product/${item.id}`)
    } else {
      navigate(item.path)
    }
    onClose()
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-row">
          <Search size={18} color="#777" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search....."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} aria-label="Close search"><X size={18} /></button>
        </div>

        {query.trim() && (
          <div className="search-results">
            {results.length === 0 ? (
              <p className="search-empty">No results found for "{query}"</p>
            ) : (
              results.map((item, i) => (
                <button className="search-result-row" key={i} onClick={() => handleSelect(item)}>
                  {item.type === 'product' && (
                    <img src={item.image} alt={item.name} className="search-result-img" />
                  )}
                  <div>
                    <p className="search-result-name">{item.name}</p>
                    {item.type === 'product' ? (
                      <p className="search-result-meta">${item.price} — {item.subtitle}</p>
                    ) : (
                      <p className="search-result-meta">Page</p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar