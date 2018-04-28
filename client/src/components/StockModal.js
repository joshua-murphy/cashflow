import React from 'react';
import { Button, Form, Header, Modal, Select } from 'semantic-ui-react';

class StockModal extends React.Component {

  state = { options: [], playerStocks: [], symbol: '', price: '', count: '', modalOpen: false };

  handleChange = (e, { value }) => {
    this.setState({ price: value });
  }

  changeOptions = (e, { value }) => {
    const selected = symbols.find( (s) => s.value === value);
    this.setState({ symbol: value, options: selected.prices });
  }

  handleNumberChange = (e, { value }) => {
    if(value) 
      this.setState({ count: parseInt(e.target.value.replace(/\D/,''), 10) });
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
    this.setState({ symbol: '', price: '', count: '', options: [], playerStocks: [] });    
    this.toggleModal();
  }

  getOptions = () => {
    if(this.props.modalType === "Buy")
      return symbols;
    else
      return this.props.stocks.map(stock => { return { text: stock.name, value: stock.name, id: stock.id } });
  }

  dynamicString = (str1, str2) => {
    if( this.props.modalType === 'Buy' )
      return str1
    else
      return str2
  }

  render() {
    const { options, symbol, price, count, modalOpen } = this.state;
    const { modalType } = this.props;
    const { dynamicString } = this;
    var dimmer = document.getElementsByClassName('ui page modals dimmer transition visible active')[0]
    dimmer && dimmer.classList.remove('transition')
    return(
      <Modal
        open={ modalOpen }
        onClose={ this.toggleModal }
        trigger={<Button onClick={this.toggleModal} content={`${modalType} Stock`} />}
      >
        <Modal.Content>
          <Header as="h1" textAlign="center" content={`${modalType} Stock`} /><br/>
          <Form onSubmit={this.formSubmit} autoComplete="off">
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                name="symbol"
                label='Stock Symbol'
                placeholder="Please Select"
                options={this.getOptions()}
                onChange={this.changeOptions}
                required
              />
              <Form.Field
                control={Select}
                name='price'
                label={dynamicString('Buy Price', 'Sale Price')}
                placeholder="Please Select"
                options={options}
                onChange={this.handleChange}
                disabled={options.length === 0}
                required
              />
              <Form.Input
                name='count'
                label="Stock Count"
                placeholder="0"
                onChange={this.handleNumberChange}
                required
              />
            </Form.Group>
            <Button
              primary
              floated="right"
              content={dynamicString("Buy Stock", "Sell Stock")}
              disabled={symbol === '' || price === '' || count === ''}
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