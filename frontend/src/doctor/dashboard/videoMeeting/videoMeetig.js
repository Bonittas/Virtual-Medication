import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMicrophone, faPhoneSlash, faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  width: 100%;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin: 5px;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const VideoRoom = ({ roomID }) => {
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/", { query: `roomID=${roomID}` });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(userMediaStream => {
        userVideo.current.srcObject = userMediaStream;
        setStream(userMediaStream);
        userStream.current = userMediaStream;

        socketRef.current.emit("join room", roomID);

        socketRef.current.on("all users", users => {
          const newPeers = [];
          users.forEach(userID => {
            const peer = createPeer(userID, socketRef.current.id, userMediaStream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            newPeers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(newPeers);
        });

        socketRef.current.on("user joined", payload => {
          const peer = addPeer(payload.signal, payload.callerID, userMediaStream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers(prevPeers => [...prevPeers, peerObj]);
        });

        socketRef.current.on("receiving returned signal", payload => {
          const peerObj = peersRef.current.find(p => p.peerID === payload.id);
          if (peerObj) peerObj.peer.signal(payload.signal);
        });

        socketRef.current.on("user left", id => {
          const peerObj = peersRef.current.find(p => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
            setPeers(prevPeers => prevPeers.filter(peer => peer.peerID !== id));
          }
        });
      })
      .catch(error => console.error("Error accessing media devices:", error));

    return () => {
      socketRef.current.disconnect();
      if (userStream.current) {
        userStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomID]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.on("stream", remoteStream => {
      // Attach the remote stream to the video element for the doctor's video
      const video = document.createElement("video");
      video.srcObject = remoteStream;
      video.autoPlay = true;
      video.playsInline = true;
      video.muted = true; // Mute to avoid feedback loop
      video.className = "remote-video";
      document.body.appendChild(video);
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const handleToggleVideo = () => {
    const videoTrack = userStream.current.getVideoTracks()[0];
    if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
  };

  const handleToggleAudio = () => {
    const audioTrack = userStream.current.getAudioTracks()[0];
    if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
  };

  const handleEndCall = () => {
    window.location.href = "/appointments"; // Redirect to home page or any desired page
  };

  const handleToggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="w-2/3 h-1/2  mt-2 mx-6 rounded-md">
      <Container className="mb-16 h-1/2">
        {!minimized && (
          <>
            <IconContainer>
              <IconButton onClick={handleToggleVideo}>
                <FontAwesomeIcon icon={faVideo} size="2x" color="white" />
              </IconButton>
              <IconButton onClick={handleToggleAudio}>
                <FontAwesomeIcon icon={faMicrophone} size="2x" color="white" />
              </IconButton>
              <IconButton onClick={handleEndCall}>
                <FontAwesomeIcon icon={faPhoneSlash} size="2x" color="white" />
              </IconButton>
              <IconButton onClick={handleToggleMinimize}>
                <FontAwesomeIcon icon={minimized ? faExpand : faCompress} size="2x" color="white" />
              </IconButton>
            </IconContainer>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <VideoGrid>
              {peers.map(peer => (
                <StyledVideo key={peer.peerID} autoPlay playsInline />
              ))}
            </VideoGrid>
          </>
        )}
      </Container>
    </div>
  );
};

export default VideoRoom;
