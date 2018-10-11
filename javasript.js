
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

window.onload = function(){

    //Check File API support
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
}


function addTableRow(){



  var tr = document.createElement("tr");

  var table = document.getElementById("zutatentabelle");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "<td class='Menge' id=''><span id=''><div contenteditable>I'm editable</div></span>g</td>";
      cell2.innerHTML = "<td class='Zutat'><div contenteditable>enter here</div></td>";





}
