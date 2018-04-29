import React from 'react';
import PayOffModal from './PayOffModal';
import { humanize } from './functions';
import { Grid } from 'semantic-ui-react';

class Stats extends React.Component {

  render() {
    const { totalIncome, totalExpenses, incomes, expenses, dispatch } = this.props;
    return (
      <div style={{ width: '100%', marginRight: 0, height: '40vh', overflow: 'scroll', overflowX: 'hidden', border: '1px solid black', borderRadius: 5 }}>
        <Grid divided columns={3} style={{padding: 14, height: '100%'}}>
          <Grid.Column>
            {/* Total Income: ${humanize()}<hr/> */}
            Passive Income: ${humanize(totalIncome)}<hr/>
            {incomes.length > 0 && incomes.map(income => <PayOffModal key={income.id} modalType='Income' dispatch={dispatch} item={income} content={`${income.name}: ${humanize(income.value)}`}/>)}
            <p></p>            
          </Grid.Column>
          <Grid.Column>
            Total Expenses: ${humanize(totalExpenses)}<hr/>
            {expenses.length > 0 && expenses.map(expense => <PayOffModal key={expense.id} modalType='Expense' dispatch={dispatch} item={expense} content={`${expense.name}: ${humanize(expense.value)}`}/>)}
            <p></p>            
          </Grid.Column>
          <Grid.Column>
            Monthly Cash Flow: ${humanize(totalIncome - totalExpenses)}<hr/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Stats