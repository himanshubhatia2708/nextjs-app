import { DropDownItem } from "@/lib/definition";

type PopupBoxProps = {
    isOpen: boolean;
    onItemSelected: (value: string) => void;
    items: DropDownItem[];
};

export function PopupBox({ isOpen, onItemSelected, items }: PopupBoxProps) {
    return (
        isOpen && (
            <div id="custom-dropdown" 
            className="absolute right-0 mt-2 w-auto min-w-48 bg-white shadow-[0px_0px_24px_0px_rgba(0,0,0,0.25)] rounded-md">
                <ul className="py-2">
                    {items.map((item) => (
                        <li
                            className="px-4 py-2 text-center text-neutral-999 font-lato text-sm normal-case font-normal leading-normal hover:bg-gray-200 cursor-pointer"
                            onClick={() => onItemSelected(item.value)}
                            key={item.value}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};