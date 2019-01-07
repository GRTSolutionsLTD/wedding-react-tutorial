import _ from 'lodash'
import { eSex, eStatus,eCommunity } from '../constants/enums'

let initialState = { data: []}
const addMeeting = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return {
                ...state, users: [...action.data]
            }
        case 'GET_MALES':
            return {
                ...state, males: getListBySex(state.users, eSex.Male.value)
            }
        case 'GET_FEMALES':
            return {
                ...state, females: getListBySex(state.users, eSex.Female.value)
            }
            case 'SAVE_MEETING':
            return{
                ...state,
                meetings:[...state.data,action.data.meeting],
                showSuccessPopup: true
            }
        default:
            return state
        }
}

let getListBySex = (users,sex) => {
    let user1 = users.filter(user => user.selectedOption == sex && user.selectedOptionStatus == eStatus.Single.value);
    return _.sortBy(user1, ["firstName", "lastName"])
  }

export default addMeeting