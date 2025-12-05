import React from 'react';

function VideoPlayer(props) {
  const lecture = props.lecture;
  const onClose = props.onClose;

  if (!lecture) {
    return null;
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.25rem)' }}>{lecture.title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-2 p-md-3">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
                src={lecture.videoUrl}
                title={lecture.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-3">
              <p className="text-muted d-none d-md-block">{lecture.description}</p>
              <small className="text-muted">Duration: {lecture.videoDuration} minutes</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
