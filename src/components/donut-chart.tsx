type DonutChartProps = {
  passed: number
  redo: number
  pending: number
  size?: number
}

export function DonutChart({ passed, redo, pending, size = 80 }: DonutChartProps) {
  const total = passed + redo + pending

  if (total === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-full" style={{ width: size, height: size }}>
        <span className="text-xs text-gray-500">No data</span>
      </div>
    )
  }

  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Ratios
  const passedRatio = passed / total
  const redoRatio = redo / total
  const pendingRatio = pending / total

  // Angles per section
  const passedLength = passedRatio * circumference
  const redoLength = redoRatio * circumference
  const pendingLength = pendingRatio * circumference

  // Stroke offsets
  const passedOffset = 0
  const redoOffset = passedOffset + passedLength
  const pendingOffset = redoOffset + redoLength

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
        />

        {/* Passed */}
        {passed > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${passedLength} ${circumference}`}
            strokeDashoffset={-passedOffset}
          />
        )}

        {/* Redo */}
        {redo > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${redoLength} ${circumference}`}
            strokeDashoffset={-redoOffset}
          />
        )}

        {/* Pending */}
        {pending > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f97316"
            strokeWidth={strokeWidth}
            strokeDasharray={`${pendingLength} ${circumference}`}
            strokeDashoffset={-pendingOffset}
          />
        )}
      </svg>

      {/* Center number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">{total}</span>
      </div>
    </div>
  )
}
