let eqByType = '';
let eqType = '';
let eqById = '';
let eqId = '';

const equipmentForLabContainer = document.getElementById('equipment-container');

//get all equipment when the button is pressed
document.getElementById('allEquipmentButton').onclick =
    function (){

        getAllEquipment();

}

//get one equipment with a specific id when the button is pressed
document.getElementById('idButton').onclick =
    function (){

        eqId = document.getElementById('idText').value;

        if(isNaN(eqId) ){
            console.log("That's not an ID!");
        }else {
            eqById = `http://localhost:8080/equipment/${eqId}`;
            getOneEquipmentByID();
        }
}

//update an equipment piece with a specific id
document
    .getElementById('put-equipment')
    .addEventListener('submit', function (event){
        event.preventDefault()

        let putEquipment = {};

        const inputs = document.querySelectorAll('#put-equipment input[type=text]');

        for(const input of inputs){
            putEquipment[input.name] = input.value;
        }

        putNewEquipment(putEquipment);
        event.target.reset();
    })

//delete a piece of equipment with a specific id when the button is pressed
document.getElementById('deleteEquipmentButton').onclick =
    async function (){
        await deleteOneEquipment();
        await getAllEquipment();
}

//delete a piece of equipment with a specific id
async function deleteOneEquipment(){

    try {
        const response = fetch(eqById,{
            method: 'DELETE'
        });

    }catch (e){
        console.error(e);
        alert('Something went wrong with the DELETE request for the lab');
    }

    equipmentForLabContainer.innerHTML = '';
    getAllEquipment();
}

//update a piece of equipment with a specific id
async function putNewEquipment(putEquipment){

    try {

        const response = await fetch(eqById,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putEquipment)
        });

        await response.json();

        getOneEquipmentByID();
    }catch (e){
        console.error(e);
        alert('Something went wrong with the PUT request for the lab');
    }
}

//find a piece of equipment with a specific id
async function getOneEquipmentByID() {

    const response = await fetch(eqById);
    const respJson = await response.json();

    equipmentForLabContainer.innerHTML = '';

    const tr = document.createElement('tr');

    const tdID = document.createElement('td');
    const tdName = document.createElement('td');
    const tdQuantity = document.createElement('td');

    tdID.innerText = respJson.id;
    tdName.innerText = respJson.equipmentName;
    tdQuantity.innerText = respJson.equipmentQuantity;

    tr.append(tdID, tdName, tdQuantity);
    equipmentForLabContainer.append(tr);

}

//find all equipment pieces
async function getAllEquipment() {

    const response = await fetch('http://localhost:8080/equipment');
    const respJson = await response.json();

    equipmentForLabContainer.innerHTML = '';

    for(const item of respJson) {
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

//when the page is just opened, all the equipment pieces are displayed
getAllEquipment();
