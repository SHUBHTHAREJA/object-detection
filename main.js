img=""
status=""
objects=[];
function preload(){

}

function setup(){
 canvas=createCanvas(550,450);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 Objectdectector=ml5.objectDetector("cocossd",modelLoaded);
 document.getElementById("status").innerHTML="status detecting";
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
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
    image(video,0,0,550,450);
    
    if (status != "") {
        
        console.log(status);
        Objectdectector.detect(video,gotResults);
         for ( var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status detected";
            document.getElementById("objects").innerHTML="there are " + objects.length + " " + "object"; 
            r = random(250);
            g = random(250);
            b = random(250);
            fill(r,g,b);
            percantange= floor(objects[i].confidence * 100);
             text(objects[i].label + " " + percantange + "%" , objects[i].x + 15,objects[i].y + 15);
             noFill();
             stroke(r,g,b);
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         }
    }
}
