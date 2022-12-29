import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./dtb.css";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/actions";

const columns = [
  { field: "logId", headerName: "logId", width: 200 },
  { field: "applicationType", headerName: "Application Type", width: 200 },
  { field: "applicationId", headerName: "Application ID", width: 200 },
  { field: "actionType", headerName: "Action", width: 200 },
  { field: "Action Details", headerName: "Action Details", width: 200 },
  { field: "creationTimestamp", headerName: "Date:Time", width: 200 },
];

const DataTable = () => {
  const [tableData, setTableData] = useState([]);
  const [tableSearchData, setTableSearchData] = useState([]);
  const [searchLogID, setSearchLogID] = useState("");
  const [searchActionType, setSearchActionType] = useState("");
  const [searchApplicationType, setSearchApplicationType] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchApplicationID, setSearchApplicationID] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const newData = async () => {
      dispatch(setTableSearchData(await fetchData()))
    };
    setTableSearchData(newData());

  }, []);

  const handleSearch = () => {
    const searchIteam = tableSearchData.filter((tableSearchData) => {
      return (
        tableSearchData.logId === parseInt(searchLogID) ||
        tableSearchData.actionType === searchActionType ||
        tableSearchData.applicationType === searchApplicationType ||
        tableSearchData.applicationId === parseInt(searchApplicationID) ||
        moment(tableSearchData.creationTimestamp).format("YYYY-MM-DD") ===
          moment(searchDate).format("YYYY-MM-DD")
      );
    });
    setTableSearchData(searchIteam);
  };
  return (
    <div style={{ height: 631, width: "100%" }}>
      <div className="dtb">
        <TextField
          id="logId"
          label="Employee Name"
          variant="outlined"
          sx={{ mr: 5 }}
          onChange={(event) => setSearchLogID(event.target.value)}
        />
        <FormControl sx={{ minWidth: 300, maxWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Action Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="actionType"
            label="Action Type"
            sx={{ mr: 5 }}
            onChange={(event) => setSearchActionType(event.target.value)}
          >
            <MenuItem value="ADD_EMPLOYEE">ADD_EMPLOYEE</MenuItem>
            <MenuItem value="DARI_APP_LOGIN">DARI_APP_LOGIN</MenuItem>
            <MenuItem value="DARI_REFRESH_TOKEN">DARI_REFRESH_TOKEN</MenuItem>
            <MenuItem value="INITIATE_APPLICATION">
              INITIATE_APPLICATION
            </MenuItem>
            <MenuItem value="SUBMIT_APPLICATION">SUBMIT_APPLICATION</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 300, maxWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">
            Application Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="applicationType"
            label="Application Type"
            sx={{ mr: 5 }}
            onChange={(event) => setSearchApplicationType(event.target.value)}
          >
            <MenuItem value={null}>null</MenuItem>
            <MenuItem value="LEASE_REGISTRATION">LEASE_REGISTRATION</MenuItem>
            <MenuItem value="LEASE_CLOSURE">LEASE_CLOSURE</MenuItem>
            <MenuItem value="CERT_TITLE_DEED_PLOT">
              CERT_TITLE_DEED_PLOT
            </MenuItem>
            <MenuItem value="ADD_POA">ADD_POA</MenuItem>
            <MenuItem value="ADD_COMPANY">ADD_COMPANY</MenuItem>
            <MenuItem value="ADD_COMPANY_EMPLOYEE">
              ADD_COMPANY_EMPLOYEE
            </MenuItem>
            <MenuItem value="ADD_COMPANY">ADD_COMPANY</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="creationTimestamp"
          label="From Date"
          type="Date"
          defaultValue={false}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mr: 5 }}
          onChange={(event) => setSearchDate(event.target.value)}
        />
        <TextField
          id="creationTimestamp"
          label="To Date"
          type="Date"
          defaultValue={false}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mr: 5 }}
        />

        <TextField
          id="applicationId"
          label="Application ID"
          variant="outlined"
          type="number"
          sx={{ mr: 2 }}
          onChange={(event) => setSearchApplicationID(event.target.value)}
        />
        <Button
          type="submit"
          sx={{ mt: 1 }}
          variant="contained"
          onClick={() => handleSearch()}
        >
          search logger
        </Button>
      </div>
      <DataGrid
        sx={{ mx: 10, my: 10 }}
        rows={tableSearchData}
        columns={columns}
        getRowId={(iteam) => iteam.logId}
        pageSize={10}
        Pagination-variant="outlined"
        Pagination-shape="rounded"
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default DataTable;
