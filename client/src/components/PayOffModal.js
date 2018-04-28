import React from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

class PayOffModal extends React.Component {

  state = { name: undefined, value: undefined, modalOpen: false };

  componentDidMount() {
    const { name, value } = this.props.item
    this.setState({ name, value })
  }

  handleChange = (e, { value }) => {
    this.setState({ name: value });
  }

  handleNumberChange = (e, { value }) => {
    if(value) 
      this.setState({ value: e.target.value.replace(/\D/,'') });
    else
      this.setState({ value: '' });
  }

  toggleModal = (e) => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }

  formSubmit = () => {
    const { name, value } = this.state;    
    const params = {name, value: parseInt(value, 10)};
    this.props.handleSubmit(params);
    this.toggleModal();
  }

  dynamicString = (str1, str2) => {
    if( this.props.modalType === 'Expense' )
      return str1
    else
      return str2
  }

  render() {
    const { name, value, modalOpen } = this.state;
    const { item, content, modalType } = this.props;
    const { dynamicString } = this;
    var dimmer = document.getElementsByClassName('ui page modals dimmer transition visible active')[0]
    dimmer && dimmer.classList.remove('transition')
    return(
      <Modal
        open={ modalOpen }
        onClose={ this.toggleModal }
        trigger={<p style={{cursor: 'pointer'}} onClick={this.toggleModal}>{content}</p>}
      >
        <Modal.Content>
          <Header as="h1" textAlign="center" content={`Edit ${modalType}: ${item.name}`} /><br/>
          <Form onSubmit={this.formSubmit} autoComplete="off">
            <Form.Group widths='equal'>
              <Form.Input
                name="name"
                label={`${modalType} Name`}
                value={name}
                onChange={this.handleChange}
                required
              />
              {/* <Form.Field
                control={Select}
                name='price'
                label={dynamicString('Buy Price', 'Sale Price')}
                placeholder="Please Select"
                options={options}
                onChange={this.handleChange}
                disabled={options.length === 0}
                required
              /> */}
             <Form.Input
                name='value'
                label={`Monthly Cash Flow ${dynamicString(' ( - ) ', '')}`}
                value={value}
                onChange={this.handleNumberChange}
                required
              />
            </Form.Group>
            <Button
              primary
              floated="right"
              content="Save"
              disabled={name === '' || value === ''}
            /><br/><br/>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default PayOffModal;