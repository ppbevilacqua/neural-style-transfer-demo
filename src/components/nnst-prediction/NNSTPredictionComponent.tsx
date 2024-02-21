import * as React from 'react'
import {useCallback, useEffect, useState} from 'react'
import {Card, Checkbox, FormControlLabel, IconButton, TextField, Tooltip, Typography} from '@mui/material'
import DropZoneCard from '../shared/DropZoneCard'
import PreviewImage from '../shared/PreviewImage'
import {LoadingButton, Skeleton} from '@mui/lab'
import {CARD_HEIGHT} from '../constants'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const NNSTPredictionComponent = () => {

    // Local state
    const [contentNN, setContentNN] = useState<any>(undefined)
    const [styleNN, setStyleNN] = useState<any>(undefined)
    const [alpha, setAlpha] = useState<any>(0.75)
    const [isColorizeSelected, setColorize] = useState(false)
    const [predictionSrc, setPredictionSrc] = useState<string | null>(null)
    const [isFetchInPending, setIsFetchInPending] = useState(false)

    // clear state if contentNN and styleNN are cleared
    useEffect(() => {
        if (!contentNN && !styleNN) {
            setAlpha(0.75)
            setColorize(false)
            setPredictionSrc(null)
        }
    }, [contentNN, styleNN])

    // unmount - clear state
    useEffect(() => () => {
        setContentNN(undefined)
        setStyleNN(undefined)
        setAlpha(0.75)
        setColorize(false)
        setPredictionSrc(null)
    }, [])

    const handleSubmit = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault()

        if (contentNN && styleNN) {
            setIsFetchInPending(true)

            const formData = new FormData()
            formData.append('content', contentNN)
            formData.append('style', styleNN)
            formData.append('alpha', alpha + '')
            formData.append('colorize', isColorizeSelected + '')

            fetch('http://127.0.0.1:5000/nn-style-transfer', {
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

    }, [alpha, contentNN, isColorizeSelected, styleNN])

    return <div className="row">

        <div className="col-12">
            <div className="row">

                {/*Content image*/}
                <div className="col-6 d-flex flex-column align-items-center">
                    <Typography variant="subtitle1"
                                style={{fontWeight: 'bold'}}>Content image</Typography>

                    <DropZoneCard
                        uploadedFile={contentNN}
                        setUploadedFile={setContentNN}
                    />
                </div>

                {/*Style image*/}
                <div className="col-6 d-flex flex-column align-items-center">
                    <Typography variant="subtitle1"
                                style={{fontWeight: 'bold'}}>Style image</Typography>

                    <DropZoneCard
                        uploadedFile={styleNN}
                        setUploadedFile={setStyleNN}
                    />
                </div>

                <div className="col-4 mt-3">
                    <Typography variant="subtitle2">
                        Alpha
                        <Tooltip
                            title="alpha=1.0 corresponds to maximum content preservation, alpha=0.0 is maximum stylization"
                            placement="top">
                            <IconButton>
                                <InfoOutlinedIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </Typography>

                    <TextField id="alpha"
                               variant="standard"
                               inputProps={{
                                   type: 'number'

                               }}
                               value={alpha}
                               onChange={(event) => {
                                   setAlpha(event.target.value)
                               }}
                    />
                </div>

                <div className="col-6 d-flex align-items-center">
                    <FormControlLabel
                        label={
                            <Tooltip title="Use style colors for the stylized image" placement="top">
                                <span>
                                    Colorize
                                    <IconButton>
                                        <InfoOutlinedIcon fontSize="small"/>
                                    </IconButton>
                                </span>
                            </Tooltip>

                        }
                        control={<Checkbox
                            checked={isColorizeSelected}
                            onChange={() => setColorize(!isColorizeSelected)}
                            inputProps={{'aria-label': 'controlled'}}
                        />}
                    />
                </div>

                {/*Predict button*/}
                <div className="col-12 d-flex justify-content-end mt-2">
                    <LoadingButton
                        loading={isFetchInPending}
                        variant="contained"
                        disabled={!contentNN || !styleNN}
                        onClick={handleSubmit}>
                        Predict
                    </LoadingButton>
                </div>
            </div>

            {isFetchInPending ?
                <div className="col-6 offset-3 d-flex flex-column align-items-center">
                    <Skeleton variant="rectangular" width={260} height={60}/>
                </div>
                :
                predictionSrc ? <div className="row">
                    <div className="col-6 offset-3 d-flex flex-column align-items-center">
                        {/*Content image*/}
                        <Typography variant="subtitle1"
                                    style={{fontWeight: 'bold'}}>Stylized image</Typography>

                        <Card className="w-100" sx={{height: CARD_HEIGHT}}>
                            <PreviewImage
                                imageSrc={predictionSrc ? `data:image/png;base64,${predictionSrc}` : null}
                                alt="NNST preview"
                            />
                        </Card>
                    </div>
                </div> : <></>
            }

        </div>

    </div>
}

export default NNSTPredictionComponent
