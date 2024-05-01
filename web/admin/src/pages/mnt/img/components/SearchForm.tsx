import { ProForm, ProFormText, ProFormDatePicker } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Drawer } from 'antd';
import React, { useState, useRef } from 'react';

export type FormValueType = {} & Partial<API.RuleListItem>;

export type SearchFormProps = {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  searchModalOpen: boolean;
  initValues: Partial<any>;
  columns: any,
  onOpenChange: any
};

const SearchForm: React.FC<SearchFormProps> = (props) => {
  const intl = useIntl();
  const [fieldWidth, setFieldWidth] = useState<any>('lg');
  const formRef = useRef<ProFormInstance>();
  const { onCancel, onSubmit, searchModalOpen, initValues, columns, onOpenChange } = props;
  
  const onFinish = async () => {
    const fieldsValue = await formRef.current?.validateFieldsReturnFormatValue?.(); 
    onSubmit(fieldsValue);
  }

  var renderContent = () => {
    var content =
      <>
        <div style={{ marginTop: 0 }}>
          <ProForm.Group>
            <ProFormText
              name="id"
              width={fieldWidth}
              label={intl.formatMessage({ id: 'mnt.top-img.fields.name.id' })}
              tooltip={intl.formatMessage({ id: 'mnt.top-img.fields.tip.appId' })}
              placeholder={intl.formatMessage({ id: 'mnt.top-img.fields.ph.appId' })}
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
            />
          </ProForm.Group>
        </div>
      </>;
    return content;
  }

  return (
    <Drawer
      title={intl.formatMessage({ id: 'mnt.top-img.title.search' })}
      width={400}
      open={searchModalOpen}
      onClose={() => { onCancel() }}
      closable={true}
    >
      <ProForm
        formRef={formRef}
        initialValues={initValues}
        onFinish={async (formData: any) => { onFinish() }}
        submitter={{ 
          render: (props, doms) => {
            console.log(props);
            return [
              <Button
                type='primary'
                key="submit"
                onClick={() => props.form?.submit?.()}
              >
                {intl.formatMessage({ id: 'mnt.top-img.btn.advSearch' })}
              </Button>,
              <Button
                key="rest"
                onClick={() => {
                  props.form?.resetFields(); 
                }}
              >
                {intl.formatMessage({ id: 'mnt.top-img.btn.restReload' })}
              </Button>,
            ];
          },
        }}>
        {renderContent()}
      </ProForm>
    </Drawer> 
  );
};

export default SearchForm;
