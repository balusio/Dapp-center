import React, { useEffect } from 'react';
import { Button } from 'decentraland-ui';
import FullPageContainer from 'components/FullPageContainer';
import { ethers } from "ethers";
import ERC20ABI from 'core/abi/erc20.json';
import { useSelector } from 'react-redux';
import { RootState } from 'core/store/store';
import { useDispatch } from 'react-redux';
import { connectUser } from 'core/store/slices/user/UserSlice';
/**
 * Homepage container, uses the DataHook to recieve always data.
 */
const HomeContainer = (): JSX.Element => {
  const user = useSelector( (state: RootState) => state.user)
  const dispatch = useDispatch();

  useEffect(()=>{
    const setEnable = async ()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await signer.getChainId();
      const ADDRESS_TOKEN = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contract = new ethers.Contract(ADDRESS_TOKEN, ERC20ABI.abi, provider)
      const balanceToken = await contract.balanceOf(address);
  
      if(address) {
        dispatch(connectUser({
          connected: true,
          address,
          network: `${network}`,
          tokens: [{
            address: ADDRESS_TOKEN,
            name: 'Dummy',
            balance: balanceToken.toNumber(),
          }],
          balance: '',
        }))
      }
    };
    if(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      setEnable()
     
    }
  },[]);

  // const startApp = () => {
  //   if(window.ethereum) {
      
  //   }
  // }
  return (
    <>
      <div className="button-login">
        <h1>
          HELLO WORLD
        </h1>
        {
          user.connected && (
            <Button primary>Login</Button>
          )
        }
      </div>
    </>
  );
};

export default HomeContainer;
