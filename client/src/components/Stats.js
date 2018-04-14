import React from 'react';
import { Grid } from 'semantic-ui-react';

class Stats extends React.Component {

  render() {
    const { stats, income, expenses } = this.props;
    return (
      <div style={{ width: '100%', marginRight: 0, height: 250, border: '1px solid black', borderRadius: 5 }}>
        <Grid divided columns={3} style={{padding: 14, height: '100%'}}>
          <Grid.Column>
            Monthly Cash Flow: ${stats.player.paycheck + income - expenses}<hr/>
          </Grid.Column>
          <Grid.Column>
            Total Income: ${income}<hr/>
          </Grid.Column>
          <Grid.Column>
            Total Expenses: ${expenses}<hr/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Stats