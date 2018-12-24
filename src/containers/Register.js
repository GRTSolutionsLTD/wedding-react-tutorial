import React from 'react'
import {Component } from 'react';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/registerAction';
import { savePerson } from '../actions/registerAction';
import { closePopup } from '../actions/registerAction';
import 'react-datepicker/dist/react-datepicker.css';
import Popup from '../pages/Popup';
import { Link } from 'react-router'
import * as _ from 'lodash';
import {eSex,eStatus,eCommunity} from '../constants/enums'
import * as popupConfig from '../constants/popupConfig.json';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import * as validator from 'validator';

 

const required = (value) => {
  if (!value.toString().trim().length) {
    return 'require';
  }
};
const emailFormat = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};
const telFormat = (value) => {
  if(!(/^[0-9]*$/i.test(value)))
  return `${value} is not a valid tel. tel includes just numbers.`
  if( !(value.length >= 9 && value.length <=10))
  return `${value} is not a valid tel. tel length is 9 chars.`
};
const dorYesharimFormat = (value) => {
  if(!(/^[0-9]*$/i.test(value)))
  return `${value} is not a valid dorYesharim. dorYesharim includes just numbers.`
  if( !(value.length >= 9 && value.length <=10))
  return `${value} is not a valid dorYesharim. dorYesharim length is 9 chars.`
};
const getMoneyFormat = (value) => {
  if(!(/^[0-9]*$/i.test(value)))
  return `${value} is not a valid getMoney. getMoney includes just numbers.`
};
const giveMoneyFormat = (value) => {
  if(!(/^[0-9]*$/i.test(value)))
  return `${value} is not a valid giveMoney. giveMoney includes just numbers.`
};
const idFormat = (value) => {
    if(!(/^[0-9]*$/i.test(value)))
    return `${value} is not a valid id. id includes just numbers.`
    if( !(value.length >= 9 && value.length <=10))
    return `${value} is not a valid id. id length is 9 chars.`
  };
  const firstnameFormat = (value) => {
    if(!(/^[a-zA-Z\s]*$/i.test(value))){
    return `${value} is not a valid first name. first name can include just letters and spaces.`}
  };
  const lastnameFormat = (value) => {
    if(!(/^[a-zA-Z\s]*$/i.test(value))){
    return `${value} is not a valid last name. last name can include just letters and spaces.`}
  };
  const mothernameFormat = (value) => {
    if(!(/^[a-zA-Z\s]*$/i.test(value))){
    return `${value} is not a valid mothernameFormat. mothernameFormat can include just letters and spaces.`}
  };
  const fathernameFormat = (value) => {
    if(!(/^[a-zA-Z\s]*$/i.test(value))){
    return `${value} is not a valid fathernameFormat. fathernameFormat can include just letters and spaces.`}
  };


class SignUp extends Component {
person = { id: '', lastName: '', firstName: '',motherName:'',fatherName:'',dorYesharim:'', email: '',tel:'',giveMoney:'',getMoney:'', age: '', selectedOption: '',selectedOptionCommunity:'', startDate: moment(), selectedOptionStatus:'' }
constructor(props, context) {
super(props, context);
this.state = {
selectedOption: '',
selectedOptionStatus: '',
startDate: moment(),
date: new Date(),
isOpen: false, 
errorEmail:"",
options: [
{
value:eSex.Male.id,
label:eSex.Male.value},
{
value:eSex.Female.id,
label:eSex.Female.value}
],
optionsCommunity: [
  {
  value:eCommunity.Moroccan.id,
  label:eCommunity.Moroccan.value},
  {
  value:eCommunity.Hasidim.id,
  label:eCommunity.Hasidim.value},
  {
    value:eCommunity.lightfish.id,
    label:eCommunity.lightfish.value},
    {
      value:eCommunity.AYemenite.id,
      label:eCommunity.AYemenite.value},
    {
      value:eCommunity.Spanish.id,
      label:eCommunity.Spanish.value}
  ],
  optionsStatus: [
    {
    value:eStatus.Single.id,
    label:eStatus.Single.value},

    {value:eStatus.Widow.id,
    label:eStatus.Widow.value},
    
    {value:eStatus.Development.id,
    label:eStatus.Development.value},
    ],
contentPopup:'',
flagEnableButton:false
};
this.handleChange = this.handleChange.bind(this);
this.handleChangeDate = this.handleChangeDate.bind(this);
this.handleChangeCommunity = this.handleChangeCommunity.bind(this);
this.handleChangeStatus = this.handleChangeStatus.bind(this);
}
componentWillMount() {
this.props.getAllUsers();
}
componentDidMount() {
this.timerID = setInterval(
() => this.tick(),
1000
);
}
componentWillUnmount() {
clearInterval(this.timerID);
}
componentWillReceiveProps(nextProps) {
if(this.props.showSuccessPopup!=null){
if(this.props.showSuccessPopup==true){
this.setContextPopup(true);
}
if(this.props.showSuccessPopup==false){
this.closePopup();
}
}
}
tick() {
this.setState({ date: new Date() });
}
handleChange = (selectedOption) => {
this.setState({ selectedOption });
if (selectedOption) {
  this.person.selectedOption=selectedOption.label;
}
}
handleChangeCommunity = (selectedOptionCommunity) => {
  this.setState({ selectedOptionCommunity });
  if (selectedOptionCommunity) {
    this.person.selectedOptionCommunity=selectedOptionCommunity.label;
  }
  }
  handleChangeStatus = (selectedOptionStatus) => {
    this.setState({ selectedOptionStatus });
    if (selectedOptionStatus) {
      this.person.selectedOptionStatus=selectedOptionStatus.label;
    }
    }
handleChangeDate(date) {
this.setState({ startDate: date });
this.person.age=new Date().getFullYear()-new Date(date).getFullYear();
}
signUp = (event) => {
if (!_.find(this.props.data, { id:this.person.id })) {
  this.props.savePerson(this.person);
}
else{
this.setContextPopup(false);
}
}
openPopup = () => {
this.setState({ isOpen: true });
}
closePopup = () => {
this.setState({ isOpen: false });
this.props.closePopup();
}
updatePersonProps = (event) => {
let personProperty = event.target.id;
this.person[personProperty] = event.target.value;

if(this.person.email&&this.person.dorYesharim&&this.person.giveMoney&&this.person.getMoney&&this.person.firstName&&this.person.fatherName&&this.person.motherName&&this.person.lastName&&this.person.tel&&this.person.selectedOption&&this.person.selectedOptionCommunity&&this.person.selectedOptionStatus&&this.person.startDate){
  this.setState({flagEnableButton:true});
}
else{
   this.setState({flagEnableButton:false});
}
}
setContextPopup=(isTrue)=>{
if(isTrue==true){
this.setState({contentPopup:popupConfig.message.register.good});}
else{
this.setState({contentPopup:popupConfig.message.register.exist});
}
this.openPopup();
}


render() {
const { selectedOption } = this.state;
const { selectedOptionCommunity } = this.state;
const { selectedOptionStatus } = this.state;
return<Form>
<div className="form-inline sign-in-form">
<h2>Add</h2>
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
<div className="form-group">
<DatePicker
todayButton={"today"}
selected={this.state.startDate}
onChange={this.handleChangeDate}
/>
<Input
className="form-control"
type="text"
placeholder="id"
id="id"
onChange={(event) => this.updatePersonProps(event)}
name='id' validations={[required,idFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="firstName"
id="firstName"
onChange={(event) => this.updatePersonProps(event)}
name='firstname' validations={[required,firstnameFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="lastName"
id="lastName"
onChange={(event) => this.updatePersonProps(event)}
name='lastname' validations={[required,lastnameFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="fatherName"
id="fatherName"
onChange={(event) => this.updatePersonProps(event)}
name='fatherName' validations={[required,fathernameFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="dorYesharim"
id="dorYesharim"
onChange={(event) => this.updatePersonProps(event)}
name='dorYesharim' validations={[required,dorYesharimFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="motherName"
id="motherName"
onChange={(event) => this.updatePersonProps(event)}
name='motherName' validations={[required,mothernameFormat]}
/>
<Dropdown
className="form-control sign-in-drop-down"
options={this.state.options}
placeholder="Select an option sex"
id="sex"
value={selectedOption}
onChange={this.handleChange}
/>
<Dropdown
className="form-control sign-in-drop-down"
options={this.state.optionsStatus}
placeholder="Select an option status"
id="status"
value={selectedOptionStatus}
onChange={this.handleChangeStatus}
/>
<Dropdown
className="form-control sign-in-drop-down"
options={this.state.optionsCommunity}
placeholder="Select an option Community"
id="community"
value={selectedOptionCommunity}
onChange={this.handleChangeCommunity}
/>
<Input
className="form-control"
type="text"
placeholder="getMoney"
id="getMoney"
onChange={(event) => this.updatePersonProps(event)}
name='getMoney' validations={[required,getMoneyFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="giveMoney"
id="giveMoney"
onChange={(event) => this.updatePersonProps(event)}
name='giveMoney' validations={[required,giveMoneyFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="email"
id="email"
onChange={(event) => this.updatePersonProps(event)}
name='email' validations={[required,emailFormat]}
/>
<Input
className="form-control"
type="text"
placeholder="tel"
id="tel"
onChange={(event) => this.updatePersonProps(event)}
name='tel' validations={[required,telFormat]}
/>
<button
className="c-button disable-butten"
type="button"
onClick={(event) => this.signUp(event)}
//disabled={!this.state.flagEnableButton}
>
Add
</button>
<Link className="c-button" to="matcher">
Cancel-matcher
</Link>
<Popup show={this.state.isOpen}
onClose={this.props.closePopup}>
<button className="popup-close" 
onClick={()=>this.closePopup()}>x</button>
{this.state.contentPopup}
</Popup>
</div>
</div>
</Form>;
}
}
const mapStateToProps = (state) => {
return {
data: state.register.data,
showSuccessPopup: state.register.showSuccessPopup
};
}
const mapDispatchToProps = (dispatch) => {
return {
getAllUsers: () => { dispatch(getAllUsers()) },
savePerson: (person) => { dispatch(savePerson(person)) },
closePopup: () => { dispatch(closePopup()) }
};
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

