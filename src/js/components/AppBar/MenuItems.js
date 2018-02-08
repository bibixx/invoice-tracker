import React from "react";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import ReceiptIcon from "material-ui-icons/Receipt";
import PersonIcon from "material-ui-icons/Person";
import { Link } from "react-router-dom";

const menuLinks = [
  {
    text: "Paragony",
    to: "/",
    icon: <ReceiptIcon />,
  },
  {
    text: "Sprzedawcy",
    to: "/sellers",
    icon: <PersonIcon />,
  },
];

const MenuItems = toggleDrawer => (
  <List component="nav">
    {
      menuLinks.map(({ text, to, icon }) => (
        <ListItem
          button
          component={Link}
          to={to}
          onClick={toggleDrawer}
          key={`${text}`}
        >
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))
    }
  </List>
);

export default MenuItems;
