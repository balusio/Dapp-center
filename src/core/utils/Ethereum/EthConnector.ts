import { BigNumber, ethers } from "ethers";
import WindowProvider from 'core/utils/EthProvider';
import ERC20ABI from 'core/abi/erc20.json';

export type Provider = ethers.providers.Web3Provider;

/**
 * Function connector that instance the Provider to be manipulated
 */
const EthereumConnector = async () => {
  const ethProvider: Provider = new ethers.providers.Web3Provider(WindowProvider)
  if(ethProvider.provider.isMetaMask && ethProvider.provider.request) {
    try{
      await ethProvider.provider.request({
        method: 'eth_requestAccounts'
      })
      return ethProvider;
    } catch(error) {
      throw new Error(error);
    }
  }
} 

/**
 * @param tokenAddress token where the ER20 should be
 * @param provider the provider passed 
 * @param userAddress the user to check his balance
 * @returns token value of the adress parsed in number
 */
const TokenConnector = async (tokenAddress: string, provider: Provider, userAddress: string) => {
  try{
    const contract = new ethers.Contract(tokenAddress, ERC20ABI.abi, provider)
    const balanceToken = await contract.balanceOf(userAddress);
    return balanceToken.toNumber()
 
  } catch(error) {
    console.error(error)
  }
};

export {
  EthereumConnector,
  TokenConnector
}
