"use client";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

function Dashboard() {
  const [addwebsite, setAddwebsite] = useState<boolean>(false);
  return (
    <div className="container">
      <header>
        <Image
          src={"/attirant.png"}
          alt="attirant"
          width={250}
          height={80}
          className="header-image"
        />
        <i
          className="fa-solid fa-right-from-bracket"
          style={{ color: "#ffffff" }}
        ></i>
      </header>
      <div className="dashboard">
        <div className="brudcamp">
          <i className="fa-solid fa-house" style={{ color: "#000021" }}></i>
          <b>dashboard</b>
        </div>
        <div className="website-box">
          <div className="website-card">
            <div className="website-header">
              <b>list of website</b>
              <i
                className="fa-solid fa-circle-plus"
                style={{ color: "#000021" }}
                onClick={() => setAddwebsite(true)}
              ></i>
              {addwebsite && <AddWebsite setAddwebsite={setAddwebsite} />}
            </div>
            <div className="website-card-container">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((a) => (
                <WebsiteCard key={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddWebsite = ({ setAddwebsite }: { setAddwebsite: any }) => {
  return (
    <div className="add-website">
      <div className="add-card">
        <h3>add website</h3>

        <div className="form-box">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload logo
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
        <div className="form-box">
          <TextField type="text" label="brand name" />
        </div>
        <div className="form-box">
          <TextField type="text" label="website" />
        </div>
        <div className="form-box">
          <TextField type="text" label="domain Service" />
        </div>
        <div className="form-box">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ zIndex: 9999 }}>
              <DatePicker label="domain Purchase" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="form-box">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ zIndex: 9999 }}>
              <DatePicker label="domain Expiry" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="button-website">
          <Button
            variant="contained"
            color="error"
            onClick={() => setAddwebsite(false)}
          >
            cancel
          </Button>
          <Button variant="contained" color="success">
            add
          </Button>
        </div>
      </div>
    </div>
  );
};

const WebsiteCard = () => {
  return (
    <div className="website-added-card">
      <Image src="/brandlogo/img.webp" alt="brandname" width={72} height={72} />
      <span className="brand-name">nobalmeditech</span>
      {/* <b>attirant.in</b> */}
      <div className="exp-date">30 days</div>
      <span className="web-service">hostinger</span>
      <div className="webaction-icons">
        <i className="fa-solid fa-earth-americas"></i>
        <i className="fa-solid fa-pen-to-square"></i>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};
