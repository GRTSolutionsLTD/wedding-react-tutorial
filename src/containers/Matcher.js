import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux' 
import Dropdown from 'react-dropdown';
import _ from 'lodash'
import PopupMatcher from '../pages/PopupMatcher';
import 'react-dropdown/style.css';
import * as popupConfig from '../../src/constants/popupConfig.json';
import { updateMatcher, getFemales, getAllUsers, getMales } from '../actions/matcherActoins'
let man
let woman
export class Matcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doryesharim:false,
            selectedMaleFullName: "",
            selectedWomanFullName: "",
            popupContent: "",
            isOpenPopap: false,
            users: [],
            men: [],
            women: [],
            matcher: {
                manIndex: -1,
                womanIndex: -1
            }
        }
    }
    ///lifecycle
    componentWillReceiveProps(nextProps) {
        // on page load || update users list
        if (this.props.data !== nextProps.data) {
            this.setState({ users: [...nextProps.data] }, this.setMatcherData);
        }
        if (this.props.isWomanPaylodSucceeded != null && this.props.isManPaylodSucceeded != null){
            this.getContentPopup();
        }
        if (this.props.men != nextProps.men) {
            this.setState({ men: [...nextProps.men] });
        }
        if (this.props.women != nextProps.women) {
           this.setState({ women: [...nextProps.women] });
        }
    }
    componentWillMount() {
        this.props.getAllUsers();
        
        this.setState({men:this.props.men})
        this.setState({women:this.props.women})
    }
    ///functions
    handleChangeMale = (e) => {
        this.setState({
            matcher: {
                manIndex: _.findIndex(this.state.users, user => user.id == e.value),
                womanIndex: this.state.matcher.womanIndex,
            },
            selectedMaleFullName: e.label
        });
    }
    handleChangeFemale = (e) => {
        this.setState({
              matcher: {
                manIndex: this.state.matcher.manIndex,
                womanIndex: _.findIndex(this.state.users, user => user.id == e.value),
            },
            selectedWomanFullName: e.label
        });
    }
        
    getContentPopup = () => {
        
        if (this.props.isManPaylodSucceeded == null && this.props.isWomanPaylodSucceeded == null)
         {   this.setState({ popupContent: popupConfig.message.matcher.detailsWrong });}
        else if(this.state.doryesharim==false){
                this.setState({ popupContent: popupConfig.message.matcher.falseDorYesharim });
            }
        else if (this.props.isManPaylodSucceeded == true && this.props.isWomanPaylodSucceeded == true) {
            this.setState({ popupContent: man.firstName + "  &&  " + woman.firstName + popupConfig.message.matcher.succeeded });
        }
        else {
            this.setState({ popupContent: popupConfig.message.matcher.failed });
        }
        this.openPopup();
    }
    validateMatcher = () => {
        return this.state.matcher.manIndex != -1 && this.state.matcher.womanIndex != -1;
     }
     getUserFullName = (user) => user.firstName + " " + user.lastName;
    //  onChangeDORYESHARIM=(event)=>{
    //      this.state.doryesharim==true?this.state.doryesharim=false:this.state.doryesharim=true;
    //      console.log(this.state.doryesharim);
    //     }
        setMatcherData = () => {
            console.log(this.props)
            console.log(this.props.men)
            ;
           this.props.getMales();
            this.props.getFemales();
            let matcher = {
                manIndex: -1,
                womanIndex: -1
            }
            this.setState({ matcher });
            this.setState({ selectedMaleFullName: "", selectedWomanFullName: "" });
        }
        onChangeDORYESHARIM=(event)=>{
            this.state.doryesharim==true?this.state.doryesharim=false:this.state.doryesharim=true;
            console.log(this.state.doryesharim);
           }
    makeMatch = () => {
        if (!this.validateMatcher()) {
            this.getContentPopup();
            return;
        }
        const users = [...this.state.users];
        man = users[this.state.matcher.manIndex];
        woman = users[this.state.matcher.womanIndex];
        ;
       if(!this.checkValid(man,woman)) {
        this.openPopup();
        return;
    }
        // man.status = 1;
        // woman.status = 1;
        this.props.updateMatcher();
        this.setMatcherData();
    }
    checkValid=(man,woman)=>{
        ;
        if(man.firstName==woman.fatherName)
        {
             this.setState({ popupContent: popupConfig.message.matcher.wrongMenName });
        }
        if(woman.firstName==man.motherName){
            this.setState({ popupContent: popupConfig.message.matcher.wrongWomenName });
        }
        if((man.selectedOptionStatus=="Single"&&woman.selectedOptionStatus!="Single")||(woman.selectedOptionStatus=="Single"&&man.selectedOptionStatus!="Single")){
            this.setState({ popupContent: popupConfig.message.matcher.wrongMatchBetweenPair });
        }
        if(man.selectedOptionCommunity!=woman.selectedOptionCommunity)
        {
            this.setState({ popupContent:popupConfig.message.matcher.wrongMatchBetweenCommunity });
        }
    }

    openPopup = () => {
        this.setState({ isOpenPopap: true });
    }
    closePopup = () => {
        this.setState({
            isOpenPopap: false
        });
    
    
    }
    render() {
        return (
            <div className="matcher">
                <div className="drop-down">
                    {this.state.men &&
                        <Dropdown
                            options={this.state.men.map(man => ({ value: man.id, label: this.getUserFullName(man) }))}
                            onChange={(e) => this.handleChangeMale(e)}
                            value={this.state.selectedMaleFullName} placeholder="Select an male" />}
                    <br />  {this.state.women &&
                        <Dropdown
                            options={this.state.women.map(woman => ({ value: woman.id, label: this.getUserFullName(woman) }))}
                            onChange={(e) => this.handleChangeFemale(e)}
                            value={this.state.selectedWomanFullName} placeholder="Select an female" />}
                          		<div>
				{<a href="tel:050-412-6160">CALL DOR-YESHARIM</a>}
				<label className="checkbox">
					<input type="checkbox" onChange={this.onChangeDORYESHARIM} />
					<span className="checkbox-label">DOR YESHARIM</span>
				</label>
				</div>  
                </div>
                <br />
                <br />
                <PopupMatcher show={this.state.isOpenPopap}>
                    <button className="popup-close"
                        onClick={() => this.closePopup()}>x</button>
                    {this.state.popupContent}
                    <div>
                    { <a target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/?view=cm&fs=1&to=tzippy6160@gmail.com,frid6280@gmail.com&su=SUBJECT&body=BODY&bcc=tzippy6160@gmail.com">שלח הצעה לבני הזוג</a> }
</div>
                </PopupMatcher>
                <button
                    onClick={this.makeMatch}
                    className="c-button">Make a match</button>
                <br /><br />
                <Link to="register" className="c-button">Cancel</Link>
            </div>
        );
    }
}
//map props and states
const mapStateToProps = (state) => {
    ;
    return {
        data: state.matcher.data,
         men: state.matcher.men,
         women: state.matcher.women,
        // men: state.register.men,
        // women: state.register.women,
        isWomanPaylodSucceeded: state.matcher.isWomanPaylodSucceeded,
        isManPaylodSucceeded: state.matcher.isManPaylodSucceeded,
    };
}
const mapDispatchToProps = (dispatch) => {
    ;
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        updateMatcher: (man, woman) => { dispatch(updateMatcher(man, woman)) },
       getMales: () => dispatch(getMales()),
      getFemales: () => dispatch(getFemales())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Matcher)






// getContentPopup = () => {
    //     
    //     if (this.props.isManPaylodSucceeded == null && this.props.isWomanPaylodSucceeded == null)
    //      {   this.setState({ popupContent: popupConfig.message.matcher.detailsWrong });}
    //     else if(this.state.doryesharim==false){
    //             this.setState({ popupContent: popupConfig.message.matcher.falseDorYesharim });
    //         }
    //     else if (this.props.isManPaylodSucceeded == true && this.props.isWomanPaylodSucceeded == true) {
    //         this.setState({ popupContent: man.firstName + "  &&  " + woman.firstName + popupConfig.message.matcher.succeeded });
    //     }
    //     else {
    //         this.setState({ popupContent: popupConfig.message.matcher.failed });
    //     }
    //     this.openPopup();
    // }

    // validateMatcher = () => {
    //    return this.state.matcher.manIndex != -1 && this.state.matcher.womanIndex != -1;
    // }
    // setMatcherData = () => {
    //     console.log(this.props)
    //     console.log(this.props.men)
    //     ;
    //     //this.props.getMales();
    //    // this.props.getFemales();
    //     let matcher = {
    //         manIndex: -1,
    //         womanIndex: -1
    //     }
    //     this.setState({ matcher });
    //     this.setState({ selectedMaleFullName: "", selectedWomanFullName: "" });
    // }
    // getUserFullName = (user) => user.firstName + " " + user.lastName;
    // onChangeDORYESHARIM=(event)=>{
    //     this.state.doryesharim==true?this.state.doryesharim=false:this.state.doryesharim=true;
    //     console.log(this.state.doryesharim);
    //    }