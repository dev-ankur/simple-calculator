
var btns = document.querySelectorAll(".btn");
var expr = document.getElementById('expr');
var output = document.getElementById('output');
var result = 0;
var resultStatus = 0;                               // indicator if a result is recently generated
var EXP_ERR = 'Malformed Expression';               // expression error message

expr.innerText = '';
output.innerText = 0;

btns.forEach((btn, i, kk)=>{

    btn.addEventListener('click', (e)=>{
        e.preventDefault();

        // console.log(e.target.innerText);

        operate(e.target.innerText);
    })
})


function operate(op){

    switch(op){
        case '(':
        case ')':
        case 'ans':
            if(resultStatus == 1){
                expr.innerText = '';
                resultStatus = 0;
            }
            manageExpr(op);
            break;
        case 'del':
            let len = expr.innerText.length;
            if(len == 0) return;
            if(expr.innerText[len-1] == ' '){
                expr.innerText = expr.innerText.substring(0,len-2);
            }else{
                expr.innerText = expr.innerText.substring(0,len-1);
            }
            break;
        case 'clear':
            resultStatus = 0;
            expr.innerText = '';
            output.innerText = 0;
            output.style.fontSize = '45px';
            break;
        case '%':
        case '√':
        case '×':
        case '÷':
        case '+':
        case '−':
            if(resultStatus == 1 && result != 0){
                expr.innerText = result + ' ' + op + ' ';
                resultStatus = 0;
            }else{
                manageExpr(op);
            }
            break;
        case '±':
            break;
        case 'ENTER':

            try{
                result = expToResult();
                output.innerText = result;
            }catch(e){
                // console.error(e.name);
                output.innerText = EXP_ERR;
            }
            let resultLength = output.innerText.length;
            if(resultLength > 11){
                output.style.fontSize = (45 - (resultLength - 11) * 3 ) + 'px';
            }else{
                output.style.fontSize = '45px';
            }
            resultStatus = 1;
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
            if(resultStatus == 1){
                expr.innerText = '';
                resultStatus = 0;
            }
            manageNumerals(op);
            break;
    }


}

function manageExpr(op){
    expr.innerText = expr.innerText + ' ' + op + ' ';
}

function manageNumerals(op){
    expr.innerText = expr.innerText + op;
}

function expToResult(){

    let expStr = expr.innerText
                .replaceAll('ans', result)
                .replaceAll('×', '*')
                .replaceAll('÷', '/')
                .replaceAll('−', '-')
                .replaceAll(' ', '');

    if(!expStr) {
        output.innerText = 0;
        return;
    }
    
    // setup * for 'eval'
    
    for(let i=1;i<expStr.length - 1;i++){
        if(expStr[i] == '('){
            if(/[0-9]/.test(expStr[i-1])){
                let sp = expStr.split('');
                sp.splice(i, 0, '*');
                expStr = sp.join('');
                i++;
            }
        }else if(expStr[i] == ')'){
            if(/[0-9]/.test(expStr[i+1])){
                console.log(expStr[i+1]);
                let sp = expStr.split('');
                sp.splice(i+1, 0, '*');
                expStr = sp.join('');
                i++;
            }
        }else if (expStr[i] == '√'){
            
            if(/[0-9]/.test(expStr[i-1])){
                let sp = expStr.split('');
                sp.splice(i, 0, '*');
                expStr = sp.join('');
                i++;
            }
        }


    }
    

    /* if(expStr.includes('√')){
        // do something...

        let count = 0;
        let pos = [];
        for(let i=0;i<expStr.length;i++){
            if(expStr[i] == '√') {
                pos[count] = i;
                count++;
            }
        }

        console.log(count, pos);

        for(let i=0;i<pos.length;i++){

            if(expStr[pos[i]+1] == '('){
                // find position of closed brackets and evaluate
                
                expStr = evalRoot(expStr, pos);
            }else if(parseInt(expStr[pos[i]+1]) != 'NaN'){
                console.log('this is good')
                let num = '';
                let j = pos[i]+1;
                let startNum = j-1;
                while(/[0-9]/.test(expStr[j]) && (j<expStr.length)){
                    // console.log('isit', expStr[j], parseInt(expStr[j]) == 'NaN', parseInt(expStr[j]));
                    num += expStr[j++];
                }
                console.log('num', num);
                let sqResult = Math.sqrt(parseInt(num));
                let str = expStr.split('');
                str.splice(startNum, j-startNum, sqResult.toString());
                expStr = str.join('');
                console.log('in', expStr, num);
            }else{
                // error

            }

        }

    } */

    while(expStr.includes('√')){
        let pos = expStr.lastIndexOf('√');
        if(/[0-9]/.test(expStr[pos+1])){
            let j = pos+1;
            let num = expStr[j];
            while(/[0-9]/.test(expStr[++j])) num += expStr[j];
            let st = expStr.split('');
            st.splice(pos, j-pos, Math.sqrt(parseInt(num)));
            expStr = st.join('');
        }

        else if(expStr[pos+1] == '('){
            let count = 1;
            let j = pos+2;
            while(count != 0 && j<expStr.length){
                if(expStr[j] == '(') count++
                else if(expStr[j] == ')') count--
                
                j++;
            }
            
            let st = expStr.split('');
            st.splice(pos, j-pos, Math.sqrt(eval(expStr.substring(pos+1, j))));
            expStr = st.join('');
        }

    }

    // console.log(expStr)


    return eval(expStr);
}


/* function evalRoot(ep, p){

    let count = 0;                  // sqrt count
    // let p = [];
    // for(let i=0;i<ep.length;i++){
    //     if(ep[i] == '√') {
    //         p[count] = i;
    //         count++;
    //     }
    // }
    
    for (let i = 0; i < p.length; i++) {
        const index = p[i];         // position
        let j = index+1;
        count = 1;                  // closing bracket remaining to find
        let innerRoots = [];        // inner root positions
        while(j < ep.length){
            if(count == 0) break;

            if(ep[j] == '('){
                count++
            }else if(ep[j] == ')'){
                count--
            }
            j++

            // remove inner root position from main array, if found

            if(ep[j] == '√'){
                p.splice(p.indexOf(ep[j]), 1);
                innerRoots.push(j);
            }
        }

        // check if inner Root is there
        if(innerRoots.length){
            ep = evalRoot(ep.substring(index+1,j), innerRoots);
        }else{
            ep.splice(index, j-index+1, Math.sqrt(eval(ep.substring(index+1,j))));
            console.log(ep);
        }
    }

    return ep;
} */