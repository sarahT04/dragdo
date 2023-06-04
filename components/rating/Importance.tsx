import { RadioGroup } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type importanceProps = {
    importance: (0 | 1 | 2 | 3 | 4 | 5);
};

export default function Importance({ importance }: importanceProps) {
    const [value, setValue] = useState<number>(importance);
    return (
        <RadioGroup value={value} onChange={setValue} className="w-fit my-1">
            <RadioGroup.Label className="sr-only">Choose importance from one to five</RadioGroup.Label>
            <div className="flex flex-row-reverse gap-3">
                {Array.from({ length: 5 }, (v, i) => i + 1).reverse().map((item) => (
                    <RadioGroup.Option
                        key={item}
                        value={item}
                        className={({ active, checked }) =>
                            `
                                cursor-pointer text-gray-200
                                flex-1 hover:text-slate-400
                                peer
                                peer-hover:text-slate-400
                                ${active ? 'text-yellow-500' : ''}
                                ${checked ? 'text-yellow-500' : ''}
                                ${value >= item ? 'text-yellow-500' : ''}
                            `
                        }
                    >
                        <RadioGroup.Label as={ExclamationCircleIcon} className="w-6 h-6" />
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
