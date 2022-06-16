import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import "./InputTodo.scss";
const useStyles = makeStyles(() => ({
  noBorder: {
    borderColor: "transparent",
  },
}));
export interface InputTodoProps {
  value: string;
  onChange: Function;
  reset: number;
}

interface inputTodoProps {
  isChange: boolean;
  value: string;
  isOutline: boolean;
}

export default function InputTodo({
  value = "",
  onChange,
  reset,
}: InputTodoProps) {
  const classes = useStyles();
  const [inputTodo, setInputTodo] = useState<inputTodoProps>({
    isChange: false,
    isOutline: false,
    value,
  });
  const handleLeave = () => {
    if (!inputTodo.isChange) {
      setInputTodo({ ...inputTodo, isOutline: false });
    }
  };
  const handleSave = () => {
    if (inputTodo.value.trim() === "") {
      setInputTodo({ ...inputTodo, value });
      return;
    }
    if (onChange && inputTodo.isChange) {
      onChange(inputTodo.value);
    }
    setInputTodo({ ...inputTodo, isChange: false, isOutline: false });
  };
  const handleChangeInputTodo = (e: any) => {
    setInputTodo({ ...inputTodo, isChange: true, value: e.target.value });
  };
  useEffect(() => {
    setInputTodo({ ...inputTodo, value });
  }, [reset, value]);
  return (
    <textarea
      id="InputTodo"
      className={!inputTodo.isOutline ? classes.noBorder : ""}
      value={inputTodo.value}
      onChange={handleChangeInputTodo}
      onMouseEnter={() => setInputTodo({ ...inputTodo, isOutline: true })}
      onClick={() => {
        setInputTodo({ ...inputTodo, isOutline: true });
      }}
      onMouseLeave={handleLeave}
      onBlur={handleSave}
      style={{
        padding: 10,
        width: "100%",
        boxSizing: "border-box",
        fontSize: "20px",
        resize: "none",
      }}
    />
  );
}
