import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

function ShowPdfTumbnail({ url }) {
    return (
        <div className='w-full flex justify-center align-center h-auto overflow-y-auto '>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                <div id="pdfviewer"  >
                    <Viewer
                        fileUrl={url}
                        initialPage={1}
                    />
                </div>
            </Worker>
        </div>
    )
}

export default ShowPdfTumbnail