import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resources/res.i18next";

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
});

export default i18n;
