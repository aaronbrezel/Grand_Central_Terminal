date = d3.timeParse("%Y-%m-%d") //global function for turning date string into d3 datetime

var threeCircles//scaled circles
var totalCounts = [43,1813,2946] //the proportion of citibikes  

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

    var labels = d3.select("#infoSVG").append("text").text("Citibikes")
                                .attr("id","labels")
                                .attr("x",40)
                                .attr("y",325)


    var labels = d3.select("#infoSVG").append("text").text("For-Hire-Vehicles")
                                .attr("id","labels")
                                .attr("x",190)
                                .attr("y",325)

    var labels = d3.select("#infoSVG").append("text").text("Yellow Cabs")
                                .attr("id","labels")
                                .attr("x",520)
                                .attr("y",325)

    var information = d3.select("#infoSVG").append("text").text("In the month of March")
                                .attr("id","labels")
                                .attr("x",820)
                                .attr("y",25) 

    var information = d3.select("#infoSVG").append("text").text("There were: ")
                                .attr("id","labels")
                                .attr("x",805)
                                .attr("y",55)
                                .style("font-family","highwaygothic")

    var information = d3.select("#infoSVG").append("text").text("17,228 citibike trips")
                                .attr("id","labels")
                                .attr("x",850)
                                .attr("y",95)
                                .style("fill","blue")

    var information = d3.select("#infoSVG").append("text").text("752,222 FHV rides")
                                .attr("id","labels")
                                .attr("x",850)
                                .attr("y",145)
                                .style("fill","green")

    var information = d3.select("#infoSVG").append("text").text("1,178,439 yellow cab trips")
                                .attr("id","labels")
                                .attr("x",850)
                                .attr("y",195)
                        .style("fill","rgb(255,232,60)")

    var information = d3.select("#infoSVG").append("text").text("The vast difference in numbers meant that")
                                .attr("id","labels")
                                .attr("x",805)
                                .attr("y",245)
                                .style("font-family","highwaygothic")
                                .style("fill","white")

    var information = d3.select("#infoSVG").append("text").text("a single dot couldn't be used to represent")
                                .attr("id","labels")
                                .attr("x",805)
                                .attr("y",270)
                                .style("font-family","highwaygothic")
                                .style("fill","white")
    var information = d3.select("#infoSVG").append("text").text("all three modes of transport")
                                .attr("id","labels")
                                .attr("x",805)
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
    .attr("cx", -10)
    .attr("cy", -10)
    .attr("r", 0)
    .style("fill", "blue")

    return circles
}

function buildSquares(dataArray,group){
  var squares = group.selectAll("rect")
  .data(dataArray)
  .enter()
  .append("rect")
  .attr("x", -10)
  .attr("y", -10)
  .attr("width", 0)
  .attr("height", 0)
  .style("fill", "red")

  return squares
}




function buildBikeChart(bikes,figure){

  bikeSVGMargins = {top: 5, right: 25, bottom: 5, left: 900}

  var svg = figure.append("svg")
    .attr("class", "bikesSVG")
    .attr("transform", `translate(${bikeSVGMargins.left},${bikeSVGMargins.top})`)
    .attr("width", `${565}`)
    .attr("height", `${600-bikeSVGMargins.top-bikeSVGMargins.bottom}`)
    .style("opacity", 1)

  var circlesMargin = {top: 5, right: 5, bottom: 5, left: 40}
  var circleHomes = svg.append("g").attr("id","circleGroup")
    .attr("transform", `translate(${circlesMargin.left},${circlesMargin.top})`)

  var circles = buildCircles(bikes,circleHomes)

  
  var graphMargin = {top: 180, right: 5, bottom: 20, left: 35}
  var graphHeight = 590 - graphMargin.top - graphMargin.bottom
 

  //creates the scale for the x axis
  x = d3.scaleTime().range([0,495])
  .domain(d3.extent(bikes.map(d => date(d.day))))
  //create the x axis using x
  xAxis = d3.axisBottom(x)

  y = d3.scaleLinear().range([graphHeight, 0]).domain([0,1070]) //1015 is the greatest number of bikes taken in a day. This happens to be March 1st. This was calculated by looking at bike_counts_by_day_march.json
  yAxis = d3.axisLeft(y)

  tempY = d3.scaleLinear().range([graphHeight, 0]).domain([30,65])
  tempYAxis = d3.axisRight(tempY)

  bikeLine = d3.line().x(d => x(date(d.day))).y(d => tempY(d.temp))
 

  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top + graphHeight})`)
    .style("color","white")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
    .style("color","white")
    .call(yAxis)

  svg.append("g")
    .attr("class", "axis axis--y--temp")
    .attr("transform", `translate(${graphMargin.left+495},${graphMargin.top})`)
    .style("color","white")
    .call(tempYAxis)



  return circles
}

function buildCarChart(cars,figure){

  cabSVGMargins = {top: 5, right: 25, bottom: 5, left: 5}

  var svg = figure.append("svg")
    .attr("class", "carsSVG")
    .attr("transform", `translate(${cabSVGMargins.left-565},${cabSVGMargins.top})`)
    .attr("width", `${565}`)
    .attr("height", `${600-bikeSVGMargins.top-bikeSVGMargins.bottom}`)
    .style("opacity", 1)

    var squaresMargin = {top: 5, right: 5, bottom: 5, left: 40}
    var squareHomes = svg.append("g").attr("id","squareGroup")
      .attr("transform", `translate(${squaresMargin.left},${squaresMargin.top})`)

  var squares = buildSquares(cars,squareHomes) 
  

  var graphMargin = {top: 180, right: 5, bottom: 20, left: 45}
  var graphHeight = 590 - graphMargin.top - graphMargin.bottom

   //creates the scale for the x axis
   x2 = d3.scaleTime().range([0,495])
   .domain(d3.extent(cars.map(d => date(d.day))))
   //create the x axis using x
   xAxis2 = d3.axisBottom(x2)
 
   y2 = d3.scaleLinear().range([graphHeight, 0]).domain([0,80000]) //1015 is the greatest number of bikes taken in a day. This happens to be March 1st. This was calculated by looking at bike_counts_by_day_march.json
   yAxis2 = d3.axisLeft(y2)

  tempY2 = d3.scaleLinear().range([graphHeight, 0]).domain([30,65])
  tempYAxis2 = d3.axisRight(tempY2)

  carLine = d3.line().x(d => x(date(d.day))).y(d => tempY2(d.temp))
 
   svg.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(${graphMargin.left},${graphMargin.top + graphHeight})`)
     .style("color","white")
     .call(xAxis2);
 
     svg.append("g")
     .attr("class", "axis axis--y")
     .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
     .style("color","white")
     .call(yAxis2)

     svg.append("g")
    .attr("class", "axis axis--y--temp")
    .attr("transform", `translate(${graphMargin.left+495},${graphMargin.top})`)
    .style("color","white")
    .call(tempYAxis2)

  return squares
}