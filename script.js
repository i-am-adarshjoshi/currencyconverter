const currencyEl_one = document.getElementById('cur1');
const currencyEl_two = document.getElementById('cur2');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');


const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch currency rates and update hte dom
function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/8f3654d6a7915c707fac88c5/latest/${currency_one}`)
    .then(res=> res.json())
    .then((data => {
        // console.log(data);
        const rate = data.conversion_rates[currency_two];
        rateEl.innerText= `1 ${currency_one} = ${rate} ${currency_two}`

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    }))

}

currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();

