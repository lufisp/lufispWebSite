/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var w = 400;
var h = 200;
var boxHeight = 20;
var topPadding = 80;
var sorting = 0;

$(document).ready(function () {
    createSVG();
});

var padding = 2;
var spaceRight = 0;
var transitionStack = [];
var numElements = 13;

//Array of dummy data values
var dataset = [];
for (i = 0; i < numElements; i++) {
    dataset.push({"id": i, "val": Math.floor((Math.random() * 100)), "pos": i})
}


//Configure x and y scale functions
var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([padding, w - padding - spaceRight], 0.05);

var yScale = d3.scale.linear()
        .domain([0, boxHeight])
        .rangeRound([h - topPadding, topPadding]);

var btnSort = d3.select("#btnSort")
        .on("click", function () {
            sortFunction()
        });

var btnSortAgain = d3.select("#btnSortAgain")
        .on("click", function () {
            dataset = [];
            for (i = 0; i < numElements; i++) {
                dataset.push({"id": i, "val": Math.floor((Math.random() * 100)), "pos": i})
            }
            d3.select("#svgDiv").selectAll("*").remove();
            createSVG(); 
            btnSort.classed("disabled", false);
        });

function sortFunction() {
    if (sorting == 0) {
        sorting = 1;
        btnSort.classed("disabled", true);
        btnSortAgain.classed("disabled", true);
        transitionStack = []
        for (i = 1; i < dataset.length; i++) {
            var aux = dataset[i];

            if (aux) {
                transitionStack.push({"id": aux.id, "val": aux.val, "pos": aux.pos, "selected": 1});
            }

            for (j = i - 1; j >= 0 && dataset[j].val > aux.val; j--) {
                dataset[j + 1] = dataset[j];
                dataset[j + 1].pos = j + 1;
                transitionStack.push({"id": dataset[j + 1].id, "val": dataset[j + 1].val, "pos": j + 1, "selected": 0})

            }
            dataset[j + 1] = aux;
            dataset[j + 1].pos = j + 1;
            transitionStack.push({"id": dataset[j + 1].id, "val": dataset[j + 1].val, "pos": j + 1, "selected": 2})
        }
        //call anime function
        animeStack(transitionStack);
    }

}

function createSVG() {
//Create SVG element
    var svg = d3.select("#svgDiv")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Create bars
    var groups = svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("g")
            .attr("id", function (d, i) {
                return "group_" + i
            })
            .attr("transform", function (d, i) {
                return "translate(" + xScale(i) + ",0)";
            });
//Create bars
    var boxs = groups.append("rect")
            .attr("id", function (d, i) {
                return "box_" + i
            })
            .attr("x", 0)
            .attr("y", function (d) {
                return h - topPadding;
            })
            .attr("width", xScale.rangeBand())
            .attr("height", 0)
            .attr("fill", "DarkOrange");

    var texts = groups.append("text")
            .attr("x", xScale.rangeBand() / 2)
            .attr("y", yScale(boxHeight) + 25)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "14px")
            .style("font-style", "bold")
            .style("fill", "white")
            .text(function (d) {
                return d.val;
            })

//Transition boxs into place
    boxs.transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(1000)
            .attr("y", yScale(boxHeight))
            .attr("height", function (d) {
                return h - topPadding - yScale(boxHeight);
            })
            .each("end", function (d) {
                d3.select(this)
                        .classed("highlight", function (d) {
                            if (d > 20) {
                                return true;
                            }
                            return false;
                        });
            });
}
function animeStack(stackToAnimate) {
    var elementToAnimate = stackToAnimate.shift();
    d3.selectAll("#group_" + elementToAnimate.id)
            .transition()
            .each("end", function () {
                if (stackToAnimate.length > 0) {
                    animeStack(stackToAnimate)
                } else {
                    sorting = 0;
                    btnSortAgain.classed("disabled", false);
                }
            })
            .duration(500)
            .attr("transform", function (d, i) {
                var translateY = boxHeight * 2 + padding;
                if (elementToAnimate.selected == 1) {
                    return "translate(" + xScale(elementToAnimate.pos) + "," + translateY + ")";
                } else {
                    return "translate(" + xScale(elementToAnimate.pos) + "," + 0 + ")";
                }
            });




}
//});

