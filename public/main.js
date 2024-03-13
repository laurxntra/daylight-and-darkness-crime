// /* THIS SECTION IS FOR VISUALIZATION #1. SCROLL DOWN FOR VISUALIZATION #1 */

// tooltip allows the interactive to start
const tooltip = d3.select("#chart1")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("transition", "opacity 0.4s");

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
        .enter()
        .append("rect")
        .attr("x", d => xAxis(d.data.time))
        .attr("y", d => yAxis(d[1]))
        .attr("height", d => yAxis(d[0]) - yAxis(d[1]))
        .attr("width", xAxis.bandwidth())
        .on("mouseover", function(event, d) {
            d3.select(this).style("opacity", 0.8);
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
            d3.select(this).style("opacity", 1);
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
        .text("Location: Phoenix, Arizona | Day: 5:00 AM - 8:00 PM | Night: 5:00 PM - 8:00 AM");

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

// tooltip allows the interactive to start
const tooltip2 = d3.select("#chart2")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("transition", "opacity 0.4s");

// Set up dimensions for the chart
const margin2 = { top: 80, right: 300, bottom: 60, left: 150 };
const width2 = 1100 - margin2.left - margin2.right;
const height2 = 600 - margin2.top - margin2.bottom;

const svg2 = d3.select("#chart2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// This extracts the crime types from the data
d3.csv("data/types-of-crimes-totals - Sheet1 - types-of-crimes-totals - Sheet1.csv.csv").then(function(data) {
    
    const xAxisName = ["Larceny Theft", "Motor Vehicle Theft", "Aggravated Assault", "Drug Offense"];
    const dayKeys = ["LARCENY-THEFT DAY", "MOTOR-VEHICLE THEFT DAY", "AGGRAVATED ASSAULT DAY", "DRUG OFFENSE DAY"];
    const nightKeys = ["LARCENY-THEFT NIGHT", "MOTOR-VEHICLE THEFT NIGHT", "AGGRAVATED ASSAULT NIGHT", "DRUG OFFENSE NIGHT"];
    
    const dayData = xAxisName.map((label, i) => ({
        crime: label,
        time: "Day",
        count: +data[0][dayKeys[i]]
    }));

    const nightData = xAxisName.map((label, i) => ({
        crime: label,
        time: "Night",
        count: +data[0][nightKeys[i]]
    }));
    
    const stackData = [...dayData, ...nightData];

    // Defines x-axis/y-axis 
    const xAxis = d3.scaleBand()
        .domain(stackData.map(d => d.crime))
        .range([0, width2])
        .padding(0.1);

    const yAxis = d3.scaleLinear()
        .domain([0, d3.max(stackData, d => d.count)])
        .nice()
        .range([height2, 0]);

    // Colors for the bars
    const colors = d3.scaleOrdinal()
        .domain(["Day", "Night"])
        .range(["#FFBA00", "#00008B"]);
    
    // Creates background ticks
    svg2.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yAxis)
        .tickSize(-width2)
        .tickFormat("-"))
        .selectAll(".tick line")

    // Creates the grouped bar chart
    svg2.selectAll(".bar")
        .data(stackData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xAxis(d.crime) + (xAxis.bandwidth() / 2 * (d.time === "Day" ? 0 : 1)))
        .attr("y", d => yAxis(d.count))
        .attr("width", xAxis.bandwidth() / 2)
        .attr("height", d => height2 - yAxis(d.count))
        .attr("fill", d => colors(d.time))
        .on("mouseover", function(event, d) {
            d3.select(this).style("opacity", 0.8);
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Occurrences: " + d.count)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).style("opacity", 1);
            tooltip.transition()
                .duration(100)
                .style("opacity", 0);
        });
        
    
    svg2.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .call(d3.axisBottom(xAxis));

    svg2.append("g")
        .call(d3.axisLeft(yAxis));
    
    // Creates the y-axis label
    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height2 / 2)
        .attr("y", -margin2.left + 100)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Number of Crimes in One Month");

    // Creates title 
    svg2.append("text")
        .attr("x", (width / 1.8))
        .attr("y", 10 - (margin.top / 1.5))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .style("font-weight", "bold")
        .text("Crimes in One Month");

    // Creates the description beneath the title
    svg2.append("text")
        .attr("x", (width / 1.8))
        .attr("y", 10 - (margin.top / 2) + 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Location: Phoenix, Arizona | Day: 5:00 AM - 8:00 PM | Night: 5:00 PM - 8:00 AM");

    // Creates the legends
    const legend = svg2.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20,20)")
        .selectAll("g")
        .data(["Day", "Night"])
        .enter()
        .append("g")
        .attr("transform", (d, i) => "translate(0," + i * 25 + ")");

    legend.append("rect")
        .attr("x", width2 - 5)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", colors);

    legend.append("text")
        .attr("x", width2 + 20)
        .attr("y", 10)
        .attr("dy", "0.32em")
        .text(d => d);

});
