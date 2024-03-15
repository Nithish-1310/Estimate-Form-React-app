import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component.jsx/Header";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  FormControlLabel,
} from "@mui/material";

const Form = () => {
  const [yard, setYard] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [agent, setAgent] = useState("");
  const [agentDisabled, setAgentDisabled] = useState(false);
  const [unitNumber, setUnitNumber] = useState("");
  const [usage, setUsage] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [estimatetype, setEstimateType] = useState("");
  const [damagetype, setDamageType] = useState("");
  const [uom, setUom] = useState("");
  const [billTo, setBillTo] = useState("");
  const [lessee, setLessee] = useState("");
  const [active, setActive] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSwitchChange = (e) => {
    setActive(e.target.checked);
  };

  // Initialize currentDate as a Date object set to the current date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  // Calculate the minimum date (previous day of the current date)
  const minDate = new Date(currentDate);
  minDate.setDate(minDate.getDate() - 1);
  const minDateString = minDate.toISOString().split("T")[0];

  const [estimateDate, setEstimateDate] = useState(currentDateString);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    if (selectedDate < minDate) {
      toast.error("Estimate date cannot be in the past.");
      setEstimateDate(currentDateString); // Reset to current date
    } else {
      setEstimateDate(selectedDate.toISOString().split("T")[0]);
    }
  };
  useEffect(() => {
    if (yard === "HK" && customerName === "JACK") {
      setAgent("Not Applicable");
      setAgentDisabled(true); // Disable agent field
    } else {
      setAgent(""); // Reset agent if not applicable
      setAgentDisabled(false); // Enable agent field
    }
  }, [yard, customerName]);

  const handleSave = () => {
    // Validation
    if (
      !yard ||
      !customerName ||
      !unitNumber ||
      !usage ||
      !agent ||
      !estimatetype ||
      !damagetype ||
      !uom ||
      !billTo ||
      !lessee ||
      !amount ||
      !paymentType ||
      !remarks ||
      !active ||
      isNaN(uom) ||
      isNaN(unitNumber) ||
      isNaN(size) ||
      isNaN(amount)
    ) {
      // Show error toast
      return toast.error(
        "Please fill in all required fields with valid values."
      );
    }

    // Save to Firebase
    addDoc(collection(db, "your_collection_name"), {
      yard,
      customerName,
      unitNumber: parseInt(unitNumber),
      usage,
      type,
      size: parseInt(size),
      estimateDate: new Date(estimateDate),
      estimatetype,
      damagetype,
      uom,
      billTo,
      lessee,
      agent,
      active,
      amount: parseFloat(amount),
      paymentType,
      remarks,
    })
      .then(() => {
        // Show success toast
        toast.success("Data saved successfully!");
        // Reset form fields
        setYard("");
        setCustomerName("");
        setUnitNumber("");
        setUsage("");
        setType("");
        setSize("");
        setEstimateDate(currentDateString);
        setEstimateType("");
        setDamageType("");
        setUom("");
        setBillTo("");
        setLessee("");
        setAgent("");
        setActive(false);
        setAmount("");
        setPaymentType("");
        setRemarks("");
      })
      .catch((error) => {
        // Show error toast
        console.error("Error adding document: ", error);
        toast.success("Error saving data. Please try again.");
      });
  };

  return (
    <div className="main">

      <div className="formContainer">
        <Header active={active} handleSave={handleSave} />

        <form id="form">
          <div className="row-styling">
            <FormControl>
              {yard === "" ? (
                <InputLabel shrink={false} required={true}>
                  Yard
                </InputLabel>
              ) : null}
              <Select value={yard} onChange={(e) => setYard(e.target.value)}>
                <MenuItem value="">Select Yard</MenuItem>
                <MenuItem value="HK">HK</MenuItem>
                <MenuItem value="AU">AU</MenuItem>
                <MenuItem value="OT">OT</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              {customerName === "" ? (
                <InputLabel shrink={false} required={true}>
                  Customer Name
                </InputLabel>
              ) : null}
              <Select
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              >
                <MenuItem value="">Select Customer Name</MenuItem>
                <MenuItem value="JACK">JACK</MenuItem>
                <MenuItem value="SAMSON">SAMSON</MenuItem>
                <MenuItem value="JOHN">JOHN</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Unit Number"
              type="number"
              required={true}
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
            />
            <TextField
              label="Usage"
              type="text"
              required={true}
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
            />
          </div>

          <div className="row-styling">
            <div className="typeSizeContainer">
              <TextField
                label="Type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />

              <TextField
                label="Size"
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <TextField
              label="Estimate Date"
              type="date"
              min={minDateString}
              value={estimateDate}
              onChange={handleDateChange}
            />
            <FormControl>
              {estimatetype === "" ? (
                <InputLabel shrink={false} required={true}>
                  Estimate Type
                </InputLabel>
              ) : null}
              <Select
                value={estimatetype}
                onChange={(e) => setEstimateType(e.target.value)}
              >
                {" "}
                <MenuItem value="">Select Estimate Type</MenuItem>
                <MenuItem value="HK">Type 1</MenuItem>
                <MenuItem value="AU">Type 2</MenuItem>
                <MenuItem value="OT">Type 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              {damagetype === "" ? (
                <InputLabel shrink={false} required={true}>
                  Damage Type
                </InputLabel>
              ) : null}
              <Select
                value={damagetype}
                onChange={(e) => setDamageType(e.target.value)}
              >
                {" "}
                <MenuItem value="">Select Damage Type</MenuItem>
                <MenuItem value="HK">Type 1</MenuItem>
                <MenuItem value="AU">Type 2</MenuItem>
                <MenuItem value="OT">Type 3</MenuItem>
              </Select>
            </FormControl>
          </div>


          <div className="row-styling">
            <TextField
              label="UOM"
              required={true}
              type="number"
              value={uom}
              onChange={(e) => setUom(e.target.value)}
            />
            <FormControl>
              {billTo === "" ? (
                <InputLabel shrink={false} required={true}>
                  Bill To
                </InputLabel>
              ) : null}
              <Select value={billTo} onChange={(e) => setBillTo(e.target.value)}>
                <MenuItem value="">Select Bill To</MenuItem>
                <MenuItem value="JACK">JACK</MenuItem>
                <MenuItem value="SAMSON">SAMSON</MenuItem>
                <MenuItem value="JOHN">JOHN</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              {lessee === "" ? (
                <InputLabel shrink={false} required={true}>
                  Lessee
                </InputLabel>
              ) : null}
              <Select value={lessee} onChange={(e) => setLessee(e.target.value)}>
                <MenuItem value="">Select Lessee</MenuItem>
                <MenuItem value="MAERSK">MAERSK</MenuItem>
                <MenuItem value="CMACGM">CMACGM</MenuItem>
                <MenuItem value="MSI">MSI</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              {agent === "" ? (
                <InputLabel shrink={false} required={true}>
                  Agent
                </InputLabel>
              ) : null}
              <Select
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                disabled={agentDisabled}
              >
                <MenuItem value="">Select Agent</MenuItem>
                <MenuItem value="Agent 1">Agent 1</MenuItem>
                <MenuItem value="Agent 2">Agent 2</MenuItem>
                <MenuItem value="Agent 3">Agent 3</MenuItem>
                {yard === "HK" && customerName === "JACK" && (
                  <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          <div className={amount !==""? "row-styling-seconds-new":"row-styling-seconds"  }>
            <TextField
              label="Amount"
              type="number"
              required={true}
              inputProps={{ maxLength: 10 }}
              value={amount}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue) && inputValue.length <= 10) {
                  setAmount(inputValue);
                }
              }}
            />

            {amount && (
              <FormControl>
                {paymentType === "" ? (
                  <InputLabel shrink={false} required={true}>
                    Payment Type
                  </InputLabel>
                ) : null}
                <Select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value="">Select Payment Type</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                </Select>
              </FormControl>
            )}


            <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
              <FormControlLabel

                control={
                  <div className="switchContainer">
                    <Switch
                      type="checkbox"
                      checked={active}
                      onChange={handleSwitchChange}
                      sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#015C5C" } }}
                    />
                  </div>
                }
                label="Active"
              />
            </div>
          </div>
          <div className="remarksContainer">
            <TextField
              label="Remarks"
              type="text"
              required={true}
              style={{ width: "100%" }}
              multiline
              rows={1}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default Form;
