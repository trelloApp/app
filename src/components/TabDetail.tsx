import { useMutation, useQuery } from "@apollo/client";
import { Avatar, Card, Col, Modal, Popover, Row } from "antd";
import React, { useState } from "react";
import todoService from "../service/todoService";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import listTodosService from "../service/listTodosService";
import { TodoPros } from "../service/serviceInterface";
import "./style/tabDetail.scss";
import { useAppDispatch } from "../store";
import { showModalUpdateContent } from "../store/reducers/auth";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  id: string;
  listId: string;
  index: number;
  className: string;
};

const TabDetail: React.FC<Props> = ({ id, listId, index, className }) => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const dispatch = useAppDispatch();
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const { data } = useQuery(todoService.getTodosById, {
    variables: { id },
  });
  const [remove] = useMutation(todoService.deleteTodo);
  const handleDelete = (id: string, listId: string) => {
    remove({
      variables: {
        id,
        listId,
      },
      refetchQueries: [{ query: listTodosService.getAllListTodos }],
    });
  };
  const handleEmployee = (data: TodoPros) => {
    setVisible(true);
  };
  const handleUpdate = (data: TodoPros) => {
    dispatch(showModalUpdateContent(data));
  };
  const showStatusContent = () => {
    setShow(!show);
  };
  const content = (
    <div className="Popover_content">
      <p className="delete" onClick={() => handleEmployee(data.todo)}>
        Change Employee
      </p>
      <p className="delete" onClick={() => handleUpdate(data.todo)}>
        update
      </p>
      <p className="delete" onClick={() => handleDelete(id, listId)}>
        remove
      </p>
    </div>
  );

  return (
    <>
      {data?.todo && (
        <div className="site-card-border-less-wrapper detail position-relative">
          <Draggable draggableId={id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Card
                  title={data?.todo?.todo}
                  bordered={true}
                  onClick={showStatusContent}
                  className={className}
                >
                  {show && data.todo.content && (
                    <Row>
                      <Col xs={21}>
                        <div className="content">{data?.todo?.content}</div>
                      </Col>
                      <Col xs={3} className="text-center">
                        {data?.todo?.authorId?.src ? (
                          <Avatar src={data?.todo?.authorId?.src}></Avatar>
                        ) : (
                          <Avatar
                            className="avata"
                            onClick={() => handleEmployee(data.todo)}
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                            }}
                          >
                            {data?.todo?.authorId?.name &&
                              data?.todo?.name.charAt(0).toUpperCase()}
                          </Avatar>
                        )}
                      </Col>
                    </Row>
                  )}
                </Card>
              </div>
            )}
          </Draggable>

          <Popover content={content} placement="right" trigger="hover">
            <EditOutlined className="position-absolute icon_edit" />
          </Popover>

          <Modal
            title="Update Employee"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </div>
      )}
    </>
  );
};

export default TabDetail;
