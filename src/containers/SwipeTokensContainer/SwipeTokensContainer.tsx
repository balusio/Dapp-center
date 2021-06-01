import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Field, Loader, Mana, Table } from "decentraland-ui";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "core/store/store";
import { makeTransaction } from "core/store/slices/transactions/TransactionSlice";

import "./SwipeTokensContainer.scss";

export type InputStatus = {
  value: string | number;
  error: boolean;
  validate: (value: never) => boolean;
};

export type FormState = {
  amount: InputStatus;
  to: InputStatus;
};

const SwipeTokensContainer = (): JSX.Element => {
  const {
    user: { token },
    transactions: { transactions },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [isLoading, SetisLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    amount: {
      value: 0,
      error: false,
      validate: (value: never) => value > 0,
    },
    to: {
      value: "",
      error: false,
      validate: (value: never) => value !== "",
    },
  });

  useEffect(() => {
    if (transactions.length > 0) {
      SetisLoading(false);
    }
  }, [transactions]);

  const validateForm = () => {
    let isFormValid = true;
    Object.entries(formState).forEach(([key, { value, validate }]) => {
      if (!validate(value as never)) {
        setFormState({
          ...formState,
          [key]: {
            ...formState[key as keyof FormState],
            error: true,
          },
        });
        isFormValid = false;
      }
    });

    return isFormValid;
  };

  const transferTokens = () => {
    // before send the transaction, check that all elements of the form
    if (validateForm()) {
      SetisLoading(true);
      dispatch(
        makeTransaction({
          to: formState.to,
          amount: formState.amount,
        })
      );
    }
  };

  const setTransferDetails = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: {
        ...formState[name as keyof FormState],
        value,
        error: false,
      },
    });
  };

  return (
    <div className="ui container page-container">
      <div className="display-with-margin">
        <h1>Transfer tokens</h1>
        <span>
          You&apos;ve have <Mana inline>{token?.balance}</Mana> tokens
          Available.
        </span>
        <Field
          label="Amount"
          name="amount"
          placeholder="1,00"
          type="number"
          value={formState.amount.value}
          onChange={setTransferDetails}
          error={formState.amount.error}
        />
        <Field
          label="To"
          name="to"
          value={formState.to.value}
          type="address"
          onChange={setTransferDetails}
          error={formState.to.error}
        />
        <Button primary onClick={transferTokens}>
          Transfer
        </Button>
        <Loader active={isLoading} size="massive" />
      </div>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>to</Table.HeaderCell>
            <Table.HeaderCell>Confirmations</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.map((elem) => (
            <Table.Row key={`${new Date().getTime().toString()}`}>
              <Table.Cell>{elem.to}</Table.Cell>
              <Table.Cell>{elem.confirmations}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SwipeTokensContainer;
