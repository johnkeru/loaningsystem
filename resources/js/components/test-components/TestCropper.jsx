import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const TestCropper = ({
    src,
    crop,
    setCrop,
    croppedImageUrl,
    onCropComplete,
}) => {
    return (
        <div style={{ textAlign: "center" }}>
            <ReactCrop
                crop={crop}
                onChange={(c) => {
                    setCrop(c);
                }}
                onComplete={onCropComplete}
            >
                <img src={croppedImageUrl || src} id="preselect_img" />
            </ReactCrop>
        </div>
    );
};

export default TestCropper;
