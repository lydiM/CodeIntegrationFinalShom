var draw1;
var value= 'Circle';




/************************Fonction de dessin de l'arc de cercle**********************************/

function dessinLigne(){

	var geometryFunction = function(coordinate,  ligne) {
	if ( !ligne) {
	 ligne = new ol.geom.Polygon(0);
	}

  var point = coordinate[0]; //point de départ
  var last = coordinate[1];
  var dx = point[0]-last[0];  //coordonnées x du point de la ligne
  var dy = point[1]-last[1];  //coordonnées y du point de la ligne

  var radius = Math.sqrt(dx*dx + dy*dy); // calcul de la longeur de la  ligne
  
  document.getElementById('distanceLigne').value = radius/1852;   //mettre la valeur dans le champs
  var newCoordinates = []; //Tableau pour stoker les coordonnées des nouveaux points
  var angle1= Math.atan(dx/dy)/(Math.PI/180);  //calcule de l'angle par rapport au nord lors de dessin de la ligne
       //mettre la valeur de l'angle dans le champs selon les valeur de dx et dy
  if(dx<0 && dy<0)
     document.getElementById('azimut').value = angle1;
   if(dx>0 && dy<0)
     document.getElementById('azimut').value = angle1+360;

  if(dx<0 && dy>0)
     document.getElementById('azimut').value = angle1+180;
   if(dx>0 && dy>0)
     document.getElementById('azimut').value = angle1+180;

newCoordinates.push([point[0] , point[1] ], [last[0], last[1]]);

  ligne.setCoordinates([newCoordinates]);


  return  ligne;

};
 draw1 = new ol.interaction.Draw({
    source: source,
    type: (value),
    geometryFunction: geometryFunction
  });

  map.addInteraction(draw1);
}
/***********************************************************************************/