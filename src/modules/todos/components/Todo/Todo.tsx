import { Box, Grid, Typography } from "@mui/material";
import { ITodo } from "models/Todo";
import InputTodo from "modules/todos/common/InputTodo";
import { useEffect, useState } from "react";
import "./Todo.scss";

export interface TodoProps {
  todo: ITodo;
  onChangeTodo?: Function;
  reset: number;
  isBgFGrey: boolean;
}

export default function Todo({
  isBgFGrey,
  todo,
  onChangeTodo,
  reset,
}: TodoProps) {
  const [todoState, setTodoState] = useState<ITodo>(todo);
  const onChange = (value: string) => {
    const time = Date.now();
    setTodoState({ ...todo, title: value, time });
    if (onChangeTodo) {
      onChangeTodo({ ...todo, title: value, time });
    }
  };
  useEffect(() => {
    setTodoState(todo);
  }, [reset, todo]);
  return (
    <Box id="Todo" style={{ backgroundColor: isBgFGrey ? "grey" : "white" }}>
      <Grid container padding={2}>
        <Grid item sm={4} xs={12}>
          <Box className="todo-img">
            <img src={todoState.thumbnailUrl} alt="" />
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Box className="title">
            <InputTodo
              value={todoState.title}
              reset={reset}
              onChange={onChange}
            />
            <Typography paddingLeft="10px">{todoState.time}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
