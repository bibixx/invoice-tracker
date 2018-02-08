import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "material-ui/List";
import { withStyles } from "material-ui/styles";
import styles from "./styles";


@withStyles(styles)
class RecordItem extends React.Component {
  render() {
    const {
      record, i, recordsLength, classes,
    } = this.props;
    const {
      id, name, zip, city, street, nip,
    } = record;

    return (
      <ListItem
        button
        component={Link}
        to={`/seller/${id}`}
        divider={i < recordsLength - 1}
      >
        <ListItemText
          className={classes.listItem}
          primary={name}
          secondary={
            <span>
              {`${zip} ${city}, ${street}, NIP: ${nip}`}
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
    seller: PropTypes.string,
    date: PropTypes.number,
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
