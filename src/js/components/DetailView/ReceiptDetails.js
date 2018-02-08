import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";

import { calculateRemainingWarrany, displayDate } from "../../utils/Date";

const Title = ({ children, style, ...attr }) => (
  <Typography variant="caption" {...attr} style={{ ...style, fontWeight: "bold" }}>
    {children}
  </Typography>
);

const Text = ({ children, ...attr }) => (
  <Typography variant="title" {...attr}>
    {children}
  </Typography>
);

const Subtext = ({ children, ...attr }) => (
  <Typography variant="body2" {...attr}>
    {children}
  </Typography>
);

const ReceiptDetails = ({ record }) => {
  const {
    name, place, seller, buyingDate, warrantyLength, notes, files,
  } = record;
  const [remainingWarranty,, color] = calculateRemainingWarrany(buyingDate, warrantyLength);

  return (
    <div>
      <Title>
        Produkt
      </Title>
      <Text>
        {name}
      </Text>

      <br />
      <Title>
        Miejsce zakupu
      </Title>
      <Text>
        {place.name}
      </Text>
      <Subtext>{`${place.zip} ${place.city}, ${place.street}`}</Subtext>

      <br />
      <Title>
        Dane sprzedawcy
      </Title>
      <Text>
        {seller.name}
      </Text>
      <Subtext>{`${seller.zip} ${seller.city}, ${seller.street}`}</Subtext>

      <br />
      <Title>
        Data zakupu
      </Title>
      <Text>
        {displayDate(buyingDate)}
      </Text>

      <br />
      <Title>
        Okres gwarancji
      </Title>
      <Text style={{ color }}>
        {`${moment.duration(warrantyLength, "years").humanize()} (${remainingWarranty})`}
      </Text>

      <br />
      <Title>
        Notatki
      </Title>
      <Text>
        {notes}
      </Text>

      <br />
      <Title>
        Załączniki
      </Title>
      <Text>
        {files}
      </Text>
    </div>
  );
};

ReceiptDetails.propTypes = {
  record: PropTypes.object.isRequired,
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
};

Subtext.propTypes = {
  children: PropTypes.node.isRequired,
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Title.defaultProps = {
  style: {},
};

export default ReceiptDetails;
