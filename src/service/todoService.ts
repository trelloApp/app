import { gql } from "@apollo/client";
const getAllTodos = gql`
  query {
    todos {
      id
      todo
      content
      createdAt
      authorId {
        id
        name
      }
      employeeId {
        id
        name
      }
    }
  }
`;
const getTodosById = gql`
  query ($id: ID!) {
    todo(id: $id) {
      id
      todo
      content
      createdAt
      authorId {
        id
        name
      }
      employeeId {
        id
        name
      }
    }
  }
`;
const createTodo = gql`
  mutation addTodo(
    $todo: String!
    $content: String
    $authorID: ID
    $employeeID: ID
    $listID: String
  ) {
    createTodo(
      todo: $todo
      content: $content
      authorID: $authorID
      employeeID: $employeeID
      listID: $listID
    ) {
      id
      todo
      createdAt
      authorId {
        id
        name
      }
      employeeId {
        id
        name
      }
    }
  }
`;
const updateTodo = gql`
  mutation update($id: ID!, $employeeId: String, $content: String) {
    updateTodo(id: $id, employeeId: $employeeId, content: $content) {
      id
      todo
      createdAt
      content
      authorId {
        id
        name
      }
      employeeId {
        id
        name
      }
    }
  }
`;
const deleteTodo = gql`
  mutation dele($id: ID!, $listId: ID!) {
    deleteTodo(id: $id, listId: $listId) {
      id
    }
  }
`;
const updateDroppable = gql`
  mutation droppable(
    $id: ID!
    $currentListId: String
    $listId: String
    $index: Int
  ) {
    updateDroppable(
      id: $id
      currentListId: $currentListId
      listId: $listId
      index: $index
    ) {
      id
      currentListId
      listId
      index
    }
  }
`;
const todoService = {
  getAllTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateDroppable,
};
export default todoService;
