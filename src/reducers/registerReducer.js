import _ from 'lodash'
import { eSex, eStatus,eCommunity } from '../constants/enums'

const initialState={data:[],suggests:[], showSuccessPopup: null,men:[],women:[]}
const register = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
    return { 
      ...state,
       data:updetUsersByAge([...action.data])
       }

    case 'GET_ALL_SUGGESTS':
    return { ...state, suggests: [...action.data] }

    case 'SAVE_PERSON':
    return{
    ...state,
    data:[...state.data,action.data.person],
    showSuccessPopup: true
    }
    case 'SAVE_SUGGEST':
    return{
    ...state,
    suggests:[...state.data,action.data.suggest]
    }
    case 'GET_DETAILS_BYMULT':
 
//state.users=getDetailsbyMulty(state.man,state.data,action.multy)

    return {
      ...state,
    }
    case 'GET_MALES':
    return {
      // ...state, men: getDetailsbyMulty(state.data, eSex.Male.label,action.multy)
   ...state, men: getDetailsbyMulty(state.data, eSex.Male.value)
    }
  case 'GET_FEMALES':
    return {
      // ...state, women: getDetailsbyMulty(state.data, eSex.Female.label,action.multy)
     ...state, women: getDetailsbyMulty(state.data, eSex.Female.value)
    }

  case 'CLOSE_POPUP':
  return{
    ...state,
    showSuccessPopup: false
    }
    default:
    return Object.assign({}, state)
  }}
let updetUsersByAge=(users)=>{
  users.forEach(element => {
    if(new Date(element.startDate).getMonth()===new Date().getMonth()&&new Date(element.startDate).getDay()===new Date().getDay())
    {
      element.age=element.age+1;
    }
  });
return users;
}
  let getDetailsbyMulty = (users,sex) => {
    let user1 = users.filter(user => user.selectedOption == sex && user.selectedOptionStatus == eStatus.Single.value);
    return _.sortBy(user1, ["firstName", "lastName"])
  }
  // let getDetailsbyMulty = (users,sex) => {
  //   let user1 = users.filter(user => user.selectedOption == sex && user.selectedOptionStatus == eStatus.Single.value);
  //   return _.sortBy(user1, ["firstName", "lastName"])
  // }
  // let getDetailsbyMulty = (users,sex,multy) => {
  //   ;
  //   let user1 = users.filter(user => user.selectedOption == sex && user.selectedOptionStatus == eStatus.Single.label);
    
  //   user1=user1.filter(p=> multy.indexOf(p.selectedOptionCommunity)!=-1)
  //   ;
  //   return _.sortBy(user1, ["firstName", "lastName"])
  // }
//   let getDetailsbyMulty = (man,users,multy) => {
// man=users.filter(p=>p.sex==0&&p.status==0)
//     users=users.filter(p=> multy.indexOf(p.community)!=-1)
   
 
//      return _.sortBy(users, ["firstName", "lastName"])
     
//   }
export default register
