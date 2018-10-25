// Start Window OnLoad Function
window.onload = function(){
    // Author: Philip Mayer
    // funcitonality on main body area and button onclick events
    // safeButton Modal Luca
    let safeButton = document.querySelector("#button_save");

    //JavaScript-Test für die Console
    console.log("JavaScript Running");

    // Hinzufügen-Button Navbar //
    let hinzufuegen = document.querySelector(".neuesRezept");

    //Alle Löschen Button in der Navbar
    let deleteAllButton = document.querySelector(".deleteAll");

    // Hinzufügen-Karte //
    let hinzufuegenCard = document.querySelector("#hinzufuegenButton");

    // Fläche für das Einfügen von den Karten auswählen //
    uebersichtsSeite = document.querySelector(".images");

    // Layout Switcher Button //
    let layoutSwitcher = document.querySelector(".layout-switcher");

    // Layout-Ansichten holen//
    let cardLayout = document.querySelector(".cardLayout");
    let carouselLayout = document.querySelector(".carouselLayout");

    // Lucas Modal für das Hinzufügen
    let addModal = document.querySelector("#addModal");
    // Modal hide test
    let originalModal = $('#addModal').clone();



    //Navbar alle Rezepte Löschen
    deleteAllButton.addEventListener("click", () => {
        console.log("DeleteAll-Method initiated");
            var response = confirm("Wollen Sie wirklich alle Rezepte löschen?");
            if  (response == true) {
                $('.card').remove();
                localStorage.clear();   // Local Storage leeren
                location.refresh();     // Page-Refresh
                console.log("All Card-Elements performed");
            }
            console.log("All Card-Elements aborded");
    })

    // Navbar Rezept anlegen Button
    hinzufuegen.addEventListener("click", () => {
        console.log("hinzufuegen hat funktioniert");
        // rezeptHinzufuegen();
    });

/* Code obsolete? - phm
    // Plus-Karte für Rezept anlegen
    hinzufuegenCard.addEventListener("click", () => {
        console.log("Card-Button funktioniert");
        //rezeptHinzufuegen();
    }) */

    // Lucas Modal Safebutton bei Save Changes klick
    safeButton.addEventListener("click", () => {
        console.log("safeButton funktioniert");

        removeEditableDiv();
        addNewElement();
        $('#addModal').modal('toggle');

/*
        $('#addModal').remove();
        $('main').append(originalModal);
*/

    })

    function removeEditableDiv() {
        console.log("Removed Editable");
        $("div[contenteditable=true]").attr('contenteditable', 'false');
        console.log("Removed Editable");

    }

    function addEditableDiv() {
        console.log("Removed Editable");
        $("div[contenteditable=false]").attr('contenteditable', 'true');
        console.log("Removed Editable");

    }


    /* Experimental
    // Author: Philip Mayer

    function closeButtonActionPerformed () {
        //Aufrufendes Object muss Child entfernen
        $('.card').remove();
        console.log("closeButtonActionPerformed: Card-Element deleted.")
    }

    let cardElements = document.querySelector("div.images").childNodes;

    for (let i; i<cardElements.length; i++) {
        if ()
    //}


    closeButton.addEventListener("click", () => {
    closeButtonActionPerformed();
    })
    End Experimental Feature*/

//check if storage empty or filled
for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var objfürPhillip = localStorage.getItem(localStorage.key( i ));

  console.log("pass an phillip " + objfürPhillip);
  rezeptHinzufuegen(JSON.parse(objfürPhillip));
}

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
/*function aktualisieren(){

    aktDropDown = document.getElementById("DropDown").value;
    console.log("Aktualisiert");
}
function init(){
    //ZutatenAnz = 3;
    array = [];
   for (var i = 0; i <= ZutatenAnz; i++) {
       array[i] =document.getElementById("00"+(i+1)).innerHTML;
       console.log(array[i]);
   }

   var tableObj = $(".tableBody").find(".Menge span:first-child");
   console.log(tableObj);
   var x = 0;
   $.each(tableObj, function (key,value){
       array[x] = value.innerText;
       console.log(array[x]);
       x++;
       //gibt im Moment 2x Mal den selben Wert aus
       //bis dahin funktioniert es, jetzt muss aendern function noch angepasst werden.
   })

    document.getElementById("DropDown").addEventListener('onchange', aendern());
}

function aendern(){
    var neuDropDown = document.getElementById("DropDown").value;
    console.log(neuDropDown);
    for (var i = 0; i <= array.length; i++) {
        aktZutatenWert = array[i];
        neuZutatenWert = ((aktZutatenWert/aktDropDown)* neuDropDown);
        console.log(neuZutatenWert);
        console.log("bis hier hin klappt es");
        //Der folgende Befehl ist noch nicht richtig und muss durch JQuery ersetzt werden.
        $(".tableBody").find(".Menge span:first-child").attr("id", "00" + i).innerText = neuZutatenWert;
        //document.getElementById("00"+(i+1)).innerHTML = neuZutatenWert;
    }
    aktualisieren();
}*/


/*Noch nicht ausgereift funktioniert noch nicht*/
function search() {
/* Es müsste noch id="searchForm" onchange="search()" beim Button oder der Suchleiste hinzugefügt werden*/
   var name = document.getElementById("searchForm").elements["searchItem"].value;
   console.log(name);
   var pattern = name.toLowerCase();
   var targetId = "";

   var divs = document.getElementsByClassName("bild-text-black");
   for (var i = 0; i < divs.length; i++) {
      var para = divs[i].getElementsByTagName("span");
      var index = para[0].innerText.toLowerCase().indexOf(pattern);
      if (index != -1) {
         targetId = divs[i].parentNode.id;
         document.getElementById(targetId).scrollIntoView();
         break;
      }
   }
}
/*---------------------------------------------------Lucas Teil-----------------------------------------------------------*/
// Add new ingredient
function addTableRow(){
  var tr = document.createElement("tr");

  var table = document.getElementById("zutatentabelle");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      // Setting attributes for table-cells inside the table row
      cell1.setAttribute("class", "Menge");
      cell2.setAttribute("class", "Zutat");

      // Transfer values to inner-html with each opening of showModal
      cell1.innerHTML = "<div contenteditable='true' placeholder='Bitte geben Sie die Menge ein'></div>";
      cell2.innerHTML = "<div contenteditable='true' placeholder='Bitte geben Sie die Zutat ein'></div>";
}



//--------------------------------

function addNewElement(){

    //get Elements
    var titel = $("#inputRezeptTitel").val();
    var rezeptZubereitung = $('#rezeptAnleitung').val();
    var zutaten = $('#zutatentabelle').html();
    var imageCar = $('#carouselInner');
    var imagePfad = $('#carouselInner').first().children().first().children().attr("src");
    var dropdown = $('#DropDown').val();


    //close Modal
    $('#addModal').modal('toggle');

    //to local storage
    var newObject = { 'Titel': titel, 'Zubereitung': rezeptZubereitung, 'ImagePfad': imagePfad, 'Zutatenliste': zutaten, 'imgeCar': imageCar, 'AnzahlPersonen' : dropdown };
    console.log("object "+newObject.Zutatenliste);
    localStorage.setItem(titel, JSON.stringify(newObject));

    rezeptHinzufuegen(newObject);
    setTableID(this);

    // Reset von Werten ausführen
    $("#inputRezeptTitel").val("");
    $('#rezeptAnleitung').val("");
    //Not working yet...
    $('#zutatentabelle').removeData();
    $('#carouselInner').first().children().first().children().removeData();


    // Temp-Reload um das Modal zu resetten
    // location.reload();

}


//function um IDs der Tabelle anzupassen
function setTableID(aktObj){
    //im Tabellenbody weiter runter nach Klasse Menge. Das darin liegende span auswählen
    //Das Ergbnis ist ein Objekt mit span Elementen
  var spanObj = $(".tableBody").find(".Menge span:first-child");
  console.log(spanObj);
  //Variable muss außen liegen
  var x = 1;
  //Schleife die das erhaltene Objekt durchläuft
  //Bei jedem Durchlauf wird eine neue, fortlaufende  Id vergeben
  //Wichtig für die Mengen Umrechnung
  $.each(spanObj, function (key,value){
      value.setAttribute("id","00" + x++);
      console.log(x);
      console.log(key);
      console.log(value);
  })

}

// Rezept hinzufuegen Karte erstellen
// Author: Philip Mayer
function rezeptHinzufuegen(newObject) {
    console.log("Rezept hinzufügen running");

    //Attribute des Objects auslesen
    let title = newObject.Titel;
    console.log(title);
    let img = newObject.ImagePfad;
    console.log(img);

    // Leere Karte hinzufügen //
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    //Attribute für Modal-Funktionalität setzen
    cardElement.setAttribute("data-toggle","modal");
    cardElement.setAttribute("data-target", ".bd-example-modal-lg");
    uebersichtsSeite.appendChild(cardElement);

    // Beschriftungstext zu Karte hinzufügen
    let cardText = document.createElement("div");
    cardText.textContent = title;
    cardText.classList.add("bild-text");
    cardElement.appendChild(cardText);

    // Löschen-Button hinzufügen
    let cardCloseButton = document.createElement("img");
    cardCloseButton.classList.add("close");
    cardCloseButton.setAttribute("src", "src/img/error.png");
    cardElement.appendChild(cardCloseButton);

    // Rezeptbild hinzufügen
    let rezeptBild = document.createElement("img");
    rezeptBild.classList.add("rezeptbilder");
    rezeptBild.setAttribute("src", img);
    cardElement.appendChild(rezeptBild);

    // Aktion für Klick auf das Close Symbol hinterlegen
    cardCloseButton.addEventListener("click", () => {

        console.log("DeleteAll-Method initiated");
            var dialog = confirm("Wollen Sie das Rezept wirklich löschen?");
        if  (dialog == true) {
            cardElement.parentNode.removeChild(cardElement);
            localStorage.removeItem(title);
            console.log("Card-Element deleted.");
        }
        console.log("Card-Element delete canceled. Not performed.");

        // For close-button funcitonality - needs to be at the end of the method
        stopOverlapOfElements(this.event);
    });

    // Click close-button without showModal Method
    function stopOverlapOfElements(evt){
        evt.stopPropagation();
        evt.cancelBubble = true;
    }

    cardElement.onclick = function(){
      //patricksModalAufruf()
      var titel = $(this).first().text();
      var objJSON = localStorage.getItem(titel);
      var obj = JSON.parse(objJSON);

      $(".PopUp_Text").text(obj.Titel);
      $("#carouselInner").html(obj.imageCar);
      //$('#carouselInnerTarget').html("<div class = 'carousel-item active'><img class='d-block w-100' src='"+obj.ImagePfad+"' alt='First slide'/></div>");
      $(".Zub_Text").text(obj.Zubereitung);
      $(".tableBody").html(obj.Zutatenliste);
      $('#modalShow').modal('toggle');

      document.getElementById("DropDown").addEventListener('onchange', aendern(obj));

      // For close-button funcitonality - needs to be at the end of the method
      stopOverlapOfElements(this.event);
  }

};

    //ändern der Zutaten Anzahl

    function aendern(obj){
        let temp = document.createElement("div");
        console.log(temp)
        temp.innerHTML = obj.Zutatenliste;
        console.log(temp.innerHTML);
        var array = [];
        var tableInner;
        var j = 1;
        for(i=0; i<=3; i++){
        // das j von childNodes muss immer ein ungerader Wert sein. (1,3,5,7)
        //Hier muss die maximale Anzahl an Tabellenreihen stehen
        if(i == 3){
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
                    //console.log("gerade");
                }
                else if(j%2 != 0){
                    tableInner = temp.childNodes[j].innerHTML;
                    j++;
                    array[i] = tableInner;
                    //console.log("ungerade");
                }
            }
        }
        console.log(array);
        /*var aktDropDown = obj.AnzahlPersonen;
        var neuDropDown = document.getElementById("DropDown").value;
        for (var i = 0; i <= array.length; i++) {
            aktZutatenWert = array[i];
            neuZutatenWert = ((aktZutatenWert/aktDropDown)* neuDropDown);
            //Tabellenwerte der temp Struktur werden überschrieben
            temp.children[i].innerHTML= neuZutatenWert;
            //temp Struktur als neues Tabellen Struktur übernehmen
            $(".tableBody").html(temp);
        }*/
    }
