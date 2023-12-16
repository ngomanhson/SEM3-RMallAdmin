

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
          name: 'Monthly',
          data: [400, 400, 650, 500, 900, 750, 850]
        }, {
          name: 'Weekly',
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
				 show: true,
				  borderType: 'solid',
				  color: '#78909C',
				  height: 6,
				  width:6,
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
		if(jQuery("#reservationChart").length > 0){

			var dzchart = new ApexCharts(document.querySelector("#reservationChart"), options);
			dzchart.render();
            
            jQuery('#dzNewSeries').on('change',function(){
                jQuery(this).toggleClass('disabled');
                dzchart.toggleSeries('Monthly');
            });
            
            jQuery('#dzOldSeries').on('change',function(){
                jQuery(this).toggleClass('disabled');
                dzchart.toggleSeries('Weekly');
            });
            
		}
	}
	var activeUser = function(){
		if(jQuery('#activeUser').length > 0 ){
			var data = {
				labels: ["0", "1", "2", "3", "4", "5", "6", "0", "1", "2", "3", "4", "5", "6"],
				datasets: [{
					label: "My First dataset",
					backgroundColor: "#FFAA2B",
					strokeColor: "rgba(255,255,255,0.3)",
					pointColor: "rgba(0,0,0,0)",
					pointStrokeColor: "rgba(58,223,174,1)",
					pointHighlightFill: "rgba(58,223,174,1)",
					pointHighlightStroke: "rgba(58,223,174,1)",
					borderCapStyle: 'round',
					
					data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
				}]
			};

			var ctx = document.getElementById("activeUser").getContext("2d");
			var chart = new Chart(ctx, {
				type: "bar",
				data: data,
				options: {
					responsive: !0,
					maintainAspectRatio: false,
					legend: {
						display: !1
					},
					tooltips: {
						enabled: false
					},
					scales: {
						xAxes: [{
							display: !1,
							gridLines: {
								display: !1
							},
							barPercentage: 1,
							categoryPercentage: 0.5
						}],
						yAxes: [{
							display: !1,
							ticks: {
								padding: 10,
								stepSize: 20,
								max: 100,
								min: 0
							},
							gridLines: {
								display: !0,
								drawBorder: !1,
								lineWidth: 1,
								zeroLineColor: "rgba(255.255,255.0.3)",
							}
						}]
					}
				}
			});
			
			setInterval(function() {
				chart.config.data.datasets[0].data.push(
					Math.floor(10 + Math.random() * 80)
				);
				chart.config.data.datasets[0].data.shift();
				chart.update();
			}, 2000);
			
		}
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
			height: 300,
						
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
			breakpoint: 1400,
			options: {
				chart:{
					height:200
				},
			},
		 }]	
		};

		var chart = new ApexCharts(document.querySelector("#chartBarRunning"), options);
		chart.render();
			
	}
	var pieChart1 = function(){
		var options = {
		 series: [90, 68, 85],
		 chart: {
		 type: 'donut',
		 height:250,
	   },
	  dataLabels:{
			enabled: false
		},
		stroke: {
          width: 0,
		},  
	   
	   colors:['#DD3CFF', '#FFE27A', '#53CAFD'],
	   legend: {
			 position: 'bottom',
			 show:false
		   },
	   responsive: [{
			breakpoint: 1490,
			options: {
				chart: {
					width:100,
					height:150
				},
			},
			breakpoint: 1100,
			options: {
				chart: {
					height:150
				},
			}
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
		width: 120,
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
		
			if(jQuery('#columnChart').length > 0 ){
		
				var optionsTimeline = {
					chart: {
						type: "bar",
						height: 250,
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
							 maxHeight: 120,
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
						width: 6,
						
						curve: 'smooth',
						lineCap: 'butt',
						
					},
					xaxis: {
						categories: ['01', '02', '03', '04', '05'],
						labels: {
							show: false,	
							style: {
								colors: '#787878',
								fontSize: '13px',
								fontFamily: 'Poppins',
								fontWeight: 400,
								minHeight: 90,
								
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
		}
		
		
	/* var activeUserchart = function(){
		if(jQuery('#activeUserchart').length > 0 ){
			var eChart_2 = echarts.init(document.getElementById('activeUserchart'));
			var option1 = {
				  series: [{
					type: 'liquidFill',
					data: [0.6, 0.5, 0.4],
					 radius: '80%',
					color: ['#f33923','#e58b25','#ac235c'],
					backgroundStyle: {
						borderWidth: 0,
						color: 'rgba(255,255,255,0)',
						shadowBlur: 0
					},
					itemStyle: {
						normal: {
							shadowBlur: 5,
							shadowColor: 'rgba(0, 0, 0, .5)'
						}
					},
					outline: {
						borderDistance: 3,
						itemStyle: {
							borderWidth: 5,
							borderColor: '#ac235c',
							shadowBlur: 0,
						}
					},
					label: {
						normal: {
							fontSize: 20
						}
					} 
				}]
			};
			eChart_2.setOption(option1);
			//eChart_2.resize();	
			 setInterval(function() {
				chart.config.data.datasets[0].data.push(
					Math.floor(10 + Math.random() * 80)
				);
				chart.config.data.datasets[0].data.shift();
				chart.update();
			}, 2000);
			
		}
	} 
	*/
	
	
	
	
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				donutChart1();
				reservationChart();
				chartBarRunning();
				NewCustomers();
				pieChart1();
				columnChart();
				donutChart2();
				activeUser();
				//activeUserchart();
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