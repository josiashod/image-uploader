import uploadImg from './image.svg'
import { FileDrop } from 'react-file-drop'
import React from 'react';

const gray = {
    2: "#4F4F4F",
    3: "#828282",
    4: "#BDBDBD",
    6: "#F2F2F2"
  }
  
const styles = {
    h1: {
      fontSize: 18,
      letterSpacing: '-3,5%',
      lineHeight: '27px',
      color: gray[2]
    },
  
    span: {
      fontSize: 10,
      lineHeight: '15px',
      color: gray[3]
    },
  
    uploader: {
      boxSizing: "border-box",
      backgroundColor: "#F6F8FB",
      border: "1px dashed #97BEF4",
    },
  
    drag: {
      fontSize: 12,
      color: gray[4]
    },
  
    or: {
      fontSize: 12,
      color: gray[4]
    },
  
    chooseFile: {
      fontSize: 12,
      color: "#ffffff",
      backgroundColor: "#2F80ED",
      border: "1px solid transparent",
      padding: "8px 16px",
      fontFamily: "'Noto sans', sans-serif"
    },
  }

export default function Uploader ({ handleInputFile, errorMessage }) {
  
  const fileInputRef = React.useRef(null);

  const onTargetClick = () => {
    fileInputRef.current.click()
  }

  return (<div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 py-4 md:py-8 shadow-md text-center rounded-lg w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/6 bg-white ">
    <h1 style={styles.h1}> Upload your image </h1>
    <span style={styles.span} >File should be Jpeg, Png,...</span>
    <FileDrop
      className="hover:cursor-pointer"
      onTargetClick={onTargetClick}
      onDrop={(files, event) => console.log('onDrop!', files, event)}
    >
      <div 
        className="hover:cursor-pointer mt-6 py-4 md:py-10 w-4/5 rounded-lg mx-auto flex flex-col justify-center space-y-6"
        style={styles.uploader}
      >
        <img src={uploadImg} alt="upload" className="w-2/5 mx-auto" />
        <h1 style={styles.drag} >Drag & Drop your image here</h1>
      </div>
      { errorMessage && <span className="text-red-400 text-xs"> { errorMessage } </span> }
    </FileDrop>
    <div style={styles.or} className="my-4" >Or</div>

    <div className="hover:cursor-pointer">
      <input 
        className="inputfile" 
        type="file" 
        name="" id="file" 
        onChange={handleInputFile}
        ref={fileInputRef}
      />
      <label className="mx-auto rounded-lg" htmlFor="file" style={styles.chooseFile}>Choose a file</label>
    </div>
  </div>)
}