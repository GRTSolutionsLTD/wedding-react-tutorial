import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridDetailRow  } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import Todo from '../components/Todo';
import {getAllUsers,getFemales,getMales,getAllSuggests,saveSuggest } from '../actions/registerAction';
import { connect } from 'react-redux';
import _ from 'lodash';
import PopupMatcher from '../pages/PopupMatcher';
import * as popupConfig from '../../src/constants/popupConfig.json';
import { Link } from 'react-router'
import Input from 'react-validation/build/input';
import nl2br from 'react-newline-to-break'; 
import { filterBy } from '@progress/kendo-data-query';

class DetailComponent extends GridDetailRow {
    render() {
        const dataItem = this.props.dataItem;
        return (
            <section>
                <p><strong>id:</strong> {dataItem.id}</p>
                <p><strong>firstName:</strong> {dataItem.firstName}</p>
                <p><strong>lastName:</strong> {dataItem.lastName}</p>
                <p><strong>motherName:</strong> {dataItem.motherName}</p>
                <p><strong>fatherName:</strong> {dataItem.fatherName}</p>
                <p><strong>email:</strong> {dataItem.email}</p>
                <p><strong>tel:</strong> {dataItem.tel}</p>
                <p><strong>giveMoney:</strong> {dataItem.giveMoney}</p>
                <p><strong>getMoney:</strong> {dataItem.getMoney}</p>
                <p><strong>age:</strong> {dataItem.age}</p>
                <p><strong>selectedOption:</strong> {dataItem.selectedOption}</p>
                <p><strong>selectedOptionCommunity:</strong> {dataItem.selectedOptionCommunity}</p>
                <p><strong>selectedOptionStatus:</strong> {dataItem.selectedOptionStatus}</p>
                <p><strong>startDate:</strong> {dataItem.startDate}</p>
            </section>
        );
    }
}
class TodoPage extends React.Component {
    lastSelectedIndex = 0;
    suggest = { maleId: '', femaleId: '', dateSuggest: new Date() }
    constructor(props) {
        super(props);

        this.state = {
            arrSelected:[],
            doryesharim:false,
            popupContent: "",
            popupContent1: "",
            isOpenPopap: false,
            isOpenPopap1: false,

            sort: [
                { field: 'id', dir: 'asc' }
            ],
            sort2: [
                { field: 'id', dir: 'asc' }
            ],
            skip: 0,
            take: 4,
            skip2: 0,
            take2: 4

        };
        this.selectionChange = this.selectionChange.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.headerSelectionChange = this.headerSelectionChange.bind(this);
    }
pageChange = (event) => {
    this.setState({
        skip: event.page.skip,
        take: event.page.take
    });
}
pageChange2 = (event) => {
    this.setState({
        skip2: event.page.skip,
        take2: event.page.take
    });
}
componentWillMount() {
    this.props.getAllUsers();
    this.props.getAllSuggests();
    setTimeout(() => {
        this.props.getFemales();
        this.props.getMales();
    }, 500);
   
    }
expandChange = (event) => {
    event.dataItem.expanded = !event.dataItem.expanded;
    this.forceUpdate();
}
onChangeDORYESHARIM=(event)=>{
    this.state.doryesharim==true?this.state.doryesharim=false:this.state.doryesharim=true;
    console.log(this.state.doryesharim);
   }
openPopup = () => {
    this.setState({ isOpenPopap: true });
}
closePopup = () => {
    this.setState({
        isOpenPopap: false
    });
    this.setState({ popupContent: "" });
}
openPopup1 = () => {
    this.setState({ isOpenPopap1: true });
}
closePopup1 = () => {
    this.setState({
        isOpenPopap1: false
    });
}
checkValid=(man,woman)=>{
    let pastSuggest=[];
    this.props.suggests.forEach(s => {
        if(s.maleId === man.id&& s.femaleId===woman.id)
        {
            pastSuggest.push(s);
        }
    });
    if(pastSuggest.length>0){
        let strSuggests='';
        pastSuggest.forEach(s => {
            strSuggests+='\n'+s.dateSuggest;
        });
        this.setState({ popupContent1:"that suggest was suggestet in "+ strSuggests+" do you want to suggest again?"});
      return 2;
    }
    if(man.firstName==woman.fatherName)
    {
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.wrongMenName });
    }
    if(woman.firstName==man.motherName){
        this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.wrongWomenName });
    }
    if(man.fatherName==woman.fatherName)
    {
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.wrongFathersName });
    }
    if(man.motherName==woman.motherName)
    {
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.wrongMothersName });
    }
    if((man.selectedOptionStatus=="Single"&&woman.selectedOptionStatus!="Single")||(woman.selectedOptionStatus=="Single"&&man.selectedOptionStatus!="Single")){
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.wrongMatchBetweenPair });
    }
    if(man.selectedOptionCommunity!=woman.selectedOptionCommunity)
    {
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.wrongMatchBetweenCommunity });
    }
    if(man.getMoney>woman.giveMoney)
    {
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.manWantMoreMoney });
    }
    if(woman.getMoney>man.giveMoney)
    {
       this.setState({ popupContent:this.state.popupContent+"\n"+ popupConfig.message.matcher.womanWantMoreMoney });
    }
}
checkSuggest=()=>{
    let man=_.find(this.props.men, { id:this.suggest.maleId});
    let woman=_.find(this.props.women, { id:this.suggest.femaleId});
    if(this.suggest.maleId!=''&&this.suggest.femaleId!=''){
    if((this.checkValid(man,woman))===2){
        this.openPopup1();
    }

else if(this.state.popupContent=='')
{
    this.setState({ popupContent1:man.motherName+"  "+woman.fatherName});
    this.openPopup1();
}
else{
    this.openPopup();
}
}
}
    selectionChange(event) {
    if(event.dataItem.selected==true)
    {
        event.dataItem.selected = !event.dataItem.selected;
        this.forceUpdate();
        if (_.find(this.props.men, { id:event.dataItem.id})) {
            this.suggest.maleId='';
        }
        else{
            if (_.find(this.props.women, { id:event.dataItem.id})) {
                this.suggest.femaleId='';
                console.log(this.suggest);
            }
        }
    }
    else
    {    if (_.find(this.props.men, { id:event.dataItem.id})) {
            let last = this.lastSelectedIndex;
            let current = this.props.men.findIndex(dataItem => dataItem === event.dataItem);
    
            if (!event.nativeEvent.shiftKey) {
                this.lastSelectedIndex = last = current;
            }
    
            if (!event.nativeEvent.ctrlKey) {
                this.props.men.forEach(item => item.selected = false);
            }
            let select = !event.dataItem.selected;
            for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
                this.props.men[i].selected = select;
            }
            this.suggest.maleId=event.dataItem.id;
            this.forceUpdate();
            setTimeout(() => {
                this.checkSuggest();
            },10);
      
      }    
        else   if (_.find(this.props.women, { id:event.dataItem.id})) {
                let last = this.lastSelectedIndex;
                let current = this.props.women.findIndex(dataItem => dataItem === event.dataItem);
        
                if (!event.nativeEvent.shiftKey) {
                    this.lastSelectedIndex = last = current;
                }
        
                if (!event.nativeEvent.ctrlKey) {
                    this.props.women.forEach(item => item.selected = false);
                }
                let select = !event.dataItem.selected;
                for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
                    this.props.women[i].selected = select;
                }
                this.suggest.femaleId=event.dataItem.id;
                this.forceUpdate();
                setTimeout(() => {
                    this.checkSuggest();
                }, 10);
                }    
    }
}

    rowClick(event) {
        if (_.find(this.props.men, { id:event.dataItem.id})) {
            let last = this.lastSelectedIndex;
            let current = this.props.men.findIndex(dataItem => dataItem === event.dataItem);
    
            if (!event.nativeEvent.shiftKey) {
                this.lastSelectedIndex = last = current;
            }
    
            if (!event.nativeEvent.ctrlKey) {
                this.props.men.forEach(item => item.selected = false);
            }
            let select = !event.dataItem.selected;
            for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
                this.props.men[i].selected = select;
            }
            this.suggest.maleId=event.dataItem.id;
            this.forceUpdate();
            setTimeout(() => {
                this.checkSuggest();
            }, 10);
            }    
        else   if (_.find(this.props.women, { id:event.dataItem.id})) {
                let last = this.lastSelectedIndex;
                let current = this.props.women.findIndex(dataItem => dataItem === event.dataItem);
        
                if (!event.nativeEvent.shiftKey) {
                    this.lastSelectedIndex = last = current;
                }
        
                if (!event.nativeEvent.ctrlKey) {
                    this.props.women.forEach(item => item.selected = false);
                }
                let select = !event.dataItem.selected;
                for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
                    this.props.women[i].selected = select;
                }
                this.suggest.femaleId=event.dataItem.id;
                this.forceUpdate();
                setTimeout(() => {
                    this.checkSuggest();
                }, 10);
                }    
    }

    headerSelectionChange(event) {
        const checked = event.syntheticEvent.target.checked;
		this.props.data.forEach(item => item.selected = checked);
        this.forceUpdate();
    }
Suggest = () => {
    this.props.saveSuggest(this.suggest);
  }
    render() {

        return (
          
            <div onMouseDown={e => e.preventDefault()}>
            <label>Males</label>
                <Grid
                    style={{ height: '400px' }}
                    selectedField="selected"
                    onSelectionChange={this.selectionChange}
                    onHeaderSelectionChange={this.headerSelectionChange}
					onRowClick={this.rowClick}
                    sortable={true}
                    
                    detail={DetailComponent}
                    expandField="expanded"
                    onExpandChange={this.expandChange}

                    sortable
                    sort={this.state.sort}
                    onSortChange={(e) => {
                        this.setState({
                            sort: e.sort
                        });
                    }}
                    data={orderBy(this.props.men, this.state.sort).slice(this.state.skip2, this.state.take2 + this.state.skip2)}
                    skip={this.state.skip2}
                    take={this.state.take2}
                    total={this.props.men.length}
                    pageable={true}
                    onPageChange={this.pageChange2}
                    >
                    <Column
                        field="selected"
						width="50rem"
                        headerSelectionValue={
							this.props.data.findIndex(dataItem => dataItem.selected === false) === -1
                        } />
                    <Column field="id" title="id"  width="100rem"/>
                    <Column field="firstName" title="firstName" width="100rem"/>
                    <Column field="lastName" title="lastName"  width="100rem"/>
                    <Column field="motherName" title="motherName" width="100rem"/>
					<Column field="fatherName" title="fatherName" width="100rem"/>
                    <Column field="email" title="email"  width="100rem"/>
                    <Column field="tel" title="tel" width="100rem"/>
                    <Column field="giveMoney" title="giveMoney" width="100rem" />
					<Column field="getMoney" title="getMoney" width="100rem" />
                    <Column field="age" title="age"  width="100rem"/>
                    <Column field="dorYesharim" title="dorYesharim"  width="100rem"/>
                    <Column field="selectedOption" title="selectedOption"  width="100rem"/>
                    <Column field="selectedOptionCommunity" title="Community"  width="100rem"/>
					<Column field="startDate" title="bornDate" width="100rem"/>
                    <Column field="selectedOptionStatus" title="status" width="100rem"/>
                </Grid>

                <label>FeMales</label>
                   <Grid
                    style={{ height: '400px' }}
                    selectedField="selected"
                    onSelectionChange={this.selectionChange}
                    onHeaderSelectionChange={this.headerSelectionChange}
					onRowClick={this.rowClick}
                    sortable={true}

                    detail={DetailComponent}
                    expandField="expanded"
                    onExpandChange={this.expandChange}

                    sortable
                    sort={this.state.sort2}
                    onSortChange={(e) => {
                        this.setState({
                            sort2: e.sort
                        });
                    }}
                    data={orderBy(this.props.women, this.state.sort2).slice(this.state.skip, this.state.take + this.state.skip)}

                    skip={this.state.skip}
                    take={this.state.take}
                    total={this.props.women.length}
                    pageable={true}
                    onPageChange={this.pageChange}
                >
                    <Column
                        field="selected"
						width="50rem"
                        headerSelectionValue={
							this.props.data.findIndex(dataItem => dataItem.selected === false) === -1
                        } />
                    <Column field="id" title="id"  width="100rem"/>
                    <Column field="firstName" title="firstName" width="100rem"/>
                    <Column field="lastName" title="lastName"  width="100rem"/>
                    <Column field="motherName" title="motherName" width="100rem"/>
					<Column field="fatherName" title="fatherName" width="100rem"/>
                    <Column field="email" title="email"  width="100rem"/>
                    <Column field="tel" title="tel" width="100rem"/>
                    <Column field="giveMoney" title="giveMoney" width="100rem" />
					<Column field="getMoney" title="getMoney" width="100rem" />
                    <Column field="age" title="age"  width="100rem"/>
                    <Column field="selectedOption" title="selectedOption"  width="100rem"/>
                    <Column field="selectedOptionCommunity" title="selectedOptionCommunity"  width="100rem"/>
					<Column field="startDate" title="startDate" width="100rem"/>
                    <Column field="selectedOptionStatus" title="selectedOptionStatus" width="100rem"/>
                </Grid>
                
                <PopupMatcher show={this.state.isOpenPopap}>
                  <button className="popup-close"
                   onClick={() => this.closePopup()}>x</button>
                  {nl2br(this.state.popupContent)}
                </PopupMatcher>

                <PopupMatcher show={this.state.isOpenPopap1}>
                    <button className="popup-close"
                        onClick={() => this.closePopup1()}>x</button>
                   
        <div>
          <h1>Hello!</h1>
          <h2>Good Match!</h2>
        </div>
        <div>
        <div>
            <div>DOR-YESHARIM NUMBERS</div>
            {nl2br(this.state.popupContent1)}</div>
				{<a href="tel:050-412-6160">CALL DOR-YESHARIM</a>}
				<label className="checkbox">
					<input type="checkbox" onChange={this.onChangeDORYESHARIM} />
					<span className="checkbox-label">DOR YESHARIM</span>
				</label>
				</div> 
                <div>
                <button
className="c-button"
type="button"
onClick={() => this.Suggest()}
>
Suggest
</button>
               </div> 
                </PopupMatcher>
            </div>
        );
    }

    cloneProduct(product) {
        return Object.assign({}, product);
    }
}
 const mapStateToProps = (state) => {
 	return {
        data: state.register.data,
        suggests:state.register.suggests,
        men: state.register.men,
        women: state.register.women
 	};
 	}
 	const mapDispatchToProps = (dispatch) => {	
 	return {
         getAllUsers:()=>{dispatch(getAllUsers())},
         getMales: () => dispatch(getMales()),
         getFemales: () => dispatch(getFemales()),
         getAllSuggests:()=>{dispatch(getAllSuggests())},
         saveSuggest: (suggest) => { dispatch(saveSuggest(suggest)) }
 	};
 	}
 	export default connect(mapStateToProps, mapDispatchToProps)(TodoPage)

