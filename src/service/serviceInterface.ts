export type TodoPros = {
  id: string;
  todo: string;
  status: number;
  authorId: AuthorProps;
  employeeId: EmployeePro;
  createdAt: string;
  updatedAt: string;
};
export type ListTodoPros = {
  id: string;
  name: string;
  list: [string];
  createdAt: string;
  updatedAt: string;
};
export type AuthorProps = {
  id: string;
  name: string;
  listCreate: [TodoPros];
  createdAt: string;
  updatedAt: string;
};
export type EmployeePro = {
  id: string;
  name: string;
  status: number;
  listTodos: [TodoPros];
  createdAt: string;
  updatedAt: string;
};
