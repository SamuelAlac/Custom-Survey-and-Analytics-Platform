import { useState, useMemo, useEffect } from 'react'

export const ResponseTimeline = ({ data }: { data: any }) => {
  console.log('Response Timeline Data:', data)
  const [activeView, setActiveView] = useState('Weekly')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return []
    }

    // Get date range based on active view
    const today = new Date()
    const dateRange = []
    let daysToShow = 7

    if (activeView === 'Daily') {
      daysToShow = 7
    } else if (activeView === 'Weekly') {
      daysToShow = 7
    } else if (activeView === 'Monthly') {
      daysToShow = 30
    }

    // Generate date range
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      dateRange.push(date)
    }

    // Count responses by date
    const responseCounts = dateRange.map(date => {
      const dateStr = date.toISOString().split('T')[0]
      const count = data.filter((response: any) => {
        if (!response.created_at) return false
        const responseDate = new Date(response.created_at).toISOString().split('T')[0]
        return responseDate === dateStr
      }).length

      const isToday = dateStr === today.toISOString().split('T')[0]
      const dayName = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })

      return {
        date: dayName,
        value: count,
        isToday,
        fullDate: date
      }
    })

    // Find peak day
    const maxCount = Math.max(...responseCounts.map(item => item.value))
    
    // Add colors and labels
    return responseCounts.map(item => {
      let color = '#4F46E5' // Default blue
      let label = ''

      if (item.isToday) {
        color = '#F97316' // Orange for today
        label = 'Today'
      } else if (item.value === maxCount && maxCount > 0) {
        color = '#22C55E' // Green for peak day
        label = 'Peak Day'
      }

      return {
        ...item,
        color,
        label
      }
    })
  }, [data, activeView])

  const chartHeight = 200
  const isLoading = !data || (Array.isArray(data) && data.length === 0)

  // Skeleton Loading State
  if (!isLoaded || isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border animate-pulse">
        {/* Skeleton Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-60"></div>
          </div>
          <div className="flex bg-gray-200 rounded-lg p-1 w-32 h-8"></div>
        </div>

        {/* Skeleton Chart */}
        <div className="relative">
          {/* Skeleton Y-axis */}
          <div className="absolute left-0 h-full flex flex-col justify-between -ml-6 pr-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 w-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Skeleton Chart Container */}
          <div className="ml-12 relative" style={{ height: `${chartHeight}px` }}>
            {/* Skeleton Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-t border-gray-100 w-full"></div>
              ))}
            </div>

            {/* Skeleton Bars */}
            <div className="absolute bottom-0 w-full flex items-end justify-between gap-1">
              {[...Array(7)].map((_, index) => {
                const skeletonHeight = Math.random() * 150 + 20 // Random heights between 20-170px
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

          {/* Skeleton X-axis label */}
          <div className="text-center mt-4">
            <div className="h-4 w-8 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border transform transition-all duration-700 ease-out ${
      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className={`transform transition-all duration-700 ease-out delay-150 ${
          isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`}>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Response Timeline</h2>
          <p className="text-sm text-gray-500">Real-time update as responses come in</p>
        </div>
        
        {/* Toggle Buttons */}
        <div className={`flex bg-gray-100 rounded-lg p-1 transform transition-all duration-700 ease-out delay-300 ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}>
          {['Daily', 'Weekly', 'Monthly'].map((view) => (
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
      <div className={`relative transform transition-all duration-700 ease-out delay-500 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-6 pr-3" style={{ height: `${chartHeight}px` }}>
          {(() => {
            const maxChartValue = Math.max(...processedData.map(d => d.value), 10)
            const step = Math.ceil(maxChartValue / 5)
            const labels = []
            for (let i = 5; i >= 0; i--) {
              labels.push(i * step)
            }
            return labels.map((value, index) => (
              <div key={value} className="flex items-center justify-end relative" style={{ 
                transform: 'translateY(-50%)',
                ...(index === 0 ? { transform: 'translateY(-25%)' } : {}),
                ...(index === labels.length - 1 ? { transform: 'translateY(25%)' } : {})
              }}>
                <span className="leading-none text-right font-medium">{value}</span>
              </div>
            ))
          })()}
        </div>

        {/* Chart container */}
        <div className="ml-10 relative" style={{ height: `${chartHeight}px` }}>
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-t border-gray-100 w-full"></div>
            ))}
          </div>

          {/* Bars */}
          <div className="absolute bottom-0 w-full flex items-end justify-between gap-1">
            {processedData.length > 0 ? processedData.map((item, index) => {
              const maxChartValue = Math.max(...processedData.map(d => d.value), 10)
              const barHeight = (item.value / maxChartValue) * chartHeight
              return (
                <div key={index} className={`flex flex-col items-center relative group flex-1 transform transition-all duration-500 ease-out ${
                  isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                }`} style={{ transitionDelay: `${700 + index * 100}ms` }}>
                  {/* Bar */}
                  <div
                    className="w-full max-w-12 rounded-t-md hover:opacity-80 relative mx-auto"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: item.color,
                      minHeight: item.value > 0 ? '4px' : '0px',
                      transformOrigin: 'bottom',
                      transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
                      transition: `transform 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55) ${1000 + index * 200}ms`
                    }}
                  >
                    {/* Label for special days */}
                    {item.label && (
                      <div
                        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs text-white whitespace-nowrap z-10 ${
                          item.color === '#22C55E' ? 'bg-green-500' :
                          item.color === '#F97316' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                      >
                        {item.label}
                      </div>
                    )}
                  </div>
                  
                  {/* Date label */}
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    <div className="truncate">{item.date}</div>
                    <div className="font-semibold text-gray-900">{item.value}</div>
                  </div>
                </div>
              )
            }) : (
              <div className="w-full text-center py-8 text-gray-500">
                No response data available
              </div>
            )}
          </div>
        </div>

        {/* X-axis label */}
        <div className="text-center mt-4 text-sm text-gray-500">Date</div>
      </div>
    </div>
  )
}
