import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import React, { useCallback } from "react";

import "react-toastify/dist/ReactToastify.css";
import "../../../global/styles/toastify.css";
import { notifySuccess } from "../../../global/styles/toastify";

import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { HighlightOffOutlined } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import axios from "axios";
import auth from "../../../global/urls/auth";
import TestCropper from "../../test-components/TestCropper";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    py: 2,
    px: 3,
};

const SideProfileImageUploadDialog = ({ user, token, modifyUser }) => {
    const [open, setOpen] = React.useState(false);
    const [isCrop, setIsCrop] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [crop, setCrop] = useState({
        unit: "px", // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
    });

    function onCropComplete(crop) {
        const image = document.querySelector("#preselect_img");
        const canvas = document.createElement("canvas");
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
        );
        const base64Image = canvas.toDataURL();
        setCroppedImageUrl(base64Image);
    }

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];

        // Check if the file is an image and meets the size requirements
        if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif" ||
            file.type === "image/jpg"
        ) {
            if (file.size > 3145728) {
                // 3MB in bytes
                setError(
                    "File size is too large. Please select a file smaller than 3MB."
                );
                return;
            }

            // Set the file and preview image
            setFile(file);
            setPreview(URL.createObjectURL(file));
            setError("");
        } else {
            setError(
                "Please select an image file with the extensions jpeg, png, gif, or jpg."
            );
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFileSize: 3145728, // 3MB in bytes
    });

    const handleProfileUpload = () => {
        const formData = new FormData();
        formData.append("image", file);
        axios
            .post(auth.PROFILE_UPLOAD, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                notifySuccess("Successfully uploaded the image.");
                modifyUser(res.data.user);
                handleClose();
            });
    };
    return (
        <>
            <Box
                sx={{
                    width: "22%",
                    mr: 2,
                    cursor: "pointer",
                }}
                onClick={handleClickOpen}
            >
                <img
                    src={
                        user?.avatar
                            ? "http://localhost:8000" + user.avatar
                            : preview || "avatar.png"
                    }
                    style={{ borderRadius: "50%" }}
                    alt=""
                    width={"50px"}
                    height={"50px"}
                />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
                    <div className="image-upload">
                        <div
                            {...getRootProps()}
                            className={`dropzone ${
                                isDragActive ? "active" : ""
                            }`}
                        >
                            {!isCrop && <input {...getInputProps()} />}
                            <Box
                                sx={{
                                    width: "100%",
                                    m: "auto",
                                    position: "relative",
                                }}
                            >
                                {isCrop ? (
                                    <TestCropper
                                        crop={crop}
                                        croppedImageUrl={croppedImageUrl}
                                        setCrop={setCrop}
                                        src={preview}
                                    />
                                ) : (
                                    <img
                                        src={
                                            preview
                                                ? preview
                                                : user?.avatar
                                                ? "http://localhost:8000" +
                                                  user.avatar
                                                : "avatar.png"
                                        }
                                        alt="Preview"
                                        width={"100%"}
                                    />
                                )}

                                {!file && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "100%",
                                            width: "100%",
                                            position: "absolute",
                                            bgcolor: "rgba(0,0,0,.5)",
                                            borderRadius: user?.avatar
                                                ? undefined
                                                : "50%",
                                            color: "#fff",
                                            top: 0,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography fontSize={"1.2rem"}>
                                            {!isDragActive
                                                ? "Drag or click to upload image"
                                                : "Drop"}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </div>
                        {error && <p className="error">{error}</p>}
                    </div>

                    <ButtonGroup
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={
                                isCrop ? () => setIsCrop(false) : handleClose
                            }
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        {isCrop ? (
                            <Button
                                disabled={!preview}
                                variant="contained"
                                type="submit"
                                // onClick={() => onCropComplete(crop)}
                            >
                                Save Crop
                            </Button>
                        ) : (
                            <Button
                                disabled={!preview}
                                variant="contained"
                                type="submit"
                                onClick={handleProfileUpload}
                            >
                                Upload
                            </Button>
                        )}
                    </ButtonGroup>

                    {file && !isCrop && (
                        <Grid
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                position: "absolute",
                                top: 15,
                                right: 0,
                                left: 0,
                                m: "auto",
                                width: "91%",
                                background: "rgb(0,0,0)",
                                background:
                                    "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12097338935574231) 44%)",
                                ":hover": {
                                    background:
                                        "linear-gradient(0deg, rgba(0,0,0,0.05097338935574231) 0%, rgba(0,0,0,0.15097338935574231) 44%)",
                                },
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    setIsCrop(true);
                                }}
                                sx={{ color: "white" }}
                            >
                                <CropIcon sx={{ fontSize: "2rem" }} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "white",
                                    ":hover": { color: "error.main" },
                                }}
                                onClick={() => {
                                    setPreview("");
                                    setFile(null);
                                }}
                            >
                                <HighlightOffOutlined
                                    sx={{ fontSize: "2rem" }}
                                />
                            </IconButton>
                        </Grid>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default SideProfileImageUploadDialog;
