// client/src/components/PatientRoom.js

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { IconButton, Tooltip, AppBar, Toolbar } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

const Container = styled.div`
  padding: 2vw;
  display: flex;
  height: 100vh;
  width: 100%;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 80%;
  width: 50%;
  margin-left: 5%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo controls playsInline autoPlay ref={ref} />;
};

const PatientRoom = (props) => {
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState();
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();

  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      setStream(stream);
      userStream.current = stream;
      socketRef.current.emit("join room", roomID);
      socketRef.current.on("all users", (users) => {
        const peers = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push({
            peerID: userID,
            peer,
          });
        });
        setPeers(peers);
      });

      socketRef.current.on("user joined", (payload) => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        const peerObj = {
          peer,
          peerID: payload.callerID,
        };

        setPeers((users) => [...users, peerObj]);
      });

      socketRef.current.on("receiving returned signal", (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      socketRef.current.on("user left", (id) => {
        const peerObj = peersRef.current.find((p) => p.peerID === id);
        if (peerObj) {
          peerObj.peer.destroy();
        }
        const peers = peersRef.current.filter((p) => p.peerID !== id);
        peersRef.current = peers;
        setPeers(peers);
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
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

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  // TOGGLE AUDIO AND VIDEO OPTIONS

  function toggleMuteAudio() {
    if (stream) {
      setAudioMuted(!audioMuted);
      stream.getAudioTracks()[0].enabled = audioMuted;
    }
  }

  function toggleMuteVideo() {
    if (stream) {
      setVideoMuted(!videoMuted);
      stream.getVideoTracks()[0].enabled = videoMuted;
    }
  }

  let audioControl;
  if (audioMuted) {
    audioControl = (
      <Tooltip title="Microphone" placement="top">
        <IconButton onClick={() => toggleMuteAudio()} style={{ color: "#ffffff" }}>
          <MicIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    audioControl = (
      <Tooltip title="Mute Microphone" placement="top">
        <IconButton onClick={() => toggleMuteAudio()} style={{ color: "#ffffff" }}>
          <MicOffIcon />
        </IconButton>
      </Tooltip>
    );
  }

  let videoControl;
  if (videoMuted) {
    videoControl = (
      <Tooltip title="Video" placement="top">
        <IconButton onClick={() => toggleMuteVideo()} style={{ color: "#ffffff" }}>
          <VideocamIcon />
        </IconButton>
      </Tooltip>
    );
  } else {
    videoControl = (
      <Tooltip title="Mute Video" placement="top">
        <IconButton onClick={() => toggleMuteVideo()} style={{ color: "#ffffff" }}>
          <VideocamOffIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          {audioControl}
          {videoControl}
          <Tooltip title="End Call" placement="top">
            <IconButton onClick={() => window.location.href = '/'} style={{ color: "#ff0000" }}>
              <CallEndIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer) => {
        return <Video key={peer.peerID} peer={peer.peer} />;
      })}
    </Container>
  );
};

export default PatientRoom;
