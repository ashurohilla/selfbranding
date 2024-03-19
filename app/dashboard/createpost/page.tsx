"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Page() {
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false); // State to control preview display
  console.log(content);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newcontent) => {
    setContent(newcontent);
  };

  return (
    <main className="mx-4">
      <div className="grid grid-flow-col md:grid-cols-2  mt-4  gap-4">
      
        <div className="">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] editor mt-10 bg-black text-white"
          />
        </div>



        <div className="border mt-10 border-white text-white justify-center items-center" >
          <div dangerouslySetInnerHTML={{__html: content}} className="w-full h-[70%] mt-10 bg-black text-white p-4 " />
        </div>



      </div>
      <style jsx>{`
        .editor-container {
          display: ${showPreview ? 'none' : 'block'};
        }
        
        .preview-container {
          display: ${showPreview ? 'block' : 'none'};
        }

        .preview {
          /* Add your preview styles here */
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f9f9f9;
        }
      `}</style>
    </main>
  );
}
