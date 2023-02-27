import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  return (
    <>
      <Container fluid id="main">
        <Row>
          <Col className='text-center'>
            <h1>
              Dashboard
            </h1>
            <div style={{ marginLeft: "40%", marginBottom: "1%", display: "block", width: "20%", height: "0.2rem", backgroundColor: "black" }}></div>
          </Col>
        </Row>
        <Row>
          <Col >
            {/* <img src={img1} style={{ width: "350px",marginTop:"10rem" }}></img> */}
          </Col>
          <Col >
            {/* <div style={{ display: "flex", justifyContent: "end" }}>
              <img src={img3} className="" style={{ width: "400px",marginTop:"10rem"}}></img>
            </div> */}
          </Col>
          <Col>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;