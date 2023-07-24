
var btns = document.querySelectorAll(".btn");

btns.forEach((btn, i, kk)=>{
    console.log(btn.innerText);

    btn.addEventListener('click', (e)=>{
        e.preventDefault();

        // console.log(e.target.innerText);

        operate(e.target.innerText);
    })
})


function operate(op){

    switch(op){
        case '(':

            break;
        case ')':

            break;
        case 'ans':

            break;
        case 'del':

            break;
        case 'clear':

            break;
        case '%':
            break;
        case '√':
            break;
        case '×':
            break;
        case '÷':
            break;
        case '+':
            break;
        case '−':
            break;
        case '±':
            break;
        case 'ENTER':
            break;
        
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            
            break;
    }


}