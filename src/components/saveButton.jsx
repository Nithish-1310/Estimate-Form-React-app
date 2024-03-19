import React from 'react';
import "./button.css"
import { BiFile } from "react-icons/bi";

const Button = ({ onClick, children, className,iconSize }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
    <BiFile className="button-icon" size={iconSize}/>
      {children}
    </button>
  );
};

export default Button;

