import React, { useEffect, useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';

//import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSubstrate } from './substrate-lib';
export default function Main (props) {
  const { api, keyring } = useSubstrate();
  const accounts = keyring.getPairs();
  const [balances, setBalances] = useState({});
  const { accountPair } = props

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address);
    let unsubscribeAll = null;
    api.query.system.account
      .multi(addresses, balances => {
        const balancesMap = addresses.reduce((acc, address, index) => ({
          ...acc, [address]: balances[index].data.free.toHuman()
        }), {});
        setBalances(balancesMap);
      }).then(unsub => {
        unsubscribeAll = unsub;
      }).catch(console.error);

    return () => unsubscribeAll && unsubscribeAll();
  }, [api, keyring, setBalances]);
  
  return (
    <Grid.Column>
      <h1>区块交易列表</h1>
      <Table celled striped size='small'>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={3} textAlign='right'>
              <strong>区块高度</strong>
            </Table.Cell>
            <Table.Cell width={3}>
              <strong>交易哈希</strong>
            </Table.Cell>
            <Table.Cell width={3}>
              <strong>来自地址</strong>
            </Table.Cell>
            <Table.Cell width={3}>
              <strong>转账地址</strong>
            </Table.Cell>
            <Table.Cell width={3}>
              <strong>金额(MASS)</strong>
            </Table.Cell>
          </Table.Row>
          {accounts.map(account =>
            <Table.Row key={account.address}>
              <Table.Cell width={3} textAlign='right'>{"123111"}</Table.Cell>
              <Table.Cell width={3}>
               {account.address}
              </Table.Cell>
              <Table.Cell width={3}>
               {"sdfadsfa....."}
              </Table.Cell>
              <Table.Cell width={3}>
               {"dsagdsa......"}
              </Table.Cell>
              <Table.Cell width={3}>{
                balances && balances[account.address] &&
                balances[account.address]
              }</Table.Cell>
            </Table.Row>
          )}
          {/* <TabaleRows accountPair={accountPair} /> */}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}

async function TabaleRows(props){
  const {accountPair} = props;
  const { api } = useSubstrate();
  const [lastBlocks,setLastBlocks]= useState([]);
  //5EeKD2EycB1vRVJPgukBgsLe2zLLcaXhbYVyqrf45gjX1KPQ
  useEffect(() => {
    let unsubscribeAll = null
   accountPair && api.query.tcpModule.doubleVl1LastBlock.entries("5EeKD2EycB1vRVJPgukBgsLe2zLLcaXhbYVyqrf45gjX1KPQ", lastBlockRes =>{
     if(lastBlockRes[0]){
       setLastBlocks(lastBlockRes[0]);
     }
   }).then(unsub => {
       unsubscribeAll = unsub[0];
     }).catch(console.error);
     return () => unsubscribeAll && unsubscribeAll();
   },[api,accountPair,setLastBlocks]);

  return (
    <Table.Row>
    <Table.Cell width={3}>{lastBlocks}</Table.Cell>
  </Table.Row>
  )
  
}