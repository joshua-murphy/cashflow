import React from 'react';
import { humanize } from './functions';
import { Button, Form, Header, Modal, Select } from 'semantic-ui-react';

class StockModal extends React.Component {

  state = { options: [], current: null, symbol: '', price: '', count: '', modalOpen: false };

  handleChange = (e, { value }) => {
    this.setState({ price: value });
  }

  changeOptions = (e, { value }) => {
    const { stocks, modalType } = this.props;
    const selected = symbols.find( (s) => s.value === value);
    const id = parseInt(e.target.id, 10)
    const current = modalType === 'Sell' ? stocks.find( (s) => s.id === id ) : null
    this.setState({ current, symbol: value, options: selected.prices });
  }

  handleNumberChange = (e, { value }) => {
    const { current } = this.state
    if(value) {
      let count = e.target.value.replace(/\D/,'');
      if(this.props.modalType === 'Buy')
        count && this.setState({ count: parseInt(count, 10) });
      else
        count && current && count <= current.count && this.setState({ count: parseInt(count, 10) });
    }
    else
      this.setState({ count: '' });
  }

  toggleModal = (e) => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }

  formSubmit = () => {
    const { symbol, price, count } = this.state;    
    const params = {symbol, price, count};
    this.props.handleSubmit(params);
    this.setState({ symbol: '', price: '', count: '', options: [] });    
    this.toggleModal();
  }

  getOptions = () => {
    const { modalType, stocks } = this.props;    
    if(modalType === "Buy")
      return symbols;
    else
      return stocks.map(stock => { return { text: `${stock.name} - ${stock.count}`, value: stock.name, amount: stock.count, id: stock.id } });
  }

  dynamicString = (str1, str2) => {
    if( this.props.modalType === 'Buy' )
      return str1
    else
      return str2
  }

  render() {
    const { options, symbol, price, count, modalOpen, current } = this.state;
    const { modalType, stocks } = this.props;
    const { dynamicString } = this;
    var dimmer = document.getElementsByClassName('ui page modals dimmer transition visible active')[0]
    dimmer && dimmer.classList.remove('transition')
    return(
      <Modal
        open={ modalOpen }
        onClose={ this.toggleModal }
        trigger={<Button onClick={this.toggleModal} content={`${modalType} Stock`} disabled={modalType === 'Sell' && stocks.length === 0} />}
      >
        <Modal.Content>
          <Header as="h1" textAlign="center" content={`${modalType} Stock`} /><br/>
          <Form onSubmit={this.formSubmit} autoComplete="off">
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                name="symbol"
                label='Stock Symbol'
                value={symbol}
                placeholder="Please Select"
                options={this.getOptions() }
                onChange={this.changeOptions}
                required
              />
              <Form.Field
                control={Select}
                name='price'
                label={dynamicString('Buy Price', 'Sale Price')}
                value={price}
                placeholder="Please Select"
                options={options}
                onChange={this.handleChange}
                disabled={options.length === 0}
                required
              />
              <Form.Input
                name='count'
                label="Stock Count"
                value={count}
                placeholder={modalType === 'Sell' && current ? `Up to ${current.count}` : ''}
                onChange={this.handleNumberChange}
                required
              />
            </Form.Group>
            <Button
              primary
              floated="right"
              content={dynamicString((count && symbol && price && count > 0 ? `Buy Stock for $${humanize(price * count)}` : "Buy Stock"), (count && symbol && price && count > 0 ? `Sell Stock for $${humanize(price * count)}` : "Sell Stock"))}
              disabled={symbol === '' || price === '' || count === '' || count === 0}
            /><br/><br/>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const standardPrices = [ 
  { text: 1, value: 1 }, 
  { text: 5, value: 5 }, 
  { text: 10, value: 10 }, 
  { text: 20, value: 20 }, 
  { text: 30, value: 30 },
  { text: 40, value: 40 },
  { text: 50, value: 50 }
]

const symbols = [
  { text: 'GRO4US', value: 'GRO4US', prices: standardPrices },
  { text: 'MYT4U', value: 'MYT4U', prices: standardPrices },
  { text: 'OK4U', value: 'OK4U', prices: standardPrices },
  { text: 'ON2U', value: 'ON2U', prices: standardPrices },
  { text: '2BIG', value: '2BIG', prices: [{ text: 1200, value: 1200 }] }
]

export default StockModal;