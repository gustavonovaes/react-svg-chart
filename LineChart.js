function LineChart({ data }) {
    if (!data.length) {
        return null;
    }

    const maxValue = Math.max(...data.map(([value]) => value));

    const points = data
        .map(([value], index) => {
            return `L ${index} ${maxValue - value}`;
        })
        .join(' ');

    return (
        <div className="linechart">
            {data.map(([value, label], index) => (
                <div key={index} className="linechart-x-line" style={{ left: `${(index / (data.length - 1)) * 100}%` }}>
                    <div className="linechart-x-label">{label}</div>
                    <div className="linechart-x-value" style={{ bottom: `${(value / maxValue) * 100}%` }}>
                        {value}
                    </div>
                </div>
            ))}
            <div className="linechart-y-line" style={{ bottom: '100%' }}>
                <div className="linechart-y-label">{maxValue}</div>
            </div>
            <div className="linechart-y-line" style={{ bottom: '50%' }} />
            <div className="linechart-y-line" style={{ bottom: '0' }} />
            <svg className="linechart-chart" viewBox={`0 0 ${data.length - 1} ${maxValue}`} preserveAspectRatio="none">
                <defs>
                    <linearGradient id="background" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#5d78ff', stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: '#5d78ff', stopOpacity: 0 }} />
                    </linearGradient>
                </defs>
                <path d={`M 0 ${maxValue + 1} ${points} L 23 ${maxValue + 1} Z`} fill="url(#background)" />
                <path
                    d={points.replace('L', 'M')}
                    fill="none"
                    stroke="#5d78ff"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
