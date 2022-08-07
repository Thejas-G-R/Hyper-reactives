import * as React from "react";
import { Paper, SxProps } from "@mui/material";
import { DataGrid, GridToolbar, GridRowsProp, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { faker } from "@faker-js/faker";

const columns: GridColDef[] = [
  {
    field: "address",
    headerName: "Street/Appt Address",
    flex: 2,
    sortable: false,
    disableExport: true,
    filterable: false,
    editable: true
  },
  { field: "Name", headerName: "Name", flex: 1, editable: true },
  { field: "Phone", headerName: "Phone", flex: 1, editable: true},
  { field: "city", headerName: "City", flex: 1, editable: true },
  { field: "zip", headerName: "Zip Code", flex: 1, editable: true  },
  { field: "state", headerName: "State", flex: 1, editable: true},
  { field: "rating", headerName: "Rating", flex: 1},
];

//const addresses: GridRowsProp = [];
const addresses: {
    [key: string]: any;
}[] = [];

for (let i = 0; i < 30; i++) {
  addresses.push({
      id: i+1,
    address: `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
    Name : faker.name.firstName(),
    Phone: faker.phone.number(),
    zip: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    
  });
}

const datagridSx: SxProps = {
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 4,
  width: "100%",
  //minHeight: 500,
  height: 500,
  borderRadius: 2,
};

export default function TutorialDataGrid() {
  //const [pageSize, setPageSize] = React.useState(20);

  return (
    <Paper sx={datagridSx}>
        <h1>Admin Page</h1>
        <p> Service Providers </p>
      <DataGrid
        rows={addresses}
        columns={columns}
        //@ts-ignore
        components={{ Toolbar: () => {return (<GridToolbarContainer sx={{justifyContent: 'flex-end'}}>
          <GridToolbarExport />
        </GridToolbarContainer>)} }}
        initialState={{
          sorting: { sortModel: [{ field: "state", sort: "asc" }] },
        
        }}
        pagination={undefined}
        autoPageSize={true}
        rowsPerPageOptions={[20, 50, 100]}
      />
    </Paper>
  );
}