import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import JsonToExcel from '@components/Downloadable/JsonToExcel';
import { RowType } from 'src/types';
import JsonToPdf from '@components/Downloadable/JsonToPdf';
import JsonToCsv from '@components/Downloadable/JsonToCsv';

interface DropdownProps {
  data: RowType;
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Download
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>
              <JsonToExcel json_data={data} />
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <JsonToPdf data={data} />
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <JsonToCsv data={data} />
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default Dropdown;
