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



const chevronDOM = document.querySelector('.chevron')
console.log(chevronDOM)

chevronDOM.addEventListener('click',() => {
    window.history.back()
})


function getRandomNumber() {
  return Math.floor(Math.random() * account.length);
}


const accBtnDOM = document.querySelector('.acc-btn');
const text = document.querySelector('.acc-text').textContent;
const copyDOM = document.querySelector('.copy');

const bankDOM = document.querySelector('.bank');
const bankTextDOM = document.querySelector('.acc-text');

const account = [
  { name: 'John Doe', bank: 'Opay', number: '2345656788' },
  { name: 'Peter John', bank: 'Palmpay', number: '4356775643' },
  { name: 'Daniel Sam', bank: 'Moniempoint', number: '1234567899' },
];

accBtnDOM.addEventListener('click', () => {
  navigator.clipboard.writeText(text);
  copyDOM.classList.add('show');
});

setInterval(() => {
  copyDOM.classList.remove('show');
}, 2000);

let countDOM = document.querySelector('#count');

let up = true;
let value = 200;
let increment = 1;
let ceiling = 0;

function calculate() {
  if (up == true && value >= ceiling) {
    value -= increment;
    if (value == ceiling) {
      up = false;
      const randomNumber = getRandomNumber();
      bankDOM.textContent = `${account[randomNumber].bank} - ${account[randomNumber].name}`;
      bankTextDOM.textContent = account[randomNumber].number;

      accBtnDOM.addEventListener('click', () => {
        navigator.clipboard.writeText(
          (bankTextDOM.textContent = account[randomNumber].number)
        );
        copyDOM.classList.add('show');
      });
    }
  }

  countDOM.innerHTML = `${value}`;
}

setInterval(calculate, 1000);

const investDOM = document.querySelectorAll('.amount');
const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`/api/v1/product/${urlID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const product = data.product;

    const {
      _id: id,
      investment,
      dailyDividend,
      totalDividend,
      cycle,
      image,
      name,
    } = product;

    investDOM.forEach((invest) => {
      invest.innerHTML = `${formatPrice(investment)}`;
    });
  } catch (error) {
    console.log(error);
  }
});

const modalDOM = document.querySelector('.modal');
const modalBtnDOM = document.querySelector('.modal-btn');
const contDOM = document.querySelector('.container');

window.addEventListener('DOMContentLoaded', () => {
  modalDOM.classList.add('show');
});

modalBtnDOM.addEventListener('click', () => {
  modalDOM.classList.remove('show');
});

contDOM.addEventListener('click', (e) => {
  const em = e.target;
  modalDOM.classList.remove('show');
});




const senderDOM = document.querySelector('#senderName')
const investAmtDOM = document.querySelector('#investAmt')
const investNameDOM = document.querySelector('#investName')
const dailyPercentageDOM = document.querySelector('#dailyPercentage')
const totalPercentageDOM = document.querySelector('#totalPercentage')
const alertDOM = document.querySelector('.alert')


const senderBtn = document.querySelector('#sender-btn')

window.addEventListener('DOMContentLoaded', async() => {
  try {
    const response = await fetch(`/api/v1/product/${urlID}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()

    const product = data.product
    const {investment, dailyDividendPercentage, totalDividendPercentage, name} = product

    if(response.status === 200){
    investAmtDOM.value = investment
    investNameDOM.value = name
    dailyPercentageDOM.value = dailyDividendPercentage
    totalPercentageDOM.value = totalDividendPercentage

    // console.log(investAmtDOM.value)
    // console.log(investNameDOM.value)
   
    }
  } 
  catch(error){
    console.log(error)
  }
})


senderBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const senderName = senderDOM.value
  const investmentAmount = investAmtDOM.value
  const investmentName = investNameDOM.value
  const dailyPercentage = dailyPercentageDOM.value
  const totalPercentage = totalPercentageDOM.value

  const sender = { senderName, investmentAmount, dailyPercentage, totalPercentage, investmentName }
  try{
    senderBtn.innerHTML = `<div class="loading"></div>`

    const response = await fetch('/api/v1/payment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sender)
    })

    const data = await response.json()

    if(response.status === 201){
      senderDOM.value = ''
      investAmtDOM.value = ''
      investNameDOM.value = ''

      alertDOM.classList.add('show')
      alertDOM.textContent = `Payment sent successfully`
      setInterval(() => {
        alertDOM.classList.remove('show')
      },5000)
      senderBtn.textContent = 'Payment Request sent'

    } else {
      alertDOM.classList.add('show')
      alertDOM.textContent = data.msg
      setInterval(() => {
        alertDOM.classList.remove('show')
      },5000)
      console.log(data.msg)
    }
  }
  catch(error) {
    console.log(error)
  }
})


