// import axios from "axios";

// export const translateText = async (
//   text,
//   targetLanguage
// ) => {

//   try {

//     const response = await axios.get(
//       `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${targetLanguage}`
//     );

//     return response.data.responseData.translatedText;

//   } catch (error) {

//     console.log(
//       "Translation Error",
//       error
//     );

//     return text;
//   }
// };