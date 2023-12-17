import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Helmet } from "react-helmet";
function CustomerEdit() {
    return (
        <>
            <Helmet>
                <title>Customer Edit | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Customer Edit" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Customer Edit</h4>
                            </div>
                            <div className="card-body">
                                <form action="#!">
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Full Name <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" name="fullname" className="form-control" placeholder="Parsley" autoFocus required />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Birthday <span className="text-danger">*</span>
                                                </label>
                                                <input type="date" name="email" className="form-control" placeholder="example@gmail.com" required />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Email Address <span className="text-danger">*</span>
                                                </label>
                                                <input type="email" className="form-control" id="inputGroupPrepend2" aria-describedby="inputGroupPrepend2" placeholder="example@example.com" required />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Phone Number <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" name="phoneNumber" className="form-control" placeholder="(+1)408-657-9007" required />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Gender <span className="text-danger">*</span>
                                                </label>
                                                <select className="form-control">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Avatar <span className="text-danger">*</span>
                                                </label>
                                                <input type="file" name="avatar" className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-default">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default CustomerEdit;
