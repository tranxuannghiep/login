import { ITodo } from "models/Todo";
import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface TodoState {
  todos: ITodo[];
  hasMore: boolean;
  loading: boolean;
}
export const getTodo = createCustomAction("todo/getTodo", (data: ITodo[]) => ({
  data,
}));
export const getConcatTodo = createCustomAction(
  "todo/getConcatTodo",
  (data: ITodo[]) => ({
    data,
  })
);

const actions = { getTodo, getConcatTodo };
type Action = ActionType<typeof actions>;

export default function todoReducer(
  state: TodoState = { todos: [], hasMore: true, loading: true },
  action: Action
) {
  switch (action.type) {
    case getType(getTodo):
      return { ...state, todos: action.data };
    case getType(getConcatTodo):
      let setHasMore;
      if (action.data !== undefined) {
        setHasMore = action.data.length !== 0 ? true : false;
      } else {
        setHasMore = false;
      }
      return {
        ...state,
        hasMore: setHasMore,
        todos:
          state.hasMore !== true
            ? state.todos
            : state.todos.concat(action.data),
      };
    default:
      return state;
  }
}
