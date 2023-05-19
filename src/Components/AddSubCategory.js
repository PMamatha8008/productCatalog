import { Button, FormControl, InputLabel, Select, MenuItem, TextField, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'


const AddSubCategory = () => {

    const [value, setValue] = useState([]);
    const [data, setData] = useState({})
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [selectedId, setSelectedId] = useState('')



    const imgPath = window.location.origin

    // const CustomSelect = styled(Select)({
    //     '& .MuiOutlinedInput-root': {
    //         '& fieldset': {
    //             borderColor: 'red', // Replace 'red' with your desired border color
    //         },
    //         '&:hover fieldset': {
    //             borderColor: 'blue', // Replace 'blue' with your desired border color on hover
    //         },
    //     },
    //     '& .MuiInputBase-input': {
    //         color: '#1976D2',
    //         fontSize: '15px',
    //     },
    //     '& .MuiInputLabel-root': {
    //         color: '#1976D2',
    //         fontSize: '15px',
    //     },
    // });

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
            <div className="Auth-form-container">
                <form onSubmit={handlesubmit}>

                    <h3 className="Auth-form-title">Add sub category</h3>
                    <div >
                        {/* <label>
                            Category
                        </label>

                        <select id="categoryId" >
                            <option value=""></option>
                            {value.map((item) => (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            ))}

                        </select> */}
                        <FormControl sx={{ m: 1, width: 400 }}>
                            <InputLabel id="categoryId-label" sx={{
                                color: '#1976D2',
                                fontSize: '15px',
                            }}>Category</InputLabel>
                            <Select
                                labelId="categoryId-label"
                                id="categoryId"
                                size='small'
                                value={selectedId}
                                onChange={(event) => setSelectedId(event.target.value)}

                                label="Category"
                                sx={{
                                    "&.MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#1976D2",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#1976D2"
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#1976D2"
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#1976D2',
                                            fontSize: '15px',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#1976D2',
                                            fontSize: '15px',
                                        },
                                    }

                                }}
                            >

                                {value.map((item) => (
                                    <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: 400 }}>
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
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#1976D2',
                                        fontSize: '15px',
                                    },
                                }}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: 400 }}>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                id="productImage"
                                name="productImage"
                                defaultValue={data.image}
                                // onChange={(e)=>setData(({...data ,image:e.target.value}))}
                                onChange={(e) => setData(data => ({ ...data, image: imgPath + /images/ + e.target.files[0].name }))}
                            />
                            <label htmlFor="productImage">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    sx={{
                                        width: 400,

                                        borderColor: '#1976D2', // Change the border color to blue
                                        '&:hover': {
                                            borderColor: '#1976D2', // Change the border color on hover to blue
                                        },
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '12px', // Decrease the font size to 12px
                                        }}
                                    >
                                        Upload Image
                                    </span>

                                </Button>
                            </label>
                        </FormControl>
                    </div>

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
                </form>
            </div>
        </>
    )
}

export default AddSubCategory