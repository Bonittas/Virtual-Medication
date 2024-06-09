import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

const socket = io("http://localhost:5000/room1", { transports: ["websocket"] });

let localStream;
let peer;

function VideoRoom({ roomId }) {
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const initLocalStream = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = localStream;
      } catch (error) {
        console.error("Error accessing local media devices:", error);
      }
    };

    initLocalStream();

    socket.emit("join room", roomId);

    socket.on("user joined", ({ signal }) => {
      peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: localStream,
      });

      peer.on("signal", (data) => {
        socket.emit("sending signal", { userToSignal: peer.id, callerID: socket.id, signal: data });
      });

      peer.on("stream", (stream) => {
        setRemoteStream(stream);
        remoteVideoRef.current.srcObject = stream;
      });

      peer.signal(signal);
    });

    socket.on("user left", () => {
      setRemoteStream(null);
      remoteVideoRef.current.srcObject = null;
    });

    return () => {
      if (peer) {
        peer.destroy();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div className="video-container">
      <video ref={localVideoRef} autoPlay muted className="local-video" />
      <video ref={remoteVideoRef} autoPlay className="remote-video" />
    </div>
  );
}

export default VideoRoom;
