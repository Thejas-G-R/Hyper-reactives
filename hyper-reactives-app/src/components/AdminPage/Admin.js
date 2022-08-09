import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
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
  baseURL: `http://localhost:8000/serviceProvider`
  // baseURL: `https://reqres.in/api`
})


function ValidatePhone(phone) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(phone);
}

function ValidateZipCode(zipcode) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(zipcode);
}

function ValidateRating(rating) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(rating);
}

function AdminPage() {

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
    api.get("/getAll?authorization=")
    api.get("/getAll", { headers: { "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYwNDAyY2Q1MDAwMTQ3NjkxZTE4ODEiLCJpYXQiOjE2NTk5MTI2Nzh9.4jQoMx0b2ecCanQxkGdv7YwxZxwvv5TXFRFF5FKlJpo`, "Access-Control-Allow-Origin": "http://localhost:3000" } })
      .then(res => {
        console.log(res.data.data)
        // setData(res.data.data)
        setData(
          [{ id: 1, name: "Pramod", phone: "8979897", street: "oiy oy", state: "sads", zipcode: "8798", rating: "3.4", email: "sad@mail.com", description: "car service" }])
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
      headers: { "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYwNDAyY2Q1MDAwMTQ3NjkxZTE4ODEiLCJpYXQiOjE2NTk5MTI2Nzh9.4jQoMx0b2ecCanQxkGdv7YwxZxwvv5TXFRFF5FKlJpo` },

    };

    if (errorList.length < 1) {
      api.patch("/edit", newData, requestOptions)
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
      headers: { "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYwNDAyY2Q1MDAwMTQ3NjkxZTE4ODEiLCJpYXQiOjE2NTk5MTI2Nzh9.4jQoMx0b2ecCanQxkGdv7YwxZxwvv5TXFRFF5FKlJpo` },

    };

    if (errorList.length < 1) { //no error
      api.post("/add", newData, requestOptions)
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

  const handleRowDelete = (oldData, resolve) => {

    api.delete("/users/" + oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  return (

    <div className="App">
      <div> Admin Page </div>
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
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve)
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve)
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>

      <div>
        <h1>
          Vehicle Details</h1>
      </div>
    </div>
  );
}

export default AdminPage;