import { gql } from "@apollo/client";

const queries = {};

queries.login = gql`mutation login ($email: String!, $password: String!) {
      login (email: $email, password: $password) {
        user {
          first_name
          last_name
          email
          chapter_id
        }
        token
      }
    }`;

queries.updateItem = gql`mutation updateItem ($item_id: Int!, $total_received: Int!, $chapter_id: Int!) {
            updateItem (item_id: $item_id, total_received: $total_received, chapter_id: $chapter_id) {
          items {
            id
            name
            total_received
          }
        }
      }`;

queries.chapterQuery = gql`query chapter ($id: Int!) {
          chapter (id: $id) {
            items {
              id,
              name,
              total_needed,
              total_received,
              category
            }
          }
        }`;

queries.getItems = gql`query items {
        items {
              id,
              name,
              total_needed,
              total_received,
              category
        }
      }`;

queries.allChapters = gql`query chapters {
        chapters {
          name
          id
          items {
            name
            category
            total_received
          }
        }
      }`;

queries.addNeed = gql`mutation addNeed ($name: String!, $category: String!, $total_needed: Int!, $total_received: Int!) {
            addNeed (name: $name, category: $category, total_needed: $total_needed, total_received: $total_received) {
          id
          name
          total_needed
          total_received
        }
      }`;



export default queries;