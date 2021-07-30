// let balance = 500.00;

class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0
    for (let x of this.transactions) {
      balance += x.value
    }
    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }

}


class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0)
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account();

console.log('Starting Balance:', myAccount.balance);

console.log('Withdrawing past $0');
t1 = new Withdrawal(50.00, myAccount);
console.log('Result:', t1.commit())
console.log('Account Balance: ', myAccount.balance);

t2 = new Deposit(120.00, myAccount);
console.log('Result: ', t2.commit())
console.log('Account Balance: ', myAccount.balance);


