import { gql } from "@apollo/client";
const getAllAuthor = gql`
  query {
    authors {
      id
      name
    }
  }
`;
const authorService = {
  getAllAuthor,
};
export default authorService;
