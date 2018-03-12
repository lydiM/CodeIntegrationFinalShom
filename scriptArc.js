/********Declaration des variables globales************/ 
var draw1;
var value= 'Circle';
var selectArc;


/************************Fonction de dessin de l'arc de cercle**********************************/

function dessinArc(){
var geometryFunction =function(coordinate,  arc) {
 if ( !arc) {
 arc = new ol.geom.Polygon(0);
 }
  var point = coordinate[1]; //point de départ
  var radius = document.formu.distance.value*1852; //taille des segments
  var newCoordinates = []; //Tableau pour stoker les coordonnées des nouveaux points

  var nbr =50;
  var angle1=document.formu.angle1.value*(Math.PI/180); //conversion en Radian
  var offsetY = radius * Math.cos(angle1); //décalage de Y
  var offsetX = radius * Math.sin(angle1); //décalage de X
  for (var i =0; i<nbr;i++){

  /*Récupération des angles*/
  var angle2=(((document.formu.angle2.value*(Math.PI/180))-angle1)*i/nbr)+angle1; //conversion en Radian
  var ang = document.formu.angle2.value*(Math.PI/180);


 var offsetY2 =  radius*Math.cos(angle2); //décalage de Y

 var offsetX2 = radius*Math.sin(angle2); //décalage de X


 var offY2 = radius * Math.cos(ang); //décalage de Y

 var offX2 = radius * Math.sin(ang); //décalage de X

//le code finale réussi a 100% :)


if (i==0  ){
newCoordinates.push(  [point[0] + offsetX, point[1] + offsetY],  [point[0], point[1]],
                    [point[0] + offsetX2, point[1]+offsetY2]);

} else {newCoordinates.push([point[0] + offsetX2, point[1]+offsetY2]);

             } if (i ==nbr-1){
               newCoordinates.push([point[0] + offX2, point[1] + offY2], [point[0], point[1]]);
             }

}//fin de la boucle

  arc.setCoordinates([newCoordinates]);
  return  arc;

}; //End geometryFunction
  draw1 = new ol.interaction.Draw({
    source: source,
    type: (value),
    geometryFunction: geometryFunction
  });

  map.addInteraction(draw1);

}
/**************************************************************************************************/



/*****************Fonction de d�placement de l'arc***************************/

function deplacer(draw){
map.removeInteraction(draw);

selectArc = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      //style : newstyle,
    });

var translate = new ol.interaction.Translate({
      features: selectArc.getFeatures()
    });

  
  map.addInteraction(selectArc);
  map.addInteraction(translate);
}



/*******************fonction pour d�sactiver le dessin**********************************/ 		

function desactiver(){
   map.removeInteraction(draw1);
}




/******************fonction de style************************************/

function appliquerStyle(){

//l'objet arcs
var arcs = new ol.Feature({
    type: (value),
    geometryFunction: dessinArc()

	});

//Recupération valeur menu contour
var strokeSelect = document.getElementById('menuC');

// Recupération valeur menu remplissage
var fillSelect= document.getElementById('menuR');
var largeur = document.getElementById('epai');


var source = new ol.source.Vector({
         features:[arcs],
         wrapX: false

             });


var opacite = document.getElementById('opacite');
    vector = new ol.layer.Vector({
        opacity : opacite.value,
        style: newstyle,
        source: source
                });
var newstyle=function changestyle(){
    var contour = strokeSelect.value;
    var remplissage=fillSelect.value;
    
    var arcStyles = [
        new ol.style.Style({
            fill:new ol.style.Fill({color: remplissage, width: 4}),
            stroke: new ol.style.Stroke({color: contour, width: 6})
        })
    ];

    return arcStyles ;
}

var selectArc1 = new ol.interaction.Select({
       	style : newstyle,
        condition: ol.events.condition.click,
 });
	map.removeInteraction(draw1);
 	map.removeInteraction(selectArc);
 	map.addInteraction(selectArc1);
 	arcs.setStyle(newstyle);
	
} //Fin de la fonction appliquerStyle()
