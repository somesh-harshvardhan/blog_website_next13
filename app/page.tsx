"use client";
import Dropdown from "@/components/shared/dropdown/Dropdown";
import { colourOptions } from "@/testData";
import { useState } from "react";

export default function Home() {
  const [selected,setSelected] = useState<Options | string | Options[]>("")
  return (
<main>
 <Dropdown width={400} defaultOption={selected} onChange={setSelected} options={colourOptions} isMultipleSelect isTypeSearch optionHoverColor/>
</main>
  )
}
