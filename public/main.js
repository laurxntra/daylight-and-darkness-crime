// /* THIS SECTION IS FOR VISUALIZATION #1. SCROLL DOWN FOR VISUALIZATION #1 */

// tooltip allows the interactive to start
const tooltip = d3.select("#chart1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("transition", "opacity 0.3s");

// Set up dimensions for the chart
const margin = { top: 100, right: 200, bottom: 60, left: 200 };
const width = 1000 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;

// Creates the SVG element
const svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// This extracts the crime types from the data
d3.csv("data/types-of-crimes-totals - Sheet1 - types-of-crimes-totals - Sheet1.csv.csv").then(function(data) {
    const dayKeys = ["LARCENY-THEFT DAY", "MOTOR-VEHICLE THEFT DAY", "AGGRAVATED ASSAULT DAY", "DRUG OFFENSE DAY"];
    const nightKeys = ["LARCENY-THEFT NIGHT", "MOTOR-VEHICLE THEFT NIGHT", "AGGRAVATED ASSAULT NIGHT", "DRUG OFFENSE NIGHT"];

    const dayData = {
        time: "Day",
        ...Object.fromEntries(dayKeys.map(key => [key, +data[0][key]]))
    };

    const nightData = {
        time: "Night",
        ...Object.fromEntries(nightKeys.map(key => [key, +data[0][key]]))
    };

    // Stacks the data to help create the stacked bar chart
    const stackData = d3.stack()
        .keys(dayKeys.concat(nightKeys))
        .offset(d3.stackOffsetDiverging)
        ([dayData, nightData]);

    // Define scales for x-axis and y-axis
    const xAxis = d3.scaleBand()
        .domain(["Day", "Night"])
        .range([0, width])
        .padding(0.1);

    const yAxis = d3.scaleLinear()
        .domain([0, d3.max(stackData, d => d3.max(d, d => d[1]))])
        .nice()
        .range([height, 0]);

    // Colors for bars/legend
    const colors = d3.scaleOrdinal()
        .domain(dayKeys.concat(nightKeys))
        .range(["#ADD8E6", "#949494", "#702963", "#007500"]);

        svg.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(yAxis)
            .tickSize(-width)
            .tickFormat("-")
    );
        
    // Creates stacked bars
    svg.selectAll(".bar")
        .data(stackData)
        .enter()
        .append("g")
        .attr("fill", d => colors(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => xAxis(d.data.time))
        .attr("y", d => yAxis(d[1]))
        .attr("height", d => yAxis(d[0]) - yAxis(d[1]))
        .attr("width", xAxis.bandwidth())
        .on("mouseover", function(event, d) {
            const crimeType = d3.select(this.parentNode).datum().key;
            const crimeCount = d[1] - d[0];
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(crimeType + ": " + crimeCount)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0);
        });

    // Adds x-axis and title for x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .call(d3.axisBottom(xAxis));

    
    // Add y-axis and title for y-axis
    svg.append("g")
        .call(d3.axisLeft(yAxis));
      
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 150)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Number of Crimes in One Month");

     // Adds the title for the chart
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 10 - (margin.top / 1.5))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .style("font-weight", "bold")
        .text("Total Crime in One Month: Day vs. Night");

        svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 10 - (margin.top / 2) + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Day: 5:00 AM - 8:00 PM | Night: 5:00 PM - 8:00 AM");

    // creates the legend
    const legendKeys = ["Larceny Theft", "Motor Vehicle Theft", "Aggravated Assault", "Drug Offense"];
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width + 15) + ",20)")
        .selectAll("g")
        .data(legendKeys)
        .enter()
        .append("g")
        .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", d => colors(d));

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".25em")
        .text(d => d);

// checking for errors
}).catch(function(error) {
    console.error("Error:", error);
});

// /* THIS SECTION IS FOR VISUALIZATION #2. SCROLL UP FOR VISUALIZATION #1 */

// const svg2 = d3.select("#chart2").append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//   d3.csv("data/types-of-crimes-totals - Sheet1.csv").then(function(data) {
//       const dayData = [
//         {type: 'LARCENY-THEFT', count: data[0]["LARCENY-THEFT DAY"]},
//         {type: 'BURGLARY', count: data[0]["BURGLARY DAY"]},
//         {type: 'MOTOR-VEHICLE THEFT', count: data[0]["MOTOR-VEHICLE THEFT DAY"]}
//         // "AGGRAVATED ASSAULT": +data[0]["AGGRAVATED ASSAULT DAY"],
//         // "DRUG OFFENSE": +data[0]["DRUG OFFENSE DAY"],
//         // "OTHER": +data[0]["OTHER DAY"]
//       ];

//       // const nightData = {
//       //   "LARCENY-THEFT": +data[0]["LARCENY-THEFT NIGHT"],
//       //   "BURGLARY": +data[0]["BURGLARY NIGHT"],
//       //   "MOTOR-VEHICLE THEFT": +data[0]["MOTOR-VEHICLE THEFT NIGHT"],
//       //   "AGGRAVATED ASSAULT": +data[0]["AGGRAVATED ASSAULT NIGHT"],
//       //   "DRUG OFFENSE": +data[0]["DRUG OFFENSE NIGHT"],
//       //   "OTHER": +data[0]["OTHER NIGHT"]
//       // };
      
//       // let countBothLT = +data[0]['LARCENY-THEFT DAY'] + +data[0]['LARCENY-THEFT NIGHT'];
//       // let countBothB = +data[0]['BURGLARY DAY'] + +data[0]['BURGLARY NIGHT'];
//       // let countBothMVT = +data[0]['MOTOR-VEHICLE THEFT DAY'] + +data[0]['MOTOR-VEHICLE THEFT NIGHT'];
//       // let countBothAA = +data[0]['AGGRAVATED ASSAULT DAY'] + +data[0]['AGGRAVATED ASSAULT NIGHT'];
//       // let countBothDO = +data[0]['DRUG OFFENSE DAY'] + +data[0]['DRUG OFFENSE NIGHT'];
//       // let countBothO = +data[0]['OTHER DAY'] + +data[0]['OTHER NIGHT'];

//       // Creates the x-axis & y-axis scales
//       const xAxis = d3.scaleBand()
//         .domain(dayData.map(d => d.type))
//         .range([0, width])
//         .padding(barPadding);

//       const yAxis = d3.scaleLinear()
//         .domain([0, d3.max(dayData, d => d.count)])
//         .nice()
//         .range([height, 0]);

//       const category = ["Larceny-Theft", "Burglary", "Motor-Vehicle Theft"];
//       const colors = d3.scaleOrdinal()
//       .domain(category)
//       .range(["#FDDA0D","#3c005a"]);

//       svg1.selectAll(".bar")
//         .data(dayData)
//         .enter()
//         .append("rect")
//         .attr("class", "bar")
//         .attr("x", d => xAxis(d.type))
//         .attr("y", d => yAxis(d.count))
//         .attr("width", xAxis.bandwidth())
//         .attr("height", d => height - yAxis(d.count))
//         .attr("fill", d => colors(d.type));

//       svg1.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(xAxis));
  
//       svg1.append("g")
//         .call(d3.axisLeft(yAxis));
      

      
// }) .catch(function(error) {
//       console.error("Error loading the CSV file:", error);
// });

