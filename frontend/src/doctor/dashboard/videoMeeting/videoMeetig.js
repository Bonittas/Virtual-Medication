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

const VideoRoom = ({ match }) => {
  const roomID = match.params.roomID;
  const [stream, setStream] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef(null);

  useEffect(() => {
    socketRef.current = io.connect("/", { query: `roomID=${roomID}` });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(userMediaStream => {
        userVideo.current.srcObject = userMediaStream;
        setStream(userMediaStream);

        socketRef.current.emit("join room", roomID);

        socketRef.current.on("user joined", userID => {
          const peer = createPeer(userID, socketRef.current.id, userMediaStream);
          peerRef.current = peer;
        });

        socketRef.current.on("receiving returned signal", payload => {
          peerRef.current.signal(payload.signal);
        });

        socketRef.current.on("user left", userID => {
          peerRef.current.destroy();
          peerRef.current = null;
        });
      })
      .catch(error => console.error("Error accessing media devices:", error));

    return () => {
      socketRef.current.disconnect();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomID]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal });
    });

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    return peer;
  };

  const handleToggleVideo = () => {
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
  };

  const handleToggleAudio = () => {
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
  };

  const handleEndCall = () => {
    window.location.href = "/";
  };

  const handleToggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <Container className="mb-16">
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
          <StyledVideo ref={partnerVideo} autoPlay playsInline />
        </>
      )}
    </Container>
  );
};

export default VideoRoom;
