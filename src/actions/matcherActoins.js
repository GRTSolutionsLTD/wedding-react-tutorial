import * as axios from 'axios';
import * as url from '../../src/urls.json'
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
export const getAllUsers = () => (
    dispatch => {
        return axios.get(url.baseUrl + url.actions.getUsers)
            .then(res => {
                dispatch({
                    type: 'GET_ALL_USERS',
                    data: res.data
                })
            })
            .catch(err => {
                console.log("error");
            });
    })
export function updateMatcher(man, woman) {
    return (dispatch) => {
        axios.put(url.baseUrl + url.actions.updateMatchers + man.id, man)
        axios.put(url.baseUrl + url.actions.updateMatchers + man.id, man)
            .then((response) => {
                dispatch(getStuffSuccess(response, "man"))
            })
            .catch((err) => {
                dispatch(getStuffError(err, "man"))
            }).then(() => {
                axios.put(url.baseUrl + url.actions.updateMatchers + woman.id, woman).then((response) => {
                    dispatch(getStuffSuccess(response, "woman"))
                })
                    .catch((err) => {
                        dispatch(getStuffError(err, "woman"))
                    }).then(() => {
                        dispatch({
                            type: 'UPDATE_MATCHER',
                        });
                    })
            });
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
