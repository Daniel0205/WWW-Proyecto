import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts"; 
import axios from "axios";

var monthArray = new Array();
monthArray[0] = "January";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";

var paymentArray = {
  O:"Office",
  B:"Bank"
}

var TYPE_CHOICES = {
  O: "Operador",
  G: "Gerente",
  A: "Admin"
}

function Reports (props) {
  const [dataMonth,setDataMonth]=useState([])
  const [dataBankNumber,setDataBankNumber]=useState([])
  const [dataType,setDataType]=useState([])
  const [dataBankQuantity,setDataBankQuantity]=useState([])
  const [dataApartaments,setDataApartaments]=useState([])
  const [dataBillPay,setDataBillPay]=useState([])
  const [dataApartamentsPay,setDataApartamentsPay]=useState([])
  const [dataUsers,setDataUsers]=useState([])
  const [dataUsersActive,setDataUsersActive]=useState([])
  const [dataSubNum,setDataSubNum]=useState([])
  const [dataSubPor,setDataSubPor]=useState([])
  const [dataSubTrans,setDataSubTrans]=useState([])
  const [dataTransActive,setDataTransActive]=useState([])



  function income(){


    axios
    .get("https://univalleapp.herokuapp.com/api/bill/month")
    .then(response => {
      
      var data = response.data.map( x => {
        return [monthArray[x.month-1] ,x.c]
      })

      data.unshift(['Month',"Income"])

      setDataMonth(data)
      
    })
    .catch(error => {
      console.log(error);
    });

    axios
    .get("https://univalleapp.herokuapp.com/api/payment/bank")
    .then(response => {
      
      var data = response.data.map( x => {
        return [paymentArray[x.payment_method],x.c]
      })

      data.unshift(['Payment Method',"Type"])

      setDataType(data)
      
    })
    .catch(error => {
      console.log(error);
    });

    axios
    .get("https://univalleapp.herokuapp.com/api/bank/number")
    .then(response => {
      
      var data1 = response.data.map( x => {
        return [x.name_bank,x.c]
      })

      var data2 = response.data.map( x => {
        return [x.name_bank,x.s]
      })
      data1.unshift(['Bank',"Number of payments"])
      data2.unshift(['Bank',"Quantity paid"])

      setDataBankNumber(data1)
      setDataBankQuantity(data2)
      
    })
    .catch(error => {
      console.log(error);
    });

  
  }



  function  clients(){

    axios
    .get("https://univalleapp.herokuapp.com/api/apartment/active")
    .then(response => {
      
      var data = response.data.map( x => {
        return [x.state,x.c]
      })

      data.unshift(['State',"Number"])
      console.log(data)
      setDataApartaments(data)
      
    })
    .catch(error => {
      console.log(error);
    });

    axios
    .get("https://univalleapp.herokuapp.com/api/apartment/pay")
    .then(response => {
      
      var data = response.data.map( x => {
        return [x.state,x.c]
      })

      data.unshift(['State',"Number"])

      setDataApartamentsPay(data)
      
    })
    .catch(error => {
      console.log(error);
    });
    
    axios
    .get("https://univalleapp.herokuapp.com/api/bill/pay")
    .then(response => {
      
      var data = response.data.map( x => {
        if(x.month==="total")return [x.month,0,x.c]
        else return [monthArray[x.month-1],x.c,0]
      })
      
      data.unshift(['Late payments',"Quantity","Total"])


      setDataBillPay(data)
      
    })
    .catch(error => {
      console.log(error);
    });

  }


  function assets(){
     
    axios
    .get("https://univalleapp.herokuapp.com/api/substation/trans")
    .then(response => {
      
      var data = response.data.map( x => {
        return [x.state,x.c]
      })

      data.unshift(['Substations',"Number"])

      
      
      var data1 = response.data
      data1.pop()
      data1 = data1.map( x => {
        return [x.state,x.c]
      })

      data1.unshift(['Substations',"Number"])
      
      setDataSubPor(data1)
      setDataSubNum(data) 
      
      console.log(data1)
    })
    .catch(error => {
      console.log(error);
    });

    axios
    .get("https://univalleapp.herokuapp.com/api/transformer/sub")
    .then(response => {
      
      var data = response.data.map( x => {
        return [x.id_substation.toString(),x.c]
      })

      data.unshift(['Substations',"Number of transformers"])

    
      setDataSubTrans(data) 
      
    })
    .catch(error => {
      console.log(error);
    });

    axios
    .get("https://univalleapp.herokuapp.com/api/transformer/active")
    .then(response => {
      
      var data = response.data.map( x => {
        if(x.active)return ["Active",x.c]
        else return ["Inactive",x.c]
      })

      data.unshift(['State',"Number of transformers"])

    
      setDataTransActive(data) 
      
    })
    .catch(error => {
      console.log(error);
    });



  }

  function employees(){
 
    axios
    .get("https://univalleapp.herokuapp.com/api/user/active")
    .then(response => {
      
      var data = [
        ['Employees',"Active","Inactive","Total Active","Total Inactive"],
        [TYPE_CHOICES["O"],0,0,0,0],
        [TYPE_CHOICES["A"],0,0,0,0],
        [TYPE_CHOICES["G"],0,0,0,0],
        ["Total Active",0,0,0,0],
        ["Total Inactive",0,0,0,0],
      ]

      var data1 = [
        ['Employees',"Number of active"],
        [TYPE_CHOICES["O"],0],
        [TYPE_CHOICES["A"],0],
        [TYPE_CHOICES["G"],0],
      ]

      
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].type==="O")
          if(response.data[i].type==="O"){
            if(response.data[i].active){
              data[1][1]=response.data[i].c
              data1[1][1]=response.data[i].c
            }
            else data[1][2]=response.data[i].c
          }
          else if(response.data[i].type==="A"){
            if(response.data[i].active){
              data[2][1]=response.data[i].c
              data1[2][1]=response.data[i].c
            }
            else data[2][2]=response.data[i].c
          }
          else if(response.data[i].type==="G"){
            if(response.data[i].active){
              data[3][1]=response.data[i].c
              data1[3][1]=response.data[i].c
            }
            else data[3][2]=response.data[i].c
          }
          else if(response.data[i].type==="totalActive")data[4][3]=response.data[i].c
          else if(response.data[i].type==="totalInactive")data[5][4]=response.data[i].c

        }

        console.log(data)
        console.log(data1)

      
      setDataUsers(data)
      setDataUsersActive(data1)

      
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    switch (props.type) {
      case "Income":
        income()
        break;
      case "Clients":
        clients()
        break;
      case "Assets":
        assets()
        break;
      case "Employees":
        employees()
        break;
    
      default:
        break;
    } 
  },[props.type,props.language])

  useEffect(() => {
    switch (props.type) {
      case "Income":
        income()
        break;
      case "Clients":
        clients()
        break;
      case "Assets":
        assets()
        break;
      case "Employees":
        employees()
        break;
    
      default:
        break;
    } 
  },[])



  function createCharts(){
    switch (props.type) {
      case "Income":
        return (
          [<Chart
            width={'100%'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={dataMonth}
            options={{
              // Material design options
              chart: {
                title: 'Monthly Income',
                subtitle: 'Current year',
              },
            }}      
          />,<br/>,
      
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataType}
            options={{
              title: 'Type of payment',
              // Just add this option
              is3D: true,
            }}
          />,<br/>,
          <Chart
            width={'100%'}
            height={'300px'}
            // Note here we use Bar instead of BarChart to load the material design version
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={dataBankNumber}
            options={{
              // Material chart options
              chart: {
                title: 'Number of payments by bank',
                subtitle: 'Based on most recent and previous census data',
              },
              hAxis: {
                title: 'Number of payments',
                minValue: 0,
              },
              colors: ['#F75E25', '#ffab91'],
              vAxis: {
                title: 'City',
              },
              bars: 'horizontal',
              axes: {
                y: {
                  0: { side: 'right' },
                },
              },
            }}
          />,<br/>,
      
          <Chart
                width={'100%'}
                height={'300px'}

                // Note here we use Bar instead of BarChart to load the material design version
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={dataBankQuantity}
                options={{
                  // Material chart options
                  chart: {
                    title: 'Quantity paid in each bank',
                    subtitle: 'Based on most recent and previous census data',
                  },
                  hAxis: {
                    title: 'Value in colombian pesos',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'City',
                  },
                  bars: 'horizontal',
                  axes: {
                    y: {
                      0: { side: 'right' },
                    },
                  },
                }}
              />])
        case "Clients":
          return (
            [<Chart
              width={'100%'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={dataApartaments}
              options={{
                title: 'Number of active properties',
                // Just add this option
                is3D: true,
              }}
            />,<br/>,
            <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataApartamentsPay}
            options={{
              title: 'Number of properties with late payments',
              // Just add this option
              is3D: true,
            }}
          />,<br/>,
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={dataBillPay}
            options={{
              // Material design options
              chart: {
                title: 'Late monthly Payments',
                subtitle: 'Current year',
              },
            }}      
          />])
      case "Employees":
          return ([
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={dataUsers}
            options={{
              // Material design options
              chart: {
                title: 'Employees',
                subtitle: 'Currently',
              },
            }}      
          />,<br/>,
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataUsersActive}
            options={{
              title: 'Number of Employees',
              // Just add this option
              is3D: true,
            }}
          />])
      case "Assets":
          return ([
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={dataSubNum}
            options={{
              // Material design options
              chart: {
                title: 'Substations',
                subtitle: 'Total',
              },
            }}      
          />,<br/>,
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataSubPor}
            options={{
              title: 'Active Substations',
              // Just add this option
              is3D: true,
            }}
          />,<br/>,
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataSubTrans}
            options={{
              title: 'Transformers by substation',
              // Just add this option
              is3D: true,
            }}
          />,<br/>,
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataTransActive}
            options={{
              title: 'Active Transformers',
              // Just add this option
              is3D: true,
            }}
          />])
  
      default:
        break;
    }

  }
  

  return (
    <div >
    {createCharts()}
  </div>)

}

export default Reports;
