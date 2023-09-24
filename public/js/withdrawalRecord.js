// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});

const chevronDOM = document.querySelector('.chevron');


chevronDOM.addEventListener('click', () => {
    window.history.back();
  });

  const formatPrice = (investment) => {
    const formattedPrice = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(investment.toFixed(2));
    return formattedPrice;
  };

  
const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

  const amountDOM = document.querySelector('.amount')
  const dateDOM = document.querySelector('.date')
  const statusDOM = document.querySelector('.status')
  const recordDOM = document.querySelector('.record')

  window.addEventListener('DOMContentLoaded', async() => {
    try {
      const response = await fetch(`/api/v1/withdraw/${urlID}/withdrawal`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      })

      const data = await response.json()

      const withdraw = data.withdraw

      console.log(withdraw)

      recordDOM.innerHTML = withdraw.map((withdraw) => {
        const {withdrawalAmount, createdAt, status} = withdraw

        let date = new Date(createdAt)
        date = date.toUTCString()
        console.log(date.toLocaleString())
        return ` <article class="record-details">
        <p class="amount">${formatPrice(withdrawalAmount)}</p>
        <p class="date">${date}</p>
        <p class="status">${status}</p>
    </article>`
      })
    }
    catch(error){
      console.log(error)
    }
  })