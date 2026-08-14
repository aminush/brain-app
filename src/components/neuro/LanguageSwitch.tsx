import { languages, type Language } from '../../lib/language';

type Props = {
  language: Language;
  onChangeLanguage: (language: Language) => void;
};

export function LanguageSwitch({ language, onChangeLanguage }: Props) {
  return (
    <div className="language-switch" aria-label="Language">
      {languages.map((item) => (
        <button
          className={item === language ? 'language-button active' : 'language-button'}
          key={item}
          onClick={() => onChangeLanguage(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
