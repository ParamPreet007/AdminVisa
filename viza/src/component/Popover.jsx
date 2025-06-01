import { Modal, Spin } from "antd";
import { useSelector } from "react-redux";

const Popup = () => {
  const popupProps = useSelector((state) => state.popupProps);
  // console.log(popupProps, 'popup props here')
  const { open, msg, onOk, onCancel, okText, cancelText, icon, loading, logoutBtn } =
    popupProps;

  return (
    <Modal className="mt-16" footer={null} closable={false} open={open} width={380} >
      <div className="flex flex-col items-center gap-4">
        <img src={icon} alt={icon} />
        <div className="text-[#605F5F] text-base w-4/5 text-center text-sm">{msg}</div>
        <div className="flex gap-2">
          <button
            className={`text-[#605F5F] border text-sm py-1 w-24 rounded ${loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`bg-[var(--primary)] text-white text-sm py-1 w-24 rounded flex items-center gap-2 justify-center ${loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            onClick={onOk}
            disabled={loading}
          >
            {loading && <Spin size="small" className="white-spin" />}
            {okText}
          </button>
        </div>
      </div>
    </Modal>

  );
};

export default Popup;
