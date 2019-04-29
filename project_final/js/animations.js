function colorDots (circles){  
    circles.transition()
        .style("fill", function(d,i){
          if (Math.floor(i/100) == 0){
            return "blue"
          }
          else if (Math.floor(i/100) == 1 || Math.floor(i/100) == 2) {
            return "green"
          }
          else {
            return "orange"
          }
        })
}

function boxDots(circles){
    circles.transition()
        .delay(function(d,i){return (10*i)})
        .attr("cx", function (d,i){
          if (Math.floor(i/100) == 0){ //"Citibikes"
            var col = (i+1)%10;
            if (col == 0){
              col = 10
            }  
            if (col == 1){
              var cx = col*3+2; 
            }
            else {
              var cx = col*8 -3
            }
            return cx
          }
          else if (Math.floor(i/100) == 1 || Math.floor(i/100) == 2) { //"Subway"
            var col = (i+1)%10;
            if (col == 0){
              col = 10
            }  
            if (col == 1){
              var cx = col*3+2; 
            }
            else {
              var cx = col*8 -3
            }
            return cx + 300
          }
          else { //"Taxis"
            var col = (i+1)%10;
            if (col == 0){
              col = 10
            }  
            if (col == 1){
              var cx = col*3+2; 
            }
            else {
              var cx = col*8 -3
            }
            return cx + 600
          }
      })
      .attr("cy", function (d,i){ 
        if (Math.floor(i/100) == 0){ //"Citibikes"
            var row = Math.ceil((i+1)/10)
            var cy = (row * 10) + 200 
            return cy
          }
        else if (Math.floor(i/100) == 1 || Math.floor(i/100) == 2) { //"Subway"
          var row = Math.ceil((i-100+1)/10)
          var cy = (row * 10) + 200 
          return cy
        }
        else { //"Taxis"
          var row = Math.ceil((i-300+1)/10)
            var cy = (row * 10) + 200 
            return cy
        }
      })
}


function returnBlob(circles){
  var currDate = "2018-03-01"
  var index = 0
  circles.transition()
  .delay(function(d,i){
    if (d.day != currDate){
      currDate = d.day
      index = index+1
    }
    return (100*index)
  })
  .attr("cx", function(d,i){
    var cx = (i%100) * 9
    return cx
  })
  .attr("cy", function(d,i){
    var cy = Math.floor(i/100) * 10
    return cy
  })
  .attr("r", 3)

}


function graphDots(circles,citiBikesByDay){

  var currDateCY = "2018-03-01"
  var currDateDelay = "2018-03-01"
  var indexCY = 0
  var indexDelay = 0
  circles.transition()
  .delay(function(d,i){
    if (d.day != currDateDelay){
      currDateDelay = d.day
      indexDelay = indexDelay+1
    }
    return (100*indexDelay)
  })
  .attr("cx", function(d,i){
    var cx = x(date(d.day)) + 10
    return cx
  })
  .attr("cy",function(d,i){
    if (d.day != currDateCY){
      currDateCY = d.day
      indexCY = 0
    }
   
    var cy = 450 + y(2+(indexCY*4)) //450 represents the top margin of where the graph starts this is technically declared in graphis.js but I didn't want to deal with 
    indexCY++
    return cy
  })
  .attr("r", 2)
}