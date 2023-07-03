/* eslint-disable react/prop-types */
import axios from "axios";
const FileUploader = ({ setStatus, setSong, setError, setRecording }) => {
  
  const handleFileChange = (event) => {
    setRecording(true);
    const file = event.target.files[0];
    setStatus("file selected");
    if (file) {
      const data = new FormData();
      data.append("file", file);
      setStatus("Finding song");
      axios
        .post(
          import.meta.env.VITE_API_URL,
          data
        )
        .then((response) => {
          setStatus("");
          setRecording(false);
          setSong(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      setRecording(false);
      setError("No file selected");
    }
  };

  return (
    <div
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        fontWeight: "600",
      }}
    >
      <input
        type="file"
        id="upload"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="upload"
        onClick={() => {
          setSong("");
        }}
        style={{
          cursor: "pointer",
        }}
      >
        Upload
      </label>
    </div>
  );
};

export default FileUploader;
