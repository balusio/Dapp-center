# Dapp-center
A simple dapp that connects with ethereum and get tokens balance of your account, also let you send tokens to another account!

## Getting Started

The Main idea of this project is use Decentraland UI to connect to your Metamask wallet, get a token balance and transfer those token to another account,
to test it on local follow the install and basic functionalities of this [token](https://github.com/decentraland/dummy-token)

## Setup project
- this project is built with `Node 14.15.4`,Check your Node JS version to be >= 14.15, otherwise you can use [nvm](https://github.com/nvm-sh/nvm), on the root folder you will find a `.nvmrc` file that has the version used, 
- create a .env file that will get this variables:
```
ADDRESS_TOKEN
CHAIN_ID
PORT

```
the Token address and the chain id must be added on the `.env` file this will be read by webpack and disposed on the core/constants.ts file, keep in mind this is the core functionality of the app,
*NOTE:* the token Address must be a ERC20 address in order to work with the ABI provided.

## Project Structure
