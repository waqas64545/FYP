import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import './DeleteSeller.css';
import isEmpty from 'validator/lib/isEmpty';
import { addPostByAdmin } from '../api/auth';
const PostsByAdmin = () => {
    const [description, setDescription] = useState();
    const [image, setImage] = useState(null);
    const [postFormData, setPostFormData] = useState({

        postErrorMsg: false,

    });
    const { postErrorMsg } = postFormData;
    const checkPostImageData = () => {
        var check = false;
        if (image === null || image === undefined) {

            check = false;
        }
        else {
            var fileextension = image.name.split(".").pop();

            if (image.size > 10485760) {
                setPostFormData({
                    ...postFormData, postErrorMsg: 'Please upload file having size less than 10 MB'
                })
                console.log('Error : ', 'Please upload file having size less than 10 MB', image)

            }
            else if (fileextension !== "png" && fileextension !== "jpg" && fileextension !== "jpeg" && fileextension !== "gif") {

                setPostFormData({
                    ...postFormData, postErrorMsg: 'Please upload image of png/jpg/jpeg/gif format'
                })
                console.log("Error : ", 'Please upload image of png/jpg/jpeg/gif format')

            }
            else {
                check = true;
                setPostFormData({
                    ...postFormData, postErrorMsg: null
                })
            }
        }
        return check;
    }
    const verifyDescription = () => {
        var check = false;
        if (isEmpty(description)) {
            check = false;
            setPostFormData({
                ...postFormData, postErrorMsg: 'Please fill all required details of post'
            })
            console.log("Please fill all required details of post");
        }
        else if (description.length < 10) {
            check = false;
            setPostFormData({
                ...postFormData, postErrorMsg: 'Description length must be greater than 10 and title must be greater than 5'
            })
            console.log("Description length must be greater than 10 and title must be greater than 5");
        }
        else {
            check = true;
            setPostFormData({
                ...postFormData, postErrorMsg: null
            })
        }
        return check;
    }
    const submitData = () => {
        if (checkPostImageData() === true && verifyDescription() === true) {
            const formdata = new FormData();
            formdata.append("imageUrl", image);
            formdata.append("description", description);

            try {
                addPostByAdmin(formdata)
                    .then((response) => {
                        console.log('Axios signup success:', response);
                        window.location.reload();
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
    return (
        <div>
            <div className="app-sidebar">
                <div>
                    <Sidebar />
                </div>

                <div>
                    <div style={{ "marginLeft": "180px" }}>
                        <div style={{ "textAlign": "center" }}>
                            <h1>Add Posts By Admin</h1>
                            <div className='container mt-5 add_Admin_post_form'>
                                <form style={{ "display": "inline-block" }}>
                                    {postErrorMsg && setPostFormData(postErrorMsg)}
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Post description</label>
                                        <input type="text" class="form-control" placeholder="Enter description" onChange={(event) => setDescription(event.target.value)} />

                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Image</label>
                                        <input type="file" class="form-control" id="exampleInputPassword1" accept='.png, .jpg, .jpeg, .gif' onChange={(event) => setImage(event.target.files[0])} />
                                    </div>

                                    <button type="button" class="btn btn-primary" onClick={submitData}>Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsByAdmin