import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";
import { withStyles } from "material-ui/styles";
import moment from "moment";

import styles from "./styles";
import { calculateRemainingWarrany, displayDate } from "../../../utils/Date";

@withStyles(styles)
class RecordItem extends React.Component {
  render() {
    const {
      record, i, recordsLength, classes,
    } = this.props;
    const {
      id, name, seller, buyingDate, warrantyLength,
    } = record;

    const [remainingWarranty,, color] = calculateRemainingWarrany(buyingDate, warrantyLength);

    const sellerName = seller && seller.name;

    return (
      <ListItem
        button
        component={Link}
        to={`/receipt/${id}`}
        divider={i < recordsLength - 1}
      >
        <ListItemText
          className={classes.listItem}
          primary={name}
          secondary={
            <span>
              {sellerName ? (<span>{seller.name}<br /></span>) : null }
              <span className={classes.secondaryLine} style={{ color }}>
                <Icon className={classes.iconStyles}>event</Icon>
                {displayDate(buyingDate)}
              </span>
              <span className={classes.secondaryLine} style={{ color }}>
                <Icon className={classes.iconStyles}>hourglass_empty</Icon>
                {`${moment.duration(warrantyLength, "years").humanize()} (${remainingWarranty})`}
              </span>
            </span>
          }
        />
      </ListItem>
    );
  }
}

RecordItem.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    seller: PropTypes.object,
    buyingDate: PropTypes.number,
    warrantyLength: PropTypes.number,
  }).isRequired,
  i: PropTypes.number.isRequired,
  recordsLength: PropTypes.number.isRequired,
  classes: PropTypes.object,
};

RecordItem.defaultProps = {
  classes: {},
};

export default RecordItem;
