import { Box, Container } from "@mui/material";
import { fetchThunk } from "modules/common/redux/thunk";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import TodoList from "./TodoList/TodoList";
import { ITodo } from "models/Todo";
import { getConcatTodo } from "./../redux/todoReducer";
import InfiniteScroll from "react-infinite-scroll-component";
import TodoSkeleton from "../components/Todo/TodoSkeleton";

export interface TodoPageProps {}

export default function TodoPage(props: TodoPageProps) {
  const [page, setPage] = useState(1);
  const { todos } = useSelector((state: RootState) => state.todoReducer);
  const { hasMore } = useSelector((state: RootState) => state.todoReducer);
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const getTodoList = useCallback(
    async (page: number) => {
      const json = await dispatch(
        fetchThunk(
          `https://jsonplaceholder.typicode.com/photos?&_limit=10&_page=${page}`,
          "get"
        )
      );

      if (!!json.length) {
        const data = json.map((val: ITodo) => {
          return { ...val, time: Date.now() };
        });

        dispatch(getConcatTodo(data));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getTodoList(1);
    setPage((prevState) => prevState + 1);
  }, [getTodoList]);

  const fetchContacts = () => {
    setPage((prevState) => prevState + 1);

    if (hasMore) {
      getTodoList(page + 1);
    }
  };
  return (
    <Box textAlign="center" mt={5}>
      <Container>
        <InfiniteScroll
          dataLength={todos.length}
          next={fetchContacts}
          hasMore={hasMore}
          loader={
            <>
              <TodoSkeleton />
              <TodoSkeleton />
              <TodoSkeleton />
            </>
          }
        >
          <TodoList />
        </InfiniteScroll>
      </Container>
    </Box>
  );
}
