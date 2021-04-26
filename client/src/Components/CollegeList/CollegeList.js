import axios from 'axios';
import { Col, Row, Table, Button, Select, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import qs from 'qs';

import './CollegeList.css';
import { Link } from 'react-router-dom';

const { Option } = Select;

// const columns = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id'
//     },
//     {
//         title: 'College Name',
//         dataIndex: 'name',
//         key: 'name',
//         render: (text, record, index) => <div onClick={()=> {props.history.push(`/college/${record.id}`)}}>{text}</div>
//     },
//     {
//         title: 'No of Students',
//         dataIndex: 'no_of_students',
//         key: 'no_of_students',
//         responsive: ['md']
//     },
//     {
//         title: 'State',
//         dataIndex: 'state',
//         key: 'state',
//         responsive: ['lg']
//     }
// ]

function CollegeList(props) {
    const [colleges, setColleges] = useState([]);
    const [searchType, setSearchType] = useState(0);
    const [disabled, setDisabled] = useState(true);

    const [states, setStates] = useState([]);
    const [state, setState] = useState('');

    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState('');

    useEffect(() => {
        const query = qs.parse(props.location.search, {
            ignoreQueryPrefix: true
        });
        if ('state' in query) {
            async function stateLoad() {
                const res = await axios.get(
                    `/college/state?state=${query.state}`
                );
                setColleges(res.data.data);
            }
            stateLoad();
        } else if ('course' in query) {
            async function courseLoad() {
                const res = await axios.get(
                    `/college/course?course=${query.course}`
                );
                setColleges(res.data.data);
            }
            courseLoad();
        } else {
            viewAllColleges();
        }
    }, [setColleges, props.location.search]);
    const filterByCourse = async () => {
        setSearchType(2);
        setDisabled(true);
        const dashboardRes = await axios.get('/dashboard');
        const coursesOffered = [];
        dashboardRes.data.data.collegesByCourses.forEach((item) =>
            coursesOffered.push(item._id)
        );
        setCourses(coursesOffered);
    };
    const filterByState = async () => {
        setSearchType(1);
        setDisabled(true);
        const dashboardRes = await axios.get('/dashboard');
        const statesCovered = [];
        dashboardRes.data.data.stateColleges.forEach((item) =>
            statesCovered.push(item._id)
        );
        setStates(statesCovered);
    };
    const courseSelected = async () => {
        const res = await axios.get(`/college/course?course=${course}`);
        setColleges(res.data.data);
    };
    const stateSelected = async () => {
        const res = await axios.get(`/college/state?state=${state}`);
        setColleges(res.data.data);
    };
    const viewAllColleges = async () => {
        setSearchType(0);
        const res = await axios.get('/college/list');
        setColleges(res.data.data);
    };
    return (
        <div className="table-data">
            <Row justify="space-around">
                <Col>
                    <Link to="/">
                        <Button
                            type="primary"
                            size="large"
                            className="row-button"
                        >
                            Dashboard
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        size="large"
                        className="row-button"
                        onClick={viewAllColleges}
                    >
                        View All Colleges
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        size="large"
                        className="row-button"
                        onClick={filterByState}
                    >
                        Filter By States
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        size="large"
                        className="row-button"
                        onClick={filterByCourse}
                    >
                        Filter By Courses
                    </Button>
                </Col>
            </Row>
            {searchType === 2 && (
                <Row justify="end">
                    {courses.length > 0 && (
                        <Select
                            size="large"
                            style={{
                                width: 280,
                                marginRight: 10,
                                marginBottom: 10
                            }}
                            showSearch
                            onChange={(value) => {
                                setCourse(value);
                                setDisabled(false);
                            }}
                            placeholder="Select a Course"
                        >
                            {courses.map((course) => {
                                return (
                                    <Option key={course} value={course}>
                                        {course}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                    <Tooltip title="search">
                        <Button
                            size="large"
                            type="primary"
                            disabled={disabled}
                            icon={<SearchOutlined />}
                            onClick={courseSelected}
                        />
                    </Tooltip>
                </Row>
            )}
            {searchType === 1 && (
                <Row justify="end">
                    {states.length > 0 && (
                        <Select
                            size="large"
                            style={{
                                width: 280,
                                marginRight: 10,
                                marginBottom: 10
                            }}
                            showSearch
                            onChange={(value) => {
                                setState(value);
                                setDisabled(false);
                            }}
                            placeholder="Select a State"
                        >
                            {states.map((state) => {
                                return (
                                    <Option key={state} value={state}>
                                        {state}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                    <Tooltip title="search">
                        <Button
                            size="large"
                            type="primary"
                            disabled={disabled}
                            icon={<SearchOutlined />}
                            onClick={stateSelected}
                        />
                    </Tooltip>
                </Row>
            )}
            {colleges.length > 0 && (
                <Table
                    columns={[
                        {
                            title: 'ID',
                            dataIndex: 'id',
                            key: 'id',
                            render: (text, record, index) => (
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        props.history.push(
                                            `/college/${record.id}`
                                        );
                                    }}
                                >
                                    {text}
                                </div>
                            )
                        },
                        {
                            title: 'College Name',
                            dataIndex: 'name',
                            key: 'name',
                            render: (text, record, index) => (
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        props.history.push(
                                            `/college/${record.id}`
                                        );
                                    }}
                                >
                                    {text}
                                </div>
                            )
                        },
                        {
                            title: 'No of Students',
                            dataIndex: 'no_of_students',
                            key: 'no_of_students',
                            responsive: ['md']
                        },
                        {
                            title: 'State',
                            dataIndex: 'state',
                            key: 'state',
                            responsive: ['lg']
                        }
                    ]}
                    bordered
                    dataSource={colleges}
                    pagination={{ position: ['bottomCenter'] }}
                />
            )}
        </div>
    );
}

export default CollegeList;
