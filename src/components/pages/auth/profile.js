import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Helmet } from "react-helmet";
import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/auth";
import api from "../../services/api";
import url from "../../services/url";
import Swal from "sweetalert2";
import { format } from "date-fns";
function Profile() {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState("");

    const [isEditButtonVisible, setEditButtonVisible] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const loadProfile = async () => {
        const userToken = getAccessToken();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const profileResponse = await api.get(url.AUTH.PROFILE, config);
            setInfo(profileResponse.data);
        } catch (error) {}
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const allowedExtensions = ["png", "jpg", "jpeg", "heic"];

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                // You can also reset the input field if needed
                e.target.value = "";
                return;
            }

            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setEditButtonVisible(false);

        if (!isEditing) {
            setEditedInfo({ ...info });
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditButtonVisible(true);

        setEditedInfo({});
    };

    const handleSaveClick = async () => {
        setEditButtonVisible(true);
        try {
            const userToken = getAccessToken();

            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const formData = new FormData();

            // If avatarFile is present, append it to the FormData
            //  if (avatarFile) {
            //     formData.append("avatar", avatarFile);
            // }

            for (const key in editedInfo) {
                formData.append(key, editedInfo[key]);
            }

            // Send the request
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "You want to update your information?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
            });

            if (isConfirmed.isConfirmed) {
                const updateResponse = await api.put(url.AUTH.UPDATE_PROFILE, formData, config);

                if (updateResponse.status === 204) {
                    console.log("Successfully updated");
                } else {
                }
            }

            // Update the local state with edited information
            setInfo(editedInfo);
            setIsEditing(false);
        } catch (error) {}
    };

    return (
        <>
            <Helmet>
                <title>Profile | R Mall Admin</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Profile" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="profile card card-body px-3 pt-3 pb-0">
                            <div className="profile-head">
                                <div className="photo-content">
                                    <div className="cover-photo rounded"></div>
                                </div>
                                <div className="profile-info">
                                    <div className="profile-photo">
                                        {/* <img src="assets/images/profile/profile.png" className="img-fluid rounded-circle" alt="" /> */}
                                        <label htmlFor="avatarInput">
                                            {isEditing ? (
                                                avatarPreview ? (
                                                    <div className="avatar-inner">
                                                        <img src={avatarPreview} alt="Avatar Preview" className="profile-avatar rounded-circle border-avatar" />
                                                        <img src="./assets/images/avatar/default-placeholder.png" alt="" className="avatar-default rounded-circle" />
                                                    </div>
                                                ) : (
                                                    <div className="avatar-inner">
                                                        <img src="./assets/images/avatar/4.jpeg" alt={info.fullname} className="profile-avatar rounded-circle border-avatar" />
                                                        <img src="./assets/images/avatar/default-placeholder.png" alt="" className="avatar-default rounded-circle" />
                                                    </div>
                                                )
                                            ) : (
                                                <img src="./assets/images/avatar/4.jpeg" alt={info.fullname} className="profile-avatar rounded-circle border-avatar" />
                                            )}
                                        </label>
                                        {isEditing && <input id="avatarInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />}
                                    </div>
                                    <div className="profile-details">
                                        <div className="profile-name px-3 pt-2">
                                            <h4 className="text-white mb-0">{info.fullname}</h4>
                                            <p>{info.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card h-auto">
                            <div className="d-flex p-4 pb-0">
                                <h2>Personal info</h2>
                                <div className="dropdown ms-auto">
                                    <button className="btn btn-primary light sharp" onClick={handleEditClick} style={{ display: isEditButtonVisible ? "block" : "none" }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.7471 20.4428H20.9997" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                                stroke="#fff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path d="M11.0205 6.00098L16.4728 10.1881" stroke="#1A162E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <p className="col-sm-3 mt-1">Full Name</p>
                                    <p className="col-sm-5 mt-1 text-white">{info.fullname}</p>
                                </div>
                                <div className="row">
                                    <p className="col-sm-3 mt-1">Email</p>
                                    <p className="col-sm-5 mt-1 text-white">{info.email}</p>
                                </div>
                                <div className="row">
                                    <p className="col-sm-3 mt-1">Birthday</p>
                                    <p className="col-sm-5 mt-1 text-white">
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                className="form-control input-default custom-input-height"
                                                value={format(new Date(editedInfo.birthday), "yyyy-MM-dd") || ""}
                                                onChange={(e) => setEditedInfo({ ...editedInfo, birthday: e.target.value })}
                                            />
                                        ) : (
                                            info.birthday && format(new Date(info.birthday), "dd/MM/yyyy")
                                        )}
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="col-sm-3 mt-1">Phone</p>
                                    <p className="col-sm-5 mt-1 text-white">
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                className="form-control input-default custom-input-height"
                                                value={editedInfo.phone || ""}
                                                onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                                            />
                                        ) : (
                                            info.phone
                                        )}
                                    </p>
                                </div>
                                {isEditing && (
                                    <div className="d-flex justify-content-end">
                                        <button className="btn light btn-danger" onClick={handleCancelClick}>
                                            Cancel
                                        </button>
                                        <button className="btn light btn-success" style={{ marginLeft: "15px" }} onClick={handleSaveClick}>
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="card h-auto">
                            <div className="card-body text-center ai-icon text-primary p-5">
                                <svg
                                    id="rocket-icon"
                                    className="my-2"
                                    viewBox="0 0 24 24"
                                    width="80"
                                    height="80"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                <h4 className="my-2">You don’t have badges yet</h4>
                                <button className="btn my-2 btn-primary btn-lg px-4">
                                    <i className="fa fa-usd"></i> Earn Budges
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default Profile;
