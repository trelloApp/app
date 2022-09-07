import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "../../components/InputField";
import TodoList from "../../components/TodoList";
import { success, warning, options } from "../notification/notifycationTask";
import { ListTodoPros, TodoPros } from "../../service/serviceInterface";
import "./style.scss";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import listTodosService from "../../service/listTodosService";
import Todotab from "../../components/Todotab";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { CloseCircleOutlined } from "@ant-design/icons";
const TodoTask: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoPros[]>([]);
  const [todosDone, setTodosDone] = useState<TodoPros[]>([]);
  const { loading, error, data } = useQuery(listTodosService.getAllListTodos);
  console.log("data", data);
  // if (error) {
  //   warning(error.message);
  // }

  // console.log("loading", loading);
  // console.log("data", data);
  // if (!loading) {
  //   data.todos.forEach((todo: TodoPros) => {
  //     switch (todo.status) {
  //       case 1:
  //         listTodoDone.push(todo);
  //         break;

  //       default:
  //         listTodo.push(todo);
  //         break;
  //     }
  //   });
  // }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.length > 0) {
      // setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
      success("Enter Task Success!", options);
    } else {
      warning("Please Enter task", options);
    }
  };
  const onDragEnd = (result: DropResult) => {
    console.log("result", result);
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = todosDone;
    if (source.droppableId === "todoTask") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "todoTask") {
      // active.splice(destination.index, 0, add);
      warning("Task Is Not Good, You Should Make Again !", options);
    } else {
      // complete.splice(destination.index, 0, add);
    }
    setTodos(active);
    setTodosDone(complete);
    if (active.length === 0)
      warning("Emty Task, please add new task. Thanks!", options);
  };
  const options = {
    perPage: 4,
    type: "slide",
    arrows: false,
    rewind: true,
    autoplay: false,
    pagination: false,
  };
  return (
    <>
      <InputField />
      {/* <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <img src="image1.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="image2.jpg" alt="Image 2" />
        </SplideSlide>
      </Splide> */}
      <div id="content">
        <Splide options={options}>
          {!loading && data ? (
            data?.listTodos?.map((tab: ListTodoPros) => (
              <SplideSlide>
                <Todotab tab={tab} />
              </SplideSlide>
            ))
          ) : (
            <Spin className="spin" />
          )}
        </Splide>
      </div>

      {/* {loading ? (
        <Spinner animation="border" variant="primary" className="spinner" />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <h1 className="text-center fs-1 fw-bolder ">TASKIFY</h1>
          <Row className="justify-content-center">
            <Col xs={8}>
              <div className="position-relative mt-4">
                <InputField
                  todo={todo}
                  setTodo={setTodo}
                  handleAdd={handleAdd}
                />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4 todo">
            <TodoList
              todos={listTodo}
              setTodos={setTodos}
              type="todo"
              title="todo task"
              droppableId="todoTask"
              bg="dark"
              color="danger"
              setTodosDone={setTodosDone}
            />
            <TodoList
              todos={listTodoDone}
              setTodos={setTodosDone}
              type="done"
              title="todo task done"
              droppableId="todoDone"
              bg="success"
              color="white"
              setTodosDone={setTodosDone}
            />
          </Row>
        </DragDropContext>
      )} */}
    </>
  );
};

export default TodoTask;
