"use client";
import React, { LiHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Pills, { Pill } from "../pills/Pills";
import { removeDuplicate } from "@/lib";
import { IoCloseOutline } from "react-icons/io5";

const DropDownContainer = styled.div<DropDownStyledProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  display: inline-block;
  padding: 12px;
`;
const DropDownWrapper = styled.div`
  border: 1.2px solid #000;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const InputWrapper = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.input`
  flex: 9;
  height: 100%;
  outline: none;
  border: none;
`;
const ArrowContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const OptionsContainer = styled.ul`
  list-style: none;
  max-height: 300px;
  overflow: auto;
  position: absolute;
  width: 100%;
  left: 0;
  top: 120%;
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 4px 0;
`;
const ListItem = styled.li.attrs((props : any)=>({value : props.customvalue}))<{ hoverColor?: string; optionHoverColor?: boolean,value : string }>`
  padding: 4px 8px;
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.hoverColor && props.optionHoverColor
        ? props.hoverColor
        : "var(--primary-light-blue)"};
  }
`;

const Dropdown = ({
  height,
  width,
  defaultOption,
  placeHolder = "Select...",
  onChange,
  options,
  isMultipleSelect = false,
  isTypeSearch = false,
  optionHoverColor = false,
  ...rest
}: DropDownProps) => {
  const [isActive, setIsActive] = useState<boolean>(false); //to show the options or not
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filter, setFilter] = useState<boolean>(false); //flag to check if typing in input on isTypeSearch
  const [mulitValues, setMultiValues] = useState<Options[]>([]);

  const containerheight = typeof height === "number" ? height + "px" : height;
  const containerwidth = typeof width === "number" ? width + "px" : width;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTypeSearch) return;
    setFilter(true);
    const { value } = e.target;
    onChange(value);
  };
 console.log(defaultOption,mulitValues)
  const handleItemClick = (e: React.MouseEvent<HTMLLinkElement>) => {
    // @ts-ignore
    const value = e.target.getAttribute("value");
    // @ts-ignore
    const label = e.target.innerHTML;

    if (!isMultipleSelect) {
      setIsActive(false);
      onChange({ value: value, label: label });
    } else {
      setFilter(false);
      onChange([...mulitValues, { value: value, label: label }]);
    }
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    } else {
      setFilter(false);
      typeof defaultOption !== "object" && onChange("");
    }
  }, [isActive, inputRef, defaultOption, onChange]);

  const valueChange = () => {
    let optionsFiltered: Options[] = [...options];

      optionsFiltered = removeDuplicate(
        optionsFiltered,
        Array.isArray(defaultOption) && defaultOption.length > 0 ? defaultOption : mulitValues,
        "value"
      );
    if (isTypeSearch && filter && typeof defaultOption !== "object") {
      optionsFiltered = optionsFiltered.filter((option) =>
        option.label.toLowerCase().includes(defaultOption.toLowerCase())
      );
    }

    return optionsFiltered;
  };
  useEffect(() => {
    const handleClick = () => setIsActive(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    if (!filter && isMultipleSelect && Array.isArray(defaultOption) && defaultOption.length > 0) {
      setMultiValues([...defaultOption]);
    }
  }, [filter, defaultOption, isMultipleSelect]);

  const handleRemoveSelectedMulti = (item: Options) => {
    console.log(item);
    let old = [...defaultOption];
    old = old.filter((i) => i.value !== item.value);
    onChange([...old]);
  };
  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const crossStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  return (
    <DropDownContainer
      height={containerheight}
      width={containerwidth}
      onClick={(e) => e.stopPropagation()}
    >
      <DropDownWrapper>
        {isMultipleSelect &&
          (Array.isArray(defaultOption) ? defaultOption : mulitValues).length >
            0 && (
            <Pills
              pillheight={"auto"}
              pillwidth={"auto"}
              pillpadding={"4px 10px"}
              rounded={"8px"}
              backGroundColor={"#F7F5EB"}
              pills={Array.isArray(defaultOption) ? defaultOption : mulitValues}
            >
              {(Array.isArray(defaultOption) ? defaultOption : mulitValues).map(
                (item: Options) => {
                  return (
                    <Pill key={item.value}>
                      <div style={pillStyle}>
                        <span style={crossStyle}>
                          <IoCloseOutline
                            onClick={() => handleRemoveSelectedMulti(item)}
                          />
                        </span>{" "}
                        <span>{item.label}</span>
                      </div>
                    </Pill>
                  );
                }
              )}
            </Pills>
          )}
        <InputWrapper>
          <Input
            ref={inputRef}
            value={
              typeof defaultOption !== "object"
                ? defaultOption
                : defaultOption.label
            }
            placeholder={placeHolder}
            onChange={handleChange}
            onFocus={() => setIsActive(true)}
          />
          <ArrowContainer>
            {isActive ? (
              <IoIosArrowUp onClick={() => setIsActive(false)} />
            ) : (
              <IoIosArrowDown onClick={() => setIsActive(true)} />
            )}
          </ArrowContainer>
        </InputWrapper>
        {isActive && valueChange().length ? (
          <OptionsContainer>
            {valueChange().map((option) => (
              <ListItem
                key={option.value}
                customvalue={option.value}
                //  @ts-ignore
                onClick={handleItemClick}
                hoverColor={option.color}
                
              >
                {option.label}
              </ListItem>
            ))}
          </OptionsContainer>
        ) : null}
      </DropDownWrapper>
    </DropDownContainer>
  );
};

export default Dropdown;
