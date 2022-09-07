import React, { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";

import { TodoPros } from "../service/serviceInterface";
import "./style/todoTask.scss";
interface Props {
  id: string;
  todo: string;
  isDone: number;
  todos: TodoPros[];
  setTodos: React.Dispatch<React.SetStateAction<TodoPros[]>>;
  index: number;
  type: string;
  setTodosDone: React.Dispatch<React.SetStateAction<TodoPros[]>>;
}
const TodoDetail: React.FC<Props> = ({
  index,
  id,
  todo,
  isDone,
  setTodos,
  todos,
  type,
  setTodosDone,
}) => {
  console.log("test", setTodosDone);
  const [edit, setEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(todo);
  // const handleChangeStatus = (id: number) => {
  //   todos.forEach((todo, i) => {
  //     if (todo.id === id && todo.isDone === false) {
  //       setTodosDone((t) => [...t, todo]);
  //       success("Task Done");
  //       console.log(todo);
  //       console.log(id);
  //     } else {
  //       warning("Task Is Not Good, You Should Make Again !");
  //     }
  //   });

  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };
  // const handleSubmit = (e: React.FormEvent, id: number) => {
  //   e.preventDefault();
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, todo: inputValue } : todo
  //     )
  //   );
  //   setEdit(false);
  //   success("Changed Success");
  // };
  // const handleDelete = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  //   success("Removed Success");
  //   if (todos.length === 1) warning("Emty Task, please add new task. Thanks!");
  // };
  return (
    <h1>hello</h1>
    // <Draggable draggableId={id?.toString()} index={index}>
    //   {(provided) => (
    //     <div
    //       className="todoDetail"
    //       ref={provided.innerRef}
    //       {...provided.draggableProps}
    //       {...provided.dragHandleProps}
    //     >
    //       {type === "todo" ? (
    //         isDone === 0 ? (
    //           edit ? (
    //             // <form onSubmit={(e) => handleSubmit(e, id)}>
    //             <form>
    //               <input
    //                 value={inputValue}
    //                 onChange={(e) => setInputValue(e.target.value)}
    //                 className="todoDetail__todo"
    //               />
    //             </form>
    //           ) : (
    //             <span className="todoDetail__todo ">{todo} </span>
    //           )
    //         ) : (
    //           <s className="todoDetail__todo text-success fs-3">{todo} </s>
    //         )
    //       ) : (
    //         <s className="todoDetail__todo text-success fs-3">{todo} </s>
    //       )}

    //       {type === "todo" ? (
    //         <div className="todoDetail__update">
    //           <i
    //             className="fa fa-edit text-primary"
    //             onClick={() => setEdit(!edit)}
    //             aria-hidden="true"
    //           ></i>
    //           <i
    //             className="fa fa-remove text-danger"
    //             // onClick={() => handleDelete(id)}
    //             aria-hidden="true"
    //           ></i>
    //           <i
    //             className="fa fa-check text-success"
    //             // onClick={() => handleChangeStatus(id)}
    //           ></i>
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   )}
    // </Draggable>
  );
};

export default TodoDetail;
