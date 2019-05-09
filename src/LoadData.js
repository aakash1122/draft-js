import React from "react";
import DOMPurify from "dompurify";

export default function LoadData(props) {
  let html = localStorage.getItem("html");
  return (
    <div>
      <h1>Rendering Data to Editor.js </h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      />
    </div>
  );
}
