import React, { useEffect, useState } from 'react'
import axios from "axios";

function UploadProduct() {
    const [files, setfiles] = useState([])
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [images, setimages] = useState([])


    const handleFile = async () => {

        try {
          if(!files || files.length === 0 || Object.keys(files).length === 0 || files === null)
              return alert("No file uploaded!")

          var filesSize = 0
          files.forEach(f => {
              filesSize += f.size
          });
          console.log(filesSize)

          if(filesSize > 10 * 1024 * 1024)
              return alert("Files size is too big")

          var matchedFiles = []
          files.forEach(f => {
              if(f.type === 'image/png' || f.type === 'image/jpeg' || f.type === 'image/webp' || f.type === 'image/svg+xml') {
                  matchedFiles.push(f)
              }
          })
          console.log(matchedFiles)

          var imagesUrl = []
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

          console.log(imagesUrl)
          setimages(imagesUrl)

        } catch (err) {
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

            console.log(res)
        } catch (err) {
            console.log(err.response)
        }
    }

    const removeimage = async (id) => {
      var newimages = []
      try {
        const res = await axios.post('/api/destroy', { public_id: id })
        images.forEach(i => {
          if(i.public_id !== id) {
            newimages.push(i)
          }
        })
        console.log(newimages)

        setimages([...newimages])
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
        console.log(files)
        console.log(files.length)
    }, [files])

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={e => setfiles([...e.target.files])} multiple />
            <input type="text" placeholder='Please enter name...' onChange={(e) => setname(e.target.value)} value={name} />
            <input type="number" placeholder='Please enter price...' onChange={(e) => setprice(e.target.value)} value={price} />
            <input type="submit" value='Add' />
            <div onClick={() => handleFile()}>wooow</div>
        </form>

        {
          images.length > 0 && images.map((i, index) => {
            return (
              <>
                <img src={i.secure_url} alt="" width={70} />
                <p onClick={() => removeimage(i.public_id)} >x</p>
              </>
            )
          })
        }
    </div>
  )
}

export default UploadProduct
