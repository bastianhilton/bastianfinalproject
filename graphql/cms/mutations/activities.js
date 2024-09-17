import gql from 'graphql-tag';

export const CREATE_ACTIVITY = gql`
  mutation CREATE_ACTIVITY($content: String!) {
    createActivity(input: {content: $content, type: ACTIVITY_UPDATE}) {
    activity {
      content
      date
      status
      title
      type
    }
  }
}`

export const UPDATE_ACTIVITY = gql`
  mutation UPDATE_ACTIVITY($content: String!, $id: ID!) {
    updateActivity(input: {content: $content, type: ACTIVITY_UPDATE, id: $id}) {
      activity {
        content
        date
        id
        status
        title
        type
      }
    }
  }`

export const DELETE_ACTIVITY = gql`
  mutation DELETE_ACTIVITY($id: ID!) {
    deleteActivity(input: {id: $id}) {
      activity {
        id
      }
    }
  }`

//export default { CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY }