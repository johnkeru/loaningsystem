import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const TestCropper = ({ src, setSrc }) => {
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [crop, setCrop] = useState({
        unit: "%", // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
    });

    function onCropComplete(crop) {
        const image = document.querySelector("img");
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
        const base64Image = canvas.toDataURL("image/jpeg");
        setCroppedImageUrl(base64Image);
    }
    console.log(croppedImageUrl);

    return (
        <div>
            <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={onCropComplete}
            >
                <img src={croppedImageUrl || src} />
            </ReactCrop>
        </div>
    );
};

export default TestCropper;
