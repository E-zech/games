function saveInLocalStorage() {
    const containerMissions = document.getElementById('containerMissions');
    const missions = [];

    for (const divElement of containerMissions.children) {

        const mission = {
            counter: divElement.querySelector('.spancounter').textContent,
            text: divElement.querySelector('span:not(.spancounter)').textContent
        }; // create an object for each divElement that includes the span counter + span with mission text.
        missions.push(mission);// add the object to the missions array.
    }

    localStorage.setItem('allmissions', JSON.stringify(missions)); // save missions array in local Storage.
}

