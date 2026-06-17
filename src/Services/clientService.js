const BASE_URL = import.meta.env.DEV ? 'http://localhost:3006' : ''

export const getClients = async () => {
  const response = await fetch(`${BASE_URL}/api/clients`)
  const data = await response.json()
  return data
}