let inputs = document.querySelectorAll('.valid')
const form = document.querySelector('form')
const complete = document.querySelector('.complete-div')
const spinner = document.querySelector('.spinner')
const cardPrimary = document.querySelector('.card-primary').children[0].children
const cardSecondary = document.querySelector('.card-secondary').children


cardNumber = cardPrimary[1]
cardHolderName = cardPrimary[2]
cardExpire = cardPrimary[3]
cardCvc = cardSecondary[0]


form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    form.style.display = 'none'
    spinner.style.display = 'block'

    const awaitTimeOut = (delay)=>{
        return new Promise(resolve => setTimeout(resolve , delay))
    }

    awaitTimeOut(200).then(()=>{
        spinner.style.display = 'none'
        complete.style.display = 'flex'
    })
    
})

/* custom invalid message */
document.addEventListener('invalid' , (function(){
    return function(e){
        e.preventDefault()
        validate(e)
    }
})(),true)




/* Live form validation */
inputs.forEach((input)=>{
    input.addEventListener('focusout' , validate)
    
})




function validate(e){
    if (e.target.type == 'number'){
        validateExpireCvc(e)   
    }

    if(e.target.id == 'card-num'){
        validateCardNum(e)
    }

    if (e.target.name == 'cardholder-name'){
        validateName(e)
        
    }
}



function validateExpireCvc(e){
    if (!e.target.checkValidity() && e.target.value != ''){
        e.target.classList.add('error')
        if (e.target.id == 'month') {
            e.target.parentNode.setAttribute('data-set' , 'please enter a valid month')
        }
        else if (e.target.id == 'year'){
            e.target.parentNode.setAttribute('data-set' , 'please enter a valid year')
        }
        else{
            e.target.parentNode.setAttribute('data-set' , 'please enter a valid cvc')
        }
    }
    else if (e.target.value == '') {
        e.target.classList.add('error')
        e.target.parentNode.setAttribute('data-set' , "can't be blank")
    }
    else{
        e.target.classList.remove('error')
        e.target.parentNode.setAttribute('data-set' , '') 
        cardExpire.textContent =  inputs[2].value + '/' + inputs[3].value
    } 
    if (e.target.id == 'cvc') {
        cardCvc.textContent = inputs[4].value
    }
}

function validateCardNum(e){
    if (isNaN(e.target.value)){
        e.target.classList.add('error')
        e.target.parentNode.setAttribute('data-set' , 'wrong input numbers only')
        e.target.setCustomValidity('invalid')
    }
    else if(e.target.value.length < 16 && e.target.value != ''){
        e.target.classList.add('error')
        e.target.parentNode.setAttribute('data-set' , 'card number should have 16 digits')

    }
    else if (e.target.value == '') {
        e.target.classList.add('error')
        e.target.parentNode.setAttribute('data-set' , "can't be blank")
    }
    else{
        e.target.classList.remove('error')
        e.target.parentNode.setAttribute('data-set' , '') 
        cardNumber.textContent = inputs[1].value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    } 
}

function validateName(e){
    if (!isNaN(e.target.value) && !e.target.value == ''){
        e.target.classList.add('error')
        e.target.parentNode.setAttribute('data-set' ,   "Name can't contain numbers")
    }
    else if (e.target.value == ''){
        e.target.classList.add('error')
        e.target.parentNode.setAttribute('data-set' ,   "can't be blank")
    }
    else{
        e.target.classList.remove('error')
        e.target.parentNode.setAttribute('data-set' ,   "")
        cardHolderName.textContent = inputs[0].value
    }
}