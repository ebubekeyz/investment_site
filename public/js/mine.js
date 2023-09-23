const formatPrice = (investment) => {
    const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format((investment).toFixed(2))
    return formattedPrice
  }
  
  // preloader
  const preloader = document.querySelector(".preloader");
  
  window.addEventListener("load", function () {
    preloader.classList.add("hide-preloader");
  });
  


  
const incomeDOM = document.querySelector('#income');
const mineMenuDOM = document.querySelector('#mine-menu');
const mineIncomeDOM = document.querySelector('.mine-income');

const mineNumberDOM = document.querySelector('.mine-number')
let mineIDDOM = document.querySelector('.mine-id')
let mineBtn = document.querySelector('#mine-btn')
const withdrawDOM = document.querySelector('.withd')
const withdrawalDOM = document.querySelector('.withdrawal')


window.addEventListener('DOMContentLoaded', async () => {
  try{
    const response = await fetch('/api/v1/users/showMe',{
      methods: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    const user = data.user
    console.log(user)

    const {phone, userId, referID} = user
    mineNumberDOM.textContent = phone
    mineIDDOM.innerHTML = `<span style="font-weight: 700">ID:</span> ${userId}`

    mineIncomeDOM.innerHTML = `
    <a href="/income?id=${userId}" class="investment">
    <span class="icon"><i class="fas fa-book"></i></span>
    <p class="investment-text">Investment<br> details</p>
</a>
    `

    incomeDOM.innerHTML = `
    <a href="/income?id=${userId}">
            <span class="fav"><i class="fas fa-money-check"></i></span>
            <p>Income</p>
          </a>
    `
    withdrawDOM.innerHTML = `
    <a href="/withdraw?id=${userId}" class="mine-main">
    <span class="icon2"><i class="fas fa-id-card"></i></span>
    <p>Withdrawal Account</p>
    <span><i class="fas fa-chevron-right"></i></span>
  </a>
    `

    withdrawalDOM.innerHTML = `
    <a href="/withdrawal?id=${userId}" class="withdraw">
                        <span class="icon"><i class="fas fa-id-card"></i></span>
                        <p class="withdraw-text">Withdraw</p>
                    </a>
    `
    mineMenuDOM.innerHTML = `
    <a href="/mine?id=${userId}">
            <span class="fav"><i class="fas fa-users"></i></span>
            <p>Mine</p>
          </a>
    `
  }
  catch(error){
    console.log(error)
  }
})

const balanceDOM = document.querySelector('#balance')
const totalIncomeDOM = document.querySelector('#total-income')

mineBtn.addEventListener('click', async () => {
  mineBtn.innerHTML = `<div class="loading"></div>`
  try{
    const response = await fetch('/api/v1/auth/logout',{
      methods: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    if(response.status === 200){
      let dailyEarningCalc = JSON.parse(localStorage.getItem('dailyEarningCalc'));
      let totalInvestmentCalc = JSON.parse(localStorage.getItem('totalInvestmentCalc'));

      let accumulateTotal = JSON.parse(localStorage.getItem('accumulateTotal'));

      localStorage.removeItem('dailyEarningCalc')
      localStorage.removeItem('totalInvestmentCalc')
      localStorage.removeItem('accumulateTotal')
      window.location = '/'
    }
    else{
      console.log(data.msg)
    }

   
  }
  catch(error){
    console.log(error)
  }
})



let accumulateTotal = JSON.parse(localStorage.getItem('accumulateTotal'));





const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

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
    }
  } catch (error) {
    console.log(error);
  }
});


// totalIncomeDOM.textContent = formatPrice(accumulateTotal)

window.addEventListener('DOMContentLoaded', async () => {
  try {
    balanceDOM.textContent = formatPrice(0)
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

      balanceDOM.textContent = formatPrice(accumulateTotal)
      totalIncomeDOM.textContent = formatPrice(accumulateTotal)

      
    }
  } catch (error) {
    console.log(error);
  }
});
