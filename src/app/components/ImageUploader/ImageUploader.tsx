import React from 'react';
import "./style/ImageUploader.css";
import images_up from "./images_up.svg";

type Props = {
    title?: string
    images?: string[]
    onChange: (files: FileList) => void
    onRemove: (image: string) => void
}

const ImageUploader: React.FC<Props> = (props) => {
    const { title, images, onChange, onRemove } = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }
        onChange(event.target.files);
    }

    return (
        <div>
            <div className="d-flex align-items-center">
                <div><h3>{title || "Ảnh"}</h3></div>
                <div className="mx-auto"></div>
                <div>
                    <div className="file">
                        <input type="file" className="input" id="file-image" onChange={handleChange} accept="image/x-png,image/jpeg" />
                        <label className="label" htmlFor="file-image">
                            Thêm ảnh
                    </label>
                    </div>
                </div>
            </div>
            <div className="upload-img">
                {images && images.length > 0 ? images.map((image, idx) => {
                    return (
                        <div className="img-wrap" key={"img" + idx}>
                            <div className="image">
                                <img src={image} alt="" className="img-fluid" />
                            </div>
                            <div className="cancel-image" onClick={() => onRemove(image)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="20px" viewBox="0 0 512 512">
                                    <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336"></path>
                                    <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"></path>
                                </svg>
                            </div>
                        </div>
                    )
                }) : <div className="text-center w-100">
                        <div className="drag-text_svg">
                            <img src={images_up} alt=""/>
                        </div>
                        <span className="drag-text_span">Thêm mới hình ảnh</span>
                    </div>
                }
            </div>
        </div >
    )
}

export default ImageUploader;