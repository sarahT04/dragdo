import { RadioGroup } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type importanceProps = {
    importance: (0 | 1 | 2 | 3 | 4 | 5);
}

export default function Importance({ importance }: importanceProps) {
    const [value, setValue] = useState<number>(importance);
    return (
        <RadioGroup value={value} onChange={setValue} title="Set importance">
            <RadioGroup.Label className="sr-only">
                Choose importance from 1 to 5
            </RadioGroup.Label>
            <div className="flex flex-row">
                {
                    Array.from({ length: 5 }, (_, i) => (i + 1)).map((item) => (
                        <RadioGroup.Option
                            key={`option${item}`}
                            value={item}
                            className={`cursor-pointer 
                            text-gray-200 hover:text-yellow-400
                            peer peer-hover:text-yellow-400 
                            ui-active:text-yellow-500 ui-checked:text-yellow-500 
                            ${value >= item ? "text-yellow-500" : ""}`}
                        >
                            <RadioGroup.Label as={ExclamationCircleIcon} className="w-6 h-6" />
                        </RadioGroup.Option>
                    ))
                }
            </div>
        </RadioGroup>
    )
}
