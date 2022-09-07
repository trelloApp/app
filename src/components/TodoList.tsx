import React from "react";
// import { Droppable } from "react-beautiful-dnd";
import { Col } from "react-bootstrap";
import { TodoPros } from "../service/serviceInterface";
import TodoDetail from "./TodoDetail";
interface Props {
  todos: TodoPros[];
  setTodos: React.Dispatch<React.SetStateAction<TodoPros[]>>;
  type: string;
  title: string;
  droppableId: string;
  bg: string;
  color: string;
  setTodosDone: React.Dispatch<React.SetStateAction<TodoPros[]>>;
}

const TodoList: React.FC<Props> = (prop) => {
  const { droppableId, todos, setTodos, type, title, bg, color, setTodosDone } =
    prop;
  console.log("setTodosDone", setTodosDone);
  const setClass = `text-center bg-${bg} todo__${type}`;
  const setTextColor = `fw-bold text-${color} shadow-sm text-capitalize`;
  return (
    <>
      <h2>hoole</h2>
      {/* <Droppable droppableId={droppableId}>
        {(provided) => (
          <Col
            className={setClass}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1 className={setTextColor}>{title}</h1>
            {todos.map((todo: TodoPros, index) => {
              return (
                <TodoDetail
                  type={type}
                  index={index}
                  id={todo?.id}
                  key={todo?.id}
                  todo={todo?.todo}
                  isDone={todo?.status}
                  todos={todos}
                  setTodos={setTodos}
                  setTodosDone={setTodosDone}
                />
              );
            })}
            {provided.placeholder}
          </Col>
        )}
      </Droppable> */}
    </>
  );
};

export default TodoList;
