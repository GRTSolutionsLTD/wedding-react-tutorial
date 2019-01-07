import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-dropdown/style.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { getAllUsers, getFemales, getMales, saveMeeting } from '../actions/addMeetingActions'
let male
let female

class AddMeeting extends React.Component {
    meeting = { idMale: '', nameMale: '', idFemale: '', nameFemale: '', dateMeeting: moment(), place: ''}
    constructor(props) {
      super(props)
        this.state = {
            selectedMaleFullName: "",
            selectedFemaleFullName: "",
            popupContent: "",
            isOpenPopap: false,
            users: [],
            males: [],
            females: [],
            startDate: moment(),
            place: ""
        }
    }

    getUserFullName = (user) => user.firstName + " " + user.lastName;

    ///lifecycle
    componentWillReceiveProps(nextProps) {
        // on page load || update users list
        if (this.props.data !== nextProps.data) {
            this.setState({ users: [...nextProps.data] }, this.setAddMeetingData); 
        }
         if(this.props.males !== nextProps.males)
         {
            this.setState({males:nextProps.males});
            this.setState({females:nextProps.females});
         }
    }

    componentWillMount() {
        this.props.getAllUsers();
    }

    ///functions
    setAddMeetingData = () => {
        this.props.getMales();
        this.props.getFemales();
    }
    
    handleChangeMale = (e) => {
        this.meeting.idMale = e.value;
        this.meeting.nameMale = e.label;
    }
    handleChangeFemale = (e) => {
        this.meeting.idFemale = e.value;
        this.meeting.nameFemale = e.label;
    }
    handleChangeDate(date) {
        this.meeting.dateMeeting = date;
    }

    handleChangePlace(place) {
        this.setState({place:place});
    }

    signUp = (event) => {
        console.log('signUp')
        this.props.saveMeeting(this.meeting);
    }

    render() {
        return (
            <div className="container">  
                <h1>Add Meeting :)</h1>
                <div className="drop-down">
                    {this.state.males &&
                        <Dropdown
                            options={this.state.males.map(male => ({ value: male.id, label: this.getUserFullName(male) }))}
                            onChange={(e) => this.handleChangeMale(e)}
                            value={this.state.selectedMaleFullName} placeholder="Select a male" />}
                    <br />  {this.state.females &&
                        <Dropdown
                            options={this.state.females.map(female => ({ value: female.id, label: this.getUserFullName(female) }))}
                            onChange={(e) => this.handleChangeFemale(e)}
                            value={this.state.selectedFemaleFullName} placeholder="Select a female" />}
                </div>
                <br /> 
                <DatePicker 
                    todayButton={"today"} selected={this.state.startDate} onChange={(e) => this.handleChangeDate(e)} />
                <br /> 
                {/*<Input 
                    type="text" placeholder="place" id="place" name="place"
                onChange={(e) => this.handleChangePlace(e)} /> */}
                <br/><br/><hr/>
                <button className="c-button disable-butten" type="button" onClick={(e) => this.signUp(e)}>
                    Add Meeting
                </button>
            </div>
        )
    }
}

//map states and props
const mapStateToProps = (state) => {
    console.log('the state in : mapStateToProps');
    console.log(state);
    return{
        data: state.addMeeting.users,
        males: state.addMeeting.males,
        females: state.addMeeting.females
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        getMales: () => dispatch(getMales()),
        getFemales: () => dispatch(getFemales()),
        saveMeeting: (meeting) => { dispatch(saveMeeting(meeting)) },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddMeeting)

