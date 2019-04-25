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