const boxContainerDOM = document.querySelector('.body-center')

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

boxContainerDOM.classList.add('body-center')

window.addEventListener('DOMContentLoaded', async () => {
   try {
    const response = await fetch('/api/v1/product', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    const product = data.product

    boxContainerDOM.innerHTML = product.map((item) => {
        const {_id: id, investment, dailyDividend, dailyDividendPercentage, totalDividend, totalDividendPercentage, cycle, image, name} = item

        return `
       
        <article class="box">
        <div>
          <h3 class="body-title">${name}</h3>
        </div>

        <div class="body-main">
          <img src="${image}" class="body-img" alt="" />

          <ul class="body-details">
            <li>Investment Amount</li>
            <li>Daily dividend</li>
            <li>Total dividend</li>
            <li>Cycle</li>
          </ul>

          <ul class="body-details to-right">
            <li>${formatPrice(investment)}</li>
            <li>${dailyDividendPercentage}%/${dailyDividend}</li>
            <li>${totalDividendPercentage}%/${totalDividend}</li>
            <li>${cycle}</li>
          </ul>
        </div>

        <a href="/product?id=${id}" class="body-btn btn">Invest now</a>
      </article>
      
        `
    }).join()
   }
   catch (error){
    console.log(error)
   }
})


const incomeDOM = document.querySelector('#income');
const mineMenuDOM = document.querySelector('#mine-menu');

const showMe = async () => {
  try {
    const response = await fetch('/api/v1/users/showMe', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()

    const user = data.user

    const {phone, userId, referID, role} = user

    console.log(userId)

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

  } catch(error){
    console.log(error)
  }
}

showMe()