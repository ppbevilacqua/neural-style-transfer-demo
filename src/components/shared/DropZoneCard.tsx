import * as React from 'react'
import {Dispatch, SetStateAction, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button, Card, CardActions, Typography} from '@mui/material'
import PreviewImage from './PreviewImage'
import {CARD_HEIGHT} from '../constants'

interface IDropZoneCardProps {
    uploadedFile: any
    setUploadedFile: Dispatch<SetStateAction<any>>
}

const DropZoneCard = (props: IDropZoneCardProps) => {

    const {uploadedFile, setUploadedFile} = props

    const handleFileChange = useCallback((acceptedFiles: any) => {

        const currFile = acceptedFiles?.[0] ? Object.assign((acceptedFiles?.[0] as Blob | MediaSource), {
            preview: URL.createObjectURL((acceptedFiles?.[0] as Blob | MediaSource))
        }) : undefined

        setUploadedFile(currFile)
    }, [setUploadedFile])

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: handleFileChange,
        maxFiles: 1,
        multiple: false
    })

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => uploadedFile && URL.revokeObjectURL(uploadedFile.preview)
    }, [uploadedFile])

    const deleteFile = useCallback(() => {
        setUploadedFile(undefined)
    }, [setUploadedFile])

    return <Card className="w-100" sx={{height: CARD_HEIGHT}}>
        {uploadedFile ? <>
            <PreviewImage
                imageSrc={uploadedFile.preview}
                alt="Loaded preview"
            />

            <CardActions className="d-flex justify-content-end">
                <Button size="small" onClick={deleteFile}>Delete</Button>
            </CardActions>
        </> : <div className="container mt-2 h-100">
            <div {...getRootProps({className: 'dropzone h-100'})}>
                <input {...getInputProps()} />
                <Typography variant="caption">
                    Drag 'n' drop some files here, or click to select files
                </Typography>
            </div>

        </div>}
    </Card>

}

export default DropZoneCard
