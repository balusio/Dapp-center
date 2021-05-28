import React, { useEffect } from 'react';
import { Button } from 'decentraland-ui';
import FullPageContainer from 'components/FullPageContainer';
import { ethers } from "ethers";
import ERC20ABI from 'core/abi/erc20.json';

/**
 * Homepage container, uses the DataHook to recieve always data.
 */
const HomeContainer = (): JSX.Element => {
  useEffect(()=>{
    const setEnable = async ()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const address = await signer.getAddress();

    
      console.log(address," signer")
      const balance = await provider.getBalance(address);
      console.log(ethers.utils.formatEther(balance), 'balance');

      const ADDRESS_TOKEN = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contract = new ethers.Contract(ADDRESS_TOKEN, ERC20ABI.abi, provider)
      const balanceToken = await contract.balanceOf(address);
      // transform the number to decimal representation
      console.log(balanceToken.toNumber(), ' DUMMY TOKEN');
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
      <FullPageContainer>
        <div className="button-login">
          <h1>
            HELLO WORLD
          </h1>
          <Button primary>Login</Button>
        </div>
      </FullPageContainer>

    </>
  );
};

export default HomeContainer;
