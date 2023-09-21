const phoneInput = document.querySelector('#phone')
const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirmPassword')
const signupBtn = document.querySelector('#signup')
const referInput = document.querySelector('#referID')
const num = document.querySelectorAll('#num')
const alertDOM = document.querySelector('.alert')
const captchaInput = document.querySelector('#captcha')

const captchaFunction = () => {
    num.forEach((cap) => {
        cap.textContent = Math.ceil(Math.random() * 9)
        
     })
}


window.addEventListener('DOMContentLoaded', () => {
    captchaFunction()
})

signupBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const phone = phoneInput.value
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value
    const referID = referInput.value
    const captcha = captchaInput.value

    const captchaVar = captchaFunction()
    if(captcha !== captchaVar){
        alertDOM.textContent = 'Wrong Captcha Provided please try again'
        alertDOM.style.textAlign = 'center'
        alertDOM.style.width = '100%'
        setInterval(() => {
            alertDOM.style.display = 'none'
        },2000)
    }

    try{
        signupBtn.innerHTML = `<div class="loading"></div>`
        const response = await fetch(`/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ phone, password, referID })
        })

        const data = await response.json()

        if(captcha === ''){
            alertDOM.textContent = 'Captcha should not be empty'
            alertDOM.style.textAlign = 'center'
            alertDOM.style.width = '100%'
            setInterval(() => {
                alertDOM.style.display = 'none'
            },2000)
        }

        if(password !== confirmPassword){
            alertDOM.textContent = 'Passord did not match'
            alertDOM.style.textAlign = 'center'
            alertDOM.style.width = '100%'
            setInterval(() => {
                alertDOM.style.display = 'none'
            },2000)
        }

        if(response.status === 201){
            phoneInput.value = '';
            passwordInput.value = '';
            referInput.value = '';
            captchaInput.value = '';

            alertDOM.style.textAlign = 'center'
            alertDOM.style.width = '100%'
            alertDOM.textContent = 'Registration Successful';
            setInterval(() => {
                alertDOM.style.display = 'none'
            },2000)
            signupBtn.textContent = 'Registration Successful'
            window.location = '/dashboard'
        } else {
            console.log(data.msg)
            alertDOM.style.textAlign = 'center'
            alertDOM.style.width = '100%'
            alertDOM.textContent = data.msg
            setInterval(() => {
                alertDOM.style.display = 'none'
            },2000)
            signupBtn.textContent = 'sign up'

        }

    } 
    catch (error){
        console.log(error)
    }
})

