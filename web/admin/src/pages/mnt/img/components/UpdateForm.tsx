import { ModalForm, ProFormText, ProFormTextArea, } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Form } from 'antd';
import React, { useEffect } from 'react';

export type FormValueType = {} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => Promise<void>;
  updateModalOpen: boolean;
  initValues: Partial<any>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { onCancel, onSubmit, updateModalOpen, initValues } = props;

  useEffect(() => { }, [])

  const onFinish = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.id = initValues.id;
    form.resetFields();
    onSubmit(fieldsValue);
  }

  var renderContent = () => {
    var content =
      <>
        <div style={{ marginTop: 20 }}>
          <ProFormText
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'mnt.top-img.fields.rule.appName' })
              },
            ]}
            name="appName"
            placeholder={intl.formatMessage({ id: 'mnt.top-img.fields.ph.appName' })}
          />
          <ProFormTextArea
            name="appDesc"
            placeholder={intl.formatMessage({ id: 'mnt.top-img.fields.ph.appDesc' })} />
        </div>
      </>;
    return content;
  }

  return (
    <ModalForm
      title={intl.formatMessage({ id: 'mnt.top-img.title.update' })}
      width={400}
      initialValues={initValues || {}}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => { onCancel() },
      }}
      open={updateModalOpen}
      onFinish={onFinish}
      onInit={() => {
        form?.resetFields();
        form?.setFieldsValue(initValues);
      }}
    >
      {renderContent()}
    </ModalForm>
  );
};

export default UpdateForm;
