const api_key = "293987939994788";
const cloud_name = "ddkcibobs";

document.addEventListener("submit", async function (e) {
  if (e.target.classList.contains("upload-form")) {
    e.preventDefault();
    
    const form = e.target;
    const index = form.querySelector(".upload-button").getAttribute("data-index");
    const fileField = form.querySelector(`#file-field-${index}`);
    const typeField = form.querySelector(`#id-${index}`);

    if (!fileField.files[0]) {
      alert("Please select a file to upload.");
      return;
    }

    // Get signature
    const signatureResponse = await axios.get("/get-signature");
    
    const data = new FormData();
    data.append("file", fileField.files[0]);
    data.append("api_key", api_key);
    data.append("signature", signatureResponse.data.signature);
    data.append("timestamp", signatureResponse.data.timestamp);

    const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: function (e) {
        console.log(e.loaded / e.total);
      }
    });
    console.log(cloudinaryResponse.data);

    // Send the image info back to our server
    const photoData = {
      public_id: cloudinaryResponse.data.public_id,
      version: cloudinaryResponse.data.version,
      signature: cloudinaryResponse.data.signature,
      type: typeField.value
    };

    await axios.post("/administration/tmc", photoData);
    window.location.reload();
  }
});
