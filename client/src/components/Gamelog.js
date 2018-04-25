import React from 'react';
import { Grid } from 'semantic-ui-react';

class Gamelog extends React.Component {

  render() {
    return (
      <div style={{ textAlign: 'left', overflow: 'scroll', overflowX: 'hidden', width: '100%', height: '40vh', border: '1px solid black', borderRadius: 5 }}>
        <Grid style={{padding: '28px 14px'}}>
          { this.props.gamelog.map( (message, i) => <p style={{width: '100%'}} key={i}>{message}</p> ) }
        </Grid>
      </div>
    )
  }
}

export default Gamelog