var pelota, database;
var posicion;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

pelota = createSprite(250,250,10,10);
  pelota.shapeColor = "red";


  var hypnoticBallPosition = database.ref('pelota/posicion');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('pelota/posicion').set({
    'x': posicion.x + x ,
    'y': posicion.y + y
  })
}

function readPosition(data){
  posicion = data.val();
  console.log(posicion.x);
 pelota.x = posicion.x;
  pelota.y = posicion.y;
}

function showError(){
  console.log("Error in writing to the database");
}