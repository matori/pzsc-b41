import languagesList from '../data/languagesList.json';

function getLanguage(url: string): string {
  const languageCodeFromURL = getLanguageFromURL(url);

  if (languageCodeFromURL === null) {
    return 'en';
  }

  const available = languagesList.some(language => language.code === languageCodeFromURL);

  if (!available) {
    alert('The language file does not exist. This page will be displayed in English.');
    return 'en';
  }

  return languageCodeFromURL;
}

function getLanguageFromURL(url: string): string | null {
  const urlData = new URL(url);
  const urlParams = new URLSearchParams(urlData.search);
  return urlParams.get('lang');
}

export { getLanguage };
