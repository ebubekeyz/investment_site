// preloader
const preloader = document.querySelector(".preloader");

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

const formatPrice = (investment) => {
    const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format((investment).toFixed(2))
    return formattedPrice
}

const params2 = window.location.search
const urlID = new URLSearchParams(params2).get('id')

const productNameDOM = document.querySelector('.product-name')
const investDOM = document.querySelectorAll('.invest')
const dailyDOM = document.querySelector('.daily')
const totalDOM = document.querySelector('.total')
const cycleDOM = document.querySelector('.cycle')
const footerBtnDOM = document.querySelector('.footer-main')


window.addEventListener('DOMContentLoaded', async () => {
    try {

        const response = await fetch(`/api/v1/product/${urlID}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })

        const data = await response.json()

        const product = data.product

        const { _id: id, investment, dailyDividend, totalDividend, cycle, image, name } = product

        console.log(investment)

        productNameDOM.textContent = name;
        investDOM.forEach((invest) => {
            invest.textContent = `${formatPrice(investment)}`
        })
        dailyDOM.textContent = dailyDividend
        totalDOM.textContent = totalDividend
        cycleDOM.textContent = cycle

        footerBtnDOM.innerHTML = `
        <a href="/buy?id=${id}" type="button" class="footer-btn btn">Buy now</a>
        `

        document.title = name

    }
    catch(error){
        console.log(error)
    }
})


const chevronDOM = document.querySelector('.chevron')

chevronDOM.addEventListener('click',() => {
    window.history.back()
})