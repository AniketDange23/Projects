
export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "5rem",
    minWidth: "10rem",
    borderRadius: "5px",
    color: "#000",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    border: "1px solid #000000",
    ":hover": {
      border: "1px solid #000000",
      boxShadow: "none",
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      cursor: "pointer",

      width: "100%",
      background: "#fff",
 
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      maxWidth: "14rem",
      border: "1px solid #000000",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.rem",
      lineHeight: "1.75rem",
    };
  },
};
