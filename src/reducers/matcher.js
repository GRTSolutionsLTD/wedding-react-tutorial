import _ from 'lodash'
import { eSex, eStatus,eCommunity } from '../constants/enums'
let initialState = { data: [],  isManPaylodSucceeded: null, isWomanPaylodSucceeded: null}
const matcher = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MATCHER':
      state.isManPaylodSucceeded = null;
      state.isWomanPaylodSucceeded = null;
      return {
        ...state
      }
    case 'GET_ALL_USERS':
      return {
        ...state, data: [...action.data]
      }
      case 'GET_MALES':
      return {
        ...state, men: getListBySex(state.data, eSex.Male.value)

      }
    case 'GET_FEMALES':
      return {
        ...state, women: getListBySex(state.data, eSex.Female.value)
      }
    case 'GET_ME_STUFF_ERROR':
      if (action.kind == "man")
        state.isManPaylodSucceeded = false;
      else state.isWomanPaylodSucceeded = false;
      return {
        ...state
      }
    case 'GET_ME_STUFF_SUCCESS':
      if (action.kind == "man")
          state.isManPaylodSucceeded = true;
      else {
      state.isWomanPaylodSucceeded = true;
      }
      return {
        ...state
      }
    default:
      return state
  }
}
let getListBySex = (users,sex) => {
  let user1 = users.filter(user => user.selectedOption == sex && user.selectedOptionStatus == eStatus.Single.value);
  return _.sortBy(user1, ["firstName", "lastName"])
}
export default matcher