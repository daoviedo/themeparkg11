import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StandMenu from './StandMenu';

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
    width: 800,
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
          <GridListTile key={tile.Stand_ID} style={{width: '250px'}}>
            <img src="https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg" alt={tile.Stand_Name} />
            <GridListTileBar
              title={tile.Stand_Name}
              subtitle={<span>{tile.Hours_of_operations}</span>}
              actionIcon={
                <IconButton component={StandMenu} stand ={tile}>
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