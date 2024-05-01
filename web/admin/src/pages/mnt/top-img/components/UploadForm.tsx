import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Form, Row, Col, Alert, Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import type { GetProp, UploadFile, UploadProps, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios, { isCancel, AxiosError } from 'axios';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export type FormValueType = {} & Partial<API.RuleListItem>;
const FormItem = Form.Item;

export type UploadFormProps = {
    onCancel: (flag?: boolean, formVals?: any) => void;
    onSubmit: (values: any) => Promise<void>;
    uploadModalOpen: boolean;
    initValues: Partial<any>;
};

const UploadForm: React.FC<UploadFormProps> = (props) => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const { onCancel, onSubmit, uploadModalOpen, initValues } = props;

    useEffect(() => { }, [])

    const onFinish = async () => {

        const fieldsValue = await form.validateFields();

        var file = getFile();

        fieldsValue.id = initValues.id;
        fieldsValue.path = file.response.data.data.path + file.response.data.data.name;
        fieldsValue.type = 1;
        fieldsValue.name = file.response.data.data.origin_name;
        fieldsValue.info = file.originFileObj.type + "|" + file.originFileObj.size;

        form.resetFields();
        setFileList([]);
        onSubmit(fieldsValue);
    }

    const getFile = () => {
        let items = fileList.map((item: any) => {
            if (item.response.data.code == 200) {
                return item;
            }
        });

        return items.length > 0 ? items[0] : null;
    }

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-3',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-xxx',
        //     percent: 50,
        //     name: 'image.png',
        //     status: 'uploading',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
    ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        // console.log("the new list", newFileList);
    }


    const handleUpload = async (options: any) => {
        // console.log("handle upload", options);

        //http://localhost:5002/
        var uploadUrl = "/v1/mng/core/image-upload";

        const formData = new FormData();
        formData.append('file', options.file);
        formData.append('fileName', options.file.name);
        formData.append('fileFullName', options.file.name);
        formData.append('fileSize', options.file.size);
        formData.append('fileDir', "top");

        // var uploadParam = {
        //     "fileName": options.file.name,
        //     "fileFullName": options.file.name,
        //     "fileSize": options.file.size,
        //     "fileDir": "top"
        // };

        axios.post(uploadUrl, formData, {
            headers: { 'qn-token': localStorage.getItem('qn-token') || '', "qn-token-extral": "ots-photography" },
        }).then((rsp) => {

            // console.log("axios upload", rsp);

            if (rsp.data.code == 200) {
                // options.onSuccess({ code: 0, data: options.successList })
                options.onSuccess({ code: 0, data: rsp.data })
            }
            else {
                options.onError()
            }

            // console.log("tttttttttt",options.successList);
        })
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    var renderContent = () => {
        var content =
            <>
                <Row >
                    <Col span={24}>
                        <Alert
                            message="小程序顶部轮播图"
                            description="请上传1-5张图片，每张图片不超过2M."
                            type="info"
                            showIcon
                        />
                    </Col>

                </Row>
                <br />
                <Row>
                    <FormItem label="" name="path" rules={[{ required: false, message: intl.formatMessage({ id: 'mnt.top-img.title.upload' }) }]}>
                        <Upload
                            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            customRequest={handleUpload}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                    </FormItem>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="t1" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Row>
            </>;
        return content;
    }

    return (
        <ModalForm
            title={intl.formatMessage({ id: 'mnt.top-img.title.upload' })}
            width={400}
            initialValues={initValues || {}}
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => { onCancel() },
            }}
            open={uploadModalOpen}
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

export default UploadForm;
