// using d3 for convenience, and storing a selected elements
var main, scrolly, figure, article, step;

// initialize the scrollama
var scroller

var dayCounts //variable for Json with the individual counts of each transportation method by day
var criticalTotals//Json with total counts. Total citibikes, total FHV(and Uber, etc.), total yellowcabs and total of everything

var monthTotal = 1920889 //total number of citibikes, yellowcabs and rideshares taken in the immediate vicinity of GCT or TSQ in March, 2018 
var monthlyDivisor = 1000 //will make each dot represent 1920.889 New yorkers 

var circles //circles


var citiBikesByDay
var citiBikesByDayTotal
var circleArray

// d3.json("./data/critical_totals_march_json.json", function(error,json) {
// 	if (error) return console.log("Error loading data")
// 	//console.log(json)
// }).then(function(data){
// 	criticalTotals = data
// 	startup()
// })

d3.json("./data/bike_counts_by_day_march.json", function(error,json) {
	if (error) return console.log("Error loading data")
	//console.log(json)
}).then(function(data){
	citiBikesByDay = data
	citiBikesByDayTotal = citiBikesByDay["March"]
	circleArray = createCircleArray(citiBikesByDay)
	startup()
})


function createCircleArray(citiBikes){
	var ArrayInProgress = []
	total = 0
	for (var key in citiBikes) {
		if (key == "March"){
			break
		}
		for(i=0; i < Math.round(citiBikes[key]/4); i++){
			ArrayInProgress.push({"day" : key})
			
		}
	}
	return ArrayInProgress.slice(0,4307)
}




function startup(){
	$(document).ready(function () {

		main = d3.select('main')
		scrolly = main.select('#scrolly');
		figure = scrolly.select('figure');
		article = scrolly.select('article');
		step = article.selectAll('.step');
	
		scroller = scrollama();
		init();
		
	
		circles =	buildChart(circleArray,figure)
	
	})

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
	//console.log(response.index)
	// response = { element, direction, index }
	if (response.index == 0 && response.direction == "down"){
		//colorDots(circles)
	}
	else if (response.index == 1 && response.direction == "down"){
		//boxDots(circles)
		// var graphHomes = d3.select("#graphGroup")
		// var removed = circles.remove();
		// graphHomes.append(function(){
		// 	return removed.node();
		// })
		graphDots(circles,citiBikesByDay)

	}
	else if (response.index == 2 && response.direction == "down"){
		
		
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

