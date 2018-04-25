import React from 'react';
import { humanize } from './functions';
import { Grid } from 'semantic-ui-react';

class Stats extends React.Component {

  render() {
    const { totalIncome, totalExpenses, incomes, expenses } = this.props;
    return (
      <div style={{ width: '100%', marginRight: 0, height: '40vh', overflow: 'scroll', overflowX: 'hidden', border: '1px solid black', borderRadius: 5 }}>
        <Grid divided columns={3} style={{padding: 14, height: '100%'}}>
          <Grid.Column>
            Monthly Cash Flow: ${humanize(totalIncome - totalExpenses)}<hr/>
          </Grid.Column>
          <Grid.Column>
            Monthly Income: ${humanize(totalIncome)}<hr/>
            {incomes.length > 0 && incomes.map(income => <p key={income.id}>{income.name}: ${humanize(income.value)}</p>)}            
          </Grid.Column>
          <Grid.Column>
            Monthly Expenses: ${humanize(totalExpenses)}<hr/>
            {expenses.length > 0 && expenses.map(expense => <p key={expense.id}>{expense.name}: ${humanize(expense.value)}</p>)}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Stats