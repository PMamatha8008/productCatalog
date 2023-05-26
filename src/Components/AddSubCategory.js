import { Button, FormControl, InputLabel, Select, MenuItem, TextField, styled, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'


const AddSubCategory = () => {

    const [value, setValue] = useState([]);
    const [data, setData] = useState({})
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [selectedId, setSelectedId] = useState('')



    const imgPath = window.location.origin

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1976D2',
            },
            '&:hover fieldset': {
                borderColor: '#1976D2',
            },
        },
        '& .MuiInputBase-input': {
            color: '#1976D2',
            fontSize: '15px',
            fontFamily: 'Open Sans',
        },
        '& .MuiInputLabel-root': {
            color: '#1976D2',
            fontSize: '13px',
            fontFamily: 'Open Sans',
        },
    }

    useEffect(() => {
        fetch('http://localhost:8000/get-category')
            .then(res => res.json())
            .then((data) => {
                setValue(data)
                console.log(data)
            })
            .catch(error => console.log(error))

    }, [])



    const handlesubmit = (e) => {
        e.preventDefault()

        // let id = document.getElementById("categoryId").value

        // const newId = (id)
        console.log(selectedId)
        // setData({
        //    ...data,categoryId:newId,
        // })
        //   console.log(data.categoryId)
        fetch('http://localhost:8000/post-subCategory',
            {
                method: "POST",
                body: JSON.stringify({ ...data, categoryId: selectedId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 1000)
                window.location.reload();


            })


    }

    // const handleClearButtonClick = () => {
    //     setValue([])
    //     setData({ ...data, name: '' })
    // };



    return (
        <>
            <div
                style={{
                    // backgroundColor: '#f2f2f2',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    // padding: '20px',
                }}
            >
                <Paper elevation={10} >
                    <form onSubmit={handlesubmit}>
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            maxWidth={400}
                            backgroundColor="white"
                            alignItems="center"
                            justifyContent={"center"}
                            // margin="auto"
                            // minHeight= '100vh'
                            // marginTop={25}
                            padding="40px 60px"
                            borderRadius={3}
                        // boxShadow={'5px 5px 10px #ccc'}
                        // sx={{
                        //     ":hover": {
                        //         boxShadow: "10px 10px 20px #ccc"
                        //     }
                        // }}
                        >
                            <h3 className="Auth-form-title">Add Sub Category</h3>

                            {/* <label>
                            Category
                        </label>

                        <select id="categoryId" >
                            <option value=""></option>
                            {value.map((item) => (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            ))}

                        </select> */}
                            <FormControl sx={{ m: 1, width: 300 }}>

                                <TextField
                                    // labelId="categoryId-label"
                                    label="Category"
                                    id="categoryId"
                                    size='small'
                                    value={selectedId}
                                    select
                                    displayEmpty
                                    onChange={(event) => setSelectedId(event.target.value)}
                                    sx={textFieldStyles}
                                >

                                    {value.map((item) => (
                                        <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 300 }}>
                                <TextField
                                    label="Add sub category"
                                    variant="outlined"
                                    size='small'
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#1976D2',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1976D2',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#1976D2',
                                            fontSize: '15px',
                                            fontFamily: 'Open Sans',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#1976D2',
                                            fontSize: '13px',
                                            fontFamily: 'Open Sans',
                                        },
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 300 }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    id="productImage"
                                    name="productImage"
                                    defaultValue={data.image}
                                    // onChange={(e)=>setData(({...data ,image:e.target.value}))}
                                    onChange={(e) => setData(data => ({ ...data, image: /images/ + e.target.files[0].name }))}
                                />
                                <label htmlFor="productImage">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        sx={{
                                            width: 300,

                                            borderColor: '#f09916',
                                            '&:hover': {
                                                borderColor: '#f09916',
                                            },
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color: '#f09916'
                                            }}
                                        >
                                            Upload Image
                                        </span>

                                    </Button>
                                </label>
                            </FormControl>


                            <div style={{ textAlign: 'center' }}>
                                <button type="button"
                                    // onClick={handleClearButtonClick}
                                    // onClick={() => setData({...data ,name:''})}
                                    className="btn btn-primary btn-lg btn-sm  my-3"
                                    style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-sm my-3"
                                    style={{ paddingRight: '25px', paddingLeft: '25px', backgroundColor: '#035F9B', marginRight: '9px' }}
                                >
                                    Save
                                </button>
                            </div>
                        </Box>
                    </form>
                </Paper>
            </div>
        </>
    )
}

export default AddSubCategory