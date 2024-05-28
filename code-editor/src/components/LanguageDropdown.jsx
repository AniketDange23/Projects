// eslint-disable-next-line no-unused-vars
import React from "react";
import Select from "react-select"; // Import Select component from react-select library
import { customStyles } from "../constants/customStyles"; // Import customStyles
import { languageOptions } from "../constants/languageOptions"; // Import languageOptions

// eslint-disable-next-line react/prop-types
const LanguagesDropdown = ({ onChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`} // Placeholder text for the dropdown
      options={languageOptions} // Array of language options to display in the dropdown
      styles={customStyles} // Custom styles for the dropdown menu
      onChange={(selectedOption) => onChange(selectedOption)} // Function to handle onChange event
    />
  );
};

export default LanguagesDropdown;
