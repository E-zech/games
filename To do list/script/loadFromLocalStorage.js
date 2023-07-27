loadFromLocalStorage();

function loadFromLocalStorage() {
    let upLoadMissions = localStorage.getItem('allmissions');
    upLoadMissions = JSON.parse(upLoadMissions);
    if (upLoadMissions == null) {
        return;
    } else {
        for (let mission of upLoadMissions) {
            writeMissionOnScreen({ keyCode: '13' }, mission.text);
            console.clear();
        }
    }
}


