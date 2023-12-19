import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Helmet } from "react-helmet";
function Profile() {
    return (
        <>
            <Helmet>
                <title>Profile | R Mall</title>
            </Helmet>
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
                                        <img src="assets/images/profile/profile.png" className="img-fluid rounded-circle" alt="" />
                                    </div>
                                    <div className="profile-details">
                                        <div className="profile-name px-3 pt-2">
                                            <h4 className="text-white mb-0">Mitchell C. Shay</h4>
                                            <p>UX / UI Designer</p>
                                        </div>
                                        <div className="profile-email px-2 pt-2">
                                            <h4 className="mb-0">info@example.com</h4>
                                            <p>Email</p>
                                        </div>
                                        <div className="dropdown ms-auto">
                                            <a href="#!" className="btn btn-primary light sharp" data-bs-toggle="dropdown" aria-expanded="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24"></rect>
                                                        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                                                        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                                                        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                                                    </g>
                                                </svg>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li className="dropdown-item">
                                                    <i className="fa fa-user-circle text-primary me-2"></i> View profile
                                                </li>
                                                <li className="dropdown-item">
                                                    <i className="fa fa-users text-primary me-2"></i> Add to btn-close friends
                                                </li>
                                                <li className="dropdown-item">
                                                    <i className="fa fa-plus text-primary me-2"></i> Add to group
                                                </li>
                                                <li className="dropdown-item">
                                                    <i className="fa fa-ban text-primary me-2"></i> Block
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-statistics">
                                            <div className="text-center">
                                                <div className="row">
                                                    <div className="col border-end">
                                                        <h3 className="m-b-0">150</h3>
                                                        <span>Follower</span>
                                                    </div>
                                                    <div className="col border-end">
                                                        <h3 className="m-b-0">140</h3>
                                                        <span>Place Stay</span>
                                                    </div>
                                                    <div className="col ">
                                                        <h3 className="m-b-0">45</h3>
                                                        <span>Reviews</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <a href="javascript:void(0);" className="btn btn-primary mb-1 me-1 btn-sm">
                                                        Follow
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-primary mb-1 btn-sm" data-bs-toggle="modal" data-bs-target="#sendMessageModal">
                                                        Send Message
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="modal fade" id="sendMessageModal">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Send Message</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form className="comment-form">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <div className="mb-3">
                                                                            <label className="text-white font-w600 form-label">
                                                                                Name <span className="required">*</span>
                                                                            </label>
                                                                            <input type="text" className="form-control" value="Author" name="Author" placeholder="Author" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="mb-3">
                                                                            <label className="text-white font-w600 form-label">
                                                                                Email <span className="required">*</span>
                                                                            </label>
                                                                            <input type="text" className="form-control" value="Email" placeholder="Email" name="Email" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="mb-3">
                                                                            <label className="text-white font-w600 form-label">Comment</label>
                                                                            <textarea rows="8" className="form-control" name="comment">
                                                                                Comment
                                                                            </textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="mb-3 mb-0">
                                                                            <input type="submit" value="Post Comment" className="submit btn btn-primary btn-sm" name="submit" />
                                                                        </div>
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
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-blog">
                                            <h4 className="text-white d-inline">Today Highlights</h4>
                                            <img src="assets/images/profile/1.jpg" alt="" className="img-fluid mt-4 mb-4 w-100 rounded" />
                                            <h4>
                                                <a href="post-details.html" className="text-white">
                                                    Darwin Creative Agency Theme
                                                </a>
                                            </h4>
                                            <p className="mb-0">
                                                A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of
                                                sentences fly into your mouth.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-interest">
                                            <h4 className="text-white d-inline">Interest</h4>
                                            <div className="row mt-4 sp4">
                                                <a
                                                    href="images/profile/2.jpg"
                                                    data-exthumbimage="images/profile/2.jpg"
                                                    data-src="images/profile/2.jpg"
                                                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                                                >
                                                    <img src="assets/images/profile/2.jpg" alt="" className="img-fluid" />
                                                </a>
                                                <a
                                                    href="images/profile/3.jpg"
                                                    data-exthumbimage="images/profile/3.jpg"
                                                    data-src="images/profile/3.jpg"
                                                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                                                >
                                                    <img src="assets/images/profile/3.jpg" alt="" className="img-fluid" />
                                                </a>
                                                <a
                                                    href="images/profile/4.jpg"
                                                    data-exthumbimage="images/profile/4.jpg"
                                                    data-src="images/profile/4.jpg"
                                                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                                                >
                                                    <img src="assets/images/profile/4.jpg" alt="" className="img-fluid" />
                                                </a>
                                                <a
                                                    href="images/profile/3.jpg"
                                                    data-exthumbimage="images/profile/3.jpg"
                                                    data-src="images/profile/3.jpg"
                                                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                                                >
                                                    <img src="assets/images/profile/3.jpg" alt="" className="img-fluid" />
                                                </a>
                                                <a
                                                    href="images/profile/4.jpg"
                                                    data-exthumbimage="images/profile/4.jpg"
                                                    data-src="images/profile/4.jpg"
                                                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                                                >
                                                    <img src="assets/images/profile/4.jpg" alt="" className="img-fluid" />
                                                </a>
                                                <a
                                                    href="images/profile/2.jpg"
                                                    data-exthumbimage="images/profile/2.jpg"
                                                    data-src="images/profile/2.jpg"
                                                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                                                >
                                                    <img src="assets/images/profile/2.jpg" alt="" className="img-fluid" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-news">
                                            <h4 className="text-white d-inline">Our Latest News</h4>
                                            <div className="media pt-3 pb-3">
                                                <img src="assets/images/profile/5.jpg" alt="" className="me-3 rounded" width="75" />
                                                <div className="media-body">
                                                    <h5 className="m-b-5">
                                                        <a href="post-details.html" className="text-white">
                                                            Collection of textile samples
                                                        </a>
                                                    </h5>
                                                    <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                                </div>
                                            </div>
                                            <div className="media pt-3 pb-3">
                                                <img src="assets/images/profile/6.jpg" alt="" className="me-3 rounded" width="75" />
                                                <div className="media-body">
                                                    <h5 className="m-b-5">
                                                        <a href="post-details.html" className="text-white">
                                                            Collection of textile samples
                                                        </a>
                                                    </h5>
                                                    <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                                </div>
                                            </div>
                                            <div className="media pt-3 pb-3">
                                                <img src="assets/images/profile/7.jpg" alt="" className="me-3 rounded" width="75" />
                                                <div className="media-body">
                                                    <h5 className="m-b-5">
                                                        <a href="post-details.html" className="text-white">
                                                            Collection of textile samples
                                                        </a>
                                                    </h5>
                                                    <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card h-auto">
                            <div className="card-body">
                                <div className="profile-tab">
                                    <div className="custom-tab-1">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a href="#my-posts" data-bs-toggle="tab" className="nav-link active show">
                                                    Posts
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#about-me" data-bs-toggle="tab" className="nav-link">
                                                    About Me
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#profile-settings" data-bs-toggle="tab" className="nav-link">
                                                    Setting
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="my-posts" className="tab-pane fade active show">
                                                <div className="my-post-content pt-3">
                                                    <div className="post-input">
                                                        <textarea name="textarea" id="textarea" cols="30" rows="5" className="form-control bg-transparent">
                                                            Please type what you want....
                                                        </textarea>
                                                        <a href="javascript:void(0);" className="btn btn-primary light me-1 px-3 btn-sm" data-bs-toggle="modal" data-bs-target="#linkModal">
                                                            <i className="fa fa-link m-0"></i>
                                                        </a>

                                                        <div className="modal fade" id="linkModal">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title">Social Links</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <a className="btn-social facebook" href="javascript:void(0)">
                                                                            <i className="fab fa-facebook-f"></i>
                                                                        </a>
                                                                        <a className="btn-social google-plus" href="javascript:void(0)">
                                                                            <i className="fab fa-google-plus-g"></i>
                                                                        </a>
                                                                        <a className="btn-social linkedin" href="javascript:void(0)">
                                                                            <i className="fab fa-linkedin-in"></i>
                                                                        </a>
                                                                        <a className="btn-social instagram" href="javascript:void(0)">
                                                                            <i className="fab fa-instagram"></i>
                                                                        </a>
                                                                        <a className="btn-social twitter" href="javascript:void(0)">
                                                                            <i className="fab fa-twitter"></i>
                                                                        </a>
                                                                        <a className="btn-social youtube" href="javascript:void(0)">
                                                                            <i className="fab fa-youtube"></i>
                                                                        </a>
                                                                        <a className="btn-social whatsapp" href="javascript:void(0)">
                                                                            <i className="fab fa-whatsapp"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href="javascript:void(0);" className="btn btn-primary light me-1 px-3 btn-sm" data-bs-toggle="modal" data-bs-target="#cameraModal">
                                                            <i className="fa fa-camera m-0"></i>
                                                        </a>

                                                        <div className="modal fade" id="cameraModal">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title">Upload images</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="input-group mb-3">
                                                                            <span className="input-group-text">Upload</span>
                                                                            <div className="form-file">
                                                                                <input type="file" className="form-file-input form-control" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href="javascript:void(0);" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#postModal">
                                                            Post
                                                        </a>

                                                        <div className="modal fade" id="postModal">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title">Post</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <textarea name="textarea" id="textarea2" cols="30" rows="5" className="form-control bg-transparent">
                                                                            Please type what you want....
                                                                        </textarea>
                                                                        <a className="btn btn-primary btn-sm" href="javascript:void(0)">
                                                                            Post
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="profile-uoloaded-post border-bottom-1 pb-5">
                                                        <img src="assets/images/profile/8.jpg" alt="" className="img-fluid w-100 rounded" />
                                                        <a className="post-title" href="post-details.html">
                                                            <h3 className="text-white">Collection of textile samples lay spread</h3>
                                                        </a>
                                                        <p>
                                                            A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity
                                                            has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.
                                                        </p>
                                                        <button className="btn btn-primary me-2 btn-sm" id="btn-like">
                                                            <span className="me-2 ">
                                                                <i className="fa fa-heart"></i>
                                                            </span>
                                                            Like
                                                        </button>
                                                        <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#replyModal">
                                                            <span className="me-2 text-white">
                                                                <i className="fa fa-reply"></i>
                                                            </span>
                                                            Reply
                                                        </button>
                                                    </div>
                                                    <div className="profile-uoloaded-post border-bottom-1 pb-5">
                                                        <img src="assets/images/profile/9.jpg" alt="" className="img-fluid w-100 rounded" />
                                                        <a className="post-title" href="post-details.html">
                                                            <h3 className="text-white">Collection of textile samples lay spread</h3>
                                                        </a>
                                                        <p>
                                                            A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity
                                                            has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.
                                                        </p>
                                                        <button className="btn btn-primary me-2 btn-sm" id="btn-like">
                                                            <span className="me-2">
                                                                <i className="fa fa-heart "></i>
                                                            </span>
                                                            Like
                                                        </button>
                                                        <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#replyModal">
                                                            <span className="me-2 text-white">
                                                                <i className="fa fa-reply"></i>
                                                            </span>
                                                            Reply
                                                        </button>
                                                    </div>
                                                    <div className="profile-uoloaded-post pb-3">
                                                        <img src="assets/images/profile/8.jpg" alt="" className="img-fluid w-100 rounded" />
                                                        <a className="post-title" href="post-details.html">
                                                            <h3 className="text-white">Collection of textile samples lay spread</h3>
                                                        </a>
                                                        <p>
                                                            A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity
                                                            has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.
                                                        </p>
                                                        <button className="btn btn-primary me-2 btn-sm" id="btn-like">
                                                            <span className="me-2 ">
                                                                <i className="fa fa-heart "></i>
                                                            </span>
                                                            Like
                                                        </button>
                                                        <button className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#replyModal">
                                                            <span className="me-2 text-white">
                                                                <i className="fa fa-reply"></i>
                                                            </span>
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="about-me" className="tab-pane fade">
                                                <div className="profile-about-me">
                                                    <div className="pt-4 border-bottom-1 pb-3">
                                                        <h4 className="text-primary">About Me</h4>
                                                        <p className="mb-2">
                                                            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am
                                                            alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the
                                                            exquisite sense of mere tranquil existence, that I neglect my talents.
                                                        </p>
                                                        <p>
                                                            A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he
                                                            had recently cut out of an illustrated magazine and housed in a nice, gilded frame.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="profile-skills mb-5">
                                                    <h4 className="text-primary mb-2">Skills</h4>
                                                    <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">
                                                        Admin
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">
                                                        Dashboard
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">
                                                        Photoshop
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">
                                                        Bootstrap
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">
                                                        Responsive
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">
                                                        Crypto
                                                    </a>
                                                </div>
                                                <div className="profile-lang  mb-5">
                                                    <h4 className="text-primary mb-2">Language</h4>
                                                    <a href="javascript:void(0);" className="text-muted pe-3 f-s-16">
                                                        <i className="flag-icon flag-icon-us"></i> English
                                                    </a>
                                                    <a href="javascript:void(0);" className="text-muted pe-3 f-s-16">
                                                        <i className="flag-icon flag-icon-fr"></i> French
                                                    </a>
                                                    <a href="javascript:void(0);" className="text-muted pe-3 f-s-16">
                                                        <i className="flag-icon flag-icon-bd"></i> Bangla
                                                    </a>
                                                </div>
                                                <div className="profile-personal-info">
                                                    <h4 className="text-primary mb-4">Personal Information</h4>
                                                    <div className="row mb-2">
                                                        <div className="col-sm-3 col-5">
                                                            <h5 className="f-w-500">
                                                                Name <span className="pull-end">:</span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-sm-9 col-7">
                                                            <span>Mitchell C.Shay</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-sm-3 col-5">
                                                            <h5 className="f-w-500">
                                                                Email <span className="pull-end">:</span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-sm-9 col-7">
                                                            <span>example@examplel.com</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-sm-3 col-5">
                                                            <h5 className="f-w-500">
                                                                Availability <span className="pull-end">:</span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-sm-9 col-7">
                                                            <span>Full Time (Free Lancer)</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-sm-3 col-5">
                                                            <h5 className="f-w-500">
                                                                Age <span className="pull-end">:</span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-sm-9 col-7">
                                                            <span>27</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-sm-3 col-5">
                                                            <h5 className="f-w-500">
                                                                Location <span className="pull-end">:</span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-sm-9 col-7">
                                                            <span>Rosemont Avenue Melbourne, Florida</span>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-sm-3 col-5">
                                                            <h5 className="f-w-500">
                                                                Year Experience <span className="pull-end">:</span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-sm-9 col-7">
                                                            <span>07 Year Experiences</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="profile-settings" className="tab-pane fade">
                                                <div className="pt-3">
                                                    <div className="settings-form">
                                                        <h4 className="text-primary">Account Setting</h4>
                                                        <form>
                                                            <div className="row">
                                                                <div className="mb-3 col-md-6">
                                                                    <label className="form-label">Email</label>
                                                                    <input type="email" placeholder="Email" className="form-control" />
                                                                </div>
                                                                <div className="mb-3 col-md-6">
                                                                    <label className="form-label">Password</label>
                                                                    <input type="password" placeholder="Password" className="form-control" />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Address</label>
                                                                <input type="text" placeholder="1234 Main St" className="form-control" />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="form-label">Address 2</label>
                                                                <input type="text" placeholder="Apartment, studio, or floor" className="form-control" />
                                                            </div>
                                                            <div className="row">
                                                                <div className="mb-3 col-md-6">
                                                                    <label className="form-label">City</label>
                                                                    <input type="text" className="form-control" />
                                                                </div>
                                                                <div className="mb-3 col-md-4">
                                                                    <label className="form-label">State</label>
                                                                    <select className="form-control default-select wide" id="inputState">
                                                                        <option>Choose...</option>
                                                                        <option>Option 1</option>
                                                                        <option>Option 2</option>
                                                                        <option>Option 3</option>
                                                                    </select>
                                                                </div>
                                                                <div className="mb-3 col-md-2">
                                                                    <label className="form-label">Zip</label>
                                                                    <input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <div className="form-check custom-checkbox">
                                                                    <input type="checkbox" className="form-check-input" id="gridCheck" />
                                                                    <label className="form-check-label form-label" htmlFor="gridCheck">
                                                                        Check me out
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary btn-sm" type="submit">
                                                                Sign in
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal fade" id="replyModal">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Post Reply</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form>
                                                        <textarea className="form-control" rows="4">
                                                            Message
                                                        </textarea>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal">
                                                        Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm">
                                                        Reply
                                                    </button>
                                                </div>
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
