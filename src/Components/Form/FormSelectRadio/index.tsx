import React, { ReactNode, useEffect } from "react";
import { Select, Radio, SelectProps } from "antd";
import type { RadioChangeEvent, RadioProps } from "antd/es/radio";
import "./index.scss";
import { SvgDropSelect } from "../../@svg/SvgDropSelect";
import { SvgDownSelect } from "../../@svg/SvgDownSelect";

const { Option } = Select;

interface OptionType {
  value: string;
  label: React.ReactNode;
  defaultChecked?: boolean;
}

interface CustomSelectRadioProps {
  options: OptionType[];
  onChange: (value: string) => void;
  defaultVisibleField?: { [key: string]: boolean };
  placeholder?: string;
  footerDropdown?: ReactNode;
  radioProps?: RadioProps;
  selectProps?: SelectProps;
}

const CustomSelectRadio: React.FC<CustomSelectRadioProps> = React.memo(
  ({
    options,
    onChange,
    defaultVisibleField,
    placeholder,
    footerDropdown,
    radioProps,
    selectProps,
  }) => {
    console.log("options", options);

    const defaultKey = React.useMemo(() => {
      if (defaultVisibleField && typeof defaultVisibleField === "object") {
        return (
          Object.keys(defaultVisibleField).find(
            (key) => defaultVisibleField[key]
          ) || ""
        );
      }
      return "";
    }, [defaultVisibleField]);

    const [checkedValue, setCheckedValue] = React.useState<string>(defaultKey);
    const [isDropdownOpenTopRight, setIsDropdownOpenTopRight] =
      React.useState(false);
    useEffect(() => {
      if (!checkedValue && options.length > 0) {
        setCheckedValue(options[0].value);
        onChange(options[0].value);
      }
    }, [options, checkedValue, onChange]);
    const handleRadioChange = (e: RadioChangeEvent) => {
      const value = e.target.value as string;
      setCheckedValue(value);
      onChange(value);
    };

    const handleDropdownVisibleChange = (open: boolean) => {
      setIsDropdownOpenTopRight(open);
    };
    return (
      <Select
        {...radioProps}
        {...selectProps}
        className="select-radio"
        onChange={handleRadioChange}
        suffixIcon={
          isDropdownOpenTopRight ? <SvgDropSelect /> : <SvgDownSelect />
        }
        onDropdownVisibleChange={handleDropdownVisibleChange}
        placeholder={
          placeholder || (
            <div className="select-radio__placeholder">
              <div className="select-radio__placeholder-setting">
                Không có dữ liệu để hiển thị:
              </div>
              <div className="select-radio__placeholder-hide">
                Vui lòng chọn một mục
              </div>
            </div>
          )
        }
        dropdownRender={(menu) => (
          <div>
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-radio__option ${
                  checkedValue === option.value
                    ? "select-radio__option-checked"
                    : ""
                }`}
              >
                <Radio
                  value={option.value}
                  checked={checkedValue === option.value}
                  onChange={handleRadioChange}
                  className="select-radio__radio"
                >
                  {option.label}
                </Radio>
              </div>
            ))}
            {footerDropdown}
          </div>
        )}
      />
    );
  }
);

export default CustomSelectRadio;
