let labID = null;
let labByID = ``;
let labLocation = ``;
let labByLocation = ``;
const labsContainer = document.getElementById('labs-container');
const chemForLabContainer = document.getElementById('chem-container');
const equipmentForLabContainer = document.getElementById('equipment-container');

//get all labs when the button is pressed
document.getElementById('allLabsButton').onclick =
    function (){

    chemForLabContainer.innerHTML = '';
    equipmentForLabContainer.innerHTML = '';

    getAllLabs();

}

//get labs with the specific location when the button is pressed
document.getElementById('locationButton').onclick =
    function (){

    labLocation = document.getElementById('locationText').value;
    console.log('Location: ', labLocation);

    if(labLocation == null){
        console.log('There is nothing inside!');
    }else{
        labByLocation = `http://localhost:8080/labs?location=${labLocation}`;
        getLabsByLocation();
    }

    console.log(labByLocation);
}

//get one lab with a specific id when the button is pressed
document.getElementById('idButton').onclick =
    function (){

    labID = document.getElementById('idText').value;

    if(isNaN(labID) ){
        console.log("That's not an ID!");
    }else {
        labByID = `http://localhost:8080/labs/${labID}`;
         getOneLabByID();
         getChemicalsForLab();
         getEquipmentForLab();
    }
}

//delete a lab with a specific id when the button is pressed
document.getElementById('deleteButton').onclick =
    async function (){
        await deleteOneLab();
        await getAllLabs();
}

//post new lab when the button is pressed
document
    .getElementById('post-lab')
    .addEventListener('submit', function (event){
        event.preventDefault();

        let postLab = {};

        const inputs = document.querySelectorAll('#post-lab input[type=text]');

        for(const input of inputs){
            postLab[input.name] = input.value;
        }

        console.log(postLab);

        postNewLab(postLab);
        event.target.reset();
    });

//post new chemical to the lab with a specific id when the button is pressed
document
    .getElementById('post-lab-chem')
    .addEventListener('submit', function (event){
        event.preventDefault();

        let postChem = {};

        const inputs = document.querySelectorAll('#post-lab-chem input[type=text]');

        for(const input of inputs){
            postChem[input.name] = input.value;
        }

        postNewChem(postChem);
        event.target.reset();
    })

//post new equipment to the lab with a specific id when the button is pressed
document
    .getElementById('post-lab-equip')
    .addEventListener('submit', function (event){
        event.preventDefault();

        let postEquip = {};

        const inputs = document.querySelectorAll('#post-lab-equip input[type=text]');

        for(const input of inputs){
            postEquip[input.name] = input.value;
        }

        postNewEquip(postEquip);
        event.target.reset();
    })

//update a lab with the specific id when the button is pressed
document
    .getElementById('put-lab')
    .addEventListener('submit', function (event){
        event.preventDefault()

        let putLab = {};

        const inputs = document.querySelectorAll('#put-lab input[type=text]');

        for(const input of inputs){
            putLab[input.name] = input.value;
        }

        putNewLab(putLab);
        event.target.reset();
    })

//delete lab method
async function deleteOneLab(){

    try {
        const response = fetch(labByID,{
            method: 'DELETE'
        });
        chemForLabContainer.innerHTML = '';
        equipmentForLabContainer.innerHTML='';
        getAllLabs();
    }catch (e){
        console.error(e);
        alert('Something went wrong with the DELETE request for the lab');
    }

}

//find a lab with a specific id
async function getOneLabByID() {

    const response = await fetch(labByID);
    const respJson = await response.json();

    labsContainer.innerHTML = '';

    const tr = document.createElement('tr');

    const tdID = document.createElement('td');
    const tdName = document.createElement('td');
    const tdLocation = document.createElement('td');

    tdID.innerText = respJson.id;
    tdName.innerText = respJson.labName;
    tdLocation.innerText = respJson.labLocation;

    tr.append(tdID, tdName, tdLocation);
    labsContainer.append(tr);

}

//get all the labs
async function getAllLabs() {

    const response = await fetch('http://localhost:8080/labs');
    const respJson = await response.json();

    labsContainer.innerHTML = '';

    for(const item of respJson) {
        const tr = document.createElement('tr');

        const tdID = document.createElement('td');
        const tdName = document.createElement('td');
        const tdLocation = document.createElement('td');

        tdID.innerText = item.id;
        tdName.innerText = item.labName;
        tdLocation.innerText = item.labLocation;

        tr.append(tdID, tdName, tdLocation);
        labsContainer.append(tr);
    }
}

//when the page is just opened, all the labs are displayed
getAllLabs();

//find all labs with a specific location
async function getLabsByLocation() {

    const response = await fetch(labByLocation);
    const respJson = await response.json();

    labsContainer.innerHTML = '';
    chemForLabContainer.innerHTML = '';
    equipmentForLabContainer.innerHTML = '';

    for(const item of respJson) {
        const tr = document.createElement('tr');

        const tdID = document.createElement('td');
        const tdName = document.createElement('td');
        const tdLocation = document.createElement('td');

        tdID.innerText = item.id;
        tdName.innerText = item.labName;
        tdLocation.innerText = item.labLocation;

        tr.append(tdID, tdName, tdLocation);
        labsContainer.append(tr);
    }
}

//find all chemicals for a lab with a specific id
async function getChemicalsForLab() {

    const response = await fetch(labByID+'/chemicals');
    const respJson = await response.json();

    chemForLabContainer.innerHTML = '';

    for(const item of respJson){
        const tr = document.createElement('tr');

        const tdID = document.createElement('td');
        const tdName = document.createElement('td');
        const tdFormula = document.createElement('td');
        const tdType = document.createElement('td');
        const tdQuantity = document.createElement('td');

        tdID.innerText = item.id;
        tdName.innerText = item.chemicalName;
        tdFormula.innerText = item.chemicalFormula;
        tdType.innerText = item.chemicalType;
        tdQuantity.innerText = item.chemicalQuantity;

        tr.append(tdID, tdName, tdFormula, tdType, tdQuantity);
        chemForLabContainer.append(tr);
    }
}

//find all equipment for a lab with a specific id
async function getEquipmentForLab() {

    const response = await fetch(labByID+'/equipment');
    const respJson = await response.json();

    equipmentForLabContainer.innerHTML = '';

    for(const item of respJson){
        const tr = document.createElement('tr');

        const tdID = document.createElement('td');
        const tdName = document.createElement('td');
        const tdQuantity = document.createElement('td');

        tdID.innerText = item.id;
        tdName.innerText = item.equipmentName;
        tdQuantity.innerText = item.equipmentQuantity;

        tr.append(tdID, tdName, tdQuantity);
        equipmentForLabContainer.append(tr);
    }
}

//post new lab with the data from the form
async function postNewLab(postLab){
    console.log(postLab);
    try {

        const response = await fetch('http://localhost:8080/labs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postLab)
        });

        await response.json();
        getAllLabs();

    }catch (e){
        console.error(e);
        alert('Something went wrong with the POST request for the chemical');
    }
}

//post new chemical with the data from the form
async function postNewChem(postChem){
    try {

        const response = await fetch(labByID+'/chemicals',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postChem)
        });

        await response.json();

        getOneLabByID();
        getChemicalsForLab();
        getEquipmentForLab();

    }catch (e){
        console.error(e);
        alert('Something went wrong with the POST request for the chemical');
    }
}

//post new equipment with the data from the form
async function postNewEquip(postEquip){
    try {

        const response = await fetch(labByID+'/equipment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postEquip)
        });

        await response.json();
        getOneLabByID();
        getChemicalsForLab();
        getEquipmentForLab();
    }catch (e){
        console.error(e);
        alert('Something went wrong with the POST request for the equipment');
    }
}

//update a lab with the specific id
async function putNewLab(putLab){

    console.log(labByID);

    try {

        const response = await fetch(labByID,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putLab)
        });

        await response.json();

        getOneLabByID();
        getChemicalsForLab();
        getEquipmentForLab();
    }catch (e){
        console.error(e);
        alert('Something went wrong with the PUT request for the lab');
    }
}


