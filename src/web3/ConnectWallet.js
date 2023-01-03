import React from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Button from '@mui/material/Button';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { NotificationManager } from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { addressActions } from '../store/web3/addressSlice';
import { web3Actions } from '../store/web3/web3Slice';

const createNotification = (type) => {
  switch (type) {
    case 'info':
      NotificationManager.info('');
      break;
    case 'success':
      NotificationManager.success('Successfully Connected', 'Title here', 3000);
      break;
    case 'warning':
      NotificationManager.warning('Please Connect Your Wallet', 'Close after 3000ms', 3000);
      break;
    case 'error':
      NotificationManager.error('Connection Unsuccesful', 'Error', 3000);
      break;
      default: console.log("------")
  }
};

const providerOptions = {

  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'FTconvert',
      infuraId: '2dff6ecffd694a2e80f56b12856fce09',
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
   
      infuraId: '2dff6ecffd694a2e80f56b12856fce09',
    },
  },
};

export default function ConnectWallet() {
  const accountSpliced = useSelector((state) => state.account.account_spliced);
  const dispatch = useDispatch();
  const connect = async () => {
    const web3Modal = new Web3Modal({
      network: 'testnet', // optional
      cacheProvider: false, // optional
      providerOptions, // required
    });
    try {
      const provider = await web3Modal.connect();
      const webThree = new Web3(provider);
   
      const accounts = await webThree.eth.getAccounts();
      const addressSpliced = accounts[0];
      const one = addressSpliced.slice(0, 5);
      const two = addressSpliced.slice(38, 42);
      dispatch(addressActions.addAccountSpliced({ account_spliced: `${one}...${two}` }));
      dispatch(addressActions.addAccount({ account: accounts[0] }));
      dispatch(web3Actions.addWeb3({ web3: webThree }));
      createNotification('success');
    } catch (error) {
  
      createNotification('error');
    }
  };

  return (
     <Button variant="contained" color={accountSpliced !== null ?  "success" : "warning"}
      onClick={() => {
        connect();
      }}
    >
      {accountSpliced !== null ? accountSpliced : 'Connect Wallet'}
    </Button>
  );
}
