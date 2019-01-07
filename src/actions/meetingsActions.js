
import axios from 'axios';
import * as url from '../../src/urls.json';

export const getAllMeetings = () => (
  dispatch => {
      return axios.get(url.baseUrl + url.actions.getMeetings)
          .then(res => {
              console.log('res: ');
              console.log(res);
              dispatch({
                  type: 'GET_ALL_MEETINGS',
                  data: res.data
              })
          })
          .catch(err => {
              console.log("error");
          });
  }
)