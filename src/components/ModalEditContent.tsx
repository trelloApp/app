import { EditOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Form, Input, Modal, Select } from "antd";
import React, { useRef, useState } from "react";
import listTodosService from "../service/listTodosService";
import todoService from "../service/todoService";
import { useAppDispatch, useAppSelector } from "../store";
import { hideModalUpdateContent } from "../store/reducers/auth";

const ModalEditContent: React.FC = () => {
  const data = useAppSelector((state) => state.auth.dataModalupdate);
  setTimeout(() => {});
  const show = useAppSelector((state) => state.auth.modalUpdateContent);

  const dispatch = useAppDispatch();
  const [editContent, setEditContent] = useState(false);
  const [textArea, setTextArea] = useState<string>(data?.content);
  const [update] = useMutation(todoService.updateTodo);
  const textAreaRef = useRef<any>();
  const [form] = Form.useForm();
  const { Option } = Select;
  const handleUpdateOk = () => {
    update({
      variables: {
        id: data?.id,
        content: textArea,
        employeeId: form.getFieldsValue().employeeId,
      },
      refetchQueries: [{ query: listTodosService.getAllListTodos }],
    });
    handleUpdateCancel();
  };
  const handleUpdateCancel = () => {
    dispatch(hideModalUpdateContent());
  };
  const handleOpenEditContent = () => {
    setEditContent(true);
    textAreaRef?.current?.focus();
  };
  const handleContentEditDone = () => {
    setEditContent(false);
  };
  return (
    <>
      <Modal
        title="Update"
        visible={show}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <div className="modal_content">
          <Form form={form}>
            <Form.Item label="Name">
              <span className="todo">{data.todo}</span>
            </Form.Item>
            <Form.Item label="Content" name="content">
              {!editContent ? (
                data?.content !== "" ? (
                  <span>{textArea ? textArea : data.content}</span>
                ) : (
                  <span>Please enter content ...</span>
                )
              ) : (
                <Input.TextArea
                  ref={textAreaRef}
                  rows={5}
                  onBlur={handleContentEditDone}
                  placeholder="Please enter content"
                  defaultValue={data.content}
                  value={textArea}
                  className="TextArea"
                  onChange={(e) => setTextArea(e.target.value)}
                />
              )}
              <EditOutlined
                className={editContent ? "d-none editContent" : " editContent"}
                onClick={handleOpenEditContent}
              />
            </Form.Item>

            <Form.Item label="Employee" name="employeeId">
              <Select defaultValue="">
                <Option value="">Please Choose Employee </Option>
                <Option value="rmb">1234567</Option>
                <Option value="dollar">0987654</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditContent;
