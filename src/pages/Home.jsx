/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useReconhecerCliente } from "../hooks/clientesHooks";
import { AntContext } from "../contexts/AntContext";
import { Image, Skeleton } from "antd";

const Home = () => {

    const videoRef = useRef();
    const canvasRef = useRef();
    const [enviando, setEnviando] = useState(false);
    const [cliente, setCliente] = useState();
    const { api } = useContext(AntContext);
    const { mutateAsync: reconhecer } = useReconhecerCliente()
    console.log(cliente);


    useEffect(() => {
        async function loadModelsAndStart() {
            const MODEL_URL = "/models";
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
                startVideo();
            } catch (error) {
                api.error({
                    description: "Recarregue a página"
                })
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
        }

        function startVideo() {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => (videoRef.current.srcObject = stream))
                .catch((error) => {
                    api.error({
                        description: error.message
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                });
        }

        loadModelsAndStart();
    }, []);

    useEffect(() => {
        let interval;
        videoRef.current &&
            (videoRef.current.onplay = () => {
                const canvas = canvasRef.current;
                const displaySize = {
                    width: videoRef.current.videoWidth,
                    height: videoRef.current.videoHeight,
                };
                faceapi.matchDimensions(canvas, displaySize);

                interval = setInterval(async () => {
                    const detections = await faceapi
                        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    canvas
                        .getContext("2d")
                        .clearRect(0, 0, canvas.width, canvas.height);

                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                    if (detections.length > 0 && !enviando) {
                        setEnviando(true);
                        enviarFrame();
                    }
                }, 500);
            });

        return () => clearInterval(interval);
    }, [enviando]);

    async function enviarFrame() {
        const canvasTemp = document.createElement("canvas");
        canvasTemp.width = videoRef.current.videoWidth;
        canvasTemp.height = videoRef.current.videoHeight;
        const ctx = canvasTemp.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvasTemp.width, canvasTemp.height);

        canvasTemp.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("foto", blob, "captura.jpg");
            // formData.append("nome", "Gleidson");

            try {
                await reconhecer(formData, {
                    onSuccess: (response) => {
                        setCliente(response.cliente);
                        setEnviando(false);
                    },
                    onError: (response) => {
                        api.error({
                            description: response.description
                        })
                    }
                })
            } catch (response) {
                api.error({
                    description: `Erro ao enviar rosto: ${response.description}`
                })
            } finally {
                setEnviando(false);
            }
        }, "image/jpeg");
    }

    return (
        <>
            <Header />
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
                        {
                            cliente ? (
                                <Image
                                    src={cliente && cliente.foto}
                                    className="rounded-full"
                                    style={{ width: 80, height: 80 }}
                                />
                            ) : (
                                <Skeleton.Avatar
                                    style={{ width: 80, height: 80 }}
                                    shape="circle"
                                    active
                                />
                            )
                        }
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

export default Home;