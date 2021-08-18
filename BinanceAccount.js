// App.js

import { Web3ReactProvider, useWeb3React, } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEagerConnect, useInactiveListener } from './Hooks'
import React ,{useState,useEffect }from 'react'
import { Form,  Grid , Label,Card,Statistic} from 'semantic-ui-react';
import { ethers } from 'ethers';
/// import './AppText.css';

import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({ supportedChainIds: [97] });

function Spinner(props) {
    const { color, ...rest } = props
    return (
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke={color} {...rest}>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    )
  }

export default function Main() {
  const triedEager = useEagerConnect();
  const [bscAccount  ,setBSCAccount ] = useState();
  const [bscAccountBalance  ,setBSCAccountBalance ] = useState();
  const [bscAccountQUA  ,setBSCAccountQUA ] = useState();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
        <Grid.Column>
      <h1>火币链</h1>
      <Card centered>
        <Card.Content textAlign='center'>
          <Statistic
            label='QUARK_ERC20'
            value={bscAccountQUA}
          />
        </Card.Content>
      </Card>
      <Form>
        <Form.Field>
        <ChainId/>
        </Form.Field>
        <Form.Field>
          {bscAccount}
        </Form.Field>

          {//余额 ：bscAccountBalance}
            }
        <div style={{ overflowWrap: 'break-word' }}>{true}</div>
      </Form>
    <ConnectChain triedEager={triedEager} 
    setBSCAccount={setBSCAccount} 
    setBSCAccountBalance ={setBSCAccountBalance} 
    setBSCAccountQUA={setBSCAccountQUA} />
    </Grid.Column>
    </Web3ReactProvider>
  );
}



function ConnectChain(props) {
    const context = useWeb3React()
    const {triedEager,setBSCAccount,setBSCAccountBalance,setBSCAccountQUA} = props;
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [activatingConnector, setActivatingConnector] = useState();
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let abi =  
      [
        {
        "constant": true,
        "inputs": [
          {
            "name": "who",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
      ]
  let contractAddress = "0x546708449c06db7aD1b04bd7bCA6f3878f459D7D";
  
  let contract = new ethers.Contract(contractAddress, abi, provider);
 
    useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined);
      }
      setBSCAccount(account)
      account && provider.getBalance(account).then(balance=>{
        if(balance){
          setBSCAccountBalance(Number(ethers.utils.formatEther(balance)).toFixed(2));
        }
      });
      account && contract.balanceOf(account).then(balanceERC20=>{
        if(balanceERC20){
          setBSCAccountQUA(balanceERC20.toString()/1000000)
        }
      });
    }, [activatingConnector, connector,setBSCAccount])
  
    const activating = injected === activatingConnector
    const connected = injected === connector
    const disabled = !triedEager || !!activatingConnector || !!error
  
    useInactiveListener(!triedEager || !!activatingConnector)
  
    let isDisconnect = !error && chainId
    const buttonText = isDisconnect ? 'Disconnect' : (activating ? 'Connectting' : 'Connect' )
  
    return (
      <button
        style={{
          borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
          cursor: disabled ? 'unset' : 'pointer',
          position: 'relative',
        }}
        className="ConnectButton"
        disabled={disabled}
        onClick={() => {
          if (!isDisconnect) {
            setActivatingConnector(injected)
            activate(injected)
          } else {
            deactivate()
          }
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            margin: '0 0 0 1rem'
          }}
        >
          {activating && <Spinner color={'red'} style={{ height: '50%', marginLeft: '-1rem' }} />}
        </div>
        { buttonText }
      </button>
    )
  }
  
  function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 5000
    return library
  }
  
  function ChainId() {
    const { chainId, library } = useWeb3React()
  
    return (
      <div className="ChainIdWrapper">
        <span>Chain Id</span>
        <span role="img" aria-label="chain">
          ：
        </span>
        <span className="ChainIdText">{chainId ?? 'Not Connected'}</span>
      </div>
    )
  }
  