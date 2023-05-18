import React, { useState } from 'react';

const Add= () => {
    const [formData, setFormData] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('image', event.target.productImage.files[0]);

        console.log(formDataObj)
        fetch('http://localhost:8000/post-category', {
            method: 'POST',
            body: formDataObj,
        })
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => console.log(error));
    };

    const handleClearClick = () => {
        setFormData({ name: '', image: '' });
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(typeof (selectedFile))
        // const res = JSON.stringify(selectedFile)
        // console.log(res)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        fileReader.onloadend = () => {
            setFormData((data) => ({ ...data, image: fileReader.result }));
        };
    };

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div>
                        <h3 className="Auth-form-title">Add category</h3>
                        <div>
                            <label>Add category</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) =>
                                    setFormData((data) => ({ ...data, name: e.target.value }))
                                }
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label htmlFor="productImage">Upload Image:</label>
                            <input
                                type="file"
                                id="productImage"
                                name="productImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="input-field"
                            />
                            {formData.image && (
                                <img src={formData.image} alt="selected file" width="200" />
                            )}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={handleClearClick}
                                className="btn btn-primary btn-lg btn-sm  my-3"
                                style={{
                                    paddingRight: '25px',
                                    paddingLeft: '25px',
                                    backgroundColor: '#035F9B',
                                    marginRight: '9px',
                                }}
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-sm my-3"
                                style={{
                                    paddingRight: '25px',
                                    paddingLeft: '25px',
                                    backgroundColor: '#035F9B',
                                    marginRight: '9px',
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;
