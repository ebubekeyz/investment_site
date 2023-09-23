// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});



const chevronDOM = document.querySelector('.chevron')

chevronDOM.addEventListener('click',() => {
    window.history.back()
})


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