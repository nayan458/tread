import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function Dropdown() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Download
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Excel</MenuItem>
            <MenuItem onClick={popupState.close}>Pdf</MenuItem>
            <MenuItem onClick={popupState.close}>CSV</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}