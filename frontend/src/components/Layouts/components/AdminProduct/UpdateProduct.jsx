import { Input, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { updateCake, getCakeById } from "~/api/apiCakes";

const UpdateProductModal = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, fetchProducts } = props;
    const { TextArea } = Input;
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");    // Tên sản phẩm
    const [imageLink, setImageLink] = useState("");
    const [description, setDescription] = useState("");   // Mô tả
    const [productType, setProductType] = useState(null);  // Loại bánh

    // Lấy dữ liệu từ API nếu dataUpdate không có dữ liệu
    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id || "");
            setProductName(dataUpdate.product_name || "");  // Đặt tên sản phẩm từ dataUpdate
            setImageLink(dataUpdate.image_link || "");
            setDescription(dataUpdate.description || "");   // Đặt mô tả từ dataUpdate
            setProductType(dataUpdate.product_type_id || null); // Đặt loại bánh từ dataUpdate
        } else if (dataUpdate && !dataUpdate._id) {
            // Gọi API khi không có dataUpdate hoặc thiếu thông tin
            getCakeById(dataUpdate._id).then(res => {
                if (res && res.data) {
                    const { product_name, image_link, description, product_type_id } = res.data;
                    setId(res.data._id);
                    setProductName(product_name);           // Đặt tên sản phẩm từ API
                    setImageLink(image_link);
                    setDescription(description);            // Đặt mô tả từ API
                    setProductType(product_type_id);       // Đặt loại bánh từ API
                }
            });
        }
    }, [dataUpdate]);  // Dựa trên dataUpdate thay đổi

    const handleSubmitBtn = async () => {
        if (!productName || !imageLink || !description || !productType) {
            notification.error({
                message: "Validation Error",
                description: "Vui lòng điền đầy đủ thông tin",
            });
            return;
        }

        const res = await updateCake(
            id,
            productName,
            imageLink,
            description,
            productType
        );
        if (res.code === 200) {
            notification.success({
                message: "Cập nhật sản phẩm",
                description: "Cập nhật bánh thành công",
            });
            resetAndCloseModal();
            await fetchProducts();
        } else {
            notification.error({
                message: "Lỗi cập nhật sản phẩm",
                description: "Cập nhật thất bại",
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setProductType(null);
        setProductName("");
        setImageLink("");
        setDescription("");
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Cập nhật sản phẩm"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            okButtonProps={{ style: { backgroundColor: "#664545" } }}
            maskClosable={false}
            okText={"Cập nhật"}
            width={1000}
        >
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column",
                }}
            >
                {/* Loại bánh */}
                <div>
                    <span>Loại bánh</span>
                    <Select
                        style={{
                            width: "100%",
                        }}
                        placeholder="Chọn loại bánh"
                        options={[
                            { value: '67de79685a1a07a80a724780', label: 'Bánh sinh nhật' },
                            { value: '67de79685a1a07a80a724781', label: 'Bánh mỳ & Bánh khác' },
                            { value: '67de79685a1a07a80a724783', label: 'Cookies & Mini Cake' },
                            { value: '67de79685a1a07a80a724782', label: 'Bánh truyền thống' },
                        ]}
                        value={productType}
                        onChange={(value) => setProductType(value)}
                    />
                </div>

                {/* Tên sản phẩm */}
                <div>
                    <span>Sản phẩm</span>
                    <Input
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                </div>

                {/* Image Link */}
                <div>
                    <span>Image Link</span>
                    <Input
                        value={imageLink}
                        onChange={(event) => setImageLink(event.target.value)}
                    />
                </div>

                {/* Mô tả */}
                <div>
                    <span>Description</span>
                    <TextArea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={4}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default UpdateProductModal;
