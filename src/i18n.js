import i18n from "i18next";

import { initReactI18next }
from "react-i18next";

i18n.use(initReactI18next).init({

  resources: {

    en: {

      translation: {

        home: "Home",

        createPost: "Create Post",

        login: "Login",

        signup: "Signup",

        logout: "Logout",

      },

    },

    te: {

      translation: {

        home: "హోమ్",

        createPost: "పోస్ట్ సృష్టించండి",

        login: "లాగిన్",

        signup: "సైన్ అప్",

        logout: "లాగౌట్",

      },

    },

    hi: {

      translation: {

        home: "होम",

        createPost: "पोस्ट बनाएं",

        login: "लॉगिन",

        signup: "साइन अप",

        logout: "लॉगआउट",

      },

    },

  },

  lng: "en",

  fallbackLng: "en",

  interpolation: {

    escapeValue: false,

  },

});

export default i18n;