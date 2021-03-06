import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../css/MaintenanceTile.css';

const styles = theme => ({
  root: {
    paddingTop: 70,
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridList: {
    margin: 'auto',
    width: 700,
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} spacing={20} className={classes.gridList}>
        {props.list.map(tile => (
          <GridListTile key={tile.RideID} style={{width: '200px'}}>
            <img src="https://tribwttv.files.wordpress.com/2016/07/s064723236-300.jpg?quality=85&strip=all&w=400&h=225&crop=1" alt={tile.Stand_Name} />
            <div className="underMaintenance" style={{display: tile.NeedMaintenance > 0 ? 'block': 'none'}}></div>
            <p style={{display: tile.NeedMaintenance > 0 ? 'block': 'none'}}>Under Maintenance</p>
            <GridListTileBar
              title={tile.RideName}
              actionIcon={
                <IconButton className={classes.icon} style={{textTransform: 'none', outline: 0, border: 'none',}}>
                  <InfoIcon/>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);