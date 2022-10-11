import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { DatePicker, Space } from 'antd';
import React from 'react';
import { Input, Button, Form, Collapse, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const BasicInformation = () => {
  const { Panel } = Collapse;

  const dataFromBackend = [
    { id: 2, start: '2022-01-04T08:00:00.000Z', money: '500' },
    { id: 3, start: '2022-02-04T08:00:00.000Z', money: '1500' },
  ].map((d) => ({ ...d, start: moment(d.start) }));

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form onFinish={(e) => onSubmit(e)}>
      <Form.List name="users">
        {(fields, { add }) => {
          return (
            <>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                block
              >
                Add Line
              </Button>
              {fields.map((field, i) => (
                <Form.List
                  name={[field.name, 'user2']}
                  key={i}
                  initialValue={dataFromBackend}
                >
                  {(fields, { add }) => {
                    return (
                      <>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                          block
                        >
                          Add
                        </Button>
                        {fields.map((field, i) => (
                          <Collapse
                            key={i}
                            accordion
                            style={{
                              background: 'rgba(25, 103, 210, 0.08)',
                              border: 'none',
                            }}
                          >
                            <Panel
                              style={{ border: 'none' }}
                              header={`Date: ${
                                dataFromBackend[i]?.start.format(
                                  'MMMM, DD, YYYY'
                                ) || moment().format('MMMM, DD, YYYY')
                              } | ...`}
                            >
                              <Form.Item
                                name={[field.name, 'start']}
                                label="Start"
                                fieldKey={[field.fieldKey, 'start']}
                              >
                                <DatePicker />
                              </Form.Item>
                              <Form.Item
                                name={[field.name, 'money']}
                                label="Money"
                                fieldKey={[field.fieldKey, 'money']}
                              >
                                <Input />
                              </Form.Item>
                            </Panel>
                          </Collapse>
                        ))}
                      </>
                    );
                  }}
                </Form.List>
              ))}
            </>
          );
        }}
      </Form.List>
      <Button type="primary" htmlType="submit">
        send
      </Button>
    </Form>
  );
};

ReactDOM.render(<BasicInformation />, document.getElementById('container'));
