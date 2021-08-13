import React, { useEffect, useState } from 'react';
import { Statistic, Grid, Card, Icon } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

function Main (props) {
  const { api } = useSubstrate();
  const [ mododule, setMododule] = useState(0);
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);
  const { accountPair} =props;
    accountPair &&
    api.query.tcpModule.vl1Generation(accountPair.address, number => {
      setMododule(number.toHuman());
      setBlockNumberTimer(0);
      }).catch(console.error);
  const timer = () => {
    setBlockNumberTimer(time => time + 1);
  };
  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Grid.Column>
      <Card>
        <Card.Content textAlign='center'>
          <Statistic
            label={'爆块数'}
            value={mododule}
          />
        </Card.Content>
        <Card.Content extra>
          <Icon name='time' /> {blockNumberTimer}
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

export default function TcpModule (props) {
  const { api ,keyring} = useSubstrate();
  return  keyring.getPairs && api.derive &&
    api.derive.chain &&
    api.derive.chain.bestNumber &&
    api.derive.chain.bestNumberFinalized
    ? <Main {...props} />
    : null;
}
