import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import Paper from "material-ui/Paper";
import Icon from "material-ui/Icon";
import green from "material-ui/colors/green";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "1rem",
  },
  listItem: {
    maxWidth: "75%",
    margin: "0 auto",
  },
  secondaryLine: {
    color: green[500],
    display: "inline-flex",
    alignItems: "center",
    marginRight: ".5em",
  },
  iconStyles: {
    fontSize: "1.1em",
    lineHeight: "1.1em",
    color: green[500],
  },
});

const records = [
  {
    id: 0,
    name: "Dupa",
    seller: "Dupa sp. z o.o.",
    date: "01.01.2017",
    length: "2 lata (10 miesięcy)",
  },
  {
    id: 1,
    name: "Dupa 2",
    seller: "Dupa sp. z o.o.",
    date: "01.02.2017",
    length: "2 lata (9 miesięcy)",
  },
];

const ListItems = classes => records
  .map(({
    id, name, seller, date, length,
  }, i) => (
    <ListItem
      button
      component="a"
      href="#simple-list"
      key={`record-${id}`}
      divider={i < records.length - 1}
    >
      <ListItemText
        className={classes.listItem}
        primary={name}
        secondary={
          <span>
            <span>{seller}</span>
            <br />
            <span className={classes.secondaryLine}>
              <Icon className={classes.iconStyles}>event</Icon>
              &nbsp;{date}
            </span>
            <span className={classes.secondaryLine}>
              <Icon className={classes.iconStyles}>hourglass_empty</Icon>
              {length}
            </span>
          </span>
        }
      />
    </ListItem>
  ));

const RecordsList = ({ classes }) => (
  <Paper elevation={1}>
    <List
      className={classes.root}
      component="main"
      disablePadding
    >
      {ListItems(classes)}
    </List>
  </Paper>
);

RecordsList.propTypes = {
  classes: PropTypes.object.isRequired, //eslint-disable-line
};

export default withStyles(styles)(RecordsList);
