import { listCategory, addCategory, deleteCategory, updateCategory, exportCategory } from './service';
import { DeleteRowOutlined, FullscreenOutlined, SearchOutlined, VerticalAlignBottomOutlined, InfoCircleOutlined, ReloadOutlined, MinusCircleOutlined, CloudUploadOutlined, Loading3QuartersOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, Input, message, Space, ConfigProvider, Row, Col, Modal } from 'antd';
import React, { useRef, useState, useContext } from 'react';
// import type { } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import DetailForm from './components/DetailForm';
import SearchForm from './components/SearchForm';
import UploadForm from './components/UploadForm';
import { useStyle } from './style';
import { dateTimestamp } from '../../../util';
import { PhotoProvider, PhotoView } from '@/edf/components/CzhPhoto';

const Index: React.FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [advanceSearch, setAdvanceSearch] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();
  const FormItem = Form.Item;
  const { confirm } = Modal;

  const List = async (params: any, sort: any, filter: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.category.msg.list.loading' }));
    return await listCategory({
      ...params, search: searchFormRef.current?.getFieldValue("search"),
    }, advanceSearch, sort
    ).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return {
        data: rsp.data.data,
        success: rsp.data.success,
        total: rsp.data.total,
      }
    });

    /*
    return Promise.resolve(listCategory({
      ...params,
      search: searchFormRef.current?.getFieldValue("search"),
    }, advanceSearch, sort))
    */
  }

  const Add = async (fields: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.category.msg.add.loading' }));
    return await addCategory({ ...fields }).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return rsp.success;
    });
  };

  const Update = async (fields: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.category.msg.update.loading' }));
    return await updateCategory({ ...fields }).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return rsp.success;
    });
  };

  const Delete = async (selectedRows: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.category.msg.delete.loading' }));
    if (!selectedRows) return true;

    return await deleteCategory({ ids: selectedRows.map((row: any) => { return { id: row.id } }) }).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return rsp.success;
    });
  };

  const Export = async (record: any, formRef: any, advanceSearch: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.category.msg.export.loading' }));
    await exportCategory(record, formRef, advanceSearch).then((rsp) => {
      hide();
      message.success(intl.formatMessage({ id: 'mnt.category.msg.export.success' }));

      var fileName = `${intl.formatMessage({ id: 'mnt.category.title.list' })}-${dateTimestamp()}.xlsx`;
      const blob = new Blob([rsp], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
      });

      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.target = 'blank';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, fileName);
        window.location.reload();
      }

      return true;
    });
  };

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      const element = document.querySelector('.PhotoView-Portal');
      if (element) {
        element.requestFullscreen();
      }
    }
  }

  const toolbarActions = ({ rotate, onRotate, onScale, scale, index, images }: any) => {
    return (
      <>
        <PlusCircleOutlined
          style={{ fontSize: 22, marginRight: 40, color: '#bfbdbd' }}
          onClick={() => onScale(scale + 0.5)} />

        <MinusCircleOutlined
          style={{ fontSize: 22, marginRight: 40, color: '#bfbdbd' }}
          onClick={() => onScale(scale - 0.5)} />

        <ReloadOutlined
          style={{ fontSize: 22, marginRight: 40, color: '#bfbdbd' }}
          onClick={() => onRotate(rotate + 90)} />

        {document.fullscreenEnabled && <FullscreenOutlined
          style={{ fontSize: 22, marginRight: 40, color: '#bfbdbd' }}
          onClick={toggleFullScreen} />}

        <VerticalAlignBottomOutlined style={{ fontSize: 22, marginRight: 40, color: '#bfbdbd' }}
          onClick={() => {
            window.open(images[index].download, "_blank");
          }}>
        </VerticalAlignBottomOutlined >
      </>
    );
  }

  const columns: ProColumns<any>[] = [
    {
      title: (<FormattedMessage id="mnt.category.fields.name.id" />),
      dataIndex: 'id',
      sorter: true,
      render: (dom, entity, index, action) => {
        // console.log(dom);
        // console.log(entity);
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setDetailModalOpen(true);
            }}
          >
            {entity.id.substring(0, 8)}
          </a>
        );
      },
    },
    {
      title: (<FormattedMessage id="mnt.category.fields.name.parent_id" />),
      dataIndex: 'parentName',
      sorter: true,
      renderText: (val: string) => `${val}`,
    },
    {
      title: <FormattedMessage id="mnt.category.fields.name.name" />,
      dataIndex: 'name',
      valueType: 'textarea',
      sorter: true,
      render: (dom, entity, index, action) => {
        return entity.name;
      }
    },
    {
      title: <FormattedMessage id="mnt.category.fields.name.price" />,
      dataIndex: 'price',
      valueType: 'textarea',
      sorter: true,
      render: (dom, entity, index, action) => {
        return entity.price != "" && entity.price != null ? "￥" + entity.price : "";
      }
    },
    {
      title: <FormattedMessage id="mnt.category.fields.name.remark" />,
      dataIndex: 'remark',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: <FormattedMessage id="mnt.category.fields.name.thumb" />,
      dataIndex: 'thumb',
      valueType: 'textarea',
      sorter: true,
      width: '50%',
      render: (dom, entity) => {

        // border: '1px solid rgb(222, 226, 231)', height: 40, width: 40, marginRight: 10, marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'

        var img = entity?.images?.map((x: any) => {
          return <>
            {/* <img alt="t1" style={{ height: '60px', width: '120px', marginRight: 5, marginBottom: 5 }} src={x.path} /> */}
            <PhotoView src={`${x.path}`} download={`${x.path}`}>
              {/* style={{
                border: '1px solid rgb(222, 226, 231)', height: 60, width: 120, marginRight: 10, marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between'
              }} */}
              <div >
                <img src={`${x.path}`} style={{ margin: '5px', width: '120px', height: '60px', maxWidth: '100%', maxHeight: '100%' }}></img>
              </div>
            </PhotoView>
          </>
        });

        var act = <>
          {entity.parentId != null && entity.parentId != "" &&
            <a
              onClick={() => {
                setCurrentRow(entity);
                setUploadModalOpen(true);
              }}
              style={{ fontSize: 10 }}
            >
              上传照片
            </a>}
        </>;

        var html =
          <>
            <PhotoProvider
              toolbarRender={toolbarActions}
              maskOpacity={0.9}
              maskClosable={true}
            >
              <div style={{ marginBottom: 5, display: 'flex', flexWrap: 'wrap' }}>
                {img}
              </div>
            </PhotoProvider>
            <br />
            {act}
          </>;

        return html;
      },
    },
    // {
    //   title: <FormattedMessage id="mnt.category.fields.name.dataStatus" />,
    //   dataIndex: 'dataStatus',
    //   valueEnum: {
    //     "-1": {
    //       text: (<FormattedMessage id="common.fields.enum.dataStatus.deleted" />),
    //       status: 'Error',
    //     },
    //     0: {
    //       text: (<FormattedMessage id="common.fields.enum.dataStatus.deleted" />),
    //       status: 'Error',
    //     },
    //     1: {
    //       text: (<FormattedMessage id="common.fields.enum.dataStatus.valid" />),
    //       status: 'Success',
    //     }
    //   },
    // },
    // {
    //   title: <FormattedMessage id="common.fields.name.lastUpdatedBy" />,
    //   dataIndex: 'lastUpdatedBy',
    //   valueType: 'textarea',
    // },
    // {
    //   title: (
    //     <FormattedMessage id="common.fields.name.lastUpdatedTime"
    //     />
    //   ),
    //   sorter: true,
    //   dataIndex: 'lastUpdatedTime',
    //   valueType: 'dateTime',
    // },
    {
      title: <FormattedMessage id="common.opt.opt" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            setUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="common.opt.update" />
        </a>,
        // <a
        //   key="detail"
        //   onClick={() => {
        //     setCurrentRow(record);
        //     setDetailModalOpen(true);
        //   }}>
        //   <FormattedMessage id="common.opt.detail" />
        // </a>,
        <a
          key="delete"
          onClick={async () => {
            await Delete([record]);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <FormattedMessage id="common.opt.delete" />
        </a>,
      ],
    },
  ];

  const { Search } = Input;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('edf-app');
  const { wrapSSR, hashId } = useStyle(className);

  const ref = useRef<ProFormInstance>();
  const searchFormRef = useRef<any>();

  return (

    <PageContainer>
      {contextHolder}
      <Row>
        <Col span={18} >
          <Space style={{ marginBottom: 10 }}  >
            <Form ref={searchFormRef}>
              <FormItem
                style={{ marginBottom: 0 }}
                label=""
                name="search"
                rules={[{ required: false, message: `${intl.formatMessage({ id: 'common.fields.rule.search' })}` }]}
              >
                <Input placeholder={intl.formatMessage({ id: 'common.fields.ph.search' })}
                  style={{ width: '280px' }}
                  prefix={<SearchOutlined className="site-form-item-icon" />}
                  allowClear={true}
                  onChange={(e: any) => { actionRef?.current?.reloadAndRest?.(); }}
                  onPressEnter={(e: any) => { actionRef?.current?.reloadAndRest?.(); }}></Input>
              </FormItem>
            </Form>
            <Button onClick={() => { actionRef?.current?.reloadAndRest?.(); }}>{intl.formatMessage({ id: 'mnt.category.btn.search' })}</Button>
            <a type="primary" onClick={() => { setSearchModalOpen(true); }}  >
              {intl.formatMessage({ id: 'mnt.category.btn.advSearch' })}
            </a>
            <a type="primary" onClick={() => {
              setAdvanceSearch(undefined);
              searchFormRef.current.resetFields();
              actionRef?.current?.reloadAndRest?.();
            }}
            >
              {intl.formatMessage({ id: 'mnt.category.btn.restReload' })}
            </a>
          </Space>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Space >
            <Button onClick={() => { setCreateModalOpen(true); }} type='primary'>{intl.formatMessage({ id: 'mnt.category.btn.create' })}</Button>
          </Space>
        </Col>
      </Row>

      <ProTable<any, any>
        headerTitle={
          wrapSSR(<>
            <label className={`${className}-table-title ${hashId}`.trim()}>
              {intl.formatMessage({ id: 'mnt.category.title.list' })}
            </label>
          </>)
        }
        style={{}}
        className={`${className}-table-all ${hashId}`.trim()}
        actionRef={actionRef}
        options={false}
        rowKey="id"
        search={false}
        form={{
          className: `${className}-table-search-form ${hashId}`.trim(),
          labelAlign: 'left',
          size: 'middle',
          prefixCls: `${className}-table-search-form-itm ${hashId}`.trim()
        }}
        formRef={ref}
        toolbar={{
          actions: [],
        }}
        request={(params, sort, filter) => { return List(params, sort, filter) }}
        pagination={{ pageSize: 10 }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await Delete(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="common.opt.batchDeletion" />
          </Button>
          <Button type="primary" style={{ marginRight: -10 }}>
            <FormattedMessage id="common.opt.batchApproval" />
          </Button>
        </FooterToolbar>
      )}

      {uploadModalOpen && <UploadForm
        onSubmit={async (value) => {
          const success = await Update(value);
          setUploadModalOpen(false);
          setCurrentRow(undefined);
          actionRef?.current?.reload();
        }}
        onCancel={() => {
          setUploadModalOpen(false);
          if (!uploadModalOpen) {
            setCurrentRow(undefined);
          }
        }}
        uploadModalOpen={uploadModalOpen}
        initValues={currentRow || {}}
      />}

      <CreateForm
        onSubmit={async value => {
          const success = await Add(value);
          setCreateModalOpen(false);
          actionRef?.current?.reload();
        }}
        onCancel={() => {
          setCreateModalOpen(false)
        }}
        createModalOpen={createModalOpen}
        initValues={{}}
      />

      {updateModalOpen && <UpdateForm
        onSubmit={async (value) => {
          const success = await Update(value);
          setUpdateModalOpen(false);
          setCurrentRow(undefined);
          actionRef?.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalOpen(false);
          if (!updateModalOpen) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        initValues={currentRow || {}}
      />}

      <DetailForm
        onSubmit={async (value) => {
          const success = await Update(value);
          if (success) {
            setDetailModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setDetailModalOpen(false);
          if (!detailModalOpen) {
            setCurrentRow(undefined);
          }
        }}
        detailModalOpen={detailModalOpen}
        initValues={currentRow || {}}
        columns={columns}
      />

      <SearchForm
        onSubmit={async (value) => {
          setAdvanceSearch(value);
          setSearchModalOpen(false);
          actionRef.current?.reloadAndRest?.();
        }}
        onCancel={() => {
          setSearchModalOpen(false);
          actionRef.current?.reloadAndRest?.();
        }}
        onOpenChange={setSearchModalOpen}
        searchModalOpen={searchModalOpen}
        initValues={{}}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Index;
