import { Box, Button } from "@mui/material";
import { ITodo } from "models/Todo";
import Todo from "modules/todos/components/Todo/Todo";
import { getTodo } from "modules/todos/redux/todoReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";

export interface TodoListProps {}

export default function TodoList(props: TodoListProps) {
  const { todos } = useSelector((state: RootState) => state.todoReducer);
  const dispatch = useDispatch();
  const [todoUpdate, setTodoUpdate] = useState<ITodo[]>([]);
  const [reset, setReset] = useState(0);
  const handleChange = (value: any) => {
    const idx = todos.findIndex((val) => val.id === value.id);
    setTodoUpdate([...todos.slice(0, idx), value, ...todos.slice(idx + 1)]);
  };
  return (
    <Box>
      {!!todos.length && (
        <Box
          width="200px"
          display="flex"
          justifyContent="space-between"
          margin="0 auto 40px"
        >
          <Button
            variant="contained"
            onClick={() => {
              dispatch(getTodo(todoUpdate));
              setTodoUpdate([]);
            }}
            disabled={!todoUpdate.length}
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setReset(reset + 1);
              setTodoUpdate([]);
            }}
            disabled={!todoUpdate.length}
          >
            Reset
          </Button>
        </Box>
      )}

      {todos.map((todo, idx) => (
        <Todo
          key={todo.id}
          isBgFGrey={idx % 2 === 0 ? true : false}
          todo={todo}
          onChangeTodo={handleChange}
          reset={reset}
        />
      ))}
    </Box>
  );
}
