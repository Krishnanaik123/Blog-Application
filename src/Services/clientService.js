export const getClients = async () => {
  const response = await fetch('http://localhost:3006/api/clients')
  const data = await response.json()
  return data
}