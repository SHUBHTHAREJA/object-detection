img=""
status=""
objects=[];
function preload(){
    img= loadImage("dog_cat.jpg")
}

function setup(){
 canvas=createCanvas(550,450);
 canvas.center();
 Objectdectector=ml5.objectDetector("cocossd",modelLoaded);
 document.getElementById("status").innerHTML="status detecting";
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
    Objectdectector.detect(img,gotResults);
}

function gotResults(error,results){
    if (error) {
        console.error();
    } else {
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(img,0,0,550,450);
    
    if (status != "") {
        
        console.log(status);
         for ( var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status detected";

            fill("red");
            percantange= floor(objects[i].confidence * 100);
             text(objects[i].label + " " + percantange + "%" , objects[i].x + 15,objects[i].y + 15);
             noFill();
             stroke("red");
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         }
    }
}
