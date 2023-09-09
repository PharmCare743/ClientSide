import { Button, Paper, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isImage } from "../../Constant/constant";
import { addPrescription } from "../../services/prescription.service";

const Prescription = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [fileData, setFileData] = useState("");
  const [image, setImage] = useState("");
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);

  const UploadPrescription = async () => {
    try {
        if (!name || name?.trim() == "") return toast.error("Please Enter Name");
        if (!contact || contact?.trim() == "")
        return toast.error("Please Enter contact");
      if (!email || email?.trim() == "")
        return toast.error("Please Enter Email");
        if (!image)
        return toast.error("Please Upload Prescription Image");
     
      
      const response = await addPrescription(
        email,
        contact,
        name,
        image,
        fileData?.name
      );
      if (response.data.status == 200) {
        setLoading(false);
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setFileData("");
        setContact("");
        setImage("");
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        toast.error(err.response.data.message?.toString());
      } else if (err.message) {
        toast.error(err.message);
      } else if (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div
      className="row "
      style={{
        marginTop: "70px",
        width: "100%",
      }}
    >
      <ToastContainer />
      <Paper className="pb-3">
      <div className="col-sm-12 col-md-6 mt-3 mx-2">
        <TextField
          variant="outlined"
          label="Name"
          value={name}
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mt-3 mx-2">
        <TextField
          variant="outlined"
          label="Contact Number"
          value={contact}
          size="small"
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mt-3 mx-2">
        <TextField
          variant="outlined"
          label="Email"
          value={email}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mt-3 mx-2">
        <Button variant="outlined" onClick={() => imageRef?.current?.click()}>
          Upload Prescription
        </Button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={imageRef}
          onChange={(e) => {
            if (isImage(e.target.files[0])) {
              setFileData(e.target.files[0]);
              try {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                  setImage(reader.result);
                };

                e.target.value = null;
              } catch (err) {
                console.log(err);
              }
            } else {
              setFileData("");
              setImage("");
              toast.error("Only Images Allowed");
            }
          }}
        />
        {fileData && (
          <div>
            <p>Selected File: {fileData.name}</p>
          </div>
        )}
      </div>
      <div className="col-sm-12 col-md-6 mt-3 mx-2">
        <Button
          variant="contained"
          onClick={() => UploadPrescription()}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
      </Paper>
    </div>
  );
};

export default Prescription;
