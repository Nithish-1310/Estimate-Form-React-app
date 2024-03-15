import React from "react";
import Button from "../component.jsx/saveButton";

const Header = ({ handleSave, active }) => {
  return (
    <div className="headerContainer">
      <h1 id="h1">Header Information</h1>
      <div>
      {!active && (
        <p id="activeCheckBox">Warning: Checkbox is currently inactive!</p>
      )}
      </div>
      
      <div className="saveButton">
        <Button onClick={handleSave} iconSize={20}>
          Save
        </Button>
      </div>
    </div>
    
  );
};

export default Header;
