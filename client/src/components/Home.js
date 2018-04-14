import React, { Component } from 'react';
import Die from './Die';
import Gamelog from './Gamelog';
import Stats from './Stats';
import FormModal from './FormModal';
import { buyCharity, charityCounter, updatePaycheck } from '../actions/player';
import { mathMoney } from '../actions/wallet';
import { addExpense } from '../actions/expenses';
import { addIncome } from '../actions/incomes';
import { connect } from 'react-redux';
import { Button, Container, Grid, Header, Input } from 'semantic-ui-react';

class Home extends Component {

  state = { dice: [], addMoney: "", spendMoney: "", incomeCount: 0, expenseCount: 0, totalIncomes: 0, totalExpenses: 0 }

  componentDidUpdate() {
    const { incomes, expenses } = this.props;  
    const { totalIncomes, totalExpenses } = this.state;  
    const tempTotalIncomes = incomes.length > 0 ? incomes.map( (income) => income.value ).reduce((sum, num) => sum + num) : 0
    const tempTotalExpenses = expenses.length > 0 ? expenses.map( (expense) => expense.value ).reduce((sum, num) => sum + num) : 0 
    if(totalIncomes !== tempTotalIncomes || totalExpenses !== tempTotalExpenses)
      this.setState({ totalIncomes: tempTotalIncomes, totalExpenses: tempTotalExpenses });
  }

  roll = () => {
    const { player, dispatch } = this.props;
    player.charity.active && dispatch(charityCounter(-1, player.charity.rollsRemaining));
    return [ this.randomValue(), this.randomValue(), player.charity.active && this.randomValue() ];
  }

  randomValue = () => {
    return Math.ceil(Math.random() * 5)
  }

  buyCharity = () => {
    this.props.dispatch(buyCharity(this.props.player.paycheck / 10))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.replace(/\D/,'') })
  }

  calculatePaycheck = () => {
    const { player } = this.props;
    const { totalIncomes, totalExpenses } = this.state;
    return player.paycheck + totalIncomes - totalExpenses;
  }

  walletColor = () => {
    const { wallet } = this.props
    return wallet === 0 ? { color: "grey"} : wallet > 0 ? { color: `rgb(0,${Math.round(150 + (wallet * .002))},0)` } : { color: `rgb(${Math.round(150 + (-wallet * .2))},0,0)` }
  }

  newIncome = (name, value) => {
    let { incomeCount } = this.state;
    this.props.dispatch(addIncome(incomeCount++, name, value));
    this.setState({ incomeCount });
  }

  newExpense = (name, value) => {
    let { expenseCount } = this.state;
    this.props.dispatch(addExpense(expenseCount++, name, value));
    this.setState({ expenseCount });
  }

  newPaycheck = (value) => {
    console.log(value)
    this.props.dispatch(updatePaycheck( parseInt(value, 10) ));
    this.setState({newPaycheck: ""});
  }

  render() {
    const { player, gamelog, wallet, dispatch } = this.props;
    const { dice, addMoney, spendMoney, totalIncomes, totalExpenses } = this.state;
    return (
      <Container>
        <Header as='h1' textAlign='center'>Cashflow</Header>
        <Header id="walletAmount" style={this.walletColor()}>${wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Header>
        <div style={{fontSize: 24}}>
          <Die value={dice[0]}/> &nbsp; <Die value={dice[1]}/> &nbsp; <Die value={dice[2]}/>
          <hr/>
          <Button 
            primary 
            onClick={() => this.setState({ dice: this.roll() })} 
            content="Roll"
          />
          <Button 
            floated="right"
            primary 
            onClick={this.buyCharity} 
            content="Buy Charity"
            disabled={player.charity.active}
          />
          <Button 
            floated="right"
            primary 
            onClick={() => { let paycheck = this.calculatePaycheck(); return dispatch(mathMoney(paycheck, `Payday! Received $${paycheck}`)) }}
            content="Payday"
          />
          <Input size="mini" style={{fontSize: 12}} value={spendMoney} name="spendMoney" placeholder="Spend Money" onChange={this.handleChange} /> &nbsp;
          <Input size="mini" style={{fontSize: 12}} value={addMoney} name="addMoney" placeholder="Add Money" onChange={this.handleChange} />
          <Button 
            floated="right"
            primary 
            onClick={() => { spendMoney && dispatch(mathMoney(parseInt(-spendMoney, 10), `Spent $${spendMoney}`)); this.setState({spendMoney: ""}) } } 
            content="Spend Money"
          />
          <Button 
            floated="right"
            primary 
            onClick={() => { addMoney && dispatch(mathMoney(parseInt(addMoney, 10), `Added $${addMoney}`)); this.setState({addMoney: ""}) } } 
            content="Add Money"
          />
          <Button.Group basic>
            <FormModal modalType="Paycheck" handleSubmit={this.newPaycheck} handleChange={this.handleChange} /> &nbsp;
            <FormModal modalType="Expense" handleSubmit={this.newExpense} hanleChange={this.handleChange} /> &nbsp;
            <FormModal modalType="Income" handleSubmit={this.newIncome} hanleChange={this.handleChange} />
          </Button.Group>
        </div>
        <Grid style={{ marginLeft: 14 }}>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center" style={{position: 'fixed', bottom: 0, left: 0, margin: 0, marginBottom: -14}}><h4>Gamelog</h4><Gamelog gamelog={ gamelog } /></Grid.Column>
            <Grid.Column textAlign="center" style={{position: 'fixed', bottom: 0, right: 0, margin: 0, marginBottom: -14}}><h4>Player Stats</h4><Stats stats={ this.props } income={ totalIncomes } expenses={totalExpenses} /></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
    wallet: state.wallet,
    incomes: state.incomes,
    expenses: state.expenses,
    gamelog: state.gamelog,
  }
}

export default connect(mapStateToProps)(Home);
