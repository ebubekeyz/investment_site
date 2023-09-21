// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});

const formatPrice = (investment) => {
    const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format((investment).toFixed(2))
    return formattedPrice
  }

const chevronDOM = document.querySelector('.chevron')
const accountInput= document.querySelector('#realname')


chevronDOM.addEventListener('click',() => {
    window.history.back()
})



const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');


window.addEventListener('DOMContentLoaded', async () => {

  try{
   
    const response = await fetch(`/api/v1/bankInfo/${urlID}/bankInfo`,{
      method: 'GET',
      headers: {
        "Content-Type": 'application/json'
      },
     
    })
    const data = await response.json()
    
    const bankInfo = data.bankInfo
    
    const length = bankInfo.length - 1
    
    if(response.status === 200){
     
        accountInput.value = bankInfo[length].bankAccount
     
         
    }
    else {
      console.log(data.msg)
    }
  }
  catch(error){
    console.log(error)
  }
})


