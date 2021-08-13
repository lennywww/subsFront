import React,{  useState }  from 'react';
import { Form,  Grid , Label, Icon} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
//import axios from 'axios';

export default function Main (props) {
  const { accountPair } = props;
  const [hint ,setHint ] = useState();
  function faucetButton(){
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
      <h1>水龙头</h1>
      <Form>
      <Form.Field>
          <Label basic color='teal' style={{ marginLeft: 0, marginTop: '.5em' }}>
            <Icon name='hand point right' />
            好消息，水龙头每日开放领取 1000 MUint , 用户每天 1 MUint , 禁止多账号领取！
          </Label>
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
        <Button basic    style={{ marginLeft: 0, marginTop: '.5em' }} onClick={ faucetButton } >
            领取1 MUint
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
