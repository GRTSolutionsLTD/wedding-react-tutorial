import * as axios from 'axios';
import * as url from '../../src/urls.json'

export const getAllUsers = () => (
    dispatch => {
        return axios.get(url.baseUrl + url.actions.getUsers)
            .then(res => {
                console.log('res: ');
                console.log(res);
                dispatch({
                    type: 'GET_ALL_USERS',
                    data: res.data
                })
            })
            .catch(err => {
                console.log("error");
            });
    }
)

export const getMales = () => {
    return {
        type: 'GET_MALES',
    }
}

export const getFemales = () => {
    return {
        type: 'GET_FEMALES',
    }
}

export const saveMeeting = (meeting) => (
    dispatch => {
      console.log('i am in the actions of add meeting: save meeting');
      return axios.post('http://localhost:3004/meetings',meeting)
          .then(res => {
              dispatch({
                  type: 'SAVE_MEETING',
                  data: res.data
              })
          })
          .catch(err => {
              console.log("error");
          })
  }
)
