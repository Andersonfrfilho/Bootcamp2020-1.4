import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface AllInformation {
  transactions: Transaction[];
  balance: Balance;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllInformation {
    const balance = this.getBalance();
    const allInformation = {
      transactions: this.transactions,
      balance,
    };
    return allInformation;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const valueTotalIncome = incomeTransactions.reduce(
      (acumulator, incomeValue) => {
        return acumulator + incomeValue.value;
      },
      0,
    );
    const valueTotalOutcome = outcomeTransactions.reduce(
      (acumulator, incomeValue) => {
        return acumulator + incomeValue.value;
      },
      0,
    );
    const balance = {
      income: valueTotalIncome,
      outcome: valueTotalOutcome,
      total: valueTotalIncome - valueTotalOutcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
