"use client";
import React, { LiHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Pills from "../pills/Pills";

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
  li {
    padding: 4px 8px;
    cursor: pointer;
    :hover {
      background-color: var(--primary-light-blue);
    }
  }
`;

const Dropdown = ({
  height,
  width,
  defaultOption,
  placeHolder = "Select...",
  onChange,
  options,
  isMultipleSelect=false,
  isTypeSearch =false,
  ...rest
}: DropDownProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filter,setFilter] = useState<boolean>(false);
  const [selectedTags,setSelectedTags] =useState<string[]>([]);

  const containerheight = typeof height === "number" ? height + "px" : height;
  const containerwidth = typeof width === "number" ? width + "px" : width;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isTypeSearch) return;
    setFilter(true)
    const { value } = e.target;
    onChange(value);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLLinkElement>) => {
    // @ts-ignore
    const value = e.target.getAttribute("customvalue");
    // @ts-ignore
    const label = e.target.innerHTML;
    onChange({value : value,label : label})
    if(!isMultipleSelect){
        setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }else{
     setFilter(false)
     typeof defaultOption !== "object" && onChange("")
    }
  }, [isActive, inputRef,defaultOption,onChange]);
 
  const valueChange = ()=>{
    let optionsFiltered : Options[] = [...options];
   if(isTypeSearch && filter && typeof defaultOption !== "object" ){
    optionsFiltered =optionsFiltered.filter(option=>option.label.toLowerCase().includes(defaultOption.toLowerCase()))
   }

   return optionsFiltered;
  }
  useEffect(()=>{
   const handleClick = ()=>setIsActive(false)
   window.addEventListener("click",handleClick);
   return ()=>window.removeEventListener("click",handleClick)
  },[])
  return (
    <DropDownContainer height={containerheight} width={containerwidth} onClick={e=>e.stopPropagation()}>
      <DropDownWrapper>
        {isMultipleSelect && <Pills pills={selectedTags}/>}
        <Input
          ref={inputRef}
          value={typeof defaultOption !== "object" ? defaultOption : defaultOption.label}
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
       {  (isActive && valueChange().length) ? <OptionsContainer>
          {
            
              valueChange().map((option) => (
                <li
                  key={option.value}
                  customvalue={option.value}
                  //  @ts-ignore
                  onClick={handleItemClick}
                >
                  {option.label}
                </li>
              ))
          }
        </OptionsContainer> : null}
      </DropDownWrapper>
    </DropDownContainer>
  );
};

export default Dropdown;
