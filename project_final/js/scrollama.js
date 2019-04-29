var main, scrolly, figure, article, step //variables for dom elements

var scroller //scrollama

var bikeArray
var carArray

d3.json("https://raw.githubusercontent.com/aaronbrezel/Grand_Central_Terminal/master/project_final/data/day_counts_march_json.json", function(error,json) {
	if (error) return console.log("Error loading data")
	//console.log(json)
}).then(function(data){
	var dailyCounts = data
	var bikes = dailyCounts.bikes
	var FHV = dailyCounts.FHV
	var cabs = dailyCounts.yellowcabs
	bikeArray = buildBikeArray(bikes)
	carArray = buildCarArray(FHV,cabs)
	startup()

	
})

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
	
		// initialize the scrollama
		scroller = scrollama();
	
		//data info
        figs = main.select("#info")
        
        threeCircles = makeCircles(totalCounts,figs)
        
        // kick things off
		init();
        
		circles = buildBikeChart(bikeArray,figure)
		square = buildCarChart(carArray,figure)

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
		debug: true,
	})
		.onStepEnter(handleStepEnter)


	// setup resize event
	window.addEventListener('resize', handleResize);
}

