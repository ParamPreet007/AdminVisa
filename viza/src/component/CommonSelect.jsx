import { Badge, Select } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
const LableSelect = ({
  label,
  className,
  onChange,
  value,
  name,
  options,
  onScroll,
  onSearch,
  showSearch,
  multiple,
  disabled,
  onSelect,
  errors,
  requiredField,
  showLock,
  locked,
  onLockClick,
  defaultValue,
  autoFocus,
  allowClear,
  onClick,
  onFocus,
  listHeight,
  placeHolder
  // onDropdownVisibleChange

}) => (
  <div className={className}>
    <div className="text-xs text-[#697174]">
      {label}
      {requiredField && <span className="text-red-600">*</span>}
    </div>
    <Select

      // onDropdownVisibleChange={onDropdownVisibleChange}
      // dropdownStyle={{ backgroundColor: var(--primary), border: '1px solid #d9d9d9' }}
      onClick={onClick}
      listHeight={listHeight}

      onFocus={onFocus}
      allowClear={allowClear}
      autoFocus={autoFocus}
      status={errors && "error"}
      onSelect={onSelect}
      disabled={disabled || locked}
      mode={multiple && "multiple"}
      onSearch={onSearch}
      showSearch={showSearch}
      className="w-full"
      onChange={onChange}
      placeholder={placeHolder}
      value={value}
      name={name}
      options={options}
      filterOption={() => true}
      onPopupScroll={onScroll}
      maxTagCount={1}
      defaultValue={defaultValue}
      maxTagPlaceholder={(omittedValues) => (
        <Badge>{`+${omittedValues.length}More`}</Badge>
      )}
      suffixIcon={
        showLock &&
        (locked ? (
          <LockOutlined
            className="text-lg text-gray-400"
            onClick={onLockClick}
          />
        ) : (
          <UnlockOutlined
            className="text-lg text-gray-400"
            onClick={onLockClick}
          />
        ))
      }
    />
  </div>
);

export default LableSelect;
