import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";

function FoodCounterEdit() {
    return (
        <>
            <Helmet>
                <title>Food Counter Edit | R Mall</title>
            </Helmet>
            <Layout>
                <Breadcrumb title="Food Counter Edit" />
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Food Counter Edit</h4>
                            </div>
                            <div className="card-body">
                                <form action="#!">
                                    <div className="row">
                                        <div className="col-lg-6 mb-2">
                                            <div className="mb-3">
                                                <label className="text-label form-label">
                                                    Food Counter Name <span className="text-danger">*</span>
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
                                                <textarea className="form-control" placeholder="Description of the booth"></textarea>
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

export default FoodCounterEdit;
