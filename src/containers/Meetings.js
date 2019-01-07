import React from 'react';
import { connect } from 'react-redux';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import Dropdown from 'react-dropdown'
import 'moment-timezone';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-dropdown/style.css';
import { getAllMeetings } from '../actions/meetingsActions';
import { eeStatus, eSortDirection } from '../constants/enums';

class Meetings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingsArr:[],
    };
  }

  //lifecycle:
  componentWillMount() {
    this.props.getAllMeetings();
 }
  
 render() {
    return (
      <div className="container">            
        <table className="table table-striped">
          <thead>
            <tr>
              <th>With: </th>
              <th>Where: </th>
              <th>When: </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            <tr>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
            <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}
//map states and props
const mapStateToProps = (state) => {
  console.log('the state in : mapStateToProps');
    console.log(state);
  return{
   // data: storeState.MeetingsResucer.displayData
   meetingsArr: state.meeting.meetings
  };
}
const mapDispatchToProps = (dispatch) => {
 
  return {
    getAllMeetings: () => dispatch(getAllMeetings()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Meetings)





