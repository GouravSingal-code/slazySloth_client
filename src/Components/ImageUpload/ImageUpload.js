import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImageUpload({
  handleImageChange,
  removeImage,
  image
}) {
  return (
    <div>
      {!image && (
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload
          <VisuallyHiddenInput type="file" onChange={handleImageChange} />
        </Button>
      )}
      {image && (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div
            style={{
              position: "absolute",
              top: "-2%",
              right: "29%",
              display: "flex",
            }}
          >
            <div>
              <CloseIcon
                style={{ border:"1px solid red", color: "red", cursor: "pointer" , borderRadius:"50%" }}
                onClick={removeImage}
              />
            </div>
          </div>
          <img src={image} alt="Selected" style={{width:"40%" , height:"40%" , border:"1px solid black"}} />
          {/* You can display other information about the selected file here */}
        </div>
      )}
    </div>
  );
}
