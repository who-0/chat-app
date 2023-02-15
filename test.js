class Bank {
  constructor() {
    this.accounts = [];
  }

  openAccount(account) {
    this.accounts.push(account);
  }

  closeAccount(account) {
    this.accounts = this.accounts.filter(a => a !== account);
  }

  getAccount(accountNumber) {
    return this.accounts.find(a => a.number === accountNumber);
  }

  generateStatement(accountNumber) {
    const account = this.getAccount(accountNumber);
    let statement = `Statement for Account ${accountNumber}\n`;
    statement += `Balance: ${account.balance}\n`;
    statement += 'Transactions:\n';
    account.transactions.forEach(t => {
      statement += `${t.date.toLocaleString()} | ${t.type} | ${t.amount}\n`;
    });
    return statement;
  }
}

class Account {
  constructor(number, balance = 0) {
    this.number = number;
    this.balance = balance;
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.push({
      date: new Date(),
      type: 'Deposit',
      amount: amount
    });
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log(`Insufficient funds. Available balance: ${this.balance}`);
      return;
    }
    this.balance -= amount;
    this.transactions.push({
      date: new Date(),
      type: 'Withdrawal',
      amount: amount
    });
  }
}

const bank = new Bank();
const account = new Account(12345);
bank.openAccount(account);
account.deposit(100);
account.withdraw(50);
console.log(bank.generateStatement(12345));
