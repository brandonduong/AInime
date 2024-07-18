type SliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (newValue: number) => void;
};

export default function Slider({ min, max, value, onChange }: SliderProps) {
  return (
    <div className="relative mb-6">
      <label htmlFor="labels-range-input" className="sr-only">
        Labels range
      </label>
      <input
        id="labels-range-input"
        type="range"
        value={value}
        min={min}
        max={max}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        onChange={(e) => onChange(parseFloat(e.target.value))}
        step={0.1}
      />
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        {min}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
        {min + max / 2}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
        {max}
      </span>
    </div>
  );
}
