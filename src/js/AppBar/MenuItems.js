import React from "react";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import ReceiptIcon from "material-ui-icons/Receipt";
import PersonIcon from "material-ui-icons/Person";

const MenuItems = (
  <List component="nav">
    <ListItem button>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Paragony" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Sprzedawcy" />
    </ListItem>
  </List>
);

export default MenuItems;
