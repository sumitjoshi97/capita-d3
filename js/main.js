/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 2 - Gapminder Clone
 */

const margin = {
	top: 10,
	left: 100,
	right: 100,
	bottom: 100
}

const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

let g = d3.select('#chart-area')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.style('fill', '#36f')

let xScale = d3.scaleLog()
	.base(10)
	.domain([0, d3.max(d => d.countries)])

d3.json("data/data.json").then(function (data) {
	d3.interval(() => {
		update(data)
	}, 1000)
})

update = (data) => {
	let circles = g.selectAll('circle')
		.enter()
		.append('circle	')
		.attr('cx', xScale(d => d.income))
		.attr('cy', yScale(d => d.life_exp))
		.attr('r', d => Math.log10(d => d.population))
		.style('fill', 'red')
}