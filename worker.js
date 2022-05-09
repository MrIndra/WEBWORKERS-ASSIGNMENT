self.onmessage = function(event) {
    var data = event.data;
    switch(data.name){
        case "getting started":
            postMessage({'name': 'getting started', 'payload':'Web Worker is getting started..'});
            break;
        case "textArea":
            postMessage({'name': 'textArea', 'count':analyze(event.data.payload)});
            break;
        case "fillTextAreaWithApi":
            apiCall(event.data.payload);
            break;
        default:
            postMessage({"name" : "closing"});
            close();
    }
}

function apiCall(prevStr){
        let str;
        function userDetailsPromise(){
            fetch("https://run.mocky.io/v3/a583d878-294c-44c4-8cf6-4c7d0dd0a671")
            .then(data => {
                return data.json();
            })
            .then(response => {
                str = JSON.stringify(response);
                prevStr += str;
                postMessage({'name': 'fillTextAreaWithApi', 'payload':prevStr, 'count': analyze(prevStr)});
            })
            .catch(err => console.log(err));
        }

        async function asyncFunction(){
            try{
                await userDetailsPromise();
            }
            catch(err){
                console.log(err)
            }
        }
        asyncFunction();
}

function analyze(str) {
    return {
        wordCount: countWords(str),
        charCount: countChars(str)
    }
  }

  function countWords(str) {
    str = str.trim();
    return str === ""? 0 : str.split(/\s+/).length;
  }
  
  function countChars(str) {
    return str.length;
  }
  
  