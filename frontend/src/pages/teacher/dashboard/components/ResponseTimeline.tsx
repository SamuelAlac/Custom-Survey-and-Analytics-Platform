import { useState, useMemo, useEffect } from 'react'

export const ResponseTimeline = ({ data }: { data: any }) => {
  const [activeView, setActiveView] = useState('Weekly')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return []

    const today = new Date()
    const dateRange: Date[] = []

    let daysToShow = 7
    if (activeView === 'Monthly') daysToShow = 30

    // Build date range
    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      dateRange.push(d)
    }

    const responseCounts = dateRange.map(date => {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

      const count = data.filter((response: any) => {
        if (!response.created_at) return false
        const r = new Date(response.created_at)
        const rStr = `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, '0')}-${String(r.getDate()).padStart(2, '0')}`
        return rStr === dateStr
      }).length

      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      const isToday = dateStr === todayStr
      const dayName = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      return { date: dayName, value: count, isToday, fullDate: date }
    })

    const maxCount = Math.max(...responseCounts.map(r => r.value))

    return responseCounts.map(item => {
      let color = '#4F46E5'
      let label = ''

      if (item.isToday) {
        color = '#F97316'
        label = 'Today'
      } else if (item.value === maxCount && maxCount > 0) {
        color = '#22C55E'
        label = 'Peak Day'
      }

      return { ...item, color, label }
    })
  }, [data, activeView])

  const chartHeight = 200
  const isLoading = !data || data.length === 0

  // Skeleton loading
  if (!isLoaded || isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-60"></div>
          </div>
          <div className="flex bg-gray-200 rounded-lg p-1 w-32 h-8"></div>
        </div>

        {/* Chart */}
        <div className="relative">
          <div className="absolute left-0 h-full flex flex-col justify-between -ml-6 pr-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 w-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          <div className="ml-12 relative" style={{ height: `${chartHeight}px` }}>
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-t border-gray-100 w-full"></div>
              ))}
            </div>

            <div className="absolute bottom-0 w-full flex items-end justify-between gap-1">
              {[...Array(7)].map((_, index) => {
                const skeletonHeight = Math.random() * 150 + 20
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full max-w-12 rounded-t-md bg-gray-200 mx-auto"
                      style={{ height: `${skeletonHeight}px` }}
                    ></div>
                    <div className="mt-2 space-y-1">
                      <div className="h-3 w-8 bg-gray-200 rounded mx-auto"></div>
                      <div className="h-3 w-4 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-4">
            <div className="h-4 w-8 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // Main chart
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border transform transition-all duration-700 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div
          className={`transform transition-all duration-700 ease-out delay-150 ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Response Timeline</h2>
          <p className="text-sm text-gray-500">Real-time update as responses come in</p>
        </div>

        {/* Toggle */}
        <div
          className={`flex bg-gray-100 rounded-lg p-1 transition-all duration-700 ease-out delay-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {['Daily', 'Weekly', 'Monthly'].map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeView === view
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div
        className={`relative transform transition-all duration-700 ease-out delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Y Axis */}
        <div
          className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-6 pr-3"
          style={{ height: `${chartHeight}px` }}
        >
          {(() => {
            const maxChartValue = Math.max(...processedData.map(d => d.value), 10)
            const step = Math.ceil(maxChartValue / 5)
            const labels = Array.from({ length: 6 }, (_, i) => (5 - i) * step)

            return labels.map((value, index) => (
              <div key={index} className="flex items-center justify-end relative">
                <span className="leading-none font-medium">{value}</span>
              </div>
            ))
          })()}
        </div>

        {/* Chart container */}
        <div className="ml-10 relative" style={{ height: `${chartHeight}px` }}>
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-t border-gray-100 w-full"></div>
            ))}
          </div>

          {/* Bars */}
          <div className="absolute bottom-0 w-full flex items-end justify-between gap-1">
            {processedData.map((item, index) => {
              const maxVal = Math.max(...processedData.map(d => d.value), 10)
              const barHeight = (item.value / maxVal) * chartHeight

              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 relative"
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <div
                    className="w-full max-w-12 rounded-t-md hover:opacity-80 mx-auto"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: item.color,
                      minHeight: item.value > 0 ? '4px' : '0px',
                      transformOrigin: 'bottom',
                      transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
                      transition: `transform 800ms cubic-bezier(0.68,-0.55,0.265,1.55) ${1000 + index * 200}ms`
                    }}
                  >
                    {item.label && (
                      <div
                        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs text-white whitespace-nowrap ${
                          item.color === '#22C55E'
                            ? 'bg-green-500'
                            : item.color === '#F97316'
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                      >
                        {item.label}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-600 text-center">
                    <div className="truncate">{item.date}</div>
                    <div className="font-semibold text-gray-900">{item.value}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">Date</div>
      </div>
    </div>
  )
}
