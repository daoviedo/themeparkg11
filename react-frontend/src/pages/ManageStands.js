import  React, {Component} from 'react';
import TopBar from './components/TopBar';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import DeleteItemDialog from './components/DeleteItemDialog';
import AddStandDialog from './components/AddStandDialog';
import AddItemDialog from './components/AddItemDialog';
import DeleteStand from './components/DeleteStand';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import StandSettings from './components/StandSettings'
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ManageStands extends Component{
    state = {
        clist: [],
        items: [],
        item: {},
        stand: {},
        itemname: "",
        price: "",
        standname: "",
        hours: "",
        openAddItem: false,
        openAddStand: false,
        openDeleteStand: false,
        openDeleteItem: false,
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    submitItem = () =>{
        fetch(`http://api.themepark.ga/additem`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.itemname,
                price: this.state.price
            }),
        })
        .then(()=>{
            this.handleCloseAddItem();
            this.fetchitems();
        })
        .catch(err => console.log(err))
    }
    submitStand = () =>{
        fetch(`http://api.themepark.ga/addstand`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.standname,
                hours: this.state.hours
            }),
        })
        .then(()=>{
            this.handleCloseAddStand();
            this.fetchstands();
        })
        .catch(err => console.log(err))
    }
    handleDeleteStand = (sid) =>{
        fetch(`http://api.themepark.ga/deletestand`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: sid,
            }),
        })
        .then(()=>{
            this.handleCloseDeleteStand();
            this.fetchstands();
        })
        .catch(err => console.log(err))
    }
    handleDeleteItem = (itemid) =>{
        fetch(`http://api.themepark.ga/deleteitem`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: itemid,
            }),
        })
        .then(()=>{
            this.handleCloseDeleteItem();
            this.fetchitems();
        })
        .catch(err => console.log(err))
    }
    handleOpenAddItem = () => {
        this.setState({ openAddItem: true });
    };
    handleCloseAddItem = () =>
    {
        this.setState({openAddItem: false, itemname: "", price: ""})
    };
    handleOpenAddStand = () => {
        this.setState({ openAddStand: true });
    };
    handleCloseAddStand = () =>
    {
        this.setState({openAddStand: false, standname: "", hours: ""})
    };
    handleOpenDeleteStand = (standv) => {
        this.setState({ stand: standv, openDeleteStand: true });
    };
    handleCloseDeleteStand = () =>
    {
        this.setState({openDeleteStand: false})
    };
    handleOpenDeleteItem = (itemv) => {
        this.setState({ item: itemv, openDeleteItem: true });
    };
    handleCloseDeleteItem = () => {
        this.setState({ openDeleteItem: false });
    };
    fetchitems(){
        fetch(`http://api.themepark.ga/itemlist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ items: result.itemList }))
            .catch(err => console.log(err))
    }
    fetchstands(){
        fetch(`http://api.themepark.ga/concessionlist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ clist: result.diningList }))
            .catch(err => console.log(err))
    }

    renderclist = ({Stand_ID, Stand_Name, Hours_of_operations}) =>
    <ExpansionPanel key = {Stand_ID}>
        <ExpansionPanelSummary expandIcon= {<ExpandMoreIcon/>}>
            <Typography className={this.props.classes.heading}>{Stand_Name}</Typography>
            <Typography className={this.props.classes.secondaryHeading}>{Hours_of_operations}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <StandSettings stand={{Stand_ID, Stand_Name,Hours_of_operations}} 
                val={this.state} openDelete={this.handleOpenDeleteStand}
                 handleChange={this.handleChange}/>
        </ExpansionPanelDetails>
    </ExpansionPanel>

    renderItems = ({ Item_ID, Item_Name, Item_Price }) =>
      <TableRow key={Item_ID}>
        <TableCell component="th" scope="row">
            {Item_Name}
        </TableCell>
        <TableCell align="right">${Item_Price.toFixed(2)}</TableCell>
        <TableCell align="right">
        <IconButton onClick={()=>this.handleOpenDeleteItem({ Item_ID, Item_Name, Item_Price })}>
                <DeleteIcon fontSize="small" />
        </IconButton>
        </TableCell>
      </TableRow>
    
    componentDidMount(){
        this.fetchstands()
        this.fetchitems()
    }
    render(){
        const {clist} = this.state
        return(
            <React.Fragment>
                <TopBar/>
                <br/>
                <div style={{textAlign: "center", margin: 'auto'}}>
                    <h2 style={{color: 'Black'}} className="scantitles">Manage Concessions</h2>
                <br/>
                <Grid container spacing = {32} justify = "center">
                <Grid item sm = {5}>
                <Paper>
                    <br/>
                    <h4>Concession Stands</h4>
                    {clist.map(this.renderclist)}
                </Paper>
                <br/>
                <AddStandDialog val = {this.state} handleCloseAddStand = {this.handleCloseAddStand} 
                    handleChange ={this.handleChange} submitStand = {this.submitStand} open = {this.handleOpenAddStand}/>
                </Grid>
                <Grid item sm = {5}>
                <Paper>
                    <br/>
                    <div style={{textAlign: "center", width: '90%', margin: 'auto'}}>
                        <h4>Concession Items</h4>
                        <Table>
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            {this.state.items.map(this.renderItems)}
                        </TableBody>
                        </Table>
                        <DeleteItemDialog val={this.state} item={this.state.item} close={this.handleCloseDeleteItem} confirm={this.handleDeleteItem}/>
                        <DeleteStand val={this.state} stand={this.state.stand} closeDelete={this.handleCloseDeleteStand} confirm={this.handleDeleteStand}/>
                        <br/>
                    </div>
                </Paper>
                <br/>
                <AddItemDialog val = {this.state} handleCloseAddItem = {this.handleCloseAddItem} 
                    handleChange ={this.handleChange} submitItem = {this.submitItem} open = {this.handleOpenAddItem}/>
                </Grid>
                </Grid> 
                </div>
            </React.Fragment>
    );}
}
export default withStyles(styles)(ManageStands)