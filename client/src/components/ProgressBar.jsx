export const ProgressBar = ({ current, total, size = 'medium'}) => {

    current = !isNaN(current) ? current : 0
    total = !isNaN(total) ? total : 1
    const progress = (current/total) * 100

    return (
        <div className={`ui progress active indicating ${size}`} data-percent={progress}>
            <div className="bar" style={{width: `${progress}%`}} >
                <div className="progress">
                    <span>{ current } / { total }</span>
                </div>
            </div>
        </div>
    )
}


