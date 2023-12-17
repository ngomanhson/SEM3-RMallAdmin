import { Link } from "react-router-dom";
import Layout from "../../layouts";

function BoothEdit() {
    return (
        <Layout>
            <div className="row page-titles">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#!">Booth Edit</a>
                    </li>
                </ol>
            </div>
            <div className="row">
                <div className="col-xl-12 col-xxl-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Booth Edit</h4>
                        </div>
                        <div className="card-body">
                            <form action="#!">
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Booth Name <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" name="booth-name" className="form-control" placeholder="Four Idiots" autoFocus required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Thumbnail <span className="text-danger">*</span>
                                            </label>
                                            <input type="file" name="thumbnail" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea className="form-control"></textarea>
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
    );
}

export default BoothEdit;
