"use client";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";

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
              {[1, 2, 3, 4, 5].map((a) => (
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
  const [webdata, setWebdata] = useState({
    logo: null,
    brandName: null,
    website: null,
    domainService: null,
    domainPurchase: null,
    domainExpiry: null,
  });

  const [logoURL, setLogoURL] = useState<string | undefined>(undefined);

  const logoRef = useRef<HTMLImageElement | null>(null);

  const WebChangeHandler = (e: any) => {
    if (e.target.name === "logo" && e.target.files[0]) {
      const URLs = URL.createObjectURL(e.target.files[0]);
      setLogoURL(URLs);
      setWebdata((ele) => ({ ...ele, logo: e.target.files[0] }));
    } else {
      setWebdata((ele) => ({ ...ele, [e.target.name]: e.target.value }));
    }
  };

  const AddWebsite = () => {
    Object.keys(webdata).forEach((element: string | null) => {
      if (element == "domainPurchase" || element == "domainExpiry") {
        let dd: any = new Date(webdata[element].$d);
        dd = `${dd.getMonth()}/${dd.getDate()}/${dd.getFullYear()}`;
        console.log(dd);
      }
    });
  };

  return (
    <div className="add-website">
      <div className="add-card">
        <h3>add website</h3>
        <form method="post" id="wegsitechecker">
          <div className="form-box">
            {logoURL && (
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <img
                  src={logoURL}
                  alt="Uploaded Logo"
                  ref={logoRef}
                  style={{
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload logo
              <VisuallyHiddenInput
                type="file"
                name="logo"
                id="logo"
                onChange={WebChangeHandler}
              />
            </Button>
          </div>
          <div className="form-box">
            <TextField
              type="text"
              label="brand name"
              value={webdata.brandName}
              onChange={WebChangeHandler}
              name="brandName"
              id="brandName"
            />
          </div>
          <div className="form-box">
            <TextField
              type="text"
              label="website"
              value={webdata.website}
              onChange={WebChangeHandler}
              name="website"
              id="website"
            />
          </div>
          <div className="form-box">
            <TextField
              type="text"
              label="domain Service"
              value={webdata.domainService}
              onChange={WebChangeHandler}
              name="domainService"
              id="domainService"
            />
          </div>
          <div className="form-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ zIndex: 9999 }}>
                <DatePicker
                  label="domain Purchase"
                  value={webdata.domainPurchase}
                  onChange={(e: any) => {
                    setWebdata((ele: any) => ({
                      ...ele,
                      domainPurchase: e,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="form-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ zIndex: 9999 }}>
                <DatePicker
                  label="domain Expiry"
                  value={webdata.domainExpiry}
                  onChange={(e: any) => {
                    setWebdata((ele: any) => ({
                      ...ele,
                      domainExpiry: e,
                    }));
                  }}
                />
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
            <Button variant="contained" color="success" onClick={AddWebsite}>
              add
            </Button>
          </div>
        </form>
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
