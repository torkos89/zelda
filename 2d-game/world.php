<?php

//ini_set("display_errors", 1);
$db = new sqlite3("database");
$db -> query("create table if not exists world(world_x int,world_y int,world_colour varchar(1000))");
$result = $db->query("select count(*)rm from world");
if($result){
  if($row = $result->fetchArray(SQLITE3_NUM)){
    if($row[0]===0)fillTable($db);
  }
}
if(isset($_POST["action"])){
  switch($_POST["action"]){
    case "paint": $statement = $db -> prepare("select count(*) ct from world where world_x = ? and world_y = ?");
    $statement->bindValue(1,$_POST["x"],SQLITE3_INTEGER);
    $statement->bindValue(2,$_POST["y"],SQLITE3_INTEGER);
    $result = $statement->execute();
    if ($result){
      if($row = $result->fetchArray(SQLITE3_NUM)){
        $result-> finalize();
        $statement-> close();
        if($row[0]===1){
          $statement = $db -> prepare("update world set world_colour = ? where world_x = ? and world_y = ?");
          $statement->bindValue(1,$_POST["colour"],SQLITE3_TEXT);
          $statement->bindValue(2,$_POST["x"],SQLITE3_INTEGER);
          $statement->bindValue(3,$_POST["y"],SQLITE3_INTEGER);
          $statement->execute();
          $statement->close();
        }
        else{
          $statement = $db -> prepare("insert into world(world_colour, world_x, world_y)values(?,?,?)");
          $statement->bindValue(1,$_POST["colour"],SQLITE3_TEXT);
          $statement->bindValue(2,$_POST["x"],SQLITE3_INTEGER);
          $statement->bindValue(3,$_POST["y"],SQLITE3_INTEGER);
          $statement->execute();
          $statement->close();
        }
      }
    }
  }
}
else{
  $result = $db->query("select world_x, world_y, world_colour from world");
  if($result){
    if($row = $result->fetchArray(SQLITE3_NUM)){
      $world = array();
      do{ //$cells[]=array("x"=>$row[0] , "y"=>$row[1] , "colour"=>$row[2]);
        if(!isset($world[$row[0]]))$world[$row[0]] = array();
        $world[$row[0]][$row[1]] = $row[2]; //$world[x][y]
      } while($row = $result->fetchArray(SQLITE3_NUM));
      echo json_encode($world);
    }
  }
}
function fillTable($db){
  $world = array(); // create empty array
  $cells = 16; // amount of cells (rows and columns)
  $qry = "insert into world(world_x,world_y,world_colour)values"; // partial string
  for ($x = 0 ; $x < $cells; $x++){
    $cellarr = array();
    for ($y = 0; $y < $cells; $y++){      //loops
      $cellarr[] = "($x,$y,'#5cc45f')";
    }
    $world[] = implode(",",$cellarr); // stamps string into world
  }
  $qry .= implode(",",$world);
  $db -> exec($qry);     // hands sql the php string to execute
}
