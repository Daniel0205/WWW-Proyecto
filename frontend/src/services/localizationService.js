
import en from '../translate/en'
import es from '../translate/es'
import pt from '../translate/pt'
import de from '../translate/de'



const languages = {
  en,
  es,
  pt,
  de
};

let defaultLanguage = window.navigator.language === 'es' ? 'es' : 'en';

window.appData = languages[defaultLanguage];

window.language=defaultLanguage

window.app = (key) => window.appData[key];


window.changeLanguage = (lang) => {
    window.appData = languages[lang];
    window.language=lang
}



