import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TextEditorProps {
  initialValue?: string;
  contentValue?: string;
  onEditorChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  contentValue,
  onEditorChange,
}) => {
  return (
    <Editor
      textareaName="content"
      apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
      init={{
        menubar: true,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          " fontsize | bold italic underline | align numlist bullist indent outdent | link",
      }}
      value={contentValue}
      onEditorChange={onEditorChange}
    />
  );
};

export default TextEditor;
