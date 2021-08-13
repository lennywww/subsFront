import React,{  useState }  from 'react';
import { Form,  Grid , Label, Icon} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
//import axios from 'axios';

export default function Main (props) {
  const { accountPair } = props;
  const [hint ,setHint ] = useState();  
  const [vl1Buffer ,setVl1Buffer ] = useState();
  const [vl1Earnning ,setVl1Earnning] = useState();
  accountPair&& api.query.tcpModule.vl1Buffer(accountPair.address)
  .then(vl1BufferResult=>{
      setVl1Buffer(vl1BufferResult.toHuman())
  }).catch(console.log);
  accountPair&& api.query.tcpModule.vl1Earnning(accountPair.address)
  .then(vl1EarnningResult=>{
    setVl1Earnning  (vl1EarnningResult.toHuman())
  }).catch(console.log);
  function withdrawalButton(){
    
    accountPair&&   api.tx.tcpModule.withdraw(500*1000)
    .signAndSend(accountPair)
    .then(witResult =>{
        setHint(witResult.toHuman())
    })
    .catch(error=>{
      setHint(error.toHuman())
    });
    // 发送 POST 请求
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8080/faucet',
    //   data: {
    //     "toAddress": accountPair.address,
    //   }  
    // }).then(result =>{
    //  hint= result
    // })
    // .catch(console.error);
  }
  return (
    <Grid.Column width={8}>
      <h1>提币</h1>
      <Form>
        <Form.Field>
          <Label >
          vl1Earnning ：{vl1Earnning}
          </Label>
          <Label >
             vl1Buffer ：{vl1Buffer}
          </Label>
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
        <Button basic    style={{ marginLeft: 0, marginTop: '.5em' }} onClick={ withdrawalButton } >
            提款 500 Uint
        </Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{true}</div>
      </Form>
      <Label >
          {hint}
      </Label>
    </Grid.Column>
  );
}
