'use client';
import Dropdown from "@/components/shared/dropdown/Dropdown";
import { useState } from "react";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  {value : 'kekw',label : 'KEKW'},
  {value : 'troll',label : 'Troll'},
  {value : 'ezglap', label : 'EzGlap'}
  
];
export default function Home() {
  const [selectedOption, setSelectedOption] = useState<Options | string>("");
  
  return (
<main>
 <Dropdown width={300} defaultOption={selectedOption} onChange={setSelectedOption} options={options} isTypeSearch isMultipleSelect/>
</main>
  )
}
