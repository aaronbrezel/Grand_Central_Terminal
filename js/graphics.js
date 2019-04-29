function buildCircles(circleArray, circleHomes){
    var circles = circleHomes.selectAll("circle").data(circleArray)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d,i){
			            var cx = (i%100) * 9
			            return cx
		            })
                    .attr("cy", function(d,i){
		                cy = Math.floor(i/100) * 10
			            return cy
		            })
                    .attr("r", 3)
                    .style("fill", "blue")
    return circles
}

// function buildDate(string){
//     var date = d3.timeParse("%Y-%m-%d")
//     return date
// }
date = d3.timeParse("%Y-%m-%d")


function buildChart(circleArray,figure){

    ////////////////////////////////////////////////////////////////
    // Creates SVG
    ////////////////////////////////////////////////////////////////
    var svg = figure.append("svg")
        .attr("width", "1000px")
        .attr("height", "1600px")
        .style("background-color", "lightgrey")
        
          
    ////////////////////////////////////////////////////////////////
    // Creates groups that we will apppend all circles to and the sebsquent graph group
    ////////////////////////////////////////////////////////////////
    var circleHomes = svg.append("g").attr("id","circleGroup")
    var graphHomes = svg.append("g").attr("id","graphGroup")    
    

    ////////////////////////////////////////////////////////////////////
    // establishes margin of each group on the SVG and places them within the svg
    //////////////////////////////////////////////////////////////////
    var circlesMargin = {top: 50, right: 50, bottom: 1200, left: 50} //There are likely errors with top and bottom margins. Will fix later
    var graphMargin = {top: 500, right: 50, bottom: 500, left: 50}
    
    circleHomes.attr("transform", `translate(${circlesMargin.left},${circlesMargin.top})`)
    graphHomes.attr("transform", `translate(${graphMargin.left+10},${graphMargin.top})`)        



    /////////////////////////////////////////////////////////////////////
    // Function that creates all of the circles and appends them to the circles group
    // Circles are now accessable at all times in the scrollama.js file with the 
    // variable "circles"
    /////////////////////////////////////////////////////////////////////
    circles = buildCircles(circleArray,circleHomes)
    
    //////////////////////////////////////////////////////////////////////
    // Set dimension variables
    //////////////////////////////////////////////////////////////////////
    var width = 1000 - circlesMargin.left - circlesMargin.right
    var circlesGroupHeight = 1600 - circlesMargin.top - circlesMargin.bottom
    var graphHeight = 1600 - graphMargin.top - graphMargin.bottom 

    //circleHomes.attr("height", circlesGroupHeight)

    //creates the scale for the x axis
    x = d3.scaleTime().range([0,width-200])
    .domain(d3.extent(circleArray.map(d => date(d.day))))
    //create the x axis using x
    xAxis = d3.axisBottom(x)


    y = d3.scaleLinear().range([graphHeight, 0]).domain([0,1050]) //1015 is the greatest number of bikes taken in a day. This happens to be March 1st. This was calculated by looking at bike_counts_by_day_march.json
    yAxis = d3.axisLeft(y)
    
    svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(${graphMargin.left+10},${graphMargin.top+graphHeight})`)
    .call(xAxis);

    svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
    .call(yAxis)

    
             
        // circles.transition()
      //                 .delay(function(d,i){  
      //                   return 10*i})
      //                 .ease(d3.easeExpOut)
      //                 .attr("r", 3)
      //                 .attr("cy", function (d,i) { 
      //                   var row = Math.ceil((i+1)/100)
      //                   var cy = row * 10 
      //                   return cy })
      //                 .attr("cx", function (d, i) {    
      //                   var col = (i+1)%100
      //                   if (col == 0){
      //                   col = 100
      //                   } //provides a number between 1 and 100       
      //                   if (col == 1){
      //                     var cx = col*3+2; 
      //                   }
      //                   else {
      //                   var cx = col*8 -3
      //                   }
      //                   return cx })
      //                 .on("end", function(d,i) {
                                                
        // 										if (i+1 == 474){
      //                       console.log("END TRANSITION")
        // 										}
                                                
                            
      //                  })
        
    
    return circles
    
    
}