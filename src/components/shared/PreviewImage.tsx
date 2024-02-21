import * as React from 'react'
import {CardMedia} from '@mui/material'

const thumb: any = {
    display: 'inline-flex',
    height: 250,
    padding: 4
}

const thumbInner = {
    display: 'flex',
    minWidth: 0
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
}

const thumbsContainer: any = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'center'
}

interface IPreviewImageProps {
    imageSrc: string | null
    alt?: string
}

const PreviewImage = (props: IPreviewImageProps) => {

    const {imageSrc, alt} = props

    return imageSrc ? <CardMedia
        sx={{
            height: 250,
            backgroundSize: 'contain',
            margin: '6px'
        }}
        title="preview"
    >
        <aside style={thumbsContainer}>
            <div style={thumb} key="predict_artbank">
                <div style={thumbInner}>
                    <img style={img}
                         src={imageSrc}
                         alt={alt || 'Preview'}
                    />
                </div>
            </div>
        </aside>
    </CardMedia> : <></>
}

export default PreviewImage
