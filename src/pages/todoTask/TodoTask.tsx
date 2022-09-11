import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import InputField from "../../components/InputField";

import { ListTodoPros } from "../../service/serviceInterface";
import "./style.scss";
import { useMutation, useQuery } from "@apollo/client";
import { Spin } from "antd";
import listTodosService from "../../service/listTodosService";
import Todotab from "../../components/Todotab";

import todoService from "../../service/todoService";
const TodoTask: React.FC = () => {
  const { loading, data } = useQuery(listTodosService.getAllListTodos);
  const [droppable] = useMutation(todoService.updateDroppable);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else {
      droppable({
        variables: {
          id: result.draggableId,
          currentListId: source.droppableId,
          listId: destination.droppableId,
          index: destination.index,
        },
        refetchQueries: [{ query: listTodosService.getAllListTodos }],
      });
    }
  };
  return (
    <>
      <InputField />
      <DragDropContext onDragEnd={onDragEnd}>
        <div id="content">
          {!loading && data ? (
            data?.listTodos?.map((tab: ListTodoPros) => (
              <Todotab tab={tab} key={tab.id} />
            ))
          ) : (
            <Spin className="spin" />
          )}
        </div>
      </DragDropContext>
    </>
  );
};

export default TodoTask;
