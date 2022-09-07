import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import listTodosService from "../service/listTodosService";
import {
  errorShow,
  success,
  warning,
  options,
} from "../pages/notification/notifycationTask";
import { Spin } from "antd";
import "./style/todoTask.scss";
const InputField = () => {
  const inputRef = useRef<any>();
  const [inputValue, setInputValue] = useState<string>();
  const [addTodo, dataMutation] = useMutation(listTodosService.createListTodo);
  const { loading, error, reset, data } = dataMutation;
  if (error) {
    errorShow(error.message, options);
    inputRef.current?.focus();
    reset();
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      addTodo({
        variables: { name: inputValue },
        refetchQueries: [{ query: listTodosService.getAllListTodos }],
      });
    } else {
      warning("please enter tab name", options);
    }
  };
  if (data) {
    setInputValue("");
    success("add success", options);
    reset();
  }

  return (
    <>
      <Spin className={!loading ? "d-none spin" : "spin"} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="addTodo mt-5 mb-5 d-flex"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          className="form-control addTodo__input"
          placeholder="Enter List To Do ...."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="addTodo__submit  border bg-primary text-light"
          style={{ right: 0, top: 0, bottom: 0, width: "64px" }}
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default InputField;
