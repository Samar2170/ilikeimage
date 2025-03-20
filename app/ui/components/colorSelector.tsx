import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
type Color = {
  name: string;
  value: string;
};

type ColorSelectorProps = {
  colors: Color[];
  onSelectColor: (colorName: string) => void;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, onSelectColor }) => {
  const [selectedPalette, setSelectedPalette] = useState<Color|undefined>(colors[0]);

  useEffect(() => {
    onSelectColor(selectedPalette?.name || "");
  },[selectedPalette])
  return (
    <div className="max-w-2xl mx-auto p-6 grid grid-cols-2 gap-6">
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Color Palette</h2>
      <Select onValueChange={(value) => setSelectedPalette(colors.find(p => p.name === value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a palette" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((palette, index) => (
            <SelectItem key={index} value={palette.name}>{palette.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <Card className="h-40 flex items-center justify-center rounded-xl" style={{ backgroundColor: selectedPalette?.value }}>
        <CardContent>
          <p className="text-white font-semibold text-lg">{selectedPalette?.name}</p>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default ColorSelector;