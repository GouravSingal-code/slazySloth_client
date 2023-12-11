import React from "react";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ImageUpload from "../ImageUpload/ImageUpload";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachmentIcon from "@mui/icons-material/Attachment";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TextArea from "../TextArea/TextArea";

const ArticleComponent = ({
  keyIndex,
  setTextOfArticle,
  textOfArticle,
  setImageOfArticle,
  imageOfArticle,
  setTextAreaActiveOfArticle,
  textAreaActiveOfArticle
}) => {
  const [isTextAreaActive, setIsTextAreaActive] = useState(
    textAreaActiveOfArticle[parseInt(keyIndex)]
  );

  const [text, setText] = useState(
    textOfArticle[parseInt(keyIndex)]
  );

  const [selectedImage, setSelectedImage] = useState(
    imageOfArticle[parseInt(keyIndex)]
  );

  const handleInputChange = (e) => {
    setText(e.target.value);
    textOfArticle[parseInt(keyIndex)] = e.target.value;
    setTextOfArticle(textOfArticle);
  };

  const handleImageText = () => {
    if (isTextAreaActive) {
      textAreaActiveOfArticle[parseInt(keyIndex)] = false;
      setTextAreaActiveOfArticle(textAreaActiveOfArticle);
      setIsTextAreaActive(false);
    } else {
      textAreaActiveOfArticle[parseInt(keyIndex)] = true;
      setTextAreaActiveOfArticle(textAreaActiveOfArticle);
      setIsTextAreaActive(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        imageOfArticle[parseInt(keyIndex)] = reader.result;
        setImageOfArticle(imageOfArticle);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    imageOfArticle[parseInt(keyIndex)] = false;
    setImageOfArticle(imageOfArticle);
    setSelectedImage(imageOfArticle[parseInt(keyIndex)]);
  };

  useEffect(() => {
    setText(textOfArticle[parseInt(keyIndex)]);
    setSelectedImage(imageOfArticle[parseInt(keyIndex)]);
    setIsTextAreaActive(textAreaActiveOfArticle[parseInt(keyIndex)]);
  }, [textOfArticle[parseInt(keyIndex)] , imageOfArticle[parseInt(keyIndex)] , textAreaActiveOfArticle[parseInt(keyIndex)]]);

  return (
    <div
      style={{
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "2%",
        marginBottom: "2%",
        textAlign: "center",
        padding: "1%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {isTextAreaActive && (
          <div
            className={`custom-textarea ${isTextAreaActive ? "active" : ""}`}
            style={{ width: "100%" }}
          >
            <AttachmentIcon
              style={{ position: "absolute", left: "-3%", cursor: "pointer" }}
              onClick={handleImageText}
            />
            <TextArea
              isTextAreaActive={isTextAreaActive}
              handleInputChange={handleInputChange}
              value={textOfArticle[keyIndex]}
            />
          </div>
        )}
        {!isTextAreaActive && (
          <div style={{ width: "100%" }}>
            <TextFieldsIcon
              style={{ position: "absolute", left: "-3%", cursor: "pointer" }}
              onClick={handleImageText}
            />
            <ImageUpload
              handleImageChange={handleImageChange}
              removeImage={removeImage}
              image={imageOfArticle[keyIndex]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleComponent;
