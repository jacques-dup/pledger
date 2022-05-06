export const ProgressBar = ({ current, total, size = 'medium', type}) => {

    current = !isNaN(current) ? current : 0
    total = !isNaN(total) ? total : 1
    const progress = (current/total) * 100

    const smallNumberStyle = {
        position: "relative",
        left: "1.5em"
    }

    return (
        <div className={`ui progress active indicating ${size}`} data-percent={progress}>
            <div className="bar" style={{width: `${progress}%`}} >
                <div className="progress">
                    <span style={progress < 5 ? smallNumberStyle : {}}>
                        {type === 'progress'
                        ?
                            <span>{progress.toFixed(1)}%</span>
                        :
                            <span>{current } / { total }</span>
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}


