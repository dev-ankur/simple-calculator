
var btns = document.querySelectorAll(".btn");
var expr = document.getElementById('expr');
var output = document.getElementById('output');

// default
expr.innerText = '';
output.innerText = 0;


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
            manageExpr(op);
            break;
        case ')':
            manageExpr(op);
            break;
        case 'ans':
            realExpr = output.innerText;
            expr.innerText = realExpr;
            break;
        case 'del':
            let len = expr.innerText.length;
            if(len == 0) return;
            expr.innerText = expr.innerText.substring(0,len-1);
            break;
        case 'clear':
            expr.innerText = '';
            output.innerText = 0;
            output.style.fontSize = '45px';
            break;
        case '%':
            manageExpr(op);
            break;
        case '√':
            manageExpr(op);
            break;
        case '×':
            manageExpr(op);
            break;
        case '÷':
            manageExpr(op);
            break;
        case '+':
            manageExpr(op);
            break;
        case '−':
            manageExpr(op);
            break;
        case '±':
            break;
        case 'ENTER':
            let expStr = expr.innerText
                .replaceAll('×', '*')
                .replaceAll('÷', '/')
                .replaceAll('−', '-');
            let result = eval(expStr);
            if(isNaN(result)){
                output.innerText = 'Invalid Expression';
            }else{
                output.innerText = result;
                let len = output.innerText.length;
                if(len > 11){
                    output.style.fontSize = (45 - (len - 11) * 3 ) + 'px';
                }else{
                    output.style.fontSize = '45px';
                }
            }
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
            manageExpr(op);
            break;
    }


}

function manageExpr(op){
    expr.innerText = expr.innerText + op;
}