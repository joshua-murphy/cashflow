import React from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

class FormModal extends React.Component {
  state = { name: '', cost: '', down: '', value: '', modalOpen: false };

  handleChange = (e, { value }) => {
    this.setState({ [e.target.name]: value })
  }

  handleNumberChange = (e, { value }) => {
    this.setState({ [e.target.name]: parseInt(e.target.value.replace(/\D/,''), 10) })
  }

  toggleModal = (e) => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  formSubmit = () => {
    const { name, cost, down, value } = this.state;
    const { handleSubmit, modalType } = this.props;
    const params = modalType === 'Paycheck' ? {value} : modalType === 'Expense' ? {name, value} : {name, cost, down, value};
    this.toggleModal();
    handleSubmit(params);
    this.setState({ name: '', value: '' });
  }

  render() {
    const { name, cost, down, value, modalOpen } = this.state;
    const { modalType, salaryValue } = this.props;
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
          <Form onSubmit={this.formSubmit}>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  width={4}
                  style={{width: '100%'}}
                  required
                />
              )}
              <Form.Input
                name='value'
                label={modalType === 'Paycheck' ? 'Paycheck Amount' : 'Monthly Cash Flow'}
                value={value || salaryValue}
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
              disabled={value % 10 !== 0}
            /><br/><br/>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default FormModal;