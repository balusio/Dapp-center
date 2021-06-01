# Dapp-center
A simple dapp that connects with ethereum and get tokens balance of your account, also let you send tokens to another account!

## Getting Started

The Main idea of this project is use Decentraland UI to connect to your Metamask wallet, get a token balance and transfer those token to another account,
to test it on local follow the install and basic functionalities of this [token](https://github.com/decentraland/dummy-token)

## Setup project
- this project is built with `Node 14.15.4`,Check your Node JS version to be >= 14.15, otherwise you can use [nvm](https://github.com/nvm-sh/nvm), on the root folder you will find a `.nvmrc` file that has the version used, 
- create a .env file that will get this variables:
```
ADDRESS_TOKEN= [the address of the token where you want to test]
CHAIN_ID= [ the chain id selected from metamask  check [here](https://docs.metamask.io/guide/ethereum-provider.html#chain-ids)]
PORT= port of the app for dev ( if this fails check the webpack.dev.config.js)

```
the Token address and the chain id must be added on the `.env` file this will be read by webpack and disposed on the core/constants.ts file, keep in mind this is the core functionality of the app,
*NOTE:* the token Address must be a ERC20 address in order to work with the ABI provided.

## Project Structure

Inside the Src folder you will find: 

- core : Ethereum utils like Contract generator and wallet connection through provider, store and sagas and constanst
- containers: here will be all wrappers of pages, normally all routes will point to a component under the containers folder
- components: any adaptation of Decentraland ui components to be manipulated
- types: types definitions

## Testing
 All testing must go into the folder of the file inside a `__test__` folder

*NOTE:*
due to an error with  jest 26 and ganache-core 
```ganache Right-hand side of 'instanceof' is not callable``` 
test are not workable
