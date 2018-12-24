import _ from 'lodash';
import { eSortDirection } from '../constants/enums';

const initialState = { data: [] }
const DetailsReducer = (state = initialState, action) => {
  const { data, displayData } = state;
  switch (action.type) {
    case 'DETAILS_FILTER':
      return {
        ...state,
        displayData: getFilterUsers([...data], action.search)
      }
    case 'GET_ALL_DELAILS':
      return {
        ...state,
        data: action.data.data,
        displayData: action.data.data
      }
    case 'SORT_DATES':
      return {
        ...state,
        displayData: sortUsersByDates([...displayData], action.orderBy)
      }
      case 'SORT_AGES':
      return {
        ...state,
        displayData: sortDetailsByAge([...displayData], action.orderBy)
      }

    default:
      return Object.assign({}, state, initialState)
  }
}
let getFilterUsers = (users, searchValue) => {
  ;
  return _.filter(users, user => user.selectedOptionStatus == searchValue);
}
let sortUsersByDates = (users, sortDirection) => {
  ;
  if (sortDirection == eSortDirection.Ascending.value)
    return users.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  return users.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
}
let sortDetailsByAge = (users, sortDirection) => {
  ;
  if (sortDirection == eSortDirection.Ascending.value)
    return users.sort((a, b) => (a.age) - (b.age));
  return users.sort((a, b) => (b.age) - (a.age));
}
export default DetailsReducer
