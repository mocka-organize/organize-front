/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useReconhecerCliente } from "../hooks/clientesHooks";
import { AntContext } from "../contexts/AntContext";
import { Image, Skeleton } from "antd";

const Recognize = () => {

    const videoRef = useRef();
    const canvasRef = useRef();
    const [enviando, setEnviando] = useState(false);
    const [cliente, setCliente] = useState();
    const { api } = useContext(AntContext);
    const { mutateAsync: reconhecer } = useReconhecerCliente();

    useEffect(() => {
        async function loadModelsAndStart() {
            const MODEL_URL = "/models";
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                startVideo();
            } catch (error) {
                api.error({ description: "Recarregue a página" });
                setTimeout(() => window.location.reload(), 500);
            }
        }

        function startVideo() {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => (videoRef.current.srcObject = stream))
                .catch((error) => {
                    api.error({ description: error.message });
                    setTimeout(() => window.location.reload(), 500);
                });
        }

        loadModelsAndStart();
    }, []);

    useEffect(() => {
        let interval;

        if (videoRef.current) {
            videoRef.current.onplay = () => {
                const canvas = canvasRef.current;
                const displaySize = {
                    width: videoRef.current.videoWidth,
                    height: videoRef.current.videoHeight,
                };
                faceapi.matchDimensions(canvas, displaySize);

                interval = setInterval(async () => {
                    if (enviando) return; // Espera o reconhecimento terminar

                    const detections = await faceapi
                        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks();

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);

                    if (detections.length > 0) {
                        setEnviando(true);
                        await enviarFrame(); // Aguarda o processamento
                    }
                }, 500);
            };
        }

        return () => clearInterval(interval);
    }, [enviando]);

    async function enviarFrame() {
        return new Promise((resolve) => {
            const canvasTemp = document.createElement("canvas");
            canvasTemp.width = videoRef.current.videoWidth;
            canvasTemp.height = videoRef.current.videoHeight;
            const ctx = canvasTemp.getContext("2d");
            ctx.drawImage(videoRef.current, 0, 0, canvasTemp.width, canvasTemp.height);

            canvasTemp.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("foto", blob, "captura.jpg");

                try {
                    const response = await reconhecer(formData);
                    if (response.type == "warning") {
                        api[response.type]({
                            description: response.description
                        })
                        setTimeout(() => window.location.reload(), 3000);
                        return;
                    }
                    setCliente(response.cliente);
                    setTimeout(() => window.location.reload(), 3000);
                } catch (error) {
                    api.error({
                        description: error?.response?.data?.description || "Erro ao reconhecer rosto"
                    });
                    setTimeout(() => window.location.reload(), 3000);
                } finally {
                    // Pequeno delay para evitar envio duplicado do mesmo rosto
                    setTimeout(() => {
                        setEnviando(false);
                        resolve();
                    }, 1500);
                }
            }, "image/jpeg");
        });
    }

    return (
        <>
            <div className="py-4 px-15 h-[calc(100vh_-_64px)] flex justify-center items-center">
                <div className="flex-1 text-center text-[40px] text-indigo-500 font-bold">
                    {enviando ? (
                        <p>Reconhecendo...</p>
                    ) : (
                        <p>Posicione o rosto</p>
                    )}
                </div>
                <div className="w-[225px] h-[400px] overflow-hidden rounded-3xl flex justify-center items-center relative">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-full object-cover"
                    />
                    <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
                    />
                </div>
                <div className="flex-1 pl-10">
                    <h1 className="text-[40px] text-indigo-500 font-bold">Identificação:</h1>
                    <div className="flex items-center gap-4">
                        {cliente ? (
                            <Image
                                src={cliente?.foto}
                                className="rounded-full"
                                style={{ width: 80, height: 80 }}
                            />
                        ) : (
                            <Skeleton.Avatar
                                style={{ width: 80, height: 80 }}
                                shape="circle"
                                active
                            />
                        )}
                        <div>
                            <h5 className="font-bold text-sm text-indigo-500 uppercase">Nome: </h5>
                            <h2>{cliente ? cliente.nome : 'Buscando...'}</h2>
                            <h5 className="font-bold text-sm text-indigo-500 uppercase">Email: </h5>
                            <h2>{cliente ? cliente.email : 'Buscando...'}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recognize;