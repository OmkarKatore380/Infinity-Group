import raw from '../data/services.json'

const STORAGE_KEY = 'servicesData'
let store = null
let nextId = 1

function init() {
  if (store) return
  try {
    const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    store = Array.isArray(cached) ? cached : raw.map((s, idx) => ({ id: s.id ?? idx + 1, ...s }))
  } catch {
    store = raw.map((s, idx) => ({ id: s.id ?? idx + 1, ...s }))
  }
  nextId = Math.max(0, ...store.map((s) => Number(s.id) || 0)) + 1
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export async function getAllServices() {
  init()
  return Promise.resolve([...store])
}

export async function getServiceBySlug(slug) {
  init()
  const item = store.find((s) => s.slug === slug)
  return Promise.resolve(item || null)
}

export async function createService(data) {
  init()
  const id = nextId++
  const slug = data.slug || String(data.title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const seo = data.seo || { title: data.title || '', description: data.shortDesc || data.description || '' }
  const newItem = { id, status: 'Active', ...data, slug, seo }
  store = [newItem, ...store]
  persist()
  return Promise.resolve(newItem)
}

export async function updateService(id, data) {
  init()
  const idx = store.findIndex((s) => String(s.id) === String(id))
  if (idx === -1) return Promise.resolve(null)
  const prev = store[idx]
  const updated = {
    ...prev,
    ...data,
    slug: data.slug || prev.slug,
    seo: data.seo || prev.seo
  }
  store[idx] = updated
  persist()
  return Promise.resolve(updated)
}

export async function deleteService(id) {
  init()
  const before = store.length
  store = store.filter((s) => String(s.id) !== String(id))
  persist()
  return Promise.resolve(before !== store.length)
}
