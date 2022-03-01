'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//// BANKIST APP////

////////// DATA ///////////
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2, account3, account4];

////////// ELEMENTS
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////////// Movements/Transactions
const displayMovements = function (account, sort = false) {
  // empty the entire container before adding new movements
  containerMovements.innerHTML = "";

  // if sort is true, sort the movements
  // use slice to create a copy so that sort does not mutate original array
  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[index]);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0); // because it is zero based
    // const year = date.getFullYear();
    // const displayDate = `${month}/${day}/${year}`;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
    const displayDate = new Intl.DateTimeFormat(currentAccount.locale, options).format(date)

    // internationalization of currency
    const formattedMov = new Intl.NumberFormat(account.locale, {
      style: "currency",
      currency: account.currency,
    }).format(movement);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;
    // insert new child element 'html' right after the beginning of the parent element 'containerMovements'
    containerMovements.insertAdjacentHTML("afterbegin", html)
  });
};

////////// Sort Movements
let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

////////// Currencies
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////// Conversion: 1 Euro = 1.22 USD
const eurToUSD = 1.22;
const movementsUSD = movements.map(function (movement) {
  return movement * eurToUSD;
});

const movementsDescriptions = movements.map(function (movement, i) {
  if (movement > 0) {
    return `Movement ${i + 1}: You deposited ${movement}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(movement)}`;
  }
});

////////// Computing Usernames
const createUsernames = function (allAccounts) {
  allAccounts.forEach(function (individualAccount) {
    individualAccount.username = individualAccount.owner.toLowerCase().split(" ").map(function (name) {
      return name[0];
    }).join("");
  });
};
createUsernames(accounts);

////////// Filter out withdrawals to only display deposits
const deposits = movements.filter(function (movement) {
  return movement > 0;
});

////////// Filter out deposits to only display withdrawals
const withdrawals = movements.filter(function (movement) {
  return movement < 0;
});

////////// Reduce add multiple values (deposits and withdrawals) to determine global balance of the account with an initial value of 0
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce(function (accumulator, currentValue, i, arr) {
    return accumulator + currentValue;
  }, 0);

  account.balance = balance;

  const formattedBalance = new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(balance);

  labelBalance.textContent = `${formattedBalance}`
};

////////// Take all the movement deposits - convert them from Euros to Dollars and add them all up in order to view total balance
const totalDepositsUSD = movements
  .filter(function (movement) {
    return movement > 0;
  }).map(function (movement) {
    return movement * eurToUSD;
  }).reduce(function (accumulator, movement) {
    return accumulator + movement;
  }, 0);

////////// Display deposits & withdrawals and interest summary
const calcDisplaySummary = function (account) {

  // display deposits
  const incomes = account.movements.filter(function (movement) {
    return movement > 0;
  }).reduce(function (accumulator, movement) {
    return accumulator + movement
  }, 0);

  const formattedIncomes = new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(incomes);

  labelSumIn.textContent = `${formattedIncomes}`;

  // display withdrawals
  const out = account.movements.filter(function (movement) {
    return movement < 0;
  }).reduce(function (accumulator, movement) {
    return accumulator + movement
  }, 0);

  const formattedOut = new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(out);

  // remove the negative sign by using the absolute value
  labelSumOut.textContent = `${formattedOut}`;

  // display interest
  // int = added interest
  const interest = account.movements.filter(function (movement) {
    return movement > 0;
  }).map(function (deposit) {
    return deposit * account.interestRate / 100;
  }).filter(function (int) {
    return int >= 1;
  }).reduce(function (accumulator, int) {
    return accumulator + int;
  }, 0);

  const formattedInterest = new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(interest);

  labelSumInterest.textContent = `${formattedInterest}`;
};

////////// Update UI
const updateUI = function (account) {
  // display movements 
  displayMovements(account);

  // display balance
  calcDisplayBalance(account);

  // display summary
  calcDisplaySummary(account);
};

////////// 5 minute Log Out Timer
const startLogOutTimer = function () {
  // set time to 5 minutes
  let time = 300;

  const timer = setInterval(function () {
    // call the timer every second
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // decrease time by 1 second
    time--;

    // when 0 seconds, log out user
    if (time === -1) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    };
  }, 1000);

  return timer;
};

////////// Log in
let currentAccount, timer;

btnLogin.addEventListener("click", function (event) {
  // prevent form from submitting (page reload)
  event.preventDefault();

  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value
  });

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Display Current Date under 'Current Balance' heading
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // because it is zero based
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    // start logout timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // update UI
    updateUI(currentAccount);
  }

});

////////// Transfer Money
btnTransfer.addEventListener("click", function (event) {
  // prevent form from submitting (page reload)
  event.preventDefault();

  // amount of money the user is transfering
  const amount = Math.floor(inputTransferAmount.value);

  // find account where the username is equal to the 'transfer to' value in the form
  const recieverAccount = accounts.find(function (account) {
    return account.username === inputTransferTo.value;
  });

  // clear input fields
  inputTransferTo.value = "";
  inputTransferAmount.value = "";

  // transfer can only happen if amount is greather than 0
  // the current user needs to have enough money to execute the transfer
  // user should also not be able to transfer money to own account
  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount.username !== currentAccount.username
  ) {
    // subtract amount transfered from current account
    currentAccount.movements.push(-amount);
    // add amount transfered from current account to reciever account
    recieverAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());

    // update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

////////// Request Loan
btnLoan.addEventListener("click", function (event) {
  // prevent form from submitting (page reload)
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // bank will grant a loan if there is at least one deposit in the account with at least 10% of the requested loan amount
  if (
    amount > 0 &&
    currentAccount.movements.some(function (movement) {
      return movement >= amount * 0.10;
    })) {

    // 3 second wait before approving loan
    setTimeout(function () {
      // add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // update UI
      updateUI(currentAccount);
    }, 3000);
  }

  // clear input field
  inputLoanAmount.value = "";
});

////////// Close Account
btnClose.addEventListener("click", function (event) {
  // prevent form from submitting (page reload)
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (account) {
      return account.username === currentAccount.username;
    });

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // clear input fields
  inputCloseUsername.value = "";
  inputClosePin.value = "";
});


