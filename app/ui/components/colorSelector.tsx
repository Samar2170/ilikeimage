import React from "react";


type Color = {
  name: string;
  value: string;
};

type ColorPaletteProps = {
  colors: Color[];
};

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <div className="flex w-max gap-4">
        <div className="grid grid-cols-12 gap-2">
        {colors.map((color) => (
        //   <div
        //     key={color.name}
        //     title={color.name}
        //     className="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 hover:ring-gray-500"
        //     style={{ backgroundColor: color.value }}
        //   />
        <div key={color.name} className="relative group">
            <div
            className="h-12 w-12 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 hover:ring-gray-500"
            style={{ backgroundColor: color.value }}
            />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-10 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {color.name}
            </span>
        </div>
          
        ))}
          </div>
      </div>
  );
};

export default ColorPalette;