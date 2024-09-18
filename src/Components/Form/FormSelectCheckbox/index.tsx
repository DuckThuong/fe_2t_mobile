import React, { ReactNode } from 'react';
import { Select, Checkbox, SelectProps } from 'antd';
import { useIntl } from 'react-intl';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import './index.scss';
import { SvgDropSelect } from '../../@svg/SvgDropSelect';
import { SvgDownSelect } from '../../@svg/SvgDownSelect';

const { Option } = Select;

interface OptionType {
  value: string;
  label: React.ReactNode;
}

interface CustomSelectCheckboxProps {
  options: OptionType[];
  onChange: (values: string[]) => void;
  defaultVisibleFields?: { [key: string]: boolean };
  placeholder?: string;
  footerDropdown?: ReactNode;
  selectProps?: SelectProps;
}

const CustomSelectCheckbox: React.FC<CustomSelectCheckboxProps> = React.memo(
  ({ options, onChange, defaultVisibleFields, placeholder, footerDropdown, selectProps }) => {
    const intl = useIntl();
    const initialCheckedValues = React.useMemo(
      () => Object.keys(defaultVisibleFields ?? {}).filter((key) => defaultVisibleFields![key]),
      [defaultVisibleFields],
    );

    const [checkedValues, setCheckedValues] = React.useState<string[]>(initialCheckedValues);
    const [isDropdownOpenTopRight, setIsDropdownOpenTopRight] = React.useState(false);

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
      const value = e.target.value as string;
      setCheckedValues((prev) => {
        const newCheckedValues = e.target.checked ? [...prev, value] : prev.filter((v) => v !== value);

        onChange(newCheckedValues);
        return newCheckedValues;
      });
    };

    const handleSelectChange = (values: string[]) => {
      setCheckedValues(values);
      onChange(values);
    };

    const handleDropdownVisibleChange = (open: boolean) => {
      setIsDropdownOpenTopRight(open);
    };

    const remainingCount = options.length - checkedValues.length;

    return (
      <Select
        {...selectProps}
        className="select-checkbox"
        onChange={handleSelectChange}
        suffixIcon={isDropdownOpenTopRight ? <SvgDropSelect /> : <SvgDownSelect />}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        placeholder={
          placeholder || (
            <div className="select-checkbox__placeholder">
              <div className="select-checkbox__placeholder-setting">
                {intl.formatMessage({ id: 'inventory.setting' })}:
              </div>
              <div className="select-checkbox__placeholder-hide">
                {intl.formatMessage({ id: 'inventory.hideItem' }, { item: remainingCount })}
              </div>
            </div>
          )
        }
        dropdownRender={(menu) => (
          <div>
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-checkbox__option ${checkedValues.includes(option.value) ? 'select-checkbox__option-checked' : ''}`}
              >
                <Checkbox
                  value={option.value}
                  checked={checkedValues.includes(option.value)}
                  onChange={handleCheckboxChange}
                  className="select-checkbox__checkbox"
                >
                  {option.label}
                </Checkbox>
              </div>
            ))}
            {footerDropdown}
          </div>
        )}
      />
    );
  },
);

export default CustomSelectCheckbox;
