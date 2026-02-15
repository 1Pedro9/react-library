// src/components/Button.jsx
import React from "react";
var Button = ({ children, onClick }) => {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      style: {
        padding: "10px 16px",
        background: "#222",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }
    },
    children
  );
};
var Button_default = Button;
export {
  Button_default as Button
};
