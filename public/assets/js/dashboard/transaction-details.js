(function($) {
    /* "use strict" */
	
 var dlabChartlist = function(){
	
	var screenWidth = $(window).width();
	let draw = Chart.controllers.line.__super__.draw; //draw shadow
	
	
	
	
	var pieChart1 = function(){
		var options = {
		 series: [60, 115, 155],
		 chart: {
		 type: 'donut',
		 height:150,
         width: 120,
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
			 height:200
		   },
		 },
     breakpoint: 767,
		 options: {
		  chart: {
			 height:100
		   },
		 }
	   }]
	   };

	   var chart = new ApexCharts(document.querySelector("#pieChart1"), options);
	   chart.render();
   }

 
   var pieChart2 = function(){
    var options = {
     series: [90, 68, 85],
     chart: {
     type: 'donut',
     height:200
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
     breakpoint: 1400,
     options: {
      chart: {
         height:200
       },
     }
   }]
   };

   var chart = new ApexCharts(document.querySelector("#pieChart2"), options);
   chart.render();
}
var areaChart = function(){
		
    var options = {
         series: [{
         name: 'Income',
        data: [20,40, 20, 50, 40, 30, 10, 60, 20, 80, 10, 20, 10, 20],
       }, {
         name: 'Expense',
         data: [60,20, 60, 20, 60, 20, 50, 40, 52, 35, 50, 35, 20, 10],
       }],
         chart: {
         height: 250,
         type: 'area',
         toolbar: {
               show: false,
           },
       },
      //  colors:['var(--linear)', '#f5f5f5'],
       dataLabels: {
         enabled: false
       },
       legend: {
        labels: {
          colors: '#ffffff',
          useSeriesColors: false
        },
      },
       fill:{
           type:'gradient',
           opacity:1,
           gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.1,
            gradientToColors: ["#6E4AFF", "#4CE5C1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
       },
       stroke: {
         curve: 'smooth',
         width:0
       },
       xaxis: {
           categories: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05", "Week 06", "Week 07", "Week 08", "Week 09", "Week 10", "Week 11", "Week 12", "Week 13", "Week 14", "Week 15", "Week 16"],
           labels: {
               show: true,
               style:{
                   colors: '#b9bbbd',
                   
               },
           },
       },
       yaxis: {
           labels: {
               show: true,
               style:{
                   colors: '#b9bbbd',
               },
           },
       },
       grid:{
           show: true,
           borderColor: 'rgba(255,255,255,0.10)',
           yaxis: {
               lines: {
                   show: true
               }
           }, 
           xaxis: {
               lines: {
                   show: true
               }
           },
       },
      
       tooltip: {
         x: {
           format: 'dd/MM/yy HH:mm'
         },
       },
       };

       var chart = new ApexCharts(document.querySelector("#areaChart"), options);
       chart.render();
       
}


	
	
	
	/* Function ============ */
		return {
			init:function(){
			},

			load:function(){
                pieChart1();
                pieChart2();
                areaChart();
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