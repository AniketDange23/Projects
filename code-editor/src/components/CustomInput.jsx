import React from "react";
import { classnames } from "../utils/generals.js";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full border-2   text-black  bg-white z-10 rounded-md  shadow-lg px-4 py-2 hover:shadow transition duration-20 mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;