date = d3.timeParse("%Y-%m-%d") //global function for turning date string into d3 datetime



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
    .attr("transform", `translate(${bikeSVGMargins.left},${bikeSVGMargins.top})`)
    .attr("width", `${565}`)
    .attr("height", `${600-bikeSVGMargins.top-bikeSVGMargins.bottom}`)
    .style("background-color", "grey")
    .style("opacity", 0.5)

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

 

  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top + graphHeight})`)
    .call(xAxis);

    svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
    .call(yAxis)



  return circles
}

function buildCarChart(cars,figure){

  cabSVGMargins = {top: 5, right: 25, bottom: 5, left: 5}

  var svg = figure.append("svg")
    .attr("transform", `translate(${cabSVGMargins.left-565},${cabSVGMargins.top})`)
    .attr("width", `${565}`)
    .attr("height", `${600-bikeSVGMargins.top-bikeSVGMargins.bottom}`)
    .style("background-color", "grey")
    .style("opacity", 0.5)

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
 
   svg.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(${graphMargin.left},${graphMargin.top + graphHeight})`)
     .call(xAxis2);
 
     svg.append("g")
     .attr("class", "axis axis--y")
     .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
     .call(yAxis2)

  return squares
}