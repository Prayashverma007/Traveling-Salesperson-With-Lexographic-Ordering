var cities = [];
var totalCities = 8;

var order = [];

var recordDistance;
var bestEver; 


function setup(){
    createCanvas(600,800);
    for(var i=0;i < totalCities ; i++){
        var v = createVector(random(width),random(height/2));
        cities[i] = v;
        order[i] = i;
    }
    
    var d= calcDistance(cities,order);
    recordDistance = d;
    bestEver = order.slice();
}

function draw(){
    background(0);
    //frameRate(5);
    fill(255);
        for(var i=0;i < cities.length ; i++){
        ellipse(cities[i].x,cities[i].y,8,8);
    }
    
    stroke(255,0,255);
    strokeWeight(4);
    noFill();
    beginShape();
        for(var i=0;i < order.length ; i++){
        var n = bestEver[i];
        vertex(cities[n].x,cities[n].y);
    }
    endShape();   
    
    translate(0,height/2);
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for(var i=0;i < order.length ; i++){
        var n = order[i];
        vertex(cities[n].x,cities[n].y);
    }
    endShape();  
    
    
    
    var d= calcDistance(cities,nextOrder);
    if (d < recordDistance){
        recordDistance = d;
        bestEver = order.slice();
        console.log(recordDistance);
    }
    
    textSize(64);
    var s = '';
    for(var i =0 ;i < order.length;i++){
        s+=order[i]
    }
    fill(255);
    text(s,20,height-50);
    nextOrder();
}

function swap(a,i,j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;  
    
}

function calcDistance(points,order){
    var sum = 0;
    for(var i =0;i<order.length-1;i++){
        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i+1];
        var cityB = points[cityAIndex];
        
        var d = dist(cityA.x,cityA.y,cityB.x,cityB.y);
        sum+=d;
    }
    return sum;
}



function nextOrder(){

    largestI = -1;
    for(var i =0; i<order.length;i++){
        if(order[i] < order[i+1]){
            largestI = i;
        }
        
    }
    if (largestI == -1){
        noLoop();
        console.log('finish');
        
    }
    
    largestJ = -1;
    for(var j =0 ; j < order.length;j++){
        if(order[largestI] < order[j]){ 
            largestJ = j;
        }
    }
    
    swap(order,largestI,largestJ);
    
    var endArray = order.splice(largestI+1);
    endArray.reverse();
    order = order.concat(endArray);
}