import React, { useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';


function PdfThumbnail({ url, onClick }) {

    return (
        <div onClick={() => onClick(url)} className='w-[100px] h-[100px]  overflow-hidden rounded-md object-center'>

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">

                <div id="pdfThumbnail" className='bg-[#fff]' >
                    <Viewer fileUrl={url} />
                </div>
            </Worker>
        </div>
    )
}

export default PdfThumbnail