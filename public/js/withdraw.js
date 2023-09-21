// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});



const chevronDOM = document.querySelector('.chevron')

chevronDOM.addEventListener('click',() => {
    window.history.back()
})

const alertDOM = document.querySelector('.alert')
const withdrawBtn = document.querySelector('#withdraw-btn')
const realNameInput = document.querySelector('#realname')
const bankAccountInput = document.querySelector('#bank-account')
const bankCodeInput = document.querySelector('#bank-code')
const bankCodeBtn = document.querySelector('.bank-code')
const timesBtn = document.querySelector('.times')
const bankListDOM = document.querySelector('.bank-list')
const listBtn = document.querySelectorAll('li')


listBtn.forEach((list) => {
  list.addEventListener('click', (e) => {
    const listContent = list.textContent;
    console.log(listContent)
    bankCodeInput.value = listContent
    bankListDOM.style.display = 'none';
  })
})

timesBtn.addEventListener('click',() => {
  bankListDOM.style.display = 'none';
})
bankCodeBtn.addEventListener('click',() => {
  bankListDOM.style.display = 'block';
})


withdrawBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const realName = realNameInput.value
  const bankCode = bankCodeInput.value
  const bankAccount = bankAccountInput.value

  try{
    withdrawBtn.innerHTML = `<div class="loading"></div>`
    const response = await fetch('/api/v1/bankInfo',{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({realName, bankCode, bankAccount})
    })
    const data = await response.json()
    const bankInfo = data.bankInfo
    if(response.status === 201){
      realNameInput.value = '';
      bankCodeInput.value = '';
      bankAccountInput.value = '';
      alertDOM.classList.add('show')
            alertDOM.textContent = `Bank Details Successfully Saved`
            setInterval(() => {
              alertDOM.classList.remove('show')
            },5000)
      withdrawBtn.textContent = 'Saved'
    }
    else {
      console.log(data.msg)
      alertDOM.classList.add('show')
            alertDOM.textContent = data.msg
            setInterval(() => {
              alertDOM.classList.remove('show')
            },5000)
      withdrawBtn.textContent = 'Save'
    }
  }
  catch(error){
    console.log(error)
  }
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
      realNameInput.value = bankInfo[length].realName
      bankCodeInput.value = bankInfo[length].bankCode
      bankAccountInput.value = bankInfo[length].bankAccount
     
         
    }
    else {
      console.log(data.msg)
    }
  }
  catch(error){
    console.log(error)
  }
})