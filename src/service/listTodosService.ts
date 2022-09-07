import { gql } from "@apollo/client";
const getAllListTodos = gql`
  query {
    listTodos {
      id
      name
      list
      createdAt
      updatedAt
    }
  }
`;
const getListTodosById = gql`
  query {
    listTodo(id: ID) {
      id
      name
      list
      createdAt
      updatedAt
    }
  }
`;
const createListTodo = gql`
  mutation addTodo($name: String) {
    createListTodo(name: $name) {
      id
      name
      list
      createdAt
      updatedAt
    }
  }
`;
const updatelistTodo = gql`
  mutation {
    updateListTodo(
      currentId: String
      indexCurrentId: Int
      newId: String
      indexNewId: Int
    ) {
      currentId
      indexCurrentId
      newId
      indexNewId
      updatedAt
    }
  }
`;
const deleteListTodo = gql`
  mutation delete($id: ID!) {
    deleteListTodo(id: $id) {
      list
      name
      createdAt
      updatedAt
    }
  }
`;
const listTodosService = {
  getAllListTodos,
  getListTodosById,
  createListTodo,
  updatelistTodo,
  deleteListTodo,
};
export default listTodosService;
