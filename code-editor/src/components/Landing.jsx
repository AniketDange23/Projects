import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { languageOptions } from "../constants/languageOptions";
import CodeEditorWindow from "./CodeEditorWindow";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "../components/LanguageDropdown.jsx";
import useKeyPress from "../hooks/useKeyPress";
import { classnames } from "../utils/generals.js";
import axios from "axios";

const Landing = () => {
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const handleChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    setProcessing(true);

    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "70e0b82349msha876cb20efadf24p114ff5jsn2193a7973f43",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const token = response.data.token;
      checkStatus(token);
    } catch (error) {
      console.error(error);
      const status = error.response ? error.response.status : null;
      if (status === 429) {
        showErrorToast(`100 request Complete`, 10000);
      }
      setProcessing(false);
    }
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "70e0b82349msha876cb20efadf24p114ff5jsn2193a7973f43",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className='w-full bg-slate-100 font-sans text-xl text-blue-500 font-bold  p-2 text-center flex items-center px-3 gap-2'>
        {" "}
        <img src='/logo.png' alt='logo' className='w-10' /> Coffee Code Compiler
      </div>

      <div className='flex flex-col md:flex-col'>
        <div className=' md:w-1/2 px-2'>
          {" "}
          {/* Adjust width based on screen size */}
          <LanguagesDropdown onChange={handleChange} />
        </div>

        <div className='flex flex-col md:flex-row items-start px-2 py-2'>
          <div className='flex flex-col w-full md:w-screen h-full justify-start items-end border '>
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
            />
          </div>

          <div className='right-container flex flex-col   w-full md:w-[40%] flex-shrink-0 -mt-10 space-x-3'>
            <OutputWindow outputDetails={outputDetails} />
            <div className='flex flex-col items-end '>
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
              <div className='flex justify-between items-start space-x-6'>
                {outputDetails && (
                  <OutputDetails outputDetails={outputDetails} />
                )}

                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className={classnames(
                    "mt-4 border-2 bg-slate-900 rounded-md h-12  text-cyan-50 px-4 py-2 hover:shadow transition duration-200 bg-white",
                    !code ? "opacity-100" : "",
                    "md:w-auto" // Adjust width based on screen size
                  )}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
