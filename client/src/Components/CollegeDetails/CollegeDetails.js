import axios from 'axios';
import { Col, Row, Typography, Button, Divider, Tag, Card, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { randomTagColor } from '../../assets/colors';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const LoadingIcon = (
    <Loading3QuartersOutlined
        style={{ fontSize: '45px', color: 'rgb(0, 64, 166)', marginTop: 30 }}
        spin
    />
);

function CollegeDetails(props) {
    const [loading, setLoading] = useState(true);
    const [college, setCollege] = useState(null);
    const [similarColleges, setSimilarColleges] = useState([]);
    useEffect(() => {
        setLoading(true);
        document.querySelector('body').scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const fetchData = async () => {
            const id = props.match.params.collegeId;
            const collegeRes = await axios.get(`/college/details/${id}`);
            const similarRes = await axios.get(`/college/similar/${id}`);
            setCollege(collegeRes.data.data);
            setSimilarColleges(similarRes.data.data);
            setLoading(false);
        };
        fetchData();
    }, [props.match.params.collegeId, setCollege, setSimilarColleges]);

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
                    <Link to="/college">
                        <Button
                            type="primary"
                            size="large"
                            className="row-button"
                        >
                            College List
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Spin indicator={LoadingIcon} spinning={loading}>
                {college && (
                    <>
                        <Divider />
                        <Title level={2}>{college && college.name}</Title>
                        <Divider />

                        <Row justify="space-between">
                            <Col>
                                <i
                                    class="fas fa-map-marker-alt"
                                    style={{ fontSize: '17px' }}
                                ></i>
                                <Text
                                    style={{ fontSize: '17px', padding: '5px' }}
                                >
                                    {college.city}, {college.state},{' '}
                                    {college.country}
                                </Text>
                            </Col>
                            <Col>
                                <Text
                                    style={{ fontSize: '17px', padding: '5px' }}
                                >
                                    Year Founded: {college.year}
                                </Text>
                            </Col>
                        </Row>
                        <Title level={3} style={{ marginTop: '30px' }}>
                            Courses Offered
                        </Title>
                        <div>
                            {college.courses.map((course, i) => {
                                return (
                                    <Tag
                                        style={{
                                            fontSize: '15px',
                                            padding: '5px',
                                            marginBottom: '5px'
                                        }}
                                        color={randomTagColor()}
                                    >
                                        {course}
                                    </Tag>
                                );
                            })}
                        </div>
                        <Row justify="start" style={{ marginTop: 50 }}>
                            <Col style={{ padding: '6px' }}>
                                <Text
                                    style={{
                                        fontSize: '18px',
                                        padding: '50px 10px 0 0'
                                    }}
                                >
                                    Number of Students: {college.no_of_students}
                                </Text>
                            </Col>
                            <Col>
                                <Link
                                    to={`/student/${props.match.params.collegeId}`}
                                >
                                    <Button size="large" danger>
                                        Students List
                                    </Button>
                                </Link>
                            </Col>
                        </Row>

                        <Title level={3} style={{ marginTop: '30px' }}>
                            Similar Colleges
                        </Title>

                        <Row justify="space-around">
                            {similarColleges &&
                                similarColleges.map((similarCollege) => {
                                    return (
                                        <Link
                                            to={`/college/${similarCollege.id}`}
                                        >
                                            <Card
                                                hoverable
                                                title={similarCollege.name}
                                                style={{
                                                    width: 300,
                                                    marginBottom: 10
                                                }}
                                            >
                                                <p>ID: {similarCollege.id}</p>
                                                <p>
                                                    State:{' '}
                                                    {similarCollege.state}
                                                </p>
                                            </Card>
                                        </Link>
                                    );
                                })}
                        </Row>
                    </>
                )}
            </Spin>
        </div>
    );
}

export default CollegeDetails;
