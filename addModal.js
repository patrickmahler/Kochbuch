
// ------------ Add new ingredient --------------
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

    // ------------ Add new Element - Fill object  --------------
    function addNewElement(){
        //get Elements
        var titel = $("#rezeptEingebenBox").html();
        var rezeptZubereitung = $('#rezeptAnleitung').val();
        var zutaten = $('#zutatentabelle').html();
        var imageCar = $('#carouselInner').html();
        var imagePfad = $('#carouselInner').first().children().first().children().attr("src");
        var dropdown = $('#AddModalDropDown').val();
        //close Modal
        $('#addModal').modal('toggle');

        //to local storage - create new object for local storage
        var newObject = { 'Titel': titel, 'Zubereitung': rezeptZubereitung, 'ImagePfad': imagePfad, 'Zutatenliste': zutaten, 'imageCar': imageCar, 'AnzahlPersonen' : dropdown };
        //set item to local storage
        localStorage.setItem(titel, JSON.stringify(newObject));
        //add object as new recepie
        rezeptHinzufuegen(newObject);
        //set ID`s
        setTableID(this);

        // Reload um das Modal zu resetten
        location.reload();
    }

    // Rezept hinzufuegen Karte erstellen
    function rezeptHinzufuegen(newObject) {

        console.log("Card Element created.");

        // get attributes of object
        let title = newObject.Titel;    // titles of object and save to variable
        let img = newObject.ImagePfad;  // image path of object

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
        cardCloseButton.onclick = function(event) {
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

            event.stopPropagation();          // internet explorer v9 and other browsers
            event.cancelBubble = true;        // for ie8 or lower
            event.preventDefault();
        };


        cardElement.onclick = function(event){
          //patricksModalAufruf()
          var titel = $(this).first().text();
          var objJSON = localStorage.getItem(titel);
          obj = JSON.parse(objJSON);

          $(".PopUp_TextPM").text(obj.Titel);
          $("#carouselInnerTarget").html(obj.imageCar);
          $(".Zub_Text").html(obj.Zubereitung);
          $(".tableBody").html(obj.Zutatenliste);
          $('#modalShow').modal('toggle');
          $('#DropDown').val(obj.AnzahlPersonen);       // set value of dropdown when created

         // For close-button functionality - needs to be at the end of the method
         // ensures that onclick on this item does not open the modal for onclick on card-image

          event.stopPropagation();          // internet explorer v9 and other browsers
          event.cancelBubble = true;        // for ie8 or lower
          event.preventDefault();

      }
    };

    //remove editable tag for all contenteditable divs
    function removeEditableDiv() {
        $("div[contenteditable=true]").attr('contenteditable', 'false');
        console.log("Removed Editable");
    }

    //set contenteditable to true
    function addEditableDiv() {
        $("div[contenteditable=false]").attr('contenteditable', 'true');
        console.log("Removed Editable");
    }
