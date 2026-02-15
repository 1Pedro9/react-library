import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
        onClick={onClick}
        style={{
            padding: "10px 16px",
            background: "#222",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
        }}
    >
      {children}
    </button>
  );
};

export default Button;