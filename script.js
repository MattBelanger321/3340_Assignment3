//Solves bug involving accessing elements being referenced before they are loaded
(function(window, document, undefined){

// code that should be taken care of right away
    const items = [
        ["img/bag.png", "School Bookbag", 29.99],
        ["img/book.png", "A WriteOnly Book", 13.50],
        ["img/car.png", "Tesla Model X", 54033.99],
        ["img/chair.png", "Dinning Room Chair", 299.99],
        ["img/crayon.png", "Red Crayon", 2.99],
        ["img/fork.png", "A Metal Fork", 9.99],
        ["img/marker.png", "A Black Marker", 4.99],
        ["img/pan.png", "Skillet", 25.99],
        ["img/pencil.png", "A #2 Pencil", 1.99],
        ["img/plate.png", "A Porcelain Plate", 15.99],
        ["img/spoon.png", "A Metal Spoon", 9.99],
        ["img/table.png", "Dinner Table", 150.00]
    ];
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
