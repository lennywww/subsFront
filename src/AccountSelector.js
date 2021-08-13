import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isWeb3Injected,web3Accounts} from '@polkadot/extension-dapp';
import {
  Menu,
  Button,
  Dropdown,
  Container,
  Icon,
  Image,
  Label
} from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

function Main (props) {
  const { keyring } = useSubstrate();
  const { setAccountAddress } = props;
  const [accountSelected, setAccountSelected] = useState('');
  const [hint, setHint] = useState();
  // const [keyringOptionss,setKeyringOptions]= useState();
  const arras = [];
  useEffect(() => {
  web3Accounts()
    .then(accounts=>{
      accounts.forEach(account => {
        const vObj ={
          key: account.address,
          value: account.address,
          text: account.meta.name.toUpperCase(),
          icon: 'user'
       }
       arras.push(vObj)
    });
  });
  },[arras]);
  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user'
  }));
  
  const initialAddress =
  arras.length > 0 ? arras[0].value : '';
  // Set the initial address
  useEffect(() => {
    setAccountAddress(initialAddress);
    setAccountSelected(initialAddress);
  }, [setAccountAddress, initialAddress]);
    const onChange = address => {
    // Update state with new account address
    setAccountAddress(address);
    setAccountSelected(address);
  };
  function newUser(){
    if(isWeb3Injected){
    }else{
      setHint('请到应用商店下载');
    }
    setTimeout(() => {  setHint('')  }, 3000);
  }
  return (
    <Menu
      attached='top'
      tabular
      style={{
        backgroundColor: '#fff',
        borderColor: '#fff',
        paddingTop: '1em',
        paddingBottom: '1em'
      }}
    >
      <Container>
        <Menu.Menu>
          <Image src={`${process.env.PUBLIC_URL}/assets/substrate-logo.png`} size='mini' />
        </Menu.Menu>
        <Menu.Menu position='right' style={{ alignItems: 'center' }}>
          { !accountSelected
           ? <span>
           Add your account with the{' '}
           <a
             target='_blank'
             rel='noopener noreferrer'
             href='https://github.com/polkadot-js/extension'
           >
             Polkadot JS Extension
           </a>
         </span>
         : null }
       <CopyToClipboard text={accountSelected}>
         <Button
           basic
           circular
           size='large'
           icon='user'
           color={accountSelected ? 'green' : 'red'}
            />
          </CopyToClipboard>
          <Dropdown
            search
            selection
            clearable
            placeholder='Select an account'
            options={arras}
            onChange={(_, dropdown) => {
              onChange(dropdown.value);
            }}
            value={accountSelected}
          />
          <BalanceAnnotation accountSelected={accountSelected} />
          <BalanceAnnotationss accountSelected={accountSelected} />
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

function BalanceAnnotation (props) {
  const { accountSelected } = props;
  const { api } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);
  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe;

    // If the user has selected an address, create a new subscription
    accountSelected &&
      api.query.system.account(accountSelected, balance => {
        setAccountBalance(balance.data.free.toHuman());
      })
        .then(unsub => {
          unsubscribe = unsub;
        })
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, accountSelected]);

  return accountSelected
    ? <Label pointing='left'>
        <Icon name='money' color='green' />
        {accountBalance}
      </Label>
    : null;
}


function BalanceAnnotationss (props) {
  const { accountSelected } = props;
  const { api } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);
  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe;

    // If the user has selected an address, create a new subscription
    accountSelected &&
    api.query.tcpModule.vl1Generation(accountSelected, balance => {
        setAccountBalance(balance.toHuman());
      }).then(unsub => {
          unsubscribe = unsub;
        }).catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, accountSelected]);

  return accountSelected
    ? <Label pointing='left'>
        <Icon name='money' color='green' />
        {accountBalance}
      </Label>
    : null;
}



export default function AccountSelector (props) {
  const { api, keyring } = useSubstrate();
  return keyring.getPairs && api.query ? <Main {...props} /> : null;
}
