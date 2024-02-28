// console.log("Add your visualizations here!");

// Display of the visual bar chart
const width = 800;
const height = 500;
const margin = { top: 100, bottom: 50, left: 100, right: 100 };
const barPadding = 0.15;

// creates svg element in the <div id = "chart"> in our index.html
const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the CSV data --> creates the actual group bar chart    
d3.csv("data/day-night-data - Sheet1.csv").then(function(data) {
  let countDay = 0;
  let countNight = 0;
  
  data.forEach(function(d) {
    // counts the amount of rows are in day + night
    if(d['OCCURRED DAY'] !== '') {
      countDay++;
    }
    if(d['OCCURRED NIGHT'] !== '') {
      countNight++;
    }
  });

  const countData = [
    { time: 'Crime during Day', count: countDay },
    { time: 'Crime during Night', count: countNight }
  ];

  // Creates the x-axis & y-axis scales
  const xAxis = d3.scaleBand()
    .domain(countData.map(d => d.time))
    .range([0, width])
    .padding(barPadding);

  const yAxis = d3.scaleLinear()
    .domain([0, d3.max(countData, d => d.count)])
    .nice()
    .range([height, 0]);

    // Creates the actual bars on the graph
    svg.selectAll(".bar")
    .data(countData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xAxis(d.time))
    .attr("y", d => yAxis(d.count))
    .attr("width", xAxis.bandwidth())
    .attr("height", d => height - yAxis(d.count));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xAxis));

    svg.append("g")
      .call(d3.axisLeft(yAxis));

});