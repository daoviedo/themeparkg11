import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const tileData = [
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
    {
        img: "https://www.bodybuilding.com/images/2016/may/40-best-low-calorie-foods-header-v2-400x225.jpg",
        title: 'Image',
        author: 'author',
    },
];

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} spacing={12} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} style={{width: '300px'}}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
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