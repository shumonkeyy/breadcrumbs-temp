import React, { useEffect, useState } from "react";

export default function GoogleTranslateWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  const initGoogleWidget = () => {
    if (window.google?.translate) {
      if (!document.querySelector(".goog-te-combo")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,my,tl,zh-CN,zh-TW",
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }

      const checkExist = setInterval(() => {
        const googleSelect = document.querySelector(".goog-te-combo");
        if (googleSelect) {
          setIsLoaded(true);
          clearInterval(checkExist);
        }
      }, 100);
    }
  };

  useEffect(() => {
    window.googleTranslateElementInit = initGoogleWidget;

    if (document.getElementById("google-translate-script")) {
      initGoogleWidget();
    } else {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (langCode) => {
    const googleSelect = document.querySelector(".goog-te-combo");

    if (googleSelect) {
      googleSelect.value = langCode;

      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, true);
      googleSelect.dispatchEvent(event);
    } else {
      console.warn("Re-syncing translation layer...");
      initGoogleWidget();
    }
  };

  return (
    <div className="custom-translator" style={{ display: "inline-block" }}>
      <div className="button-group" style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          disabled={!isLoaded}
          className="lang-btn notranslate"
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <button
          type="button"
          disabled={!isLoaded}
          className="lang-btn notranslate"
          onClick={() => changeLanguage("es")}
        >
          ES
        </button>
        <button
          type="button"
          disabled={!isLoaded}
          className="lang-btn notranslate"
          onClick={() => changeLanguage("my")}
        >
          MM
        </button>
        <button
          type="button"
          disabled={!isLoaded}
          className="lang-btn notranslate"
          onClick={() => changeLanguage("tl")}
        >
          TL
        </button>
        <button
          type="button"
          disabled={!isLoaded}
          className="lang-btn notranslate"
          onClick={() => changeLanguage("zh-CN")}
        >
          ZH (S)
        </button>
        <button
          type="button"
          disabled={!isLoaded}
          className="lang-btn notranslate"
          onClick={() => changeLanguage("zh-TW")}
        >
          ZH (T)
        </button>
      </div>
    </div>
  );
}
