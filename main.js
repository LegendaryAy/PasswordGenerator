//DOM
var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var uppercaseEl = document.getElementById('uppercase');
var lowercaseEl = document.getElementById('lowercase');
var numbersEl = document.getElementById('numbers');
var symbolsEl = document.getElementById('symbols');
var generateEl = document.getElementById('generate');
var clipboardEl = document.getElementById('clipboard');

var randomFunc={
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', ()=>{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked; 

    resultEl.innerText = generatePassword(hasLower, hasUpper,hasNumber, hasSymbol, length);
});

//Copy Password to Clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value= password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('copied to clipboard');
});


//Generate Password function
function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
 
    //console.log('typesCount: ', typesCount);
    const typesArr =[{lower},{upper},{number},{symbol}].filter(
        item => Object.values(item)[0]
    );

    //console.log('typesArr: ', typesArr);

    if(typesCount===0){
        return '';
    }

    for(let i=0; i < length; i +=typesCount){
        typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
      //  console.log('funcName: ' ,funcName);

        generatedPassword +=randomFunc[funcName]();
        });
    }
    const finalPassword = (generatedPassword.slice(0,length));

    return finalPassword;
}

//Functions

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    var symbols= '!@#$%^&*()_+[]{}|></,.+=';
    return symbols[Math.floor(Math.random()* symbols.length)];
}
