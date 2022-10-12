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
      <Form.List name="Transaction">
        {(fieldsLine, { add }) => {
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
              {fieldsLine.map((line, i) => (
                <Collapse
                  defaultActiveKey={[i]}
                  key={i}
                  accordion
                  style={{
                    background: 'rgba(25, 103, 210, 0.08)',
                    border: 'none',
                  }}
                >
                  <Panel
                    style={{ border: 'none' }}
                    header={'Line ' + (i + 1)}
                    key={i}
                  >
                    <Form.List
                      name={[line.name, 'Line']}
                      fieldKey={[line.fieldKey, 'start2']}
                    >
                      {(fieldsGroup, { add }) => {
                        return (
                          <>
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                              }}
                              block
                            >
                              Add Group
                            </Button>
                            {fieldsGroup.map((group, i) => (
                              <Collapse
                                defaultActiveKey={[i]}
                                key={i}
                                accordion
                                style={{
                                  background: 'rgba(25, 103, 210, 0.08)',
                                  border: 'none',
                                }}
                              >
                                <Panel
                                  style={{ border: 'none' }}
                                  header={'Group' + (i + 1)}
                                  key={i}
                                >
                                  <Form.List
                                    name={[group.name, 'Group']}
                                    fieldKey={[group.fieldKey, 'start3']}
                                    initialValue={dataFromBackend}
                                  >
                                    {(fieldsEntity, { add }) => {
                                      return (
                                        <>
                                          <Button
                                            type="dashed"
                                            onClick={() => {
                                              add();
                                            }}
                                            block
                                          >
                                            Add entity
                                          </Button>
                                          {fieldsEntity.map((entity, i) => (
                                            <Collapse
                                              key={i}
                                              accordion
                                              style={{
                                                background:
                                                  'rgba(25, 103, 210, 0.08)',
                                                border: 'none',
                                              }}
                                            >
                                              <Panel
                                                style={{ border: 'none' }}
                                                header={`Date: ${
                                                  dataFromBackend[
                                                    i
                                                  ]?.start.format(
                                                    'MMMM, DD, YYYY'
                                                  ) ||
                                                  moment().format(
                                                    'MMMM, DD, YYYY'
                                                  )
                                                } | ...`}
                                              >
                                                <Form.Item
                                                  name={[entity.name, 'start']}
                                                  label="Start"
                                                  fieldKey={[
                                                    entity.fieldKey,
                                                    'start',
                                                  ]}
                                                >
                                                  <DatePicker />
                                                </Form.Item>
                                                <Form.Item
                                                  name={[entity.name, 'money']}
                                                  label="Money"
                                                  fieldKey={[
                                                    entity.fieldKey,
                                                    'money',
                                                  ]}
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
                                </Panel>
                              </Collapse>
                            ))}
                          </>
                        );
                      }}
                    </Form.List>
                  </Panel>
                </Collapse>
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
