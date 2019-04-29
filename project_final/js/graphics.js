date = d3.timeParse("%Y-%m-%d") //global function for turning date string into d3 datetime



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