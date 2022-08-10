import React, { useState, useEffect } from 'react';
// import './App.css';
import { forwardRef } from 'react';
// import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `http://localhost:8000/user/vehicle`
  // baseURL: `https://reqres.in/api`
})


function VehicleApproval(props) {

  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Make", field: "make", editable: "never" },
    { title: "Model", field: "model", editable: "never" },
    { title: "Owner", field: "ownerId", editable: "never", hidden: true },
    { title: "Color", field: "color", editable: "never" },
    { title: "Year", field: "year", editable: "never" },
    { title: "Registration Number", field: "registrationNumber", editable: "never" },
    { title: "Registration State", field: "registrationState", editable: "never" },
    { title: "VIN", field: "VIN", editable: "never" },
    { title: "Insurance Number", field: "insuranceNumber", editable: "never" },
    { title: "Status", field: "status", lookup: { Approved: "Approved", Requested: "Requested" } },
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    // api.get("/getAll?authorization=")
    api.get("/getAdminAll", { headers: { "authorization": "Bearer " + props.authToken } })
      .then(res => {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code === 0) {
          console.log(res.data.result.vehicles)
          setData(res.data.result.vehicles)
        }
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.id === undefined) {
      errorList.push("Please enter make of the vehicle")
    }

    if (newData.status === undefined) {
      errorList.push("Please enter a valid description")
    }

    const updatedStatus = newData.status;
    const vehicleId = newData.id;


    var qs = require('qs');
    var requestData = qs.stringify({
      'updatedStatus': updatedStatus,
      'vehicleId': vehicleId
    });

    const requestOptions = {
      // method: 'POST',
      headers: { "authorization": "Bearer " + props.authToken },

    };

    if (errorList.length < 1) {
      api.post("/changeStatus", requestData, requestOptions)
        .then(res => {
          console.log(res)
          console.log(newData)
          const dataUpdate = [...data];
          const index = oldData.id;
          console.log(index)
          console.log(newData.id)
          console.log(res.data.vehicles)
          dataUpdate[index] = newData;
          var newArry: [] = data.map(obj => {
            if (obj.id === oldData.id)
              return newData
            return obj
          })
          setData(newArry);

          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }

  }








  return (

    <div style={{ alignItems: "center", display: "flex", justifyContent: "center", margin: "20px" }}>
      <div className="App" style={{ width: "80%", alignItems: "center", justifyContent: "center" }}>
        <Grid container spacing={1}>
          <Grid item md={12}></Grid>
          <Grid item md={12}>
            <div>
              {iserror &&
                <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>
                  })}
                </Alert>
              }
            </div>
            <MaterialTable
              title="Service providers Details"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{


                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdate(newData, oldData, resolve);

                  }),

              }}

              options={{
                exportButton: true, exportAllData: true, exportFileName: "TableData", actionsColumnIndex: -1
              }}
            />
          </Grid>
          <Grid item md={12}></Grid>
        </Grid>

      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  authToken: state.userReducer.authToken

})



const mapDispatchToProps = (dispatch) => {

  return {

  }

}
export default connect(mapStateToProps, mapDispatchToProps)(VehicleApproval);