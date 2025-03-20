import { Card, CardContent } from "@/components/ui/card";

export default function ColorPalette({colors}: {colors: string[]}) {
    return (
        <Card className="p-4 border rounded-xl">
        <CardContent>
          <div className="flex space-x-4">
            {colors.map((color, index) => (
            <div key={index}>
              <div
                key={index}
                className="w-10 h-10 rounded-full border"
                style={{ backgroundColor: color }}
              ></div>
              <p className="text-xs">{color}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
}