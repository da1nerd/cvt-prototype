import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {ListItem} from 'material-ui/List';
import Settings from 'material-ui/svg-icons/action/settings';

export default class AssetSettings extends React.Component {
  state = {
    open: false,
    target: this.props.settings.target
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  updateAssetSettings = () => {
    this.props.actions.updateAssetSettings(this.props.assetCode, this.state.target, this.state.minimumYield);
    this.handleClose();
  };

  updateTarget = (event) => {
    const target = event.target.value;
    this.setState({target});
  };

  render() {
    const {assetCode, settings, actions, ...otherProps} = this.props;

    const actionButtons = [
      <FlatButton
        key="cancel"
        label="Cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        key="submit"
        label="Submit"
        primary={true}
        onClick={this.updateAssetSettings}
      />
    ];

    return (
      <div>
        <ListItem key="1"
          {...otherProps}
          leftIcon={<Settings />}
          primaryText="Asset Settings"
          onClick={this.handleOpen}
        />
        <Dialog
          title="Asset Settings"
          actions={actionButtons}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '100%', maxWidth: 'none'}}
          modal={false}
        >
          <TextField
            style={{width: '100%'}}
            hintText="Set the Target Price in BTC for the Asset."
            floatingLabelText="Target"
            defaultValue={this.props.settings.target}
            onBlur={this.updateTarget}
          />
        </Dialog>
      </div>
    );
  }
}

AssetSettings.propTypes = {
  assetCode: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
