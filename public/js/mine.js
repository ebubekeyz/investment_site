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
  }
  catch(error){
    console.log(error)
  }
})



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

      localStorage.removeItem('dailyEarningCalc')
      localStorage.removeItem('totalInvestmentCalc')
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