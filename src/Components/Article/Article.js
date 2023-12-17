import React from "react";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@mui/material/Button";
import ArticleComponent from "./ArticleComponent";

const Article = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleComponent, setArticleComponent] = useState([]);
  const [lengthOfArticle, setLengthOfArticle] = useState(1000);
  const [textOfArticle, setTextOfArticle] = useState(new Array(1001).fill(""));
  const [imageOfArticle , setImageOfArticle] = useState(new Array(1001).fill(false));
  const [textAreaActiveOfArticle, setTextAreaActiveOfArticle] = useState(new Array(1001).fill(true));

  const handleTitleChange = (title) => {
    setArticleTitle(title);
  };

  const addComponent = () => {
    setArticleComponent([
      ...articleComponent,
      <ArticleComponent
        keyIndex={parseInt(lengthOfArticle)}
        setTextOfArticle={setTextOfArticle}
        textOfArticle={textOfArticle}
        setImageOfArticle={setImageOfArticle}
        imageOfArticle={imageOfArticle}
        setTextAreaActiveOfArticle={setTextAreaActiveOfArticle}
        textAreaActiveOfArticle={textAreaActiveOfArticle}
      />,
    ]);
    setLengthOfArticle(lengthOfArticle - 1);
  };

  const removeArticleComponent = (keyIndex) => {
    let newArticleComponent = [];
    newArticleComponent = articleComponent.filter((x) => {
      if (x.props.keyIndex != keyIndex) {
        return x;
      }
    });
    setArticleComponent(newArticleComponent);
  };

  return (
    <div
      style={{
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "2%",
        marginBottom: "2%",
        textAlign: "center",
        padding: "1%",
        paddingLeft:"5%",
        paddingRight:"5%",
        border:"0.5px solid pink"
      }}
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          style={{
            width: "80%",
            fontSize: "2em",
            textAlign: "center",
            border: "none",
            marginBottom: "1%",
          }}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      {articleComponent.map((component, index) => (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-1%",
              display: "flex",
            }}
          >
            <div style={{ borderRadius: "50%" }}>
              <CancelIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => {
                  removeArticleComponent(parseInt(component.props.keyIndex));
                }}
              />
            </div>
          </div>
          {component}
        </div>
      ))}

      <Button
        component="label"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addComponent}
      >
        New
      </Button>
    </div>
  );
};

export default Article;
