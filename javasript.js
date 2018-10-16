// Author: Philip Mayer
// funcitonality on main body area and button onclick events


window.onload = function(){

    // safeButton Modal Luca
    let safeButton = document.querySelector("#button_save");

    //JavaScript-Test für die Console
    console.log("JavaScript Running");

    // Hinzufügen-Button Navbar //
    let hinzufuegen = document.querySelector(".neuesRezept");

    // Hinzufügen-Karte //
    let hinzufuegenCard = document.querySelector("#hinzufuegenButton");

    // Fläche für das Einfügen von den Karten auswählen //
    let uebersichtsSeite = document.querySelector(".images");

    // Layout Switcher Button //
    let layoutSwitcher = document.querySelector(".layout-switcher");

    // Layout-Ansichten holen//
    let cardLayout = document.querySelector(".cardLayout");
    let carouselLayout = document.querySelector(".carouselLayout");

    // Lucas Modal für das Hinzufügen
    let addModal = document.querySelector("#addModal");

//modal clone
 //myBackup = "";


    // Navbar Rezept anlegen Button
    hinzufuegen.addEventListener("click", () => {
        console.log("hinzufuegen hat funktioniert");
        // rezeptHinzufuegen();
    });

    // Plus-Karte für Rezept anlegen
    hinzufuegenCard.addEventListener("click", () => {
        console.log("Card-Button funktioniert");
        //rezeptHinzufuegen();
    })

    // Lucas Modal Safebutton bei Save Changes klick
    safeButton.addEventListener("click", () => {
    // myBackup = $('#addModal').clone();
        console.log("safeButton funktioniert");
        addNewElement();
        $('#addModal').modal('toggle');
    })


// Experimental Layout-Switch
    layoutSwitcher.addEventListener("click", () => {

        //Log-Einträge zur besseren Nachverfolgung der Werte //
        console.log("Layout-Switcher running");
        console.log("War das Card-Layout aktiv?")
        console.log(cardLayout.getAttribute("id") == "active");
        console.log("War das Carousel-Layout aktiv?")
        console.log(carouselLayout.getAttribute("id") == "active");

        // Im Falle, dass das Card-Layout aktiv ist -> Carousel Layout aktiv setzen //
        if ((cardLayout.getAttribute("id") == "active") == true ){
            cardLayout.style.display = "none";
            carouselLayout.style.display = "block";
            carouselLayout.setAttribute("id", "active");
            cardLayout.removeAttribute("id");
            console.log("Carousel-Layout wurde hinzugefügt");
        }

        // Im Falle, dass das Carousel-Layout aktiv ist -> Card Layout aktiv setzen //
        else if ((carouselLayout.getAttribute("id") == "active") == true) {
            carouselLayout.style.display = "none";
            cardLayout.style.display = "block";
            cardLayout.setAttribute("id", "active");
            carouselLayout.removeAttribute("id");
            console.log("Card-Layout wurde hinzugefügt");
        }

        // Unerwarteter Fall ist eingetreten //
        else {
            console.log("Unexpected case - No Layout Type selected");
            return;
        }
    })


// Search-Function on Main
// Author: Luca Marmonti
      $(document).ready(function(){
      $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("div[class='card']").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


// --------------auskommentiert bisher ------------------------------------------------------------------


// Author: Luca Marmonti
// funcitonality carousel befüllen
//window.onload = function(){  // auskommentiert und vor Code Philip angefügt (PhM)
    aktDropDown = document.getElementById("DropDown").value;
    console.log(aktDropDown);


    /*LUCAS TEIL*/
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function(event){

            var files = event.target.files; //FileList object
            var carouselInner = document.getElementById("carouselInner");
            var check = 0;
            i = 0;

            for(i = 0; i< files.length; i++)
            {
                check = i;
                var file = files[i];
                console.log(files.length);
                console.log(files);
                //Only pics
                if(!file.type.match('image'))
                  continue;

                var picReader = new FileReader();

                picReader.addEventListener("load",function(event){

                    var picFile = event.target;

                    var div = document.createElement("div");

                      console.log("restliche items ");
                    div.className = "carousel-item";



                    div.innerHTML = "<img class='d-block w-100' src='" + picFile.result + "'" +
                            "title='test'/>";

                            console.log("item anhängen");

                    carouselInner.appendChild(div,null);
                    $('#carouselInner div:first').addClass('active');
                    $('#carouselInner div:first').attr('id', 'firstElement');

                });

                 //Read the image
                 console.log("read image");
                picReader.readAsDataURL(file);
            }
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }

} // End onload function


// Author: Patrick Mahler
// Modal
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
function anzeigen(){
    //Überschrift holen
    console.log("Überschrift");
    //Hier passiert noch ein Fehler
    var PopUp_Überschrift = $(this).children(":first").html();
    console.log(PopUp_Überschrift);
    $(".PopUp_Text_Überschrift").innerHTML = PopUp_Überschrift;

}
/*---------------------------------------------------Lucas Teil-----------------------------------------------------------*/
function addTableRow(){
  var tr = document.createElement("tr");

  var table = document.getElementById("zutatentabelle");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "<td class='Menge' id=''><div contenteditable>hier Menge eingeben</div></td>";
      cell2.innerHTML = "<td class='Zutat'><div contenteditable>Hier Zutat eingeben</div></td>";
}


//--------------------------------

function addNewElement(){

//get Elements
var titel = $("#inputRezeptTitel").val();
var rezeptZubereitung = $('#rezeptAnleitung').val();
var zutaten = $('#zutatentabelle').html();


var imagePfad = $("#firstElement img:first").attr('src');

//get Elements
//create new card element
var cardOverviewImages = document.getElementById("images");
var div = document.createElement("div");
div.className = "card";
div.innerHTML = "<div class='bild-text-black'><span>"+titel+"</span></div><img class='close' src='src/img/error.png'/><img class='rezeptbilder' src='"+imagePfad+"'/><div datatest = '"+rezeptZubereitung+"' data-hidden='{textRezept: '"+rezeptZubereitung+"'}'></div>";
div.onclick = function () {
  var PopUp_Überschrift = $(this).first().text();
  console.log(PopUp_Überschrift);
  $(".PopUp_Text_Überschrift").text(PopUp_Überschrift);

  var zubText = $(this).children().last().attr("datatest");
  52
  console.log(zubText);
  $(".Zub_Text").text(zubText);

  $('#modalShow').modal('toggle');
};



cardOverviewImages.appendChild(div,null);

//close Modal
//$('#addModal').modal('toggle');

      /*  $('#addModal').modal('hide').remove();
        var myClone = myBackup.clone();
        $('body').append(myClone);
*/
}

// Rezept hinzufuegen Karte erstellen
// Author: Philip Mayer
function rezeptHinzufuegen() {
    console.log("Rezept hinzufügen running");

    // Leere Karte hinzufügen //
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    //Attribute für Modal-Funktionalität setzen
    cardElement.setAttribute("data-toggle","modal");
    cardElement.setAttribute("data-target", ".bd-example-modal-lg");
    uebersichtsSeite.appendChild(cardElement);

    // Beschriftungstext zu Karte hinzufügen
    let cardText = document.createElement("div");
    cardText.textContent = "Textfüller";                 // Muss später durch Lucas Elemente im Forumular befüllt werden
    cardText.classList.add("bild-text");
    cardElement.appendChild(cardText);

    // Löschen-Button hinzufügen
    let cardCloseButton = document.createElement("img");
    cardCloseButton.classList.add("close");
    cardCloseButton.setAttribute("src", "src/img/error.png");
    cardElement.appendChild(cardCloseButton);

    // Rezeptbild hinzufügen                                Muss später mit Lucas Bild befüllt werden
    let rezeptBild = document.createElement("img");
    rezeptBild.classList.add("rezeptbilder");
    cardElement.appendChild(rezeptBild);

    // Aktion für Klick auf das Close Symbol hinterlegen
    cardCloseButton.addEventListener("click", () => {
        cardElement.parentNode.removeChild(cardElement);
    });
};
