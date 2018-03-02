var form = document.getElementById("controls").children[0]
var inputColor = "red"
 form.onsubmit = function(e){ e.preventDefault(); return false}
 form.children[0].addEventListener("change", function(){ inputColor = this.value})
var grid = document.getElementById('gridMap')
var ctx = grid.getContext('2d');
var gridHeight = grid.offsetHeight ;
var gridWidth = grid.offsetHeight ;
var gridOffset = grid.offsetLeft

var input = {mouse: {x:0, y:0, leftClick:0, rightClick:0 },
             controls: {up:0, down:0, left:0, right:0 ,roll:0},
             keyboard: {87:"up", 65:"left", 83:"down", 115: "down", 68:"right"}
            }
document.body.addEventListener('keydown', function(e){
  //if (input.mouse.keyboard)
  if(typeof input.keyboard[e.which] === "undefined"){
    alert("Unknown Input" + String.fromCharCode(e.keyCode))
  }
  else{input.controls[input.keyboard[e.which]] = 1 }
})
document.body.addEventListener('keyup', function(e){
  if(typeof input.keyboard[e.which] !== "undefined"){
    input.controls[input.keyboard[e.which]] = 0 }
})
grid.addEventListener('mousemove',function(e){
  input.mouse.x = e.clientX - gridOffset
  input.mouse.y = e.clientY
  if (input.mouse.leftClick){
     var cellNumX = Math.floor(input.mouse.x / width)
     var cellNumY = Math.floor(input.mouse.y / height)
     world[cellNumX][cellNumY]= inputColor
  }
})
grid.addEventListener("mousedown", function(){input.mouse.leftClick = 1
    var cellNumX = Math.floor(input.mouse.x / width)
    var cellNumY = Math.floor(input.mouse.y / height)
    world[cellNumX][cellNumY]= inputColor
})
grid.addEventListener("mouseup", function(){input.mouse.leftClick = 0})
    var cells = 18, width = gridWidth/cells , height = gridHeight/cells

    var world = []
      for (var x = 0 ; x < cells; x++){
        world.push([])
      for (var y = 0; y < cells; y++){
        world[x].push("#5cc45f")

      }
    }
//changes player location
function update(){
  function position(axis, dim){
    return player1.axis + player1.dim /2 % dim
  }
  if (input.controls.up){

    var posY = player1.y - player1.height /4
    if (posY % height !== 0 && posY % height - player1.baseSpeed > 0){  // not an edge collision
      player1.y -= player1.baseSpeed
    }
    else {                                            //edge collision "test"
      if (posY % height === 0 ){
        var cellNumX = Math.floor(player1.x / width)
        var cellNumY = Math.floor(posY / height)-1
        if (world[cellNumX][cellNumY] !== "red"){
          player1.y -= player1.baseSpeed
        }
      }
      else {
        var cellNumX = Math.floor(player1.x / width)
        var cellNumY = Math.floor(posY / height)-1
        if (world[cellNumX][cellNumY] !== "red"){
          player1.y -= player1.baseSpeed
        }
        else player1.y -= posY % height
      }
    }

  if (input.controls.down){
    if (player1.y % height !== 0 && player1.y % height + player1.baseSpeed < height){  // not an edge collision
      player1.y += player1.baseSpeed
    }
    else {                                            //edge collision "test"
      if (player1.y % height === 0 ){
        var cellNumX = Math.floor(player1.x / width)
        var cellNumY = Math.floor(player1.y / height)
        if (world[cellNumX][cellNumY] !== "red"){
          player1.y += player1.baseSpeed
        }
      }
      else {
        var cellNumX = Math.floor(player1.x / width)
        var cellNumY = Math.floor(player1.y / height)+1
        if (world[cellNumX][cellNumY] !== "red"){
          player1.y += player1.baseSpeed
        }
        else player1.y += height - player1.y % height
      }
    }
  }
  if (input.controls.left){
    var posX = player1.x + player1.width /2
    if (posX % width !== 0 && posX % width + player1.baseSpeed < width){  // not an edge collision
      player1.x += player1.baseSpeed
    }
    else {                                            //edge collision "test"
      if (posX % width === 0 ){
        var cellNumX = Math.floor(posX / width)
        var cellNumY = Math.floor(player1.y / height)
        if (world[cellNumX][cellNumY] !== "red"){
          player1.x += player1.baseSpeed
        }
      }
      else {
        var cellNumX = Math.floor(posX / width)+1
        var cellNumY = Math.floor(player1.y / height)
        if (world[cellNumX][cellNumY] !== "red"){
          player1.x += player1.baseSpeed
        }
        else player1.x += width - posX % width
      }
    }
  }


}

  if (input.controls.right){
    var posX = player1.x + player1.width /2
    if (posX % width !== 0 && posX % width + player1.baseSpeed < width){  // not an edge collision
      player1.x += player1.baseSpeed
    }
    else {                                            //edge collision "test"
      if (posX % width === 0 ){
        var cellNumX = Math.floor(posX / width)
        var cellNumY = Math.floor(player1.y / height)
        if (world[cellNumX][cellNumY] !== "red"){
          player1.x += player1.baseSpeed
        }
      }
      else {
        var cellNumX = Math.floor(posX / width)+1
        var cellNumY = Math.floor(player1.y / height)
        if (world[cellNumX][cellNumY] !== "red"){
          player1.x += player1.baseSpeed
        }
        else player1.x += width - posX % width
      }
    }
  }




var player1 = {width: width * .9, height: height * 2, x: gridWidth/2 , y: gridHeight/2 , baseSpeed:6 }  //player1 Atributes
function drawCharacter(){
  ctx.fillStyle = "blue"
  ctx.fillRect(player1.x - player1.width / 2 , player1.y - player1.height , player1.width, player1.height)
}
var timer = setInterval( update, 50)

function draw (){
  //background
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,gridWidth,gridHeight)
//paint the world
  for (var x = 0 ; x < cells ; x++){
  for ( var y = 0 ; y < cells ; y++){
    ctx.fillStyle = world[x][y]
    ctx.fillRect(x * width, y * height, width, height )
  }
}
  //mouse tracker image
  ctx.beginPath()
  ctx.arc(input.mouse.x, input.mouse.y, 10, 0, Math.PI*2, true)
  ctx.fillStyle = inputColor
  ctx.fill()

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
draw()
