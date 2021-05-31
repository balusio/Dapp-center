import React, { ChangeEvent, useState } from 'react';
import { Button, Center, Field, Mana } from 'decentraland-ui';
import { useSelector } from 'react-redux';
import { RootState } from 'core/store/store';
import { useDispatch } from 'react-redux';
import { GetContract } from 'core/utils/Ethereum/EthConnector';
import { ADDRESS_TOKEN } from 'core/constants';

const SwipeTokensContainer = (): JSX.Element => {
  const {user, provider: { provider: currentProvider} } = useSelector( (state: RootState) => state)
  const { address : from, token} = user;
  const [formState, setFormState ] = useState({
    amount: 0,
    to: null,
  });

  const startTransacction = async () => {
    const { to, amount } = formState;
    if(currentProvider) {
      const contract = GetContract(ADDRESS_TOKEN, currentProvider);
      console.log(currentProvider.getSigner())
      const transfer = await contract.transfer(to, amount);
      console.log(transfer);
    }
   
  }
  const transferTokens = () => {
    startTransacction();
  }

  const setTransferDetails = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <>
      <Center>
        <h1>
          Transfer tokens 
        </h1>
        <p>
          You've have <Mana inline>{token?.balance}</Mana> tokens Availables.
        </p>
        <Field label="Amount" name="amount" placeholder="1,000" type="number" value={formState.amount} onChange={setTransferDetails} />
        <Field label="To" name="to" value={formState.to} type="address" onChange={setTransferDetails} />
        <Button primary onClick={transferTokens}>
          Transfer
        </Button>
      </Center>

    </>
  );
};

export default SwipeTokensContainer;
