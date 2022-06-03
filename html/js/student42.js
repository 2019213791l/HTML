var myChart = echarts.init(document.getElementById('main'));
option = {
   xAxis: {
     type: 'category',
     data: ['考试1', '考试2', '考试3', '考试4', '考试5', '下次成绩预测'],
         axisLabel: {
             inside: false,
             textStyle: {
                 color: '#000',
                 fontSize:'10',
                 itemSize:''
                 
             }
     }
   },
   
   yAxis: {
     type: 'value',
             axisLabel: {
             inside: false,
             textStyle: {
                 color: '#000',
                 fontSize:'15',
                 itemSize:''
                 
             }
     }
   },
   series: [
     {
       data: [87, 85, 92, 89, 95, null],
             label : {show: true,
                         textStyle: {
                 color: '#000',
                 fontSize:'20',
                 itemSize:''
                 
             }
             
       },
       lineStyle: {
         color: '#d19f49',
         width: 3,
       },
 
       type: 'line',
       symbol: 'triangle',
       symbolSize: 20,
       lineStyle: {
         color: '#5470C6',
         width: 4,
 
       },
       itemStyle: {
         borderWidth: 3,
         borderColor: '#EE6666',
         color: 'yellow'
       }
     },
     {
             data: [null, null,null,null,95,93],
             label : {show: true,
                         textStyle: {
                 color: '#000',
                 fontSize:'20',
                 itemSize:''
                 
             }
             
       },
       lineStyle: {
         color: '#d19f49',
         width: 3,
         
       },
 
       type: 'line',
       symbol: 'triangle',
       symbolSize: 20,
       lineStyle: {
         color: '#5470C6',
         width: 4,
         type: 'dashed',
       },
       itemStyle: {
         borderWidth: 3,
         borderColor: '#EE6666',
         color: 'yellow'
       }
     }
   ]
 };
// 粘贴代码到此为止

myChart.setOption(option);//注意：必须加上此行