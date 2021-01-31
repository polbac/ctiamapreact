import React from "react";
import ReactDOM from "react-dom";
import s from "./assets/scss/main.scss";

function Modal() {
  return <div className={s.modal__print}>holuu</div>;
}

export default function PrintModal(props) {
  return ReactDOM.createPortal(
    <Modal {...props} />,
    document.querySelector('#portal-modal-print')
  );
}
