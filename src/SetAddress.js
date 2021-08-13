import React, { useState } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export default function Main (props) {
  const [formState, setFormState] = useState({ address: '', contractAddress: '' });
  const { accountPair } = props;
  const [hint ,setHint ] = useState();
  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { address, contractAddress } = formState;
  function setAddressButton(){
    accountPair&&api.tx.tcpModule.setStakeAddr(address,contractAddress)
    .signAndSend(accountPair)
    .then(setStakeAddResult =>{
        setHint(setStakeAddResult.toHuman())
    })
    .catch(error=>{
      setHint(error.toHuman())
    });
  } 
  return (
    <Grid.Column width={8}>
      <h1>设置地址</h1>
      <Form>
        <Form.Field>
          <Input
            fluid
            label='用户地址'
            type='text'
            placeholder='bytes'
            state='address'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label='合约地址'
            type='bytes'
            state='contractAddress'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button basic    style={{ marginLeft: 0, marginTop: '.5em' }} onClick={ setAddressButton }>
              确认
          </Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{hint}</div>
      </Form>
    </Grid.Column>
  );
}
