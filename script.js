const main = document.getElementById('main')
const AddUserBtn = document.getElementById('user')
const DoubleMoneyBtn = document.getElementById('double-money')
const MillionairesBtn = document.getElementById('millionaires')
const RichBtn = document.getElementById('rich')
const EntireWealthBtn = document.getElementById('total')


let data=[]

// getRandomUsers()
// getRandomUsers()
// getRandomUsers()

async function getRandomUsers(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = data.results[0]
    // console.log(data.results[0])

    let NewUser={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }

    addData(NewUser)
}


function addData(obj){
    data.push(obj)
    updateDOM()
}

function updateDOM(provideData = data){
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`

    provideData.forEach(item=>{
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML =`<strong>${item.name}</strong> ${moneyFormat(item.money)}`
        main.appendChild(element)
    })
}

function moneyFormat(number){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data = data.map(user=> ({...user, money: user.money*2}))
    updateDOM()
}

function richPerson(){
     data.sort((a,b) => b.money - a.money)
     updateDOM()
}

function showMillionaires(){
   data = data.filter(user => user.money > 1000000)
   updateDOM()
}

function calculateWealth(){
    const wealth = data.reduce((acc,user)=> (acc+=user.money),0)

    const wealthElm = document.createElement('div')
    wealthElm.innerHTML = `<h3>Total Wealth <strong>${moneyFormat(wealth)}</strong></h3>`
    main.appendChild(wealthElm)
}

AddUserBtn.addEventListener('click',getRandomUsers)
DoubleMoneyBtn.addEventListener('click',doubleMoney)
RichBtn.addEventListener('click',richPerson)
MillionairesBtn.addEventListener('click',showMillionaires)
EntireWealthBtn.addEventListener('click',calculateWealth)