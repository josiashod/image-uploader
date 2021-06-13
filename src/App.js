import './App.css';
import React from 'react';
import Uploader from './Uploader.js'
import Uploading from './Uploading.js'
import Uploaded from './Uploaded.js'


class App extends React.Component
{
  constructor(props){
    super(props)
    
    this.state = {
      file: '',
      uploading: false,
      error: ''
    }
  }

  onFileInputChange = (event) => {
    const { files } = event.target;
    this.setState({
      uploading: true,
    })

    this.UploadFile(files[0])
  }

  UploadFile = async (file) => {
    const form = new FormData();
    form.append("image", file);

    await fetch("http://localhost:3001/api/upload/", {
      "method": "POST",
      body: form
    })
    .then(response => {
      if(!response.ok)
        return Promise.reject(response)
      return response.json()
    })
    .then(response => {
      // console.log('response', response.file)
      this.setState({
        file: response.file
      })
    })
    .catch(err => {

      err.json().then(value => {
        value = value.replace(/\/|Error: /g,'')
        this.setState({
          uploading: false,
          error: value
        })
      });

    });
  }

  render(){
    const {uploading, file, error} = this.state
    return (<>
        {/* {( !uploading && !file ) ? <Uploader handleInputFile={this.onFileInputChange} errorMessage={error} /> :(
          (uploading && !file) ? <Uploading /> : <Uploaded file={file} />
        ) } */}

      <Uploaded />
    </>)
  }

}

export default App;
