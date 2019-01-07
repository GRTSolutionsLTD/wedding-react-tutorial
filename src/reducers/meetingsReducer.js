import _ from 'lodash';
import { eSortDirection } from '../constants/enums';

const initialState = { data: [] }
const meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_MEETINGS':
        return {
            ...state, meetings: [...action.data]
        }
    default:
        return state
    }
}
export default meetingsReducer
