import { gql } from "@apollo/client";
const getAllTodos = gql`
  query {
    todos {
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
const getTodosById = gql`
  query ($id: ID!) {
    todo(id: $id) {
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
const createTodo = gql`
  mutation addTodo(
    $todo: String!
    $authorID: ID
    $employeeID: ID
    $listID: String
  ) {
    createTodo(
      todo: $todo
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
  mutation {
    updateTodo(id: ID, todo: String, authorId: String, employeeId: String) {
      id
      todo
      createdAt
      author {
        id
        name
      }
      employee {
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
const todoService = {
  getAllTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
};
export default todoService;
