export const getTokenFromCookie = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};






// export const getTokenFromCookie = () => {
//  const name = 'token='
//  const decodedCookie =
//     decodeURIComponent(document.cookie)

//   const cookies =
//     decodedCookie.split(';')

//   for (let cookie of cookies) {
//     while (cookie.charAt(0) === ' ') {
//       cookie = cookie.substring(1)
//     }

//     if (cookie.indexOf(name) === 0) {
//       return cookie.substring(name.length)
//     }
//   }
//   return null
// }