import React from 'react'
import Table from './table'
import 'jspdf-autotable'


export default function ReportListItem({ searchOption }) {


    return (
        <>
            <Table
                searchOptions={searchOption}
            />
        </>
    )
}
