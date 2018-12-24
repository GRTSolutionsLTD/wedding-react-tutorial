import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router'
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import _ from 'lodash'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export class MatcherPage extends React.Component {
    user = [];
    constructor(props) {
       
        console.log("constractor")
        super(props);
        this.state = {
            users: [],
            male: [],
            female: [],
            indexMale: 1,
            indexFemale: 1
        }               
    }

    fillArray = () => { 
      this.state.users= _.sortBy(this.state.users, ["firstName","lastName"]);
       console.log(this.state.users.map(p=>p.firstName))
       // const male = _.filter(this.state.users, p => p.sex == 1 && p.status == 0);
//const female = _.filter(this.state.users, p => p.sex == 0 && p.status == 0);
        this.setState({ indexMale: -1, indexFemale: -1, male, female }, () => {  });
       
    }
    handleChangeFemale = (event) => {
        console.log(event);
        this.state.indexFemale = this.state.users.find(p1 => p1.firstName + " " + p1.lastName == event.value);
        this.state.indexFemale = _.findIndex(this.state.users, this.state.indexFemale);
    }

    handleChangeMale = (event) => {
        console.log(event);
        this.state.indexMale = this.state.users.find(p1 => p1.firstName + " " + p1.lastName == event.value);
        this.state.indexMale = _.findIndex(this.state.users, this.state.indexMale)
    }

    componentWillMount() {
      console.log("componentWillMount");
        axios.get('http://localhost:3000/data').then(res => {
            this.user = res.data;
            this.state.users = res.data;
            this.fillArray();
        });
    }

    componentWillUpdate(nextProps, nextState) {
        
    }
    makeMatch = () => {
        if (this.state.indexFemale != -1 && this.state.indexMale != -1) {
            alert(this.state.users[this.state.indexFemale].firstName + "  &&  " + this.state.users[this.state.indexMale].firstName + "   got married");
            const users = [...this.state.users];
            users[this.state.indexFemale].status = 1;
            users[this.state.indexMale].status = 1;
            this.setState({ users })
            axios.put(`http://localhost:3000/data/${users[this.state.indexFemale].id}`, users[this.state.indexFemale]).then(res => {         
            });
            axios.put(`http://localhost:3000/data/${users[this.state.indexMale].id}`, users[this.state.indexMale]).then(res => {        
            });
            this.fillArray();
        }
        else {
            alert("You need to make match betwwen male&feMale");
        }
    }
    render() {
        return (
            <div>
                <div className="drop-down">
                    <Dropdown options={this.state.male.map(p => ({ value: p.firstName + " " + p.lastName, label: p.firstName + " " + p.lastName }))} onChange={this.handleChangeMale} value={this.state.value} placeholder="Select an male" />
                    <Dropdown options={this.state.female.map(p => ({ value: p.firstName + " " + p.lastName, label: p.firstName + " " + p.lastName }))} onChange={this.handleChangeFemale} value={this.state.value} placeholder="Select an female" />
                    </div>
                <button onClick={this.makeMatch} className="c-button">Make a match</button>
                <Link to="/" className="c-button">Cancel</Link>
            </div>
        );
    }
}
export default MatcherPage
