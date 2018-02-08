import React from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { replaceSellerWithObjects } from "../../../utils/Sellers";
import ReceiptItem from "./ReceiptItem";
import SellerItem from "./SellerItem";
import "./MainList.css";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "1rem",
  },
});

const mapStateToProps = ({ receipts, sellers }) => ({
  receipts: receipts.data,
  sellers: sellers.data,
});

@withRouter
@connect(mapStateToProps)
@withStyles(styles)
class MainList extends React.Component {
  render() {
    const type = (this.props.location.pathname === "/sellers") ? "sellers" : "receipts";

    const { classes, receipts, sellers } = this.props;

    let records;
    let recordsLength;
    let recordsList;

    if (type === "receipts") {
      records = receipts;
      recordsLength = records.length;
      recordsList = replaceSellerWithObjects(receipts, sellers)
        .map((record, i) => (
          <ReceiptItem record={record} i={i} recordsLength={recordsLength} key={`record-${record.id}`} />
        ));
    } else if (type === "sellers") {
      records = sellers;
      recordsLength = records.length;
      recordsList = records
        .map((record, i) => (
          <SellerItem record={record} i={i} recordsLength={recordsLength} key={`record-${record.id}`} />
        ));
    }

    return (
      <Paper elevation={1}>
        <List
          className={classes.root}
          component="main"
          disablePadding
        >
          { recordsList }
        </List>
      </Paper>
    );
  }
}

MainList.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  receipts: PropTypes.array,
  sellers: PropTypes.array,
};

MainList.defaultProps = {
  classes: {},
  location: {},
  receipts: [],
  sellers: [],
};

export default MainList;
