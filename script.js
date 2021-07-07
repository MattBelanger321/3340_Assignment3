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

//adds row to Cart table
function addToCart(id){
    let table = document.getElementById("cart");
    let row = table.insertRow(1);
    let cell = row.insertCell(0);

    //add Item Name
    let src = document.getElementById(id).src;
    let item = src.substring(src.indexOf("/img/")+6,src.length -4);
    cell.innerHTML = item;

    //add captiom
    cell = row.insertCell(1);
    let index = src.charAt(src.indexOf("/img/")+5);

    //convert index to an integer
    if(index === 'A'){  //used hex for the indices > 9
        index = 10;
    }else if(index === 'B'){
        index = 11;
    }else{
        index = +index;
    }
    cell.innerHTML = items[index][1];

    //add price
    cell = row.insertCell(2);
    cell.innerHTML = "$".concat(items[index][2]);

    //add quantity and Action
    cell = row.insertCell(3);
    cell.innerHTML = 1;
    cell = row.insertCell(4);
    cell.innerHTML = "" +
        "<b onclick='remove()'> X </b>" +
        "<b onclick='addQuan()'> + </b>" +
        "<b onclick='subQuan()'> - </b>"
    ;
}