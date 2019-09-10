import React, { PureComponent, Fragment } from 'react';
import { Table } from 'antd';

class TableLayout extends PureComponent {

    state = {}

    render() {
        const { tableType, columns, dataSource, changeSelected, changeRow, scroll, selectedRowKeys, rowKey } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys ? selectedRowKeys[0] : 0,
            onChange: (selectedRowKeys, selectedRows) => {
                changeRow(selectedRowKeys, selectedRows);
            }
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                changeSelected(selectedRowKeys, selectedRows);
            }
        }

        return (
            <Fragment>
                {
                    tableType === 'default' &&
                    <Table
                        bordered
                        rowKey={rowKey}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={scroll}
                    />
                }
                {
                    tableType === 'radio' &&
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        pagination={false}
                    />
                }
                {
                    tableType === 'checkbox' &&
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowCheckSelection}
                        pagination={false}
                    />
                }
            </Fragment>
        );
    }
}

export default TableLayout;