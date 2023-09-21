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

const incomeDOM = document.querySelector('#income');

const showMe = async () => {
  try {
    const response = await fetch('/api/v1/users/showMe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const user = data.user;

    const { phone, userId, referID, role } = user;

    incomeDOM.innerHTML = `
    <a href="/income?id=${userId}">
            <span class="fav"><i class="fas fa-money-check"></i></span>
            <p>Income</p>
          </a>
    `;
  } catch (error) {
    console.log(error);
  }
};

showMe();

const todayEarningDOM = document.querySelector('.today-earn');
const investmentAmountDOM = document.querySelector('.invest-amt');
const accumulatedIncomeDOM = document.querySelector('.acct-income');

const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`/api/v1/payment/${urlID}/payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    let payment = data.payment;

    // const { _id: paymentId, senderName, investmentAmount, investmentName, status } = payment

    const normalValue = 0;

    let dailyEarning = payment.reduce((acc, curr) => {
      const calc = (curr.investmentAmount * curr.dailyPercentage) / 100;
      return acc + calc;
    }, 0);

    
    let earn = 0;
    const dailyInterval = setInterval(() => {
     
      earn += dailyEarning;
      todayEarningDOM.textContent = formatPrice(earn);
      accumulatedIncomeDOM.textContent = formatPrice(earn);
    
    }, 2000);


    const investmentAmount = payment.reduce((acc, curr) => {
      return acc + curr.investmentAmount
    },0)

   
   

let now = new Date();
now.setDate(now.getDate() + 30);


console.log(now)






  } catch (error) {
    console.log(error);
  }
});
