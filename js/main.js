const margin = {
	top: 10,
	left: 100,
	right: 100,
	bottom: 100
}

const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// defining variables
let xScale
let yScale
let popScale
let interval

// define color for continents
let continentColor = d3.scaleOrdinal(["#36f", "#EE5A24", "#009432"])


d3.json("data/data.json").then(function (data) {

	// clean data
	const formattedData = data.map(year => {
		return year['countries']
			.filter(country => country.income && country.life_exp)
			.map(country => {
				country.income = +country.income
				country.life_exp = +country.life_exp
			})
	})

	// make svg element
	let svg = d3.select('#chart-area')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)

	// append g to svg and translate to margin top and left
	let g = svg
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	// define xscale
	xScale = d3.scaleLog()
		.base(10)
		.range([0, width])
		.domain([142, d3.max(formattedData, arr => {
			return d3.max(arr, country => {
				return country.income
			})
		})])

	// define y scale
	yScale = d3.scaleLinear()
		.range([height, 0])
		.domain([0, d3.max(formattedData, arr => {
			return d3.max(arr, country => {
				return country.life_exp
			})
		})])

	// define circle size - accorfing country population
	popScale = d3.scaleLinear()
		.range([25 * Math.PI, 1500 * Math.PI])
		.domain([2000, 1400000000])

	let xAxis = d3.axisBottom(xScale)
		.tickValues([1,10,100,1000,10000,100000])
		.tickFormat(d3.format('$'))

	g.append('g')
		.attr('class', 'x-axis')
		.attr('transform', 'translateY('+height+')')
		.call(xAxis)
		.attr('x', 10)
		.attr('y', 10)
		.attr('text-anchor', 'center')

	let yAxis = d3.axisLeft(yScale)
		
	g.append('g')
		.attr('class', 'y-axis')
		.call(yAxis)

	g.append('g')
	

	d3.interval(() => {
		update(formattedData)
	}, 1000)

})

function update(data) {}
