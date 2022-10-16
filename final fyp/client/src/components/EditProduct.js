import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getPostData, updatePostData } from "../api/auth";
import isEmpty from 'validator/lib/isEmpty';
const EditProduct = () => {
    const back=useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [pic, setPic] = useState();
    const { id } = useParams();

    const [error, setError] = useState(false);
    const [iserror, setIsError] = useState(true);



    const getdata = () => {
        try {
            getPostData(id)
                .then((response) => {
                    console.log('Axios signup success:', response.data.message);
                    setDescription(response.data.message.description);
                    setPrice(response.data.message.price);
                    setTitle(response.data.message.title);
                    setPic(response.data.message.image);

                    //window.location.reload();

                })
                .catch((err) => {
                    console.log('Axios signup error:', err);
                    //setFormData({ ...userFormData, loading: false, errorMsg: err.response.data.errorMessage });
                });
        }
        catch (err) {
            console.log('Error : ', err);
        }
    }
    const verifyDescriptionAndTitle = () => {
        var check = true;
        if (isEmpty(description) || isEmpty(title) || isEmpty(price.toString())) {
            check = false;
            setError("Please fill all required details of post");
            setIsError(true);
            console.log("Please fill all required details of post");
        }
        if (description.length < 10 || title.length < 5) {
            check = false;
            setError("Description length must be greater than 10 and title must be greater than 5");
            setIsError(true);
            console.log("Description length must be greater than 10 and title must be greater than 5");
        }
        else if (price == 0) {
            check = false;
            setError("Price can't be equal to 0");
            setIsError(true);
            console.log(`Price can't be equal to 0`);
        }
        else if (price < 0) {
            check = false;
            setError("Price can't be negative");
            setIsError(true);
            console.log(`Price can't be negative`);
        }
        else {
            setError(false);
            setIsError(false);
        }
    
        return check;
    }
    const submitData = (e) => {
        e.preventDefault();
       
        if (verifyDescriptionAndTitle()) {
            try {
                const formData = new FormData();
                formData.append("id", id);
                formData.append("title", title);
                formData.append("price",price);
                formData.append("description",description);
                updatePostData(formData)
                    .then((response) => {
                        console.log('Axios signup success:', response);
                        back('/seller/dashboard');
                    })
                    .catch((err) => {
                        console.log('Axios signup error:', err);
                        
                    });
            }
            catch (err) {
                console.log('Error : ', err);
            }


        }

    }
    useEffect(() => {


        getdata();



    }, []);

    const showEditProductForm = () => (

        <form className="signu-form"  noValidate>

            <h1 className="text-center">Edit Product Info</h1>
            <img src={`http://localhost:5000/getPostimage/${pic}`} style={{
                "display": "block",
                "marginLeft": "auto", "marginRight": "auto", "width": "500px"
            }} className="mt-3 mb-3" />
            {iserror && <h5 className="text-center">{error}</h5>}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                </div>
                <input
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Product Title"
                    aria-label="Username"
                    value={title}
                    aria-describedby="basic-addon1"
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Description</span>
                </div>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="description" placeholder='Product description'
                    value={description} onChange={(event) => setDescription(event.target.value)}
                ></textarea>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Price</span>
                </div>
                <input
                    name="price"
                    type="number"
                    className="form-control"
                    placeholder="Product price"
                    aria-label="price"
                    aria-describedby="basic-addon1"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    min="0"

                /></div>
            <div className="form-group">
                <div className="col-lg-12 text-center btn-small">
                    <button type="button" className="btn btn-primary btn-block btn-small" onClick={submitData}>
                        Edit info
                    </button>
                </div>
            </div>

            <br/>

        </form>

    )
    return (

        <>
            <div className="container-flex" style={{"backgroundColor":"lightblue"}}>

                <div className="row px-3 vh-100">
                    <div className="col-md-5 mx-auto align-self-center">

                        {showEditProductForm()}

                
                        {/* <p style={{color:'white'}}>{JSON.stringify(formData)}</p>  */}
                    </div>
                </div>

            </div>

        </>
    )
}
export default EditProduct;