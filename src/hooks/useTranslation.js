import useLanguageStore from "../store/languageStore";
import translations from "../locales";

function useTranslation() {
  const language = useLanguageStore(
    (state) => state.language
  );

  const t = translations[language] || translations.en;

  return { t, language };
}

export default useTranslation;