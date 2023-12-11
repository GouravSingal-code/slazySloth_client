import React from "react";
import {
  IconButton,
  TextField,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FormLink = ({closePopup}) => {
  const [link, setLink] = React.useState("");

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle link submission here
    console.log("Submitted link:", link);
    setLink("");
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderColor: "#008080",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CssBaseline />
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={closePopup}>
            <CloseIcon style={{ color: "#008080" }} />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="link"
            label="Link"
            name="link"
            value={link}
            onChange={handleLinkChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#008080" }}
          >
            Upload
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default FormLink;
