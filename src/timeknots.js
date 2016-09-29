var TimeKnots = {
  draw: function(id, events, options){
    var cfg = {
      width: 600,
      height: 200,
      radius: 10,
      lineWidth: 4,
      colorTimeline: "#999",
      colorTip: "white",
      backgroundCircle: "#FFF",
      backgroundTip: "rgba(0,0,0,0.5)",
      dateFormat: "%Y/%m/%d %H:%M:%S",
      horizontalLayout: true,
      showLabels: false,
      labelFormat: "%Y/%m/%d %H:%M:%S",
      addNow: false,
      seriesColor: d3.scale.category20(),
      dateDimension: true,
      tipPosition: 'float'
    };




    //default configuration overrid
    if(options != undefined){
      for(var i in options){
        cfg[i] = options[i];
      }
    }
    if(cfg.addNow != false){
      events.push({date: new Date(), name: cfg.addNowLabel || "Today"});
    }

    //check if we can set position top
    var tip_position_top = cfg.tipPosition == 'top' && cfg.horizontalLayout == true ;
    var tip = null ;
    
    // if position is float, we set position as absolute
    if(tip_position_top){
      cfg.height = cfg.height /2;
      tip = d3.select(id).append('div').style("min-height", cfg.height);
    }else{
      tip = d3.select(id).append('div').style("position", "absolute");
    }

    tip.style("opacity", 0)
    .style("font-family", "Helvetica Neue")
    .style("font-weight", "300")
    .style("background", cfg.backgroundTip)
    .style("color", cfg.colorTip)
    .style("padding", "5px 10px 5px 10px")
    .style("-moz-border-radius", "8px 8px")
    .style("border-radius", "8px 8px");

    var svg = d3.select(id).append('svg').attr("width", cfg.width).attr("height", cfg.height);


    // function to set size and color of the circle if he hovered
    function toggle_circle (circle , hovered){
      var ratio = hovered ? 1.5 : 1 ;
      var color = hovered ? cfg.colorTimeline : cfg.backgroundCircle ;
      //apply them
      return circle.style("fill", function(d){if(d.color != undefined){return d.color} return color}).transition()
      .duration(100).attr("r",  function(d){if(d.radius != undefined){return Math.floor(cfg.radius*ratio)} return Math.floor(cfg.radius*ratio)});
    }
    // function to hide/unhide tip
    function toggle_tip(tip , visible){
      var opacity = visible ? .9 : 0 ; 
      return tip.transition().duration(100).style("opacity", opacity);
    }

    function reset_circles(){
      var circles = d3.selectAll(id.concat(" circle.timeline-event")) ;
      toggle_circle(circles, false);
    }


    //Calculate times in terms of timestamps
    if(!cfg.dateDimension){
      var timestamps = events.map(function(d){return  d.value});//new Date(d.date).getTime()});
      var maxValue = d3.max(timestamps);
      var minValue = d3.min(timestamps);
    }else{
      var timestamps = events.map(function(d){return  Date.parse(d.date);});//new Date(d.date).getTime()});
      var maxValue = d3.max(timestamps);
      var minValue = d3.min(timestamps);
    }
    var margin = (d3.max(events.map(function(d){return d.radius})) || cfg.radius)*1.5+cfg.lineWidth;
    var step = (cfg.horizontalLayout)?((cfg.width-2*margin)/(maxValue - minValue)):((cfg.height-2*margin)/(maxValue - minValue));
    var series = [];
    if(maxValue == minValue){step = 0;if(cfg.horizontalLayout){margin=cfg.width/2}else{margin=cfg.height/2}}

    linePrevious = {
      x1 : null,
      x2 : null,
      y1 : null,
      y2 : null
    }

    svg.selectAll("line")
    .data(events).enter().append("line")
    .attr("class", "timeline-line")
      .attr("x1", function(d){
                      var ret;
                      if(cfg.horizontalLayout){
                        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                        ret = Math.floor(step*(datum - minValue) + margin)
                      }
                      else{
                        ret = Math.floor(cfg.width/2)
                      }
                      linePrevious.x1 = ret
                      return ret
                      })
    .attr("x2", function(d){
                      if (linePrevious.x1 != null){
                          return linePrevious.x1
                      }
                      if(cfg.horizontalLayout){
                        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                        ret = Math.floor(step*(datum - minValue ))
                      }
                      return Math.floor(cfg.width/2)
                      })
    .attr("y1", function(d){
                      var ret;
                      if(cfg.horizontalLayout){
                        ret = Math.floor(cfg.height/2)
                      }
                      else{
                        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                        ret = Math.floor(step*(datum - minValue)) + margin
                      }
                      linePrevious.y1 = ret
                      return ret
                      })
    .attr("y2", function(d){
                      if (linePrevious.y1 != null){
                        return linePrevious.y1
                      }
                      if(cfg.horizontalLayout){
                        return Math.floor(cfg.height/2)
                      }
                      var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
                      return Math.floor(step*(datum - minValue))
                      })
    .style("stroke", function(d){
                      if(d.color != undefined){
                        return d.color
                      }
                      if(d.series != undefined){
                        if(series.indexOf(d.series) < 0){
                          series.push(d.series);
                        }
                        return cfg.seriesColor(series.indexOf(d.series));
                      }
                      return cfg.colorTimeline})
    .style("stroke-width", cfg.lineWidth);

    svg.selectAll("circle")
    .data(events).enter()
    .append("circle")
    .attr("class", "timeline-event")
    .attr("r", function(d){if(d.radius != undefined){return d.radius} return cfg.radius})
    .style("stroke", function(d){
                    if(d.color != undefined){
                      return d.color
                    }
                    if(d.series != undefined){
                      if(series.indexOf(d.series) < 0){
                        series.push(d.series);
                      }
                      console.log(d.series, series, series.indexOf(d.series));
                      return cfg.seriesColor(series.indexOf(d.series));
                    }
                    return cfg.colorTimeline}
    )
    .style("stroke-width", function(d){if(d.lineWidth != undefined){return d.lineWidth} return cfg.lineWidth})
    .style("fill", function(d){if(d.background != undefined){return d.background} return cfg.backgroundCircle})
    .attr("cy", function(d){
        if(cfg.horizontalLayout){
          return Math.floor(cfg.height/2)
        }
        var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
        return Math.floor(step*(datum - minValue) + margin)
    })
    .attr("cx", function(d){
        if(cfg.horizontalLayout){
          var datum = (cfg.dateDimension)?new Date(d.date).getTime():d.value;
          var x=  Math.floor(step*(datum - minValue) + margin);
          return x;
        }
        return Math.floor(cfg.width/2)
    }).on("mouseover", function(d){
      if(cfg.dateDimension){
        var format = d3.time.format(cfg.dateFormat);
        var datetime = format(new Date(d.date));
        var dateValue = (datetime != "")?(d.name +" <small>("+datetime+")</small>"):d.name;
      }else{
        var format = function(d){return d}; // TODO
        var datetime = d.value;
        var dateValue = d.name +" <small>("+d.value+")</small>";
      }
      

      tip.html(dateValue);
      if(d.img != undefined){
        tip.append("img").style("float", "left").style("margin-right", "4px").attr("src", d.img).attr("width", "64px");
      }
      // if top position is not sdefined, we set float-left to the tip
      if(tip_position_top ){reset_circles();

      }else{tip.append("div").style("float", "left"); }
      toggle_circle(d3.select(this), true);
      toggle_tip(tip, true);

      // if a callback onMouseOver was specified, we call him
      if(cfg.onMouseOver != undefined){ cfg.onMouseOver(d3.select(this), tip); }

    })
    .on("mouseout", function(){
      
      // if the position is set to top, we don't hide the tip
      if(tip_position_top != true){toggle_tip(tip, false);toggle_circle(d3.select(this), false);}
      //call the callback
      if(cfg.onMouseOut != undefined){ cfg.onMouseOut(d3.select(this), tip); }

    });

    //Adding start and end labels
    if(cfg.showLabels != false){
      if(cfg.dateDimension){
        var format = d3.time.format(cfg.labelFormat);
        var startString = format(new Date(minValue));
        var endString = format(new Date(maxValue));
      }else{
        var format = function(d){return d}; //Should I do something else?
        var startString = minValue;
        var endString = maxValue;
      }
      svg.append("text")
         .text(startString).style("font-size", "70%")
         .attr("x", function(d){if(cfg.horizontalLayout){return d3.max([0, (margin-this.getBBox().width/2)])} return Math.floor(this.getBBox().width/2)})
         .attr("y", function(d){if(cfg.horizontalLayout){return Math.floor(cfg.height/2+(margin+this.getBBox().height))}return margin+this.getBBox().height/2});

      svg.append("text")
         .text(endString).style("font-size", "70%")
         .attr("x", function(d){if(cfg.horizontalLayout){return  cfg.width -  d3.max([this.getBBox().width, (margin+this.getBBox().width/2)])} return Math.floor(this.getBBox().width/2)})
         .attr("y", function(d){if(cfg.horizontalLayout){return Math.floor(cfg.height/2+(margin+this.getBBox().height))}return cfg.height-margin+this.getBBox().height/2})
    }


    svg.on("mousemove", function(){
      tipPixels = parseInt(tip.style("height").replace("px", ""));
      return tip.style("top", (d3.event.pageY-tipPixels-margin)+"px").style("left",(d3.event.pageX+20)+"px");})
    .on("mouseout", function(){
      // if the position is set to top, we don't hide the tip
      if(tip_position_top == true){return tip;}
      else{return toggle_tip(tip, false).style("top","0px").style("left","0px"); }
    });
  }
}

