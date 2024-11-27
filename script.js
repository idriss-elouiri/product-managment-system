let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let category = document.getElementById("category");
let count = document.getElementById("count");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let Create = document.getElementById("Create");
let  mode = "create" ;
let index ;
// get total

function getTotal(){
    if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.background = "green"
    }else{
        total.innerHTML = "total:"
        total.style.background = "red";
    }
}

// create Element
let dataPro = [];
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.getItem('product'));
}else{
    dataPro = []
}

Create.onclick = function(){
    let container = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    if(mode == "create"){ 
    if(container.count > 1){
        for(let i = 0; i <container.count; i++){
            dataPro.push(container);
        }
    }else{
        dataPro.push(container);
    }
}else{
    dataPro[index] = container ;
}
    localStorage.setItem("product" , JSON.stringify(dataPro));
    deleteTextInput();
    showData();
    total.innerHTML = "total:";
    total.style.background = "red";
 }

//delete text input

function deleteTextInput(){
    title.value = "" ;
    price.value = "" ;
    taxes.value = "" ;
    ads.value= "" ;
    discount.value = "" ;
    total.innerHTML = "" ;
    count.value = "" ;
    category.value = "" ;
}

// red

function showData(){
    let table = "" ;
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick ="updateData(${i})">UPDATE</button></td>
        <td><button onclick ="deleteItem(${i})">DELETE</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
}

//delete

function deleteItem(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// deleteAll

function deleteAllitems(){
    localStorage.clear();
    dataPro.splice(0) ;
    showData()
}
showData();

// updateData

function updateData(i){
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   category.value = dataPro[i].category;
   count.style.display = "none";
   Create.innerHTML = "UPDATE";
   mode = "UPDATE";
    index = i;
}

//search
let modesearch = 'Title';

function searchMode(id){
    let search = document.getElementById('search');
    if(id == 'search-title'){
        modesearch = 'Title';
    }else{
        modesearch = 'Category';
    }
    search.focus()
    search.placeholder = "Search By" + modesearch;
    showData();
    search.value = "";
}

function searchLitter(value){
    let table = "";
    for(let i = 0; i<dataPro.length;i++){
        if(modesearch == 'Title'){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ="updateData(${i})">UPDATE</button></td>
            <td><button onclick ="deleteItem(${i})">DELETE</button></td>
        </tr>
            `
        }   
    }else{
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ="updateData(${i})">UPDATE</button></td>
            <td><button onclick ="deleteItem(${i})">DELETE</button></td>
        </tr>
            `
        }
        }     
    }
    document.getElementById("tbody").innerHTML = table;
}