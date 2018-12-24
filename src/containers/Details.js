import React from 'react';
import { connect } from 'react-redux';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import Dropdown from 'react-dropdown'
import 'moment-timezone';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropdown/style.css';
import { updateDataAge,getAllDetails, sortDetailsByDates, filterDetails,sortDetailsByAge } from '../actions/detailsActions';
import { eeStatus, eSortDirection } from '../constants/enums';


class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrData:[],
      status: [{
        value: eeStatus.Married.id,
        label: eeStatus.Married.value
      },
      {
        value: eeStatus.Single.id,
        label: eeStatus.Single.value
      },
      {
        value: eeStatus.Widow.id,
        label: eeStatus.Widow.value
      },
      {
        value: eeStatus.Development.id,
        label: eeStatus.Development.value
      }
    ],
      orderBy: [{
        value: eSortDirection.Descending.id,
        label: eSortDirection.Descending.value
      },
      {
        value: eSortDirection.Ascending.id,
        label: eSortDirection.Ascending.value
      }]
    };
  }
  
  updateDataAgeFunc=()=>{
    this.props.data.forEach(element => {
      if(element.startDate=new Date()){
        element.age=element.age+1;
      }
    });
    this.props.updateDataAge();
    this.props.getAllDetails();
  }
 // react lifecycle
  componentWillMount() {
    this.props.getAllDetails();
  }
  //functions
  isLoading = () => {
    return this.props.detailsState.loading;
  }
  Spinner = () => {
    return <div className="c-details__spinner"></div>
  }
  Information = () => {
    return (
      <p className="title">All Details:</p>
    )
  }
  searchByStatus = (searchByStatus) => {
    this.props.filterDetails(searchByStatus.label);
  }
  sortDetailsByDates = (DescendingOrAscending) => {
    ;
    this.props.sortDetailsByDates(DescendingOrAscending.label);
  }
  sortDetailsByAge = (DescendingOrAscending) => {
    ;
    this.props.sortDetailsByAge(DescendingOrAscending.label);
  }
  render() {
    return (
      <div className="details">
        <Grid
          style={{ height: '550px', width: '900px' }}
           data={this.props.data} sortable={true}>
          <Column field="id" title="ID" width="100px" />
          <Column field="lastName" title="Last Name" width="100px" />
          <Column field="firstName" title="First Name" width="100px" />
          <Column field="email" title="status" width="100px" />
          <Column field="tel" title="tel" width="100px"/>
          <Column field="age" title="age" width="100px"/>
          <Column field="selectedOption" title="selectedOption" width="100px"/>
          <Column field="selectedOptionCommunity" title="selectedOptionCommunity" width="100px"/>
          <Column field="selectedOptionStatus" title="selectedOptionStatus" width="100px"/>
          <Column field="startDate" title="Born Date" width="100px" format="{0: yyyy-MM-dd HH:mm:ss}" />
        </Grid> 
        <Dropdown options={this.state.status} onChange={this.searchByStatus} placeholder="sort by date: Merried or Single" />
        <Dropdown options={this.state.orderBy} onChange={this.sortDetailsByDates} placeholder="sort by date: Descending or Ascending" />
        <Dropdown options={this.state.orderBy} onChange={this.sortDetailsByAge} placeholder="sort by age: Descending or Ascending" />
      </div>
    )
  }
}
//map states and props
const mapStateToProps = (storeState) => {
  return{
    data: storeState.detailsResucer.displayData
  };
}
const mapDispatchToProps = (dispatch) => {
 
  return {
    getAllDetails: function()  {  ; return dispatch(getAllDetails()) },
    filterDetails: (search) => dispatch(filterDetails(search)),
    sortDetailsByDates: (DescendingOrAscending) => dispatch(sortDetailsByDates(DescendingOrAscending)),
    sortDetailsByAge: (DescendingOrAscending) => dispatch(sortDetailsByAge(DescendingOrAscending)),
    updateDataAge: (data) => { dispatch(updateDataAge(data)) }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)