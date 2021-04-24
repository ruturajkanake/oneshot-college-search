import axios from 'axios';
import { Col, Row, Table, Button, Typography, Tag } from 'antd';
import { useEffect, useState } from 'react';
import {randomTagColor} from '../../assets/colors';
import { Link } from 'react-router-dom';

const {Text} = Typography;

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
        key: 'year',
    }
]

function StudentsList(props) {
    const [students, setStudents] = useState(null);
    const [expandedRowKeys, setRowKeys] = useState([]);
    useEffect(() => {
        fetchData()
    }, [setStudents]);
    const fetchData = async() => {
        const id = props.match.params.collegeId;
        const res = await axios.get(`/student/list/${id}`);
        setStudents(res.data.data);
    }
    const onRowExpand = (expanded, record) => {
        const keys = [];
        if(expanded) keys.push(record.id);
        setRowKeys(keys)
    }
    return (
        <div className='table-data'>
            <Row justify='space-around'>
                <Col>
                    <Link to='/'>
                    <Button type="primary" size='large' className='row-button'>Dashboard</Button>
                    </Link>
                    
                </Col>
                <Col>
                    <Link to='/college'>
                    <Button type="primary" size='large' className='row-button'>College List</Button>
                    </Link>
                    
                </Col>
                <Col>
                    <Link to={`/college/${props.match.params.collegeId}`}>
                    <Button type="primary" size='large' className='row-button'>College Details</Button>
                    </Link>
                    
                </Col>
            </Row>
            {students && <Table 
                rowKey='id'
                columns={columns} 
                expandedRowKeys={expandedRowKeys}
                onExpand={onRowExpand}
                expandable={{
                    expandedRowRender: record => <div><Text strong>Skills: &emsp;</Text>{record.skills.map((skill, i) => {
                        return <Tag  style={{fontSize: '15px', padding: '5px', marginBottom: '5px'}} color={randomTagColor()}>{skill}</Tag>
                    })}</div>,
                }}
                bordered 
                dataSource={students} 
                pagination={{position: ['bottomCenter']}}
            />}
        </div>
    )
}  

export default StudentsList;