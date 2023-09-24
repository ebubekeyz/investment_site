// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});

const formatPrice = (investment) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(investment.toFixed(2));
  return formattedPrice;
};

const chevronDOM = document.querySelector('.chevron');
const accountInput = document.querySelector('#realname');
const accountNameInput = document.querySelector('#account-name');
const bankNameInput = document.querySelector('#bank-name');
const amountInput = document.querySelector('#amount');
const taxInput = document.querySelector('#tax');
const mainAmountInput = document.querySelector('#main-amount');
const withdrawBtn = document.querySelector('#withdraw-btn');
const alertDOM = document.querySelector('.alert');

chevronDOM.addEventListener('click', () => {
  window.history.back();
});

const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`/api/v1/bankInfo/${urlID}/bankInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    const bankInfo = data.bankInfo;

    const length = bankInfo.length - 1;

    if (response.status === 200) {
      accountInput.value = bankInfo[length].bankAccount;
      accountNameInput.value = bankInfo[length].realName;
      bankNameInput.value = bankInfo[length].bankCode;
    } else {
      console.log(data.msg);
    }
  } catch (error) {
    console.log(error);
  }
});

let withdrawalAmount = parseInt(amountInput.value);
let withdrawalTax = parseInt(taxInput.value);
let mainWithdrawal = parseInt(mainAmountInput.value);

amountInput.addEventListener('keyup', () => {
  const tax = (amountInput.value * 10) / 100;
  taxInput.value = tax;
  const main = amountInput.value - (amountInput.value * 10) / 100;
  mainAmountInput.value = main;
});

withdrawBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let accountNumber = accountInput.value;
  let accountName = accountNameInput.value;
  let withdrawalAmount = amountInput.value;
  let withdrawalTax = taxInput.value;
  let mainWithdrawal = mainAmountInput.value;
  let bankName = bankNameInput.value;

  withdrawBtn.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch('/api/v1/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountName,
        accountNumber,
        bankName,
        withdrawalAmount,
        withdrawalTax,
        mainWithdrawal,
      }),
    });
    const data = await response.json();

    if (response.status === 201) {
      amountInput.value = '';
      taxInput.value = '';
      mainAmountInput.value = '';
      alertDOM.classList.add('show');
      alertDOM.textContent = `Withdrawal Successful`;
      setInterval(() => {
        alertDOM.classList.remove('show');
      }, 5000);
      withdrawBtn.textContent = 'Successful';
    } else {
      alertDOM.classList.add('show');
      alertDOM.textContent = data.msg;
      setInterval(() => {
        alertDOM.classList.remove('show');
      }, 5000);
      withdrawBtn.textContent = 'Withdraw';

    }
  } catch (error) {
    console.log(error);
  }
});


const balanceDOM = document.querySelector('.curBalance')
let accumulateTotal = JSON.parse(localStorage.getItem('accumulateTotal'));

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`/api/v1/withdraw/${urlID}/withdrawal`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const withdraw = data.withdraw
    let balanceCalc = data.balanceCalc
    const totalBalance = data.totalBalance
    
    
    const balanceLength = balanceCalc.length - 1

    balanceCalc = balanceCalc[balanceLength]
    console.log(balanceCalc)
    

    if (response.status === 200) {
      balanceDOM.textContent = formatPrice(accumulateTotal - balanceCalc)
    } else {
      console.log(data.msg);
      balanceDOM.textContent = formatPrice(accumulateTotal)
    }
  } catch (error) {
    console.log(error);
  }
});

