import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import "../styles/Notifications.css";

const Notifications = forwardRef(({ messages }, ref) => {
  const toastObj = useRef(null);
  const position = { X: "Right", Y: "Bottom" };

  useImperativeHandle(ref, () => ({
    show: ({ title, content, ...rest }) => {
      if (!toastObj.current) return;

      console.log("Notification affichée :", { title, content, ...rest }); // Debug
      toastObj.current.show({
        title,
        content,
        ...rest,
      });
    },
  }));

  return (
    <div>
      <ToastComponent
        ref={toastObj}
        id="toast_notifications"
        position={position}
      />{" "}
    </div>
  );
});

export default Notifications;
