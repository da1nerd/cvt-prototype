import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
// icons
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
// helpers
import * as PairHelpers from '../helpers/PairHelpers';
// components
import PlaceOrder from './PlaceOrder';

export default class PlaceOrders extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  placeOrders = (orders) => {
    this.props.actions.placeOrders(
      this.props.assetCode,
      this.props.currencyCode,
      orders
    );
    this.handleClose();
  };

  render() {
    const {assetCode, currencyCode, balance, ticker, settings, ...otherProps} = this.props;

    const buyOrder = PairHelpers.getTargetBuyOrder(assetCode, currencyCode, balance, ticker, settings);
    const sellOrder = PairHelpers.getTargetSellOrder(assetCode, currencyCode, balance, ticker, settings);
    const urgentOrder = PairHelpers.getUrgentOrder(assetCode, currencyCode, balance, ticker, settings);

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
        onClick={this.placeOrders}
      />
    ];

    return (
      <div>
        <ListItem
          {...otherProps}
          leftIcon={<AttachMoney />}
          primaryText="Place Orders"
          onClick={this.handleOpen}
        />
        <Dialog
          title="Place Orders"
          actions={actionButtons}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '100%', maxWidth: 'none'}}
        >
          <Divider />
          <Subheader>Place an Urgent Order.</Subheader>
          <PlaceOrder key="urgent" order={urgentOrder} />
          <Divider />
          <Subheader>Place a Buy Order for when the price goes lower.</Subheader>
          <PlaceOrder key="buy" order={buyOrder} />
          <Divider />
          <Subheader>Place a Sell Order for when the price goes higher.</Subheader>
          <PlaceOrder key="sell" order={sellOrder} />
        </Dialog>
      </div>
    );
  }
}

PlaceOrders.propTypes = {
  assetCode: PropTypes.string.isRequired,
  currencyCode: PropTypes.string.isRequired,
  balance: PropTypes.object.isRequired,
  ticker: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
