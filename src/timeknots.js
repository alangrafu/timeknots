var TimeKnots = {
  draw: function(id, events, options){
    var cfg = {
      w: 600,
      h: 200,
      radius: 10,
      lineWidth: 4,
      color: "#999",
      background: "#FFF",
      dateFormat: "%Y/%m/%d %H:%M:%S",
      horizontalLayout: true
    };
    
    
    //default configuration overrid
    if(options != undefined){
      for(var i in options){
        cfg[i] = options[i];
      }
    }
    var tip = d3.select(id)
    .append('div')
    .attr("width", 100)
    .attr("height", 50)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("font-family", "Helvetica Neue")
    .style("font-weight", "300")
    .style("background","rgba(0,0,0,0.5)")
    .style("color", "white")
    .style("padding", "5px 10px 5px 10px")
    .style("-moz-border-radius", "8px 8px")
    .style("border-radius", "8px 8px");
    var svg = d3.select(id).append('svg').attr("width", cfg.w).attr("height", cfg.h);
    //Calculate times in terms of timestamps
    
    var timestamps = events.map(function(d){return  Date.parse(d.date);});//new Date(d.date).getTime()});
    var maxValue = d3.max(timestamps);
    var minValue = d3.min(timestamps);
    var margin = cfg.radius+cfg.lineWidth;
    var step = (cfg.horizontalLayout)?((cfg.w-2*margin)/(maxValue - minValue)):((cfg.h-2*margin)/(maxValue - minValue));
    svg.append("line")
    .attr("class", "timeline-line")
    .attr("x1", function(d){if(cfg.horizontalLayout){return (margin)} return Math.floor(cfg.w/2)})
    .attr("x2", function(d){if(cfg.horizontalLayout){return (cfg.w - margin)} return Math.floor(cfg.w/2)})
    .attr("y1", function(d){if(cfg.horizontalLayout){return Math.floor(cfg.h/2)}return margin})
    .attr("y2", function(d){if(cfg.horizontalLayout){return Math.floor(cfg.h/2)}return cfg.h-margin})
    .style("stroke", cfg.color)
    .style("stroke-width", cfg.lineWidth);
    
    svg.selectAll("circle")
    .data(events).enter()
    .append("circle")
    .attr("class", "timeline-event")
    .attr("r", cfg.radius)
    .style("stroke", cfg.color)
    .style("stroke-width", cfg.lineWidth)
    .style("fill", cfg.background)
    .attr("cy", function(d){
        if(cfg.horizontalLayout){
          return Math.floor(cfg.h/2)
        }
        return Math.floor(step*(new Date(d.date).getTime() - minValue) + margin)
    })
    .attr("cx", function(d){
        if(cfg.horizontalLayout){
          var x=  Math.floor(step*(new Date(d.date).getTime() - minValue) + margin);
          return x;
        }
        return Math.floor(cfg.w/2)
    }).on("mouseover", function(d){
      var format = d3.time.format(cfg.dateFormat);
      d3.select(this)
      .style("fill", cfg.color).transition()
      .duration(100).attr("r", Math.floor(cfg.radius*1.5));
      tip.html( d.name +" <small>("+format(new Date(d.date))+")</small>") 
      .transition()
      .duration(100)
      .style("opacity", .9);
    })
    .on("mouseout", function(){
        d3.select(this)
        .style("fill", cfg.background).transition()
        .duration(100).attr("r", cfg.radius);
        tip.transition()
        .duration(100)
    .style("opacity", 0)});
    
    
    svg.on("mousemove", function(){
    return tip.style("top", (d3.event.pageY-40)+"px").style("left",(d3.event.pageX-40)+"px");});
  }
}

