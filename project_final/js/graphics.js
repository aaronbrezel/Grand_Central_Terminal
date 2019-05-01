date = d3.timeParse("%Y-%m-%d") //global function for turning date string into d3 datetime

var threeCircles//scaled circles
var totalCounts = [43,1813,2946] //the proportion of citibikes                                  //to FVH to cabs

function makeCircles(dataArray,figure)
{   
    //create the canvas
    var svg = figure.append("svg")
                    .attr("id","infoSVG")
                    .attr("class", "flex-container")
    
    //create a group for all the circles aand add to the canvas
    var scaledCircles = svg.append("g").attr("id","circleGroup") 
    
    //when encoding values to the area of a circle it is best //to use the Sqrt scale  
    var sqrtScale = d3.scaleSqrt()
                    .range([0, 150])
                    .domain([0, 2950])
    
    //mapping each data point to a color
    var quantileScale = d3.scaleQuantile()
                          .domain(totalCounts)
                          .range(['blue', 'green', "rgb(255,232,60)"]);
    
    //tooltip
    /*var tooltip = d3.select("#infoSVG").append("text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .style("position", "absolute")
                    .style("background-color", "white")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
	                .text("a simple tooltip")*/
    
    
    //creating the circles based on the data and tooltip
    var finalCircles = scaledCircles.selectAll("circle").data(dataArray)
                            .enter()
                            .append("circle")
                            .attr("cx",function(d,i){
                                var value
                                if(i==0)
                                    {value = 100}
                                else if(i==1)
                                    {value = (i+1) * 150}
                                else
                                    {value = (i+1) * 200}
                                return value})
                            .attr("cy", function(d){
                                var a = sqrtScale(d)
                                return 300-a
                            })
                            .attr("r", function(d){
                                var a = sqrtScale(d)
                                return a
                            })
                            .style("fill",function(d){
                                var b = quantileScale(d)
                                return b})
    
    var scaleLines = d3.select("#infoSVG").append("line")
                        .attr("id","line")
                         .attr("x1", 5)
                         .attr("y1", 300)
                         .attr("x2", 800)
                         .attr("y2", 300)
                         .style("stroke-width",2)
                         .style("stroke-linecap","round")
    
    var scaleLines = d3.select("#infoSVG").append("line")
                         .attr("x1", 5)
                         .attr("y1", 0)
                         .attr("x2", 5)
                         .attr("y2", 300)
                        .attr("id","line")
                         .style("stroke-linecap","round")
                         
    var scaleLines = d3.select("#infoSVG").append("line")
                         .attr("x1", 5)
                         .attr("y1", 0)
                         .attr("x2", 600)
                         .attr("y2", 0)
                        .attr("id","line")
                         .style("stroke-linecap","round")
                         .style("stroke-dasharray","5,5")
    
      var scaleLines = d3.select("#infoSVG").append("line")
                         .attr("x1", 5)
                         .attr("y1", 65)
                         .attr("x2", 310)
                         .attr("y2", 63)
                         .attr("id","line")
                         .style("stroke-linecap","round")
                         .style("stroke-dasharray","5,5")
      var scaleLines = d3.select("#infoSVG").append("line")
                         .attr("x1", 5)
                         .attr("y1", 263)
                         .attr("x2", 106)
                         .attr("y2", 263)
                         .attr("id","line")
                         .style("stroke-linecap","round")
                         .style("stroke-dasharray","5,5")
      
    var labels = d3.select("#infoSVG").append("text")                                   .text("Citibikes")
                                .attr("id","labels")
                                .attr("x",40)
                                .attr("y",325)
                                
    
    var labels = d3.select("#infoSVG").append("text")                                   .text("For-Hire-Vehicles")
                                .attr("id","labels")
                                .attr("x",190)
                                .attr("y",325)
    
    var labels = d3.select("#infoSVG").append("text")                                   .text("Yellow Cabs")
                                .attr("id","labels")
                                .attr("x",520)
                                .attr("y",325)
    
    var information = d3.select("#infoSVG").append("text")                             .text("In the month of March")
                                .attr("id","labels")
                                .attr("x",820)
                                .attr("y",25) 
    
    var information = d3.select("#infoSVG").append("text")                             .text("There were: ")
                                .attr("id","labels")
                                .attr("x",810)
                                .attr("y",55)
                                .style("font-family","highwaygothic")
    
    var information = d3.select("#infoSVG").append("text")                             .text("17,228 citibike trips")
                                .attr("id","labels")
                                .attr("x",850)
                                .attr("y",95)
                                .style("fill","blue")
    
    var information = d3.select("#infoSVG").append("text")                             .text("725,386 FHV rides")
                                .attr("id","labels")
                                .attr("x",850)
                                .attr("y",145)
                                .style("fill","green")
    
    var information = d3.select("#infoSVG").append("text")                             .text("1,117,422 yellow cab trips")
                                .attr("id","labels")
                                .attr("x",850)
                                .attr("y",195)
                        .style("fill","rgb(255,232,60)")
    
    var information = d3.select("#infoSVG").append("text")                             .text("The vast difference in numbers meant that")
                                .attr("id","labels")
                                .attr("x",810)
                                .attr("y",245)
                                .style("font-family","highwaygothic")
                                .style("fill","white")
    
    var information = d3.select("#infoSVG").append("text")                             .text("a single dot couldn't be used to represent")
                                .attr("id","labels")
                                .attr("x",810)
                                .attr("y",270)
                                .style("font-family","highwaygothic")
                                .style("fill","white")
    var information = d3.select("#infoSVG").append("text")                             .text("all three modes of transport")
                                .attr("id","labels")
                                .attr("x",810)
                                .attr("y",295)
                                .style("font-family","highwaygothic")
                                .style("fill","white")
    
    
    return finalCircles
    
}

function buildCircles(dataArray,group){
  var circles = group.selectAll("circle")
    .data(dataArray)
    .enter()
    .append("circle")
    .attr("cx", function(d,i){
      var cx = (i%50) * 10
      return cx
    })
    .attr("cy", function(d,i){
      var cy = Math.floor(i/50) * 10
      return cy
    })
    .attr("r", 4)
    .style("fill", "blue")

    return circles
}

function buildSquares(dataArray,group){
  var squares = group.selectAll("rect")
  .data(dataArray)
  .enter()
  .append("rect")
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
  .style("fill", "red")
}



function buildBikeChart(bikes,figure){

  bikeSVGMargins = {top: 25, right: 25, bottom: 25, left: 900}

  var svg = figure.append("svg")
    .attr("transform", `translate(${bikeSVGMargins.left},${bikeSVGMargins.top})`)
    .attr("width", `${550}`)
    .attr("height", `${600-bikeSVGMargins.top-bikeSVGMargins.bottom}`)
    .style("background-color", "red")
    .style("opacity", 0.5)

  var circlesMargin = {top: 5, right: 5, bottom: 10, left: 5}
  var circleHomes = svg.append("g").attr("id","circleGroup")
    .attr("transform", `translate(${circlesMargin.left},${circlesMargin.top})`)

  var circles = buildCircles(bikes,circleHomes)

  console.log(bikes)

  //creates the scale for the x axis
  x = d3.scaleTime().range([0,550])
  .domain(d3.extent(bikes.map(d => date(d.day))))
  //create the x axis using x
  xAxis = d3.axisBottom(x)

  return circles
}

function buildCarChart(cars,figure){

  cabSVGMargins = {top: 25, right: 25, bottom: 25, left: 25}

  var svg = figure.append("svg")
    .attr("transform", `translate(${cabSVGMargins.left-555},${cabSVGMargins.top})`)
    .attr("width", `${550}`)
    .attr("height", `${600-bikeSVGMargins.top-bikeSVGMargins.bottom}`)
    .style("background-color", "blue")
    .style("opacity", 0.5)

    var squaresMargin = {top: 5, right: 5, bottom: 10, left: 5}
    var squareHomes = svg.append("g").attr("id","squareGroup")
      .attr("transform", `translate(${squaresMargin.left},${squaresMargin.top})`)

  var squares = buildSquares(cars,squareHomes)  

  return squares
}