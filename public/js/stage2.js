var divs = document.getElementsByClassName("questions")[0].children;
var btn = document.getElementsByClassName("btn-next")[0];
var btnsbmt = document.getElementsByClassName("btn-sbmt")[0];
var errmsg = document.getElementsByClassName("err-msg")[0];

window.onload = onPageLoad;
btn.onclick = showNext;

function showNext() {
    var currentDiv = localStorage.getItem("currentDiv");

    if (currentDiv !== null) {
        currentDiv = parseInt(currentDiv);
    } else {
        currentDiv = 0;
    }

    var answerDivs = document.querySelectorAll(".answer");
    let isSelectAnswer = false;

    for (var i = 0; i < answerDivs.length; i++) {

        var answerRadio = answerDivs[i].querySelector("input[name='answerChar']:checked");

        if (answerRadio) {

            answerRadio.checked = false;

            isSelectAnswer = true;

            var aiWeight = answerRadio.getAttribute("ai");
            var swWeight = answerRadio.getAttribute("sw");


            var storedValueAi = localStorage.getItem("ai");
            var storedValueSw = localStorage.getItem("sw");

            if (storedValueAi || storedValueSw) {
                storedValueAi = parseInt(storedValueAi);
                storedValueSw = parseInt(storedValueSw);
                aiWeight = parseInt(aiWeight);
                swWeight = parseInt(swWeight);
                storedValueAi += aiWeight;
                storedValueSw += swWeight;

            } else {

                storedValueAi = aiWeight;
                storedValueSw = swWeight;
            }


            localStorage.setItem("ai", storedValueAi);
            localStorage.setItem("sw", storedValueSw);

            break;

        }
    }
    errmsg.style.display = "block";
    if (isSelectAnswer === false) {

        return false;
    }

    divs[currentDiv].classList.remove("d-flex");
    divs[currentDiv].classList.add("hide");
    errmsg.style.display = "none";

    if (currentDiv < divs.length - 1) {
        currentDiv++;
    } else {
        currentDiv = 0;
    }

    divs[currentDiv].classList.add("d-flex");
    divs[currentDiv].classList.remove("hide");

    localStorage.setItem("currentDiv", currentDiv);


    if (currentDiv === divs.length - 1) {
        btnsbmt.classList.remove("hide");
        btn.classList.add("hide");
    }
    return true;
}

function onPageLoad() {

    var currentDiv = localStorage.getItem("currentDiv");
    if (currentDiv !== null) {
        currentDiv = parseInt(currentDiv);
    }
    else {
        currentDiv = 0;
        localStorage.setItem("currentDiv", currentDiv)
    }

    divs[currentDiv].classList.remove("hide");
    divs[currentDiv].classList.add("d-flex");


    if (currentDiv == 0) {
        localStorage.setItem("ai", 0);
        localStorage.setItem("sw", 0);
    }


    if (currentDiv === divs.length - 1) {
        btnsbmt.classList.remove("hide");
        btn.classList.add("hide");
    }


}


btnsbmt.onclick = () => {

    if (showNext()) {
        const url = 'http://localhost:3000/stageTwo/questions';
        var storedValueAi = localStorage.getItem("ai");
        var storedValueSw = localStorage.getItem("sw");

        const data = { aiTotal: storedValueAi, swTotal: storedValueSw };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    window.location = "/stageSelect"
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });


        localStorage.setItem("ai", 0);
        localStorage.setItem("sw", 0);

        btnsbmt.classList.add("hide");
    }


}
