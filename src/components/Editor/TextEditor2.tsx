import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TextEditorProps {
  initialValue?: string;
  contentValue?: string;
  onEditorChange?: (content: string) => void;
}

const TextEditor2: React.FC<TextEditorProps> = ({ contentValue }) => {
  return (
    <div className="rounded-lg border border-slate-300">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
        init={{
          height: 300,
          menubar: false,
          toolbar: " ",
          automatic_uploads: true,
          file_picker_types: "image",
        }}
        disabled
        value={contentValue}
      />
    </div>
  );
};

export default TextEditor2;
