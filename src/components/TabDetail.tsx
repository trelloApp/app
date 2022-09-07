import { useMutation, useQuery } from "@apollo/client";
import { Avatar, Card, Col, Modal, Popover, Row } from "antd";
import React, { useState } from "react";
import todoService from "../service/todoService";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import listTodosService from "../service/listTodosService";
type Props = {
  id: string;
  listId: string;
};

const TabDetail: React.FC<Props> = ({ id, listId }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const { data } = useQuery(todoService.getTodosById, {
    variables: { id },
  });
  const [remove] = useMutation(todoService.deleteTodo);
  console.log("data", data);
  const handleDelete = (id: string, listId: string) => {
    remove({
      variables: {
        id,
        listId,
      },
      refetchQueries: [{ query: listTodosService.getAllListTodos }],
    });
  };
  const handleEmployee = () => {
    setVisible(true);
  };
  const content = (
    <div className="Popover_content">
      <p>Content</p>
    </div>
  );
  return (
    <>
      {data?.todo && (
        <div className="site-card-border-less-wrapper detail position-relative">
          <Card title={data?.todo?.todo} bordered={true}>
            {data?.todo?.authorId && (
              <Row>
                <Col xs={12}>
                  <EyeOutlined />
                </Col>
                <Col xs={12}>
                  data?.todo?.authorId?.src? (
                  <Avatar src={data?.todo?.authorId?.src}></Avatar>): (
                  <Avatar
                    className="position-absolute icon_delete"
                    onClick={handleEmployee}
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {data?.todo?.authorId?.name &&
                      data?.todo?.name.charAt(0).toUpperCase()}
                  </Avatar>
                  )
                </Col>
              </Row>
            )}
          </Card>
          <Popover content={content} placement="right" trigger="hover">
            <EditOutlined className="position-absolute icon_edit" />
          </Popover>
          <p className="delete" onClick={() => handleDelete(id, listId)}>
            Delete Todo id ${id} listID ${listId}
          </p>
          <Modal
            title="Title"
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
