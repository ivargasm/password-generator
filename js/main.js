const form = document.forms['pass']
const sendPass = document.querySelector('#send_pass')
const range = document.querySelector('#length')
const value = document.querySelector('.value')
const result = document.querySelector('#result')
const strong_1 = document.querySelector('#uno')
const strong_2 = document.querySelector('#dos')
const strong_3 = document.querySelector('#tres')
const strong_4 = document.querySelector('#cuatro')
const copy = document.querySelector('#copy')

const numbers = [1,2,3,4,5,6,7,8,9,0]
const specialCharacters = ['@','#','¡','&','$','>','<','%','!',')','(','*','+','/','[',']','{','}','|']
const characters = Array.from(Array(26)).map((_,i) => i+97)
const lowerCase = characters.map(code => String.fromCharCode(code))
const upperCase = lowerCase.map(letter => letter.toUpperCase())

const getPassword = (large, hasNumbers, hasSpecialCharacters, hasLowerCase, hasUpperCase) => {
    const characters = [
        ...(hasNumbers ? numbers : []),
        ...(hasSpecialCharacters ? specialCharacters : []),
        ...(hasLowerCase ? lowerCase : []),
        ...(hasUpperCase ? upperCase : [])
    ]

    let password = ''

    if(characters.length === 0) return ''

    for(let i = 0; i < large; i++){
        const index = Math.floor(Math.random()*characters.length)
        password += characters[index]
    }
    return password
}

const password = e =>{
    e.preventDefault()

    const textLength = form.range.value
    const ucase = form.ucase.checked
    const lcase = form.lcase.checked
    const numbers = form.numbers.checked
    const symbols = form.symbols.checked

    let password = getPassword(textLength, numbers, symbols, lcase, ucase)

    result.value = password
    result.classList.add('color-text')

    let ucaseint = (ucase)?1:0
    let lcaseint = (lcase)?1:0
    let numbersint = (numbers)?1:0
    let symbolsint = (symbols)?1:0

    let strong = ucaseint + lcaseint + numbersint + symbolsint

    if(strong === 1){
        strong_1.classList.add('strong')
    }else if(strong === 2){
        strong_1.classList.add('strong')
        strong_2.classList.add('strong')
    }else if(strong === 3){
        strong_1.classList.add('strong')
        strong_2.classList.add('strong')
        strong_3.classList.add('strong')
    }else if(strong === 4){
        strong_1.classList.add('strong')
        strong_2.classList.add('strong')
        strong_3.classList.add('strong')
        strong_4.classList.add('strong')
    }

}

const handleInputChange = e => {
    let target = e.target

    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

range.addEventListener('input', e => {
    value.innerHTML = e.target.value

    handleInputChange(e)
})

const copyClipBoard = (e) => {
    result.select()
    result.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(result.value)

    copy.attributes['data-tooltip'].value = 'copied'

    setTimeout(()=>{
        copy.attributes['data-tooltip'].value = 'copy'
    },2000)
}

copy.addEventListener('click', copyClipBoard)

sendPass.addEventListener('click',password)




