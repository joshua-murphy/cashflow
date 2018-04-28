import React, { Component } from 'react';
import axios from 'axios';
import Die from './Die';
import Gamelog from './Gamelog';
import Stats from './Stats';
import FormModal from './FormModal';
import StockModal from './StockModal';
import { humanize } from './functions';
import { buyCharity, charityCounter, newBaby, updateSalary } from '../actions/player';
import { mathMoney } from '../actions/wallet';
import { addExpense } from '../actions/expenses';
import { addIncome } from '../actions/incomes';
import { addStock, removeStock } from '../actions/stocks';
import { setProfession } from '../actions/profession';
import { addMessage } from '../actions/gamelog';
import { connect } from 'react-redux';
import { Button, Container, Grid, Header, Input } from 'semantic-ui-react';

class Home extends Component {

  state = { dice: [], paycheck: 0, moneyInput: "", incomeCount: 0, expenseCount: 0, stockCount: 0, totalIncomes: 0, totalExpenses: 0 }

    componentDidMount() {
      axios.get('/api/professions/random')
        .then( res => this.professionInit(res.data.profession) )
        .catch( err => this.props.dispatch(addMessage("FATAL ERROR: Could not contact database, profession was not loaded.")) )
    }

  componentDidUpdate() {
    const { incomes, expenses } = this.props;  
    const { totalIncomes, totalExpenses, paycheck } = this.state;
    const tempTotalIncomes = incomes.length > 0 ? incomes.map( (income) => income.value ).reduce((sum, num) => sum + num) : 0
    const tempTotalExpenses = expenses.length > 0 ? expenses.map( (expense) => expense.value ).reduce((sum, num) => sum + num) : 0 
    const tempPaycheck = totalIncomes - totalExpenses;
    if(totalIncomes !== tempTotalIncomes || totalExpenses !== tempTotalExpenses || paycheck !== tempPaycheck)
      this.setState({ paycheck: tempPaycheck, totalIncomes: tempTotalIncomes, totalExpenses: tempTotalExpenses });
  }

  professionInit = (profession) => {
    const { dispatch } = this.props;
    dispatch(setProfession(profession))
    profession.expenses.forEach( expense => {
      this.newExpense(expense, false)
    })
    this.newIncome({name: "Salary", value: profession.salary}, false)
  }

  roll = () => {
    const { player: {charity}, dispatch } = this.props;
    const { randomValue } = this;
    charity.active && dispatch(charityCounter(-1, charity.rollsRemaining));
    return [ randomValue(), randomValue(), charity.active && randomValue() ];
  }

  randomValue = () => {
    return Math.ceil(Math.random() * 5)
  }

  buyCharity = () => {
    this.props.dispatch(buyCharity(this.state.totalIncomes / 10));
  }

  haveBaby = () => {
    const { player, dispatch } = this.props;
    dispatch(newBaby(player.profession.childCost, player.children + 1));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.replace(/\D/,'') })
  }

  walletColor = () => {
    const { wallet } = this.props
    return wallet === 0 ? { color: "grey"} : wallet > 0 ? { color: `rgb(0,${Math.round(150 + (wallet * .002))},0)` } : { color: `rgb(${Math.round(150 + (-wallet * .2))},0,0)` }
  }

  newIncome = (params, createMessage = true) => {
    let { incomeCount } = this.state;
    const { dispatch } = this.props;
    params.down && dispatch(mathMoney(-params.down))
    dispatch(addIncome(incomeCount++, params.name, params.value || params.amount, createMessage));
    this.setState({ incomeCount });
  }

  newExpense = (params, createMessage = true) => {
    let { expenseCount } = this.state;
    this.props.dispatch(addExpense(expenseCount++, params.name, params.value || params.amount, createMessage));
    this.setState({ expenseCount });
  }

  newSalary = (params) => {
    const { dispatch, incomes } = this.props;
    const income = incomes.find((income) => income.name === "Salary");
    dispatch(updateSalary(income.id, income.name, params.value));
    this.setState({ newSalary: "" });
  }

  buyStock = (params) => {
    let { stockCount } = this.state;
    this.props.dispatch(addStock(stockCount++, params.symbol, params.price, params.count))
    this.setState({ stockCount })
  }

  sellStock = (params) => {
    let { stockCount } = this.state;
    this.props.dispatch(removeStock(stockCount++, params.symbol, params.price, params.count))
    this.setState({ stockCount })
  }

  render() {
    const { player, incomes, expenses, gamelog, wallet, dispatch, stocks } = this.props;
    const { dice, paycheck, moneyInput, totalIncomes, totalExpenses } = this.state;
    return (
      <Container>
        <Header as='h1' textAlign='center'>Cashflow</Header>
        <Header id="walletAmount" style={this.walletColor()}>${humanize(wallet)}</Header>
        <div style={{fontSize: 24}}>
    <Die value={dice[0]}/> &nbsp; <Die value={dice[1]}/> &nbsp; { dice[2] && <Die value={dice[2]}/> } { dice[2] && <span>&nbsp;</span> } {dice.length > 0 && `(${dice.reduce( (total, num) => total + num, 0)})` }<hr/>
          
          <Button.Group primary vertical floated="right" style={{margin: 5}}>
            <Button 
              primary 
              onClick={() => this.setState({ dice: this.roll() })} 
              content="Roll Dice"
            />
            <Button 
              floated="right"
              primary 
              onClick={() => dispatch(mathMoney(paycheck, `Payday! Received $${paycheck}`)) }
              content="Payday"
            />
            <Button 
              floated="right"
              primary 
              onClick={this.buyCharity} 
              content={player.charity.active ? "Charity Active" : "Buy Charity"}
              disabled={player.charity.active || wallet < ( this.state.totalIncomes / 10 )}
            />
            <Button 
              floated="right"
              primary 
              onClick={this.haveBaby} 
              content="Have Baby"
              disabled={player.children === 3}
            />
          </Button.Group>

          <Button.Group primary vertical floated="right" style={{margin: 5}}>            
            <FormModal modalType="Income" handleSubmit={this.newIncome} handleChange={this.handleChange} />
            <FormModal modalType="Expense" handleSubmit={this.newExpense} handleChange={this.handleChange} />
            <FormModal modalType="Paycheck" salaryValue={player.profession.salary} handleSubmit={this.newSalary} handleChange={this.handleChange} />
          </Button.Group>

          <Button.Group primary vertical floated="right" style={{margin: 5}}>
            <Input size="mini" style={{fontSize: 14.5, marginBottom: -3, position: 'relative', zIndex: 1}} value={moneyInput} name="moneyInput" placeholder="Amount" onChange={this.handleChange} />          
            <Button 
              floated="right"
              primary 
              onClick={() => { moneyInput && dispatch(mathMoney(parseInt(moneyInput, 10), `Added $${moneyInput}`)); this.setState({moneyInput: ""}) } } 
              content="Add Money"
            />
            <Button 
              floated="right"
              primary 
              onClick={() => { moneyInput && dispatch(mathMoney(parseInt(-moneyInput, 10), `Spent $${moneyInput}`)); this.setState({moneyInput: ""}) } } 
              content="Spend Money"
            />
          </Button.Group>
          
          <Button.Group primary vertical floated="right" style={{margin: 5}}>            
            <StockModal modalType="Buy" stocks={stocks} handleSubmit={this.buyStock} handleChange={this.handleChange} />
            <StockModal modalType="Sell" stocks={stocks} handleSubmit={this.sellStock} handleChange={this.handleChange} />
          </Button.Group>
        </div>

        <Grid style={{ marginLeft: 14 }}>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center" style={{position: 'fixed', bottom: 0, left: 0, margin: 0, marginBottom: -14}}><h4>Gamelog</h4><Gamelog gamelog={ gamelog } /></Grid.Column>
            <Grid.Column textAlign="center" style={{position: 'fixed', bottom: 0, right: 0, margin: 0, marginBottom: -14}}><h4>Player Stats</h4><Stats stats={ this.props } totalIncome={totalIncomes} totalExpenses={totalExpenses} incomes={ incomes } expenses={expenses} /></Grid.Column>
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
    stocks: state.stocks,
    gamelog: state.gamelog,
  }
}

export default connect(mapStateToProps)(Home);
