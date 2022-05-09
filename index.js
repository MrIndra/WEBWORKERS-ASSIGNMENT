let worker;
const btn = document.getElementById("btn");
const textArea = document.getElementById("text");
const api = document.getElementById("api");
const reset = document.getElementById("reset");
let wordCount = document.getElementById("wordCount");
let charCount = document.getElementById("charCount");

document.addEventListener("DOMContentLoaded", init);

function init(){
    worker = new Worker('./worker.js');
    worker.addEventListener("message", workerMessages);
    worker.addEventListener("error", workerError);
    worker.postMessage({'name': 'getting started', 'msg': ''});
}

btn.addEventListener("click", function(){
    const random = Math.random();
    document.body.style.backgroundColor = `#${random.toString().substring(2,5)}0a3`;
})

reset.addEventListener("click", function(){
    textArea.value = '';
    wordCount.innerText = 0;
    charCount.innerText = 0;
    document.body.style.backgroundColor = '#fff';
})

api.addEventListener("click", function(){
    worker.postMessage({'name': 'fillTextAreaWithApi', 'payload': text.value});  
})

"keyup".split(" ").forEach(ele => {
    textArea.addEventListener(ele, function(){
    worker.postMessage({'name': 'textArea', 'payload': text.value})
})});

function workerMessages(event){   
    const data = event.data;
    switch(data.name){
        case 'getting started':
            // alert("Welcome to the world of Web Worker..!!")
            break;
        case 'textArea':
            wordCount.innerText = data.count.wordCount;
            charCount.innerText = data.count.charCount;
            break;
        case 'fillTextAreaWithApi':
            textArea.value += data.payload;
            wordCount.innerText = data.count.wordCount;
            charCount.innerText = data.count.charCount;
            break;
        default:
            console.log("Nothing is going on..")
    }
}

function workerError(er){
    console.log(er.message);
}

