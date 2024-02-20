import * as React from 'react'
import {useCallback, useEffect, useState} from 'react'
import {Card, Typography} from '@mui/material'
import DropZoneCard from '../shared/DropZoneCard'
import PreviewImage from '../shared/PreviewImage'
import {LoadingButton, Skeleton} from '@mui/lab'
import {CARD_HEIGHT} from '../constants'


const ArtBankPredictionCompontent = () => {

    // Local state
    const [contentArtBank, setContentArtBankNN] = useState<any>(undefined)
    const [predictionSrc, setPredictionSrc] = useState<string | null>(null)
    const [isFetchInPending, setIsFetchInPending] = useState(false)

    // clear prediction if contentArtBank is cleared
    useEffect(() => {
        if (!contentArtBank)
            setPredictionSrc(null)
    }, [contentArtBank])

    // unmount - clear state
    useEffect(() => () => {
        setContentArtBankNN(undefined)
        setPredictionSrc(null)
    }, [])

    const handleSubmit = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault()

        if (contentArtBank) {
            setIsFetchInPending(true)
            const formData = new FormData()
            formData.append('image', contentArtBank)

            fetch('http://127.0.0.1:5000/artbank-style-transfer', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Assuming the response contains a 'result_image' field with base64-encoded image
                    // const resultImageContainer = document.getElementById('resultImageContainer')
                    //
                    setPredictionSrc(data.result_image)
                    setIsFetchInPending(false)
                })
                .catch(error => {
                    console.error('Error:', error)
                })
                .finally(() => {
                    setIsFetchInPending(false)
                })
        } else {
            console.error('No file selected')
        }

    }, [contentArtBank])

    return <div className="row">
        <div className="col-12">

            <div className="row">

                <div className="col-6  d-flex flex-column align-items-center">
                    {/*Content image*/}
                    <Typography variant="subtitle1"
                                style={{fontWeight: 'bold'}}>Content image</Typography>

                    <DropZoneCard
                        uploadedFile={contentArtBank}
                        setUploadedFile={setContentArtBankNN}
                    />
                </div>

                <div className="col-6 d-flex flex-column align-items-center">
                    {/*Prediction image*/}
                    <Typography variant="subtitle1"
                                style={{fontWeight: 'bold'}}>Stylized image</Typography>

                    <Card className="w-100" sx={{height: CARD_HEIGHT}}>
                        {  isFetchInPending ?
                            <div className="col-6 offset-3 d-flex flex-column align-items-center pt-4">
                                <Skeleton variant="rectangular" width={260} height={60}/>
                            </div>
                            : <PreviewImage
                            imageSrc={predictionSrc ? `data:image/png;base64,${predictionSrc}` : null}
                            alt="ArtBank preview"
                        />}
                    </Card>
                </div>

                <div className="col-12 d-flex justify-content-end mt-2">
                    <LoadingButton
                        loading={isFetchInPending}
                        variant="contained"
                        disabled={!contentArtBank}
                        onClick={handleSubmit}>
                        Predict
                    </LoadingButton>
                </div>
            </div>

        </div>
    </div>
}

export default ArtBankPredictionCompontent
