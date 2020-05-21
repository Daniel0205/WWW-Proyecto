import React from "react";
import axios from "axios";
import Image from "./Template.jpg";
import "./Template.css";
import Chart from "react-google-charts";
import { connect } from "react-redux";


function Template(props) {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json",
  };

  const [bill, setBill] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("https://univalleapp.herokuapp.com/api/bill/allinfo", {
        return_bill: props.customer_id,
      })
      .then((response) => {
        setBill(
          response.data.map((x) => {
            return {
              customer_id: x.id_user_client,
              customer_name: x.id_user_client__name,
              customer_last_name: x.id_user_client__last_name,
              customer_email: x.id_user_client__email,
              apartment_contract: x.num_contract,
              apartment_address: x.address,
              apartment_stratum: x.stratum,
              electricitymeter_id: x.id_electricitymeter,
              electricitymeter_previous_measuring: x.id_electricitymeter__previous_measuring,
              electricitymeter_previous_measuring_date: x.id_electricitymeter__previous_measuring_date,
              electricitymeter_actual_measuring: x.id_electricitymeter__actual_measuring,
              electricitymeter_actual_measuring_date: x.id_electricitymeter__actual_measuring_date,
              bill_id: x.id_electricitymeter__bill__id_bill,
              bill_expedition_date: x.id_electricitymeter__bill__expedition_date,
              bill_due_date: x.id_electricitymeter__bill__due_date,
              bill_payment_status: x.id_electricitymeter__bill__payment_status,
              bill_quantity: x.id_electricitymeter__bill__quantity,
              due_days: x.due_days,
              interest: x.interest,
              days_billed: x.days_billed,
              month_measuring: x.month_measuring,
              average_daily_measuring: x.average_daily_measuring,
              month_billed: x.month_billed,
              discontinued: x.discontinued,
              reconnect_value: x.reconnect_value,
              latest_6_months_consumption: x.latest_6_months_consumption,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  if (bill.length == 0){
    return null;
  }
  else {

    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })

    const due_date = new Date(bill[0].bill_due_date + "T00:00:00-05:00")
    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(due_date)
    
    const prev_measuring_date = new Date(bill[0].electricitymeter_previous_measuring_date + "T00:00:00-05:00")
    const [{ value: month_p }, , { value: day_p }, , { value: year_p }] = dateTimeFormat.formatToParts(prev_measuring_date)
    
    const actual_measuring_date = new Date(bill[0].electricitymeter_actual_measuring_date + "T00:00:00-05:00")
    const [{ value: month_a }, , { value: day_a }, , { value: year_a }] = dateTimeFormat.formatToParts(actual_measuring_date)
    
    //deuda total con intereses y recargos
    let total_due = bill[0].bill_quantity + bill[0].interest + bill[0].reconnect_value;
    let cost_kwt = 1000;
    let average_monthly = (bill[0].latest_6_months_consumption.reduce((total, month) => total + month) / 6).toFixed(2);
    
    let data = [
      [" Avg. consumption of the last 6 months", "Avg. Per Day (kWh)"],
      ["O", bill[0].latest_6_months_consumption[0]],
      ["N", bill[0].latest_6_months_consumption[1]],
      ["D", bill[0].latest_6_months_consumption[2]],
      ["J", bill[0].latest_6_months_consumption[3]],
      ["F", bill[0].latest_6_months_consumption[4]],
      ["M", bill[0].latest_6_months_consumption[5]]
    ];
    

    return (
      <div className="text">

        <div id="container" className="container">
          <img src={Image} alt="" />
          <span id="service">{"Service to:"}</span>
        </div>

        <span id="name">{bill[0].customer_name.toUpperCase() + " " + bill[0].customer_last_name.toUpperCase()}</span>
        <span id="address">{bill[0].apartment_address.toUpperCase()}</span>
        <span id="customer_email">{bill[0].customer_email}</span>
        <span id="apartment_contract">{"Apartment Contract: " + bill[0].apartment_contract}</span>
        <span id="apartment_stratum">{"Apartment Stratum: " + bill[0].apartment_stratum}</span>
        <span id="electricitymeter_id">{"Electricitymeter Id: " + bill[0].electricitymeter_id}</span>

        <span id="due_date_1">{bill[0].bill_due_date}</span>
        <span id="due_date_2">{`${month} ${day}, ${year}`}</span>
        <span id="amount_due_1">{"$ " + total_due.toLocaleString('es')}</span>
        <span id="amount_due_2">{"$ " + bill[0].bill_quantity.toLocaleString('es')}</span>
        <span id="amount_due_3">{"$ " + total_due.toLocaleString('es')}</span>
        <span id="bill_id">{"00000-" + bill[0].bill_id}</span>

        <span id="due_date_big">{`${month} ${day}, ${year}`}</span>
        <span id="big_amount_due">{"$ " + total_due.toLocaleString('es')}</span>
        <span id="bill_id_big">{"00000-" + bill[0].bill_id}</span>
        <span id="customer_id_big">{"ID: " + bill[0].customer_id}</span>

        <span id="prev_measuring_date">{`${month_p} ${day_p}`}</span>
        <span id="actual_measuring_date">{`${month_a} ${day_a}`}</span>
        <span id="days_billed">{bill[0].days_billed + " Days"}</span>
        <span id="prev_measuring">{bill[0].electricitymeter_previous_measuring.toFixed(2)}</span>
        <span id="actual_measuring">{bill[0].electricitymeter_actual_measuring.toFixed(2)}</span>
        <span id="month_measuring">{bill[0].month_measuring.toFixed(2)}</span>

        <span id="month_billed"> {`${month_a}`}</span>
        <span id="due_days"> {bill[0].due_days}</span>
        <span id="cost_kwt"> {"$ " + cost_kwt.toLocaleString('es')}</span>
        <span id="average_daily_measuring"> {bill[0].average_daily_measuring}</span>
        <span id="average_monthly"> {average_monthly}</span>

        <span id="balance_title_1">{"Total Generation & Transmition Charges"}</span>
        <span id="balance_title_2">{"Interests Charges"}</span>
        <span id="balance_title_3">{"Reconection Charges"}</span>
        <span id="interest">{"$ " + bill[0].interest.toLocaleString('es')}</span>
        <span id="reconnect_value">{"$ " + bill[0].reconnect_value.toLocaleString('es')}</span>
        <span id="amount_due_4">{"$ " + total_due.toLocaleString('es')}</span>

        <div id="chart" className="chart">
          <Chart
            width={370}
            height={180}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data}            
            options={{              
              hAxis: { title: 'Months',viewWindow: { min: 0} },
              vAxis: { title: 'Avg. Per Month (kWh)',viewWindow: { min: 0}},
              legend: 'none',
            }}  
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer_id: state.customerReducer.Customer_id,  
  };
};

export default connect(mapStateToProps)(Template);
