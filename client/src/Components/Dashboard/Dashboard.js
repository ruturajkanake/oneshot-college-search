import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { chartColors } from '../../assets/colors';
import axios from 'axios';
import { Row, Typography, Card, Col, Button } from 'antd';
import './Dashboard.css';

const { Title } = Typography;

const styles = {
    charts: {
        width: 350,
        height: 370,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    gridStyle: {
        textAlign: 'center',
        width: 229,
        height: 108,
        backgroundColor: '#fff'
    },
    gridNumber: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '30px',
        margin: 10,
        marginBottom: 0
    },
    gridText: {
        fontWeight: 'normal',
        marginTop: 0
    }
};

function Dashboard(props) {
    const [data, setData] = useState(null);
    const [coursesOffered, setCoursesOffered] = useState({});
    const [collegesByStates, setCollegesByState] = useState({});
    useEffect(() => {
        document.body.style.backgroundColor = '#f5f5f5';
        async function fetchData() {
            const res = await axios.get('/dashboard');
            setData(res.data.data);
            const coursesOfferedData = { labels: [], data: [] };
            res.data.data.collegesByCourses.forEach((item) => {
                coursesOfferedData.labels.push(item._id);
                coursesOfferedData.data.push(item.count);
            });
            setCoursesOffered(coursesOfferedData);
            const collegesByStatesData = { labels: [], data: [] };
            res.data.data.stateColleges.forEach((item) => {
                collegesByStatesData.labels.push(item._id);
                collegesByStatesData.data.push(item.count);
            });
            setCollegesByState(collegesByStatesData);
        }
        fetchData();
    }, [setCoursesOffered, setCollegesByState]);

    return (
        <div className="table-data" style={{ marginTop: 10 }}>
            <Row justify="space-around">
                <Col>
                    <Title level={2} style={{ marginTop: 10 }}>
                        Dashboard
                    </Title>
                </Col>
                <Link to="/college">
                    <Col>
                        <Button
                            type="primary"
                            size="large"
                            className="row-button"
                        >
                            Colleges List
                        </Button>
                    </Col>
                </Link>
            </Row>
            <Row justify="space-around">
                <Card hoverable style={{ marginBottom: 10 }}>
                    {Object.keys(coursesOffered).length > 0 && (
                        <div style={styles.charts}>
                            <Title
                                level={4}
                                style={{ marginTop: -10, marginBottom: -3 }}
                            >
                                Colleges by Courses
                            </Title>
                            <Doughnut
                                onElementsClick={(elem) => {
                                    props.history.push(
                                        `/college?course=${
                                            coursesOffered.labels[
                                                elem[0]._index
                                            ]
                                        }`
                                    );
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false
                                        // position: 'bottom',
                                        // labels: {
                                        //     fontSize: 11,
                                        //     boxWidth: 10,
                                        //     padding: 5
                                        // }
                                    }
                                }}
                                data={{
                                    labels: coursesOffered.labels,
                                    datasets: [
                                        {
                                            data: coursesOffered.data,
                                            backgroundColor: chartColors,
                                            hoverBackgroundColor: chartColors
                                        }
                                    ]
                                }}
                            />
                        </div>
                    )}
                </Card>
                <Card hoverable style={{ marginBottom: 10 }}>
                    {Object.keys(collegesByStates).length > 0 && (
                        <div style={styles.charts}>
                            <Title
                                level={4}
                                style={{ marginTop: -10, marginBottom: -3 }}
                            >
                                Colleges by States
                            </Title>
                            <Doughnut
                                onElementsClick={(elem) => {
                                    props.history.push(
                                        `/college?state=${
                                            collegesByStates.labels[
                                                elem[0]._index
                                            ]
                                        }`
                                    );
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false
                                        // position: 'bottom',
                                        // labels: {
                                        //     fontSize: 12,
                                        //     boxWidth: 20,
                                        //     padding: 12
                                        // }
                                    }
                                }}
                                data={{
                                    labels: collegesByStates.labels,
                                    datasets: [
                                        {
                                            data: collegesByStates.data,
                                            backgroundColor: chartColors,
                                            hoverBackgroundColor: chartColors
                                        }
                                    ]
                                }}
                            />
                        </div>
                    )}
                </Card>
            </Row>
            {data && (
                <Row justify="space-around" style={{ marginTop: 20 }}>
                    <Link to="/college">
                        <Card
                            hoverable
                            style={{ width: 330, marginBottom: 20 }}
                        >
                            <Row justify="center">
                                <Title
                                    style={{
                                        fontFamily: 'Lato',
                                        fontWeight: 'bolder',
                                        fontSize: '50px',
                                        margin: 20,
                                        color: '#0040a6'
                                    }}
                                >
                                    {data.numberOfColleges}
                                </Title>
                                <Title
                                    style={{
                                        fontWeight: 'bold',
                                        marginTop: 0,
                                        color: '#0040a6'
                                    }}
                                >
                                    Total Colleges
                                </Title>
                            </Row>
                        </Card>
                    </Link>
                    <Card style={{ width: 460, backgroundColor: '#f5f5f5' }}>
                        <Card.Grid style={styles.gridStyle}>
                            <Row justify="center">
                                <Title style={styles.gridNumber}>
                                    {data.numberOfStudents}
                                </Title>
                                <Title level={4} style={styles.gridText}>
                                    No of Students
                                </Title>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={styles.gridStyle}>
                            <Row justify="center">
                                <Title style={styles.gridNumber}>
                                    {data.coursesOffered}
                                </Title>
                                <Title level={4} style={styles.gridText}>
                                    Courses Offered
                                </Title>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={styles.gridStyle}>
                            <Row justify="center">
                                <Title style={styles.gridNumber}>
                                    {data.statesServing}
                                </Title>
                                <Title level={4} style={styles.gridText}>
                                    &emsp;States Covered&emsp;
                                </Title>
                            </Row>
                        </Card.Grid>
                        <Card.Grid style={styles.gridStyle}>
                            <Row justify="center">
                                <Title style={styles.gridNumber}>
                                    &emsp;{data.citiesServing}&emsp;
                                </Title>
                                <Title level={4} style={styles.gridText}>
                                    No of cities
                                </Title>
                            </Row>
                        </Card.Grid>
                    </Card>
                </Row>
            )}
        </div>
    );
}

export default Dashboard;
