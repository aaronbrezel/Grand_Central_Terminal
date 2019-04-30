function flopCircles(circles){
  circles.transition()
    .delay(function(d,i){
      return 10*i
    })
    .ease(d3.easeExpOut)
    .attr("cx", function(d,i){
      var cx = (i%50) * 10
      return cx
    })
    .attr("cy", function(d,i){
      var cy = Math.floor(i/50) * 10
      return cy
    })
    .attr("r", 4)
}

function flopSquares(squares){
  squares.transition()
  .delay(function(d,i){
    return 6*i
  })
  .ease(d3.easeExpOut)
  .attr("x", function(d,i){
    var x = (i%50) * 10
    return x
  })
  .attr("y", function(d,i){
    var y = Math.floor(i/50) * 10
    return y
  })
  .attr("width", 8)
  .attr("height", 8)
}

function colorSquares(squares){
  
  squares.transition()
  .style("fill", function(d,i){
    if(d.mode == "FHV"){
      return "g "
    }

  })
}



function boxCircles(circles){
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
    var cx = (i%50) * 10
      return cx
  })
  .attr("cy", function(d,i){
    var cy = Math.floor(i/50) * 10
    return cy
  })
  .attr("r", 4)

}


function boxSquares(squares){
  var currDate = "2018-03-01"
  var index = 0
  squares.transition()
  .delay(function(d,i){
    if (d.day != currDate){
      currDate = d.day
      index = index+1
    }
    return (100*index)
  })
  .attr("x", function(d,i){
    var x = (i%50) * 10
    return x
  })
  .attr("y", function(d,i){
    var y = Math.floor(i/50) * 10
    return y
  })
  .attr("width", 8)
  .attr("height", 8)
}



function graphCircles(circles){
  
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
    var cx = x(date(d.day)) -5
    return cx
  })
  .attr("cy",function(d,i){
    if (d.day != currDateCY){
      currDateCY = d.day
      indexCY = 0
    }
    
    var cy = 175 + y(22.5+indexCY*59) //175 represents the top margin of where the graph starts this is technically declared in graphis.js but I didn't want to deal with 
    indexCY++
    return cy
  })
  .attr("r", 8)
}

function graphSquares(squares){
  var currDateCY = "2018-03-01"
  var currDateDelay = "2018-03-01"
  var indexCY = 0
  var indexDelay = 0
  squares.transition()
  .delay(function(d,i){
    if (d.day != currDateDelay){
      currDateDelay = d.day
      indexDelay = indexDelay+1
    }
    return (100*indexDelay)
  })
  .attr("x", function(d,i){
    var cx = x2(date(d.day)) + 2
    return cx
  })
  .attr("y", function(d,i){
    if (d.day != currDateCY){
      currDateCY = d.day
      indexCY = 0
    }
    
    var cy = 166.5 + y2(indexCY*3917) //175 represents the top margin of where the graph starts this is technically declared in graphis.js but I didn't want to deal with 
    indexCY++
    return cy
  })
  .attr("width", 8)
  .attr("height", 8)

}