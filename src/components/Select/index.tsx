import React, { useRef, useEffect } from "react";
import ReactSelect, {
  ControlProps,
  GroupTypeBase,
  InputProps,
  OptionProps,
  OptionTypeBase,
  Props as SelectProps,
  SingleValueProps,
  StylesConfig,
} from "react-select";
import { useField } from "@unform/core";
import { lighten } from "polished";
import { CSSObject } from "styled-components";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const customStyles: StylesConfig<
    OptionTypeBase,
    boolean,
    GroupTypeBase<OptionTypeBase>
  > = {
    container: (base: CSSObject) => ({
      ...base,
      height: "2.75rem",
      background: "#F7F9FB",
      borderRadius: "0.5rem",
      width: "100%",
      border: "0.1rem solid var(--color-second-text)",
      color: "var(--color-text)",
      display: "flex",
      alignItems: "center",
    }),

    placeholder: (base: CSSObject) => ({
      ...base,
      color: "var(--color-placeholder)",
    }),
    option: (
      base: CSSObject,
      props: OptionProps<
        OptionTypeBase,
        boolean,
        GroupTypeBase<OptionTypeBase>
      >,
    ) => ({
      ...base,
      color: "#4D4D4D",
      background: props.isSelected ? "#E3F2FD" : lighten(0.75, "#E3F2FD"),
      padding: "1rem",
    }),
    menu: (base: CSSObject) => ({
      ...base,
      width: "95%",
    }),
    dropdownIndicator: () => ({
      color: "#0F4780",
    }),
    control: (
      base: CSSObject,
      props: ControlProps<
        OptionTypeBase,
        boolean,
        GroupTypeBase<OptionTypeBase>
      >,
    ) => ({
      ...base,

      background: "transparent",
      display: "flex",
      padding: "1rem 1rem 1rem 0.5rem",
      flex: 1,
      border: 0,
      boxShadow: "none",
      flexDirection: "row",
      margin: 0,
    }),
    singleValue: (
      base: CSSObject,
      props: SingleValueProps<OptionTypeBase, GroupTypeBase<OptionTypeBase>>,
    ) => {
      const opacity = props.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...base, opacity, transition };
    },
  };

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      styles={customStyles}
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
};
export default Select;
