import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Form } from 'antd';
import React, { useEffect } from 'react';
import { listCategory, addCategory, deleteCategory, updateCategory, exportCategory } from '../service';

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

    useEffect(() => {

    }, []);

    var renderContent = () => {
        var content =
            <>
                <div style={{ marginTop: 20 }}>
                    <ProFormSelect
                        rules={[
                            {
                                required: false,
                                message: intl.formatMessage({ id: 'mnt.category.fields.rule.parent_id' })
                            },
                        ]}
                        name="parentId"
                        request={async () => {
                            let arr: any = [];
                            let rsp = await listCategory({ current: 1, pageSize: 1000 });
                            console.log("tttttttttttttttttttt",rsp);
                            arr = rsp.data.data.filter((f: any) => f.parentId == "" || f.parentId == null).map((v: any) => {
                                return {
                                    label: v.name,
                                    value: v.id
                                }
                            });

                            console.log("xxxxxxxxxxx",arr);
                            return arr;
                        }}
                        placeholder={intl.formatMessage({ id: 'mnt.category.fields.ph.parent_id' })}
                    />
                    <ProFormText
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'mnt.category.fields.rule.name' })
                            },
                        ]}
                        name="name"
                        placeholder={intl.formatMessage({ id: 'mnt.category.fields.ph.name' })}
                    />
                    <ProFormText
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'mnt.category.fields.rule.price' })
                            },
                        ]}
                        name="price"
                        placeholder={intl.formatMessage({ id: 'mnt.category.fields.ph.price' })}
                    />
                    <ProFormTextArea
                        name="remark"
                        placeholder={intl.formatMessage({ id: 'mnt.category.fields.ph.remark' })} />
                </div>
            </>;
        return content;
    }

    return (
        <ModalForm
            title={intl.formatMessage({ id: 'mnt.category.title.create' })}
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
