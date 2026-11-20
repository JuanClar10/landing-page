import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { categories, collections, featured, formatPrice, maps, menuUrl, products, productPhoto, searchKey, whatsapp } from './catalog'
import type { Product, StockSnapshot, Availability } from './types'

const BATCH_SIZE = 12

function Icon({ name }: { name: 'search' | 'bag' | 'pin' | 'clock' | 'spark' }) {
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
    bag: <><path d="M4.5 8h15l1 13h-17l1-13Z" /><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5l3 2" /></>,
    spark: <path d="M12 1c0 7.4 3.6 11 11 11-7.4 0-11 3.6-11 11 0-7.4-3.6-11-11-11 7.4 0 11-3.6 11-11Z" />,
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Brand() {
  return <a className="brand" href="#inicio" aria-label="La Postrería Café · Inicio">
    <img src="/fudo/logo.jpg" width="49" height="49" alt="" />
    <span>La Postrería <small>CAFÉ</small></span>
  </a>
}

function ProductImage({ product }: { product: Product }) {
  const [image, setImage] = useState<string | null>(() => productPhoto(product))
  return image
    ? <img src={image} alt={product.name} loading="lazy" onError={() => setImage(image === product.image ? null : product.image)} />
    : <span className="image-placeholder"><Icon name="spark" /></span>
}

function StockLabel({ stock }: { stock?: Availability }) {
  if (stock === 'sold-out') return <span className="product-status sold-out">Agotado en Fudo</span>
  if (stock === 'available') return <span className="product-status">Con stock en Fudo</span>
  return null
}

function Card({ product, stock, open }: { product: Product; stock?: Availability; open: (product: Product) => void }) {
  return <article className="product-card">
    <button className="product-button" onClick={() => open(product)} aria-label={'Ver ' + product.name}>
      <span className="product-image"><ProductImage product={product} /></span>
      <span className="product-meta">
        <span className="product-category">{categories[product.category]}</span>
        <span className="product-title">{product.name}</span>
        <span className="product-price">{formatPrice(product.price)}</span>
        <StockLabel stock={stock} />
      </span>
    </button>
  </article>
}

function ProductDialog({ product, stock, onClose, dialog }: {
  product: Product | null
  stock?: Availability
  onClose: () => void
  dialog: RefObject<HTMLDialogElement | null>
}) {
  useEffect(() => {
    if (product && !dialog.current?.open) dialog.current?.showModal()
  }, [dialog, product])
  return <dialog ref={dialog} className="product-dialog" onClose={onClose} aria-labelledby="detail-name">
    {product && <div className="dialog-grid">
      <button type="button" className="close-dialog" onClick={() => dialog.current?.close()} aria-label="Cerrar ficha">×</button>
      <div className="dialog-photo"><ProductImage key={product.id} product={product} /></div>
      <div className="dialog-content">
        <span className="eyebrow">{categories[product.category]}</span>
        <h2 id="detail-name">{product.name}</h2>
        <p className="dialog-price">{formatPrice(product.price)}</p>
        {product.description && <p>{product.description}</p>}
        <StockLabel stock={stock} />
        <a className="button primary" href={new URL(product.path, menuUrl).toString()}>Ver en Fudo</a>
        <p className="small-note">Confirma precio, opciones y disponibilidad en Fudo.</p>
      </div>
    </div>}
  </dialog>
}

export default function App() {
  const [group, setGroup] = useState('')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(BATCH_SIZE)
  const [selected, setSelected] = useState<Product | null>(null)
  const [stock, setStock] = useState<StockSnapshot['states']>({})
  const dialog = useRef<HTMLDialogElement>(null)
  const search = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const request = new AbortController()
    fetch('/api/stock', { signal: request.signal })
      .then(async response => response.ok ? await response.json() as StockSnapshot : null)
      .then(snapshot => { if (snapshot?.states) setStock(snapshot.states) })
      .catch(() => {})
    return () => request.abort()
  }, [])

  const allowedCategories = collections.find(item => item.id === group)?.categories ?? Object.keys(categories)
  const terms = searchKey(query.trim()).split(/\s+/).filter(Boolean)
  const matches = products.filter(product => {
    if (!allowedCategories.includes(product.category) || (category && product.category !== category)) return false
    const text = searchKey([product.name, product.description, categories[product.category]].join(' '))
    return terms.every(term => text.includes(term))
  })

  function selectGroup(id: string) {
    setGroup(id)
    setCategory('')
    setQuery('')
    setVisible(BATCH_SIZE)
  }

  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <div id="inicio" className="announcement"><Icon name="pin" /> Cañahuate, Valledupar <span aria-hidden="true">·</span> Lunes a domingo</div>
    <header className="site-header">
      <div className="header-inner container">
        <Brand />
        <nav aria-label="Navegación principal">
          <a href="#colecciones">Colecciones</a>
          <a href="#carta" onClick={() => selectGroup('')}>La carta</a>
          <a href="#visitanos">Visítanos</a>
        </nav>
        <div className="header-actions">
          <a className="search-link" href="#carta" aria-label="Buscar en la carta" onClick={() => search.current?.focus({ preventScroll: true })}><Icon name="search" /></a>
          <a className="button primary header-order" href={menuUrl}><Icon name="bag" /><span>Pedir en línea</span></a>
        </div>
      </div>
    </header>

    <main id="contenido">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="eyebrow">PASTELERÍA Y CAFÉ EN VALLEDUPAR</p>
          <h1 id="hero-title">La vida sabe<br />mejor <em>dulce.</em></h1>
          <p className="hero-description">Postres para comer a cucharadas, tortas para celebrar y un cafecito que siempre cae bien.</p>
          <div className="hero-actions">
            <a className="button primary" href="#carta" onClick={() => selectGroup('')}>Explorar la carta</a>
            <a className="button outline" href="#visitanos">Visítanos</a>
          </div>
        </div>
        <figure className="hero-visual">
          <img src="/fudo/72.webp" alt="Cheesecake de frutos del bosque de La Postrería Café" fetchPriority="high" />
          <span className="hero-spark"><Icon name="spark" /></span>
          <figcaption>Cheesecake Frutos del Bosque</figcaption>
        </figure>
      </section>

      <section className="section container" id="colecciones" aria-labelledby="collection-title">
        <div className="section-heading">
          <div><h2 id="collection-title">¿Qué se te antoja?</h2>
            <p>De un postre con café a una torta para compartir.</p></div>
          <a className="text-link" href="#carta" onClick={() => selectGroup('')}>Ver toda la carta</a>
        </div>
        <div className="collection-grid">
          {collections.map(item => <a className="collection-card" key={item.id} href="#carta" onClick={() => selectGroup(item.id)}>
            <img src={'/fudo/' + item.photo + '.webp'} alt="" loading="lazy" />
            <span>{item.name}</span>
          </a>)}
        </div>
      </section>

      <section className="featured section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">DE LA CASA</p><h2 id="featured-title">Para empezar por el postre</h2></div>
          </div>
          <div className="product-grid">
            {featured.map(product => <Card key={product.id} product={product} stock={stock[product.id]} open={setSelected} />)}
          </div>
        </div>
      </section>

      <section id="carta" className="section container" aria-labelledby="menu-title">
        <div className="section-heading">
          <div><h2 id="menu-title">La carta</h2><p>Encuentra tu antojo y haz el pedido en Fudo.</p></div>
          <a className="text-link" href={menuUrl}>Abrir menú en Fudo</a>
        </div>
        <div className="filter-bar">
          <label className="search-field"><Icon name="search" />
            <input type="search" ref={search} aria-label="Buscar productos" placeholder="Busca postres, café, tortas…" value={query} onChange={event => { setQuery(event.target.value); setVisible(BATCH_SIZE) }} />
          </label>
          <label className="category-field">
            <span className="visually-hidden">Categoría de la carta</span>
            <select value={category} onChange={event => { setCategory(event.target.value); setVisible(BATCH_SIZE) }}>
              <option value="">Todas las categorías</option>
              {allowedCategories.map(key => <option key={key} value={key}>{categories[key]}</option>)}
            </select>
          </label>
        </div>
        <div className="filters" aria-label="Colecciones de la carta">
          <button type="button" aria-pressed={!group} onClick={() => selectGroup('')}>Todo</button>
          {collections.map(item => <button type="button" key={item.id} aria-pressed={group === item.id} onClick={() => selectGroup(item.id)}>{item.short}</button>)}
        </div>
        <p className="result-count" role="status">{matches.length} {matches.length === 1 ? 'producto' : 'productos'}</p>
        <div className="product-grid">
          {matches.slice(0, visible).map(product => <Card key={product.id} product={product} stock={stock[product.id]} open={setSelected} />)}
        </div>
        {!matches.length && <div className="empty">
          <p>Prueba otro nombre o explora todas las categorías.</p>
          <button type="button" className="button outline" onClick={() => selectGroup('')}>Restablecer filtros</button>
        </div>}
        {matches.length > visible && <div className="more">
          <button type="button" className="button outline" onClick={() => setVisible(count => count + BATCH_SIZE)}>Ver más productos</button>
        </div>}
      </section>

      <section className="visit" id="visitanos" aria-labelledby="visit-title">
        <div className="container visit-grid">
          <img src="/fudo/local.webp" alt="Imagen de La Postrería Café en su carta oficial" loading="lazy" />
          <div className="visit-copy">
            <p className="eyebrow">BARRIO CAÑAHUATE</p>
            <h2 id="visit-title">Nos vemos<br />en <em>Valledupar.</em></h2>
            <p className="visit-line"><Icon name="pin" /> Calle 14 #8-59, barrio Cañahuate</p>
            <p className="visit-line"><Icon name="clock" /> Todos los días de 9:50 a. m. a 6:30 p. m.</p>
            <div className="hero-actions">
              <a className="button cream" href={maps}>Cómo llegar</a>
              <a className="button pale-outline" href={whatsapp}>Escríbenos</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container footer-inner">
        <Brand />
        <div className="footer-links">
          <a href="tel:+573166447477">316 644 7477</a>
          <a href="https://www.instagram.com/la__postreria/">Instagram</a>
          <a href="https://www.facebook.com/laapostreria">Facebook</a>
        </div>
        <small>© {new Date().getFullYear()} La Postrería Café</small>
      </div>
    </footer>

    <ProductDialog product={selected} stock={selected ? stock[selected.id] : undefined} onClose={() => setSelected(null)} dialog={dialog} />
  </>
}
