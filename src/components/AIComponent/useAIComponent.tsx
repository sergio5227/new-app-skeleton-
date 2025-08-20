import { Box } from "@mui/material";
import { AIComponentProps } from "./AIComponent"
import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";


const useAIComponent = (props: AIComponentProps) => {

    function CustomTabPanel(props: any) {
        const { children, value, index, ...other } = props;
        return (
            <div role="tabpanel" hidden={value !== index} {...other}>
                {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: any) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const inputImageRef = useRef<HTMLInputElement>(null);
    const inputAudioRef = useRef<HTMLInputElement>(null);
    const user: any = useSelector((state: any) => state?.app?.user?.data?.id || false);
    const [value, setValue] = useState(0);
    const [recordings, setRecordings] = useState<any[]>([]);
    const [photos, setPhotos] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [errorInicializar, setErrorInicializar] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const videoRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);
    const canvasRef_ = useRef<any>(null);
    const mediaRecorderRef = useRef<any>(null);
    const audioChunksRef = useRef<any>([]);
    const audioContextRef = useRef<any>(null);
    const analyserRef = useRef<any>(null);
    const [animationId, setAnimationId] = useState<any>(null);
    const [counter, setCounter] = useState(129);
    let myInterval: any = null;
    let mytimeoutID: any = null;

    useEffect(() => {
        const userAgent = navigator.userAgent /* || navigator.vendor  */ || (window as any)?.opera;
        setIsMobile(/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
        if (!window.MediaRecorder) {
            setMensajeAlert("Tu navegador no soporta grabación de audio.");
            setIsAlertOpen(true);
        }
    }, []);

    const inicializaServicio = useCallback(() => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: isMobile
                ? { width: 320, height: 240, facingMode: { exact: 'environment' } }
                : { width: 320, height: 240 },
        })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch(() => setErrorInicializar(true));
    }, [isMobile]);


    useEffect(() => {
        inicializaServicio();
    }, [inicializaServicio]);

    const takePhoto = () => {
        if (photos.length >= props?.maxPhotosAllowed) {
            setMensajeAlert('Máximo de fotos alcanzado');
            setIsAlertOpen(true);
            return;
        }
        if (!canvasRef.current || !videoRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(videoRef.current, 0, 0, 640, 480);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setPhotos([...photos, { id: photos.length + 1, foto: dataUrl, parametro: null }]);
    };

    useEffect(() => {
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [animationId]);



    const deletePhoto = (id: number) => setPhotos(photos.filter((p: any) => p.id !== id));
    const sendPhoto = (photo: any, id: number) => {
        props.envarFoto?.(photo, user);
        deletePhoto(id);
    };
    const enviarFotosLista = () => {
        props.envarFotos?.(photos, user);
        setPhotos([]);
    };

    const startRecording = async () => {
        // Si no existe soporte para MediaRecorder
        if (!window.MediaRecorder) {
            setMensajeAlert("Tu navegador no soporta grabación de audio.");
            setIsAlertOpen(true);
            return;
        }

        // Límite de grabaciones
        if (recordings.length > props?.maxRecordingsAllowed) {
            setMensajeAlert("Máximo de grabaciones alcanzado");
            setIsAlertOpen(true);
            return;
        }

        try {
            // Si había una grabación previa, la detenemos y liberamos recursos
            if (mediaRecorderRef.current) {
                try {
                    mediaRecorderRef.current.stop();
                } catch (e) {
                    console.log(e)
                 }
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }

            // Pedir acceso al micrófono
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Micrófono abierto:", stream);

            // Crear contexto de audio y analizador
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            // Crear el MediaRecorder
            const mediaRecorder = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const url = URL.createObjectURL(blob);

                setRecordings((prev) => [
                    ...prev,
                    { id: prev.length + 1, audio: { blob, url } }
                ]);

                // Liberar el micrófono
                stream.getTracks().forEach((track) => track.stop());
                console.log("Micrófono liberado");
            };

            // Guardar referencias
            mediaRecorderRef.current = mediaRecorder;
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            // Iniciar grabación
            mediaRecorder.start();
            setIsRecording(true);
            visualize(analyser);

            // Contador y auto-stop en 129 segundos
            setInterval(() => setCounter((c) => c - 1), 1000);
            setTimeout(() => mediaRecorder.stop(), 129000);

        } catch (err: any) {
            console.error("Error al iniciar grabación:", err.name, err.message);

            let msg = "Ocurrió un error al acceder al micrófono.";
            if (err.name === "NotAllowedError") {
                msg = "Permiso denegado para usar el micrófono.";
            } else if (err.name === "NotFoundError") {
                msg = "No se encontró un dispositivo de micrófono disponible.";
            } else if (err.name === "NotReadableError") {
                msg = "El micrófono está en uso por otra aplicación o pestaña.";
            }

            setMensajeAlert(msg);
            setIsAlertOpen(true);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        cancelAnimationFrame(animationId);
        clearInterval(myInterval);
        clearTimeout(mytimeoutID);
        setCounter(129);
        if (audioContextRef.current?.state !== 'closed') {
            audioContextRef.current.close();
        }
    };

    const deleteRecording = (id: number) => setRecordings(recordings.filter((r: any) => r.id !== id));
    const sendRecording = (rec: any, id: number) => {
        props.envarVoz?.(rec, user);
        deleteRecording(id);
    };
    const enviarTodasGrabaciones = () => {
        props.envarVoces?.(recordings, user);
        setRecordings([]);
    };

    const visualize = (analyser: any) => {
        const canvas = canvasRef_.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const draw = () => {
            analyser.getByteTimeDomainData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                x += sliceWidth;
            }
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
            setAnimationId(requestAnimationFrame(draw));
        };
        draw();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                const objectToAdd = (prev: any) => { return { id: prev.length + 1, foto: base64, parametro: null } };
                setPhotos((prev: any) => [...prev, objectToAdd(prev)]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            const url = URL.createObjectURL(file);
            setRecordings((prev: any) => [...prev, {
                id: prev.length + 1,
                audio: { blob: file, url },
            }]);
        });
    };


    return {
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
    }
}

export default useAIComponent;