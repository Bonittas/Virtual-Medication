import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
const socket = io("http://localhost:5002", { transports: ["websocket"] });

let pc;
let localStream;
let startButton;
let hangupButton;
let muteAudButton;
let toggleVidButton;
let remoteVideo;
let localVideo;

socket.on("message", (e) => {
  if (!localStream) {
    console.log("not ready yet");
    return;
  }
  switch (e.type) {
    case "offer":
      handleOffer(e);
      break;
    case "answer":
      handleAnswer(e);
      break;
    case "candidate":
      handleCandidate(e);
      break;
    case "ready":
      if (pc) {
        console.log("already in call, ignoring");
        return;
      }
      makeCall();
      break;
    case "bye":
      if (pc) {
        hangup();
      }
      break;
    default:
      console.log("unhandled", e);
      break;
  }
});

async function makeCall() {
  try {
    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        candidate: null,
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("message", message);
    };
    pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    const offer = await pc.createOffer();
    socket.emit("message", { type: "offer", sdp: offer.sdp });
    await pc.setLocalDescription(offer);
  } catch (e) {
    console.log(e);
  }
}

async function handleOffer(offer) {
  if (pc) {
    console.error("existing peerconnection");
    return;
  }
  try {
    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        candidate: null,
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("message", message);
    };
    pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    socket.emit("message", { type: "answer", sdp: answer.sdp });
    await pc.setLocalDescription(answer);
  } catch (e) {
    console.log(e);
  }
}

async function handleAnswer(answer) {
  if (!pc) {
    console.error("no peerconnection");
    return;
  }
  try {
    await pc.setRemoteDescription(answer);
  } catch (e) {
    console.log(e);
  }
}

async function handleCandidate(candidate) {
  try {
    if (!pc) {
      console.error("no peerconnection");
      return;
    }
    if (!candidate) {
      await pc.addIceCandidate(null);
    } else {
      await pc.addIceCandidate(candidate);
    }
  } catch (e) {
    console.log(e);
  }
}

async function hangup() {
  if (pc) {
    pc.close();
    pc = null;
  }
  localStream.getTracks().forEach((track) => track.stop());
  localStream = null;
  startButton.current.disabled = false;
  hangupButton.current.disabled = true;
  muteAudButton.current.disabled = true;
  toggleVidButton.current.disabled = true;
}

function App() {
  startButton = useRef(null);
  hangupButton = useRef(null);
  muteAudButton = useRef(null);
  toggleVidButton = useRef(null);
  localVideo = useRef(null);
  remoteVideo = useRef(null);

  const location = useLocation();
  const [audiostate, setAudio] = useState(true);
  const [videostate, setVideo] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", {
        sender: patientName || doctorName,
        text: messageInput
      });
      setMessageInput("");
    }
  };
  useEffect(() => {
    hangupButton.current.disabled = true;
    muteAudButton.current.disabled = true;
    toggleVidButton.current.disabled = true;

    const searchParams = new URLSearchParams(location.search);
    setPatientName(searchParams.get('patient'));
    setDoctorName(searchParams.get('doctor'));
  }, [location.search]);

  const startB = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true },
      });
      localVideo.current.srcObject = localStream;
    } catch (err) {
      console.log(err);
    }

    startButton.current.disabled = true;
    hangupButton.current.disabled = false;
    muteAudButton.current.disabled = false;
    toggleVidButton.current.disabled = false;

    socket.emit("message", { type: "ready" });
  };

  const hangB = async () => {
    hangup();
    socket.emit("message", { type: "bye" });
  };

  function muteAudio() {
    localStream.getAudioTracks().forEach(track => track.enabled = !audiostate);
    setAudio(!audiostate);
  }

  function toggleVideo() {
    localStream.getVideoTracks().forEach(track => track.enabled = !videostate);
    setVideo(!videostate);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <main className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <video
            ref={localVideo}
            className="w-1/2 h-auto rounded-lg shadow-md border-2 border-gray-200"
            autoPlay
            playsInline
            muted
          ></video>
          <video
            ref={remoteVideo}
            className="w-1/2 h-auto rounded-lg shadow-md border-2 border-gray-200"
            autoPlay
            playsInline
          ></video>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none"
            ref={startButton}
            onClick={startB}
          >
            <i className="fas fa-video"></i>
          </button>
          <button
            className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
            ref={hangupButton}
            onClick={hangB}
          >
            <i className="fas fa-phone-slash"></i>
          </button>
          <button
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
            ref={muteAudButton}
            onClick={muteAudio}
          >
            {audiostate ? (
              <i className="fas fa-microphone"></i>
            ) : (
              <i className="fas fa-microphone-slash"></i>
            )}
          </button>
          <button
            className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none"
            ref={toggleVidButton}
            onClick={toggleVideo}
          >
            {videostate ? (
              <i className="fas fa-video"></i>
            ) : (
              <i className="fas fa-video-slash"></i>
            )}
</button>
      


        </div>

      </main>
    </div>
  );
}

export default App;
