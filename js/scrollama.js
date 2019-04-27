// using d3 for convenience, and storing a selected elements
var main, scrolly, figure, article, step;

// initialize the scrollama
var scroller

var dayCounts

var monthTotal = 1920889 //total number of citibikes, yellowcabs and rideshares taken in the immediate vicinity of GCT or TSQ in March, 2018 
var monthlyDivisor = 1000 //will make each dot represent 1920.889 New yorkers 

var circles //circles


d3.json("./data/day_counts_march_json.json", function(error,json) {
	if (error) return console.log("Error loading data")
	//console.log(json)
}).then(function(data){
	dayCounts = data
	startup()
})





function startup(){
	$(document).ready(function () {

		main = d3.select('main')
		scrolly = main.select('#scrolly');
		figure = scrolly.select('figure');
		article = scrolly.select('article');
		step = article.selectAll('.step');
	
		scroller = scrollama();
		init();
		
	
	
		buildChart(dayCounts,figure)
	
	})

}



function buildChart(smallData,chart) {
	

	var svg = chart.append("svg")
 		.attr("width", "100%")
		.attr("height", "1600px")
		.style("background-color", "lightgrey")
	
		
	var circleHomes = svg.append("g").attr("id","circleGroup")
	
	circleHomes.attr("transform", `translate(100,40)`)
		
	
	console.log(79%79)
	
	var cx = 0
	var cy = 0
	for(i = 1; i <= 1000; i++){
		//whenever i%79 = 0, it signals a new row 
		circleHomes.append("circle").attr("cx", cx).attr("cy", cy).attr("r",3).style("fill","red")
		
		cx = cx + 7
		if (i%100 == 0){
			cx = 0;
			cy = cy + 6;
		}		
		
	}
	
	circles = circleHomes.selectAll("circle")
									// .data(smallData)
                  // .enter()
                  // .append("circle")
                  // .attr("cx", -10)
                  // .attr("cy", -10)
                  // .attr("r", 0)
                  // .style("fill", "red")
		 
	// circles.transition()
  //                 .delay(function(d,i){  
  //                   return 10*i})
  //                 .ease(d3.easeExpOut)
  //                 .attr("r", 3)
  //                 .attr("cy", function (d, i) { 
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
	

	return svg.node()
}




	// generic window resize listener event
	function handleResize() {
		// 1. update height of step elements
		var stepH = Math.floor(window.innerHeight * 0.75);
		step.style('height', stepH + 'px');

		var figureHeight = window.innerHeight / 2
		var figureMarginTop = (window.innerHeight - figureHeight) / 2  

		figure
			.style('height', figureHeight + 'px')
			.style('top', figureMarginTop + 'px');


		// 3. tell scrollama to update new element dimensions
		scroller.resize();
	}

// scrollama event handlers
function handleStepEnter(response) {
	console.log(response.index)
	// response = { element, direction, index }
	if (response.index == 0 && response.direction == "down"){
		//colorDots(circles)
	}
	else if (response.index == 1 && response.direction == "down"){
		//boxDots(circles)
	}




	// add color to current step only
	step.classed('is-active', function (d, i) {
		return i === response.index;
	})

	// update graphic based on step
	figure.select('p').text(response.index + 1);
}


function setupStickyfill() {
	d3.selectAll('.sticky').each(function () {
		Stickyfill.add(this);
	});
}


// kick-off code to run once on load
function init() {
    // 1. call a resize on load to update width/height/position of elements
	handleResize();

	setupStickyfill();

	// 2. setup the scrollama instance
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller.setup({
		step: '#scrolly article .step',
		offset: 0.5,
		debug: true,
	})
	.onStepEnter(handleStepEnter)
	
		//.onContainerEnter(handleContainerEnter)
		//.onContainerExit(handleContainerExit);

	// setup resize event
	window.addEventListener('resize', handleResize);

}

