// Start Window OnLoad Function
window.onload = function(){     // Wait for page to finish loading before running any JS code

    // Author: Philip Mayer
    // funcitonality on main body area and button onclick events
    // safeButton Modal Luca
    let safeButton = document.querySelector("#button_save");
    var obj;

    //JavaScript-Test für die Console
    console.log("JavaScript Running");

    // Add-Card-Element in navbar
    let hinzufuegen = document.querySelector(".neuesRezept");

    // Delete all button in navbar
    let deleteAllButton = document.querySelector(".deleteAll");

    // Add-Card-Plus-Icon-Element
    let hinzufuegenCard = document.querySelector("#hinzufuegenButton");

    // Space for images to insert the card elements --> required in method rezepteHinzufuegen
    uebersichtsSeite = document.querySelector(".images");

    // Layout Switcher Button
    let layoutSwitcher = document.querySelector(".layout-switcher");

    // Layout-Ansichten holen
    let cardLayout = document.querySelector(".cardLayout");
    let carouselLayout = document.querySelector(".carouselLayout");

    // get addModal to insert items
    let addModal = document.querySelector("#addModal");

    //Navbar alle Rezepte Löschen
    deleteAllButton.addEventListener("click", () => {
        console.log("DeleteAll-Method initiated");
            // User-Confirm Message to approve delete operation
            var response = confirm("Wollen Sie wirklich alle Rezepte löschen?");
            if  (response == true) {
                $('.card').remove();
                localStorage.clear();   // Local Storage leeren
                location.reload();     // Page-Refresh
                console.log("All Card-Elements performed");
            }
            // Log if not deleted - User input canceled
            else {
                console.log("All Card-Elements canceled - Not deleted.");
            }
    })

    // Lucas Modal Safebutton bei Save Changes klick
    safeButton.addEventListener("click", () => {
        console.log("safeButton funktioniert");

        removeEditableDiv();
        addNewElement();
        $('#addModal').modal('toggle');
    })


//check if storage empty or filled
for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var objfürPhillip = localStorage.getItem(localStorage.key( i ));

  console.log("pass an phillip " + objfürPhillip);
  rezeptHinzufuegen(JSON.parse(objfürPhillip));
}

// Experimental Layout-Switch
// Author: Philip Mayer
/*  took Layout-Switcher out of code for now - 31.10.2018 - phm
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
    }) End Layout-Switcher */


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

// Author: Luca Marmonti
// funcitonality carousel befüllen
 // auskommentiert und vor Code Philip angefügt (PhM)
    aktDropDown = document.getElementById("DropDown").value;
    console.log(aktDropDown);
    //bootstrap image picker
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");
        //add listener for "Add image" button
        filesInput.addEventListener("change", function(event){
            //get all picked images
            var files = event.target.files; //FileList object
            //get carousel inner as destination for images
            var carouselInner = document.getElementById("carouselInner");
            var check = 0;
            i = 0;
            //for each image
            for(i = 0; i< files.length; i++)
            {
                check = i;
                var file = files[i];
                console.log(files.length);
                console.log(files);
                //Only pics - check if file is image
                if(!file.type.match('image'))
                  continue;

                var picReader = new FileReader();

                picReader.addEventListener("load",function(event){

                    var picFile = event.target;
                    //create new div container for image
                    var div = document.createElement("div");
                    div.className = "carousel-item";
                    //build html img tag for current image
                    div.innerHTML = "<img class='d-block w-100' src='" + picFile.result + "'" +
                            "title='test'/>";
                    //add image to carousenInner
                    carouselInner.appendChild(div,null);
                    //change class of frist element to active to show it in carousel
                    $('#carouselInner div:first').addClass('active');

                });

                 //Read the image
                picReader.readAsDataURL(file);
            }
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }

} // End onload function

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

  // Get Zutatentabelle from HTML(DOM)
    var table = document.getElementById("zutatentabelle");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

      // Setting attributes for table-cells inside the table row
      cell1.setAttribute("class", "Menge");
      cell2.setAttribute("class", "Zutat");

      console.log("addTableRow-Action performed");
      // Transfer values to inner-html with each opening of showModal
      cell1.innerHTML = "<div contenteditable='true' placeholder='Bitte geben Sie die Menge ein'></div>";
      cell2.innerHTML = "<div contenteditable='true' placeholder='Bitte geben Sie die Zutat ein'></div>";
}
//--------------------------------

function addNewElement(){

    //get Elements
    var titel = $("#inputRezeptTitel").html();
    var rezeptZubereitung = $('#rezeptAnleitung').val();
    var zutaten = $('#zutatentabelle').html();
    var imageCar = $('#carouselInner');
    var imagePfad = $('#carouselInner').first().children().first().children().attr("src");
    var dropdown = $('#DropDown').val();


    //close Modal
    $('#addModal').modal('toggle');

    //to local storage - create new object for local storage
    var newObject = { 'Titel': titel, 'Zubereitung': rezeptZubereitung, 'ImagePfad': imagePfad, 'Zutatenliste': zutaten, 'imgeCar': imageCar, 'AnzahlPersonen' : dropdown };
    //set item to local storage
    localStorage.setItem(titel, JSON.stringify(newObject));
    //add object as new recepie
    rezeptHinzufuegen(newObject);
    //set ID`s
    setTableID(this);

    // perform reset of values to start without values when creating new card item in modal
    $("#inputRezeptTitel").val(""); // title reset
    $('#rezeptAnleitung').val("");  // description reset
    $('#carouselInner').remove(); // remove image item

    // Temp-Reload um das Modal zu resetten
    location.reload();

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

    console.log("rezeptHinzufügen-Method running");

    // get attributes of object
    let title = newObject.Titel;    // titles of object and save to variable
    let img = newObject.ImagePfad;  // image path of object
    //console.log("current object Title: " +titles " " + img);

    // Creation of empty card element
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");  // add class="card" to newly created div-box

    // set attribute for bootstrap mod
    cardElement.setAttribute("data-toggle","modal");
    cardElement.setAttribute("data-target", ".bd-example-modal-lg");
    // setting new div-card-item to images partent class
    uebersichtsSeite.appendChild(cardElement);

    // add the title to the card element
    let cardText = document.createElement("div");
    cardText.textContent = title;
    cardText.classList.add("bild-text");    // adding class bild-text to overlap on the card --> CSS-Styling
    // setting the card-title-text to the div-card-element
    cardElement.appendChild(cardText);

    // add delete-button
    let cardCloseButton = document.createElement("img");
    cardCloseButton.classList.add("close"); // add styling to overlap the card-image
    cardCloseButton.setAttribute("src", "src/img/error.png");   // set the image as html-attribute
    cardElement.appendChild(cardCloseButton);   // add element to card-item

    // add recipe picture
    let rezeptBild = document.createElement("img");
    rezeptBild.classList.add("rezeptbilder");   // add class rezeptbilder to get styling from css
    rezeptBild.setAttribute("src", img);    // setting attribute with img out of object
    cardElement.appendChild(rezeptBild);

    // action click for the close element
    cardCloseButton.addEventListener("click", () => {
        console.log("DeleteAll-Method initiated");
        // User input dialog to make sure user really wants to delete the selected item
        var dialog = confirm("Wollen Sie das Rezept wirklich löschen?");

        if  (dialog == true) {      // if user presses ok - delete item
            cardElement.parentNode.removeChild(cardElement);    // delete from html
            localStorage.removeItem(title);                     // delete title (id for object) from local storage
            console.log("Card-Element deleted.");
        }
        else {  // else-case just for loggin purposes
            console.log("Card-Element delete canceled. Not performed.");
        }
        // For close-button functionality - needs to be at the end of the method
        // ensures that onclick on this item does not open the modal for onclick on card-image
        stopOverlapOfElements(this.event);
    });


    cardElement.onclick = function(){
      //patricksModalAufruf()
      var titel = $(this).first().text();
      var objJSON = localStorage.getItem(titel);
      obj = JSON.parse(objJSON);

      $(".PopUp_Text").text(obj.Titel);
      $("#carouselInner").html(obj.imageCar);
      $('#carouselInnerTarget').html("<div class = 'carousel-item active'><img class='d-block w-100' src='"+obj.ImagePfad+"' alt='First slide'/></div>");
      $(".Zub_Text").text(obj.Zubereitung);
      $(".tableBody").html(obj.Zutatenliste);
      $('#modalShow').modal('toggle');

     // $("dropdown").on("change", "select", aendern(obj));
     console.log(obj);

     // For close-button functionality - needs to be at the end of the method
     // ensures that onclick on this item does not open the modal for onclick on card-image
      stopOverlapOfElements(this.event);
  }
};

    //ändern der Zutaten Anzahl
    function aendern(){
        var objtemp = obj;
        let temp = document.createElement("div");
        temp.innerHTML = objtemp.Zutatenliste;
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
        var aktDropDown = objtemp.AnzahlPersonen;
        console.log(aktDropDown);
        var neuDropDown = document.getElementById("DropDown").value;
        var index=0;
        console.log(neuDropDown);
        for (var i = 0; i < array.length; i++) {
            if (i!=0){
                index++;
            }
            aktZutatenWert = array[i];                                                      //aktueller Wert wird in die Variable geschrieben
            neuZutatenWert = ((aktZutatenWert/aktDropDown)* neuDropDown);                   // neuer Zutatenwert wird berechnet
            temp.children[index].innerHTML= neuZutatenWert;                                 //Tabellenwerte der temp Struktur werden überschrieben
            index++;
        }
        console.log(temp);
        $(".tableBody").html(temp.innerHTML);                                               //temp Struktur als neue Tabellen Struktur übernehmen
    }


// Change function Luca Patrick
    function changeElement(){
      //$('#modalShow').modal('toggle');
      $('#addModal').modal('toggle');
      console.log("weg mit Patricks Modal- her mit Lucas Modal");
      var localObject = obj;

      var titelFeld =   $('#inputRezeptTitel');
      titelFeld.html(localObject.Titel)

      //set data from current object in editable fields
      $('#carouselInner').html("<div class = 'carousel-item active'><img class='d-block w-100' src='"+obj.ImagePfad+"' alt='First slide'/></div>");
      $("#rezeptAnleitung").text(obj.Zubereitung);
      $(".tableBody").html(obj.Zutatenliste);

      addEditableDiv();
      titelFeld.attr('contenteditable', 'false');
    }
    //remove editable tag for all contenteditable divs
    function removeEditableDiv() {
        console.log("Removed Editable");
        $("div[contenteditable=true]").attr('contenteditable', 'false');
        console.log("Removed Editable");

    }
    //set contenteditable to true
    function addEditableDiv() {
        console.log("Removed Editable");
        $("div[contenteditable=false]").attr('contenteditable', 'true');
        console.log("Removed Editable");

    }

    // Method in order to stop overlapping conflicts in dom tree
    // prevents parent element from being notified by the event
    // internet explorer v8 or newer!
    function stopOverlapOfElements(evt) {
        evt.stopPropagation();          // internet explorer v9 and other browsers
        evt.cancelBubble = true;        // for ie8 or lower
    }
