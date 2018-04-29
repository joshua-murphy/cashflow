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
    const current = modalType !== 'Buy' ? stocks.find( (s) => s.name === value ) : null
    this.setState({ current, symbol: value, options: selected.prices });
  }

  handleNumberChange = (e, { value }) => {
    const { current, price } = this.state;
    if(value) {
      let count = e.target.value.replace(/\D/,'');
      if(this.props.modalType === 'Buy')
        count && price && this.props.wallet >= count * price && this.setState({ count: parseInt(count, 10) });
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
    this.setState({ symbol: '', price: '', count: '', options: [], current: null });    
    this.toggleModal();
  }

  getOptions = () => {
    const { modalType, stocks } = this.props;    
    if(modalType === "Buy")
      return symbols;
    else
      return stocks.map(stock => { return { text: `${stock.name} - ${stock.count}`, value: stock.name, amount: stock.count, disabled: stock.count === 0 } });
  }

  dynamicString = (str1, str2) => {
    if( this.props.modalType === 'Buy' )
      return str1
    else
      return str2
  }

  splitStock = (e, { value }) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.current.name, value)
  }

  render() {
    const { options, symbol, price, count, modalOpen, current } = this.state;
    const { modalType, stocks, wallet } = this.props;
    const { dynamicString } = this;
    const stockCount = stocks.map(stock => stock.count).reduce((total, num) => total + num);
    var dimmer = document.getElementsByClassName('ui page modals dimmer transition visible active')[0]
    dimmer && dimmer.classList.remove('transition')
    return(
      <Modal
        open={ modalOpen }
        onClose={ this.toggleModal }
        trigger={<Button onClick={this.toggleModal} content={`${modalType} Stock`} disabled={modalType === 'Buy' ? wallet <= 0 : stockCount === 0} />}
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
              { modalType !== 'Split' &&
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
              }
              { modalType !== 'Split' &&
                <Form.Input
                  name='count'
                  label="Stock Count"
                  value={count}
                  placeholder={modalType === 'Sell' ? current && `Up to ${current.count}` : price && `Up to ${Math.floor(wallet / price)}`}
                  onChange={this.handleNumberChange}
                  required
                />
              }
            </Form.Group>
            { modalType !== 'Split' &&
              <Button
                primary
                floated="right"
                content={dynamicString((count && symbol && price && count > 0 ? `Buy Stock for $${humanize(price * count)}` : "Buy Stock"), (count && symbol && price && count > 0 ? `Sell Stock for $${humanize(price * count)}` : "Sell Stock"))}
                disabled={symbol === '' || price === '' || count === '' || count === 0}
              />
            }
            { modalType === 'Split' &&
              <Button.Group primary floated="right">
                <Button
                  value={2}
                  onClick={this.splitStock}
                  content="2 for 1"
                  disabled={symbol === ''}                  
                />
                <Button
                  value={0.5}
                  onClick={this.splitStock}
                  content="1 for 2"
                  disabled={symbol === ''}                  
                />
              </Button.Group>
            }
              <br/><br/>
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
  // { text: '2BIG', value: '2BIG', prices: [{ text: 1200, value: 1200 }] }
]

export default StockModal;