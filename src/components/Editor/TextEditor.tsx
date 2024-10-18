import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadImage } from "@/hooks/useEvents";

interface TextEditorProps {
  initialValue?: string;
  contentValue?: string;
  onEditorChange?: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  contentValue,
  onEditorChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const UploadHandler = async (blobInfo: any) => {
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    const res = await uploadImage(formData);
    if (res?.status) {
      return res?.result?.fileUrl;
    }
    throw new Error("Function not implemented.");
  };

  return (
    <div className="rounded-lg border border-slate-300">
      <Editor
        textareaName="content"
        apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
        init={{
          height: 350,
          menubar: true,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            " fontsize bold italic underline | image  align numlist bullist indent outdent link",
          images_upload_handler: UploadHandler, // Use the updated function here
          automatic_uploads: true,
          file_picker_types: "image",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } ",
        }}
        value={contentValue}
        onEditorChange={onEditorChange}
      />
    </div>
  );
};

export default TextEditor;
