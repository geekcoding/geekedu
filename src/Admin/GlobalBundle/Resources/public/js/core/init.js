// document ready function
$(document).ready(function() { 

	//--------------- button state demo ------------------//
    $('#fat-btn').click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000);
     })

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Full calendar  -------------//

	$(function () {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		//front page calendar
		$('#calendar').fullCalendar({
			//isRTL: true,
			//theme: true,
			header: {
				left: 'title,today',
				center: 'prev,next',
				right: 'month,agendaWeek,agendaDay'
			},
			buttonText: {
	        	prev: '<span class="icon24 icomoon-icon-arrow-left-2"></span>',
	        	next: '<span class="icon24 icomoon-icon-arrow-right-2"></span>'
	    	},
			editable: true,
			events: [
				{
					title: 'All Day Event',
					start: new Date(y, m, 1)
				},
				{
					title: 'Long Event',
					start: new Date(y, m, d-5),
					end: new Date(y, m, d-2)
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d-3, 16, 0),
					allDay: false
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d+4, 16, 0),
					allDay: false
				},
				{
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: false
				},
				{
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false,
					color: '#9FC569'
				},
				{
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: false,
					color: '#ED7A53'
				},
				{
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				}
			]
		});
	});

	/* initialize the external events
	-----------------------------------------------------------------*/
	
	$('#external-events div.external-event').each(function() {
	
		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});


	/* initialize the calendar
	-----------------------------------------------------------------*/
	
	$('#calendar-events').fullCalendar({
		header: {
			left: 'title,today',
			center: 'prev,next',
			right: 'month,agendaWeek,agendaDay'
		},
		buttonText: {
        	prev: '<span class="icon24 icomoon-icon-arrow-left-2"></span>',
        	next: '<span class="icon24 icomoon-icon-arrow-right-2"></span>'
    	},
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date, allDay) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar-events').fullCalendar('renderEvent', copiedEventObject, true);
			$(this).remove();
			
		}
	});

	//--------------- Tabs ------------------//

    //activate calendar ot tab click
    $('#myTab a[data-toggle="tab"]').on('shown', function (e) {
		$('#calendar').fullCalendar('render');
	})

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	var divElement = $('div'); //log all div elements

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

	//Simple chart 
    if (divElement.hasClass('simple-chart')) {
	$(function () {
		var sin = [], cos = [];
	    for (var i = 0; i < 14; i += 0.5) {
	        sin.push([i, Math.sin(i)]);
	        cos.push([i, Math.cos(i)]);
	    }
	    //graph options
		var options = {
				grid: {
					show: true,
				    aboveData: true,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {active: false},
		            lines: {
	            		show: true,
	            		fill: false,
	            		lineWidth: 4,
	            		steps: false
		            	},
		            points: {
		            	show:true,
		            	radius: 5,
		            	symbol: "circle",
		            	fill: true,
		            	borderColor: "#fff"
		            }
		        },
		        legend: { position: "se" },
		        colors: chartColours,
		        shadowSize:1,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.3",
					shifts: {
						x: -30,
						y: -50
					}
				}
		};  
		var plot = $.plot($(".simple-chart"),
           [{
    			label: "Sin", 
    			data: sin,
    			lines: {fillColor: "#f2f7f9"},
    			points: {fillColor: "#88bbc8"}
    		}, 
    		{	
    			label: "Cos", 
    			data: cos,
    			lines: {fillColor: "#fff8f2"},
    			points: {fillColor: "#ed7a53"}
    		}], options);
	});
	}//end if

	//Donut simple chart
    if (divElement.hasClass('simple-donut')) {
	$(function () {
		var data = [
		    { label: "USA",  data: 38, color: "#88bbc8"},
		    { label: "Brazil",  data: 23, color: "#ed7a53"},
		    { label: "India",  data: 15, color: "#9FC569"},
		    { label: "Turkey",  data: 9, color: "#bbdce3"},
		    { label: "France",  data: 7, color: "#9a3b1b"},
		    { label: "China",  data: 5, color: "#5a8022"},
		    { label: "Germany",  data: 3, color: "#2c7282"}
		];

	    $.plot($(".simple-donut"), data, 
		{
			series: {
				pie: { 
					show: true,
					innerRadius: 0.4,
					highlight: {
						opacity: 0.1
					},
					radius: 1,
					stroke: {
						color: '#fff',
						width: 8
					},
					startAngle: 2,
				    combine: {
	                    color: '#353535',
	                    threshold: 0.05
	                },
	                label: {
	                    show: true,
	                    radius: 1,
	                    formatter: function(label, series){
	                        return '<div class="pie-chart-label">'+label+'&nbsp;'+Math.round(series.percent)+'%</div>';
	                    }
	                }
				},
				grow: {	active: false}
			},
			legend:{show:false},
			grid: {
	            hoverable: true,
	            clickable: true
	        },
	        tooltip: true, //activate tooltip
			tooltipOpts: {
				content: "%s : %y.1"+"%",
				shifts: {
					x: -30,
					y: -50
				}
			}
		});
	});
	}//end if

	//Pie simple chart
    if (divElement.hasClass('simple-pie')) {
	$(function () {
		var data = [
		    { label: "USA",  data: 38, color: "#88bbc8"},
		    { label: "Brazil",  data: 23, color: "#ed7a53"},
		    { label: "India",  data: 15, color: "#9FC569"},
		    { label: "Turkey",  data: 9, color: "#bbdce3"},
		    { label: "France",  data: 7, color: "#9a3b1b"},
		    { label: "China",  data: 5, color: "#5a8022"},
		    { label: "Germany",  data: 3, color: "#2c7282"}
		];

	    $.plot($(".simple-pie"), data, 
		{
			series: {
				pie: { 
					show: true,
					highlight: {
						opacity: 0.1
					},
					radius: 1,
					stroke: {
						color: '#fff',
						width: 2
					},
					startAngle: 2,
				    combine: {
	                    color: '#353535',
	                    threshold: 0.05
	                },
	                label: {
	                    show: true,
	                    radius: 1,
	                    formatter: function(label, series){
	                        return '<div class="pie-chart-label">'+label+'&nbsp;'+Math.round(series.percent)+'%</div>';
	                    }
	                }
				},
				grow: {	active: false}
			},
			legend:{show:false},
			grid: {
	            hoverable: true,
	            clickable: true
	        },
	        tooltip: true, //activate tooltip
			tooltipOpts: {
				content: "%s : %y.1"+"%",
				shifts: {
					x: -30,
					y: -50
				}
			}
		});
	});
	}//end if


	//Ordered bars chart
    if (divElement.hasClass('order-bars-chart')) {
	$(function () {
		//some data
		var d1 = [];
	    for (var i = 0; i <= 10; i += 1)
	        d1.push([i, parseInt(Math.random() * 30)]);
	 
	    var d2 = [];
	    for (var i = 0; i <= 10; i += 1)
	        d2.push([i, parseInt(Math.random() * 30)]);
	 
	    var d3 = [];
	    for (var i = 0; i <= 10; i += 1)
	        d3.push([i, parseInt(Math.random() * 30)]);
	 
	    var ds = new Array();
	 
	     ds.push({
	     	label: "Data One",
	        data:d1,
	        bars: {order: 1}
	    });
	    ds.push({
	    	label: "Data Two",
	        data:d2,
	        bars: {order: 2}
	    });
	    ds.push({
	    	label: "Data Three",
	        data:d3,
	        bars: {order: 3}
	    });

		var options = {
				bars: {
					show:true,
					barWidth: 0.2,
					fill:1
				},
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: false,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {active:false}
		        },
		        legend: { position: "ne" },
		        colors: chartColours,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					}
				}
		};

		$.plot($(".order-bars-chart"), ds, options);
	});
	}//end if

	//Stacked bars chart
    if (divElement.hasClass('stacked-bars-chart')) {
	$(function () {
		//some data
		var d1 = [];
	    for (var i = 0; i <= 10; i += 1)
	        d1.push([i, parseInt(Math.random() * 30)]);
	 
	    var d2 = [];
	    for (var i = 0; i <= 10; i += 1)
	        d2.push([i, parseInt(Math.random() * 30)]);
	 
	    var d3 = [];
	    for (var i = 0; i <= 10; i += 1)
	        d3.push([i, parseInt(Math.random() * 30)]);
	 
	    var ds = new Array();
	 
	     ds.push({
	     	label: "Data One",
	        data:d1
	    });
	    ds.push({
	    	label: "Data Two",
	        data:d2
	    });
	    ds.push({
	    	label: "Data Tree",
	        data:d3
	    });

		var stack = 0, bars = true, lines = false, steps = false;

		var options = {
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {active:false},
		        	stack: stack,
	                lines: { show: lines, fill: true, steps: steps },
	                bars: { show: bars, barWidth: 0.5, fill:1}
			    },
		        xaxis: {ticks:11, tickDecimals: 0},
		        legend: { position: "se" },
		        colors: chartColours,
		        shadowSize:1,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					}
				}
		};

		$.plot($(".stacked-bars-chart"), ds, options);
	});
	}//end if



	//Lines chart without points
    if (divElement.hasClass('lines-chart')) {
	$(function () {

		//some data
		var d1 = [[1, 3+randNum()], [2, 6+randNum()], [3, 9+randNum()], [4, 12+randNum()],[5, 15+randNum()],[6, 18+randNum()],[7, 21+randNum()],[8, 15+randNum()],[9, 18+randNum()],[10, 21+randNum()],[11, 24+randNum()],[12, 27+randNum()],[13, 30+randNum()],[14, 33+randNum()],[15, 24+randNum()],[16, 27+randNum()],[17, 30+randNum()],[18, 33+randNum()],[19, 36+randNum()],[20, 39+randNum()],[21, 42+randNum()],[22, 45+randNum()],[23, 36+randNum()],[24, 39+randNum()],[25, 42+randNum()],[26, 45+randNum()],[27,38+randNum()],[28, 51+randNum()],[29, 55+randNum()], [30, 60+randNum()]];
		var d2 = [[1, randNum()-5], [2, randNum()-4], [3, randNum()-4], [4, randNum()],[5, 4+randNum()],[6, 4+randNum()],[7, 5+randNum()],[8, 5+randNum()],[9, 6+randNum()],[10, 6+randNum()],[11, 6+randNum()],[12, 2+randNum()],[13, 3+randNum()],[14, 4+randNum()],[15, 4+randNum()],[16, 4+randNum()],[17, 5+randNum()],[18, 5+randNum()],[19, 2+randNum()],[20, 2+randNum()],[21, 3+randNum()],[22, 3+randNum()],[23, 3+randNum()],[24, 2+randNum()],[25, 4+randNum()],[26, 4+randNum()],[27,5+randNum()],[28, 2+randNum()],[29, 2+randNum()], [30, 3+randNum()]];
		//define placeholder class
		var placeholder = $(".lines-chart");
		//graph options
		var options = {
				grid: {
					show: true,
				    aboveData: true,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {active:false},
		            lines: {
	            		show: true,
	            		fill: true,
	            		lineWidth: 2,
	            		steps: false
		            	},
		            points: {show:false}
		        },
		        legend: { position: "se" },
		        yaxis: { min: 0 },
		        xaxis: {ticks:11, tickDecimals: 0},
		        colors: chartColours,
		        shadowSize:1,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					}
				}
		    };   
	
        	$.plot(placeholder, [ 

        		{
        			label: "Visits", 
        			data: d1,
        			lines: {fillColor: "#f2f7f9"},
        			points: {fillColor: "#88bbc8"}
        		}, 
        		{	
        			label: "Unique Visits", 
        			data: d2,
        			lines: {fillColor: "#fff8f2"},
        			points: {fillColor: "#ed7a53"}
        		} 

        	], options);

	});
	}//end if

	//Horizontal bars chart
    if (divElement.hasClass('horizontal-bars-chart')) {
	$(function () {
		//some data
		//Display horizontal graph
    var d1_h = [];
    for (var i = 0; i <= 5; i += 1)
        d1_h.push([parseInt(Math.random() * 30),i ]);

    var d2_h = [];
    for (var i = 0; i <= 5; i += 1)
        d2_h.push([parseInt(Math.random() * 30),i ]);

    var d3_h = [];
    for (var i = 0; i <= 5; i += 1)
        d3_h.push([ parseInt(Math.random() * 30),i]);
                
    var ds_h = new Array();
    ds_h.push({
        data:d1_h,
        bars: {
            horizontal:true, 
            show: true, 
            barWidth: 0.2, 
            order: 1
        }
    });
	ds_h.push({
	    data:d2_h,
	    bars: {
	        horizontal:true, 
	        show: true, 
	        barWidth: 0.2, 
	        order: 2
	    }
	});
	ds_h.push({
	    data:d3_h,
	    bars: {
	        horizontal:true, 
	        show: true, 
	        barWidth: 0.2, 
	        order: 3
	    }
	});


		var options = {
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: false,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {active:false},
			        bars: {
			        	show:true,
						horizontal: true,
						barWidth:0.2,
						fill:1
					}
		        },
		        legend: { position: "ne" },
		        colors: chartColours,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					}
				}
		};

		$.plot($(".horizontal-bars-chart"), ds_h, options);
	});
	}//end if

	//Auto update chart
    if (divElement.hasClass('auto-update-chart')) {
	$(function () {
		// we use an inline data source in the example, usually data would
	    // be fetched from a server
	    var data = [], totalPoints = 300;
	    function getRandomData() {
	        if (data.length > 0)
	            data = data.slice(1);

	        // do a random walk
	        while (data.length < totalPoints) {
	            var prev = data.length > 0 ? data[data.length - 1] : 50;
	            var y = prev + Math.random() * 10 - 5;
	            if (y < 0)
	                y = 0;
	            if (y > 100)
	                y = 100;
	            data.push(y);
	        }

	        // zip the generated y values with the x values
	        var res = [];
	        for (var i = 0; i < data.length; ++i)
	            res.push([i, data[i]])
	        return res;
	    }

	    // Update interval
	    var updateInterval = 200;

	    // setup plot
	    var options = {
	        series: { 
	        	grow: {active:false}, //disable auto grow
	        	shadowSize: 0, // drawing is faster without shadows
	        	lines: {
            		show: true,
            		fill: true,
            		lineWidth: 2,
            		steps: false
	            }
	        },
	        grid: {
				show: true,
			    aboveData: false,
			    color: "#3f3f3f" ,
			    labelMargin: 5,
			    axisMargin: 0, 
			    borderWidth: 0,
			    borderColor:null,
			    minBorderMargin: 5 ,
			    clickable: true, 
			    hoverable: true,
			    autoHighlight: false,
			    mouseActiveRadius: 20
			}, 
			colors: chartColours,
	        tooltip: true, //activate tooltip
			tooltipOpts: {
				content: "Value is : %y.0",
				shifts: {
					x: -30,
					y: -50
				}
			},	
	        yaxis: { min: 0, max: 100 },
	        xaxis: { show: true}
	    };
	    var plot = $.plot($(".auto-update-chart"), [ getRandomData() ], options);

	    function update() {
	        plot.setData([ getRandomData() ]);
	        // since the axes don't change, we don't need to call plot.setupGrid()
	        plot.draw();
	        
	        setTimeout(update, updateInterval);
	    }

	    update();
	});
	}//end if

});//End document ready functions

//generate random number for charts
randNum = function(){
	//return Math.floor(Math.random()*101);
	return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
}

var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Full calendar  -------------//
	$(function () {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		//front page calendar
		$('#calendar').fullCalendar({
			//isRTL: true,
			//theme: true,
			header: {
				left: 'title,today',
				center: 'prev,next',
				right: 'month,agendaWeek,agendaDay'
			},
			buttonText: {
	        	prev: '<span class="icon24 icomoon-icon-arrow-left-2"></span>',
	        	next: '<span class="icon24 icomoon-icon-arrow-right-2"></span>'
	    	},
			editable: true,
			events: [
				{
					title: 'All Day Event',
					start: new Date(y, m, 1)
				},
				{
					title: 'Long Event',
					start: new Date(y, m, d-5),
					end: new Date(y, m, d-2)
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d-3, 16, 0),
					allDay: false
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d+4, 16, 0),
					allDay: false
				},
				{
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: false
				},
				{
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false,
					color: '#9FC569'
				},
				{
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: false,
					color: '#ED7A53'
				},
				{
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				}
			]
		});
	});

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})


	//circular progrress bar
	$(function () {

		$(".greenCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#9FC569',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".redCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#ED7A53',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".blueCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#88BBC8',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })

	});

	var divElement = $('div'); //log all div elements

	//------------- Visitor chart -------------//

	if (divElement.hasClass('visitors-chart')) {
	$(function () {
		//some data
		var d1 = [[1, 3+randNum()], [2, 6+randNum()], [3, 9+randNum()], [4, 12+randNum()],[5, 15+randNum()],[6, 18+randNum()],[7, 21+randNum()],[8, 15+randNum()],[9, 18+randNum()],[10, 21+randNum()],[11, 24+randNum()],[12, 27+randNum()],[13, 30+randNum()],[14, 33+randNum()],[15, 24+randNum()],[16, 27+randNum()],[17, 30+randNum()],[18, 33+randNum()],[19, 36+randNum()],[20, 39+randNum()],[21, 42+randNum()],[22, 45+randNum()],[23, 36+randNum()],[24, 39+randNum()],[25, 42+randNum()],[26, 45+randNum()],[27,38+randNum()],[28, 51+randNum()],[29, 55+randNum()], [30, 60+randNum()]];
		var d2 = [[1, randNum()-5], [2, randNum()-4], [3, randNum()-4], [4, randNum()],[5, 4+randNum()],[6, 4+randNum()],[7, 5+randNum()],[8, 5+randNum()],[9, 6+randNum()],[10, 6+randNum()],[11, 6+randNum()],[12, 2+randNum()],[13, 3+randNum()],[14, 4+randNum()],[15, 4+randNum()],[16, 4+randNum()],[17, 5+randNum()],[18, 5+randNum()],[19, 2+randNum()],[20, 2+randNum()],[21, 3+randNum()],[22, 3+randNum()],[23, 3+randNum()],[24, 2+randNum()],[25, 4+randNum()],[26, 4+randNum()],[27,5+randNum()],[28, 2+randNum()],[29, 2+randNum()], [30, 3+randNum()]];
		//define placeholder class
		var placeholder = $(".visitors-chart");
		//graph options
		var options = {
				grid: {
					show: true,
				    aboveData: true,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {
		        		active: false,
		        		stepMode: "linear",
		        		steps: 50,
		        		stepDelay: true
		        	},
		            lines: {
	            		show: true,
	            		fill: true,
	            		lineWidth: 4,
	            		steps: false
		            	},
		            points: {
		            	show:true,
		            	radius: 5,
		            	symbol: "circle",
		            	fill: true,
		            	borderColor: "#fff"
		            }
		        },
		        legend: { 
		        	position: "ne", 
		        	margin: [0,-25], 
		        	noColumns: 0,
		        	labelBoxBorderColor: null,
		        	labelFormatter: function(label, series) {
					    // just add some space to labes
					    return label+'&nbsp;&nbsp;';
					 }
		    	},
		        yaxis: { min: 0 },
		        xaxis: {ticks:11, tickDecimals: 0},
		        colors: chartColours,
		        shadowSize:1,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					}
				}
		    };   
	
        	$.plot(placeholder, [ 

        		{
        			label: "Visits", 
        			data: d1,
        			lines: {fillColor: "#f2f7f9"},
        			points: {fillColor: "#88bbc8"}
        		}, 
        		{	
        			label: "Unique Visits", 
        			data: d2,
        			lines: {fillColor: "#fff8f2"},
        			points: {fillColor: "#ed7a53"}
        		} 

        	], options);
	        
    });
    }//end if

    //pie visits graph
	if (divElement.hasClass('pieStats')) {
	$(function () {
	   var data = [
		    { label: "%78.75 New Visitor",  data: 78.75, color: "#88bbc8"},
		    { label: "%21.25 Returning Visitor",  data: 21.25, color: "#ed7a53"}
		];
		
		$.plot($(".pieStats"), data, 
		{
			series: {
				pie: { 
					show: true,
					highlight: {
						opacity: 0.1
					},
					stroke: {
						color: '#fff',
						width: 3
					},
					startAngle: 2,
					label: {
						radius:1
					}
				},
				grow: {	active: false}
			},
			legend: { 
	        	position: "ne", 
	        	labelBoxBorderColor: null
	    	},
			grid: {
	            hoverable: true,
	            clickable: true
	        },
	        tooltip: true, //activate tooltip
			tooltipOpts: {
				content: "%s : %y.1",
				shifts: {
					x: -30,
					y: -50
				}
			}
		});
	});
	}//end if


});//End document ready functions

//generate random number for charts
randNum = function(){
	//return Math.floor(Math.random()*101);
	return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
}

var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];

//sparklines (making loop with random data for all 7 sparkline)
i=1;
for (i=1; i<8; i++) {
 	var data = [[1, 3+randNum()], [2, 5+randNum()], [3, 8+randNum()], [4, 11+randNum()],[5, 14+randNum()],[6, 17+randNum()],[7, 20+randNum()], [8, 15+randNum()], [9, 18+randNum()], [10, 22+randNum()]];
 	placeholder = '.sparkLine' + i;
	$(placeholder).sparkline(data, { 
		width: 100,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
		height: 30,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
		lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
		fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
		spotColor: '#467e8c',//The CSS colour of the final value marker. Set to false or an empty string to hide it
		maxSpotColor: '#9FC569',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
		minSpotColor: '#ED7A53',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
		spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
		lineWidth: 2//In pixels (default: 1) - Integer
	});
}

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//--------------- Data tables ------------------//
	if($('table').hasClass('dynamicTable')){
		$('.dynamicTable').dataTable({
			"sPaginationType": "full_numbers",
			"bJQueryUI": false,
			"bAutoWidth": false,
			"bLengthChange": false,
			"fnInitComplete": function(oSettings, json) {
		      $('.dataTables_filter>label>input').attr('id', 'search');
		    }
		});
	}

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	
	//sort options
	$('#sort-layout div[class*="span"]').sortable({
    	connectWith: '#sort-layout div[class*="span"]',
        handle: '.title',
        placeholder: "sortable-placeholder",
        forcePlaceholderSize: true,
        helper: 'original',
        forceHelperSize: true,
        cursor: "move",
        /*delay: 150,
        distance: 5,*/
        opacity: 0.8,
        tolerance: "pointer",
        /*start: function(e, ui){
	        ui.placeholder.height(ui.item.height());
	    }*/
        
    });

    $('.box').disableSelection();

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//--------------- Tabs ------------------//

    $('#myTab a').click(function (e) {
	  	e.preventDefault();
	  	$(this).tab('show');
	})
    //activate loaders tabs
	$('#myTabLoaders a').click(function (e) {
	  	e.preventDefault();
	  	$(this).tab('show');
	})

    //make 2 tab active ( remove if not want )
	$('.tabs-right li:eq(1) a').tab('show'); // Select third tab (0-indexed)
	$('.tabs-left li:eq(1) a').tab('show'); // Select third tab (0-indexed)

	$('#loadersTab a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	})

	//--------------- Accordion ------------------//
    var acc = $('.accordion'); //get all accordions
    var accHeading = acc.find('.accordion-heading');
	var accBody = acc.find('.accordion-body');

	//function to put icons
	accPutIcon = function () {
		acc.each(function(index) {
		   accExp = $(this).find('.accordion-body.in');
		   accExp.prev().find('a.accordion-toggle').append($('<span class="icon12 entypo-icon-minus-2 gray"></span>'));

		   accNor = $(this).find('.accordion-body').not('.accordion-body.in');
		   accNor.prev().find('a.accordion-toggle').append($('<span class="icon12 entypo-icon-plus-2 gray"></span>'));


		});
	}

	//function to update icons
	accUpdIcon = function() {
		acc.each(function(index) {
		   accExp = $(this).find('.accordion-body.in');
		   accExp.prev().find('span').remove();
		   accExp.prev().find('a.accordion-toggle').append($('<span class="icon12 entypo-icon-minus-2 gray"></span>'));

		   accNor = $(this).find('.accordion-body').not('.accordion-body.in');
		   accNor.prev().find('span').remove();
		   accNor.prev().find('a.accordion-toggle').append($('<span class="icon12 entypo-icon-plus-2 gray"></span>'));


		});
	}

	accPutIcon();

	$('.accordion').on('shown', function () {
		accUpdIcon();
	}).on('hidden', function () {
		accUpdIcon();
	})

	//--------------- Sliders ------------------//
	//simple slider
	$( "#slider" ).slider(); 
	//with 50 range
	$( "#slider1" ).slider({
		range: "min",
		value:100,
		min: 1,
		max: 500,
		step: 50,
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.value );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
	//range slider
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( "#amount1" ).val( "Price range: $" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#amount1" ).val( "Price range: $" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );

	//with minimum
	$( "#slider-range-min" ).slider({
		range: "min",
		value: 37,
		min: 1,
		max: 700,
		slide: function( event, ui ) {
			$( "#amount2" ).val( "Maximum price: $" + ui.value );
		}
	});
	$( "#amount2" ).val( "Maximum price: $" + $( "#slider-range-min" ).slider( "value" ) );
	//with maximum
	$( "#slider-range-max" ).slider({
		range: "max",
		min: 1,
		max: 10,
		value: 2,
		slide: function( event, ui ) {
			$( "#amount3" ).val("Minimum number of bedrooms:" + ui.value );
		}
	});
	$( "#amount3" ).val( "Minimum number of bedrooms:" + $( "#slider-range-max" ).slider( "value" ) );

	//vertical sliders
	$( "#eq > span" ).each(function() {
		// read initial values from markup and remove that
		var value = parseInt( $( this ).text(), 10 );
		$( this ).empty().slider({
			value: value,
			range: "min",
			animate: true,
			orientation: "vertical"
		});
	});

	//--------------- Progress bars ------------------//
	$( "#progressbar" ).progressbar({
		value: 37
	});

	//animated progress bar
	$('#progress1').anim_progressbar();

	// from second #5 till 15
    var iNow = new Date().setTime(new Date().getTime() + 5 * 1000); // now plus 5 secs
    var iEnd = new Date().setTime(new Date().getTime() + 15 * 1000); // now plus 15 secs
    $('#progress2').anim_progressbar({start: iNow, finish: iEnd, interval: 100});

    // we will just set interval of updating to 2 sec
    $('#progress3').anim_progressbar({interval: 2000});

	//circular progrress bar
	$(function () {

		$(".greenCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#9FC569',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".redCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#ED7A53',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".blueCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#88BBC8',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })

	});

    //--------------- Dialogs ------------------//
	$('#openDialog').click(function(){
		$('#dialog').dialog('open');
		return false;
	});

	$('#openModalDialog').click(function(){
		$('#modal').dialog('open');
		return false;
	});

	// JQuery Dialog			
	$('#dialog').dialog({
		autoOpen: false,
		dialogClass: 'dialog',
		buttons: {
			"Close": function() { 
				$(this).dialog("close"); 
			}
		}
	});

	// JQuery UI Modal Dialog			
	$('#modal').dialog({
		autoOpen: false,
		modal: true,
		dialogClass: 'dialog',
		buttons: {
			"Close": function() { 
				$(this).dialog("close"); 
			}
		}
	});

	$("div.dialog button").addClass("btn");

	//Boostrap modal
	$('#myModal').modal({ show: false});
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	$.pnotify({
		    title: 'Modal',
		    text: 'Modal window is closed',
		    icon: 'picon icon16 entypo-icon-warning white',
		    opacity: 0.95,
		    sticker: false,
		    history: false
		});
	})

	//--------------- Popovers ------------------//
	//using data-placement trigger
	$("a[rel=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
     })

    //using js trigger
    $("a[rel=popoverTop]")
      .popover({placement: 'top'})
      .click(function(e) {
        e.preventDefault()
     })


    //--------------- Pines notify  ------------------//

    //regular notice
    $('#noticeR').click(function(){
		$.pnotify({
		    title: 'Regular Notice',
		    text: 'Check me out! I\'m a notice.',
		    icon: 'picon icon16 entypo-icon-warning white',
		    opacity: 0.95,
		    sticker: false,
		    history: false
		});
	});

	//Sticky notice
    $('#noticeS').click(function(){
		$.pnotify({
		    title: 'Sticky Notice',
		    text: 'Check me out! I\'m a sticky notice. You\'ll have to close me yourself.',
		    hide: false,
		    icon: 'picon icon16 entypo-icon-warning white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
	});

	//Regular info
    $('#infoR').click(function(){
		$.pnotify({
			type: 'info',
		    title: 'New Thing',
    		text: 'Just to let you know, something happened.',
		    icon: 'picon icon16 brocco-icon-info white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
	});

	//Sticky info
    $('#infoS').click(function(){
		$.pnotify({
			type: 'info',
		    title: 'Sticky Info',
   			text: 'Sticky info, you know, like a newspaper covered in honey.',
		    icon: 'picon icon16 brocco-icon-info white',
		    hide: false,
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
	});

	//Regular success
    $('#successR').click(function(){
		$.pnotify({
			type: 'success',
		    title: 'Regular Success',
    		text: 'That thing that you were trying to do worked!',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
	});

	//Sticky success
    $('#successS').click(function(){
		$.pnotify({
			type: 'success',
		    title: 'Sticky Success',
    		text: 'Sticky success... I\'m not even gonna make a joke.',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    hide:false,
		    history: false,
		    sticker: false
		});
	});

	//Regular success
    $('#errorR').click(function(){
		$.pnotify({
			type: 'error',
		    title: 'Oh No!',
    		text: 'Something terrible happened.',
		    icon: 'picon icon24 typ-icon-cancel white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
	});

	//Sticky success
    $('#errorS').click(function(){
		$.pnotify({
			type: 'error',
		    title: 'Oh No!',
    		text: 'Something terrible happened.',
		    icon: 'picon icon24 typ-icon-cancel white',
		    opacity: 0.95,
		    hide:false,
		    history: false,
		    sticker: false
		});
	});
	
	//--------------- Boostrap tooltips ------------------//
    $('.btip').tooltip();

    	
	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//--------------- Data tables ------------------//

	if($('table').hasClass('emailTable')){
		$('.emailTable').dataTable({
			"bJQueryUI": false,
			"bAutoWidth": false,
			"bLengthChange": false,
			"oLanguage": {
				"sSearch": "",
		        "sInfo": "Got a total of _TOTAL_ emails to show (_START_ to _END_)"
		    },
		    "fnDrawCallback": function(){
    			$("input[type=checkbox]").uniform();
            },
		    "aoColumns": [
			    { 
			    	"sWidth": "10px",
			    	"bSortable": false
			    },
			    { 
			    	"sWidth": "10px", 
			    	"bSortable": false
			    },
				{ 
			    	"bSortable": false
			    },
				{ 
			    	"bSortable": false
			    },
			    { 
			    	"sWidth": "20px",
			    	"bSortable": false
			    },
				{ 
			    	"sWidth": "80px", 
			    	"bSortable": false
		    	}
		    ]
		});
	}		

	//------------- Email page  -------------//
	
	var emailTable = $('.emailTable');
	var emailStar = emailTable.find('td.star>span.icon16');

	//setup the star in click
	emailStar.click(function() {
		if($(this).hasClass('icomoon-icon-star-3')) {
			$(this).removeClass('icomoon-icon-star-3').addClass('icomoon-icon-star');
			//make callback here

		} else {
			$(this).removeClass('icomoon-icon-star').addClass('icomoon-icon-star-3');
			//make callback here
		}
	});

	//auto complete for compose To form field
	$('#to').typeahead({
		source: ['jonh@yahoo.com','silva@yahoo.com','carlos@gmail.com','sugge@gmail.com']
	})

	//check all checkboxes in email table
	$(".checkAll").click(function() {
		var $this = $(this);
		var checkedStatus = $this.find('span').hasClass('checked');
		$(".emailTable tr .check input:checkbox").each(function() {
			this.checked = checkedStatus;
				if (checkedStatus == this.checked) {
					$(this).closest('.checker > span').removeClass('checked');
				}
				if (this.checked) {
					$(this).closest('.checker > span').addClass('checked');
				}
		});
	});

	//show compose form
	$('.composeBtn>.btn').click(function() {
		$('.email-content>.box.plain').fadeOut(200);
		$('.compose').fadeIn();
	});

	//close compose form on discard click
	$('#discard').click(function() {
		$('.compose').fadeOut(200);
		$('.email-content>.box.plain').fadeIn(300);
	});

	//save click event
	$('#save').click(function() {
		$('.compose').fadeOut(200);
		$('.email-content>.box.plain').fadeIn(300);
		$.pnotify({
			type: 'success',
		    title: 'Done',
    		text: 'Email is saved',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
		//save callback here
	});

	//on send msg click
	$('#send').click(function() {
		$('.compose').fadeOut(200);
		$('.email-content>.box.plain').fadeIn(300);
		//add some notification
		$.pnotify({
			type: 'success',
		    title: 'Done',
    		text: 'Email send successfull',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
		//calback function here
	});

	//on send msg click
	$('#backToInbox').click(function() {
		$('.read-email').fadeOut(200);
		$('.email-content>.box.plain').fadeIn(300);
		//calback function here
	});

	emailTable.find('td a.link').click(function() {
		$('.email-content>.box.plain').fadeOut(200);
		$('.read-email').fadeIn(300);
		//calback function here
	});


	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Elfinder file manager  -------------//
    var elf = $('#elfinder').elfinder({
		// lang: 'ru',             // language (OPTIONAL)
		url : 'php/connector.php'  // connector URL (REQUIRED)
	}).elfinder('instance');

    //------------- Plupload php upload  -------------//
    // Setup html4 version
	$("#html4_uploader").pluploadQueue({
		// General settings
		runtimes : 'html4', 
		url : 'php/upload.php',
		max_file_size : '10mb',
		max_file_count: 15, // user can add no more then 15 files at a time
		chunk_size : '1mb',
		unique_names : true,
		multiple_queues : true,

		// Resize images on clientside if we can
		resize : {width : 320, height : 240, quality : 80},
		
		// Rename files by clicking on their titles
		rename: true,
		
		// Sort files
		sortable: true,

		// Specify what files to browse for
		filters : [
			{title : "Image files", extensions : "jpg,gif,png"},
			{title : "Zip files", extensions : "zip,avi"}
		]
	});

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Select plugin -------------//
	$("#select1").select2();

	/*Wizard with validation*/
    $('#wizard-validation').smartWizard({
  		transitionEffect: 'fade', // Effect on navigation, none/fade/slide/
  		onLeaveStep:leaveAStepCallbackValidation,
        onFinish:onFinishCallbackValidaton
    });

    function leaveAStepCallbackValidation(obj){
        var step = obj;
        var stepN = step.attr('rel')
        
       /* if(stepN == 1) { return true;}     */  
        //validate step 1
        if(stepN == 1) {

        	if ($("#username1").valid() == true ) {
		        var validate = true;
		    } else {
		    	var validate = false;
		    }
		    if ($("#password1").valid() == true ) {
		        var validate1 = true;
		    } 
		    else {
		    	var validate1 = false;
		    }
		    if ($("#passwordConfirm1").valid() == true ) {
		        var validate2 = true;
		    } 
		    else {
		    	var validate2 = false;
		    }

	        if(validate == true && validate1 == true && validate2 == true) {
	        	step.find('.stepNumber').stop(true, true).remove();
        		step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
	        	return true;
	        } else {
	        	return false;
	        }
        }
        //validate step 2
        if(stepN == 2) {

        	if ($("#fname").valid() == true ) {
		        var validate3 = true;
		    } else {
		    	var validate3 = false;
		    }
		    if ($("#lname").valid() == true ) {
		        var validate4 = true;
		    } else {
		    	var validate4 = false;
		    }
		    if ($("#gender").valid() == true ) {
		        var validate5 = true;
		    } 
		    else {
		    	var validate5 = false;
		    }

	        if(validate3 == true && validate4 == true && validate5 == true) {
	        	step.find('.stepNumber').stop(true, true).remove();
        		step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
	        	return true;
	        } else {
	        	return false;
	        }
        }

        //validate step 2
        if(stepN == 3) {

        	if ($("#email1").valid() == true ) {
		        var validate6 = true;
		    } else {
		    	var validate6 = false;
		    }
		   
	        if(validate6 == true ) {
	        	step.find('.stepNumber').stop(true, true).remove();
        		step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
	        	return true;
	        } else {
	        	return false;
	        }
        }
       
    }
    function onFinishCallbackValidaton(obj){
    	var step = obj;
    	step.find('.stepNumber').stop(true, true).remove();
        step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
      	$.pnotify({
			type: 'success',
		    title: 'Done',
    		text: 'You finish the wizzard',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
		$('#wizzard-form').submit();
    }
    
	//--------------- Form validation ------------------//
	$('#select1').select2({placeholder: "Select"});
    $("#form-validate").validate({
    	ignore: null,
    	ignore: 'input[type="hidden"]',
    	rules: {
    		select1: "required",
			required: "required",
			requiredArea: "required",
			required1: {
				required: true,
				minlength: 4
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			maxLenght: {
				required: true,
      			maxlength: 10
			},
			rangelenght: {
		      required: true,
		      rangelength: [10, 20]
		    },
		    minval: {
		      required: true,
		      min: 13
		    },
		    maxval: {
		      required: true,
		      max: 13
		    },
		    range: {
		      required: true,
		      range: [5, 10]
		    },
		    url: {
		      required: true,
		      url: true
		    },
		    date: {
		      required: true,
		      date: true
		    },
		    number: {
		      required: true,
		      number: true
		    },
		    digits: {
		      required: true,
		      digits: true
		    },
		    ccard: {
		      required: true,
		      creditcard: true
		    },
			agree: "required"
		},
		messages: {
			required: "Please enter a something",
			required1: {
				required: "This field is required",
				minlength: "This field must consist of at least 4 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy"
		}
    });

	$("#wizzard-form").validate({
    	rules: {
    		fname: {
				required: true,
				minlength: 4
			},
			lname: {
				required: true,
				minlength: 4
			},
			gender: {
				required: true
			},
			username1: {
				required: true,
				minlength: 4
			},
			password1: {
				required: true,
				minlength: 5
			},
			confirm_password1: {
				required: true,
				minlength: 5,
				equalTo: "#password1"
			},
			email1: {
				required: true,
				email: true
			}
		},
		messages: {
			fname: {
				required: "This field is required",
				minlength: "This field must consist of at least 4 characters"
			},
			lname: {
				required: "This field is required",
				minlength: "This field must consist of at least 4 characters"
			},
			password1: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password1: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email1: "Please enter a valid email address",
			gender: "Choise a gender"
		}	
    });

//------------- Combobox  -------------//
    (function( $ ) {
        $.widget( "ui.combobox", {
            _create: function() {
                var input,
                    self = this,
                    select = this.element.hide(),
                    selected = select.children( ":selected" ),
                    value = selected.val() ? selected.text() : "",
                    wrapper = this.wrapper = $( "<span>" )
                        .addClass( "ui-combobox" )
                        .insertAfter( select );

                input = $( "<input>" )
                    .appendTo( wrapper )
                    .val( value )
                    .addClass( "ui-state-default ui-combobox-input" )
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: function( request, response ) {
                            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                            response( select.children( "option" ).map(function() {
                                var text = $( this ).text();
                                if ( this.value && ( !request.term || matcher.test(text) ) )
                                    return {
                                        label: text.replace(
                                            new RegExp(
                                                "(?![^&;]+;)(?!<[^<>]*)(" +
                                                $.ui.autocomplete.escapeRegex(request.term) +
                                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                            ), "<strong>$1</strong>" ),
                                        value: text,
                                        option: this
                                    };
                            }) );
                        },
                        select: function( event, ui ) {
                            ui.item.option.selected = true;
                            self._trigger( "selected", event, {
                                item: ui.item.option
                            });
                        },
                        change: function( event, ui ) {
                            if ( !ui.item ) {
                                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                                    valid = false;
                                select.children( "option" ).each(function() {
                                    if ( $( this ).text().match( matcher ) ) {
                                        this.selected = valid = true;
                                        return false;
                                    }
                                });
                                if ( !valid ) {
                                    // remove invalid value, as it didn't match anything
                                    $( this ).val( "" );
                                    select.val( "" );
                                    input.data( "autocomplete" ).term = "";
                                    return false;
                                }
                            }
                        }
                    })
                    .addClass( "ui-widget ui-widget-content ui-corner-left" );

                input.data( "autocomplete" )._renderItem = function( ul, item ) {
                    return $( "<li></li>" )
                        .data( "item.autocomplete", item )
                        .append( "<a>" + item.label + "</a>" )
                        .appendTo( ul );
                };

                $( "<a>" )
                    .attr( "tabIndex", -1 )
                    .attr( "title", "Show All Items" )
                    .appendTo( wrapper )
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass( "ui-corner-all" )
                    .addClass( "ui-corner-right ui-combobox-toggle" )
                    .click(function() {
                        // close if already visible
                        if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                            input.autocomplete( "close" );
                            return;
                        }

                        // work around a bug (likely same cause as #5265)
                        $( this ).blur();

                        // pass empty string as value to search for, displaying all results
                        input.autocomplete( "search", "" );
                        input.focus();
                    });
            },

            destroy: function() {
                this.wrapper.remove();
                this.element.show();
                $.Widget.prototype.destroy.call( this );
            }
        });
    })( jQuery );

    if($("#combobox").length) {
    	$( "#combobox" ).combobox();
    }

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Tags plugin  -------------//
	
	$("#tags").select2({
		tags:["red", "green", "blue", "orange"]
	});

	//------------- Elastic textarea -------------//
	if ($('textarea').hasClass('elastic')) {
		$('.elastic').elastic();
	}

	//------------- Input limiter -------------//
	if ($('textarea').hasClass('limit')) {
		$('.limit').inputlimiter({
			limit: 100
		});
	}

	//------------- Masked input fields -------------//
	$("#mask-phone").mask("(999) 999-9999", {completed:function(){alert("Callback action after complete");}});
	$("#mask-phoneExt").mask("(999) 999-9999? x99999");
	$("#mask-phoneInt").mask("+40 999 999 999");
	$("#mask-date").mask("99/99/9999");
	$("#mask-ssn").mask("999-99-9999");
	$("#mask-productKey").mask("a*-999-a999", { placeholder: "*" });
	$("#mask-eyeScript").mask("~9.99 ~9.99 999");
	$("#mask-percent").mask("99%");

	//------------- I button  -------------//
	$(".ibutton").iButton({
		 labelOn: "ON",
		 labelOff: "OFF",
		 enableDrag: false
	});
	$(".ibutton1").iButton({
		 labelOn: "ONLINE",
		 labelOff: "OFFLINE",
		 enableDrag: false
	});
	$(".ibuttonCheck").iButton({
		 labelOn: "<span class='icon16 icomoon-icon-checkmark-2 white'></span>",
		 labelOff: "<span class='icon16 icomoon-icon-cancel-3 white'></span>",
		 enableDrag: false
	});

	//------------- Spinners with steps  -------------//
	if($('#ns_0').length) {
		$('#ns_0').stepper();
	}
	if($('#ns_1').length) {
		$('#ns_1').stepper({
			min:-100, 
			max:100, 
			step:10,
			start:-100
		});
	}
	if($('#ns_2').length) {
		$('#ns_2').stepper({
			step:0.1, 
			decimals:1
		});
	}
	if($('#ns_3').length) {
		$('#ns_3').stepper({
			step:0.5, 
			format:'currency'
		});
	}

	//------------- Colorpicker -------------//
	if($('div').hasClass('picker')){
		$('.picker').farbtastic('#color');
	}	
	//------------- Datepicker -------------//
	if($('#datepicker').length) {
		$("#datepicker").datepicker({
			showOtherMonths:true
		});
	}
	if($('#datepicker-inline').length) {
		$('#datepicker-inline').datepicker({
	        inline: true,
			showOtherMonths:true
	    });
	}

	//------------- Combined picker -------------//
	if($('#combined-picker').length) {
		$('#combined-picker').datetimepicker();
	}
	
    //------------- Time entry (picker) -------------//
	$('#timepicker').timeEntry({
		show24Hours: true,
		spinnerImage: ''
	});
	$('#timepicker').timeEntry('setTime', '22:15')

	//------------- Select plugin -------------//
	$("#select1").select2();
	$("#select2").select2();

	//--------------- Dual multi select ------------------//
	$.configureBoxes();

	//--------------- Tinymce ------------------//
	$('textarea.tinymce').tinymce({
		// Location of TinyMCE script
		script_url : 'plugins/forms/tiny_mce/tiny_mce.js',

		// General options
		theme : "advanced",
		plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

		// Theme options
		theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,

		// Example content CSS (should be your site CSS)
		content_css : "css/main.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "lists/template_list.js",
		external_link_list_url : "lists/link_list.js",
		external_image_list_url : "lists/image_list.js",
		media_external_list_url : "lists/media_list.js",

		// Replace values for the template plugin
		template_replace_values : {
			username : "SuprUser",
			staffid : "991234"
		}
	});

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
//window resize events
$(window).resize(function() {
	//get the window size
	var wsize =  $(window).width();
	if (wsize > 980 ) {
		$('.shortcuts.hided').removeClass('hided').attr("style","");
		$('.sidenav.hided').removeClass('hided').attr("style","");
	}

	var size ="Window size is:" + $(window).width();
	//console.log(size);
});

$(window).load(function() {
	var wheight = $(window).height();
	$('#sidebar.scrolled').css('height', wheight-63+'px');
});

// document ready function
$(document).ready(function() { 	

	//prevent font flickering in some browsers 
	(function(){
	  //if firefox 3.5+, hide content till load (or 3 seconds) to prevent FOUT
	  var d = document, e = d.documentElement, s = d.createElement('style');
	  if (e.style.MozTransform === ''){ // gecko 1.9.1 inference
	    s.textContent = 'body{visibility:hidden}';
	    e.firstChild.appendChild(s);
	    function f(){ s.parentNode && s.parentNode.removeChild(s); }
	    addEventListener('load',f,false);
	    setTimeout(f,3000); 
	  }
	})();
	
  	//Disable certain links
    $('a[href^=#]').click(function (e) {
      e.preventDefault()
    })

    $('.search-btn').addClass('nostyle');//tell uniform to not style this element

 
	//------------- Navigation -------------//

	mainNav = $('.mainnav>ul>li');
	mainNav.find('ul').siblings().addClass('hasUl').append('<span class="hasDrop icon16 icomoon-icon-arrow-down-2"></span>');
	mainNavLink = mainNav.find('a').not('.sub a');
	mainNavLinkAll = mainNav.find('a');
	mainNavSubLink = mainNav.find('.sub a').not('.sub li .sub a');
	mainNavCurrent = mainNav.find('a.current');

	//remove current class if have
	mainNavCurrent.removeClass('current');
	//set the seleceted menu element
	if ($.cookie("newCurrentMenu")) {
		mainNavLinkAll.each(function(index) {
			if($(this).attr('href') == $.cookie("newCurrentMenu")) {
				//set new current class
				$(this).addClass('current');

				ulElem = $(this).closest('ul');
				if(ulElem.hasClass('sub')) {
					//its a part of sub menu need to expand this menu
					aElem = ulElem.prev('a.hasUl').addClass('drop');
					ulElem.addClass('expand');
				} 
				//create new cookie
				$.cookie("currentPage",$(this).attr('href'));
			}
		});
	}	
	
	//hover magic add blue color to icons when hover - remove or change the class if not you like.
	mainNavLinkAll.hover(
	  function () {
	    $(this).find('span.icon16').addClass('blue');
	  }, 
	  function () {
	    $(this).find('span.icon16').removeClass('blue');
	  }
	);

	//click magic
	mainNavLink.click(function(event) {
		$this = $(this);
		
		if($this.hasClass('hasUl')) {
			event.preventDefault();
			if($this.hasClass('drop')) {
				$(this).siblings('ul.sub').slideUp(500, 'jswing').siblings().removeClass('drop');
			} else {
				$(this).siblings('ul.sub').slideDown(500, 'jswing').siblings().addClass('drop');
			}			
		} else {
			//has no ul so store a cookie for change class.
			$.cookie("newCurrentMenu",$this.attr('href') ,{expires: null});
		}
	});
	mainNavSubLink.click(function(event) {
		$this = $(this);
		
		if($this.hasClass('hasUl')) {
			event.preventDefault();
			if($this.hasClass('drop')) {
				$(this).siblings('ul.sub').slideUp(500).siblings().removeClass('drop');
			} else {
				$(this).siblings('ul.sub').slideDown(250).siblings().addClass('drop');
			}			
		} else {
			//has no ul so store a cookie for change class.
			$.cookie("newCurrentMenu",$this.attr('href') ,{expires: null});
		}
	});

	//responsive buttons
	$('.resBtn>a').click(function(event) {
		$this = $(this);
		if($this.hasClass('drop')) {
			$('#sidebar>.shortcuts').slideUp(500).addClass('hided');
			$('#sidebar>.sidenav').slideUp(500).addClass('hided');
			$('#sidebar-right>.shortcuts').slideUp(500).addClass('hided');
			$('#sidebar-right>.sidenav').slideUp(500).addClass('hided');
			$this.removeClass('drop');
		} else {
			if($('#sidebar').length) {
				$('#sidebar').css('display', 'block');
				if($('#sidebar-right').length) {
					$('#sidebar-right').css({'display' : 'block', 'margin-top' : '0'});
				}
			}
			if($('#sidebar-right').length) {
				$('#sidebar-right').css('display', 'block');
			}
			$('#sidebar>.shortcuts').slideDown(250);
			$('#sidebar>.sidenav').slideDown(250);
			$('#sidebar-right>.shortcuts').slideDown(250);
			$('#sidebar-right>.sidenav').slideDown(250);
			$this.addClass('drop');
		}
	});
	$('.resBtnSearch>a').click(function(event) {
		$this = $(this);
		if($this.hasClass('drop')) {
			$('.search').slideUp(500);
			$this.removeClass('drop');
		} else {
			$('.search').slideDown(250);
			$this.addClass('drop');
		}
	});
	
	//Hide and show sidebar btn

	$(function () {
		//var pages = ['grid.html','charts.html'];
		var pages = [];
	
		for ( var i = 0, j = pages.length; i < j; i++ ) {

		    if($.cookie("currentPage") == pages[i]) {
				var cBtn = $('.collapseBtn.leftbar');
				cBtn.children('a').attr('title','Show Left Sidebar');
				cBtn.addClass('shadow hide');
				cBtn.css({'top': '20px', 'left':'200px'});
				$('#sidebarbg').css('margin-left','-299'+'px');
				$('#sidebar').css('margin-left','-299'+'px');
				if($('#content').length) {
					$('#content').css('margin-left', '0');
				}
				if($('#content-two').length) {
					$('#content-two').css('margin-left', '0');
				}
		    }

		}
		
	});

	$( '.collapseBtn' ).bind( 'click', function(){
		$this = $(this);

		//left sidbar clicked
		if ($this.hasClass('leftbar')) {
			
			if($(this).hasClass('hide')) {
				//show sidebar
				$('#sidebarbg').css('margin-left','0');
				$('#content').css('margin-left', '213'+'px');
				$('#content-two').css('margin-left', '213'+'px');
				$('#sidebar').css({'left' : '0', 'margin-left' : '0'});

				$this.removeClass('hide');
				$('.collapseBtn.leftbar').css('top', '120'+'px').css('left', '170'+'px').removeClass('shadow');
				$this.children('a').attr('title','Hide Left Sidebar');

			} else {
				//hide sidebar
				$('#sidebarbg').css('margin-left','-299'+'px');
				$('#sidebar').css('margin-left','-299'+'px');
				$('.collapseBtn.leftbar').animate({ //use .hide() if you experience heavy animation :)
				    left: '200',
				    top: '20'
				  }, 500, 'easeInExpo', function() {
				    // Animation complete.
				  
				}).addClass('shadow');
				//expand content
				$this.addClass('hide');
				$this.children('a').attr('title','Show Left Sidebar');
				if($('#content').length) {
					$('#content').css('margin-left', '0');
				}
				if($('#content-two').length) {
					$('#content-two').css('margin-left', '0');
				}
							
			}

		}

		//right sidebar clicked
		if ($this.hasClass('rightbar')) {
			
			if($(this).hasClass('hide')) {
				//show sidebar
				$('#sidebarbg-right').css('margin-right','0');
				$('#sidebar-right').css({'right' : '0', 'margin-right' : '0'});
				if($('#content').length) {
					$('#content').css('margin-left', '213'+'px');
				}
				if($('#content-one').length) {
					$('#content-one').css('margin-right', '212'+'px');
				}
				if($('#content-two').length) {
					$('#content-two').css({'margin-right' : '212' + 'px'});
				}			
				/*if($('#sidebar').length) {
					$('#sidebar').css({'left' : '0', 'margin-left' : '0'});
				}*/
				$this.removeClass('hide');
				$('.collapseBtn.rightbar').css('top', '120'+'px').css('right', '18'+'px').removeClass('shadow');
				$this.children('a').attr('title','Hide Right Sidebar');
				
			} else {
				//hide sidebar
				$('#sidebarbg-right').css('margin-right','-299'+'px');			
				$('#sidebar-right').css('margin-right','-299'+'px');
				if($('#content').length) {
					$('#content').css('margin-right', '0');
				}
				if($('#content-one').length) {
					$('#content-one').css({'margin-left': '0', 'margin-right' : '0'});
				}
				if($('#content-two').length) {
					$('#content-two').css({'margin-right' : '0'});
				}	
				$('.collapseBtn.rightbar').animate({ //use .hide() if you experience heavy animation :)
				    right: '10',
				    top: '78'
				  }, 500, 'easeInExpo', function() {
				    // Animation complete.
				  
				}).addClass('shadow');
				//expand content
				$this.addClass('hide');
				$this.children('a').attr('title','Show Right Sidebar')
			}

		}
	});


	//------------- widget box magic -------------//

	var widget = $('div.box');
	var widgetOpen = $('div.box').not('div.box.closed');
	var widgetClose = $('div.box.closed');
	//close all widgets with class "closed"
	widgetClose.find('div.content').hide();
	widgetClose.find('.title>.minimize').removeClass('minimize').addClass('maximize');

	widget.find('.title>a').click(function (event) {
		event.preventDefault();
		var $this = $(this);
		if($this .hasClass('minimize')) {
			//minimize content
			$this.removeClass('minimize').addClass('maximize');
			$this.parent('div').addClass('min');
			cont = $this.parent('div').next('div.content')
			cont.slideUp(500, 'easeOutExpo'); //change effect if you want :)
			
		} else  
		if($this .hasClass('maximize')) {
			//minimize content
			$this.removeClass('maximize').addClass('minimize');
			$this.parent('div').removeClass('min');
			cont = $this.parent('div').next('div.content');
			cont.slideDown(500, 'easeInExpo'); //change effect if you want :)
		} 
		
	})

	//show minimize and maximize icons
	widget.hover(function() {
		    $(this).find('.title>a').show(50);	
		}
		, function(){
			$(this).find('.title>a').hide();	
	});

	//add shadow if hover box
	widget.hover(function() {
		    $(this).addClass('hover');	
		}
		, function(){
			$(this).removeClass('hover');	
	});

	//------------- placeholder fallback  -------------//
	$('input[placeholder], textarea[placeholder]').placeholder();

	//------------- Search forms  submit handler  -------------//
	$('#search-form').submit(function() {
	  return false;
	});

	//make custom redirect for search form in .heading
	$('#searchform').submit(function() {
		var sText = $('.top-search').val();
		var sAction = $(this).attr('action');
		var sUrl = sAction + '?q=' + sText;
		$(location).attr('href',sUrl);
		return false;
	});

	//------------- To top plugin  -------------//
	$().UItoTop({ 
		//containerID: 'toTop', // fading element id
		//containerHoverID: 'toTopHover', // fading element hover id
		//scrollSpeed: 1200,
		easingType: 'easeOutQuart' 
	});

	//------------- Tooltips -------------//

	//top tooltip
	$('.tip').qtip({
		content: false,
		position: {
			my: 'bottom center',
			at: 'top center',
			viewport: $(window)
		},
		style: {
			classes: 'ui-tooltip-tipsy'
		}
	});

	//tooltip in right
	$('.tipR').qtip({
		content: false,
		position: {
			my: 'left center',
			at: 'right center',
			viewport: $(window)
		},
		style: {
			classes: 'ui-tooltip-tipsy'
		}
	});

	//tooltip in bottom
	$('.tipB').qtip({
		content: false,
		position: {
			my: 'top center',
			at: 'bottom center',
			viewport: $(window)
		},
		style: {
			classes: 'ui-tooltip-tipsy'
		}
	});

	//tooltip in left
	$('.tipL').qtip({
		content: false,
		position: {
			my: 'right center',
			at: 'left center',
			viewport: $(window)
		},
		style: {
			classes: 'ui-tooltip-tipsy'
		}
	});

	//------------- Search forms  submit handler  -------------//
	$('#search-form').submit(function() {
	  return false;
	});

	//make custom redirect for search form in .heading
	$('#searchform').submit(function() {
		var sText = $('.top-search').val();
		var sAction = $(this).attr('action');
		var sUrl = sAction + '?q=' + sText;
		$(location).attr('href',sUrl);
		return false;
	});
	
	//------------- Uniform  -------------//
	//add class .nostyle if not want uniform to style field
	$("input, textarea, select").not('.nostyle').uniform();

	//remove loadstate class from body and show the page
	setTimeout('$("html").removeClass("loadstate")',500);

});
;
// document ready function
$(document).ready(function() { 	

	//--------------- Tabs ------------------//
    //Activate support tab
	$('.tabs-left li:eq(1) a').tab('show'); // Select third tab (0-indexed)
	
	//support page scroll
	if($(".scroll-y").length) {
		$(".scroll-y").niceScroll({
			cursoropacitymax: 0.7,
			cursorborderradius: 6,
			cursorwidth: "5px"
		});
	}
	if($(".support-section").length) {
		$(".support-section div.tab-content>.tab-pane.active").niceScroll({
			cursoropacitymax: 0.7,
			cursorborderradius: 6,
			cursorwidth: "5px"
		});
	}

	//------------- Support page  -------------//
	function supportPage(){
		var supportSec = $('.support-section');
		var supportUl = supportSec.find('ul.nav-tabs');
		var supportLi = supportUl.children('li');
		function supportMsg () {
			var msgCont = supportSec.find('div.tab-content>.tab-pane.active>.messages');
			return msgCont;
		}
		//add icons for onlinie and offline users
		supportLi.each(function(index) {
			if($(this).hasClass('online')) {
				//append online icon
				$(this).append('<span class="status entypo-icon-dot green"></span>');
			}
			if($(this).hasClass('offline')) {
				//append offline icon
				$(this).append('<span class="status entypo-icon-dot red"></span>');
			}
			if($(this).hasClass('disconnected')) {
				//append offline icon
				$(this).append('<span class="status silk-icon-power gray"></span>');
			}
			//add close icon with hide state
		   	$(this).append('<span class="closeMsg entypo-icon-close gray"></span>');
		});

		//show close icon on hover and hide on hover out
		supportLi.hover(
			function () {
				$(this).find('.closeMsg').show();
			}, 
			function () {
				$(this).find('.closeMsg').hide();
			}
		);

		//close the msg on click
		supportLi.find('.closeMsg').click(function() {
		    //remove the element
		    $(this).closest('li').animate({
			    opacity: 0.25,
			    height: 'toggle'
			  }, 500, function() {
			    // Animation complete. //callback here
			    $(this).remove()
			    
			  });
		});
		function msgReply(chatText) {
			//create markup
			cont = supportMsg();
			if (chatText.length) {
				cont.append('<li class="admin clearfix"></li>');
				cont.find('li:last-child').append('<a href="#" class="avatar"><img src="images/avatar3.jpeg" alt=""></a><div class="message"><div class="head clearfix"><span class="name"><strong>Sugge</strong> says:</span><span class="time">just now</span></div><p></p></div>');
				cont.find('li:last-child div.message p').append(chatText);
			} else {
				//produce error if not have text in this case pinest notify
				$.pnotify({
					type: 'error',
				    title: 'No text',
		    		text: 'Please enter some text!',
				    icon: 'picon icon24 typ-icon-cancel white',
				    opacity: 0.95,
				    history: false,
				    sticker: false
				});
			}
		}
		//add chat text and auto reply
		supportSec.find('button.send').click(function(e) {
			e.preventDefault();//prevent submit action remove for real app
			var chatText = $('textarea#textarea').val();
			//append to chat window
			msgReply(chatText);
			$('.support-section div.tab-content>.tab-pane.active')
	    	.getNiceScroll().hide();
			updateScroll();
		});

		//add message notification after 5 sec to user
		setTimeout(function(){
	    	supportUl.find('li:nth-child(5)').append('<span class="notification newMsg">1</span>');
	    }, 2000);
		//add new value to msg after 3 sec
		setTimeout(function(){
	    	supportUl.find('li:nth-child(5) .notification').removeClass('newMsg').text('2').addClass('newMsg');
	    }, 5000);		
	}
	
	//put scroll on active pane
	function putScroll() {
		$('.support-section div.tab-content>.tab-pane.active')
		    .niceScroll({
				cursoropacitymax: 0.7,
				cursorborderradius: 6,
				cursorwidth: "5px"
			});
	}
	//update nice scroll
	function updateScroll() {
	    $('.support-section div.tab-content>.tab-pane.active')
	    .getNiceScroll().show();
	}

	//load function only if .support-section is find
	if($('.support-section').length) {
		// Select first tab
		$('#supportTab a:first').tab('show');
		putScroll();
		$('#supportTab a[data-toggle="tab"]').on('shown', function (e) {
		   putScroll();
		})
		supportPage();

	}

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Check all checkboxes  -------------//
	
	$("#masterCh").click(function() {
		var checkedStatus = $(this).find('span').hasClass('checked');
		$("#checkAll tr .chChildren input:checkbox").each(function() {
			this.checked = checkedStatus;
				if (checkedStatus == this.checked) {
					$(this).closest('.checker > span').removeClass('checked');
				}
				if (this.checked) {
					$(this).closest('.checker > span').addClass('checked');
				}
		});
	});

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});
;
// document ready function
$(document).ready(function() { 	

	//------------- Check all checkboxes  -------------//
	
	$("#masterCh").click(function() {
		var checkedStatus = $(this).find('span').hasClass('checked');
		$("#checkAll tr .chChildren input:checkbox").each(function() {
			this.checked = checkedStatus;
				if (checkedStatus == this.checked) {
					$(this).closest('.checker > span').removeClass('checked');
				}
				if (this.checked) {
					$(this).closest('.checker > span').addClass('checked');
				}
		});
	});

	//------------- I button  -------------//
	$(".ibuttonCheck").iButton({
		 labelOn: "<span class='icon16 icomoon-icon-checkmark-2 white'></span>",
		 labelOff: "<span class='icon16 icomoon-icon-cancel-3 white'></span>",
		 enableDrag: false
	});

	//------------- Custom scroll in widget box  -------------//
	if($(".scroll").length) {
		$(".scroll").niceScroll({
			cursoropacitymax: 0.7,
			cursorborderradius: 6,
			cursorwidth: "7px"
		});
	}
	if($(".scrolled").length) {
		$(".scrolled").niceScroll({
			cursoropacitymax: 0.7,
			cursorborderradius: 6,
			cursorwidth: "4px"
		});
	}

	//--------------- Typeahead ------------------//
	$('.typeahead').typeahead({
		source: ['jonh','carlos','arcos','stoner']
	})

	$('.findUser').typeahead({
		source: ['Sammy','Jonny','Sugge Elson','Elenna','Rayan','Dimitrios','Sidarh','Jana','Daniel','Morerira','Stoichkov']
	})

	//------------- Datepicker -------------//

	if($('#datepicker-inline').length) {
		$('#datepicker-inline').datepicker({
	        inline: true,
			showOtherMonths:true
	    });
	}

	//--------------- carousel ------------------//
	$('.carousel').carousel({
	  interval: 5000
	})

	//--------------- Prettyphoto ------------------//
	$("a[rel^='prettyPhoto']").prettyPhoto({
		default_width: 800,
		default_height: 600,
		theme: 'facebook',
		social_tools: false,
		show_title: false
	});
	//--------------- Gallery & lazzy load & jpaginate ------------------//
	$(function() {
		//hide the action buttons
		$('.actionBtn').hide();
		//show action buttons on hover image
		$('.galleryView>li').hover(
			function () {
			   $(this).find('.actionBtn').stop(true, true).show();
			},
			function () {
			    $(this).find('.actionBtn').stop(true, true).hide();
			}
		);
		//remove the gallery item after press delete
		$('.actionBtn>.delete').click(function(){
			$(this).closest('li').remove();
			/* destroy and recreate gallery */
		    $("div.holder").jPages("destroy").jPages({
		        containerID : "itemContainer",
		        animation   : "fadeInUp",
		        perPage		: 16,
		        scrollBrowse   : true, //use scroll to change pages
		        keyBrowse   : true,
		        callback    : function( pages ,items ){
		            /* lazy load current images */
		            items.showing.find("img").trigger("turnPage");
		            /* lazy load next page images */
		            items.oncoming.find("img").trigger("turnPage");
		        }
		    });
		    // add notificaton 
			$.pnotify({
				type: 'success',
			    title: 'Done',
	    		text: 'You just delete this picture.',
			    icon: 'picon icon16 brocco-icon-info white',
			    opacity: 0.95,
			    history: false,
			    sticker: false
			});

		});

	    /* initiate lazyload defining a custom event to trigger image loading  */
	    $("ul#itemContainer li img").lazyload({
	        event : "turnPage",
	        effect : "fadeIn"
	    });
	    /* initiate plugin */
	    $("div.holder").jPages({
	        containerID : "itemContainer",
	        animation   : "fadeInUp",
	        perPage		: 16,
	        scrollBrowse   : true, //use scroll to change pages
	        keyBrowse   : true,
	        callback    : function( pages ,items ){
	            /* lazy load current images */
	            items.showing.find("img").trigger("turnPage");
	            /* lazy load next page images */
	            items.oncoming.find("img").trigger("turnPage");
	        }
	    });
	});

//------------- Smart Wizzard  -------------//	
  	$('#wizard').smartWizard({
  		transitionEffect: 'fade', // Effect on navigation, none/fade/slide/
  		onLeaveStep:leaveAStepCallback,
        onFinish:onFinishCallback
    });

    function leaveAStepCallback(obj){
        var step = obj;
        step.find('.stepNumber').stop(true, true).remove();
        step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
        return true;
    }
    function onFinishCallback(obj){
    	var step = obj;
    	step.find('.stepNumber').stop(true, true).remove();
        step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
      	$.pnotify({
			type: 'success',
		    title: 'Done',
    		text: 'You finish the wizzard',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
    }

    /*Vertical wizard*/
    $('#wizard-vertical').smartWizard({
  		transitionEffect: 'fade', // Effect on navigation, none/fade/slide/
  		onLeaveStep:leaveAStepCallback,
        onFinish:onFinishCallback
    });

    function leaveAStepCallback(obj){
        var step = obj;
        step.find('.stepNumber').stop(true, true).remove();
        step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
        return true;
    }
    function onFinishCallback(obj){
    	var step = obj;
    	step.find('.stepNumber').stop(true, true).remove();
        step.find('.stepDesc').stop(true, true).before('<span class="stepNumber"><span class="icon16 iconic-icon-checkmark"></span></span>');
      	$.pnotify({
			type: 'success',
		    title: 'Done',
    		text: 'You finish the wizzard',
		    icon: 'picon icon16 iconic-icon-check-alt white',
		    opacity: 0.95,
		    history: false,
		    sticker: false
		});
    }

    //--------------- Data tables ------------------//

	if($('table').hasClass('contactTable')){
		$('.contactTable').dataTable({
			"bJQueryUI": false,
			"bAutoWidth": false,
			"iDisplayLength": 5,
			"bLengthChange": false,
			"aoColumnDefs": [{ 
				"bSortable": false, "aTargets": [ 0, 1, 2, 3 ] 
			}],
		});
	}

	//------------- JQuery Autocomplete -------------//
    $(function() {
		var availableTags = [
			"ActionScript",
			"AppleScript",
			"Asp",
			"BASIC",
			"C",
			"C++",
			"Clojure",
			"COBOL",
			"ColdFusion",
			"Erlang",
			"Fortran",
			"Groovy",
			"Haskell",
			"Java",
			"JavaScript",
			"Lisp",
			"Perl",
			"PHP",
			"Python",
			"Ruby",
			"Scala",
			"Scheme"
		];
		$( "#autocomplete" ).autocomplete({
			source: availableTags
		});
	});

	//------------- File tree plugin  -------------//
	if($('#file-tree').length) {
	     $('#file-tree').fileTree({
	        root: '/images/',
	        script: 'php/filetree/jqueryFileTree.php',
	        expandSpeed: 1000,
	        collapseSpeed: 1000,
	        multiFolder: false
	    }, function(file) {
	        alert(file);
	    });
	}

	//------------- Combobox  -------------//
    (function( $ ) {
        $.widget( "ui.combobox", {
            _create: function() {
                var input,
                    self = this,
                    select = this.element.hide(),
                    selected = select.children( ":selected" ),
                    value = selected.val() ? selected.text() : "",
                    wrapper = this.wrapper = $( "<span>" )
                        .addClass( "ui-combobox" )
                        .insertAfter( select );

                input = $( "<input>" )
                    .appendTo( wrapper )
                    .val( value )
                    .addClass( "ui-state-default ui-combobox-input" )
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: function( request, response ) {
                            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                            response( select.children( "option" ).map(function() {
                                var text = $( this ).text();
                                if ( this.value && ( !request.term || matcher.test(text) ) )
                                    return {
                                        label: text.replace(
                                            new RegExp(
                                                "(?![^&;]+;)(?!<[^<>]*)(" +
                                                $.ui.autocomplete.escapeRegex(request.term) +
                                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                            ), "<strong>$1</strong>" ),
                                        value: text,
                                        option: this
                                    };
                            }) );
                        },
                        select: function( event, ui ) {
                            ui.item.option.selected = true;
                            self._trigger( "selected", event, {
                                item: ui.item.option
                            });
                        },
                        change: function( event, ui ) {
                            if ( !ui.item ) {
                                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                                    valid = false;
                                select.children( "option" ).each(function() {
                                    if ( $( this ).text().match( matcher ) ) {
                                        this.selected = valid = true;
                                        return false;
                                    }
                                });
                                if ( !valid ) {
                                    // remove invalid value, as it didn't match anything
                                    $( this ).val( "" );
                                    select.val( "" );
                                    input.data( "autocomplete" ).term = "";
                                    return false;
                                }
                            }
                        }
                    })
                    .addClass( "ui-widget ui-widget-content ui-corner-left" );

                input.data( "autocomplete" )._renderItem = function( ul, item ) {
                    return $( "<li></li>" )
                        .data( "item.autocomplete", item )
                        .append( "<a>" + item.label + "</a>" )
                        .appendTo( ul );
                };

                $( "<a>" )
                    .attr( "tabIndex", -1 )
                    .attr( "title", "Show All Items" )
                    .appendTo( wrapper )
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass( "ui-corner-all" )
                    .addClass( "ui-corner-right ui-combobox-toggle" )
                    .click(function() {
                        // close if already visible
                        if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                            input.autocomplete( "close" );
                            return;
                        }

                        // work around a bug (likely same cause as #5265)
                        $( this ).blur();

                        // pass empty string as value to search for, displaying all results
                        input.autocomplete( "search", "" );
                        input.focus();
                    });
            },

            destroy: function() {
                this.wrapper.remove();
                this.element.show();
                $.Widget.prototype.destroy.call( this );
            }
        });
    })( jQuery );

    if($("#combobox").length) {
    	$( "#combobox" ).combobox();
    }

	//Boostrap modal
	$('#myModal').modal({ show: false});
	
	//add event to modal after closed
	$('#myModal').on('hidden', function () {
	  	console.log('modal is closed');
	})

});//End document ready functions

//generate random number for charts
randNum = function(){
	//return Math.floor(Math.random()*101);
	return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
}

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});

//sparklines (making loop with random data for all 7 sparkline)
i=1;
for (i=1; i<8; i++) {
 	var data = [[1, 3+randNum()], [2, 5+randNum()], [3, 8+randNum()], [4, 11+randNum()],[5, 14+randNum()],[6, 17+randNum()],[7, 20+randNum()], [8, 15+randNum()], [9, 18+randNum()], [10, 22+randNum()]];
 	placeholder = '.sparkLine' + i;
	$(placeholder).sparkline(data, { 
		width: 100,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
		height: 30,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
		lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
		fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
		spotColor: '#467e8c',//The CSS colour of the final value marker. Set to false or an empty string to hide it
		maxSpotColor: '#9FC569',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
		minSpotColor: '#ED7A53',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
		spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
		lineWidth: 2//In pixels (default: 1) - Integer
	});
}
;
















;
