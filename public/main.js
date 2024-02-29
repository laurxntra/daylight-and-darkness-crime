/* THIS SECTION IS SPECIFICALLY FOR VISUALIZATION 1, SCROLL DOWN FOR VISUALIZATION #2 */

// Display of the visual bar chart
const width = 800;
const height = 500;
const margin = { top: 100, bottom: 50, left: 100, right: 100 };
const barPadding = 0.15;

// creates svg element in the <div id = "chart"> in our index.html
const svg1 = d3.select("#chart1").append("svg")
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
    { time: 'Daytime Crime', count: countDay },
    { time: 'Nighttime Crime', count: countNight }
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

  const category = ["Daytime Crime", "Nighttime Crime"];
  const colors = d3.scaleOrdinal()
  .domain(category)
  .range(["#FDDA0D","#3c005a"]);

    // Creates the actual bars on the graph
    svg1.selectAll(".bar")
    .data(countData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xAxis(d.time))
    .attr("y", d => yAxis(d.count))
    .attr("width", xAxis.bandwidth())
    .attr("height", d => height - yAxis(d.count))
    .attr("fill", d => colors(d.time));
    
    // creates the numeric labels for x & y axis
    svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xAxis));

    svg1.append("g")
      .call(d3.axisLeft(yAxis));
    
    // Creates the title label
    svg1.append("text")
      .attr("x", (width + margin.left + margin.right) / 2.6)
      .attr("y", margin.top - 160)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("How do crime rates vary between day and night throughout the course of a month?");

      svg1.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top - 125) // Adjust the y position as needed
      .style("text-anchor", "middle")
      .text("Daytime is considered 8am - 5pm | Nighttime is considered 8pm - 5am");

    // label for x-axis
    svg1.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Daytime Crime vs. Nighttime Crime");

     // label for y-axis
     svg1.append("text")
     .attr("transform", "rotate(-90)")
     .attr("x", -height / 2)
     .attr("y", -margin.left + 50)
     .style("text-anchor", "middle")
     .style("font-weight", "bold")
     .text("Average Monthly Crimes");

     // Creates legend to specify the data
     const legend = svg1.selectAll(".legend")
        .data(category)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
        .attr("x", width)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d) {
          return colors(d);
        });

        legend.append("text")
        .attr("x", width - 10)
        .attr("y", 7)
        .attr("dy", ".30em")
        .style("text-anchor", "end")
        .text(function(d) {
          return d;
        });
});

/* THIS SECTION IS FOR VISUALIZATION #2. SCROLL UP FOR VISUALIZATION #1 */

const svg2 = d3.select("#chart2").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("data/types-of-crimes-totals - Sheet1.csv").then(function(data) {
      const dayData = {
        "LARCENY-THEFT": +data[0]["LARCENY-THEFT DAY"],
        "BURGLARY": +data[0]["BURGLARY DAY"],
        "MOTOR-VEHICLE THEFT": +data[0]["MOTOR-VEHICLE THEFT DAY"],
        "AGGRAVATED ASSAULT": +data[0]["AGGRAVATED ASSAULT DAY"],
        "DRUG OFFENSE": +data[0]["DRUG OFFENSE DAY"],
        "OTHER": +data[0]["OTHER DAY"]
      };

      const nightData = {
        "LARCENY-THEFT": +data[0]["LARCENY-THEFT NIGHT"],
        "BURGLARY": +data[0]["BURGLARY NIGHT"],
        "MOTOR-VEHICLE THEFT": +data[0]["MOTOR-VEHICLE THEFT NIGHT"],
        "AGGRAVATED ASSAULT": +data[0]["AGGRAVATED ASSAULT NIGHT"],
        "DRUG OFFENSE": +data[0]["DRUG OFFENSE NIGHT"],
        "OTHER": +data[0]["OTHER NIGHT"]
      };
      
      let countBothLT = +data[0]['LARCENY-THEFT DAY'] + +data[0]['LARCENY-THEFT NIGHT'];
      let countBothB = +data[0]['BURGLARY DAY'] + +data[0]['BURGLARY NIGHT'];
      let countBothMVT = +data[0]['MOTOR-VEHICLE THEFT DAY'] + +data[0]['MOTOR-VEHICLE THEFT NIGHT'];
      let countBothAA = +data[0]['AGGRAVATED ASSAULT DAY'] + +data[0]['AGGRAVATED ASSAULT NIGHT'];
      let countBothDO = +data[0]['DRUG OFFENSE DAY'] + +data[0]['DRUG OFFENSE NIGHT'];
      let countBothO = +data[0]['OTHER DAY'] + +data[0]['OTHER NIGHT'];

      
}) .catch(function(error) {
      console.error("Error loading the CSV file:", error);
});
