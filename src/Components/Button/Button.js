import Button from "@mui/material/Button";

const ButtonComponent = ({ styleValues, name, onClickFunction }) => {
  return (
    <Button style={styleValues} onClick={onClickFunction}>
      {name}
    </Button>
  );
};


export default ButtonComponent;