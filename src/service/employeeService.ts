import { gql } from "@apollo/client";
const getAllEmployee = gql`
  query {
    employees {
      id
      name
    }
  }
`;
const employeeService = {
  getAllEmployee,
};
export default employeeService;
