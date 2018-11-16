// Start Window OnLoad Function
window.onload = function(){     // Wait for page to finish loading before running any JS code

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

    // print button + function
    let buttonDruck = document.getElementById("button_druck");

    // current drop down value
    aktDropDown = document.getElementById("DropDown").value;

    // Printview for Modal Element //
    buttonDruck.onclick = function () {
        printElement(document.getElementById("modalShow"));
    }

    // funcitonality carousel befüllen
    //bootstrap image picker
         if(window.File && window.FileList && window.FileReader) {
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
        else {
            log.console("Your browser does not support API");
        }

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
            stopOverlapOfElements(event);
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
    var objLocalStorage = localStorage.getItem(localStorage.key( i ));
  console.log("Object in local storage");
  rezeptHinzufuegen(JSON.parse(objLocalStorage));
}

// Reload modal when closed
$('#addModal').on('hidden.bs.modal', function(){
    console.log("Hide addModal performed!");
    location.reload();
});
$('#modalShow').on('hidden.bs.modal', function(){
    console.log("Hide showModal performed!");
    location.reload();
});

// Search-Function on Main
      $(document).ready(function(){
          $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("div[class='card']").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

} // End onload function

function search() {
   var name = document.getElementById("searchForm").elements["searchItem"].value;
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

// Method in order to stop overlapping conflicts in dom tree
// prevents parent element from being notified by the event
// internet explorer v8 or newer!
function stopOverlapOfElements(evt) {
    evt.stopPropagation();          // internet explorer v9 and other browsers
    evt.cancelBubble = true;        // for ie8 or lower
}



// ------------ obsolete code -------------
    // Experimental Layout-Switch
    /* layoutSwitcher.addEventListener("click", () => {

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
        }) End Layout-Switcher

        // function um IDs der Tabelle anzupassen
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
        } */
