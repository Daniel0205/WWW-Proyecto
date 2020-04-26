
import en from '../translate/en'
import es from '../translate/es'
import pt from '../translate/pt'



const languages = {
  en,
  es,
  pt
};

let defaultLanguage = window.navigator.language === 'es' ? 'es' : 'en';

window.appData = languages[defaultLanguage];

window.language=defaultLanguage

window.app = (key) => window.appData[key];


window.changeLanguage = (lang) => {
    window.appData = languages[lang];
    window.language=lang
}



