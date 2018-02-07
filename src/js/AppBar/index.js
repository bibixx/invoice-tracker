import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
// import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import MenuIcon from "material-ui-icons/Menu";
import blue from "material-ui/colors/blue";

import MenuItems from "./MenuItems";

const styles = {
  root: {
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    width: 240,
  },
  avatar: {
    backgroundColor: blue[500],
  },
};

const createInitials = name => name.split(" ").map(part => part[0].toUpperCase());

class TopBar extends React.Component {
  constructor() {
    super();
    this.state = {
      drawer: false,
      currentUser: {
        avatar: "https://www.gravatar.com/avatar/e44d23b334062ef475959ae42fe3062b",
        name: "Bartosz Legięć",
      },
    };
  }

  toggleDrawer = () => {
    this.setState({
      drawer: !this.state.drawer,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Paragony
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <IconButton
              aria-owns="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Avatar
                className={classes.avatar}
                alt={this.state.currentUser.name}
                src={this.state.currentUser.avatar}
              >
                {
                  (this.state.currentUser.avatar === null) ?
                    createInitials(this.state.currentUser.name) :
                    null
                }
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.drawer}
          onClose={this.toggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Paragony
              </Typography>
            </Toolbar>
          </AppBar>
          <div
            tabIndex={0}
            role="button"
          >
            {MenuItems}
          </div>
        </Drawer>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(TopBar);
