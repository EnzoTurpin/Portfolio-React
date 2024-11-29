import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import "../styles/Notifications.css";

const Notifications = forwardRef(({ language, translations }, ref) => {
  const toastObj = useRef(null);
  const position = { X: "Right", Y: "Bottom" };

  const getTranslation = (key, currentLanguage) => {
    if (!translations || !translations[currentLanguage]) {
      console.warn(`Langue "${currentLanguage}" ou traductions introuvables.`);
      return key; // Fallback à la clé brute
    }

    const translation = key
      .split(".")
      .reduce(
        (obj, part) => (obj ? obj[part] : undefined),
        translations[currentLanguage]
      );

    if (!translation) {
      console.warn(
        `Traduction introuvable pour la clé "${key}" dans la langue "${currentLanguage}".`
      );
      return key; // Fallback à la clé brute
    }

    return translation;
  };

  useImperativeHandle(ref, () => ({
    show: ({ title, content, ...rest }) => {
      if (toastObj.current) {
        const translatedTitle = getTranslation(title, language);
        const translatedContent = getTranslation(content, language);

        toastObj.current.show({
          ...rest,
          title: translatedTitle,
          content: translatedContent,
        });
      }
    },
    hide: () => {
      if (toastObj.current) {
        toastObj.current.hide("All");
      }
    },
  }));

  useEffect(() => {
    // Mise à jour des notifications en cas de changement de langue
    if (toastObj.current) {
      toastObj.current.hide("All"); // Réinitialiser les notifications visibles
    }
  }, [language]); // L'effet se déclenche lorsque language change

  return (
    <div className="notifications-container">
      <ToastComponent
        ref={toastObj}
        id="toast_notifications"
        position={position}
      />
    </div>
  );
});

export default Notifications;
