import DashboardCharts from "../../../Components/DashbroadCharts/DashboardCharts";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__title">Tổng quan</div>
            <div className="dashboard__charts">
                <div className="chart">
                    <h3>Thông số doanh số theo mẫu máy</h3>
                    <DashboardCharts type={"pie"}/>
                </div>

                <div className="chart">
                    <h3>Doanh số bán theo tháng</h3>
                    <DashboardCharts type={"line"}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;