(function($) {
    /* "use strict" */
	
 var dlabChartlist = function(){
	
	var screenWidth = $(window).width();
	let draw = Chart.controllers.line.__super__.draw; //draw shadow
	
	
	var donutChart1 = function(){
		$("span.donut2").peity("donut", {
			width: "50",
			height: "50"
		})
	}
	var donutChart2 = function(){
		$("span.donut3").peity("donut", {
			width: "80",
			height: "80"
		})
	}
	var reservationChart = function(){
		 var options = {
          series: [{
          name: 'series1',
          data: [400, 400, 650, 500, 900, 750, 850]
        }, {
          name: 'series2',
          data: [350, 350, 420, 370, 500, 400, 550]
        }],
          chart: {
          height: 300,
          type: 'line',
		  toolbar:{
			  show:false
		  }
        },
		colors:["#53CAFD","#E43BFF"],
        dataLabels: {
          enabled: false
        },
        stroke: {
			width:6,
			curve: 'smooth',
        },
		legend:{
			show:false
		},
		grid:{
			borderColor: 'rgba(255,255,255,0.10)',
			strokeDashArray: 0,
			 xaxis: {
				lines: {
					show: true
				}
			},   
			yaxis: {
				lines: {
					show: true
				}
			}, 
		},
		markers:{
			strokeWidth: 6,
			 hover: {
			  size: 15,
			}
		},
		yaxis: {
		  labels: {
			offsetX:-12,
			style: {
				colors: '#fff',
				fontSize: '13px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			}
		  },
		},
        xaxis: {
          categories: ["SUN","MON","TUE","WED","THU","FRI","SAT"],
		  labels:{
			  style: {
				colors: '#fff',
				fontSize: '13px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
		  },
			axisBorder: {
				 show: false,
			},
			  axisTicks: {
				  show: Boolean,
				  borderType: 'solid',
				  color: '#78909C',
				  height: 6,
				  offsetX: 0,
				  offsetY: 0
			  },
        },
		fill:{
			type:"solid",
			/* opacity:0.1 */
		},
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };

        var chart = new ApexCharts(document.querySelector("#reservationChart"), options);
        chart.render();
		
		 /* window.setInterval(function () {
        getNewSeries(lastDate, {
          min: 10,
          max: 90
        })
      
        chart.updateSeries([{
          data: data
        }])
      }, 1000) */
      
		
	}
	var chartBarRunning = function(){
		
		var options  = {
			  series: [
				{
					name: 'Projects',
					 data: [31, 40, 28]
				}, 
				{
				  name: 'Projects',
				   data: [11, 32, 45]
				}, 
				
			],
			chart: {
			type: 'bar',
			height: 250,
			
			
			toolbar: {
				show: false,
			},
			
		},
		plotOptions: {
		  bar: {
			horizontal: false,
			endingShape:'rounded',
			columnWidth: '45%',
			borderRadius: 8,
			
		  },
		},
		colors:['#816CFF', '#77248B'],
		dataLabels: {
		  enabled: false,
		},
		markers: {
			shape: "circle",
		},
		legend: {
			show: false,
			fontSize: '12px',
			labels: {
				colors: '#000000',
				
				},
			markers: {
			width: 18,
			height: 18,
			strokeWidth: 0,
			strokeColor: '#fff',
			fillColors: undefined,
			radius: 15,	
			}
		},
		stroke: {
		  show: true,
		  width: 5,
		  curve: 'stepline',
		  colors: ['transparent'],
		  lineCap: 'butt',
		},
		grid: {
			borderColor: 'rgba(255,255,255,0.10)',
		},
		xaxis: {
		  categories: ['Sun', 'Mon', 'Tue'],
		  labels: {
		   style: {
			  colors: '#fff',
			  fontSize: '13px',
			  fontFamily: 'poppins',
			  fontWeight: 100,
			  cssClass: 'apexcharts-xaxis-label',
			},
			
		  },
		  crosshairs: {
		  show: false,
		  },
		   axisBorder: {
				  show: false,
		   },
		    axisTicks: {
				
				show: false,
			}
		},
		yaxis: {
			labels: {
				offsetX:-16,
			   style: {
				  colors: '#fff',
				  fontSize: '13px',
				   fontFamily: 'poppins',
				  fontWeight: 100,
				  cssClass: 'apexcharts-xaxis-label',
			  },
		  },
		},
		fill: {
		  opacity: 1,
		  colors:['#53CAFD', '#E43BFF'],
		},
		tooltip: {
		  y: {
			formatter: function (val) {
			  return "$ " + val + " thousands"
			}
		  }
		},
		 responsive: [{
			breakpoint: 575,
			options: {
				plotOptions: {
				  bar: {
					columnWidth: '80%',
				  },
				},
				chart:{
					height:250,
				}
			}
		 }]
		};

		var chart = new ApexCharts(document.querySelector("#chartBarRunning"), options);
		chart.render();
			
	}
	var pieChart1 = function(){
		var options = {
		 series: [60, 115, 155],
		 chart: {
		 type: 'donut',
		 width:120,
		 height:120,
         innerRadius: 8,   
	   },
	   dataLabels:{
		   enabled: false
	   },
	   stroke: {
		 width: 0,
	   },
	   colors:['#E8ECFF', '#FF9F00', '#FD5353'],
	   legend: {
			 position: 'bottom',
			 show:false
		   },
	   responsive: [{
		 breakpoint: 1400,
		 options: {
		  chart: {
			width:120,
			 height:120
		   },
		 },
		 responsive: [{
			breakpoint: 1200,
			options: {
			  chart: {
				width: 90,
				height: 90
			  },
			  legend: {
				position: 'bottom'
			  }
			}
		  }]
		
	   }]
	   };

	   var chart = new ApexCharts(document.querySelector("#pieChart1"), options);
	   chart.render();
   }

   var NewCustomers = function(){
	var options = {
	  series: [
		{
			name: 'Net Profit',
			data: [300, 80, 800, 300, 900],
			/* radius: 30,	 */
		}, 				
	],
		chart: {
		type: 'line',
		height: 60,
		width: 180,
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false
		},
		sparkline: {
			enabled: true
		}
		
	},
	
	colors:['var(--primary)'],
	dataLabels: {
	  enabled: false,
	},

	legend: {
		show: false,
	},
	stroke: {
	  show: true,
	  width: 6,
	  curve:'smooth',
	  colors:['var(--primary)'],
	},
	
	grid: {
		show:false,
		borderColor: '#eee',
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0

		}
	},
	states: {
			normal: {
				filter: {
					type: 'none',
					value: 0
				}
			},
			hover: {
				filter: {
					type: 'none',
					value: 0
				}
			},
			active: {
				allowMultipleDataPointsSelection: false,
				filter: {
					type: 'none',
					value: 0
				}
			}
		},
	xaxis: {
		categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false
		},
		labels: {
			show: false,
			style: {
				fontSize: '12px',
			}
		},
		crosshairs: {
			show: false,
			position: 'front',
			stroke: {
				width: 1,
				dashArray: 3
			}
		},
		tooltip: {
			enabled: true,
			formatter: undefined,
			offsetY: 0,
			style: {
				fontSize: '12px',
			}
		}
	},
	yaxis: {
		show: false,
	},
	fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#E43BFF"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
	tooltip: {
		enabled:false,
		style: {
			fontSize: '12px',
		},
		y: {
			formatter: function(val) {
				return "$" + val + " thousands"
			}
		}
	}
	};

	var chartBar1 = new ApexCharts(document.querySelector("#NewCustomers"), options);
	chartBar1.render(); 
}
var columnChart = function(){
		var optionsTimeline = {
			chart: {
				type: "bar",
				height: 200,
				stacked: true,
				toolbar: {
					show: false
				},
				sparkline: {
					//enabled: true
				},
				backgroundBarRadius: 5,
				offsetX: 0,
			},
			series: [
				 {
					name: "New Clients",
					data: [10, 50, 65, 20, 30,20,30]
				},
				{
					name: "Retained Clients",
					data: [-40, -60, -90, -25, -40,-20,-30]
				} 
			],
			
			plotOptions: {
				bar: {
					columnWidth: "10%",
					endingShape: "rounded",
					colors: {
						backgroundBarColors: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'],
						backgroundBarOpacity: 1,
						backgroundBarRadius: 4,
						opacity:0
					},
				},
			    distributed: true,
			},
			colors:['var(--primary)', 'var(--primary)'],
			
			grid: {
				show: false,
			},
			legend: {
				show: false
			},
			fill: {
				opacity: 1
			},
			dataLabels: {
				enabled: false,
				colors:['#2953E8', '#09268A'],
				dropShadow: {
					enabled: true,
					top: 1,
					left: 1,
					blur: 1,
					opacity: 1
				}
			},
			stroke: {
				width: 3,
				
				curve: 'smooth',
				lineCap: 'butt',
				
			},
			xaxis: {
                categories: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
				labels: {
					show: true,	
					style: {
						colors: '#B9A8FF', 
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
						
					},
				},
				crosshairs: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false
				},
			},
			
			yaxis: {
				//show: false
				labels: {
					show: false,
					offsetX:-15,
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
						
					},
				},
			},
			
			tooltip: {
				x: {
					show: true
				}
			}
		};
		var chartTimelineRender =  new ApexCharts(document.querySelector("#columnChart"), optionsTimeline);
		 chartTimelineRender.render();
	}
	
	
	
	
	/* Function ============ */
		return {
			init:function(){
			},

			load:function(){
				donutChart1();
				//reservationChart();
				//chartBarRunning();
				//NewCustomers();
				pieChart1();
				columnChart();
				donutChart2();
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dlabChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);