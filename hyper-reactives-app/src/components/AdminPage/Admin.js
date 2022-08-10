import React, { useState, useEffect } from 'react';
// import './App.css';
import { forwardRef } from 'react';
// import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'
import { constants } from '../../utils/constants';

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
import { useNavigate } from 'react-router-dom';
//  import { constants } from 'buffer';

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
  baseURL: `http://localhost:8000/`
  // baseURL: `https://reqres.in/api`
})


function ValidatePhone(phone) {
  // const re = /^(1-)?\d{3}-\d{3}-\d{4}$/;

  console.log(RegExp(constants.ADMIN_EDIT_FIELD_PHONE).test(phone));
  return RegExp(constants.ADMIN_EDIT_FIELD_PHONE).test(phone);

}

function ValidateZipCode(zipcode) {
  // const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
  // return re.test(zipcode);
  console.log(RegExp(constants.ADMIN_EDIT_FIELD_ZIPCODE).test(zipcode));
  return RegExp(constants.ADMIN_EDIT_FIELD_ZIPCODE).test(zipcode);
}

function ValidateRating(rating) {
  // const re = /[+]?([0-4]*\.[0-9]+|[0-5])/;
  // return re.test(rating);
  console.log(RegExp(constants.ADMIN_EDIT_FIELD_RATING).test(rating));
  return RegExp(constants.ADMIN_EDIT_FIELD_RATING).test(rating);
}

function Demo() {
  const navigate = useNavigate();
  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Name", field: "name" },
    { title: "Phone", field: "phone" },
    { title: "Street", field: "street" },
    { title: "State", field: "state" },
    { title: "Zipcode", field: "zipcode" },
    { title: "Rating", field: "rating" },
    { title: "city", field: "city" },
    { title: "Description", field: "description" }
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    // api.get("/getAll?authorization=")
    api.get("serviceProvider/getAll", { headers: { "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYwNDAyY2Q1MDAwMTQ3NjkxZTE4ODEiLCJpYXQiOjE2NjAwMDM1NzJ9.vFeBzCP5xij4JuksZTlSUanwor1rNxPSkxO-_pSSex0` } })
      .then(res => {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code === 0) {
          console.log(res.data.serviceProviders.ServiceProviders)
          setData(res.data.serviceProviders.ServiceProviders)
        }
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.name === undefined) {
      errorList.push("Please enter last name")
    }

    if (newData.phone === undefined || ValidatePhone(newData.phone) === false) {
      errorList.push("Please enter a valid phone number in the formate XXX-XXX-XXXX ")
    }
    if (newData.street === undefined) {
      errorList.push("Please enter a valid street address")
    }
    if (newData.state === undefined) {
      errorList.push("Please enter a valid state")
    }
    if (newData.zipcode === undefined || ValidateZipCode(newData.zipcode) === false) {
      errorList.push("Please enter a valid zipcode in the formate XXXXX or XXXXX-XXXX")
    }
    if (newData.rating === undefined || ValidateRating(newData.rating) === false) {
      errorList.push("Please enter a valid rating between 0 to 5 ")
    }
    if (newData.description === undefined) {
      errorList.push("Please enter a valid description")
    }
    if (newData.city === undefined) {
      errorList.push("Please enter a valid city name")
    }


    const requestOptions = {
      // method: 'POST',
      headers: { "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYwNDAyY2Q1MDAwMTQ3NjkxZTE4ODEiLCJpYXQiOjE2NjAwMDM1NzJ9.vFeBzCP5xij4JuksZTlSUanwor1rNxPSkxO-_pSSex0` },

    };

    if (errorList.length < 1) {
      api.post("serviceProvider/edit", newData, requestOptions)
        .then(res => {
          console.log(res)
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
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


  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []



    if (newData.name === undefined) {
      errorList.push("Please enter last name")
    }

    if (newData.phone === undefined) {
      errorList.push("Please enter a valid phone")
    }
    if (newData.street === undefined) {
      errorList.push("Please enter a valid street address")
    }
    if (newData.state === undefined) {
      errorList.push("Please enter a valid state")
    }
    if (newData.zipcode === undefined) {
      errorList.push("Please enter a valid zipcode")
    }
    if (newData.rating === undefined) {
      errorList.push("Please enter a valid rating")
    }
    if (newData.description === undefined) {
      errorList.push("Please enter a valid description")
    }
    if (newData.city === undefined) {
      errorList.push("Please enter a valid description")
    }
    const requestOptions = {
      // method: 'POST',
      headers: { "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYwNDAyY2Q1MDAwMTQ3NjkxZTE4ODEiLCJpYXQiOjE2NjAwMDM1NzJ9.vFeBzCP5xij4JuksZTlSUanwor1rNxPSkxO-_pSSex0` },

    };

    if (errorList.length < 1) { //no error
      api.post("serviceProvider/add", newData, requestOptions)
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }


  }

  // const handleRowDelete = (oldData, resolve) => {

  //   api.delete("/users/"+oldData.id)
  //     .then(res => {
  //       const dataDelete = [...data];
  //       const index = oldData.tableData.id;
  //       dataDelete.splice(index, 1);
  //       setData([...dataDelete]);
  //       resolve()
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Delete failed! Server error"])
  //       setIserror(true)
  //       resolve()
  //     })
  // }


  return (

    <div className="App" style={{width: "100%", alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap"}}>
      <div className="vehicleApprovalButton">
        <button onClick={() => navigate("../vehicle-approval")} style={{ 
          color: "#2c2a2f !important",
          display: "block",
          width: "300px",
          height: "40px",
          fontSize: "14px",
          background: "#f3ebf2 !important",
          border: "none",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderRadius: "40px",
          margin: "20px"
          }}>vehicle approvals</button>
      </div>
      <Grid container spacing={1} style={{width: "80%"}}>
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
          <div>
          <MaterialTable
            title="Manage your service providers"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              isDeleteHidden: (newData) => newData.rating > 0,

              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);

                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve)
                }),
              // onRowDelete: (oldData) =>
              //   new Promise((resolve) => {
              //     handleRowDelete(oldData, resolve)
              //   }),
            }}

            options={{
              exportButton: true, exportAllData: true, exportFileName: "TableData"
            }}
          />
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default Demo;