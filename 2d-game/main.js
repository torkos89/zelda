var form = document.getElementById("controls").children[0]
var inputColor = "red"
 form.onsubmit = function(e){ e.preventDefault(); return false}
 form.children[0].addEventListener("change", function(){ inputColor = this.value})
var grid = document.getElementById('gridMap')
var ctx = grid.getContext('2d');
var gridHeight = grid.offsetHeight ;
var gridWidth = grid.offsetHeight ;
var gridOffset = grid.offsetLeft ;

var input = {mouse: {x:0, y:0, leftClick:0, rightClick:0 },
             controls: {up:0, down:0, left:0, right:0 ,roll:0},
             keyboard: {87:"up", 65:"left", 83:"down", 68:"right", 32:"roll",
                        38:"up", 37:"left", 40:"down", 39:"right"
                       }
            }

document.body.addEventListener('keydown', function(e){
  if(typeof input.keyboard[e.which] === "undefined"){
    console.log("Unknown Input: " + String.fromCharCode(e.keyCode) + " = " + e.keyCode)
  }
    else {input.controls[input.keyboard[e.which]] = 1 }
})
document.body.addEventListener('keyup', function(e){
  if(typeof input.keyboard[e.which] !== "undefined"){
    input.controls[input.keyboard[e.which]] = 0 }
})
grid.addEventListener('mousemove',function(e){
  input.mouse.x = e.clientX - gridOffset
  input.mouse.y = e.clientY
  /*if (input.mouse.leftClick){
     var cellNumX = Math.floor(input.mouse.x / width)
     var cellNumY = Math.floor(input.mouse.y / height)
     world[cellNumX][cellNumY]= inputColor
  }*/
})
grid.addEventListener("mousedown", function()
{input.mouse.leftClick = 1
  /*
    var cellNumX = Math.floor(input.mouse.x / width)
    var cellNumY = Math.floor(input.mouse.y / height)
    world[cellNumX][cellNumY]= inputColor
    */
})
grid.addEventListener("mouseup", function(){input.mouse.leftClick = 0})
var cells = 18, width = gridWidth/cells , height = gridHeight/cells
var world = []
/*for (var x = 0 ; x < cells; x++){
  world.push([])
  for (var y = 0; y < cells; y++){
    world[x].push("#5cc45f")
      }
    }
*/
/*function camera(){
  if (){

  }             // create camera border, center is the player, create a new section of the world when you meet the edge
}*/

function update(){
  if (input.mouse.leftClick){
     var cellNumX = Math.floor(input.mouse.x / width)
     var cellNumY = Math.floor(input.mouse.y / height)
     if(typeof world[cellNumX] === "undefined"){
       world[cellNumX] = []
     }
     if(world[cellNumX][cellNumY] != inputColor){
       world[cellNumX][cellNumY] = inputColor
       worldPaint(cellNumX, cellNumY, inputColor)
     }
  }
  var ur,lr,ll,ul   //need to make a function for input
  if (input.controls.up){
    ur = ur||[player1.x+player1.width/2,player1.y-player1.height/4]
    ul = ul||[player1.x-player1.width/2,player1.y-player1.height/4]
    var posY = player1.y - player1.height /4, offX = player1.width/2
    var speed = player1.baseSpeed + (input.controls.roll ? height: 0)
    if (world[ Math.floor((player1.x-offX) / width)][Math.floor(posY / height)-1] !== "red"
     && world[ Math.floor((player1.x+offX) / width)][Math.floor(posY / height)-1] !== "red"){ // movement check
      player1.y -= speed // need to make a setTimeout for roll
    }
    else if (posY % height !==0 && posY % height - speed > 0){
      player1.y -= speed
    }
    else player1.y -= posY % height
  }

  if (input.controls.down){
    lr = lr||[player1.x+player1.width/2,player1.y]
    ll = ll||[player1.x-player1.width/2,player1.y]
    var posY = player1.y, offX = player1.width/2
    if (world[ Math.floor((player1.x-offX) / width)][Math.floor(posY / height)+1] !== "red"
     && world[ Math.floor((player1.x+offX) / width)][Math.floor(posY / height)+1] !== "red"){ // movement check
      player1.y += player1.baseSpeed + (input.controls.roll ? height: 0)
    }
    else if (posY % height !==0 && posY % height + player1.baseSpeed < height){
      player1.y += player1.baseSpeed
    }
    else player1.y += height - posY % height - 1
  }

  if (input.controls.left){
    ul = ul||[player1.x-player1.width/2,player1.y-player1.height/4]
    ll = ll||[player1.x-player1.width/2,player1.y]
    var posX = player1.x - player1.width /2, offY = player1.y - player1.height /4
    if (world[ Math.floor(posX / width)-1][Math.floor(player1.y / height)] !== "red"
     && world[ Math.floor(posX / width)-1][Math.floor(offY / height)] !== "red"){ // movement check
      player1.x -= player1.baseSpeed + (input.controls.roll ? width: 0)
    }
    else if (posX % width !==0 && posX % width - player1.baseSpeed > 0 ){
      player1.x -= player1.baseSpeed
    }
    else player1.x -= posX % width
  }

  if (input.controls.right){
    ur = ur||[player1.x+player1.width/2,player1.y-player1.height/4]
    lr = lr||[player1.x+player1.width/2,player1.y]
    var posX = player1.x + player1.width /2, offY = player1.y - player1.height /4
    if (world[ Math.floor(posX / width)+1][Math.floor(player1.y / height)] !== "red"
     && world[ Math.floor(posX / width)+1][Math.floor(offY / height)] !== "red"){ // movement check
      player1.x += player1.baseSpeed + (input.controls.roll ? width: 0)
    }
    else if (posX % width !==0 && posX % width + player1.baseSpeed < width ){
      player1.x += player1.baseSpeed
    }
    else player1.x += width - posX % width -1
  }
}

var player1 = {width: width * .9, height: height * 2, x: gridWidth/2 , y: gridHeight/2 , baseSpeed:6 , roll: 0 }  //player1 Atributes
function drawCharacter(){
  ctx.fillStyle = "blue"
  ctx.fillRect(player1.x - player1.width / 2 , player1.y - player1.height , player1.width, player1.height)
  ctx.fillStyle = "purple"
  ctx.fillRect(player1.x - player1.width / 2 , player1.y - player1.height/4 , player1.width, player1.height/4)
}
var timer = setInterval( update, 50)

function draw (){
  //background
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,gridWidth,gridHeight)
  for (var x = 0 ; x < cells ; x++){
  for ( var y = 0 ; y < cells ; y++){ //paint the world
    if (world[x]&&world[x][y]){
    ctx.fillStyle = world[x][y]
    ctx.fillRect(x * width, y * height, width, height )
    }
  }
}
  //mouse tracker image
  ctx.beginPath()
  ctx.arc(input.mouse.x, input.mouse.y, 10, 0, Math.PI*2, true)
  ctx.fillStyle = inputColor
  ctx.fill()
  ctx.beginPath()
  ctx.arc(input.mouse.x, input.mouse.y, 15, 0, Math.PI*2, true)
  ctx.strokeStyle = "black"
  ctx.stroke()

  //grid
  ctx.beginPath()
  ctx.strokeStyle = "#666666"
  for(var i = 1 ; i < cells; i++){
  ctx.moveTo(width * i, 0)
  ctx.lineTo(width * i, gridHeight)
  ctx.moveTo(0,height * i)
  ctx.lineTo(gridWidth, height * i )
  }
  ctx.stroke()

  drawCharacter()

  //mouse tracker fill
/*ctx.fillStyle = inputColor//"#75d1c7"
var cellNumX = Math.floor(input.mouse.x / width)
var cellNumY = Math.floor(input.mouse.y / height)
ctx.fillRect(cellNumX * width, cellNumY * height, width, height )
*/
requestAnimationFrame(draw)


}
function worldPaint(cellNumX, cellNumY, inputColor){
  var load = new XMLHttpRequest();
  load.onreadystatechange = function(){
    if(load.readyState == XMLHttpRequest.DONE){
      if (load.status == 200){
        //world = JSON.parse(load.responseText)

      }
    }
  }
  load.open("post","world.php")
  load.setRequestHeader("Content-type", "application/x-www-form-urlencoded" )
  load.send("action=paint&x="+cellNumX+"&y="+cellNumY+"&colour="+inputColor)
}

var load = new XMLHttpRequest();
load.onreadystatechange = function(){
  if(load.readyState == XMLHttpRequest.DONE){
    if (load.status == 200){
      world = JSON.parse(load.responseText)
      draw()
    }
  }
}
load.open("post","world.php")
load.send()
