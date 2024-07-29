import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function TanantsLightbox(props) {

    const captions = [
        props.photo_detail
    ]

    return (
        <div className={props.datashow + ''} >
            <Lightbox
                mainSrc={props.src}
                onCloseRequest={props.close}
                imageCaption={captions[0]}
            />
        </div>
    )

}

export default TanantsLightbox;