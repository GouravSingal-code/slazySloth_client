import ButtonGroup from "@mui/material/ButtonGroup";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { buttonStyleObject } from "../Styles/Styles";
import ButtonComponent from "../Button/Button";
import "./Ask.css";

const Ask = () => {
  return (
    <ButtonGroup
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <Link to="/assignment">
        <ButtonComponent
          styleValues={buttonStyleObject}
          name={"Ask for Assignment"}
        />
      </Link>
      <Link to="/job">
        <ButtonComponent
          styleValues={buttonStyleObject}
          name={<><LockIcon/>&nbsp; Help for a Job</>}
        />
      </Link>
    </ButtonGroup>
  );
};

export default Ask;
