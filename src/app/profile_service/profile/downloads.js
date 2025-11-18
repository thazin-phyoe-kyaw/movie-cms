"use client"
import { Table } from 'antd'
import { useState } from 'react'


export default function Downloads({data,closeDrawer}) {

    const [list,setList]=useState(data.data)
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        perPage: 10,
        total: data.total,
      });
    //  console.log(data)
    const filter = { userId : {value : data.userId, type:"id"}};
    const columns=[
        {
            title: "Title",
            dataIndex : ["title","titleMm"],
            align: "center",
        },
        {
            title: "DownLoadDate",
            dataIndex : "downloadDate",
            align: "center",
        }
       

    ]
  return (
    <Table columns={columns} dataSource={list}/>
  )
}

