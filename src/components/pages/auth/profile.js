import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Helmet } from "react-helmet";
import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { getAccessToken, removeAccessToken } from "../../../utils/auth";
import api from "../../services/api";
import url from "../../services/url";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Profile() {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Please enter your password.";
            valid = false;
        } else if (formData.currentPassword.length < 6) {
            newErrors.currentPassword = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.currentPassword.length > 50) {
            newErrors.currentPassword = "Password must be less than 50 characters.";
            valid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Please enter a new password.";
            valid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters.";
            valid = false;
        } else if (formData.newPassword.length > 50) {
            newErrors.newPassword = "New password must be less than 50 characters.";
            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
            valid = false;
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userToken = getAccessToken();

            if (userToken) {
                const isConfirmed = await Swal.fire({
                    title: "Are you sure?",
                    text: "you want to change your password?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "I'm sure",
                });
                if (isConfirmed.isConfirmed) {
                    try {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${userToken}`,
                            },
                        };

                        const requestData = {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword,
                            confirmPassword: formData.confirmPassword,
                        };

                        const passwordResponse = await api.post(url.AUTH.CHANGE_PASSWORD, requestData, config);

                        if (passwordResponse.data.success) {
                            removeAccessToken();

                            navigate("/login");
                        }
                    } catch (error) {
                        toast.error("Error! An error occurred. Please try again later!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }
            } else {
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Profile | R Admin</title>
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
                                            (info.birthday && format(new Date(info.birthday), "dd/MM/yyyy")) || "Unavailable"
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
                                            info.phone || "Unavailable"
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
                                <svg viewBox="0 0 24 24" fill="none" width={"100px"} xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z"
                                            stroke="#53cafd"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                        <path
                                            d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
                                            stroke="#53cafd"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                        <path d="M12 12.5V15.5" stroke="#53cafd" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
                                    </g>
                                </svg>
                                <h4 className="my-2">You want to change your password?</h4>
                                <button className="btn my-2 btn-primary btn-lg px-4" data-bs-toggle="modal" data-bs-target="#changePassword">
                                    <i className="fa fa-usd"></i> Change Password
                                </button>
                                <div className="modal fade" id="changePassword">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Change Password</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body text-start">
                                                <form className="comment-form" onSubmit={handleChangePassword}>
                                                    <div className="row">
                                                        <div className="mb-3">
                                                            <label className="font-w600 form-label">
                                                                Current Password <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                                                                name="currentPassword"
                                                                placeholder="********"
                                                                value={formData.currentPassword}
                                                                onChange={handleChange}
                                                            />

                                                            {formErrors.currentPassword && <p className="invalid-feedback">{formErrors.currentPassword}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="font-w600 form-label">
                                                                New Password <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                                                                name="newPassword"
                                                                placeholder="********"
                                                                value={formData.newPassword}
                                                                onChange={handleChange}
                                                            />

                                                            {formErrors.newPassword && <p className="invalid-feedback">{formErrors.newPassword}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="font-w600 form-label">
                                                                Confirm Password <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                                                                placeholder="********"
                                                                id="confirmPassword"
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleChange}
                                                            />

                                                            {formErrors.confirmPassword && <p className="invalid-feedback">{formErrors.confirmPassword}</p>}
                                                        </div>

                                                        <div className="col-lg-12 mt-3">
                                                            <input type="submit" value="Change Password" className="submit btn btn-primary" style={{ width: "100%" }} />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default Profile;
