
 export const getClients = async () => {
  const response = await fetch('https://blog-application-backend-2.vercel.app/api/clients')
  const data = await response.json()
  return data
}
 