
import axios from 'axios';
import * as url from '../../src/urls.json';
export const filterDetails = (searchType) => {
  return {
    type: 'DETAILS_FILTER',
    search: searchType
  }
}
export const getAllDetails = () => (
  dispatch => {
    return axios.get(url.baseUrl + url.actions.getUsers)
      .then(res => {
        dispatch({
          type: 'GET_ALL_DELAILS',
          data: res
        })
      })
      .catch(err => {
        console.log("error");
      }
      )
  })
  export const showDetails = response => ({
    type: 'DETAILS_SHOW_DETAILS',
    response
  })
  
  export const loadDetails = () => ({
    type: 'DETAILS_SHOW_LOADING'
  })
  
export const sortDetailsByDates = (DescendingOrAscending) => {
  return {
    type: 'SORT_DATES',
    orderBy: DescendingOrAscending
  }
}
export const sortDetailsByAge = (DescendingOrAscending) => {
  return {
    type: 'SORT_AGES',
    orderBy: DescendingOrAscending
  }
}
export function updateDataAge(data) {
  return (dispatch) => {
              axios.put(url.baseUrl + url.actions.updateDataAge +data, data).then((response) => {
                  dispatch(getStuffSuccess(response, "DataAge"))
              })
                  .catch((err) => {
                      dispatch(getStuffError(err, "DataAge"))
                  }).then(() => {
                      dispatch({
                          type: 'UPDATE_MATCHER',
                      });
                  })
  }
}

function getStuffSuccess(response, kind) {
  return {
      type: 'GET_ME_STUFF_SUCCESS',
      payload: response,
      kind: kind
  }
}
function getStuffError(err, kind) {
  return {
      type: 'GET_ME_STUFF_ERROR',
      payload: err,
      kind: kind
  }
}