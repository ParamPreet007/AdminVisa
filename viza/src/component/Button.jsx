import { LoadingOutlined } from "@ant-design/icons";
import { Progress, Spin } from "antd";

const Btn = ({
  label,
  onClick,
  icon,
  type = "default",
  className,
  loading,
  disabled,
  Ico,
  fontNormal,
  listing,
  textColor,
  disableHover,
  auth,
  progessStart,
  heavyData,
  percentage = 0,
}) => {
  return (
    <button
      className={`text-xs border  py-1 px-2 flex gap-2 items-center justify-around rounded-md  ${{
        default: "",
        primary: listing
          ? `border-[var(--primary)]  ${!fontNormal && "font-semibold"} text-[var(--primary)]  transition-all`
          : `bg-[var(--primary)] hover:border-[var(--sub-primary)] ${!fontNormal && "font-semibold"} text-white ${!disableHover && "hover:bg-[#3B3564]"} transition-all`,
        subPrimary: "bg-[var(--sub-primary)] border-[var(--sub-primary)]",
      }[type]
        } ${className} ${loading || disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={loading || disabled}
      style={{ color: textColor }}
    >
      {icon && <img src={icon} alt={icon} />}
      {loading ? <Spin size="small" className={!auth && "white-spin"} /> : <div>{label}</div>}
      {
        progessStart ? <Spin percent={percentage} size="small" /> : (<>{heavyData}</>)
      }
      {Ico && <Ico />}

    </button>
  );
};

export default Btn;