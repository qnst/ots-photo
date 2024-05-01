import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Form } from 'antd';
import React from 'react';

export type FormValueType = {} & Partial<any>;

export type CreateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    createModalOpen: boolean;
    initValues: Partial<any>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const { onCancel, onSubmit, createModalOpen, initValues } = props;

    const onFinish = async () => {
        const fieldsValue = await form.validateFields();
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
            title={intl.formatMessage({ id: 'mnt.top-img.title.create' })}
            width={400}
            initialValues={initValues}
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => { onCancel() },
            }}
            open={createModalOpen}
            onFinish={onFinish}
        >
            {renderContent()}
        </ModalForm>
    );
};

export default CreateForm;
