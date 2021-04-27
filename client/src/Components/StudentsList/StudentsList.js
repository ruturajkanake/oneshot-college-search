import axios from 'axios';
import { Col, Row, Table, Button, Typography, Tag, Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { randomTagColor } from '../../assets/colors';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Year of Batch',
        dataIndex: 'year',
        key: 'year'
    }
];

const LoadingIcon = (
    <Loading3QuartersOutlined
        style={{ fontSize: '45px', color: 'rgb(0, 64, 166)', marginTop: 30 }}
        spin
    />
);

function StudentsList(props) {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState(null);
    const [expandedRowKeys, setRowKeys] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const id = props.match.params.collegeId;
            const res = await axios.get(`/student/list/${id}`);
            setStudents(res.data.data);
            setLoading(false);
        };
        fetchData();
    }, [setStudents, props.match.params.collegeId]);
    const onRowExpand = (expanded, record) => {
        const keys = [];
        if (expanded) keys.push(record.id);
        setRowKeys(keys);
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
                <Col>
                    <Link to={`/college/${props.match.params.collegeId}`}>
                        <Button
                            type="primary"
                            size="large"
                            className="row-button"
                        >
                            College Details
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Spin indicator={LoadingIcon} spinning={loading}>
                {students && (
                    <Table
                        rowKey="id"
                        columns={columns}
                        expandedRowKeys={expandedRowKeys}
                        onExpand={onRowExpand}
                        expandable={{
                            expandedRowRender: (record) => (
                                <div>
                                    <Text strong>Skills: &emsp;</Text>
                                    {record.skills.map((skill, i) => {
                                        return (
                                            <Tag
                                                style={{
                                                    fontSize: '15px',
                                                    padding: '5px',
                                                    marginBottom: '5px'
                                                }}
                                                color={randomTagColor()}
                                            >
                                                {skill}
                                            </Tag>
                                        );
                                    })}
                                </div>
                            )
                        }}
                        bordered
                        dataSource={students}
                        pagination={{ position: ['bottomCenter'] }}
                    />
                )}
            </Spin>
        </div>
    );
}

export default StudentsList;
