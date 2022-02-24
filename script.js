var container = document.getElementById("container");

function init() {

    var problem = document.createElement("h1");
    problem.innerHTML = "Let's Code"

    var satrtDiv = document.createElement("div");
    satrtDiv.id = "startDiv";

    var heading = document.createElement("h3");
    heading.id = "heading"
    heading.innerHTML = "Type Your Code";
    satrtDiv.appendChild(heading);

    var selectLang = document.createElement("select");
    selectLang.id = "dropdown";

   
    var python = document.createElement("option");
    python.value = "0";
    python.innerHTML = "Python";
    var JavaScript = document.createElement("option");
    JavaScript.value = "4";
    JavaScript.innerHTML = "JavaScript";
    var c = document.createElement("option");
    c.value = "7";
    c.innerHTML = "C";
    var cpp = document.createElement("option");
    cpp.value = "77"
    cpp.innerHTML = "C++";
    var java = document.createElement("option");
    java.value = "8"
    java.innerHTML = "Java";
    
    selectLang.appendChild(python);
    selectLang.appendChild(JavaScript);
    selectLang.appendChild(c);
    selectLang.appendChild(cpp);
    selectLang.appendChild(java);
    satrtDiv.appendChild(selectLang);

    var textEditor = document.createElement("textarea");
    textEditor.id = "textEditor";
    textEditor.placeholder = "Enter your code here";
    
    var outputScreen = document.createElement("div");
    outputScreen.id = "outputScreen";
    outputScreen.innerHTML = "Output: ";


    var compileButton = document.createElement("button");
    compileButton.id = "cbutton";
    compileButton.innerHTML = "Compile";

    compileButton.addEventListener("click", function(event){
        var request = new XMLHttpRequest();
        var langId = selectLang.options[selectLang.selectedIndex].value;
        request.open("POST", "https://codequotient.com/api/executeCode");
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("code="+textEditor.value+"&langId="+langId);

        request.addEventListener("load", function(){
            codeId = JSON.parse(this.responseText).codeId;
            setTimeout(function(){
                getOutput(codeId);
            }, 3000)
        }); 
    });
    
    container.appendChild(problem);
    container.appendChild(satrtDiv);
    container.appendChild(textEditor);
    container.appendChild(outputScreen);
    container.appendChild(compileButton);
}

function getOutput(codeId){
    var outputConsole = document.getElementById("outputScreen");

    var request = new XMLHttpRequest();

    request.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);

    request.send()

    request.addEventListener("load", function(event){
        var output = JSON.parse(event.target.responseText);
        var data = JSON.parse(output.data);
        if(data.output !== "")
            outputConsole.innerHTML = data.output;
        else
            outputConsole.innerHTML = data.errors;
    });
}
init();