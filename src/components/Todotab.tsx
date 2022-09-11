import { CloseCircleOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Card, Input, Modal, Tooltip, Form, Select, Spin } from "antd";

import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  errorShow,
  success,
  options,
} from "../pages/notification/notifycationTask";
import listTodosService from "../service/listTodosService";
import { ListTodoPros } from "../service/serviceInterface";
import todoService from "../service/todoService";
import ModalEditContent from "./ModalEditContent";

import "./style/todoTask.scss";
import TabDetail from "./TabDetail";
type Props = {
  tab: ListTodoPros;
};
const Todotab: React.FC<Props> = ({ tab }) => {
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [deleteId, dataMutation] = useMutation(listTodosService.deleteListTodo);
  const [addTodo, dataMutationAdd] = useMutation(todoService.createTodo);
  const handleDelete = (id: string) => {
    console.log("id", id);
    deleteId({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: listTodosService.getAllListTodos }],
    });
  };
  const { data, loading, error, reset } = dataMutation;
  if (error) {
    errorShow("delete fail", options);
    reset();
  }
  if (data) {
    success("delete success", options);
  }
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    console.log("value", form.getFieldsValue(true));
    setTimeout(() => {
      const data = form.getFieldsValue(true);
      addTodo({
        variables: {
          todo: data.todo,
          content: data.content,
          employeeID: data.employeeID,
          authorID: "",
          listID: tab?.id,
        },
        refetchQueries: [{ query: listTodosService.getAllListTodos }],
      });

      setVisible(false);
      setConfirmLoading(false);
      form.resetFields();
    }, 1000);
  };
  return (
    <>
      <Droppable droppableId={tab.id}>
        {(provided, snapshot) => (
          <div
            className="site-card-border-less-wrapper position-relative item"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Card title={tab.name} bordered={true}>
              {tab.list?.map((id, i) => (
                <TabDetail
                  id={id}
                  className={
                    snapshot.isDraggingOver
                      ? "isDraggingOver"
                      : "isUsingPlaceholder"
                  }
                  listId={tab.id}
                  key={id}
                  index={i}
                />
              ))}
              <Tooltip
                title="Please add new to do"
                color="#87d068"
                key="#87d068"
                className="add_todo"
              >
                <Button onClick={showModal}>ADD</Button>
              </Tooltip>
              <CloseCircleOutlined
                onClick={() => handleDelete(tab.id)}
                className="position-absolute icon_delete"
              />
              <Spin
                className={
                  !loading
                    ? "d-none position-absolute loading"
                    : "position-absolute loading"
                }
              />
            </Card>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Modal
        title="ADD TO DO"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Name Of To Do" name="todo" required>
            <Input placeholder="Please Enter Name" name="todo" />
          </Form.Item>
          <Form.Item label="content" name="content">
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item label="Author ID" name="employeeID">
            <Select defaultValue="">
              <Option value="">Please Choose Employee </Option>
              <Option value="rmb">1234567</Option>
              <Option value="dollar">0987654</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <ModalEditContent />
    </>
  );
};

export default Todotab;
