import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";

import ReceiptDetails from "./ReceiptDetails";
import { replaceSellerWithObjects, getRecordById } from "../../utils/Sellers";


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: "1em",
  }),
});

const mapStateToProps = ({ receipts, sellers }) => ({
  receipts: receipts.data,
  sellers: sellers.data,
});

@connect(mapStateToProps)
@withStyles(styles)
class DetailView extends React.Component {
  render() {
    const type = "receipts";
    const { classes, receipts, sellers } = this.props;

    let details;

    if (type === "receipts") {
      const record = replaceSellerWithObjects(receipts, sellers);
      details = <ReceiptDetails record={getRecordById(record, "0")} />;
    } else if (type === "sellers") {
      console.log(1);
    }

    return (
      <Grid
        container
        justify="center"
      >
        <Grid
          item
          xs={8}
        >
          <Paper
            elevation={1}
            className={classes.root}
          >
            {details}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

DetailView.propTypes = {
  classes: PropTypes.object,
  receipts: PropTypes.array,
  sellers: PropTypes.array,
};

DetailView.defaultProps = {
  classes: {},
  receipts: [],
  sellers: [],
};

export default DetailView;
