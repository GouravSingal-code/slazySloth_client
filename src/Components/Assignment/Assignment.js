import React from "react";
import { FileDownloadButton } from "../../Utils/FileDownload.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import PopUp from "../Popup/PopUp.js";
import FormLink from "../Form/FormLink.js";
import ButtonComponent from  '../Button/Button'
import {buttonStyleObject} from '../Styles/Styles'

const Assignment = () => {
  // add a path of the assignmentfile which is based on the profile of the user which is using
  const [path, setPath] = React.useState("gourav");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main
    style={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Aligns content horizontally at the center
      justifyContent: "center", // Aligns content vertically at the center
      overflow: "auto",
      minHeight: "80vh",
    }}
  >
    <ButtonGroup
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "80%",
      }}
    >

      <ButtonComponent 
        styleValues={buttonStyleObject}
        onClickFunction={() => {
          FileDownloadButton(path);
        }}

        name={'Download Assignment'}
      />

      <ButtonComponent
        styleValues={buttonStyleObject}
        onClickFunction={openPopup}
        name ={ 'Submit Assignment'}
      />

      {isPopupOpen && <PopUp Content={<FormLink closePopup={closePopup} />}  />}
    </ButtonGroup>
    </main>
  );
};

export default Assignment;
