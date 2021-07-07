let chemByType = '';
let chemType = '';
let chemById = '';
let chemId = '';

const chemForLabContainer = document.getElementById('chem-container');

//get all chemicals when the button is pressed
document.getElementById('allChemButton').onclick =
    function (){

        getAllChemicals();

}

//get chemicals with a specific type
document.getElementById('typeButton').onclick =
    function (){

        chemType = document.getElementById('typeText').value;

        if(chemType == null){
            console.log('There is nothing inside!');
        }else{
            chemByType = `http://localhost:8080/chemicals?type=${chemType}`;
            getChemicalsByType();
        }

    }

//get one chemical with a specific id when the button is pressed
document.getElementById('idButton').onclick =
    function (){

        chemId = document.getElementById('idText').value;

        if(isNaN(chemId) ){
            console.log("That's not an ID!");
        }else {
            chemById = `http://localhost:8080/chemicals/${chemId}`;
            getOneChemByID();
        }
}

//update a chemical with a specific id
document
    .getElementById('put-chem')
    .addEventListener('submit', function (event){
        event.preventDefault()

        let putChem = {};

        const inputs = document.querySelectorAll('#put-chem input[type=text]');

        for(const input of inputs){
            putChem[input.name] = input.value;
        }

        putNewChemical(putChem);
        event.target.reset();
    })

//delete a chemical with a specific id when the button is pressed
document.getElementById('deleteChemicalButton').onclick =
    async function (){
        await deleteOneChemical();
        await getAllChemicals();
    }

//delete a chemical with a specific id
async function deleteOneChemical(){

    try {
        const response = fetch(chemById,{
            method: 'DELETE'
        });

    }catch (e){
        console.error(e);
        alert('Something went wrong with the DELETE request for the lab');
    }

    chemForLabContainer.innerHTML = '';
    getAllChemicals();
}

//update a chemical with the specific id with the data from the form
async function putNewChemical(putChem){

    try {

        const response = await fetch(chemById,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putChem)
        });

        await response.json();

        getOneChemByID();
    }catch (e){
        console.error(e);
        alert('Something went wrong with the PUT request for the lab');
    }
}

//find one chemical with a specific id
async function getOneChemByID() {

    const response = await fetch(chemById);
    const respJson = await response.json();

    chemForLabContainer.innerHTML = '';

    const tr = document.createElement('tr');

    const tdID = document.createElement('td');
    const tdName = document.createElement('td');
    const tdFormula = document.createElement('td');
    const tdType = document.createElement('td');
    const tdQuantity = document.createElement('td');

    tdID.innerText = respJson.id;
    tdName.innerText = respJson.chemicalName;
    tdFormula.innerText = respJson.chemicalFormula;
    tdType.innerText = respJson.chemicalType;
    tdQuantity.innerText = respJson.chemicalQuantity;

    tr.append(tdID, tdName, tdFormula, tdType, tdQuantity);
    chemForLabContainer.append(tr);

}

//get all chemicals with a specific type
async function getChemicalsByType() {

    const response = await fetch(chemByType);
    const respJson = await response.json();

    chemForLabContainer.innerHTML = '';

    for(const item of respJson) {
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

//get all chemicals
async function getAllChemicals() {

    const response = await fetch('http://localhost:8080/chemicals');
    const respJson = await response.json();

    chemForLabContainer.innerHTML = '';

    for(const item of respJson) {
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

//when the page is just opened, all the chemicals are displayed
getAllChemicals();
