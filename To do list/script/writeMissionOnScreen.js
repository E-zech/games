let editing = false;
let originalTextBoxListener;

function removeElem(divElement) {
    divElement.classList.add("fade");
    setTimeout(() => {
        document.getElementById('containerMissions').removeChild(divElement);
        counter--;
        fixCounter();
    }, 400);
} // remove the divElement(specifiec mission) from the screen ;

function editElement(span) {
    if (!editing) {
        const textBox = document.getElementById('txtMission');
        textBox.value = span.textContent;
        editing = true;


        if (!originalTextBoxListener) {
            originalTextBoxListener = textBox.onkeydown;
        }

        textBox.onkeydown = function (e) {
            if (e.keyCode === 13) {
                span.textContent = textBox.value;
                textBox.value = '';
                editing = false;
                textBox.onkeydown = originalTextBoxListener;
            }
        };
    }
} // edit the specifiec mission , the edit happens inside the input of the To do list.

function writeMissionOnScreen(eventDataFromBrowser, mission) {
    const textBox = document.getElementById('txtMission');


    if (eventDataFromBrowser.keyCode == '13') {
        const divElement = document.createElement('div');
        const divBtns = document.createElement('div');
        divBtns.classList.add("divBtns");


        let span = document.createElement('span');// create a span for a counter .
        span.textContent = `${counter++}`;
        span.classList.add('spancounter')
        divElement.appendChild(span);


        span = document.createElement('span');// create a span for the mission text.
        span.textContent = `${textBox.value}`;
        if (mission) {
            span.textContent = mission;
        }
        divElement.appendChild(span);


        let button = document.createElement('button');// create a delete button.
        button.classList.add('dlt-btn');
        button.title = 'Delete';
        button.style.cursor = 'pointer';
        button.textContent = '❌';

        button.onclick = () => {
            removeElem(divElement);
        }; // when the users clicks on delete button it calls the removeElem() function.

        divBtns.appendChild(button);

        button = document.createElement('button');// create an edit button.
        button.classList.add('edit-btn');
        button.title = 'Edit';
        button.style.cursor = 'pointer';
        button.textContent = '🧹';
        button.onclick = () => {
            setFocusOnTxtMission()
            editElement(span);
        }; // when the users clicks on edit button it calls the editElement() function.

        divBtns.appendChild(button);

        divElement.appendChild(divBtns);

        document.getElementById('containerMissions').appendChild(divElement);

        textBox.value = '';

    }
} // incharge on creating the To do list divs.

function setFocusOnTxtMission() {
    const txtMission = document.getElementById("txtMission");
    txtMission.focus();
}// bringing back the focus to the input.

function fixCounter() {
    const arrayOfSpans = document.getElementsByClassName('spancounter');
    for (let i = 0; i < arrayOfSpans.length; i++) {
        arrayOfSpans[i].textContent = i + 1 + " ";
    }
}// keeping the counter updated.

function resetAllMissions() {
    document.getElementById("containerMissions").innerHTML = '';
    counter = 1;
}// clearing temporary the To do list divs.


function deleteLocalStorage() {
    document.getElementById("containerMissions").innerHTML = '';
    counter = 1;
    localStorage.clear();
}// clearing permanently the To do list divs.






