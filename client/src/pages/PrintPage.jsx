import logo from '../components/CGD.jpg'

export const PrintPage = ({children}) => {
    return (
        <div className="print">
            <div className="print-top">
                <img src={logo} width="350px"/>
            </div>
            {children}
        </div>
    )
}