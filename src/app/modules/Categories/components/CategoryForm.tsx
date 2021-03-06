import React from 'react';

const CategoryForm: React.FC<any> = (props) => {

    const { category, setCategory } = props;

    return (
        <div className="form-data">
            <div className="row">
                <div className="col-6 mb-3">
                    <label className="input-required">Tên loại</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={(category && category.name) || ""}
                        onChange={(e) =>
                            setCategory({
                                ...category,
                                name: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="col-6 mb-3">
                    <label>Mã</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={(category && category.code) || ""}
                        onChange={(e) =>
                            setCategory({
                                ...category,
                                code: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="col-12 mb-3">
                    <label>Ghi chú</label>
                    <textarea
                        className="form-control"
                        value={(category && category.description) || ""}
                        rows={3}
                        onChange={(e) =>
                            setCategory({
                                ...category,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;