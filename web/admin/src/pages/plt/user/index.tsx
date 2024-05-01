import { listEdfApp, addEdfApp, deleteEdfApp, updateEdfApp, exportEdfApp } from './service';
import { SearchOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form, Input, message, Space, ConfigProvider, Row, Col, Modal } from 'antd';
import React, { useRef, useState, useContext } from 'react';
import type { } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import DetailForm from './components/DetailForm';
import SearchForm from './components/SearchForm';
import { useStyle } from './style';
import { dateTimestamp } from '../../../util';

const Index: React.FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [advanceSearch, setAdvanceSearch] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();
  const FormItem = Form.Item;
  const { confirm } = Modal;

  const Add = async (fields: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.top-img.msg.add.loading' }));
    return await addEdfApp({ ...fields }).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return rsp.success;
    });
  };

  const Update = async (fields: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.top-img.msg.update.loading' }));
    return await updateEdfApp({ ...fields }).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return rsp.success;
    });
  };

  const Delete = async (selectedRows: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.top-img.msg.delete.loading' }));
    if (!selectedRows) return true;

    return await deleteEdfApp({ ids: selectedRows.map((row: any) => { return { id: row.id } }) }).then(rsp => {
      hide();
      messageApi.open({
        type: rsp.success ? 'success' : 'error', content: rsp.msg, duration: 3, className: '-', style: { marginTop: '6vh' },
      });
      return rsp.success;
    });
  };

  const Export = async (record: any, formRef: any, advanceSearch: any) => {
    const hide = message.loading(intl.formatMessage({ id: 'mnt.top-img.msg.export.loading' }));
    await exportEdfApp(record, formRef, advanceSearch).then((rsp) => {
      hide();
      message.success(intl.formatMessage({ id: 'mnt.top-img.msg.export.success' }));

      var fileName = `${intl.formatMessage({ id: 'mnt.top-img.title.list' })}-${dateTimestamp()}.xlsx`;
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

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (<FormattedMessage id="mnt.top-img.fields.name.id" />),
      dataIndex: 'id',
      sorter: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setDetailModalOpen(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="mnt.top-img.fields.name.type" />,
      dataIndex: 'appName',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: (<FormattedMessage id="mnt.top-img.fields.name.path" />),
      dataIndex: 'appDesc',
      sorter: true,
      renderText: (val: string) => `${val}`,
    },
    {
      title: <FormattedMessage id="mnt.top-img.fields.name.dataStatus" />,
      dataIndex: 'dataStatus',
      valueEnum: {
        "-1": {
          text: (<FormattedMessage id="common.fields.enum.dataStatus.deleted" />),
          status: 'Error',
        },
        0: {
          text: (<FormattedMessage id="common.fields.enum.dataStatus.deleted" />),
          status: 'Error',
        },
        1: {
          text: (<FormattedMessage id="common.fields.enum.dataStatus.valid" />),
          status: 'Success',
        }
      },
    },
    {
      title: <FormattedMessage id="common.fields.name.lastUpdatedBy" />,
      dataIndex: 'lastUpdatedBy',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="common.fields.name.lastUpdatedTime"
        />
      ),
      sorter: true,
      dataIndex: 'lastUpdatedTime',
      valueType: 'dateTime',
    },
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
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setDetailModalOpen(true);
          }}>
          <FormattedMessage id="common.opt.detail" />
        </a>,
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
            <Button onClick={() => { actionRef?.current?.reloadAndRest?.(); }}>{intl.formatMessage({ id: 'mnt.top-img.btn.search' })}</Button>
            <a type="primary" onClick={() => { setSearchModalOpen(true); }}  >
              {intl.formatMessage({ id: 'mnt.top-img.btn.advSearch' })}
            </a>
            <a type="primary" onClick={() => {
              setAdvanceSearch(undefined);
              searchFormRef.current.resetFields();
              actionRef?.current?.reloadAndRest?.();
            }}
            >
              {intl.formatMessage({ id: 'mnt.top-img.btn.restReload' })}
            </a>
          </Space>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Space >
            <Button onClick={() => { setCreateModalOpen(true); }} type='primary'>{intl.formatMessage({ id: 'mnt.top-img.btn.create' })}</Button>
            <Button onClick={() => { Export({}, searchFormRef, advanceSearch) }}>{intl.formatMessage({ id: 'common.opt.export' })}</Button>
          </Space>
        </Col>
      </Row>

      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={
          wrapSSR(<>
            <label className={`${className}-table-title ${hashId}`.trim()}>
              {intl.formatMessage({ id: 'mnt.top-img.title.list' })}
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
        request={(params, sort, filter) => {
          return Promise.resolve(listEdfApp({
            ...params,
            search: searchFormRef.current?.getFieldValue("search"),
          }, advanceSearch, sort))
        }}
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

      <UpdateForm
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
      />

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
