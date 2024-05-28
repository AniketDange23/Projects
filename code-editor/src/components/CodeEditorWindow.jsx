import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language = "javascript", code = "", theme }) => {
  const [value, setValue] = useState(code);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onChange("code", newValue);
  };
 
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="80vh"
        width="100%"
        language={language}
        value={value}
        defaultLanguage="javascript"
        theme={theme}
        defaultValue="//console.log('Welcome to CodeEditor')"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;
