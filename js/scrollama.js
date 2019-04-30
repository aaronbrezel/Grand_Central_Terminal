var main, scrolly, figure, article, step //variables for dom elements

var scroller //scrollama

var bikeArray
var carArray
var weatherArray

var circles
var squares

d3.json("./data/day_counts_march_json.json", function(error,json) {
	if (error) return console.log("Error loading data")
	//console.log(json)
}).then(function(data){
	var dailyCounts = data
	var bikes = dailyCounts.bikes
	var FHV = dailyCounts.FHV
	var cabs = dailyCounts.yellowcabs
	var weather = dailyCounts.weather
	bikeArray = buildBikeArray(bikes)
	carArray = buildCarArray(FHV,cabs)
	weatherArray = buildWeatherArray(weather)

	startup()

	
})

function buildWeatherArray(weather){
	var ArrayInProgress = []
	for (var key in weather){
		ArrayInProgress.push({"day": key, "temp": weather[key].temp, "precip": weather[key].precip, "snow": weather[key].temp})
	}
	return ArrayInProgress
}

function buildBikeArray(bikes){
	var ArrayInProgress = []
	for (var key in bikes){
		if (key == "total"){		
		}
		else {
			for(i=0; i < Math.round(bikes[key])/59; i++){
				ArrayInProgress.push({"day": key})
			}
		}

	}
	return ArrayInProgress
}

function buildCarArray(FHV,cabs){
	var ArrayInProgress = []
	for (var key in FHV){
		if (key == "total"){		
		}
		else {
			for(i=0; i < Math.round(FHV[key])/3917; i++){
				ArrayInProgress.push({"day": key, "mode": "FHV"})
			}
			for(i=0; i < Math.round(cabs[key])/3917; i++){
				ArrayInProgress.push({"day": key, "mode": "yellowcab"})
			}
		}	

	}
	
	return ArrayInProgress
}

function startup(){
	$(document).ready(function(){
		// using d3 for convenience
		main = d3.select('main')
		scrolly = main.select('#scrolly');
		figure = scrolly.select('figure');
		article = scrolly.select('article');
		step = article.selectAll('.step');
	
		figs = main.select("#info")
        threeCircles = makeCircles(totalCounts,figs)
	
		// initialize the scrollama
		scroller = scrollama();
	
		// kick things off
		init();

		circles = buildBikeChart(bikeArray,figure)
		squares = buildCarChart(carArray,figure)

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
	//console.log(response)
	// response = { element, direction, index }
	if (response.index == 0 && response.direction == "down"){
		circles.transition()
		squares.transition()
		flopCircles(circles)
		flopSquares(squares)
	}

	else if (response.index == 1 && response.direction == "down"){
		colorSquares(squares)
	
	}

	else if (response.index == 1 && response.direction == "up"){
		circles.transition()
		squares.transition()
		boxCircles(circles)
		boxSquares(squares)
	}

	else if (response.index == 2 && response.direction == "down"){
		circles.transition()
		squares.transition()
		graphCircles(circles)
		graphSquares(squares)
	}
	else if (response.index == 2 && response.direction == "up"){
		var paths = d3.selectAll(".line").remove()
		
	}

	else if (response.index == 3 && response.direction == "down"){
		var bikesSVG = d3.select(".bikesSVG")
		var carsSVG = d3.select(".carsSVG")
		graphTempBikes(bikesSVG,weatherArray)
		graphTempCars(carsSVG,weatherArray)
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

function init() {
	setupStickyfill();

	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller.setup({
		step: '#scrolly article .step',
		offset: 0.5,
		//debug: false,
	})
		.onStepEnter(handleStepEnter)


	// setup resize event
	window.addEventListener('resize', handleResize);
}

