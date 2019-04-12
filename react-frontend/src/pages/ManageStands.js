import  React, {Component} from 'react';
import TopBar from './components/TopBar';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import DeleteItemDialog from './components/DeleteItemDialog';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
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
        item:{},
        openDeleteItem: false,
    }
    handleOpenDeleteItem = (itemv) => {
        this.setState({ item: itemv, openDeleteItem: true });
    };
    handleCloseDeleteItem = () => {
        this.setState({ openDeleteItem: false });
    };
    fetchitems(){
        fetch(`http://157.230.172.23:4000/itemlist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ items: result.itemList }))
            .catch(err => console.log(err))
    }
    fetchstands(){
        fetch(`http://157.230.172.23:4000/concessionlist`, {
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
            <StandSettings stand={{Stand_ID, Stand_Name,Hours_of_operations}}/>
        </ExpansionPanelDetails>
    </ExpansionPanel>

    renderItems = ({ Item_ID, Item_Name, Item_Price }) =>
      <TableRow key={Item_ID}>
        <TableCell component="th" scope="row">
            {Item_Name}
        </TableCell>
        <TableCell align="right">${Item_Price}.00</TableCell>
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
        const {classes} = this.props
        const {clist} = this.state
        return(
            <React.Fragment>
                <TopBar/>
                <br/>
                <div style={{textAlign: "center", margin: 'auto'}}>
                    <h1 >Manage Concessions</h1>
                <br/>
                <Grid container spacing = {32} justify = "center">
                <Grid item sm = {5}>
                <Paper>
                    <br/>
                    <h4>Concession Stands</h4>
                    {clist.map(this.renderclist)}
                </Paper>
                <br/>
                <Fab size="medium" aria-label="Add-stand" className={classes.margin}>
                    <AddIcon />
                </Fab>
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
                        <DeleteItemDialog val={this.state} item={this.state.item} close={this.handleCloseDeleteItem}/>
                        <br/>
                    </div>
                </Paper>
                <br/>
                <Fab size="medium" aria-label="Add-item" className={classes.margin}>
                    <AddIcon />
                </Fab>
                </Grid>
                </Grid> 
                </div>
            </React.Fragment>
    );}
}
export default withStyles(styles)(ManageStands)