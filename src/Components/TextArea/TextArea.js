import * as React from "react";
import { useState } from "react";

export default function TextArea({
  isTextAreaActive,
  handleInputChange,
  value
}) {
  return (
    <div>
      <textarea
        style={{
          width: "100%",
          fontSize: "1em",
          height: "auto",
          overflow: "hidden",
        }}
        placeholder={isTextAreaActive ? "" : "what do you want to say?..."}
        onChange={handleInputChange}
        value={value}
      />
    </div>
  );
}
