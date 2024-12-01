import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";

// Composant Notifications pour gérer l'affichage de notifications avec un système Toast
const Notifications = forwardRef(({ messages }, ref) => {
  const toastObj = useRef(null);
  const position = { X: "Right", Y: "Bottom" };

  // Permet au composant parent d'utiliser la méthode `show` pour afficher une notification
  useImperativeHandle(ref, () => ({
    show: ({ title, content, ...rest }) => {
      if (!toastObj.current) return;
      toastObj.current.show({ title, content, ...rest });
    },
  }));

  // Rendu du composant Toast avec une configuration par défaut
  return (
    <div>
      <ToastComponent
        ref={toastObj}
        id="toast_notifications"
        position={position}
      />
    </div>
  );
});

export default Notifications;
