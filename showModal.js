function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}

// ------------ ändern der Zutaten Anzahl  --------------
function aendern(){
    var objtemp = obj;
    let temp = document.createElement("div");
    temp.innerHTML = objtemp.Zutatenliste;
    var array = [];
    var tableInner;
    var j = 1;
    var childCount = temp.childElementCount;

    for(i=0; i < (childCount/2); i++){
    // das j von childNodes muss immer ein ungerader Wert sein. (1,3,5,7)
    //Hier muss die maximale Anzahl an Tabellenreihen stehen
        if(i == ((childCount/2) -1)){
            tableInner = temp.childNodes[j+1].nextSibling.innerHTML;
            array[i] = tableInner;
            j++;
            console.log("letztes Element");
        }
        else{
                if ( j%2 == 0){
                    j++;
                    tableInner = temp.childNodes[j].innerHTML;
                    array[i] = tableInner;
                    j++;
                    console.log("gerade");
                }
                else if(j%2 != 0){
                    tableInner = temp.childNodes[j].innerHTML;
                    j++;
                    array[i] = tableInner;
                    console.log("ungerade");
                }
            }
    }
    console.log("Array-Werte von Dropdown: " +array);
    var aktDropDown = objtemp.AnzahlPersonen;
    var neuDropDown = document.getElementById("DropDown").value;
    var index=0;
    for (var i = 0; i < array.length; i++) {
        if (i!=0){
            index++;
        }
        aktZutatenWert = array[i];                                                      //aktueller Wert wird in die Variable geschrieben
        neuZutatenWert = ((aktZutatenWert/aktDropDown)* neuDropDown);                   // neuer Zutatenwert wird berechnet
        temp.children[index].innerHTML= neuZutatenWert;                                 //Tabellenwerte der temp Struktur werden überschrieben
        index++;
    }

    let tableBody = document.querySelector('.anzeigenModalTableBody');
    $("#UmrechnenModalTableErsatz").html(temp.innerHTML);

    // only set attributes when tableBody is not null
    if (tableBody !== null) {
        tableBody.setAttribute("id", "neueTabelle");
        tableBody.setAttribute("class" , "hidden");
        $("#UmrechnenModalTableErsatz").removeAttr("class");
        console.log("Attribute für Div statt Tabelle hinzugefügt");
    }
}


// Change function
    function changeElement(){
      //$('#modalShow').modal('toggle');
      $('#addModal').modal('toggle');
      var localObject = obj;

      var titelFeld =   $('#rezeptEingebenBox');
      titelFeld.html(localObject.Titel)

      //set data from current object in editable fields
      $('#carouselInner').html("<div class = 'carousel-item active'><img class='d-block w-100' src='"+obj.ImagePfad+"' alt='First slide'/></div>");
      $("#rezeptAnleitung").text(obj.Zubereitung);
      $(".tableBody").html(obj.Zutatenliste);

      addEditableDiv();
      titelFeld.attr('contenteditable', 'false');
    }
