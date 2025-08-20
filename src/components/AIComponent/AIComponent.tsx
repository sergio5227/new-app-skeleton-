import React from 'react';
import { Badge, Grid, Stack, Tabs, Tab, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import { Button } from 'react-bootstrap';
import ModalComponent from '../Modal/index';
import useAIComponent from './useAIComponent';

export interface AIComponentProps {
    envarFoto?: (foto: any, user: string) => void;
    envarFotos?: (fotos: any, user: string) => void;
    envarVoz?: (voz: any, user: string) => void;
    envarVoces?: (voces: any, user: string) => void;
    procesando?: any;
    maxPhotosAllowed:number
    maxRecordingsAllowed:number
}

const AIComponent: React.FC<AIComponentProps> = (props) => {
    
    const {
        value,
        setValue,
        a11yProps,
        inicializaServicio,
        CustomTabPanel,
        errorInicializar,
        isMobile,
        takePhoto,
        inputImageRef,
        enviarFotosLista,
        photos,
        videoRef,
        canvasRef,
        deletePhoto,
        sendPhoto,
        isRecording,
        startRecording,
        inputAudioRef,
        stopRecording,
        recordings,
        enviarTodasGrabaciones,
        counter,
        canvasRef_,
        deleteRecording,
        sendRecording,
        setIsAlertOpen,
        isAlertOpen,
        mensajeAlert,
        handleImageUpload,
        handleAudioUpload
    } = useAIComponent(props);


    return (
        <Box sx={{ p: 2, backgroundColor:'#fff' }}>

            <Tabs value={value} onChange={(_, val) => setValue(val)} variant="fullWidth">
                <Tab label="Imagen" {...a11yProps(0)} onClick={inicializaServicio} />
                <Tab label="Audio" {...a11yProps(1)} />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
                <Stack spacing={2}>
                    {!errorInicializar && (
                        <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
                            <Button variant="outline-primary" onClick={takePhoto}><CameraAltIcon /> Tomar Foto</Button>
                            <Button variant="outline-secondary" onClick={() => inputImageRef.current?.click()}>
                                📁 Subir imagen
                            </Button>

                            {photos.length > 1 && <Button variant="outline-success" onClick={enviarFotosLista}>Enviar Todas</Button>}
                        </Stack>
                    )}

                    {errorInicializar ? (
                        <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
                            <p className="alert alert-info">la camara no se pudo activar</p>
                            <Button variant="outline-secondary" onClick={() => inputImageRef.current?.click()}>
                                📁 Subir imagen
                            </Button>
                            {photos.length > 1 && <Button variant="outline-success" onClick={enviarFotosLista}>Enviar Todas</Button>}
                        </Stack>

                    ) : (
                        <>
                            <video ref={videoRef} style={{ width: '100%', maxHeight: 400 }} autoPlay muted playsInline />
                            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
                        </>
                    )}

                    {props.procesando && <CircularProgress />}

                    <Grid container spacing={2}>
                        {photos.map((photo:any) => (
                            <Grid size={{ xs: 12, md: 6, xl: 12, sm:6 }} key={photo.id}>
                                <Badge badgeContent={photo.id} color="info">
                                    <img src={photo.foto} alt={`foto-${photo.id}`} style={{ width: '150PX', borderRadius: 8 }} />
                                </Badge>
                                <Stack direction="row" spacing={1} mt={1}>
                                    <Button variant="outline-danger" onClick={() => deletePhoto(photo.id)}><DeleteIcon /> Eliminar</Button>
                                    <Button variant="outline-primary" onClick={() => sendPhoto(photo, photo.id)}><AddAPhotoIcon /> Enviar</Button>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Stack spacing={2}>
                    <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
                        <Button disabled={isRecording} variant="outline-primary" onClick={startRecording}><MicTwoToneIcon /> Iniciar</Button>
                        <Button variant="outline-secondary" onClick={() => inputAudioRef.current?.click()}>
                            🎵 Subir audio
                        </Button>
                        {isRecording && <Button variant="outline-danger" onClick={stopRecording}>Detener</Button>}
                        {recordings.length > 1 && <Button variant="outline-success" onClick={enviarTodasGrabaciones}>Enviar Todas</Button>}
                    </Stack>

                    {isRecording && <p>Grabando... Restan {counter} segundos</p>}
                    <canvas ref={canvasRef_} width="640" height="100" style={{ backgroundColor: '#fff', width: '100%', height: isRecording ? 80 : 0 }} />

                    {props.procesando && <CircularProgress />}

                    <Grid container spacing={2}>
                        {recordings.map((rec:any) => (
                            <Grid size={{ xs: 12, md: 6, sm:6 }} key={rec.id}>
                                <Badge badgeContent={rec.id} color="info">
                                    <audio controls src={rec.audio.url}>
                                        <track kind="captions" src="captions.vtt" label="English" default />
                                    </audio>
                                </Badge>
                                <Stack direction="row" spacing={1} mt={1}>
                                    <Button variant="outline-danger" onClick={() => deleteRecording(rec.id)}><DeleteIcon /> Eliminar</Button>
                                    <Button variant="outline-primary" onClick={() => sendRecording(rec, rec.id)}><SendIcon /> Enviar</Button>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </CustomTabPanel>

            <ModalComponent handleClose={() => setIsAlertOpen(false)} isOpen={isAlertOpen}>
                <p>{mensajeAlert}</p>
            </ModalComponent>

            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                ref={inputImageRef}
                style={{ display: 'none' }}
            />

            <input
                type="file"
                accept="audio/*"
                multiple
                onChange={handleAudioUpload}
                ref={inputAudioRef}
                style={{ display: 'none' }}
            />

        </Box>
    );
};

export default AIComponent;
