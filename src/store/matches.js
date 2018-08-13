import axios from 'axios'

//ACTION TYPES
export const GET_SUGGESTED_MATCHES = 'GET_SUGGESTED_MATCHES'

//ACTION CREATORS
const getSuggestedMatches = suggestedMatches => {
  return { type: GET_SUGGESTED_MATCHES, suggestedMatches }
}

//THUNK CREATORS
export const fetchSuggestedMatches = id => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${id}/suggestedMatches`
      )
      const suggestedMatches = response.data
      const action = getSuggestedMatches(suggestedMatches)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case GET_SUGGESTED_MATCHES:
      return action.suggestedMatches
    default:
      return state
  }
}
