
window.onload = function(){
    aktDropDown = document.getElementById("DropDown").value;
    console.log(aktDropDown);
}
function aktualisieren(){
    aktDropDown = document.getElementById("DropDown").value;
    console.log("Aktualisiert");
}
function init(){
    ZutatenAnz = 3;
    array = ["1","2","3","4"];
    for (var i = 0; i <= ZutatenAnz; i++) {
       array[i] = document.getElementById("00"+(i+1)).innerHTML;
       console.log(array[i]);
   }
    document.getElementById("DropDown").addEventListener('onchange', aendern());
}

function aendern(){
    var neuDropDown = document.getElementById("DropDown").value;
    for (var i = 0; i <= ZutatenAnz; i++) {
        aktZutatenWert = array[i];
        neuZutatenWert = ((aktZutatenWert/aktDropDown)* neuDropDown);
        document.getElementById("00"+(i+1)).innerHTML = neuZutatenWert;
    }
    aktualisieren();
}
