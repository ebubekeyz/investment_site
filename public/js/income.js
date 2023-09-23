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
const mineMenuDOM = document.querySelector('#mine-menu');

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
    `

    mineMenuDOM.innerHTML = `
    <a href="/mine?id=${userId}">
            <span class="fav"><i class="fas fa-users"></i></span>
            <p>Mine</p>
          </a>
    `
  } catch (error) {
    console.log(error);
  }
};

showMe();

const todayEarningDOM = document.querySelector('.today-earn');
const investmentAmountDOM = document.querySelector('.invest-amt');
const accumulatedIncomeDOM = document.querySelector('.acct-income');
const alertDOM = document.querySelector('.alert');
const receiveBtn = document.querySelector('#receive-btn');
const amountInput = document.querySelector('#amount');

const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

window.addEventListener('DOMContentLoaded', async () => {});

const income = async () => {
  try {
    const response = await fetch(`/api/v1/payment/${urlID}/payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    let totalInvestment = data.totalInvestment;

    let dailyEarning = data.dailyEarning;

    let totalInvestmentCalc = data.totalInvestmentCalc;
    totalInvestmentCalc = localStorage.setItem(
      'totalInvestmentCalc',
      JSON.stringify(totalInvestmentCalc)
    );
    totalInvestmentCalc = JSON.parse(
      localStorage.getItem('totalInvestmentCalc')
    );

    let dailyEarningCalc = data.dailyEarningCalc;
    dailyEarningCalc = localStorage.setItem(
      'dailyEarningCalc',
      JSON.stringify(dailyEarningCalc)
    );
    dailyEarningCalc = JSON.parse(localStorage.getItem('dailyEarningCalc'));

    let payment = data.payment;

    const length1 = totalInvestmentCalc.length - 1;
    investmentAmountDOM.textContent = formatPrice(totalInvestmentCalc[length1]);

    let earn = 0;

    const dailyInterval = setInterval(() => {
      const length2 = dailyEarningCalc.length - 1;
      earn += dailyEarningCalc[length2];
      todayEarningDOM.textContent = formatPrice(dailyEarningCalc[length2]);
      return localStorage.setItem('earn', JSON.stringify(earn));
    }, 4000);

    const receiveBtnInterval = setInterval(() => {
      receiveBtn.classList.add('show');
    }, 4000);

    let date = new Date();
    date.setDate(date.getDate() + 30);
    // date = date.toUTCString()
    date = date.toLocaleString();
    console.log(date);

    // if (date) {
    //   clearInterval(dailyInterval);
    //   clearInterval(receiveBtnInterval);
    // }

    getEarn = JSON.parse(localStorage.getItem('earn'));
  } catch (error) {
    console.log(error);
  }
};
income();

receiveBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let amount = amountInput.value;
  let dailyEarningCalc = JSON.parse(localStorage.getItem('dailyEarningCalc'));

  const len = dailyEarningCalc.length - 1;
  dailyEarningCalc = dailyEarningCalc[len];
  amount = dailyEarningCalc;

  try {
    const response = await fetch(`/api/v1/accumulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();

    const accumulate = data.accumulate;

    if (response.status === 201) {
      alertDOM.classList.add('show');
      alertDOM.textContent = 'Daily Income Successfully Received';
      setInterval(() => {
        alertDOM.classList.remove('show');
      }, 3000);
    } else {
      alertDOM.classList.add('show');
      alertDOM.textContent = data.msg;
      setInterval(() => {
        alertDOM.classList.remove('show');
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
});

receiveBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`/api/v1/accumulate/${urlID}/accumulate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    const accumulate = data.totalAccumulatedAmount;
    if (response.status === 200) {
      console.log(accumulate);
      localStorage.setItem('accumulate', JSON.stringify(accumulate));

      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`/api/v1/accumulate/${urlID}/accumulate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    const accumulate = data.accumulate;

    if (response.status === 200) {
      const accumulateTotal = accumulate.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

      localStorage.setItem('accumulateTotal', JSON.stringify(accumulateTotal));

      accumulatedIncomeDOM.textContent = formatPrice(accumulateTotal);
    }
  } catch (error) {
    console.log(error);
  }
});




const chevronDOM = document.querySelector('.chevron')

chevronDOM.addEventListener('click',() => {
    window.history.back()
})