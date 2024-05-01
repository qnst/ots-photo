import { ProForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Form, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { detailEdfApp } from '../service';

export type FormValueType = {} & Partial<API.RuleListItem>;

export type DetailFormProps = {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  detailModalOpen: boolean;
  initValues: Partial<any>;
  columns: any
};

const DetailForm: React.FC<DetailFormProps> = (props) => {
  const intl = useIntl();
  const [fieldWidth, setFieldWidth] = useState<any>('lg');
  const [form] = Form.useForm();
  const formRef = useRef<ProFormInstance>();
  const { onCancel, onSubmit, detailModalOpen, initValues, columns } = props;

  const onFinish = async () => { }

  var renderContent = () => {
    var content =
      <>
        <div style={{ marginTop: 0 }} >
          <ProForm.Group >
            <ProFormText
              name="id"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'mnt.top-img.fields.name.id' })}
              tooltip={intl.formatMessage({ id: 'mnt.top-img.fields.tip.appId' })}
              placeholder={intl.formatMessage({ id: 'mnt.top-img.fields.ph.appId' })}
              disabled={true}
            />
            <ProFormText
              rules={[
                {
                  required: false,
                },
              ]}
              name="appName"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'mnt.top-img.fields.name.type' })}
              tooltip={intl.formatMessage({ id: 'mnt.top-img.fields.tip.appName' })}
              placeholder={intl.formatMessage({ id: 'mnt.top-img.fields.ph.appName' })}
              disabled={true}
            />
            <ProFormText
              rules={[
                {
                  required: false,
                },
              ]}
              name="dataStatus"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'mnt.top-img.fields.name.dataStatus' })}
              tooltip={intl.formatMessage({ id: 'mnt.top-img.fields.tip.dataStatus' })}
              placeholder={intl.formatMessage({ id: 'mnt.top-img.fields.ph.dataStatus' })}
              disabled={true}
            />
            <ProFormText
              rules={[
                {
                  required: false,
                },
              ]}
              name="createdBy"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'common.fields.name.createdBy' })}
              tooltip={intl.formatMessage({ id: 'common.fields.tip.createdBy' })}
              placeholder={intl.formatMessage({ id: 'common.fields.ph.createdBy' })}
              disabled={true}
            />
            <ProFormDatePicker
              rules={[
                {
                  required: false,
                },
              ]}
              name="createdTime"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'common.fields.name.createdTime' })}
              tooltip={intl.formatMessage({ id: 'common.fields.tip.createdTime' })}
              placeholder={intl.formatMessage({ id: 'common.fields.ph.createdTime' })}
              disabled={true}
            />
            <ProFormText
              rules={[
                {
                  required: false,
                },
              ]}
              name="lastUpdatedBy"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'common.fields.name.lastUpdatedBy' })}
              tooltip={intl.formatMessage({ id: 'common.fields.tip.lastUpdatedBy' })}
              placeholder={intl.formatMessage({ id: 'common.fields.ph.lastUpdatedBy' })}
              disabled={true}
            />
            <ProFormDatePicker
              rules={[
                {
                  required: false,
                },
              ]}
              name="lastUpdatedTime"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'common.fields.name.lastUpdatedTime' })}
              tooltip={intl.formatMessage({ id: 'common.fields.tip.lastUpdatedTime' })}
              placeholder={intl.formatMessage({ id: 'common.fields.ph.lastUpdatedTime' })}
              disabled={true}
            />
          </ProForm.Group>

        </div>
      </>;
    return content;
  }

  return (
    <Drawer
      title={intl.formatMessage({ id: 'mnt.top-img.title.detail' })}
      width={400}
      open={detailModalOpen}
      onClose={() => { onCancel() }}
      closable={true}
    >
      <ProForm
        formRef={formRef}
        initialValues={{}}
        request={async (params) => {
          var promis = detailEdfApp({ ...params }).then((rsp) => { return rsp.data; });
          return Promise.resolve(promis);
        }}
        onFinish={async (formData: any) => { onFinish() }}
        submitter={{
          render: (props, doms) => {
            return [
              <Button
                type='primary'
                key="submit"
                onClick={() => { }}
              >
                {intl.formatMessage({ id: 'common.opt.copy' })}
              </Button>,
              <Button
                key="rest"
                onClick={() => { }}
              >
                {intl.formatMessage({ id: 'common.opt.other' })}
              </Button>,
            ];
          },
        }}>
        {renderContent()}
      </ProForm>
    </Drawer>
  );
};

export default DetailForm;
