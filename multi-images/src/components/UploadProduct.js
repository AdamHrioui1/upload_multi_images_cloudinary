import React, { useEffect, useState } from 'react'
import axios from "axios";

function UploadProduct() {
  const [files, setfiles] = useState([])
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [images, setimages] = useState([])
  const [uploading, setuploading] = useState(false)
  const [removing, setremoving] = useState(false)


  const handleFile = async () => {
    try {
      setuploading(true)
      var filesSize = 0
      var matchedFiles = []
      var imagesUrl = []

      if(!files || files.length === 0 || Object.keys(files).length === 0 || files === null) {
        setuploading(false)
        return alert("No file uploaded!")
      }

      files.forEach(f => {
        filesSize += f.size
      });

      if(filesSize > 10 * 1024 * 1024) {
        setuploading(false)
        return alert("Files size is too big")
      }

      files.forEach(f => {
        if(f.type === 'image/png' || f.type === 'image/jpeg' || f.type === 'image/webp' || f.type === 'image/svg+xml') {
          matchedFiles.push(f)
        }
      })

      for(let f of matchedFiles) {
        var formData = new FormData()
        formData.append('files', f)
        console.log('uploading...')
        
        const res = await axios.post('/api/upload', formData, {
          headers: { 
            'content-type': 'multipart/form-data'
          }
        })
        console.log(res)
        imagesUrl.push(res.data)
      }
      setimages(imagesUrl)
      setuploading(false)

    } catch (err) {
      setuploading(false)
        console.log(err)
    }
  }

  const handleSubmit = async e => {
      e.preventDefault()
      try {
        const res = await axios.post('/api/product', {
          name: name,
          price: price,
          images: images
        })

        alert('Product uploaded successfult!')  
      } catch (err) {
        console.log(err.response)
      }
  }

  const removeimage = async (id) => {
    var newimages = []
    try {
      setremoving(true)
      
      await axios.post('/api/destroy', { public_id: id })
      images.forEach(i => {
        if(i.public_id !== id) {
          newimages.push(i)
        }
      })

      setimages([...newimages])
      setremoving(false)
      alert('Image removed successfuly!')
    } catch (err) {
      setremoving(false)
      console.log(err)
    }
  }

  return (
    <div>
      {
        uploading && <h2>Uploading images...</h2>
      }
      {
        removing && <h2>removing images...</h2>
      }
      <form onSubmit={handleSubmit} className='form'>
          <input type="file" onChange={e => setfiles([...e.target.files])} multiple />
          <input type="text" placeholder='Please enter name...' onChange={(e) => setname(e.target.value)} value={name} />
          <input type="number" placeholder='Please enter price...' onChange={(e) => setprice(e.target.value)} value={price} />
          <input type="submit" value='Add' />
          <div onClick={() => handleFile()} className="upload_imgs_btn">Upload images</div>
      </form>

      <div className="uploaded_images_container">
        {
          images.length > 0 && images.map((i, index) => {
            return (
              <div className='small_img'>
                <img src={i.secure_url} key={index} alt="" width={70} />
                <p onClick={() => removeimage(i.public_id)} >x</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default UploadProduct
