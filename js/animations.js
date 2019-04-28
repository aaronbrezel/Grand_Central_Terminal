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

function graphDots(circles,citiBikesByDay){
  circles.transition()
  .delay(function(d,i){return (3*i)})
  .attr("cx", function(d,i){
    var cx = x(date(d.day)) + 10
    

    return cx
  })
  .attr("cy",function(d,i){
    var cy = y(0)

    return cy
  })
  .attr("r", function(d,i){
    r = y(4)
    
    r = 3
    return r
  })
}