import React from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

class FormModal extends React.Component {
  state = { name: '', cost: '', down: '', value: undefined, modalOpen: false };

  componentDidUpdate() {
    const { salaryValue } = this.props;
    salaryValue && this.state.value === undefined && this.setState({ value: salaryValue })
  }

  handleChange = (e, { value }) => {
    this.setState({ [e.target.name]: value })
  }

  handleNumberChange = (e, { value }) => {
    this.setState({ [e.target.name]: e.target.value.replace(/\D/,'') })
  }

  toggleModal = (e) => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  formSubmit = () => {
    const { name, cost, down } = this.state;
    const value = parseInt(this.state.value, 10)
    const { handleSubmit, modalType } = this.props;
    const params = modalType === 'Paycheck' ? {value} : modalType === 'Expense' ? {name, value} : {name, cost, down, value};
    this.toggleModal();
    handleSubmit(params);
    this.setState({ name: '', value: '' });
  }

  dynamicString = (str1, str2) => {
    if( this.props.modalType === 'Expense' )
      return str1
    else
      return str2
  }

  render() {
    const { name, cost, down, value, modalOpen } = this.state;
    const { modalType } = this.props;
    const { dynamicString } = this;
    var dimmer = document.getElementsByClassName('ui page modals dimmer transition visible active')[0]
    dimmer && dimmer.classList.remove('transition')
    return(
      <Modal
        open={ modalOpen }
        onClose={ this.toggleModal }
        trigger={<Button onClick={this.toggleModal} content={`${modalType === "Paycheck" ? "Update" : "New"} Monthly ${modalType}`} />}
      >
        <Modal.Content>
          <Header as="h1" textAlign="center" content={`New ${modalType}`} /><br/>
          <Form onSubmit={this.formSubmit} autoComplete="off">
            <Form.Group>
              { modalType !== 'Paycheck' && (              
                <Form.Input
                  name='name'
                  label='Name'
                  value={name}
                  onChange={this.handleChange}
                  width={4}
                  autoFocus
                  required
                />
              )}              
              { modalType === 'Income' && (
                <Form.Input
                  name='cost'
                  label='Total Cost'
                  value={cost}
                  onChange={this.handleNumberChange}
                  width={4}
                  style={{width: '100%'}}
                  required
                />
              )}
              { modalType === 'Income' && (
                <Form.Input
                  name='down'
                  label='Down Payment'
                  value={down}
                  onChange={this.handleNumberChange}
                  width={4}
                  style={{width: '100%'}}
                  required
                />
              )}
              <Form.Input
                name='value'
                label={modalType === 'Paycheck' ? 'Paycheck Amount' : `Monthly Cash Flow ${dynamicString(' ( - ) ', '')}`}
                value={value}
                onChange={this.handleNumberChange}
                width={modalType === 'Paycheck' ? 16 : modalType === 'Income' ? 4 : 12}
                autoFocus={modalType === 'Paycheck'}
                required
              />
            </Form.Group>
            <Button
              primary
              floated="right"
              content="Create"
              disabled={(modalType !== 'Paycheck' && name === '') || value === ''}
            /><br/><br/>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default FormModal;