/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var w = 400;
var h = 200;

//$(document).ready(function () {
    
    var padding = 20;
    var spaceRight = 60;
    var transitionStack = [];
    
    //Array of dummy data values
    var dataset = [
            {"id":0, "val":5, "pos":0},
            {"id":1, "val":15, "pos":1},
            {"id":2, "val":6, "pos":2},
            {"id":3, "val":9, "pos":3},
            {"id":4, "val":10, "pos":4},
            {"id":5, "val":5, "pos":5},
            {"id":6, "val":2, "pos":6},
            
    ];

    //Configure x and y scale functions
    var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([padding, w - padding - spaceRight], 0.05);

    var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d){return d.val})])
            .rangeRound([h - padding, padding]);

    var btnSort = d3.select("#svgDiv")
            .append("div")
            .text("ClickMe")
            .style("cursor","pointer")
            .on("click",function(){       
                for(i = 1; i<  dataset.length;i++){
                    var aux = dataset[i];
                    
                    if(aux){
                        transitionStack.push({"id":aux.id, "val":aux.val, "pos":-1})
                    }
                    
                    for(j= i-1; j >=0 && dataset[j].val > aux.val;j--){
                        dataset[j+1] = dataset[j];
                        dataset[j+1].pos = j+1;
                        transitionStack.push({"id":dataset[j+1].id, "val":dataset[j+1].val, "pos":j+1})
                        
                    }                        
                    dataset[j+1]=aux;
                    dataset[j+1].pos = j+1;
                    transitionStack.push({"id":dataset[j+1].id, "val":dataset[j+1].val, "pos":j+1})                    
                }
                //call anime function
                animeStack(transitionStack);
                
                });            
    
    
    //Create SVG element
    var svg = d3.select("#svgDiv")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    //Create bars
    var rects = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("id",function(d,i){return "rect_" + i})
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", function (d) {
                return h - padding;
            })
            .attr("width", xScale.rangeBand())
            .attr("height", 0);

    //Transition rects into place
    rects.transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(1000)
            .attr("y", function (d) {
                return yScale(d.val);
            })
            .attr("height", function (d) {
                return h - padding - yScale(d.val);
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
            
            function animeStack(stackToAnimate){
                var elementToAnimate = stackToAnimate.shift();                
                d3.selectAll("#rect_" + elementToAnimate.id)
                        .transition()
                        .each("end",function(){
                            if(stackToAnimate.length > 0){
                                animeStack(stackToAnimate)                                                    
                            }
                        })
                        .duration(500)
                        .attr("x",function(d){
                            if(elementToAnimate.pos >= 0)
                                return xScale(elementToAnimate.pos);                            
                        })
                        .attr("y",function(d){
                            if(elementToAnimate.pos == -1)
                                return h + padding + yScale(elementToAnimate.val);                            
                        })
                        
                
                
            }
//});

