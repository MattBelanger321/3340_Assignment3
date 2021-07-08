// code that should be taken care of right away
const items = [
    ["img/0bag.png", "School Bookbag", 29.99],
    ["img/1book.png", "A WriteOnly Book", 13.50],
    ["img/2car.png", "Tesla Model X", 54033.99],
    ["img/3chair.png", "Dinning Room Chair", 299.99],
    ["img/4crayon.png", "Red Crayon", 2.99],
    ["img/5fork.png", "A Metal Fork", 9.99],
    ["img/6marker.png", "A Black Marker", 4.99],
    ["img/7pan.png", "Skillet", 25.99],
    ["img/8pencil.png", "A #2 Pencil", 1.99],
    ["img/9plate.png", "A Porcelain Plate", 15.99],
    ["img/Aspoon.png", "A Metal Spoon", 9.99],
    ["img/Btable.png", "Dinner Table", 150.78]
];

//Solves bug involving accessing elements being referenced before they are loaded
(function(window, document, undefined){
    window.onload = init;

    function init(){
        let i = 0;

        let chosens = [];
        let chose = Math.ceil(Math.random() * 100) % 12;
        for(i = 0;i<6;i++){//get our 6 random items
            while(chosens.includes(chose)){    //insure items has not been chose
                chose = Math.ceil(Math.random() * 100 )%12; //generate
            }
            chosens.push(chose);    //push chosen item to list of chosens

            //reference the proper table cell
            let imgID = "img".concat((i + 1).toString());
            let capID = "cap".concat((i + 1).toString());
            document.getElementById(imgID).src = items[chose][0];
            document.getElementById(capID).innerHTML = items[chose][1];
        }
    }

})(window, document, undefined);

//returns -1 if item is not found in table returns the index of the row otherwise
function findRowIndex(item){
    let table = document.getElementById("cart");
    for(let i = 1;i< table.rows.length;i++){
        if(table.rows[i].cells[0].innerHTML === item){
            return i;
        }
    }
    return -1;
}

function remove(item){
    let table = document.getElementById("cart");

    let index = findRowIndex(item);
    if(index !== -1){
        table.deleteRow(index);
        sumTotal()
        if(table.rows.length === 2){
            remove("Total");
        }
        return;
    }

    console.log("ERR: Row not found");
}

function addQuan(item) {
    let table = document.getElementById("cart");

    let index = findRowIndex(item);
    if(index !== -1){
        table.rows[index].cells[3].innerHTML = +table.rows[index].cells[3].innerHTML + 1;
        sumTotal()
        return;
    }
    console.log("ERR: Row not found");
}

function subQuan(item) {
    let table = document.getElementById("cart");

    let index = findRowIndex(item);
    if(index !== -1){
        table.rows[index].cells[3].innerHTML -= 1;
        sumTotal()
        if(+table.rows[index].cells[3].innerHTML === 0){
            remove(item)
        }
        return;
    }

    console.log("ERR: Row not found");
}

function sumTotal(){
    let table = document.getElementById("cart");
    if(findRowIndex("Total") === -1){
        let totRow = table.insertRow(-1);
        let cell1 = totRow.insertCell(0);
        cell1.colSpan = 4;
        cell1.innerHTML = "Total";
        let cell2 = totRow.insertCell(1);
        cell2.innerHTML = "$0";
    }

    let tot = 0;
    let i = 1
    for(i = 1;i< table.rows.length - 1;i++){
        tot += +table.rows[i].cells[2].innerHTML.substring(1) * +table.rows[i].cells[3].innerHTML;
    }
    table.rows[i].cells[1].innerHTML = "$".concat(tot.toFixed(2).toString());
}

//adds row to Cart table
function addToCart(id){
    let src = document.getElementById(id).src;
    let item = src.substring(src.indexOf("/img/")+6,src.length -4);

    if(findRowIndex(item) === -1) { //if item is not in cart

        let table = document.getElementById("cart");
        let row = table.insertRow(1);
        let cell = row.insertCell(0);

        //add Item Name
        cell.innerHTML = item;

        //add captiom
        cell = row.insertCell(1);
        let index = src.charAt(src.indexOf("/img/") + 5);
        //convert index to an integer
        if (index === 'A') {  //used hex for the indices > 9
            index = 10;
        } else if (index === 'B') {
            index = 11;
        } else {
            index = +index;
        }
        cell.innerHTML = items[index][1];   //the caption

        //add price
        cell = row.insertCell(2);
        cell.innerHTML = "$".concat(items[index][2]);   //the price

        //add quantity
        cell = row.insertCell(3);
        cell.innerHTML = 1;

        //add actions
        let act = row.insertCell(4);
        //remove
        let rem = document.createElement("button");
        rem.appendChild(document.createTextNode(" X "));
        rem.onclick = function () {
            remove(item)
        };
        act.appendChild(rem);
        //add 1
        let add = document.createElement("button");
        add.appendChild(document.createTextNode(" + "));
        add.onclick = function () {
            addQuan(item)
        };
        act.appendChild(add);
        //sub 1
        let sub = document.createElement("button");
        sub.appendChild(document.createTextNode(" - "));
        sub.onclick = function () {
            subQuan(item)
        };
        act.appendChild(sub);
    }else{
        ++document.getElementById("cart").rows[findRowIndex(item)].cells[3].innerHTML;
    }
    sumTotal();
}